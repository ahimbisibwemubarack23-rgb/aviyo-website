// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Only create the client if we have the required env vars
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// For server components that might be called during build
export const getSupabaseAdmin = () => {
  if (!supabaseAdmin) {
    console.warn('Supabase admin client not available (missing env vars)')
    return null
  }
  return supabaseAdmin
}
