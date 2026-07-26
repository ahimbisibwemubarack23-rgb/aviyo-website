import { createClient } from '@supabase/supabase-js'

// Use the proxied URL - this bypasses CORS and DNS issues
const supabaseUrl = '/api/supabase'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
