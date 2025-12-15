// app/(auth)/login/page.tsx - Página de Login
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Github, Chrome } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Email ou senha inválidos')
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = (provider: 'github' | 'google') => {
    signIn(provider, { redirect: true, callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🔐 ManutençãoPro</h1>
          <p className="text-gray-400">Sistema de Gestão de Manutenção Industrial</p>
        </div>

        {/* Card de Login */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded p-4 mb-6 text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-700 border border-gray-600 rounded py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? '🔎' : '🚫'}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Ou continue com</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleOAuthSignIn('github')}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200 border border-gray-600"
            >
              <Github size={18} />
              GitHub
            </button>
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200 border border-gray-600"
            >
              <Chrome size={18} />
              Google
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  )
}
