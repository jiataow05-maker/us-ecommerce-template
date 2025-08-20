import { NextResponse } from 'next/server'

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

    const staticPages = [
        '',
        '/about',
        '/products',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
        '/shipping-policy',
        '/return-policy',
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
            .map((path) => {
                return `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === '' ? '1.0' : '0.7'}</priority>
    </url>`
            })
            .join('')}
</urlset>`

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}

