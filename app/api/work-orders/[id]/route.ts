// /app/api/work-orders/[id]/route.ts - Disabled pending supabase
import { NextRequest, NextResponse } from 'next/server';

// API endpoint disabled - supabase integration not yet configured
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'API not available' }, { status: 503 });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ error: 'API not available' }, { status: 503 });
}
