/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'https://wfwbkwjujlvirxjytihw.supabase.co/:path*',
      },
    ]
  },
}
module.exports = nextConfig
