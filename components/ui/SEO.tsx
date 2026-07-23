// components/ui/SEO.tsx
import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  noIndex?: boolean
}

export default function SEO({
  title = 'Aviyo Plant-Based Nutrition - Healthy, Affordable Plant-Based Foods',
  description = 'Enzyme-enhanced plant-based milks probiotic yoghut, dairy & cafein alternatives and SuperSoft Chapati flour for lactose-intolerant and health-conscious Ugandans.',
  keywords = 'plant-based milk, lactose-free, probiotic yoghut, enzyme-enhanced, Ugandan food, healthy nutrition',
  image = '/images/og-image.jpg',
  url = 'https://aviyo.online',
  type = 'website',
  publishedTime,
  author = 'Aviyo Plant-Based Nutrition Ltd',
  noIndex = false,
}: SEOProps) {
  const siteTitle = 'Aviyo Plant-Based Nutrition'
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_UG" />
      
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'Article' : 'Organization',
            ...(type === 'article' && {
              headline: title,
              description: description,
              author: {
                '@type': 'Person',
                name: author,
              },
              datePublished: publishedTime,
            }),
            ...(type === 'website' && {
              name: siteTitle,
              description: description,
              url: url,
              logo: {
                '@type': 'ImageObject',
                url: '/images/logo.png',
              },
              sameAs: [
                'https://www.linkedin.com/company/aviyo-plant-based-nutrition-ltd',
                'https://www.tiktok.com/@aviyo_plant_based',
                'https://www.facebook.com/aviyoplantbased',
                'https://www.x.com/@aviyonutri7wg',
              ],
            }),
          }),
        }}
      />
    </Head>
  )
}