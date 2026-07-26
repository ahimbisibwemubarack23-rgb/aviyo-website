import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfwbkwjujlvirxjytihw.supabase.co'
const supabaseAnonKey = 'sb_publishable_0Qel6JKxDnILOks0dyfaDg_22dTuFcf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
