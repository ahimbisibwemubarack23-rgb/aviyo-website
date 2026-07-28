//cat > hooks/useAuth.ts << 'EOF'
'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AuthState {
  user: any | null
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
    let isMounted = true

    const getSession = async () => {
      // If supabase is not available, set loading to false
      if (!supabase) {
        if (isMounted) {
          setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
        return
      }

      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session && isMounted) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()

          setState({
            user: userData || null,
            session,
            isLoading: false,
            isAuthenticated: true,
          })
        } else if (isMounted) {
          setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      }
    }

    getSession()

    // Auth state change listener
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event: string, session: any) => {
          if (!isMounted) return

          if (event === 'SIGNED_IN' && session) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()

            setState({
              user: userData || null,
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
        isMounted = false
        subscription.unsubscribe()
      }
    }

    return () => {
      isMounted = false
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

    if (data.user) {
      await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          role: 'editor',
        })
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