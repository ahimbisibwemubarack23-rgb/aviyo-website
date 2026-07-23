// app/(public)/faq/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Aviyo Plant-Based Nutrition',
  description: 'Frequently asked questions about Aviyo products, nutrition, and partnership opportunities.',
}

async function getFAQs() {
  const { data } = await supabaseAdmin
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  return data || []
}

async function getCategories() {
  const { data } = await supabaseAdmin
    .from('faqs')
    .select('category')
    .eq('is_active', true)
    .not('category', 'is', null)
  const categories = [...new Set(data?.map(f => f.category).filter(Boolean) || [])]
  return categories
}

export default async function FAQPage() {
  const [faqs, categories] = await Promise.all([
    getFAQs(),
    getCategories(),
  ])

  // Group FAQs by category
  const groupedFAQs = categories.reduce((acc: any, category: string) => {
    acc[category] = faqs.filter(f => f.category === category)
    return acc
  }, {})
  
  // Uncategorized FAQs
  const uncategorized = faqs.filter(f => !f.category)

  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Aviyo products, nutrition, and partnership opportunities.
          </p>
        </div>

        <div className="space-y-8">
          {/* Uncategorized FAQs */}
          {uncategorized.length > 0 && (
            <div className="space-y-4">
              {uncategorized.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200">
                        ▼
                      </span>
                    </summary>
                    <div className="p-6 pt-0 border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}

          {/* Grouped FAQs by Category */}
          {categories.map((category: string) => (
            <div key={category}>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                {category}
              </h2>
              <div className="space-y-4">
                {groupedFAQs[category].map((faq: any) => (
                  <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                        <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200">
                          ▼
                        </span>
                      </summary>
                      <div className="p-6 pt-0 border-t border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {faqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No FAQs available yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            We're here to help. Reach out to us anytime.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-500 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}