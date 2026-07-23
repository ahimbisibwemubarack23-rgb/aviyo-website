// components/ui/Hero.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-cream-50 to-white pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-golden-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🌱 100% Ugandan Ingredients
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Health is{' '}
              <span className="text-primary-500">Not a Luxury</span>
              <br />
              You Deserve Food That{' '}
              <span className="text-golden-400">Loves You Back</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Enzyme-enhanced plant-based nutrition from Uganda's heart. 
              Lactose-free, affordable, and made with love for every 
              Ugandan family.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-primary-500 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Explore Products
              </Link>
              <Link
                href="/about"
                className="border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-full text-base font-medium hover:bg-primary-50 transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">60%</div>
                <div className="text-sm text-gray-500">Ugandans are lactose intolerant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">6-12</div>
                <div className="text-sm text-gray-500">Months shelf life</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">100%</div>
                <div className="text-sm text-gray-500">Ugandan ingredients</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-golden-200 rounded-3xl shadow-2xl" />
              <div className="absolute inset-4 bg-white rounded-2xl p-6 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-6xl">🌿</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-800">
                    Aviyo Plant-Based
                  </h3>
                  <p className="text-gray-600">Nutritious • Affordable • Delicious</p>
                  <div className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-primary-50 rounded-full">🥛 Lactose-Free</span>
                    <span className="px-3 py-1 bg-green-50 rounded-full">🌱 Plant-Based</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  <span className="text-sm font-medium text-gray-700">100% Plant-Based</span>
                </div>
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💚</span>
                  <span className="text-sm font-medium text-gray-700">Lactose-Free</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}