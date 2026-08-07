'use client'

import { useState, useEffect } from 'react'
import {
  FaFileAlt,
  FaBox,
  FaUsers,
  FaQuestionCircle,
  FaStar,
  FaEnvelope,
  FaNewspaper,
  FaTractor,
  FaSignOutAlt,
} from 'react-icons/fa'

const SUPABASE_URL = 'https://wfwbkwjujlvirxjytihw.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_0Qel6JKxDnILOks0dyfaDg_22dTuFcf'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('supabase_access_token')
        if (!token) {
          window.location.href = '/login'
          return
        }

        const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'apikey': SUPABASE_ANON_KEY,
          },
        })

        if (!response.ok) {
          localStorage.removeItem('supabase_access_token')
          localStorage.removeItem('supabase_refresh_token')
          window.location.href = '/login'
          return
        }

        const user = await response.json()
        setUserEmail(user.email || 'Admin')
        setLoading(false)
      } catch (error) {
        window.location.href = '/login'
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('supabase_access_token')
    localStorage.removeItem('supabase_refresh_token')
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const stats = {
    blog: 0,
    products: 0,
    team: 0,
    faq: 0,
    testimonials: 0,
    contacts: 0,
    subscribers: 0,
    farmers: 0,
  }

  const cards = [
    { title: 'Blog Posts', count: stats.blog, icon: FaFileAlt, href: '/admin/blog', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Products', count: stats.products, icon: FaBox, href: '/admin/products', color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Team Members', count: stats.team, icon: FaUsers, href: '/admin/team', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'FAQs', count: stats.faq, icon: FaQuestionCircle, href: '/admin/faq', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { title: 'Testimonials', count: stats.testimonials, icon: FaStar, href: '/admin/testimonials', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Contacts', count: stats.contacts, icon: FaEnvelope, href: '/admin/contacts', color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Newsletter', count: stats.subscribers, icon: FaNewspaper, href: '/admin/newsletter', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Farmers', count: stats.farmers, icon: FaTractor, href: '/admin/farmers', color: 'text-teal-500', bg: 'bg-teal-50' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {userEmail}!</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <FaSignOutAlt className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.count}</p>
              </div>
              <div className={`${card.bg} p-3 rounded-xl`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <div className="mt-4 text-sm text-primary-500 font-medium">
              Manage →
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/blog/new"
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-primary-50 text-primary-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FaFileAlt className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">New Blog Post</span>
          </a>
          <a
            href="/admin/products/new"
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FaBox className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">New Product</span>
          </a>
          <a
            href="/admin/team/new"
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FaUsers className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Team Member</span>
          </a>
          <a
            href="/admin/faq/new"
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FaQuestionCircle className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add FAQ</span>
          </a>
        </div>
      </div>
    </div>
  )
}
