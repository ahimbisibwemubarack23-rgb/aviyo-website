'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('supabase_access_token')
    const userData = localStorage.getItem('supabase_user')
    if (!token) {
      window.location.href = '/login'
      return
    }
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-500 mt-2">Welcome, {user.email}!</p>
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
      <button
        onClick={() => {
          localStorage.clear()
          window.location.href = '/login'
        }}
        className="mt-6 text-red-500 hover:text-red-600"
      >
        Logout
      </button>
    </div>
  )
}
