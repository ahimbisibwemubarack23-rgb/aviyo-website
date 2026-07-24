// app/(public)/blog/[slug]/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

async function getBlogPost(slug: string) {
  const { data } = await supabaseAdmin
    .from('blog_posts')
    .select('*, users!author_id(full_name)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

async function getRelatedPosts(categories: string[], currentId: string) {
  const { data } = await supabaseAdmin
    .from('blog_posts')
    .select('*, users!author_id(full_name)')
    .eq('status', 'published')
    .neq('id', currentId)
    .overlaps('categories', categories)
    .limit(3)
  return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    keywords: post.seo_keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [{ url: post.featured_image }] : [],
      publishedTime: post.published_at,
      authors: [post.users?.full_name || 'Aviyo Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.categories || [], post.id)

  return (
    <div className="pt-24 pb-16 bg-cream-50 min-h-screen">
      <article className="container max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary-500">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category: string) => (
              <span
                key={category}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>By {post.users?.full_name || 'Aviyo Team'}</span>
            <span>•</span>
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-video mb-8 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none 
            prose-headings:text-gray-900 
            prose-p:text-gray-600 
            prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-800
            prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
            prose-img:rounded-xl prose-img:shadow-md
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-h2:font-display prose-h2:text-2xl prose-h2:mt-8
            prose-h3:font-display prose-h3:text-xl
            prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-500 mr-2">Tags:</span>
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  {related.featured_image && (
                    <div className="relative h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={related.featured_image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {related.excerpt}
                    </p>
                    <div className="text-xs text-gray-400 mt-2">
                      {new Date(related.published_at).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}