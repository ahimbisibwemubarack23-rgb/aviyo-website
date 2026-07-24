export const runtime = "edge";
// app/api/farmers/route.ts
export const runtime = "edge";
import { supabaseAdmin } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch all farmer registrations (admin only)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('farmer_registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch farmers' },
      { status: 500 }
    )
  }
}

// POST - Register a farmer (public)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.full_name || !body.phone) {
      return NextResponse.json(
        { error: 'Full name and phone are required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin  // ← Removed 'data' from here
      .from('farmer_registrations')
      .insert({
        ...body,
        status: 'pending',
      })

    if (error) throw error

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register farmer' },
      { status: 500 }
    )
  }
}