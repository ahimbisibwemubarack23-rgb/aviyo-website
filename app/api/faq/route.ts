// app/api/faq/route.ts
export const runtime = "edge";
import { supabaseAdmin } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch all active FAQs
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}

// POST - Create a new FAQ (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.question || !body.answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('faqs')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}