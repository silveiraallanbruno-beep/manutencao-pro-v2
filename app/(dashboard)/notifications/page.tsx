'use client';

import { useEffect, useState } from 'react';
import { Trash2, Check, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Ordem Concluída',
      message: 'A ordem de serviço #123 foi concluída com sucesso.',
      type: 'success',
      read: false,
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      title: 'Tarefa Pendente',
      message: 'A tarefa "Manutenção do Motor" vencerá amanhã.',
      type: 'warning',
      read: false,
      created_at: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: '3',
      title: 'Nova Mensagem',
      message: 'João Silva adicionou um comentário na ordem #115.',
      type: 'info',
      read: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(false);

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      if (response.ok) {
        setNotifications(notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        ));
      }
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotifications(notifications.filter(n => n.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
    }
  };

  const markAllAsRead = async () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getNotificationColor = (type: string, read: boolean) => {
    if (read) return 'bg-gray-800/50';
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border border-green-700/50';
      case 'warning':
        return 'bg-yellow-900/20 border border-yellow-700/50';
      case 'error':
        return 'bg-red-900/20 border border-red-700/50';
      case 'info':
      default:
        return 'bg-blue-900/20 border border-blue-700/50';
    }
  };

  const filteredNotifications = notifications.filter(n =>
    filter === 'all' ? true : !n.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-100">Notificações</h2>
          <p className="text-gray-400 mt-2">Fique atualizado sobre suas atividades.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Check size={20} />
            Marcar Tudo como Lido
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Todas ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Não Lidas ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center text-gray-400">
            {filter === 'unread' && unreadCount === 0 ? (
              <div>
                <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
                <p>Parabéns! Você leu todas as notificações.</p>
              </div>
            ) : (
              <p>Nenhuma notificação encontrada.</p>
            )}
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg p-4 transition-all hover:shadow-md ${
                getNotificationColor(notification.type, notification.read)
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-100">{notification.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 transition-colors"
                      title="Marcar como lido"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 hover:bg-gray-700 rounded-lg text-red-400 transition-colors"
                    title="Deletar notificação"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
