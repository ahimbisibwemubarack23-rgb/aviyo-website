// app/(public)/about/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Aviyo Plant-Based Nutrition',
  description: 'Learn about Aviyo\'s mission to make plant-based nutrition accessible to every Ugandan through enzyme-enhanced, locally sourced products.',
}

async function getTeamMembers() {
  const { data } = await supabaseAdmin
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  return data || []
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()

  const values = [
    { icon: '❤️', title: 'Health First', description: 'Every product is designed to improve the health and wellbeing of our community.' },
    { icon: '💡', title: 'Innovation', description: 'We use enzyme-enhanced processing and fermentation science to create better nutrition.' },
    { icon: '🤝', title: 'Accessibility', description: 'Affordable pricing ensures our products reach every Ugandan, regardless of income.' },
    { icon: '🌍', title: 'Sustainability', description: 'We support local farmers and use climate-resilient crops for a better future.' },
    { icon: '⭐', title: 'Integrity', description: 'We operate with transparency, honesty, and accountability in everything we do.' },
  ]

  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <div className="container">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Aviyo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're on a mission to make plant-based nutrition accessible, affordable, 
            and delicious for every Ugandan.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To develop affordable and nutritious functional foods using biotechnology, 
              fermentation science, and local agricultural resources that improve health 
              outcomes and strengthen community resilience.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-4xl mb-4">👁️</div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To become Africa's leading nutrition innovation company advancing affordable, 
              sustainable, and science-driven food systems for healthier communities.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <div className="bg-primary-50 rounded-2xl p-8 mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">
            The Problem We're Solving
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500">60%</div>
              <p className="text-sm text-gray-600 mt-1">Ugandans are lactose intolerant, yet dairy dominates the nutrition market</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500">29%</div>
              <p className="text-sm text-gray-600 mt-1">Children under 5 are stunted due to malnutrition</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500">UGX 5,000+</div>
              <p className="text-sm text-gray-600 mt-1">Cost per serving of imported therapeutic foods - out of reach for most</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{value.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{value.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        {teamMembers.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gradient-to-br from-primary-50 to-cream-50">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-6xl text-gray-300">👤</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-primary-500">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{member.bio}</p>
                    )}
                    {member.social_links && (
                      <div className="flex justify-center gap-3 mt-3">
                        {Object.entries(member.social_links).map(([platform, url]) => (
                          url && (
                            <a
                              key={platform}
                              href={url as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-primary-500 transition-colors"
                            >
                              <span className="text-sm capitalize">{platform}</span>
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-primary-500 rounded-2xl p-8 text-center text-white">
          <h2 className="font-display text-2xl font-bold mb-4">
            Ready to Try Aviyo?
          </h2>
          <p className="text-primary-100 mb-6 max-w-md mx-auto">
            Join us in creating a healthier, more sustainable future for Uganda.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-primary-500 px-8 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors"
          >
            Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  )
}