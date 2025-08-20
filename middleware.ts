import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // 安全头配置
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
    response.headers.set('X-XSS-Protection', '1; mode=block')

    // 内容安全策略 (针对美国市场优化)
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://www.google-analytics.com https://api.stripe.com",
        "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
    ].join('; ')

    response.headers.set('Content-Security-Policy', csp)

    // 性能优化头
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    // 针对美国用户的地理位置优化
    const country = request.geo?.country
    if (country && country !== 'US') {
        // 为非美国用户添加特殊标记，可用于CDN路由
        response.headers.set('X-User-Country', country)
    }

    // 添加跨域支持以提高全球访问性
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

    // 移动端检测
    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    if (isMobile) {
        response.headers.set('X-Device-Type', 'mobile')
    }

    // A/B 测试支持
    const abTestVariant = Math.random() > 0.5 ? 'A' : 'B'
    response.cookies.set('ab-test-variant', abTestVariant, {
        maxAge: 30 * 24 * 60 * 60, // 30天
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    })

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
