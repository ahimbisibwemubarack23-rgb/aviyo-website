import { createClient } from '@supabase/supabase-js'

// Single source of truth for Supabase configuration
export const SUPABASE_URL = 'https://wfwbkwjujlvirxjytihw.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_0Qel6JKxDnILOks0dyfaDg_22dTuFcf'

// Create a singleton Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Also export for use in Edge Functions
export const SUPABASE_CONFIG = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
}
