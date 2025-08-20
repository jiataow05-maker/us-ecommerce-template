import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ConditionalLayout } from '@/components/ConditionalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'US E-Commerce Store | Premium Products & Fast Shipping',
    template: '%s | US E-Commerce Store'
  },
  description: 'Discover premium products with fast shipping across the United States. Quality guaranteed, customer satisfaction first.',
  keywords: ['ecommerce', 'online shopping', 'USA', 'premium products', 'fast shipping'],
  authors: [{ name: 'US E-Commerce Store' }],
  creator: 'US E-Commerce Store',
  publisher: 'US E-Commerce Store',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'US E-Commerce Store | Premium Products & Fast Shipping',
    description: 'Discover premium products with fast shipping across the United States. Quality guaranteed, customer satisfaction first.',
    siteName: 'US E-Commerce Store',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'US E-Commerce Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US E-Commerce Store | Premium Products & Fast Shipping',
    description: 'Discover premium products with fast shipping across the United States. Quality guaranteed, customer satisfaction first.',
    images: ['/images/twitter-image.jpg'],
    creator: '@usecommercestore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Analytics />
      </body>
    </html>
  )
}
