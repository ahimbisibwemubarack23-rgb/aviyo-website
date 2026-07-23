// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'supabase.co',
      'your-supabase-project.supabase.co',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ⚠️ Important: Cloudflare requires this
  output: 'standalone',

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig