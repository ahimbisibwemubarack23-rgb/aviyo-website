export const runtime = "edge";
// app/api/testimonials/route.ts
export const runtime = "edge";
import { supabaseAdmin } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch all active testimonials
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST - Create a new testimonial (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.quote) {
      return NextResponse.json(
        { error: 'Name and quote are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}