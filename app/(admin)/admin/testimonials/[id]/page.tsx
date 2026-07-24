'use client'
export const runtime = "edge";
// app/(admin)/admin/testimonials/[id]/page.tsx

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { FaSpinner, FaStar } from 'react-icons/fa'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditTestimonialPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [photo, setPhoto] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    is_active: true,
  })

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        setFormData({
          name: data.name || '',
          role: data.role || '',
          quote: data.quote || '',
          is_active: data.is_active ?? true,
        })
        setPhoto(data.photo || null)
        setRating(data.rating || 5)
      } catch (error) {
        toast.error('Failed to load testimonial')
        router.push('/admin/testimonials')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTestimonial()
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        ...formData,
        photo,
        rating,
      }

      const { error } = await supabase
        .from('testimonials')
        .update(payload)
        .eq('id', id)

      if (error) throw error

      toast.success('Testimonial updated successfully!')
      router.push('/admin/testimonials')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update testimonial')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div>
      <ToastContainer position="top-right" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Testimonial</h1>
          <p className="text-gray-500">Update customer testimonial</p>
        </div>
        <button
          type="submit"
          form="testimonial-form"
          disabled={saving}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving && <FaSpinner className="animate-spin" />}
          {saving ? 'Saving...' : 'Update Testimonial'}
        </button>
      </div>

      <form id="testimonial-form" onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role / Title
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. Customer, Nutritionist, Chef"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Testimonial *
          </label>
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="What did they say about Aviyo?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`w-8 h-8 transition-colors ${
                    i < (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-200'
                  } hover:text-yellow-400`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">{rating} / 5</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Photo
          </label>
          <ImageUpload
            value={photo}
            onChange={setPhoto}
            folder="testimonials"
            label="Upload customer photo"
            circular
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="w-4 h-4 text-primary-500 focus:ring-primary-500"
          />
          <label className="text-sm text-gray-600">Active</label>
        </div>
      </form>
    </div>
  )
}