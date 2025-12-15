import { useSession } from 'next-auth/react';
import { useState, useCallback } from 'react';

interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const user: AuthUser | null = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  } : null;

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        // Redirecionar para login será feito pelo middleware
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    status,
    loading,
    logout,
  };
}
