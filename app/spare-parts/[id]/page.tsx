'use client';

import { useParams } from 'next/navigation';

const sparePartsData: Record<string, any> = {
  'SP-001': {
    id: 'SP-001',
    name: 'Rolamento SKF 6208-2RS',
    category: 'Mecânicas',
    price: 145.00,
    quantity: 8,
  },
  'SP-002': {
    id: 'SP-002',
    name: 'Filtro de Óleo HF-6305',
    category: 'Hidráulicas',
    price: 85.00,
    quantity: 3,
  },
};

export default function SparePartPage() {
  const params = useParams();
  const id = params?.id as string;
  const sparePart = sparePartsData[id];

  if (!sparePart) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Peça não encontrada</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{sparePart.name}</h1>
      <div style={{ marginTop: '2rem' }}>
        <p><strong>ID:</strong> {sparePart.id}</p>
        <p><strong>Categoria:</strong> {sparePart.category}</p>
        <p><strong>Preço:</strong> R$ {sparePart.price.toFixed(2)}</p>
        <p><strong>Quantidade:</strong> {sparePart.quantity} un.</p>
      </div>
    </div>
  );
}
