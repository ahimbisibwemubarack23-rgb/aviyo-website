// app/api/contacts/route.ts
import { supabaseAdmin } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch all contact submissions (admin only)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

// POST - Create a new contact submission (public)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin  // ← Removed 'data' from here
      .from('contact_submissions')
      .insert({
        ...body,
        status: 'new',
      })

    if (error) throw error

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}