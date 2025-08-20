'use client'

import dynamic from 'next/dynamic'
import { PageElement } from '@/lib/page-builder-store'

// 动态导入所有组件，避免打包时的循环依赖
const Hero1 = dynamic(() => import('@/components/blocks/hero/Hero1').then(mod => ({ default: mod.Hero1 })), { ssr: false })
const Hero2 = dynamic(() => import('@/components/blocks/hero/Hero2').then(mod => ({ default: mod.Hero2 })), { ssr: false })
const Hero3 = dynamic(() => import('@/components/blocks/hero/Hero3').then(mod => ({ default: mod.Hero3 })), { ssr: false })
const Hero4 = dynamic(() => import('@/components/blocks/hero/Hero4').then(mod => ({ default: mod.Hero4 })), { ssr: false })

const ProductGrid1 = dynamic(() => import('@/components/blocks/products/ProductGrid1').then(mod => ({ default: mod.ProductGrid1 })), { ssr: false })
const ProductGrid2 = dynamic(() => import('@/components/blocks/products/ProductGrid2').then(mod => ({ default: mod.ProductGrid2 })), { ssr: false })
const ProductCarousel = dynamic(() => import('@/components/blocks/products/ProductCarousel').then(mod => ({ default: mod.ProductCarousel })), { ssr: false })
const ProductShowcase = dynamic(() => import('@/components/blocks/products/ProductShowcase').then(mod => ({ default: mod.ProductShowcase })), { ssr: false })

const Testimonial1 = dynamic(() => import('@/components/blocks/testimonials/Testimonial1').then(mod => ({ default: mod.Testimonial1 })), { ssr: false })
const Testimonial2 = dynamic(() => import('@/components/blocks/testimonials/Testimonial2').then(mod => ({ default: mod.Testimonial2 })), { ssr: false })
const Testimonial3 = dynamic(() => import('@/components/blocks/testimonials/Testimonial3').then(mod => ({ default: mod.Testimonial3 })), { ssr: false })

const Pricing1 = dynamic(() => import('@/components/blocks/pricing/Pricing1').then(mod => ({ default: mod.Pricing1 })), { ssr: false })
const Pricing2 = dynamic(() => import('@/components/blocks/pricing/Pricing2').then(mod => ({ default: mod.Pricing2 })), { ssr: false })
const Pricing3 = dynamic(() => import('@/components/blocks/pricing/Pricing3').then(mod => ({ default: mod.Pricing3 })), { ssr: false })

const BlogGrid1 = dynamic(() => import('@/components/blocks/blog/BlogGrid1').then(mod => ({ default: mod.BlogGrid1 })), { ssr: false })
const BlogList = dynamic(() => import('@/components/blocks/blog/BlogList').then(mod => ({ default: mod.BlogList })), { ssr: false })
const BlogMasonry = dynamic(() => import('@/components/blocks/blog/BlogMasonry').then(mod => ({ default: mod.BlogMasonry })), { ssr: false })

const Contact1 = dynamic(() => import('@/components/blocks/contact/Contact1').then(mod => ({ default: mod.Contact1 })), { ssr: false })
const Contact2 = dynamic(() => import('@/components/blocks/contact/Contact2').then(mod => ({ default: mod.Contact2 })), { ssr: false })
const Contact3 = dynamic(() => import('@/components/blocks/contact/Contact3').then(mod => ({ default: mod.Contact3 })), { ssr: false })

const Stats1 = dynamic(() => import('@/components/blocks/stats/Stats1').then(mod => ({ default: mod.Stats1 })), { ssr: false })
const Stats2 = dynamic(() => import('@/components/blocks/stats/Stats2').then(mod => ({ default: mod.Stats2 })), { ssr: false })
const Stats3 = dynamic(() => import('@/components/blocks/stats/Stats3').then(mod => ({ default: mod.Stats3 })), { ssr: false })

// 组件映射
const COMPONENT_MAP = {
    // Hero 组件
    hero1: Hero1,
    hero2: Hero2,
    hero3: Hero3,
    hero4: Hero4,

    // Products 组件
    grid1: ProductGrid1,
    grid2: ProductGrid2,
    carousel: ProductCarousel,
    showcase: ProductShowcase,

    // Testimonials 组件
    testimonial1: Testimonial1,
    testimonial2: Testimonial2,
    testimonial3: Testimonial3,

    // Pricing 组件
    pricing1: Pricing1,
    pricing2: Pricing2,
    pricing3: Pricing3,

    // Blog 组件
    'blog-grid1': BlogGrid1,
    'blog-list': BlogList,
    'blog-masonry': BlogMasonry,

    // Contact 组件
    contact1: Contact1,
    contact2: Contact2,
    contact3: Contact3,

    // Stats 组件
    stats1: Stats1,
    stats2: Stats2,
    stats3: Stats3
} as const

