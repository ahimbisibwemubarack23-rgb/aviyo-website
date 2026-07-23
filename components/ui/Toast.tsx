// components/ui/Toast.tsx
'use client'

import { useEffect } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

export default function Toast({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <FaExclamationCircle className="w-5 h-5 text-red-500" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <FaInfoCircle className="w-5 h-5 text-blue-500" />,
    },
  }

  const variant = variants[type]

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${variant.bg} ${variant.border} ${variant.text} shadow-lg`}>
      <div className="flex-shrink-0 pt-0.5">{variant.icon}</div>
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close toast"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  )
}