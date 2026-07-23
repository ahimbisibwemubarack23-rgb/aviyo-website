// components/admin/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaHome,
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
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: FaHome },
  { name: 'Blog Posts', href: '/admin/blog', icon: FaFileAlt },
  { name: 'Products', href: '/admin/products', icon: FaBox },
  { name: 'Team Members', href: '/admin/team', icon: FaUsers },
  { name: 'FAQs', href: '/admin/faq', icon: FaQuestionCircle },
  { name: 'Testimonials', href: '/admin/testimonials', icon: FaStar },
  { name: 'Contacts', href: '/admin/contacts', icon: FaEnvelope },
  { name: 'Newsletter', href: '/admin/newsletter', icon: FaNewspaper },
  { name: 'Farmers', href: '/admin/farmers', icon: FaTractor },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Failed to logout')
    } else {
      router.push('/login')
      toast.success('Logged out successfully')
    }
  }

  return (
    <aside
      className={`
        fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto
        transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          )
        })}
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <FaSignOutAlt className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  )
}