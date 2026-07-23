// components/shared/Logo.tsx
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  }

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-primary-500 rounded-full flex items-center justify-center shadow-md`}>
        <span className="text-white font-bold">A</span>
      </div>
      {showText && (
        <span className={`font-display font-semibold ${textSize[size]} text-primary-600`}>
          Aviyo
        </span>
      )}
    </Link>
  )
}