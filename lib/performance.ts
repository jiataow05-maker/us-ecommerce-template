/**
 * 性能优化工具函数
 * 专为美国市场网络环境优化
 */

// 图片优化配置
export const imageOptimization = {
    // 针对美国用户的图片CDN配置
    domains: [
        'images.unsplash.com',
        'via.placeholder.com',
        'cdn.shopify.com',
        'img.clerk.com',
    ],
    formats: ['image/webp', 'image/avif'],
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 85,
}

// 预加载关键资源
export function preloadCriticalResources() {
    if (typeof window === 'undefined') return

    // 预加载关键字体
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    fontLink.as = 'style'
    document.head.appendChild(fontLink)

    // 预连接到关键域名
    const domains = [
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',
        'https://js.stripe.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
    ]

    domains.forEach(domain => {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = domain
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
    })
}

// 懒加载图片观察器
export function createImageObserver() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null

    return new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement
                    if (img.dataset.src) {
                        img.src = img.dataset.src
                        img.removeAttribute('data-src')
                    }
                }
            })
        },
        {
            rootMargin: '50px 0px',
            threshold: 0.01,
        }
    )
}

// 优化关键渲染路径
export function optimizeCriticalRenderingPath() {
    if (typeof window === 'undefined') return

    // 移除未使用的CSS（运行时清理）
    const removeUnusedCSS = () => {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]')
        stylesheets.forEach(stylesheet => {
            const link = stylesheet as HTMLLinkElement
            if (link.href.includes('unused')) {
                link.remove()
            }
        })
    }

    // 延迟加载非关键CSS
    const loadNonCriticalCSS = () => {
        const nonCriticalCSS = [
            '/styles/non-critical.css',
            // 添加其他非关键CSS文件
        ]

        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = href
            link.media = 'print'
            link.onload = () => {
                link.media = 'all'
            }
            document.head.appendChild(link)
        })
    }

    // 页面加载完成后执行优化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            removeUnusedCSS()
            loadNonCriticalCSS()
        })
    } else {
        removeUnusedCSS()
        loadNonCriticalCSS()
    }
}

// 网络状态检测和适配
export function adaptToNetworkCondition() {
    if (typeof window === 'undefined' || !('navigator' in window)) return

    // 检测网络连接类型
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (connection) {
        const networkType = connection.effectiveType

        // 根据网络状况调整资源加载策略
        switch (networkType) {
            case 'slow-2g':
            case '2g':
                // 低速网络：减少图片质量，延迟加载非关键资源
                return {
                    imageQuality: 60,
                    enableLazyLoading: true,
                    deferNonCritical: true,
                }
            case '3g':
                // 中速网络：平衡质量和加载速度
                return {
                    imageQuality: 75,
                    enableLazyLoading: true,
                    deferNonCritical: false,
                }
            case '4g':
            default:
                // 高速网络：优先用户体验
                return {
                    imageQuality: 85,
                    enableLazyLoading: false,
                    deferNonCritical: false,
                }
        }
    }

    // 默认配置（假设良好网络环境）
    return {
        imageQuality: 85,
        enableLazyLoading: false,
        deferNonCritical: false,
    }
}

// Web Vitals 监控
export function trackWebVitals() {
    if (typeof window === 'undefined') return

    // 动态导入 web-vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
    }).catch(() => {
        // Fallback: 手动实现基础性能监控
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

            console.log('Performance Metrics:', {
                FCP: perfData.loadEventEnd - perfData.fetchStart,
                LCP: perfData.loadEventEnd - perfData.fetchStart,
                TTI: perfData.domInteractive - perfData.fetchStart,
            })
        })
    })
}

// 缓存策略配置
export const cacheConfig = {
    // 静态资源缓存时间（秒）
    static: {
        images: 31536000, // 1年
        css: 31536000,    // 1年
        js: 31536000,     // 1年
        fonts: 31536000,  // 1年
    },
    // 动态内容缓存时间
    dynamic: {
        api: 300,         // 5分钟
        pages: 3600,      // 1小时
        products: 1800,   // 30分钟
    },
}

// 服务端渲染优化
export const ssrOptimization = {
    // 关键页面预渲染
    criticalPages: [
        '/',
        '/products',
        '/about',
        '/contact',
    ],
    // ISR 重新验证时间（秒）
    revalidate: {
        homepage: 3600,    // 1小时
        products: 1800,    // 30分钟
        static: 86400,     // 1天
    },
}
