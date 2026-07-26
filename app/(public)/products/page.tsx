export const runtime = "edge";
export const dynamic = "force-dynamic";

import { getSupabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Products | Aviyo Plant-Based Nutrition',
  description: 'Discover Aviyo\'s range of enzyme-enhanced plant-based milks and SuperSoft Chapati flour. Healthy, affordable, and made in Uganda.',
}

interface Product {
  id: string
  name: string
  slug: string
  short_description: string | null
  price: number | null
  category: string | null
  images: string[] | null
  in_stock: boolean
  is_featured: boolean
  status: string
}

async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return []
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCategories(): Promise<string[]> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return []
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null)
    
    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }
    
    // Type assertion to handle the data properly
    const categoryData = data as { category: string }[] | null
    const categories = [...new Set(categoryData?.map(item => item.category).filter(Boolean) || [])] as string[]
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of enzyme-enhanced plant-based products designed 
            for health-conscious Ugandans.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium">
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white text-gray-600 text-sm font-medium hover:bg-primary-50 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-56 bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="text-6xl">🌿</span>
                  </div>
                )}
                {product.is_featured && (
                  <span className="absolute top-2 right-2 bg-golden-400 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{product.short_description}</p>
                  </div>
                  {product.category && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {product.category}
                    </span>
                  )}
                </div>
                {product.price && (
                  <p className="text-primary-500 font-medium mt-3">
                    UGX {product.price.toLocaleString()}
                  </p>
                )}
                {product.in_stock ? (
                  <span className="inline-block mt-2 text-xs text-green-600 font-medium">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="inline-block mt-2 text-xs text-red-500 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
