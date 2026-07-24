// app/(public)/products/[slug]/page.tsx
export const runtime = "edge";
import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

async function getProduct(slug: string) {
  const { data } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

async function getRelatedProducts(category: string, currentId: string) {
  const { data } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .neq('id', currentId)
    .limit(4)
  return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.seo_title || `${product.name} | Aviyo Plant-Based Nutrition`,
    description: product.seo_description || product.short_description || product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-primary-500">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div>
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="text-6xl">🌿</span>
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images.slice(1, 5).map((image: string, index: number) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.category && (
                <div className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {product.category}
                </div>
              )}
              <div className="prose prose-lg max-w-none text-gray-600 mb-6">
                <p>{product.description}</p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="text-primary-500 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.price && (
                <div className="text-3xl font-bold text-primary-500 mb-4">
                  UGX {product.price.toLocaleString()}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {product.in_stock ? (
                  <button className="bg-primary-500 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors">
                    Coming Soon
                  </button>
                ) : (
                  <button className="bg-gray-300 text-gray-600 px-8 py-3 rounded-full font-medium cursor-not-allowed">
                    Out of Stock
                  </button>
                )}
                <Link
                  href="/contact"
                  className="border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors"
                >
                  Inquire Now
                </Link>
              </div>

              {product.nutrition_info && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Nutrition Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(product.nutrition_info).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500">{key}</span>
                        <span className="text-gray-700 font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.how_to_use && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-1">How to Use</h3>
                  <p className="text-sm text-gray-600">{product.how_to_use}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-40 bg-gray-100">
                    {related.images?.[0] ? (
                      <img
                        src={related.images[0]}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-4xl">🌿</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary-500 transition-colors text-sm">
                      {related.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{related.short_description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}