'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search } from 'lucide-react';

interface SparePart {
  id: string;
  code: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  quantity: number;
  minStock: number;
}

export default function SparePartsPage() {
  const router = useRouter();
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data
    setSpareParts([
      {
        id: 'SP-001',
        code: 'SP-001',
        name: 'Rolamento SKF 6208-2RS',
        category: 'Mecânicas',
        manufacturer: 'SKF do Brasil',
        price: 145.00,
        quantity: 8,
        minStock: 5,
      },
      {
        id: 'SP-002',
        code: 'SP-002',
        name: 'Filtro de Óleo HF-6305',
        category: 'Hidráulicas',
        manufacturer: 'Parker Hannifin',
        price: 85.00,
        quantity: 3,
        minStock: 10,
      },
    ]);
    setLoading(false);
  }, []);

  const filteredParts = spareParts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Peças de Reposição</h1>
            <p className="text-gray-400">Gerencie o estoque de peças</p>
          </div>
          <button className="px-6 py-3 bg-cyan-500 text-white rounded font-semibold hover:bg-cyan-600 transition flex items-center gap-2">
            <Plus size={20} />
            Nova Peça
          </button>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar peças..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded border border-gray-700 focus:border-cyan-500 outline-none"
          />
        </div>

        <div className="space-y-4">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              onClick={() => router.push(`/spare-parts/${part.id}`)}
              className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition border border-gray-800 hover:border-cyan-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-400">{part.code}</span>
                  <h3 className="text-xl font-bold mb-2">{part.name}</h3>
                  <p className="text-gray-400">{part.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-500">{part.quantity}</p>
                  <p className="text-sm text-gray-400">un. disponíveis</p>
                  {part.quantity < part.minStock && (
                    <p className="text-sm text-red-500 mt-2">Estoque Baixo</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
