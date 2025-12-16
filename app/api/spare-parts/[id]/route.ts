import { NextRequest, NextResponse } from 'next/server';

// GET - Retornar peça por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Aqui conectar com Supabase
    // const { data, error } = await supabase
    //   .from('spare_parts')
    //   .select('*')
    //   .eq('id', params.id)
    //   .single();

    // Mock data para demonstração
    const mockData = {
      id: params.id,
      code: 'SP-001',
      name: 'Rolamento SKF 6208-2RS',
      category: 'Mecânicas',
      manufacturer: 'SKF do Brasil',
      location: 'Área de Usinagem - Prateleira A2',
      price: 145.00,
      quantity: 8,
      minStock: 5,
      description: 'Rolamento de esferas com dupla blindagem',
      partNumber: 'SKF-6208-2RS'
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Erro ao carregar peça' }, { status: 500 });
  }
}

// PUT - Atualizar peça
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    // Aqui conectar com Supabase
    // const { error } = await supabase
    //   .from('spare_parts')
    //   .update(body)
    //   .eq('id', params.id);

    // Se houver erro, retornar
    // if (error) throw error;

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    return NextResponse.json({ error: 'Erro ao atualizar peça' }, { status: 500 });
  }
}

// DELETE - Deletar peça
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Aqui conectar com Supabase
    // const { error } = await supabase
    //   .from('spare_parts')
    //   .delete()
    //   .eq('id', params.id);

    // Se houver erro, retornar
    // if (error) throw error;

    return NextResponse.json({ success: true, message: 'Peça deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return NextResponse.json({ error: 'Erro ao deletar peça' }, { status: 500 });
  }
}


// PUT - Atualizar peça
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Aqui conectar com Supabase
    // const { error } = await supabase
    //   .from('spare_parts')
    //   .update(body)
    //   .eq('id', params.id);
    
    const body = await req.json();
    
    // Se houver erro, retornar
    // if (error) throw error;
    
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    return NextResponse.json({ error: 'Erro ao atualizar peça' })
  }
}
