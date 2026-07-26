// app/(auth)/layout.tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-cream-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {children}
        </div>
      </div>
    </SessionProvider>
  )
}
