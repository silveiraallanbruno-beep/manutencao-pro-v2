// app/components/OrdersTable.tsx - FASE 2
'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit, Eye } from 'lucide-react'

interface Order {
  id: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in_progress' | 'completed'
  scheduled_date: string
  created_at: string
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/work-orders')
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Erro ao carregar ordens:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'bg-red-900 text-red-200',
      high: 'bg-orange-900 text-orange-200',
      medium: 'bg-yellow-900 text-yellow-200',
      low: 'bg-green-900 text-green-200'
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-400',
      in_progress: 'text-blue-400',
      completed: 'text-green-400'
    }
    return colors[status as keyof typeof colors] || 'text-gray-400'
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ordens de Manutenção</h2>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
          + Nova Ordem
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Carregando...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Nenhuma ordem encontrada</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">ID</th>
                <th className="text-left py-3 px-4 font-semibold">Descrição</th>
                <th className="text-left py-3 px-4 font-semibold">Prioridade</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Data Programada</th>
                <th className="text-left py-3 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                  <td className="py-3 px-4 text-sm">{order.id.substring(0, 8)}...</td>
                  <td className="py-3 px-4 text-sm">{order.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="py-3 px-4 text-sm">{new Date(order.scheduled_date).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors" title="Visualizar">
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-400 hover:text-yellow-300 transition-colors" title="Editar">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors" title="Deletar">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
