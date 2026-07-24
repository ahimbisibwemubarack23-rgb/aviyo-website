// components/admin/ImageUpload.tsx
'use client'

import { useState } from 'react'  // ← Uncomment this line
import { FaUpload, FaSpinner, FaTimes } from 'react-icons/fa'

// ❌ Remove this line - it's not being used
// import { supabase } from '@/lib/supabase/client'

interface ImageUploadProps {
  value: string | null
  onChange: (url: string) => void
  folder?: string
  label?: string
  multiple?: boolean
  circular?: boolean
  maxSize?: number // in MB
}

// Compression function
function compressImage(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }
        if (height > maxHeight) {
          width = (maxHeight / height) * width
          height = maxHeight
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Could not compress image'))
            return
          }
          const compressed = new File([blob], file.name, {
            type: 'image/jpeg',
          })
          resolve(compressed)
        }, 'image/jpeg', quality)
      }
      img.onerror = () => {
        reject(new Error('Could not load image'))
      }
    }
    reader.onerror = () => {
      reject(new Error('Could not read file'))
    }
  })
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'uploads',
  label = 'Upload image',
  multiple = false,
  circular = false,
  maxSize = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (const file of files) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
        if (!allowedTypes.includes(file.type)) {
          toast.error(`Invalid file type: ${file.name}. Allowed: JPEG, PNG, GIF, WEBP, SVG`)
          continue
        }

        // Validate file size (before compression)
        if (file.size > maxSize * 1024 * 1024) {
          toast.error(`File too large: ${file.name}. Max size: ${maxSize}MB`)
          continue
        }

        // Compress the image before upload
        const compressedFile = await compressImage(file)
        
        // Upload to Supabase Storage via API
        const formData = new FormData()
        formData.append('file', compressedFile)
        formData.append('folder', folder)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Upload failed')
        }

        const data = await response.json()
        onChange(data.url)
        toast.success(`Uploaded: ${file.name}`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
      // Reset input
      e.target.value = ''
    }
  }

  const removeImage = () => {
    onChange('')
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className={`relative ${circular ? 'w-40 h-40' : 'w-full aspect-square'} rounded-lg overflow-hidden bg-gray-100 group`}>
          <img
            src={value}
            alt="Uploaded"
            className={`w-full h-full object-cover ${circular ? 'rounded-full' : ''}`}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors ${
          circular ? 'h-40 w-40 rounded-full' : 'h-40'
        }`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <FaSpinner className="w-8 h-8 text-primary-500 animate-spin" />
            ) : (
              <>
                <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center px-4">
                  {uploading ? 'Uploading...' : label}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Max {maxSize}MB • {multiple ? 'Multiple files' : 'Single file'}
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  )
}