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
    console.warn('⚠️ Supabase admin client not available (missing env vars). Returning mock for build.')
    // Return a mock client that won't error during build
    return {
      from: (table: string) => ({
        select: (fields: string = '*') => ({
          order: (column: string, options: any = {}) => ({
            data: [],
            error: null,
          }),
          single: () => Promise.resolve({ data: null, error: null }),
          eq: (column: string, value: any) => ({
            single: () => Promise.resolve({ data: null, error: null }),
            select: (fields: string = '*') => ({
              order: (column: string, options: any = {}) => ({
                data: [],
                error: null,
              }),
            }),
          }),
        }),
        insert: (data: any) => Promise.resolve({ data: null, error: null }),
        update: (data: any) => ({
          eq: (column: string, value: any) => ({
            select: (fields: string = '*') => ({
              single: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
        }),
        delete: () => ({
          eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
        }),
      }),
    }
  }
  return supabaseAdmin
}

// For getting counts in dashboard
export const getSupabaseAdminWithCount = () => {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase admin client not available (missing env vars). Returning mock for build.')
    return {
      from: (table: string) => ({
        select: (fields: string = '*', options: any = {}) => ({
          data: [],
          error: null,
          count: 0,
        }),
      }),
    }
  }
  return supabaseAdmin
}
