// app/api/work-orders/[id]/route.ts - FASE 2
// import { NextRequest, NextResponse } from 'next/server'
// import { supabase } from '@/lib/supabase'
// import { MaintenanceOrder } from '@/lib/supabase'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

// GET individual work order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('maintenance_orders')
      .select('*, equipments(*)')
      .eq('id', params.id)
      .single()

    if (error) throw error
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT - Update work order
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body: Partial<MaintenanceOrder> = await request.json()
    const { data, error } = await supabase
      .from('maintenance_orders')
      .update(body)
      .eq('id', params.id)
      .select()

    if (error) throw error
    if (!data || data.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // FASE 2: Notificação se status mudar para concluío
    if (body.status === 'completed') {
      await supabase.from('notifications').insert([{
        title: 'Ordem Concluída',
        message: `Ordem ${params.id} foi concluída com sucesso`,
        type: 'success'
      }])
    }

    return NextResponse.json(data[0], { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// DELETE work order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('maintenance_orders')
      .delete()
      .eq('id', params.id)
      .select()

    if (error) throw error
    if (!data || data.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ message: 'Deletado com sucesso' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
