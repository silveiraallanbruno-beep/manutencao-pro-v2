# PLANO DE TESTES PRÁTICO - ManutençãoPro v2

## PERÍODO DE EXECUÇÃO
- **Data Inicial:** 15/12/2025 (18h00)
- **Data Final:** 16/12/2025 (08h00)
- **Tempo Total Disponível:** 14 horas

## OBJETIVO GERAL
Executar testes abrangentes de todas as funcionalidades implementadas no sistema ManutençãoPro v2, validando:
- Autenticação e autorização
- Middleware de proteção de rotas
- Componentes e páginas do dashboard
- Hooks customizados (useAuth, useFetch)
- Validadores e constantes
- APIs e integração com Supabase
- Design responsivo (mobile/tablet/desktop)
- Performance e tempo de carregamento

## PARTE 1: SETUP E CONFIGURAÇÃO (30 minutos)

### 1.1 Preparação do Ambiente
- [ ] Clonar repositório: `git clone https://github.com/silveiraallanbruno-beep/manutencao-pro-v2.git`
- [ ] Navegar para o diretório: `cd manutencao-pro-v2`
- [ ] Instalar dependências: `npm install`
- [ ] Copiar variáveis de ambiente: `cp .env.example .env.local`
- [ ] Configurar credenciais Supabase em `.env.local`
- [ ] Configurar variáveis NextAuth em `.env.local`

### 1.2 Iniciação da Aplicação
- [ ] Iniciar servidor de desenvolvimento: `npm run dev`
- [ ] Validar que a aplicação inicia em http://localhost:3000
- [ ] Verificar que não há erros no console do navegador
- [ ] Verificar que não há erros no terminal

## PARTE 2: TESTES DE AUTENTICAÇÃO (1.5 horas)

### 2.1 Testes da Página de Login
- [ ] Navegar para página de login
- [ ] Verificar layout (dark theme, logo, formulário)
- [ ] Testar validação de email vazio
- [ ] Testar validação de senha vazia
- [ ] Testar validação de email inválido
- [ ] Testar validação de senha muito curta
- [ ] Testar login com credenciais inválidas
- [ ] Testar login com credenciais válidas
- [ ] Verificar redirecionamento para dashboard após login bem-sucedido
- [ ] Verificar armazenamento de sessão

### 2.2 Testes da Página de Registro
- [ ] Navegar para página de registro (link "Criar conta")
- [ ] Testar validação de nome vazio
- [ ] Testar validação de email vazio
- [ ] Testar validação de email duplicado
- [ ] Testar validação de senha vazio
- [ ] Testar validação de confirmar senha diferente
- [ ] Testar registro com dados válidos
- [ ] Verificar redirecionamento para login após registro bem-sucedido
- [ ] Verificar criação de usuário em Supabase

### 2.3 Testes de Middleware de Autenticação
- [ ] Tentar acessar dashboard sem autenticação → deve redirecionar para login
- [ ] Tentar acessar /api/work-orders sem token → deve retornar 401
- [ ] Verificar que rotas protegidas exigem sessão válida
- [ ] Testar logout e redirecionamento
- [ ] Testar expiração de sessão

## PARTE 3: TESTES DE PÁGINAS E COMPONENTES (2 horas)

### 3.1 Teste de Layout do Dashboard
- [ ] Verificar que sidebar está visível
- [ ] Verificar que header está presente
- [ ] Verificar que footer carrega corretamente
- [ ] Testar responsividade do layout em mobile (375px)
- [ ] Testar responsividade em tablet (768px)
- [ ] Testar responsividade em desktop (1920px)

### 3.2 Teste da Página Home
- [ ] Verificar carregamento de métricas
- [ ] Testar gráficos de desempenho
- [ ] Verificar estatísticas de ordens de trabalho
- [ ] Testar links rápidos para outras páginas
- [ ] Verificar dark theme aplicado corretamente

