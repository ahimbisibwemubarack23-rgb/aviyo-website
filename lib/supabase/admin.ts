// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Admin client with full access (only use in server components)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Admin client with schema access
export const supabaseAdminDb = createClient(supabaseUrl, supabaseServiceKey, {
  db: {
    schema: 'public',
  },
})