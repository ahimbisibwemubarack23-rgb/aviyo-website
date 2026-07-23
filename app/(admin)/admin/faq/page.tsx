// app/(admin)/admin/faq/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa'

async function getFAQs() {
  const { data } = await supabaseAdmin
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true })
  return data || []
}

export default async function FAQManagementPage() {
  const faqs = await getFAQs()

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-500">Manage frequently asked questions</p>
        </div>
        <Link
          href="/admin/faq/new"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors"
        >
          <FaPlus />
          Add FAQ
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No FAQs yet. Add your first FAQ!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      {faq.category && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {faq.category}
                        </span>
                      )}
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        faq.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {faq.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <FaArrowUp className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <FaArrowDown className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/admin/faq/${faq.id}`}
                      className="text-blue-500 hover:text-blue-700 p-1"
                    >
                      <FaEdit className="w-4 h-4" />
                    </Link>
                    <button className="text-red-500 hover:text-red-700 p-1">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}