// components/ui/Section.tsx
interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary' | 'cream'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Section({
  children,
  className = '',
  background = 'white',
  padding = 'lg',
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
    cream: 'bg-cream-50',
  }

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  }

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  )
}