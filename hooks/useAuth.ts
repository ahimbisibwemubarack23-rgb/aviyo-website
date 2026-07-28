//cat > hooks/useAuth.ts << 'EOF'
'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { User } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface AuthState {
  user: User | null
  session: any | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      if (!supabase) {
        setState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
        })
        return
      }

      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          // Get user data from the users table
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()

          setState({
            user: userData as User,
            session,
            isLoading: false,
            isAuthenticated: true,
          })
        } else {
          setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      } catch (error) {
        setState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    getSession()

    // Listen for auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event: string, session: any) => {
          if (event === 'SIGNED_IN' && session) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()

            setState({
              user: userData as User,
              session,
              isLoading: false,
              isAuthenticated: true,
            })
          } else if (event === 'SIGNED_OUT') {
            setState({
              user: null,
              session: null,
              isLoading: false,
              isAuthenticated: false,
            })
          }
        }
      )

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Authentication service unavailable')
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }, [])

  const logout = useCallback(async () => {
    if (!supabase) {
      throw new Error('Authentication service unavailable')
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  }, [router])

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    if (!supabase) {
      throw new Error('Authentication service unavailable')
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error

    // Create user record in the users table
    if (data.user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          role: 'editor', // Default role
        })

      if (insertError) throw insertError
    }

    return data
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    if (!supabase) {
      throw new Error('Authentication service unavailable')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  }, [])

  return {
    ...state,
    login,
    logout,
    register,
    resetPassword,
  }
}
//EOF