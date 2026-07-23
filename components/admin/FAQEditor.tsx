// components/admin/FAQEditor.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'

interface FAQEditorProps {
  initialData?: any
  isEditing?: boolean
}

export default function FAQEditor({ initialData, isEditing = false }: FAQEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      question: '',
      answer: '',
      category: '',
      display_order: 0,
      is_active: true,
    }
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const payload = {
        question: data.question,
        answer: data.answer,
        category: data.category || '',
        display_order: parseInt(data.display_order) || 0,
        is_active: data.is_active === true || data.is_active === 'true',
      }

      let error
      if (isEditing && initialData) {
        const { error: updateError } = await supabase
          .from('faqs')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', initialData.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('faqs')
          .insert(payload)
        error = insertError
      }

      if (error) throw error

      toast.success(isEditing ? 'FAQ updated successfully!' : 'FAQ added successfully!')
      router.push('/admin/faq')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save FAQ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question *
        </label>
        <input
          {...register('question', { required: 'Question is required' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter the question"
        />
        {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Answer *
        </label>
        <textarea
          {...register('answer', { required: 'Answer is required' })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter the answer"
        />
        {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          {...register('category')}
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
            {...register('display_order')}
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              {...register('is_active')}
              type="checkbox"
              className="w-4 h-4 text-primary-500 focus:ring-primary-500"
            />
            Active
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <FaSpinner className="animate-spin" />}
        {isEditing ? 'Update FAQ' : 'Add FAQ'}
      </button>
    </form>
  )
}