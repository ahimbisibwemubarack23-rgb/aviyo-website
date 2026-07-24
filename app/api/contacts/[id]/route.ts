// app/api/contacts/[id]/route.ts
import { supabaseAdmin } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch a single contact submission
export async function GET(
  _request: Request,  // ← Add underscore
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    )
  }
}

// PUT - Update a contact submission status
export async function PUT(
  request: Request,  // ← This IS used
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .update({
        status: body.status,
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a contact submission
export async function DELETE(
  _request: Request,  // ← Add underscore
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    )
  }
}