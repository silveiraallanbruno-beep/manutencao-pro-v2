// Constantes da aplicacao

export const APP_NAME = 'ManutencaoPro';
export const APP_VERSION = '2.0.0';

// URLs da API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const API_ENDPOINTS = {
  WORK_ORDERS: '/api/work-orders',
  TASKS: '/api/tasks',
  NOTIFICATIONS: '/api/notifications',
  AUTH: '/api/auth',
  USERS: '/api/users',
};

// Status de Ordens de Servico
export const ORDER_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS_LABELS = {
  pending: 'Pendente',
  in_progress: 'Em Progresso',
  completed: 'Concluida',
  cancelled: 'Cancelada',
};

// Prioridades
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const PRIORITY_LABELS = {
  low: 'Baixa',
  medium: 'Media',
  high: 'Alta',
};

// Limites de paginacao
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
  MAX_LIMIT: 100,
};

// Tempos de timeout
export const TIMEOUTS = {
  API_CALL: 30000,
  TOAST_NOTIFICATION: 5000,
  SESSION: 24 * 60 * 60 * 1000,
};

// Mensagens padrao
export const MESSAGES = {
  ERROR_GENERIC: 'Ocorreu um erro. Tente novamente.',
  ERROR_NETWORK: 'Erro de conexao. Verifique sua internet.',
  ERROR_UNAUTHORIZED: 'Voce nao tem permissao para acessar isto.',
  ERROR_NOT_FOUND: 'Recurso nao encontrado.',
  SUCCESS_SAVE: 'Salvo com sucesso!',
  SUCCESS_DELETE: 'Deletado com sucesso!',
  SUCCESS_UPDATE: 'Atualizado com sucesso!',
  CONFIRM_DELETE: 'Tem certeza que deseja deletar?',
};

// Idiomas suportados
export const SUPPORTED_LANGUAGES = {
  PT_BR: 'pt-BR',
  EN: 'en',
} as const;

export const DEFAULT_LANGUAGE = 'pt-BR';
