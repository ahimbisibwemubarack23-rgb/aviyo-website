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
    
    // Create a mock that mimics the Supabase client API
    const createMockQuery = () => {
      let query = {
        data: [],
        error: null,
        count: 0,
      }

      const execute = () => Promise.resolve(query)

      const order = (column: string, options: any = {}) => {
        // Mock ordering - just return the same mock
        return mockBuilder
      }

      const eq = (column: string, value: any) => {
        return mockBuilder
      }

      const single = () => {
        return Promise.resolve({ data: null, error: null })
      }

      const select = (fields: string = '*', options: any = {}) => {
        if (options && options.count === 'exact') {
          // Return a Promise with count
          return Promise.resolve({ data: null, count: 0, error: null })
        }
        // Return a builder with order method
        return {
          order: order,
          eq: eq,
          single: single,
          then: (resolve: any) => resolve({ data: [], error: null }),
        }
      }

      const insert = (data: any) => {
        return Promise.resolve({ data: null, error: null })
      }

      const update = (data: any) => {
        return {
          eq: (column: string, value: any) => ({
            select: (fields: string = '*') => ({
              single: () => Promise.resolve({ data: null, error: null }),
              order: (column: string, options: any = {}) => ({
                data: [],
                error: null,
                then: (resolve: any) => resolve({ data: [], error: null }),
              }),
            }),
          }),
        }
      }

      const del = () => {
        return {
          eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
        }
      }

      const mockBuilder = {
        select: select,
        order: order,
        eq: eq,
        single: single,
        insert: insert,
        update: update,
        delete: del,
        then: (resolve: any) => resolve({ data: [], error: null }),
      }

      return mockBuilder
    }

    return {
      from: (table: string) => createMockQuery(),
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
