// app/components/NotificationPanel.tsx - FASE 2
'use client'

import { useState, useEffect } from 'react'
import { Bell, X, Check } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success' | 'critical'
  read: boolean
  created_at: string
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications')
      const data = await res.json()
      if (data.notifications) {
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      critical: 'border-l-red-500 bg-red-900/20',
      error: 'border-l-orange-500 bg-orange-900/20',
      warning: 'border-l-yellow-500 bg-yellow-900/20',
      success: 'border-l-green-500 bg-green-900/20',
      info: 'border-l-blue-500 bg-blue-900/20'
    }
    return colors[type as keyof typeof colors] || colors.info
  }

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notificationIds: [notificationId],
          markAsRead: true
        })
      })
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Erro ao marcar como lida:', error)
    }
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Header com contador */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Notificações</h2>
          {unreadCount > 0 && (
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Lista de notificações */}
      <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-400">Carregando...</div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-400">Nenhuma notificação</div>
        ) : (
          notifications.map(notif => (
            <div
              key={notif.id}
              className={`p-4 border-l-4 flex items-start justify-between gap-4 hover:bg-gray-800/50 transition-colors ${
                getTypeColor(notif.type)
              } ${notif.read ? 'opacity-60' : 'opacity-100'}`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{notif.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{notif.message}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(notif.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
                  title="Marcar como lida"
                >
                  <Check size={18} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
