// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfwbkwjujlvirxjytihw.supabase.co'
const supabaseAnonKey = 'sb_publishable_0Qel6JKxDnILOks0dyfaDg_22dTuFcf'

// Use the Edge Function as a proxy for all requests
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-use-edge-proxy': 'true',
    },
  },
})

export { supabase }
