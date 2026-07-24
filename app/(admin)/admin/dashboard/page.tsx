// app/(admin)/admin/dashboard/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import {
  FaFileAlt,
  FaBox,
  FaUsers,
  FaQuestionCircle,
  FaStar,
  FaEnvelope,
  FaNewspaper,
  FaTractor,
} from 'react-icons/fa'

async function getStats() {
  const [
    { count: blogCount },
    { count: productCount },
    { count: teamCount },
    { count: faqCount },
    { count: testimonialCount },
    { count: contactCount },
    { count: subscriberCount },
    { count: farmerCount },
  ] = await Promise.all([
    supabaseAdmin.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('products').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('team_members').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('faqs').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('testimonials').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('farmer_registrations').select('*', { count: 'exact', head: true }),
  ])

  return {
    blog: blogCount || 0,
    products: productCount || 0,
    team: teamCount || 0,
    faq: faqCount || 0,
    testimonials: testimonialCount || 0,
    contacts: contactCount || 0,
    subscribers: subscriberCount || 0,
    farmers: farmerCount || 0,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

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
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your content.</p>
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

      {/* Quick Actions */}
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