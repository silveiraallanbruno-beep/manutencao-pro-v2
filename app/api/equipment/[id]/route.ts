import { NextRequest, NextResponse } from 'next/server';

// GET - Buscar equipamento por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Aqui conectar com Supabase
    // const { data } = await supabase
    //   .from('equipment')
    //   .select('*')
    //   .eq('id', params.id)
    //   .single();
    
    // Mock data para demonstração
    const mockData = {
      id: params.id,
      name: 'Bomba Centrífuga',
      model: 'CP-200',
      manufacturer: 'Hidraulics Brasil',
      serialNumber: 'HB-2024-001',
      installDate: '2024-01-15',
      lastMaintenance: '2024-11-01',
      status: 'Operacional',
      location: 'Sala de Bombagem A'
    };
    
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Equipamento não encontrado' }, { status: 404 });
  }
}

// PUT - Atualizar equipamento
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    
    // Aqui conectar com Supabase
    // const { data, error } = await supabase
    //   .from('equipment')
    //   .update(body)
    //   .eq('id', params.id)
    //   .select();
    
    // if (error) throw error;
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    return NextResponse.json({ error: 'Erro ao atualizar equipamento' });
  }
}

// DELETE - Deletar equipamento
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Aqui conectar com Supabase
    // const { error } = await supabase
    //   .from('equipment')
    //   .delete()
    //   .eq('id', params.id);
    
    // if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'Equipamento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return NextResponse.json({ error: 'Erro ao deletar equipamento' });
  }
}
