// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/login/',
        '/_next/',
        '/_static/',
      ],
    },
    sitemap: 'https://aviyo.online/sitemap.xml',
  }
}