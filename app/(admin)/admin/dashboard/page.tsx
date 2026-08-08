'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          window.location.href = '/login'
          return
        }
        setUser(session.user)
        setLoading(false)
      } catch (err) {
        window.location.href = '/login'
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.email}!</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
