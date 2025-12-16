'use client';

import { useEffect, useState, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const THEME_STORAGE_KEY = 'manutencao-pro-theme';
const DEFAULT_THEME: Theme = 'dark';

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  // Inicializar tema do localStorage
  useEffect(() => {
    // Verificar tema armazenado
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const preferredTheme = storedTheme || DEFAULT_THEME;
    
    setThemeState(preferredTheme);
    applyTheme(preferredTheme);
    setMounted(true);
  }, []);

  // Aplicar tema ao documento
  const applyTheme = useCallback((newTheme: Theme) => {
    const html = document.documentElement;
    
    if (newTheme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      document.body.style.backgroundColor = '#0f0f0f';
      document.body.style.color = '#ffffff';
    }
  }, []);

  // Salvar tema no localStorage e aplicar
  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  // Alternar entre temas
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme, setTheme]);

  if (!mounted) {
    return {
      theme: DEFAULT_THEME,
      toggleTheme: () => {},
      setTheme: () => {},
      isDark: DEFAULT_THEME === 'dark',
    };
  }

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
  };
}
