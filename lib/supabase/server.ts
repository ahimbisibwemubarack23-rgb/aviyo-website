import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfwbkwjujlvirxjytihw.supabase.co'
const supabaseServiceKey = 'sb_secret_5GlBrianwGOs5-Wj3pRuKA_JDMbMfC7'

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
