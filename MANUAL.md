# 📚 MANUAL COMPLETO - ManutençãoPro v2
## Sistema Avançado de Gestão de Manutenção Industrial

**Versão:** 2.0
**Data:** Dezembro 2025
**Autor:** Sistema ManutençãoPro
**Status:** Produção

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Fase 1 - Crítica](#fase-1---crítica-semana-1-2)
3. [Fase 2 - Importante](#fase-2---importante-semana-3-4)
4. [Fase 3 - Avançado](#fase-3---avançado-semana-5-6)
5. [Configurações Finais](#configurações-finais)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 VISÃO GERAL

### O que é ManutençãoPro v2?

Sistema completo de gestão de manutenção industrial com:
- ✅ Autenticação OAuth (Google, GitHub)
- ✅ Banco de dados em tempo real (Supabase)
- ✅ APIs REST completas
- ✅ Notificações em tempo real
- ✅ Integração com Omie ERP
- ✅ Versão PWA (Progressive Web App)
- ✅ Sincronização automática em nuvem
- ✅ Backup automático

### Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| Next.js | 14+ | Framework React |
| TypeScript | 5+ | Tipagem estática |
| Supabase | Latest | Backend + Database |
| NextAuth | 4+ | Autenticação OAuth |
| Tailwind CSS | 3+ | UI Styling |
| Recharts | Latest | Gráficos |
| Sonner | Latest | Notificações |
| TanStack Query | 5+ | Cache/Sync |

---

## 🚀 FASE 1 - CRÍTICA (Semana 1-2)

### ✅ Passo 1: Criar Conta Supabase

1. Acesse https://supabase.com
2. Faça login com GitHub
3. Clique em "New Project"
4. Escolha organização e nome: `manutencao-pro-v2`
5. Escolha senha database forte
6. Selecione região: `South America (São Paulo)`
7. Aguarde criação (5-10 min)

### ✅ Passo 2: Copiar Credenciais

1. No Supabase, vá em **Settings > API**
2. Copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role Secret → `SUPABASE_SERVICE_ROLE_KEY`

### ✅ Passo 3: Criar Tabelas SQL

No SQL Editor do Supabase, execute:

```sql
-- Equipamentos
CREATE TABLE equipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'operational',
  acquisition_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ordens de Manutenção  
CREATE TABLE maintenance_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  equipment_id UUID REFERENCES equipments(id),
  type VARCHAR(50),
  description TEXT,
  priority VARCHAR(20),
  status VARCHAR(50) DEFAULT 'open',
  scheduled_date TIMESTAMP,
  completed_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tarefas
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20),
  due_date TIMESTAMP,
  category VARCHAR(50),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Notificações
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  message TEXT,
  type VARCHAR(50),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### ✅ Passo 4: Configurar NextAuth + OAuth

#### 4.1 - Criar Credenciais Google

1. Vá em https://console.cloud.google.com
2. Crie novo projeto: `manutencao-pro`
3. Ative API: Google+ API
4. Crie OAuth 2.0:
   - Type: Web Application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://seu-dominio.vercel.app/api/auth/callback/google`
5. Copie `Client ID` e `Client Secret`

#### 4.2 - Criar Credenciais GitHub

1. Vá em https://github.com/settings/developers
2. Nova OAuth App
3. Authorization callback URL:
   - `http://localhost:3000/api/auth/callback/github`
   - `https://seu-dominio.vercel.app/api/auth/callback/github`
4. Copie `Client ID` e `Client Secret`

#### 4.3 - Arquivo .env.local

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# Google OAuth
GOOGLE_CLIENT_ID=seu-google-id
GOOGLE_CLIENT_SECRET=seu-google-secret

# GitHub OAuth
GITHUB_ID=seu-github-id
GITHUB_SECRET=seu-github-secret

# NextAuth
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
```

### ✅ Passo 5: Instalar Dependências

```bash
npm install next-auth @auth/supabase-adapter
npm install @supabase/supabase-js
npm install sonner
npm install @tanstack/react-query
npm install zod
npm install axios
```

---

## 🔌 FASE 2 - IMPORTANTE (Semana 3-4)

### APIs REST Endpoints

**GET /api/equipment** - Listar equipamentos
**POST /api/equipment** - Criar equipamento
**GET /api/work-orders** - Listar ordens
**POST /api/work-orders** - Criar ordem
**GET /api/reports** - Relatórios
**POST /api/notifications** - Enviar notificação
**POST /api/omie/sync** - Sincronizar Omie

### Notificações Tempo Real

- WebSocket para atualizações live
- Alertas automáticos para ordens críticas
- Toast notifications com Sonner

### Integração Omie

- Endpoint `/api/omie/sync`
- Autenticação com API Key Omie
- Sincronização bidirecional

---

## 📱 FASE 3 - AVANÇADO (Semana 5-6)

### PWA (Progressive Web App)

- Instalável em mobile
- Funciona offline
- Cache automático
- Service Worker

### Sincronização Cloud

- Backup automático no Supabase Storage
- Sincronização de dados em background
- Dashboard de status

### Mobile

- Totalmente responsivo
- Touch-friendly
- Otimizado para iOS/Android

---

## ⚙️ CONFIGURAÇÕES FINAIS

### Deploy no Vercel

1. Push código para GitHub
2. Connect repo no Vercel
3. Adicione variáveis de ambiente
4. Deploy automático

### Configurar Domínio

1. Compre domínio (.com.br sugerido)
2. Aponte DNS para Vercel
3. Configure SSL automático

---

## 🐛 TROUBLESHOOTING

### Erro: "Supabase connection failed"
- Verifique credenciais `.env.local`
- Teste URL do Supabase
- Verifique se tabelas foram criadas

### Erro: "OAuth callback failed"
- Confirme URLs de callback
- Verifique Client ID e Secret
- Teste em localhost primeiro

### Erro: "NextAuth session error"
- Regenere NEXTAUTH_SECRET
- Limpe cookies do navegador
- Verifique NEXTAUTH_URL

---

## 📞 SUPORTE

**Email:** suporte@manutencao-pro.com
**GitHub Issues:** https://github.com/silveiraallanbruno-beep/manutencao-pro-v2/issues
**Documentation:** https://github.com/silveiraallanbruno-beep/manutencao-pro-v2/wiki

---

**Desenvolvido com ❤️ para manufatura moderna**
