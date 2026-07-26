// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Only create the client if we have the required env vars
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Mock data for build time
const emptyResult = { data: [], error: null, count: 0 }

// For server components that might be called during build
export const getSupabaseAdmin = () => {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase admin client not available (missing env vars). Returning mock for build.')
    // Return a mock client that won't error during build
    return {
      from: (table: string) => ({
        select: (fields: string = '*', options: any = {}) => {
          // If count option is provided, return count
          if (options && options.count === 'exact') {
            // For head: true, return just count
            if (options.head === true) {
              return Promise.resolve({ data: null, count: 0, error: null })
            }
            return Promise.resolve({ data: [], count: 0, error: null })
          }
          // Regular select with no count
          return {
            order: (column: string, options: any = {}) => {
              return {
                data: [],
                error: null,
                then: (resolve: any) => resolve({ data: [], error: null }),
              }
            },
            single: () => Promise.resolve({ data: null, error: null }),
            eq: (column: string, value: any) => ({
              single: () => Promise.resolve({ data: null, error: null }),
              select: (fields: string = '*') => ({
                order: (column: string, options: any = {}) => ({
                  data: [],
                  error: null,
                  then: (resolve: any) => resolve({ data: [], error: null }),
                }),
              }),
            }),
            then: (resolve: any) => resolve({ data: [], error: null }),
          }
        },
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

// For getting counts in dashboard - returns a simpler mock
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
