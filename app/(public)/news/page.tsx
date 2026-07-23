// app/(public)/news/page.tsx
import { Metadata } from 'next'
// import Link from 'next/link'

export const metadata: Metadata = {
  title: 'News & Press | Aviyo Plant-Based Nutrition',
  description: 'News, press releases, and media mentions featuring Aviyo Plant-Based Nutrition.',
}

const newsItems = [
  {
    title: 'Aviyo Featured in Dairy Business Middle East & Africa',
    date: 'January 2026',
    source: 'Dairy Business Middle East & Africa',
    description: 'Aviyo was featured alongside Brookside Dairy, highlighting our enzyme-enhanced plant-based products for East Africa.',
    link: 'https://dairybusinessmea.com/2026/01/14/new-plant-based-products-in-east-africa/',
    type: 'media',
  },
  {
    title: 'Aviyo Plant-Based Nutrition Ltd Launches LinkedIn Presence',
    date: 'January 2026',
    source: 'Aviyo Plant-Based Nutrition',
    description: 'The company established its professional presence on LinkedIn, receiving international distribution interest within 48 hours.',
    link: 'https://www.linkedin.com/company/aviyo-plant-based-nutrition-ltd',
    type: 'press',
  },
  {
    title: 'Aviyo Receives International Distribution Interest from Ghana',
    date: 'January 2026',
    source: 'Aviyo Plant-Based Nutrition',
    description: 'Melach Coconut Processing Farm Ltd from Ghana reached out to become a local distributor for Aviyo products.',
    link: 'https://www.linkedin.com/company/aviyo-plant-based-nutrition-ltd',
    type: 'press',
  },
]

export default function NewsPage() {
  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            News & Press
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest news, press releases, and media mentions featuring Aviyo Plant-Based Nutrition.
          </p>
        </div>

        {/* News Grid */}
        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  item.type === 'media'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {item.type === 'media' ? '📰 Media' : '📢 Press Release'}
                </span>
                <span className="text-sm text-gray-400">{item.date}</span>
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-1">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Source: {item.source}
              </p>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 font-medium hover:text-primary-600 transition-colors inline-flex items-center gap-1"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>

        {/* Contact for Press */}
        <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
            Press Inquiries
          </h3>
          <p className="text-gray-600 mb-4">
            For media inquiries, interview requests, or press kits, please contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-500 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors"
          >
            Contact Our Press Team
          </a>
        </div>
      </div>
    </div>
  )
}