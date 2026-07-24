// app/api/blog/route.ts
export const runtime = "edge";
import { supabaseAdmin } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch all published blog posts
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*, users!author_id(full_name)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create a new blog post (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        ...body,
        published_at: body.status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}