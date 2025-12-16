'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Edit2, Trash2, CheckCircle } from 'lucide-react';

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
  description: string;
  partNumber: string;
}

export default function SparePartDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sparePart, setSparePart] = useState<SparePart | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<SparePart | null>(null);

  useEffect(() => {
    loadSparePart();
  }, [params.id]);

  const loadSparePart = async () => {
    try {
      const response = await fetch(`/api/spare-parts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setSparePart(data);
        setFormData(data);
      } else {
        alert('Peça não encontrada');
        router.back();
      }
    } catch (error) {
      console.error('Erro ao carregar peça:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/api/spare-parts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSparePart(formData);
        setIsEditing(false);
        alert('Peça atualizada com sucesso!');
      } else {
        alert('Erro ao salvar peça');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao salvar peça');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/spare-parts/${params.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Peça deletada com sucesso!');
        router.push('/spare-parts');
      } else {
        alert('Erro ao deletar peça');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao deletar peça');
    } finally {
      setIsSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) return <div className="p-6 text-center">Carregando...</div>;
  if (!sparePart) return <div className="p-6 text-center">Peça não encontrada</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ChevronLeft size={24} />
            Voltar
          </button>
          <h1 className="text-3xl font-bold">{sparePart.name}</h1>
          <div className="flex gap-3">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  <Edit2 size={20} /> Editar
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  <Trash2 size={20} /> Deletar
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={formData?.name || ''}
                onChange={(e) => setFormData(f => f ? {...f, name: e.target.value} : null)}
                className="bg-gray-700 text-white p-3 rounded col-span-2"
              />
              <input
                type="text"
                placeholder="Código"
                value={formData?.code || ''}
                onChange={(e) => setFormData(f => f ? {...f, code: e.target.value} : null)}
                className="bg-gray-700 text-white p-3 rounded"
              />
              <input
                type="text"
                placeholder="Número da Peça"
                value={formData?.partNumber || ''}
                onChange={(e) => setFormData(f => f ? {...f, partNumber: e.target.value} : null)}
                className="bg-gray-700 text-white p-3 rounded"
              />
              <input
                type="text"
                placeholder="Fabricante"
                value={formData?.manufacturer || ''}
                onChange={(e) => setFormData(f => f ? {...f, manufacturer: e.target.value} : null)}
                className="bg-gray-700 text-white p-3 rounded"
              />
              <input
                type="text"
                placeholder="Localização"
                value={formData?.location || ''}
                onChange={(e) => setFormData(f => f ? {...f, location: e.target.value} : null)}
                className="bg-gray-700 text-white p-3 rounded"
              />
              <input
                type="number"
                placeholder="Preço"
                value={formData?.price || 0}
                onChange={(e) => setFormData(f => f ? {...f, price: parseFloat(e.target.value)} : null)}
                className="bg-gray-700 text-white p-3 rounded"
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={formData?.quantity || 0}
                onChange={(e) => setFormData(f => f ? {...f, quantity: parseInt(e.target.value)} : null)}
                className="bg-gray-700 text-white p-3 rounded"
              />
              <input
                type="number"
                placeholder="Estoque Mínimo"
                value={formData?.minStock || 0}
                onChange={(e) => setFormData(f => f ? {...f, minStock: parseInt(e.target.value)} : null)}
                className="bg-gray-700 text-white p-3 rounded"
              />
              <textarea
                placeholder="Descrição"
                value={formData?.description || ''}
                onChange={(e) => setFormData(f => f ? {...f, description: e.target.value} : null)}
                className="bg-gray-700 text-white p-3 rounded col-span-2 h-24"
              />
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="col-span-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} /> {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="col-span-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded font-semibold"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm">Código</label>
                <p className="text-xl font-semibold text-cyan-400">{sparePart.code}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Número da Peça</label>
                <p className="text-xl font-semibold text-cyan-400">{sparePart.partNumber}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Fabricante</label>
                <p className="text-xl font-semibold">{sparePart.manufacturer}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Categoria</label>
                <p className="text-xl font-semibold">{sparePart.category}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Localização</label>
                <p className="text-xl font-semibold">{sparePart.location}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Preço Unitário</label>
                <p className="text-xl font-semibold text-green-400">R$ {sparePart.price.toFixed(2)}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Quantidade em Estoque</label>
                <p className="text-xl font-semibold">{sparePart.quantity}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Estoque Mínimo</label>
                <p className="text-xl font-semibold">{sparePart.minStock}</p>
              </div>
              <div className="col-span-2">
                <label className="text-gray-400 text-sm">Descrição</label>
                <p className="text-lg">{sparePart.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-300 mb-6">Tem certeza que deseja deletar esta peça? Esta ação é irreversível.</p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
              >
                {isSaving ? 'Deletando...' : 'Deletar'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isSaving}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
