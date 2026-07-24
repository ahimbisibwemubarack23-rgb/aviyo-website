// app/(admin)/admin/faq/[id]/page.tsx
export const runtime = "edge";
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function EditFAQPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        setFormData({
          question: data.question || '',
          answer: data.answer || '',
          category: data.category || '',
          display_order: data.display_order || 0,
          is_active: data.is_active ?? true,
        })
      } catch (error) {
        toast.error('Failed to load FAQ')
        router.push('/admin/faq')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchFAQ()
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('faqs')
        .update(payload)
        .eq('id', id)

      if (error) throw error

      toast.success('FAQ updated successfully!')
      router.push('/admin/faq')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update FAQ')
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
          <h1 className="text-2xl font-bold text-gray-900">Edit FAQ</h1>
          <p className="text-gray-500">Update frequently asked question</p>
        </div>
        <button
          type="submit"
          form="faq-form"
          disabled={saving}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving && <FaSpinner className="animate-spin" />}
          {saving ? 'Saving...' : 'Update FAQ'}
        </button>
      </div>

      <form id="faq-form" onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question *
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter the question"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer *
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter the answer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. Products, Nutrition, Shipping"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-4 h-4 text-primary-500 focus:ring-primary-500"
              />
              Active
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}