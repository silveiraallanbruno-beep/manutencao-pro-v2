import { NextRequest, NextResponse } from 'next/server';

// GET - Listar todos os equipamentos
export async function GET() {
  try {
    // Aqui conectar com Supabase
    // const { data } = await supabase.from('equipment').select('*');
    
    // Mock data para demonstração
    const mockData = [
      {
        id: '1',
        name: 'Bomba Centrífuga',
        model: 'CP-200',
        manufacturer: 'Hidraulics Brasil',
        serialNumber: 'HB-2024-001',
        installDate: '2024-01-15',
        lastMaintenance: '2024-11-01',
        status: 'Operacional',
        location: 'Sala de Bombagem A'
      }
    ];
    
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Erro ao buscar equipamentos' });
  }
}

// POST - Criar novo equipamento
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Aqui conectar com Supabase
    // const { data, error } = await supabase
    //   .from('equipment')
    //   .insert([body])
    //   .select();
    
    // if (error) throw error;
    
    return NextResponse.json({ success: true, data: body }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar:', error);
    return NextResponse.json({ error: 'Erro ao criar equipamento' });
  }
}
