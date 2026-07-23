// app/(admin)/admin/testimonials/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { FaSpinner, FaUpload, FaTimes, FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function NewTestimonialPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [photo, setPhoto] = useState('')
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    is_active: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleRating = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `testimonials/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setPhoto(publicUrl)
      toast.success('Photo uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload photo')
    } finally {
      setUploading(false)
    }
  }

  const removePhoto = () => {
    setPhoto('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        photo,
      }

      const { error } = await supabase.from('testimonials').insert(payload)

      if (error) throw error

      toast.success('Testimonial added successfully!')
      router.push('/admin/testimonials')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to add testimonial')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <ToastContainer position="top-right" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Testimonial</h1>
          <p className="text-gray-500">Add a customer testimonial</p>
        </div>
        <button
          type="submit"
          form="testimonial-form"
          disabled={loading}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? 'Saving...' : 'Save Testimonial'}
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
                onClick={() => handleRating(i + 1)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`w-6 h-6 ${
                    i < (hoverRating || formData.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-200'
                  } hover:text-yellow-400 transition-colors`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">{formData.rating} / 5</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Photo
          </label>
          <div className="flex items-center gap-4">
            {photo ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={photo}
                  alt="Customer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <FaUpload className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-xs text-gray-500">Optional</p>
          </div>
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