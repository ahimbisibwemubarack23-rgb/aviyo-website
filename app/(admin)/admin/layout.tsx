// cat > app/\(admin\)/admin/layout.tsx << 'EOF'
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Blog Posts', href: '/admin/blog' },
  { name: 'Products', href: '/admin/products' },
  { name: 'Team Members', href: '/admin/team' },
  { name: 'FAQs', href: '/admin/faq' },
  { name: 'Testimonials', href: '/admin/testimonials' },
  { name: 'Contacts', href: '/admin/contacts' },
  { name: 'Newsletter', href: '/admin/newsletter' },
  { name: 'Farmers', href: '/admin/farmers' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Check localStorage first (client-side only)
      const token = localStorage.getItem('supabase_access_token')
      
      if (!token) {
        // No token, redirect to login
        window.location.href = '/login'
        return
      }

      // Verify token with Supabase
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setIsAuthorized(true)
          setLoading(false)
          return
        }
      }

      // If we get here, authentication failed
      localStorage.removeItem('supabase_access_token')
      localStorage.removeItem('supabase_refresh_token')
      window.location.href = '/login'
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    localStorage.removeItem('supabase_access_token')
    localStorage.removeItem('supabase_refresh_token')
    window.location.href = '/login'
  }

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
        <div className="flex items-center justify-between px-4 h-full">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900">Aviyo Admin</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
// EOF