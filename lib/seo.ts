import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  noIndex?: boolean
}

const defaultSEO = {
  title: 'US E-Commerce Store | Premium Products & Fast Shipping',
  description: 'Discover premium products with fast shipping across the United States. Quality guaranteed, customer satisfaction first.',
  keywords: ['ecommerce', 'online shopping', 'USA', 'premium products', 'fast shipping'],
  image: '/images/og-image.jpg',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  type: 'website' as const,
}

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noIndex = false,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | US E-Commerce Store` : defaultSEO.title
  const seoDescription = description || defaultSEO.description
  const seoKeywords = keywords || defaultSEO.keywords
  const seoImage = image || defaultSEO.image
  const seoUrl = url || defaultSEO.url

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      type,
      locale: 'en_US',
      url: seoUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: 'US E-Commerce Store',
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@usecommercestore',
    },
    alternates: {
      canonical: seoUrl,
    },
  }
}

// 结构化数据生成器
export function generateStructuredData(type: string, data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        name: 'US E-Commerce Store',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-800-123-4567',
          contactType: 'Customer Service',
          areaServed: 'US',
          availableLanguage: 'English',
        },
        sameAs: [
          process.env.NEXT_PUBLIC_FACEBOOK_URL,
          process.env.NEXT_PUBLIC_INSTAGRAM_URL,
          process.env.NEXT_PUBLIC_TWITTER_URL,
        ].filter(Boolean),
        ...data,
      }

    case 'Product':
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        image: data.image,
        brand: {
          '@type': 'Brand',
          name: 'US E-Commerce Store',
        },
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'USD',
          availability: data.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'US E-Commerce Store',
          },
        },
        aggregateRating: data.rating && {
          '@type': 'AggregateRating',
          ratingValue: data.rating.value,
          reviewCount: data.rating.count,
        },
        ...data,
      }

    case 'WebSite':
      return {
        ...baseData,
        name: 'US E-Commerce Store',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        ...data,
      }

    default:
      return { ...baseData, ...data }
  }
}
