// app/(public)/layout.tsx
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}