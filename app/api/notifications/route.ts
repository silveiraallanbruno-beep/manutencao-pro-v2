// app/api/notifications/route.ts - FASE 2
import { NextRequest, NextResponse } from 'next/server'
// import { supabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success' | 'critical'
  read: boolean
  created_at: string
}

// GET all notifications with unread filter
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    let query = supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })

    if (unreadOnly) query = query.eq('read', false)

    const { data, error } = await query

    if (error) throw error

    // Count unread notifications
    const unreadCount = data?.filter(n => !n.read).length || 0

    return NextResponse.json({
      notifications: data,
      unreadCount
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - Create new notification (internal use)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body: Omit<Notification, 'id' | 'created_at'> = await request.json()

    const { data, error } = await supabase
      .from('notifications')
      .insert([{ ...body, read: false }])
      .select()

    if (error) throw error
    return NextResponse.json(data[0], { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// PATCH - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { notificationIds, markAsRead } = body

    if (!Array.isArray(notificationIds)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('notifications')
      .update({ read: markAsRead })
      .in('id', notificationIds)
      .select()

    if (error) throw error
    return NextResponse.json({ message: 'Notificações atualizadas', count: data?.length || 0 }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
