import { createClient } from '@supabase/supabase-js'

// Use the proxied URL instead of direct Supabase URL
const supabaseUrl = '/api/supabase'
const supabaseAnonKey = 'sb_publishable_0Qel6JKxDnILOks0dyfaDg_22dTuFcf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
