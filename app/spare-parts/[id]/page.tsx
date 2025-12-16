'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronsLeft, ArrowLeft } from 'lucide-react';

interface SparePart {
  id: string;
  code: string;
  name: string;
  category: string;
  manufacturer: string;
  location: string;
  price: number;
  quantity: number;
  minStock: number;
  description?: string;
  partNumber?: string;
  created_at?: string;
  updated_at?: string;
}

export default function SparePartDetail() {
  const router = useRouter();
  const params = useParams();
  const [sparePart, setSparePart] = useState<SparePart | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<SparePart | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    const loadSparePart = async () => {
      try {
        setLoading(true);
        // Simular carregamento de dados
        const mockData: SparePart = {
          id: id || '1',
          code: 'SP-001',
          name: 'Rolamento SKF 6208-2RS',
          category: 'Mecânicas',
          manufacturer: 'SKF do Brasil',
          location: 'Almoxarifado A - Prateleira 12',
          price: 145.00,
          quantity: 8,
          minStock: 5,
          description: 'Rolamento de esferas blindado para eixos de até 20mm',
          partNumber: 'SKF-6208-2RS',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setSparePart(mockData);
        setFormData(mockData);
      } catch (error) {
        console.error('Erro ao carregar peça:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadSparePart();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(
      formData ? { ...formData, [name]: name.includes('price') || name.includes('quantity') || name.includes('minStock') ? parseFloat(value) || 0 : value } : null
    );
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      setIsSaving(true);
      // Simular salvar dados
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSparePart(formData);
      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Simular deletar
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.back();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    } finally {
      setIsDeleting(false);
    }
  };

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

  if (!sparePart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Peça não encontrada</h2>
          <button
            onClick={() => router.back()}
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition"
          >
            <ChevronsLeft size={24} />
            Voltar
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400 mb-2 block">{sparePart.code}</span>
              <h1 className="text-4xl font-bold mb-2">{sparePart.name}</h1>
              <p className="text-gray-400">{sparePart.category}</p>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-3 bg-cyan-500 text-white rounded font-semibold hover:bg-cyan-600 transition"
              >
                Editar
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Dados Gerais</h3>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Nome da Peça</label>
                    <input
                      type="text"
                      name="name"
                      value={formData?.name || ''}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-cyan-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Categoria</label>
                    <input
                      type="text"
                      name="category"
                      value={formData?.category || ''}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-cyan-500 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p><strong>Categoria:</strong> {sparePart.category}</p>
                  <p><strong>Fabricante:</strong> {sparePart.manufacturer}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Estoque</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Quantidade</p>
                  {editing ? (
                    <input
                      type="number"
                      name="quantity"
                      value={formData?.quantity || 0}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-cyan-500 outline-none"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-cyan-500">{sparePart.quantity}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mínimo</p>
                  <p className="text-2xl font-bold text-orange-500">{sparePart.minStock}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {editing && (
          <div className="flex gap-4 justify-end mt-8">
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-3 bg-gray-800 text-white rounded font-semibold hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-cyan-500 text-white rounded font-semibold hover:bg-cyan-600 transition disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        )}

        {/* Delete Button */}
        {!editing && (
          <div className="mt-8 pt-8 border-t border-gray-800">
            {showDeleteConfirm ? (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
                <p className="mb-4">Tem certeza que deseja deletar esta peça? Esta ação não pode ser desfeita.</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {isDeleting ? 'Deletando...' : 'Deletar'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 bg-red-900/20 text-red-500 rounded font-semibold hover:bg-red-900/40 transition border border-red-500"
              >
                Deletar Peça
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
