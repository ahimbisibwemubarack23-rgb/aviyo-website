//cat > middleware.ts << 'EOF'
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
  const isLoginRoute = req.nextUrl.pathname.startsWith('/login')

  // If accessing admin route without session, redirect to login
  if (isAdminRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If logged in and trying to access login, redirect to dashboard
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
//EOF