// components/ui/BlogCard.tsx
import Link from 'next/link'

interface BlogCardProps {
  post: {
    id: string
    slug: string
    title: string
    excerpt: string
    featured_image: string
    categories: string[]
    published_at: string
    users?: {
      full_name: string
    }
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {post.featured_image && (
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.slice(0, 2).map((category: string) => (
              <span
                key={category}
                className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span>{post.users?.full_name || 'Aviyo Team'}</span>
          <span>•</span>
          <span>{new Date(post.published_at).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  )
}