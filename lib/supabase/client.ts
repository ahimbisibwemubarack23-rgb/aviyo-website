import { createClient } from '@supabase/supabase-js'

// Use the correct Supabase project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wfwbkwjujlvirxjytihw.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_0Qel6JKxDnILOks0dyfaDg_22dTuFcf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
