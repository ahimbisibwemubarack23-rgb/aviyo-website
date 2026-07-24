// components/admin/TestimonialEditor.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-toastify'
import { FaSpinner, FaStar } from 'react-icons/fa'
import ImageUpload from './ImageUpload'

interface TestimonialEditorProps {
  initialData?: any
  isEditing?: boolean
}

export default function TestimonialEditor({ initialData, isEditing = false }: TestimonialEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState<string | null>(initialData?.photo || null)
  const [rating, setRating] = useState(initialData?.rating || 5)
  const [hoverRating, setHoverRating] = useState(0)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      role: '',
      quote: '',
      is_active: true,
    }
  })

  const handleRating = (value: number) => {
    setRating(value)
    setValue('rating', value)
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const payload = {
        name: data.name,
        role: data.role || '',
        quote: data.quote,
        photo,
        rating,
        is_active: data.is_active === true || data.is_active === 'true',
      }

      let error
      if (isEditing && initialData) {
        const { error: updateError } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', initialData.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('testimonials')
          .insert(payload)
        error = insertError
      }

      if (error) throw error

      toast.success(isEditing ? 'Testimonial updated successfully!' : 'Testimonial added successfully!')
      router.push('/admin/testimonials')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save testimonial')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name *
        </label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter customer name"
        />
        {String(errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message)}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role / Title
        </label>
        <input
          {...register('role')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. Customer, Nutritionist, Chef"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Testimonial *
        </label>
        <textarea
          {...register('quote', { required: 'Testimonial is required' })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="What did they say about Aviyo?"
        />
        {String(errors.quote && <p className="text-red-500 text-sm mt-1">{errors.quote.message)}</p>}
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
          {...register('is_active')}
          type="checkbox"
          className="w-4 h-4 text-primary-500 focus:ring-primary-500"
        />
        <label className="text-sm text-gray-600">Active</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <FaSpinner className="animate-spin" />}
        {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
      </button>
    </form>
  )
}