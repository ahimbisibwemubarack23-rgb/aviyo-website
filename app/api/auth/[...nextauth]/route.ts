import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

declare module 'next-auth' {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id?: string
      email?: string
      name?: string
      role?: string
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
          })

          if (authError || !authData.user) {
            console.error('Auth error:', authError)
            return null
          }

          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authData.user.id)
            .single()

          if (userError) {
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert({
                id: authData.user.id,
                email: authData.user.email,
                full_name: authData.user.email?.split('@')[0] || 'User',
                role: 'editor'
              })
              .select()
              .single()

            if (insertError) {
              console.error('Insert error:', insertError)
              return null
            }

            return {
              id: authData.user.id,
              email: authData.user.email!,
              name: newUser.full_name || authData.user.email,
              role: newUser.role || 'editor',
            }
          }

          return {
            id: authData.user.id,
            email: authData.user.email!,
            name: userData.full_name || authData.user.email,
            role: userData.role || 'editor',
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
