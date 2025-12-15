# 🔧 ManutençãoPro v2

> **Sistema Avançado de Gestão de Manutenção Industrial**
> Desenvolvido com Next.js 14, TypeScript, Supabase, NextAuth, e Integração Omie

## 📦 Status do Projeto

✅ **FASE 1 (CRÍTICA)** - Configuração Base
- Manual completo criado (MANUAL.md)
- Variáveis de ambiente (.env.example)
- Estrutura de repositório preparada

⏳ **FASE 2 (IMPORTANTE)** - APIs e Tempo Real
- APIs REST endpoints
- WebSocket notificações
- Integração Omie ERP

⏳ **FASE 3 (AVANÇADO)** - PWA e Cloud
- Progressive Web App
- Sincronização automática
- Backup em nuvem

## 🚀 Quick Start

### 1. Clonar repositório
```bash
git clone https://github.com/silveiraallanbruno-beep/manutencao-pro-v2.git
cd manutencao-pro-v2
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Executar em desenvolvimento
```bash
npm run dev
```

## 📚 Documentação

- **[MANUAL.md](./MANUAL.md)** - Guia completo (277 linhas)
  - Fase 1: Supabase + NextAuth
  - Fase 2: APIs REST + Notificações
  - Fase 3: PWA + Sincronização
  - Troubleshooting

- **[.env.example](./.env.example)** - Variáveis de ambiente
  - Supabase config
  - OAuth credentials
  - Omie integration
  - Backup settings

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Next.js | 14+ | Framework |
| TypeScript | 5+ | Tipagem |
| Supabase | Latest | Backend |
| NextAuth | 4+ | Auth OAuth |
| Tailwind CSS | 3+ | UI |
| Recharts | Latest | Gráficos |
| Sonner | Latest | Notificações |

## 📊 Arquitetura

```
manutencao-pro-v2/
├── app/
│   ├── api/              # APIs REST (Fase 2)
│   ├── components/       # Componentes React
│   ├── pages/           # Páginas (Dashboard, Equipment, etc)
│   └── layout.tsx       # Layout principal
├── lib/
│   ├── supabase.ts      # Cliente Supabase
│   ├── auth.ts          # NextAuth config
│   └── api.ts           # Chamadas API
├── public/              # Arquivos estáticos + PWA (Fase 3)
├── MANUAL.md            # Documentação completa
├── .env.example         # Variáveis de exemplo
└── package.json         # Dependências
```

## 📋 Checklist de Implementação

### Fase 1 - Crítica
- [ ] Criar conta Supabase
- [ ] Configurar tabelas SQL
- [ ] Setup NextAuth OAuth
- [ ] Testar autenticação local
- [ ] Deploy Vercel (preview)

### Fase 2 - Importante
- [ ] Criar endpoints /api/equipment
- [ ] Criar endpoints /api/work-orders
- [ ] WebSocket notificações
- [ ] Integração Omie ERP
- [ ] Alertas automáticos

### Fase 3 - Avançado
- [ ] Configurar PWA
- [ ] Service Worker
- [ ] Backup automático
- [ ] Dashboard sync
- [ ] Publicar Vercel Production

## 🔑 Variáveis Necessárias

**Supabase:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**OAuth:**
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` / `GITHUB_SECRET`

**NextAuth:**
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

**Omie (Fase 2):**
- `OMIE_API_KEY`
- `OMIE_APP_KEY`

## 🚢 Deploy

### Vercel (Recomendado)

1. Conectar repositório GitHub
2. Adicionar variáveis de ambiente no Vercel
3. Deploy automático em push

```bash
# URL de produção
https://manutencao-pro-v2.vercel.app
```

## 🐛 Troubleshooting

Ver seção de Troubleshooting em [MANUAL.md](./MANUAL.md#-troubleshooting)

## 📞 Suporte

- **Issues:** https://github.com/silveiraallanbruno-beep/manutencao-pro-v2/issues
- **Discussions:** https://github.com/silveiraallanbruno-beep/manutencao-pro-v2/discussions
- **Email:** suporte@manutencao-pro.com

## 📄 Licença

MIT License - veja LICENSE.md para detalhes

---

**Desenvolvido com ❤️ para manufatura moderna**

Última atualização: Dezembro 2025
