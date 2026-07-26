export const runtime = "edge";

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = supabaseAdmin
    if (!supabase) {
      return NextResponse.json([], { status: 200 })
    }
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.role) {
      return NextResponse.json(
        { error: 'Name and role are required' },
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

    const { data, error } = await supabase
      .from('team_members')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
