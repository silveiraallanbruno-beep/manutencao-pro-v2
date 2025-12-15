// Form validators using basic patterns (Zod can be added later)

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter letra minúscula');
  }
  if (!/\d/.test(password)) {
    errors.push('Senha deve conter número');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Senha deve conter caractere especial (!@#$%^&*)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 3;
};

export const validateWorkOrder = (data: any): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Título é obrigatório');
  }
  if (!data.description || data.description.trim().length === 0) {
    errors.push('Descrição é obrigatória');
  }
  if (!['low', 'medium', 'high'].includes(data.priority)) {
    errors.push('Prioridade inválida');
  }
  if (!data.assigned_to || data.assigned_to.trim().length === 0) {
    errors.push('Atribuíção obrigatória');
  }
  if (!data.due_date) {
    errors.push('Data de vencimento obrigatória');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateTask = (data: any): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Título da tarefa é obrigatório');
  }
  if (!['low', 'medium', 'high'].includes(data.priority)) {
    errors.push('Prioridade inválida');
  }
  if (!data.due_date) {
    errors.push('Data de vencimento obrigatória');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};}