### 3.3 Teste da Página de Ordens de Trabalho
- [ ] Verificar listagem de ordens
- [ ] Testar filtros (status, prioridade, data)
- [ ] Testar busca por número de ordem
- [ ] Testar paginação
- [ ] Testar ordenação por colunas
- [ ] Testar criar nova ordem (modal ou página)
- [ ] Testar editar ordem existente
- [ ] Testar excluir ordem
- [ ] Verificar que alterações persistem no Supabase

### 3.4 Teste da Página de Tarefas
- [ ] Verificar listagem de tarefas
- [ ] Testar filtros (status, prioridade, responsável)
- [ ] Testar busca por título da tarefa
- [ ] Testar criar nova tarefa
- [ ] Testar atualizar status de tarefa
- [ ] Testar atribuir tarefa a usuário
- [ ] Testar excluir tarefa
- [ ] Verificar notificações de mudança de status

### 3.5 Teste da Página de Notificações
- [ ] Verificar listagem de notificações
- [ ] Testar marcação como lida
- [ ] Testar exclusão de notificação
- [ ] Testar notificações em tempo real
- [ ] Testar badges de notificação não lida

### 3.6 Teste da Página de Configurações
- [ ] Verificar seções de configuração
- [ ] Testar alteração de perfil de usuário
- [ ] Testar alteração de senha
- [ ] Testar preferenciais de tema (escuro/claro)
- [ ] Testar logout

## PARTE 4: TESTES DE APIS E INTEGRAÇÃO (1.5 horas)

### 4.1 Teste da API de Ordens de Trabalho
- [ ] GET /api/work-orders → Listar todas as ordens
- [ ] GET /api/work-orders/:id → Obter ordem específica
- [ ] POST /api/work-orders → Criar nova ordem
- [ ] PUT /api/work-orders/:id → Atualizar ordem
- [ ] DELETE /api/work-orders/:id → Deletar ordem
- [ ] Verificar validação de dados de entrada
- [ ] Verificar que respostas contêm status correto

### 4.2 Teste da API de Tarefas
- [ ] GET /api/tasks → Listar todas as tarefas
- [ ] POST /api/tasks → Criar nova tarefa
- [ ] PUT /api/tasks/:id → Atualizar tarefa
- [ ] DELETE /api/tasks/:id → Deletar tarefa
- [ ] Verificar que tarefas estão associadas a ordens corretas

### 4.3 Teste da API de Notificações
- [ ] GET /api/notifications → Listar notificações do usuário
- [ ] POST /api/notifications → Criar notificação
- [ ] PUT /api/notifications/:id → Marcar como lida
- [ ] Verificar que notificações aparecem em tempo real

### 4.4 Teste de Integração com Supabase
- [ ] Verificar que dados são persistidos no banco
- [ ] Testar transações (criar ordem + criar tarefas)
- [ ] Testar constraints e validações do banco
- [ ] Testar backup automático (se configurado)

## PARTE 5: TESTES DE HOOKS E VALIDADORES (1 hora)

### 5.1 Teste do Hook useAuth
- [ ] Verificar que hook retorna usuário autenticado
- [ ] Verificar que hook retorna null sem autenticação
- [ ] Testar que mudanças de autenticação disparam re-render
- [ ] Testar logout através do hook

### 5.2 Teste do Hook useFetch
- [ ] Testar carregamento de dados
- [ ] Testar tratamento de erros
- [ ] Testar refetch manual
- [ ] Testar cache de dados
- [ ] Testar loading states

### 5.3 Teste de Validadores
- [ ] Validar email com expressão regular
- [ ] Validar força de senha
- [ ] Validar campo obrigatório
- [ ] Validar comprimento de string
- [ ] Validar formato de data

### 5.4 Teste de Constantes
- [ ] Verificar que constantes estão corretas
- [ ] Testar enumerações de status
- [ ] Testar cores do tema dark

## PARTE 6: TESTES DE RESPONSIVIDADE (1 hora)

### 6.1 Teste Mobile (375px width)
- [ ] Verificar layout empilhado
- [ ] Verificar que sidebar colapsa/mobile menu aparece
- [ ] Verificar que tabelas responsivas ficam scrolláveis
- [ ] Testar touch interactions
- [ ] Verificar que botões têm tamanho adequado

