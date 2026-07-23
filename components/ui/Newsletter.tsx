// components/ui/Newsletter.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-toastify'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })

      if (error) {
        if (error.code === '23505') {
          toast.info('You are already subscribed!')
          return
        }
        throw error
      }

      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error: any) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-primary-600 py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter for updates on new products, health tips, 
            and stories from our community.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent bg-white/90 backdrop-blur-sm"
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}