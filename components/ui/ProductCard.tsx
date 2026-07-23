// components/ui/ProductCard.tsx
import Link from 'next/link'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    name: string
    short_description: string
    description: string
    images: string[]
    price: number
    category: string
    is_featured: boolean
    in_stock: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-6xl">🌿</span>
          </div>
        )}
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-golden-400 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        {product.category && (
          <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-md">
            {product.category}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.short_description || product.description}
            </p>
          </div>
        </div>
        {product.price && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-primary-500 font-bold">
              UGX {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
              View Details →
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}