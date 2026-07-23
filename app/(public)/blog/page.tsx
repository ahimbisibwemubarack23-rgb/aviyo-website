// app/(public)/blog/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Aviyo Plant-Based Nutrition',
  description: 'Read the latest news, research, and stories about plant-based nutrition, health, and sustainability in Uganda.',
}

async function getBlogPosts() {
  const { data } = await supabaseAdmin
    .from('blog_posts')
    .select('*, users!author_id(full_name)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  return data || []
}

async function getCategories() {
  const { data } = await supabaseAdmin
    .from('blog_posts')
    .select('categories')
    .eq('status', 'published')
    .not('categories', 'is', null)
  
  const allCategories = data?.flatMap(p => p.categories || []) || []
  const categories = [...new Set(allCategories)]
  return categories
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ])

  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories, research, and insights from the heart of Uganda's 
            plant-based nutrition movement.
          </p>
        </div>

        {/* Categories */}
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              {post.featured_image && (
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories?.slice(0, 2).map((category: string) => (
                    <span
                      key={category}
                      className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
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
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  )
}