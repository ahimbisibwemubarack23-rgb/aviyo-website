// components/admin/AdminHeader.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { FaBars, FaTimes, FaUser, FaBell } from 'react-icons/fa'

interface AdminHeaderProps {
  onMenuToggle?: () => void
  isMenuOpen?: boolean
}

export default function AdminHeader({ onMenuToggle, isMenuOpen = false }: AdminHeaderProps) {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        // Get user role from database
        const { data: userData } = await supabase
          .from('users')
          .select('role, full_name')
          .eq('id', user.id)
          .single()
        if (userData) {
          setUserRole(userData.role || '')
          setUser({ ...user, full_name: userData.full_name })
        }
      }
    }
    getUser()
  }, [])

  const getRoleBadge = (role: string) => {
    const colors = {
      super_admin: 'bg-purple-100 text-purple-700',
      admin: 'bg-blue-100 text-blue-700',
      editor: 'bg-green-100 text-green-700',
      publisher: 'bg-yellow-100 text-yellow-700',
      reviewer: 'bg-orange-100 text-orange-700',
    }
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:block">Aviyo Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <FaBell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-500" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">
                {user?.full_name || user?.email || 'Admin'}
              </p>
              {userRole && (
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${getRoleBadge(userRole)}`}>
                  {userRole.replace('_', ' ')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}