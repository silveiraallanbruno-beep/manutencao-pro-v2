// app/api/work-orders/route.ts - FASE 2
// import { NextRequest, NextResponse } from 'next/server'
// import { supabase } from '@/lib/supabase'
// import { MaintenanceOrder } from '@/lib/supabase'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

// GET com join para equipment
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('maintenance_orders')
      .select('*, equipments(*)')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST com notificacao para ordens criticas
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body: MaintenanceOrder = await request.json()

    const { data, error } = await supabase
      .from('maintenance_orders')
      .insert([body])
      .select()

    if (error) throw error

    // FASE 2: Notificacao se ordem critica
    if (body.priority === 'critical') {
      await supabase.from('notifications').insert([{
        title: 'Ordem Crítica Criada',
        message: `Ordem ${data[0].id} requer atenção imediata`,
        type: 'critical'
      }])
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
