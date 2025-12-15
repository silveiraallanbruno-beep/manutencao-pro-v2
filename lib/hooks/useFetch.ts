import { useState, useEffect, useCallback } from 'react';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T = any>(
  url: string,
  options?: FetchOptions,
  deps: any[] = []
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...(options?.body && { body: JSON.stringify(options.body) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState({ data: null, loading: false, error: err });
      throw err;
    }
  }, [url, options]);

  useEffect(() => {
    if (options?.method && options.method !== 'GET') return;
    fetchData();
  }, deps.length > 0 ? deps : [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}
