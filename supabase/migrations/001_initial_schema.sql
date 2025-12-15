-- Supabase Migration: Initial Schema Setup
-- Created: 2025-12-15
-- Description: Tabelas base para ManutençãoPro v2

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===== TABELA: Usuários (Users) =====
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'usuario', -- admin, supervisor, usuario
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);

-- ===== TABELA: Equipamentos (Equipments) =====
CREATE TABLE IF NOT EXISTS equipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ativo', -- ativo, inativo, manutencao
    last_maintenance_date TIMESTAMP WITH TIME ZONE,
    next_maintenance_date TIMESTAMP WITH TIME ZONE,
    manufacturer VARCHAR(255),
    serial_number VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_equipments_code ON equipments(code);
CREATE INDEX idx_equipments_status ON equipments(status);

-- ===== TABELA: Ordens de Manutenção (Maintenance Orders) =====
CREATE TABLE IF NOT EXISTS maintenance_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID REFERENCES equipments(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    scheduled_date TIMESTAMP WITH TIME ZONE,
    completed_date TIMESTAMP WITH TIME ZONE,
    assigned_to UUID REFERENCES users(id),
    estimated_hours NUMERIC(8,2),
    actual_hours NUMERIC(8,2),
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_maintenance_orders_equipment ON maintenance_orders(equipment_id);
CREATE INDEX idx_maintenance_orders_status ON maintenance_orders(status);
CREATE INDEX idx_maintenance_orders_priority ON maintenance_orders(priority);
CREATE INDEX idx_maintenance_orders_created ON maintenance_orders(created_at DESC);

-- ===== TABELA: Tarefas (Tasks) =====
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    category VARCHAR(100),
    assigned_to UUID REFERENCES users(id),
    related_order_id UUID REFERENCES maintenance_orders(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_category ON tasks(category);

-- ===== TABELA: Notificações (Notifications) =====
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success', 'critical')),
    read BOOLEAN DEFAULT FALSE,
    related_order_id UUID REFERENCES maintenance_orders(id),
    related_task_id UUID REFERENCES tasks(id),
    action_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- ===== TABELA: Histórico de Auditoria (Audit Log) =====
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ===== Row-Level Security (RLS) =====
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ===== Políticas RLS =====
-- Todos podem ler usuários
CREATE POLICY "users_read" ON users FOR SELECT USING (true);

-- Apenas admins podem atualizar usuários
CREATE POLICY "users_update" ON users FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Todos podem ler equipamentos
CREATE POLICY "equipments_read" ON equipments FOR SELECT USING (true);

-- Apenas admins e supervisores podem modificar equipamentos
CREATE POLICY "equipments_write" ON equipments FOR INSERT WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'supervisor'));
CREATE POLICY "equipments_update" ON equipments FOR UPDATE USING (auth.jwt() ->> 'role' IN ('admin', 'supervisor'));

-- Todos podem ler ordens
CREATE POLICY "orders_read" ON maintenance_orders FOR SELECT USING (true);

-- Usuários autenticados podem criar ordens
CREATE POLICY "orders_create" ON maintenance_orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Usuários podem atualizar suas próprias ordens ou admins qualquer uma
CREATE POLICY "orders_update" ON maintenance_orders FOR UPDATE USING (
    assigned_to = auth.uid() OR auth.jwt() ->> 'role' = 'admin'
);

-- Todos podem ler tarefas
CREATE POLICY "tasks_read" ON tasks FOR SELECT USING (true);

-- Usuários autenticados podem criar tarefas
CREATE POLICY "tasks_create" ON tasks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Usuários podem atualizar suas próprias tarefas
CREATE POLICY "tasks_update" ON tasks FOR UPDATE USING (
    assigned_to = auth.uid() OR auth.jwt() ->> 'role' = 'admin'
);

-- Usuários só veem suas próprias notificações
CREATE POLICY "notifications_read" ON notifications FOR SELECT USING (user_id = auth.uid());

-- Sistema pode criar notificações
CREATE POLICY "notifications_create" ON notifications FOR INSERT WITH CHECK (true);

-- Usuários podem atualizar suas próprias notificações
CREATE POLICY "notifications_update" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- Apenas admins podem ler audit logs
CREATE POLICY "audit_read" ON audit_logs FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- ===== Funções Auxiliares =====
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER equipments_updated_at BEFORE UPDATE ON equipments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER maintenance_orders_updated_at BEFORE UPDATE ON maintenance_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
