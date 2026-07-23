// components/shared/SocialLinks.tsx
import { FaLinkedin, FaTiktok, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

interface SocialLinksProps {
  variant?: 'light' | 'dark' | 'colored'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabels?: boolean
}

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/aviyo-plant-based-nutrition-ltd',
    icon: FaLinkedin,
    color: '#0077B5',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@aviyo_plant_based',
    icon: FaTiktok,
    color: '#000000',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/aviyoplantbased',
    icon: FaFacebook,
    color: '#1877F2',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/aviyoplantbased',
    icon: FaInstagram,
    color: '#E4405F',
  },
    {
    name: 'X/Twitter',
    url: 'https://www.x.com/aviyoutri7wg',
    icon: FaTwitter,
    color: '#f6fa2b',
  },
]

export default function SocialLinks({
  variant = 'light',
  size = 'md',
  className = '',
  showLabels = false,
}: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  }

  const variantClasses = {
    light: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    dark: 'bg-gray-800 text-gray-300 hover:bg-gray-700',
    colored: '',
  }

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${variant === 'colored' ? '' : variantClasses[variant]}
            ${variant === 'colored' ? 'hover:opacity-80' : ''}
            ${sizeClasses[size]}
            rounded-full flex items-center justify-center transition-all
          `}
          style={variant === 'colored' ? { color: link.color } : {}}
          aria-label={link.name}
        >
          <link.icon className={iconSize[size]} />
          {showLabels && (
            <span className="ml-2 text-sm">{link.name}</span>
          )}
        </a>
      ))}
    </div>
  )
}