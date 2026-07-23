// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aviyo.online'), 
  title: {
    default: 'Aviyo Plant-Based Nutrition',
    template: '%s | Aviyo Plant-Based Nutrition',
  },
  description: 'Enzyme-enhanced plant-based milks, yoghut, floor, cafein free tea and SuperSoft Chapati flour for lactose-intolerant and health-conscious Ugandans.',
  keywords: 'plant-based milk, lactose-free, enzyme-enhanced, Ugandan food, healthy nutrition',
  authors: [{ name: 'Aviyo Plant-Based Nutrition Ltd' }],
  openGraph: {
    title: 'Aviyo Plant-Based Nutrition',
    description: 'Your Health is Not a Luxury. You Deserve Food That Loves You Back.',
    url: 'https://aviyo.online',
    siteName: 'Aviyo Plant-Based Nutrition',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col bg-gray-50">
        {children}
      </body>
    </html>
  )
}