// lib/supabase.ts - Cliente Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Check .env.local'
  )
}

// Cliente Supabase para uso no browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de dados (FASE 1)
export interface Equipment {
  id: string
  name: string
  type: string
  location: string
  status: 'operational' | 'maintenance' | 'inactive' | 'critical'
  acquisition_date: string
  created_at: string
  updated_at: string
}

export interface MaintenanceOrder {
  id: string
  equipment_id: string
  type: 'preventive' | 'corrective' | 'predictive'
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'closed'
  scheduled_date: string
  completed_date: string | null
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  due_date: string
  category: string
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'critical'
  read: boolean
  created_at: string
}
