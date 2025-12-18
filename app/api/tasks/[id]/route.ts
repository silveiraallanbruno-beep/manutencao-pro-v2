// app/api/tasks/[id]/route.ts - FASE 2
// import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  due_date: string
  category: string
  completed_at?: string | null
  created_at: string
  updated_at: string
}

// GET individual task
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT - Update task
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body: Partial<Task> = await request.json()

    // If marking as completed, set completed_at timestamp
    if (body.status === 'completed' && !body.completed_at) {
      body.completed_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(body)
      .eq('id', params.id)
      .select()

    if (error) throw error
    if (!data || data.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(data[0], { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// DELETE task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', params.id)
      .select()

    if (error) throw error
    if (!data || data.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ message: 'Tarefa removida com sucesso' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