### 6.2 Teste Tablet (768px width)
- [ ] Verificar layout intermediário
- [ ] Testar grids e colunas
- [ ] Testar modals e popovers

### 6.3 Teste Desktop (1920px width)
- [ ] Verificar layout completo
- [ ] Testar multi-column layouts
- [ ] Testar sidebars expandidos

## PARTE 7: TESTES DE PERFORMANCE (30 minutos)

### 7.1 Tempo de Carregamento
- [ ] Medir tempo inicial de carregamento (First Contentful Paint)
- [ ] Medir tempo de interatividade (Time to Interactive)
- [ ] Verificar que carregamento é < 3 segundos
- [ ] Testar velocidade de navegação entre páginas

### 7.2 Otimização
- [ ] Verificar que imagens estão otimizadas
- [ ] Testar minificação de JavaScript
- [ ] Testar minificação de CSS
- [ ] Verificar que não há requests desnecessários

## PARTE 8: TESTES DE SEGURANÇA (30 minutos)

### 8.1 Autenticação e Autorização
- [ ] Verificar que senhas não são expostas em logs
- [ ] Testar que tokens são validados
- [ ] Testar que usuários não podem acessar dados de outros usuários
- [ ] Testar CSRF protection (NextAuth)

### 8.2 Validação de Entrada
- [ ] Testar SQL injection em campos de busca
- [ ] Testar XSS em campos de texto
- [ ] Testar que todos os inputs são sanitizados

## PARTE 9: TESTES DE EDGE CASES (1 hora)

### 9.1 Cenários Extremos
- [ ] Testar com grande quantidade de dados (1000+ ordens)
- [ ] Testar com usuários simultâneos
- [ ] Testar com conexão lenta (simular throttle)
- [ ] Testar com conexão perdida (offline)
- [ ] Testar recuperação após erro

### 9.2 Casos Especiais
- [ ] Testar com caracteres especiais em nomes
- [ ] Testar com datas futuras/passadas extremas
- [ ] Testar com valores negativos onde não permitido
- [ ] Testar com campos muito longos

## PARTE 10: TESTE DE ACESSIBILIDADE (30 minutos)

### 10.1 Navegação por Teclado
- [ ] Testar Tab navigation
- [ ] Testar Enter para submeter formulários
- [ ] Testar Escape para fechar modals
- [ ] Verificar focus indicators visíveis

### 10.2 Leitura de Tela
- [ ] Verificar que labels estão associadas a inputs
- [ ] Verificar que alternativa de texto existe para imagens
- [ ] Testar com screen reader (Narrator ou similar)

## TEMPO ESTIMADO POR SEÇÃO
- Parte 1: 30 min ✓
- Parte 2: 1,5 h
- Parte 3: 2 h
- Parte 4: 1,5 h
- Parte 5: 1 h
- Parte 6: 1 h
- Parte 7: 30 min
- Parte 8: 30 min
- Parte 9: 1 h
- Parte 10: 30 min
**TOTAL: 10 horas** (com 4 horas de buffer para ajustes)

## DOCUMENTAÇÃO DOS TESTES
Cada teste executado deve ser documentado em `docs/RELATORIO_TESTES_2025-12-15.md` com:
- Número do teste
- Descrição
- Resultado (✓ PASSOU / ✗ FALHOU)
- Observações
- Data/Hora de execução

## CRITÉRIO DE SUCESSO
- Mínimo 95% dos testes devem passar
- Todos os testes de autenticação devem passar
- Todos os testes críticos (autenticação, APIs, persistência) devem passar
- Nenhum erro crítico no console
- Performance aceitável (< 3s carregamento)

## NOTAS IMPORTANTES
- Executar testes sistematicamente na ordem especificada
- Documentar qualquer desvio ou problema encontrado
- Se um teste falhar, investigar causa raiz antes de continuar
- Gerar relatório final com resumo executivo
- Incluir screenshots de evidência para testes críticos
