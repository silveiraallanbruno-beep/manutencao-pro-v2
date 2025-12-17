'use client';


import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const mockData: Record<string, any> = {
  'SP-001': {
    id: 'SP-001',
    code: 'SP-001',
    name: 'Rolamento SKF 6208-2RS',
    category: 'Mecânicas',
    manufacturer: 'SKF do Brasil',
    location: 'Almoxarifado A - Prateleira 12',
    price: 145.00,
    quantity: 8,
    minStock: 5,
    partNumber: 'SKF-6208-2RS',
    description: 'Rolamento de esferas blindado para eixos de até 20mm',
  },
  'SP-002': {
    id: 'SP-002',
    code: 'SP-002',
    name: 'Filtro de Óleo HF-6305',
    category: 'Hidráulicas',
    manufacturer: 'Parker Hannifin',
    location: 'Almoxarifado B - Prateleira 5',
    price: 85.00,
    quantity: 3,
    minStock: 10,
    partNumber: 'HYD-6305',
    description: 'Filtro hidráulico de alta eficiência',
  },
};

export function generateStaticParams() {
  return [
    { id: 'SP-001' },
    { id: 'SP-002' },
  ];
}

export default function SparePartDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const sparePart = mockData[id];

  if (!sparePart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Peça não encontrada</h2>
          <button
            onClick={() => router.push('/spare-parts')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/spare-parts')}
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition mb-8"
        >
          <ArrowLeft size={24} />
          Voltar
        </button>

        <div className="mb-8">
          <span className="text-sm text-gray-400 mb-2 block">{sparePart.code}</span>
          <h1 className="text-4xl font-bold mb-2">{sparePart.name}</h1>
          <p className="text-gray-400">{sparePart.category}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Dados Gerais</h3>
              <div className="space-y-3">
                <p><strong>Fabricante:</strong> {sparePart.manufacturer}</p>
                <p><strong>Local:</strong> {sparePart.location}</p>
                <p><strong>P/N:</strong> {sparePart.partNumber}</p>
                <p><strong>Preço Unit.:</strong> R$ {sparePart.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Estoque</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Quantidade</p>
                  <p className="text-2xl font-bold text-cyan-500">{sparePart.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mínimo</p>
                  <p className={`text-2xl font-bold ${ sparePart.quantity < sparePart.minStock ? 'text-red-500' : 'text-green-500'}`}>{sparePart.minStock}</p>
                </div>
              </div>
              {sparePart.quantity < sparePart.minStock && (
                <p className="text-sm text-red-500 mt-4">Estoque Baixo - Reposição Necessária</p>
              )}
            </div>
          </div>
        </div>

        {sparePart.description && (
          <div className="mt-8 bg-gray-900 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Descrição</h3>
            <p className="text-gray-300">{sparePart.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
