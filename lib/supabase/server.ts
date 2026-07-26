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
    
    // Simple mock that returns empty data for all operations
    const emptyData = { data: [], error: null }
    
    // Create a chainable mock
    const createChainable = () => {
      const chainable = {
        select: (fields: any = '*', options: any = {}) => {
          // For count queries, return empty result
          if (options && options.count === 'exact') {
            return Promise.resolve({ data: null, count: 0, error: null })
          }
          // Return the chainable for further chaining
          return chainable
        },
        order: (column: any = '', options: any = {}) => {
          return chainable
        },
        eq: (column: any = '', value: any = {}) => {
          return chainable
        },
        single: () => {
          return Promise.resolve({ data: null, error: null })
        },
        insert: (data: any) => {
          return Promise.resolve({ data: null, error: null })
        },
        update: (data: any) => {
          return chainable
        },
        delete: () => {
          return chainable
        },
        then: (resolve: any) => {
          resolve(emptyData)
        },
      }
      return chainable
    }

    return {
      from: (table: string) => createChainable(),
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
        select: (fields: string = '*', options: any = {}) => {
          if (options && options.count === 'exact') {
            return Promise.resolve({ data: null, count: 0, error: null })
          }
          return Promise.resolve({ data: [], error: null })
        },
      }),
    }
  }
  return supabaseAdmin
}
