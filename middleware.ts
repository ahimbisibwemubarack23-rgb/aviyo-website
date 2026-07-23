// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login')
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')

  // Public API routes (no auth required)
  const publicApiRoutes = [
    '/api/newsletter',
    '/api/contact',
    '/api/farmers',
    '/api/products',
    '/api/blog',
    '/api/testimonials',
    '/api/faq',
  ]

  const isPublicApi = publicApiRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Allow public API routes
  if (isApiRoute && isPublicApi) {
    return res
  }

  // Protect admin routes
  if (isAdminRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if logged in and trying to access login
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  // Check user role for admin access
  if (isAdminRoute && session) {
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const allowedRoles = ['super_admin', 'admin', 'editor', 'publisher', 'reviewer']

    if (error || !user || !allowedRoles.includes(user.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/api/:path*',
  ],
}