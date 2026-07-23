// components/admin/ProductEditor.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-toastify'
import { FaSpinner, FaPlus, FaTimes } from 'react-icons/fa'
import ImageUpload from './ImageUpload'

interface ProductEditorProps {
  initialData?: any
  isEditing?: boolean
}

export default function ProductEditor({ initialData, isEditing = false }: ProductEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [features, setFeatures] = useState<string[]>(initialData?.features || [])
  const [newFeature, setNewFeature] = useState('')

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      slug: '',
      description: '',
      short_description: '',
      price: '',
      category: '',
      in_stock: true,
      is_featured: false,
      status: 'draft',
      how_to_use: '',
      seo_title: '',
      seo_description: '',
    }
  })

  const generateSlug = () => {
    const name = watch('name')
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature))
  }

  const handleImageUpload = (url: string) => {
    setImages([...images, url])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        images,
        features,
        price: data.price ? parseFloat(data.price) : null,
        in_stock: data.in_stock === true || data.in_stock === 'true',
        is_featured: data.is_featured === true || data.is_featured === 'true',
      }

      let error
      if (isEditing && initialData) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', initialData.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert(payload)
        error = insertError
      }

      if (error) throw error

      toast.success(isEditing ? 'Product updated successfully!' : 'Product created successfully!')
      router.push('/admin/products')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              onBlur={generateSlug}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug *
            </label>
            <div className="flex gap-2">
              <input
                {...register('slug', { required: 'Slug is required' })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="product-url-slug"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Generate
              </button>
            </div>
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <input
              {...register('short_description')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief product summary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Detailed product description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How to Use
            </label>
            <textarea
              {...register('how_to_use')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Instructions for use"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Images */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <ImageUpload
              value={null}
              onChange={handleImageUpload}
              folder="products"
              label="Upload product images"
              multiple
            />
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                placeholder="Add a feature"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="hover:text-red-500"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            <div>
              <label className="block text-sm text-gray-600">Price (UGX)</label>
              <input
                {...register('price')}
                type="number"
                className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Category</label>
              <input
                {...register('category')}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. Plant-Based Milks"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  {...register('in_stock')}
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                In Stock
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  {...register('is_featured')}
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                Featured
              </label>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2">SEO Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">SEO Title</label>
                <input
                  {...register('seo_title')}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="SEO title"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">SEO Description</label>
                <textarea
                  {...register('seo_description')}
                  rows={2}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="SEO description"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {isEditing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>
    </form>
  )
}