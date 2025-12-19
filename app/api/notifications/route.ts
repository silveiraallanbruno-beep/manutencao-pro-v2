// /app/api/notifications/route.ts - Disabled pending supabase setup
import { NextRequest, NextResponse } from 'next/server';

// API endpoint disabled - supabase integration not yet configured
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'API not available' }, { status: 503 });
}
