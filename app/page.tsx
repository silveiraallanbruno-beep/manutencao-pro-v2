'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">ManutençãoPro</h1>
        <p className="text-gray-400">Redirecionando...</p>
        <div className="mt-4">
          <div className="w-8 h-8 border-4 border-gray-700 border-t-blue-600 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    </div>
  );
}
