export const runtime = "edge";
// app/api/newsletter/route.ts
export const runtime = "edge";
import { supabaseAdmin } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch all newsletter subscribers (admin only)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

// POST - Subscribe to newsletter (public)
export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin  // ← Removed 'data' from here
      .from('newsletter_subscribers')
      .insert({ email })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Already subscribed' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// DELETE - Unsubscribe from newsletter
export async function DELETE(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .update({ is_active: false })
      .eq('email', email)

    if (error) throw error

    return NextResponse.json(
      { message: 'Unsubscribed successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}