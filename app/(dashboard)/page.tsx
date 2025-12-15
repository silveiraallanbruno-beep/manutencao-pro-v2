'use client';

import { useEffect, useState } from 'react';
import { BarChart3, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Metrics {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
}

interface Activity {
  id: string;
  type: 'order' | 'task' | 'notification';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch work orders
        const response = await fetch('/api/work-orders');
        if (response.ok) {
          const orders = await response.json();
          const completed = orders.filter((o: any) => o.status === 'completed').length;
          const pending = orders.filter((o: any) => o.status === 'pending').length;
          const inProgress = orders.filter((o: any) => o.status === 'in_progress').length;

          setMetrics({
            totalOrders: orders.length,
            completedOrders: completed,
            pendingOrders: pending,
            inProgressOrders: inProgress,
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-100 mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          {Icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-100">Dashboard</h2>
        <p className="text-gray-400 mt-2">Bem-vindo ao ManutençãoPro. Veja um resumo de suas atividades.</p>
      </div>

      {/* Metrics Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total de Ordens"
            value={metrics.totalOrders}
            icon={<BarChart3 size={24} className="text-white" />}
            color="bg-blue-900/30 border border-blue-700"
          />
          <MetricCard
            title="Em Progresso"
            value={metrics.inProgressOrders}
            icon={<Clock size={24} className="text-white" />}
            color="bg-yellow-900/30 border border-yellow-700"
          />
          <MetricCard
            title="Pendentes"
            value={metrics.pendingOrders}
            icon={<AlertCircle size={24} className="text-white" />}
            color="bg-red-900/30 border border-red-700"
          />
          <MetricCard
            title="Concluídas"
            value={metrics.completedOrders}
            icon={<CheckCircle size={24} className="text-white" />}
            color="bg-green-900/30 border border-green-700"
          />
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-100 mb-4">Atividade Recente</h3>
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-400">Carregando atividades...</p>
          ) : activities.length > 0 ? (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-gray-700 last:border-b-0"
              >
                <div
                  className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    activity.status === 'completed'
                      ? 'bg-green-500'
                      : activity.status === 'in_progress'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-gray-100 font-medium">{activity.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">Nenhuma atividade recente</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          + Nova Ordem de Serviço
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
          Ver Relatórios
        </button>
      </div>
    </div>
  );
}
