// cat > app/\(admin\)/admin/dashboard/page.tsx << 'EOF'
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      if (!supabase) return
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-500 mt-2">
        Welcome, {user?.email || 'Admin'}!
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900">Products</h3>
          <p className="text-3xl font-bold text-primary-500 mt-2">0</p>
          <a href="/admin/products" className="text-sm text-primary-500 mt-2 block">Manage →</a>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900">Blog Posts</h3>
          <p className="text-3xl font-bold text-primary-500 mt-2">0</p>
          <a href="/admin/blog" className="text-sm text-primary-500 mt-2 block">Manage →</a>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900">Team Members</h3>
          <p className="text-3xl font-bold text-primary-500 mt-2">0</p>
          <a href="/admin/team" className="text-sm text-primary-500 mt-2 block">Manage →</a>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900">FAQs</h3>
          <p className="text-3xl font-bold text-primary-500 mt-2">0</p>
          <a href="/admin/faq" className="text-sm text-primary-500 mt-2 block">Manage →</a>
        </div>
      </div>
    </div>
  )
}
// EOF