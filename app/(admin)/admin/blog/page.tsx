// app/(admin)/admin/blog/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

async function getBlogPosts() {
  const { data } = await supabaseAdmin
    .from('blog_posts')
    .select('*, users!author_id(full_name)')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function BlogManagementPage() {
  const posts = await getBlogPosts()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'draft': return 'bg-yellow-100 text-yellow-700'
      case 'archived': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-500">Create and manage blog posts</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors"
        >
          <FaPlus />
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{post.title}</p>
                        {post.excerpt && (
                          <p className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.users?.full_name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-gray-400 hover:text-gray-600 p-1"
                          title="View"
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}