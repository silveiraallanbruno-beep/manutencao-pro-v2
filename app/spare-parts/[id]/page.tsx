// Auto-deployed via Vercel webhook

const sparePartsData = {
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

export async function generateStaticParams() {
  return Object.keys(sparePartsData).map((id) => ({
    id,
  }));
}

export default function SparePartPage({ params }) {
  const { id } = params;  const sparePart = sparePartsData[id as keyof typeof sparePartsData];

  if (!sparePart) {
    return (
      <div style={{ padding: '2rem', fontSize: '18px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '1rem' }}>Peça não encontrada</h1>
        <p>ID solicitado: {id}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>{sparePart.name}</h1>
      <div style={{ backgroundColor: '#f5f5f5', padding: '1.5rem', borderRadius: '8px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <strong>ID:</strong> <span style={{ marginLeft: '0.5rem' }}>{sparePart.id}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Categoria:</strong> <span style={{ marginLeft: '0.5rem' }}>{sparePart.category}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Preço Unitário:</strong> <span style={{ marginLeft: '0.5rem' }}>R$ {sparePart.price.toFixed(2)}</span>
        </div>
        <div>
          <strong>Quantidade Disponível:</strong> <span style={{ marginLeft: '0.5rem' }}>{sparePart.quantity} un.</span>
        </div>
      </div>
    </div>
  );
}