// 默认 Props 配置 - 修复对象渲染问题
const getDefaultProps = (type: string) => {
    switch (type) {
        case 'hero1':
            return {
                title: {
                    main: "欢迎来到我们的网站",
                    highlight: "精彩内容"
                },
                description: "这是一个示例描述文本，您可以在右侧属性面板中修改它。",
                buttons: {
                    primary: {
                        text: "立即开始",
                        href: "#",
                        icon: true
                    },
                    secondary: {
                        text: "了解更多",
                        href: "#",
                        variant: "button" as const
                    }
                },
                image: {
                    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    alt: "示例图片"
                },
                stats: [
                    { value: "1000+", label: "满意客户" },
                    { value: "24/7", label: "客户支持" },
                    { value: "99%", label: "满意度" },
                    { value: "5年", label: "专业经验" }
                ]
            }

        case 'hero2':
            return {
                background: {
                    type: "gradient" as const,
                    gradient: {
                        from: "#3b82f6",
                        to: "#1e40af",
                        direction: "to-br" as const
                    }
                },
                content: {
                    subtitle: "🚀 全新体验",
                    title: {
                        main: "创新改变",
                        highlight: "未来"
                    },
                    description: "体验前所未有的创新产品，让科技改变您的生活方式。",
                    buttons: {
                        primary: {
                            text: "开始体验",
                            href: "#"
                        },
                        secondary: {
                            text: "观看演示",
                            href: "#",
                            variant: "outline" as const,
                            icon: "play" as const
                        }
                    }
                }
            }

        case 'hero3':
            return {
                layout: {
                    variant: "split" as const,
                    rightContent: "features" as const
                },
                content: {
                    subtitle: "💎 专业版",
                    title: {
                        main: "下一代",
                        highlight: "解决方案"
                    },
                    description: "为现代企业量身定制的专业解决方案，提升效率，降低成本。",
                    buttons: {
                        primary: {
                            text: "免费试用",
                            href: "#"
                        },
                        secondary: {
                            text: "观看演示",
                            href: "#",
                            variant: "link" as const
                        }
                    }
                },
                features: [
                    { icon: "⚡", name: "高性能", description: "极速响应" },
                    { icon: "🔒", name: "安全可靠", description: "企业级安全" },
                    { icon: "📊", name: "数据分析", description: "智能洞察" }
                ]
            }

        case 'hero4':
            return {
                background: {
                    type: "video" as const,
                    video: {
                        src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    }
                },
                content: {
                    subtitle: "🎬 震撼体验",
                    title: {
                        main: "未来已来",
                        highlight: "即刻体验"
                    },
                    description: "沉浸式体验，颠覆传统认知。",
                    buttons: {
                        primary: {
                            text: "立即体验",
                            href: "#"
                        }
                    }
                }
            }

        case 'grid1':
            return {
                title: {
                    main: "精选产品",
                    subtitle: "为您精心挑选的优质产品",
                    alignment: "center" as const
                },
                products: [
                    {
                        id: "1",
                        name: "示例产品 1",
                        description: "这是一个示例产品描述",
                        price: 99,
                        currency: "¥",
                        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        category: { name: "电子产品", slug: "electronics" },
                        rating: 5,
                        reviewCount: 128,
                        href: "#"
                    },
                    {
                        id: "2",
                        name: "示例产品 2",
                        description: "这是另一个示例产品描述",
                        price: 199,
                        currency: "¥",
                        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        category: { name: "配件", slug: "accessories" },
                        rating: 4,
                        reviewCount: 89,
                        href: "#"
                    },
                    {
                        id: "3",
                        name: "示例产品 3",
                        description: "第三个示例产品的描述",
                        price: 299,
                        currency: "¥",
                        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        category: { name: "数码", slug: "digital" },
                        rating: 5,
                        reviewCount: 156,
                        href: "#"
                    }
                ]
            }

        case 'grid2':
            return {
                title: {
                    main: "创意产品",
                    subtitle: "激发您的创造力"
                },
                products: [
                    {
                        id: "1",
                        name: "设计工具",
                        description: "专业设计师的首选工具",
                        price: 299,
                        image: "https://images.unsplash.com/photo-1541278107931-e006523892df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        category: { name: "设计", slug: "design" }
                    },
                    {
                        id: "2",
                        name: "创意素材",
                        description: "海量高质量素材库",
                        price: 199,
                        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        category: { name: "素材", slug: "assets" }
                    }
                ]
            }

        case 'carousel':
            return {
                title: {
                    main: "热门推荐",
                    subtitle: "本周最受欢迎的产品"
                },
                products: [
                    {
                        id: "1",
                        name: "热销产品 1",
                        description: "用户评价最高的产品",
                        price: 399,
                        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        category: { name: "热销", slug: "hot" },
                        badge: "🔥 热销"
                    }
                ],
                layout: {
                    autoplay: true,
                    showNavigation: true,
                    itemsPerView: { mobile: 1, tablet: 2, desktop: 3 }
                }
            }

        case 'showcase':
            return {
                product: {
                    id: "featured",
                    name: "旗舰产品",
                    description: "我们的明星产品，集合了所有最新技术和用户喜爱的功能。",
                    price: 999,
                    originalPrice: 1299,
                    currency: "¥",
                    images: [
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    ],
                    category: { name: "旗舰", slug: "flagship" },
                    rating: 5,
                    reviewCount: 256,
                    features: [
                        "高端材质",
                        "精工制作",
                        "全球保修",
                        "免费配送"
                    ]
                }
            }

        case 'testimonial1':
            return {
                title: {
                    main: "客户评价",
                    subtitle: "看看我们的客户怎么说",
                    alignment: "center" as const
                },
                testimonials: [
                    {
                        id: "1",
                        name: "张三",
                        role: "产品经理",
                        company: "科技公司",
                        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                        rating: 5,
                        content: "这个产品真的很棒，完全超出了我们的预期！团队的服务也非常专业。",
                        date: "2024-01-15",
                        verified: true
                    },
                    {
                        id: "2",
                        name: "李四",
                        role: "设计师",
                        company: "设计工作室",
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                        rating: 5,
                        content: "用户体验非常好，界面设计简洁美观，功能也很实用。强烈推荐！",
                        date: "2024-01-20",
                        verified: true
                    }
                ]
            }

        case 'testimonial2':
            return {
                testimonial: {
                    id: "featured",
                    name: "王五",
                    role: "CEO",
                    company: "创新企业",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                    content: "这个解决方案彻底改变了我们的业务流程，效率提升了300%！",
                    rating: 5,
                    metrics: [
                        { label: "效率提升", value: "300%" },
                        { label: "成本降低", value: "50%" }
                    ]
                }
            }

        case 'testimonial3':
            return {
                title: {
                    main: "用户声音",
                    subtitle: "来自真实用户的反馈"
                },
                testimonials: [
                    {
                        id: "1",
                        name: "用户A",
                        role: "开发者",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                        content: "非常好用的工具！",
                        rating: 5
                    },
                    {
                        id: "2",
                        name: "用户B",
                        role: "产品经理",
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                        content: "界面设计很棒，功能很强大。",
                        rating: 5
                    }
                ]
            }

        case 'pricing1':
            return {
                title: {
                    main: "选择适合您的方案",
                    subtitle: "灵活的定价，满足不同需求",
                    alignment: "center" as const
                },
                plans: [
                    {
                        id: "basic",
                        name: "基础版",
                        description: "适合个人用户和小团队",
                        price: { monthly: 99, yearly: 999 },
                        features: [
                            { name: "基础功能", included: true },
                            { name: "邮件支持", included: true },
                            { name: "5GB 存储空间", included: true },
                            { name: "高级功能", included: false },
                            { name: "优先支持", included: false }
                        ],
                        buttonText: "开始使用"
                    },
                    {
                        id: "pro",
                        name: "专业版",
                        description: "适合成长中的企业",
                        price: { monthly: 199, yearly: 1999 },
                        features: [
                            { name: "所有基础功能", included: true },
                            { name: "高级功能", included: true },
                            { name: "50GB 存储空间", included: true },
                            { name: "优先支持", included: true },
                            { name: "API 访问", included: true }
                        ],
                        highlighted: true,
                        popular: true,
                        buttonText: "立即升级"
                    }
                ]
            }

        case 'pricing2':
            return {
                title: {
                    main: "灵活定价方案",
                    subtitle: "为每种需求量身定制"
                },
                plans: [
                    {
                        id: "starter",
                        name: "入门版",
                        description: "开始您的旅程",
                        pricing: { monthly: 49, yearly: 490 },
                        icon: "🚀",
                        buttonText: "开始使用"
                    }
                ]
            }

        case 'pricing3':
            return {
                title: {
                    main: "选择计费周期",
                    subtitle: "年付享受更多优惠"
                },
                plans: [
                    {
                        id: "flexible",
                        name: "灵活版",
                        description: "按需付费，灵活使用",
                        pricing: { monthly: 99, yearly: 999, quarterly: 279 },
                        buttonText: "选择方案"
                    }
                ]
            }

        case 'blog-grid1':
            return {
                title: {
                    main: "最新文章",
                    subtitle: "分享知识，传递价值"
                },
                posts: [
                    {
                        id: "1",
                        title: "如何提升工作效率",
                        excerpt: "分享一些实用的工作技巧和方法...",
                        author: {
                            name: "作者名",
                            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        },
                        publishedAt: "2024-01-15",
                        readTime: 5,
                        category: { name: "效率", slug: "productivity" },
                        featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        slug: "productivity-tips"
                    }
                ]
            }

        case 'blog-list':
            return {
                title: {
                    main: "文章列表",
                    subtitle: "精选内容推荐"
                },
                posts: [
                    {
                        id: "1",
                        title: "技术分享：前端开发最佳实践",
                        excerpt: "探讨现代前端开发的最佳实践和技巧...",
                        author: {
                            name: "技术专家",
                            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        },
                        publishedAt: "2024-01-20",
                        readTime: 8,
                        category: { name: "技术", slug: "tech" },
                        featuredImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        slug: "frontend-best-practices"
                    }
                ]
            }

        case 'blog-masonry':
            return {
                title: {
                    main: "创意灵感",
                    subtitle: "设计与创意的碰撞"
                },
                posts: [
                    {
                        id: "1",
                        title: "设计趋势解析",
                        excerpt: "2024年最新设计趋势...",
                        author: {
                            name: "设计师",
                            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        },
                        publishedAt: "2024-01-25",
                        readTime: 6,
                        category: { name: "设计", slug: "design" },
                        featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        slug: "design-trends-2024"
                    }
                ]
            }

        case 'contact1':
            return {
                title: {
                    main: "联系我们",
                    subtitle: "有任何问题？我们很乐意为您解答"
                }
            }

        case 'contact2':
            return {
                title: {
                    main: "取得联系",
                    subtitle: "多种方式联系我们"
                },
                contactInfo: {
                    address: "北京市朝阳区创新大厦",
                    phone: "+86 138-0000-0000",
                    email: "contact@example.com"
                }
            }

        case 'contact3':
            return {
                title: {
                    main: "项目咨询",
                    subtitle: "告诉我们您的需求，我们为您量身定制解决方案"
                }
            }

        case 'stats1':
            return {
                title: {
                    main: "我们的成就",
                    subtitle: "数字说明一切"
                },
                stats: [
                    { label: "满意客户", value: 1000, suffix: "+", icon: "👥" },
                    { label: "项目完成", value: 500, suffix: "+", icon: "✅" },
                    { label: "团队成员", value: 50, suffix: "+", icon: "🚀" },
                    { label: "服务年限", value: 5, suffix: "年", icon: "⭐" }
                ]
            }

        case 'stats2':
            return {
                title: {
                    main: "实时数据",
                    subtitle: "关键业务指标"
                },
                stats: [
                    {
                        title: "总用户数",
                        value: 50000,
                        change: { value: 12, type: "increase" as const, period: "本月" },
                        color: "blue" as const,
                        suffix: "+"
                    },
                    {
                        title: "活跃用户",
                        value: 15000,
                        change: { value: 8, type: "increase" as const, period: "本周" },
                        color: "green" as const,
                        suffix: "+"
                    }
                ]
            }

        case 'stats3':
            return {
                title: {
                    main: "目标达成情况",
                    subtitle: "实时进度跟踪"
                },
                stats: [
                    {
                        label: "销售目标",
                        value: 75,
                        target: 100,
                        color: "#3b82f6",
                        description: "第一季度销售目标完成情况",
                        icon: "💰"
                    },
                    {
                        label: "用户增长",
                        value: 88,
                        target: 100,
                        color: "#10b981",
                        description: "月度用户增长目标",
                        icon: "📈"
                    }
                ]
            }

        default:
            return {}
    }
}

