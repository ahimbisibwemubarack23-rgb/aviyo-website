export const dynamic = "force-dynamic";

import { getSupabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import Hero from '@/components/ui/Hero'
import Newsletter from '@/components/ui/Newsletter'
import Testimonials from '@/components/ui/Testimonials'
import WhyAviyo from '@/components/ui/WhyAviyo'

async function getFeaturedProducts() {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return []
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('status', 'published')
      .limit(3)
    
    if (error) {
      console.error('Error fetching featured products:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

async function getLatestPosts() {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return []
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, users!author_id(full_name)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)
    
    if (error) {
      console.error('Error fetching latest posts:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }
}

export default async function HomePage() {
  const [featuredProducts, latestPosts] = await Promise.all([
    getFeaturedProducts(),
    getLatestPosts(),
  ])

  return (
    <div>
      <Hero />
      
      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our range of enzyme-enhanced plant-based products designed 
                for health-conscious Ugandans
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

      <WhyAviyo />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
