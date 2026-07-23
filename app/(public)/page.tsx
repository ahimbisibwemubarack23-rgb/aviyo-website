// app/(public)/page.tsx
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/server'

async function getFeaturedProducts() {
  const { data } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('status', 'published')
    .limit(3)
  return data || []
}

async function getLatestPosts() {
  const { data } = await supabaseAdmin
    .from('blog_posts')
    .select('*, users!author_id(full_name)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)
  return data || []
}

export default async function HomePage() {
  const [featuredProducts, latestPosts] = await Promise.all([
    getFeaturedProducts(),
    getLatestPosts(),
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-cream-50 to-white pt-16">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                🌱 100% Ugandan Ingredients
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Health is{' '}
                <span className="text-primary-500">Not a Luxury</span>
                <br />
                You Deserve Food That{' '}
                <span className="text-golden-400">Loves You Back</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Enzyme-enhanced plant-based nutrition from Uganda's heart. 
                Lactose-free, affordable, and made with love for every 
                Ugandan family.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="bg-primary-500 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  Explore Products
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-full text-base font-medium hover:bg-primary-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">60%</div>
                  <div className="text-sm text-gray-500">Ugandans are lactose intolerant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">6-12</div>
                  <div className="text-sm text-gray-500">Months shelf life</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">100%</div>
                  <div className="text-sm text-gray-500">Ugandan ingredients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-golden-200 rounded-3xl" />
                <div className="absolute inset-4 bg-white rounded-2xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-6xl">🌿</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-gray-800">
                      Aviyo Plant-Based
                    </h3>
                    <p className="text-gray-600">Nutritious • Affordable • Delicious</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle mt-4">
                Discover our range of enzyme-enhanced plant-based products
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 bg-gray-100">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-4xl">🌿</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{product.short_description}</p>
                    {product.price && (
                      <p className="text-primary-500 font-medium mt-2">
                        UGX {product.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Aviyo */}
      <section className="py-16 bg-primary-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Aviyo?</h2>
            <p className="section-subtitle mt-4">
              We're on a mission to make plant-based nutrition accessible to every Ugandan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🥛', title: 'Lactose-Free', desc: 'Safe for the 60% of Ugandans with lactose intolerance' },
              { icon: '🌱', title: '100% Local', desc: 'Made from Ugandan-grown soybeans, cassava, and grains' },
              { icon: '🧪', title: 'Enzyme-Enhanced', desc: 'Better digestion and nutrient absorption' },
              { icon: '♻️', title: 'Sustainable', desc: 'Supporting circular economy and local farmers' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      {latestPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="section-title">Latest from Our Blog</h2>
                <p className="section-subtitle mt-2">
                  Stories, research, and insights from the heart of Uganda
                </p>
              </div>
              <Link
                href="/blog"
                className="text-primary-500 font-medium hover:text-primary-600"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                >
                  {post.featured_image && (
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>{post.users?.full_name || 'Aviyo Team'}</span>
                      <span>•</span>
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}