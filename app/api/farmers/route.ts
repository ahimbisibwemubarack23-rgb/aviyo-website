export const runtime = "edge";

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = supabaseAdmin
    if (!supabase) {
      return NextResponse.json([], { status: 200 })
    }
    
    const { data, error } = await supabase
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.full_name || !body.phone) {
      return NextResponse.json(
        { error: 'Full name and phone are required' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    const { error } = await supabase
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
