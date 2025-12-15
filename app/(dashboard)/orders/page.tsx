'use client';

import { useEffect, useState } from 'react';
import { Trash2, Edit2, Plus, Search, Filter } from 'lucide-react';

interface WorkOrder {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigned_to: string;
  created_at: string;
  due_date: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/work-orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Deseja realmente deletar esta ordem?')) return;
    try {
      const response = await fetch(`/api/work-orders/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrders(orders.filter(o => o.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar ordem:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/20 text-green-400 border border-green-700';
      case 'in_progress':
        return 'bg-yellow-900/20 text-yellow-400 border border-yellow-700';
      case 'pending':
        return 'bg-red-900/20 text-red-400 border border-red-700';
      default:
        return 'bg-gray-700/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-100">Ordens de Serviço</h2>
          <p className="text-gray-400 mt-2">Gerencie todas as suas ordens de manutenção.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Nova Ordem
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64">
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ordens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-gray-100 flex-1 placeholder-gray-500"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 outline-none cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <option value="all">Todos os Status</option>
          <option value="pending">Pendentes</option>
          <option value="in_progress">Em Progresso</option>
          <option value="completed">Concluídas</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            Carregando ordens...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Nenhuma ordem encontrada.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700/50 border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Título</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Prioridade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Atribuído para</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Data de Vencimento</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-100">
                      <div>
                        <p className="font-medium">{order.title}</p>
                        <p className="text-gray-400 text-xs mt-1">{order.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status === 'pending' && 'Pendente'}
                        {order.status === 'in_progress' && 'Em Progresso'}
                        {order.status === 'completed' && 'Concluída'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`font-medium capitalize ${getPriorityColor(order.priority)}`}>
                        {order.priority === 'high' && 'Alta'}
                        {order.priority === 'medium' && 'Média'}
                        {order.priority === 'low' && 'Baixa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-100">{order.assigned_to}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(order.due_date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-2 hover:bg-gray-700 rounded-lg text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
