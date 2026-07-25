// next.config.js
/** @type {import('next').NextConfig} */

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config (images, etc.)

  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://aviyo-auth.ahimbisibwemubarack23.workers.dev/api/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
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

  // This tells Next.js to use Node.js runtime for the auth route
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
}

module.exports = nextConfig