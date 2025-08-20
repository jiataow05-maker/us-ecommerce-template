import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'US E-Commerce Store',
        short_name: 'US Store',
        description: 'Premium products with fast shipping across the United States',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3b82f6',
        orientation: 'portrait-primary',
        categories: ['shopping', 'business'],
        lang: 'en-US',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png'
            }
        ],
        shortcuts: [
            {
                name: 'Products',
                short_name: 'Products',
                description: 'Browse our product catalog',
                url: '/products',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }]
            },
            {
                name: 'Cart',
                short_name: 'Cart',
                description: 'View shopping cart',
                url: '/cart',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }]
            }
        ]
    }
}
