'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Circle, Trash2, Plus, Filter } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  work_order_id: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus as any } : t));
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm('Deseja realmente deletar esta tarefa?')) return;
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks(tasks.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900/20 border border-red-700 text-red-400';
      case 'medium':
        return 'bg-yellow-900/20 border border-yellow-700 text-yellow-400';
      case 'low':
        return 'bg-green-900/20 border border-green-700 text-green-400';
      default:
        return 'bg-gray-700/20 text-gray-400';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-100">Tarefas</h2>
          <p className="text-gray-400 mt-2">Gerencie suas tarefas diárias de manutenção.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 outline-none cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <option value="all">Todos os Status</option>
          <option value="pending">Pendentes</option>
          <option value="completed">Concluídas</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as any)}
          className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 outline-none cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <option value="all">Todas as Prioridades</option>
          <option value="high">Alta</option>
          <option value="medium">Média</option>
          <option value="low">Baixa</option>
        </select>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-gray-400 py-8">
            Carregando tarefas...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center text-gray-400">
            Nenhuma tarefa encontrada.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                  className="mt-1 text-gray-400 hover:text-blue-400 transition-colors flex-shrink-0"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle size={24} className="text-green-400" />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-semibold ${
                    task.status === 'completed'
                      ? 'text-gray-500 line-through'
                      : 'text-gray-100'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' && 'Alta'}
                      {task.priority === 'medium' && 'Média'}
                      {task.priority === 'low' && 'Baixa'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Vencimento: {new Date(task.due_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-2xl font-bold text-gray-100">{tasks.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-400">{tasks.filter(t => t.status === 'pending').length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Concluídas</p>
            <p className="text-2xl font-bold text-green-400">{tasks.filter(t => t.status === 'completed').length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