interface ComponentRendererProps {
    element: PageElement
}

export function ComponentRenderer({ element }: ComponentRendererProps) {
    const Component = COMPONENT_MAP[element.type as keyof typeof COMPONENT_MAP]

    if (!Component) {
        return (
            <div className="p-8 border-2 border-dashed border-red-300 bg-red-50 text-center">
                <div className="text-red-600">
                    <div className="text-2xl mb-2">⚠️</div>
                    <div className="font-medium">未知组件类型</div>
                    <div className="text-sm mt-1">类型: {element.type}</div>
                </div>
            </div>
        )
    }

    // 合并默认 props 和用户自定义 props
    const defaultProps = getDefaultProps(element.type)
    const mergedProps = { ...defaultProps, ...element.props }

    try {
        return <Component {...(mergedProps as any)} />
    } catch (error) {
        console.error(`渲染组件 ${element.type} 时出错:`, error)
        return (
            <div className="p-8 border-2 border-dashed border-yellow-300 bg-yellow-50 text-center">
                <div className="text-yellow-600">
                    <div className="text-2xl mb-2">⚠️</div>
                    <div className="font-medium">组件渲染错误</div>
                    <div className="text-sm mt-1">请检查组件配置</div>
                    <div className="text-xs mt-2 text-gray-600">错误: {String(error)}</div>
                </div>
            </div>
        )
    }
}