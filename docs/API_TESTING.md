# 🧪 API Testing Guide - ManutençãoPro v2

## Variáveis de Ambiente

```bash
BASE_URL="http://localhost:3000"
API_TOKEN="seu_token_jwt_aqui"
```

---

## 🔐 1. Autenticação (NextAuth)

### Login com Email/Senha
```bash
curl -X POST "$BASE_URL/api/auth/callback/credentials" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "senha123",
    "csrfToken": "token_csrf"
  }'
```

### Verificar Sessão
```bash
curl -X GET "$BASE_URL/api/auth/session" \
  -H "Cookie: next-auth.session-token=SEU_TOKEN"
```

---

## 📋 2. Ordens de Manutenção (Work Orders)

### Listar Todas as Ordens
```bash
curl -X GET "$BASE_URL/api/work-orders" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json"
```

### Criar Nova Ordem
```bash
curl -X POST "$BASE_URL/api/work-orders" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "equipment_id": "uuid-aqui",
    "description": "Manutenção preventiva do compressor",
    "priority": "high",
    "status": "pending",
    "scheduled_date": "2025-12-20T10:00:00Z"
  }'
```

### Obter Detalhe da Ordem
```bash
curl -X GET "$BASE_URL/api/work-orders/ORDER_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json"
```

### Atualizar Ordem
```bash
curl -X PUT "$BASE_URL/api/work-orders/ORDER_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "priority": "critical"
  }'
```

### Deletar Ordem
```bash
curl -X DELETE "$BASE_URL/api/work-orders/ORDER_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json"
```

---

## ✅ 3. Tarefas (Tasks)

### Listar Tarefas com Filtros
```bash
# Todas as tarefas
curl -X GET "$BASE_URL/api/tasks" \
  -H "Authorization: Bearer $API_TOKEN"

# Apenas tarefas pendentes
curl -X GET "$BASE_URL/api/tasks?status=pending" \
  -H "Authorization: Bearer $API_TOKEN"

# Tarefas de categoria específica
curl -X GET "$BASE_URL/api/tasks?category=manutencao" \
  -H "Authorization: Bearer $API_TOKEN"
```

### Criar Tarefa
```bash
curl -X POST "$BASE_URL/api/tasks" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Verificar óleo do compressor",
    "description": "Conferir nível e condição do óleo",
    "status": "pending",
    "priority": "medium",
    "due_date": "2025-12-18T17:00:00Z",
    "category": "checklist"
  }'
```

### Atualizar Tarefa
```bash
curl -X PUT "$BASE_URL/api/tasks/TASK_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "completed_at": "2025-12-15T14:30:00Z"
  }'
```

### Deletar Tarefa
```bash
curl -X DELETE "$BASE_URL/api/tasks/TASK_ID" \
  -H "Authorization: Bearer $API_TOKEN"
```

---

## 🔔 4. Notificações

### Listar Notificações
```bash
curl -X GET "$BASE_URL/api/notifications" \
  -H "Authorization: Bearer $API_TOKEN"
```

### Listar Apenas Não-Lidas
```bash
curl -X GET "$BASE_URL/api/notifications?unread=true" \
  -H "Authorization: Bearer $API_TOKEN"
```

### Marcar como Lida
```bash
curl -X PATCH "$BASE_URL/api/notifications" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "notificationIds": ["NOTIF_ID_1", "NOTIF_ID_2"],
    "markAsRead": true
  }'
```

---

## 📊 Postman Collection (JSON)

```json
{
  "info": {
    "name": "ManutençãoPro v2 API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {"raw": "{\"email\": \"admin@example.com\", \"password\": \"senha123\"}"},
            "url": {"raw": "{{BASE_URL}}/api/auth/callback/credentials", "host": ["{{BASE_URL}}"], "path": ["api", "auth", "callback", "credentials"]}
          }
        }
      ]
    },
    {
      "name": "Work Orders",
      "item": [
        {
          "name": "List Orders",
          "request": {"method": "GET", "url": {"raw": "{{BASE_URL}}/api/work-orders", "host": ["{{BASE_URL}}"], "path": ["api", "work-orders"]}}
        },
        {
          "name": "Create Order",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {"raw": "{\"equipment_id\": \"uuid\", \"description\": \"Manutenção\", \"priority\": \"high\"}"},
            "url": {"raw": "{{BASE_URL}}/api/work-orders", "host": ["{{BASE_URL}}"], "path": ["api", "work-orders"]}
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "List Tasks",
          "request": {"method": "GET", "url": {"raw": "{{BASE_URL}}/api/tasks", "host": ["{{BASE_URL}}"], "path": ["api", "tasks"]}}
        },
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {"raw": "{\"title\": \"Tarefa\", \"priority\": \"medium\", \"status\": \"pending\"}"},
            "url": {"raw": "{{BASE_URL}}/api/tasks", "host": ["{{BASE_URL}}"], "path": ["api", "tasks"]}
          }
        }
      ]
    }
  ]
}
```

---

## ✨ Procedimento Completo de Teste

### 1. Setup Inicial
```bash
# Iniciar servidor local
npm run dev

# Em outro terminal, importar Postman Collection
# Menu: File > Import > Paste JSON acima
```

### 2. Testes Sequenciais

**a) Autenticação**
- [ ] Fazer login com email/senha
- [ ] Salvar token JWT
- [ ] Verificar sessão

**b) Ordens**
- [ ] Listar ordens existentes
- [ ] Criar nova ordem (CRITICAL)
- [ ] Atualizar status para IN_PROGRESS
- [ ] Buscar ordem por ID
- [ ] Deletar ordem de teste

**c) Tarefas**
- [ ] Listar tarefas
- [ ] Filtrar por status
- [ ] Criar tarefa
- [ ] Marcar como concluída
- [ ] Deletar tarefa

**d) Notificações**
- [ ] Listar notificações
- [ ] Contar não-lidas
- [ ] Marcar como lida

### 3. Validações

- [x] Status HTTP correto (200, 201, 400, 404, 500)
- [x] Headers de resposta corretos
- [x] Dados retornados em formato JSON
- [x] Autenticação funcionando
- [x] RLS policies respeitadas
- [x] Timestamps corretos (created_at, updated_at)

---

## 🐛 Troubleshooting

### Erro 401 Unauthorized
```bash
# Token expirado ou inválido
# Solução: Fazer login novamente e obter novo token
```

### Erro 403 Forbidden
```bash
# Permissões RLS insuficientes
# Solução: Verificar role do usuário (admin, supervisor, usuario)
```

### Erro 404 Not Found
```bash
# Recurso não existe
# Solução: Verificar ID do recurso
```

---

## 📚 Referências

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [cURL Documentation](https://curl.se/docs/)
- [Postman Learning Center](https://learning.postman.com/)
