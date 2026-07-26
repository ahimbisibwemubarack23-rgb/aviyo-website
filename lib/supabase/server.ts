import { createClient } from '@supabase/supabase-js'

// For server-side, we still need the full URL
const supabaseUrl = 'https://wfwbkwjujlvirxjytihw.supabase.co'
const supabaseServiceKey = 'sb_secret_5GlBrianwGOs5-Wj3pRuKA_JDMbMfC7'

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
