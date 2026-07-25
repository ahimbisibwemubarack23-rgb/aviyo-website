/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'supabase.co',
      'wfwbkwijujlvirxjytihw.supabase.co',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  output: 'standalone',

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    serverComponentsExternalPackages: ['next-auth', 'oauth'],
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://aviyo-auth.ahimbisibwemubarack23.workers.dev/api/auth/:path*',
      },
    ]
  },
}

module.exports = nextConfig
