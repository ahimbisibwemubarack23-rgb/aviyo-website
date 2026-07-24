// app/(admin)/admin/testimonials/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa'

async function getTestimonials() {
  const { data } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function TestimonialsManagementPage() {
  const testimonials = await getTestimonials()

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500">Manage customer testimonials</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors"
        >
          <FaPlus />
          Add Testimonial
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {testimonial.photo ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-xl text-primary-500">{testimonial.name?.[0]}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/testimonials/${testimonial.id}`}
                      className="text-blue-500 hover:text-blue-700 p-1"
                    >
                      <FaEdit className="w-4 h-4" />
                    </Link>
                    <button className="text-red-500 hover:text-red-700 p-1">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-200'}
                      size={14}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{testimonial.quote}</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    testimonial.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {testimonial.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500">No testimonials yet. Add your first testimonial!</p>
        </div>
      )}
    </div>
  )
}