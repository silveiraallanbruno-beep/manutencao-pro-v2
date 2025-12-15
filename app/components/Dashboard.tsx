// app/components/Dashboard.tsx - FASE 2
'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface DashboardMetrics {
  totalOrdens: number
  tarefasConcluidas: number
  notificacoesNaoLidas: number
  ordensCriticas: number
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalOrdens: 0,
    tarefasConcluidas: 0,
    notificacoesNaoLidas: 0,
    ordensCriticas: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch work orders
        const ordersRes = await fetch('/api/work-orders')
        const ordersData = await ordersRes.json()
        
        // Fetch tasks
        const tasksRes = await fetch('/api/tasks')
        const tasksData = await tasksRes.json()
        
        // Fetch notifications
        const notificationsRes = await fetch('/api/notifications')
        const notificationsData = await notificationsRes.json()

        setMetrics({
          totalOrdens: Array.isArray(ordersData) ? ordersData.length : 0,
          tarefasConcluidas: Array.isArray(tasksData) ? tasksData.filter(t => t.status === 'completed').length : 0,
          notificacoesNaoLidas: notificationsData?.unreadCount || 0,
          ordensCriticas: Array.isArray(ordersData) ? ordersData.filter(o => o.priority === 'critical').length : 0
        })
      } catch (error) {
        console.error('Erro ao carregar métricas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{loading ? '-' : value}</p>
        </div>
        <Icon className={`w-12 h-12 ${color}`} />
      </div>
    </div>
  )

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Painel de Controle</h1>
          <p className="text-gray-400 mt-2">Bem-vindo ao sistema de gestão de manutenção</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BarChart}
            label="Total de Ordens"
            value={metrics.totalOrdens}
            color="text-blue-400"
          />
          <StatCard
            icon={CheckCircle}
            label="Tarefas Concluídas"
            value={metrics.tarefasConcluidas}
            color="text-green-400"
          />
          <StatCard
            icon={Bell}
            label="Notificações Não Lidas"
            value={metrics.notificacoesNaoLidas}
            color="text-yellow-400"
          />
          <StatCard
            icon={AlertCircle}
            label="Ordens Críticas"
            value={metrics.ordensCriticas}
            color="text-red-400"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
              Nova Ordem
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
              Nova Tarefa
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors">
              Ver Notificações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
