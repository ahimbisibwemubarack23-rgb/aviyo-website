// components/admin/TeamEditor.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'
import ImageUpload from './ImageUpload'

interface TeamEditorProps {
  initialData?: any
  isEditing?: boolean
}

export default function TeamEditor({ initialData, isEditing = false }: TeamEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState<string | null>(initialData?.photo || null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      role: '',
      bio: '',
      display_order: 0,
      is_active: true,
      twitter: '',
      linkedin: '',
      instagram: '',
    }
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const payload = {
        name: data.name,
        role: data.role,
        bio: data.bio,
        photo,
        display_order: parseInt(data.display_order) || 0,
        is_active: data.is_active === true || data.is_active === 'true',
        social_links: {
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
          instagram: data.instagram || '',
        },
      }

      let error
      if (isEditing && initialData) {
        const { error: updateError } = await supabase
          .from('team_members')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', initialData.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('team_members')
          .insert(payload)
        error = insertError
      }

      if (error) throw error

      toast.success(isEditing ? 'Team member updated successfully!' : 'Team member added successfully!')
      router.push('/admin/team')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save team member')
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
              Full Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              {...register('role', { required: 'Role is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Nutritionist, Production Manager"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.role.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              {...register('bio')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief biography of the team member"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Links
            </label>
            <div className="space-y-2">
              <input
                {...register('twitter')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Twitter URL"
              />
              <input
                {...register('linkedin')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="LinkedIn URL"
              />
              <input
                {...register('instagram')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Instagram URL"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photo */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <ImageUpload
              value={photo}
              onChange={setPhoto}
              folder="team"
              label="Upload profile photo"
              circular
            />
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            <div>
              <label className="block text-sm text-gray-600">Display Order</label>
              <input
                {...register('display_order')}
                type="number"
                className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                placeholder="0"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                {...register('is_active')}
                type="checkbox"
                className="w-4 h-4 text-primary-500 focus:ring-primary-500"
              />
              Active
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {isEditing ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </div>
    </form>
  )
}