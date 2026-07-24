/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... any other config you have (like images, etc.) ...

  // This is the key setting for Cloudflare Pages
  // It tells Next.js to use the Edge Runtime for all pages by default
  experimental: {
    runtime: 'edge', 
  },

  // You can also optionally keep your existing images config, etc.
  images: {
    domains: ['supabase.co', 'wfwbkwijujlvirxjytihw.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
    