// cat > app/\(admin\)/admin/layout.tsx << 'EOF'
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

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
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      if (!supabase) {
        window.location.replace('/login')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.replace('/login')
        return
      }
      setLoading(false)
    }
    checkSession()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary-600">Aviyo Admin</h1>
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  pathname === item.href ? 'text-primary-500' : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={async () => {
                if (supabase) {
                  await supabase.auth.signOut()
                }
                window.location.replace('/login')
              }}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}
// EOF