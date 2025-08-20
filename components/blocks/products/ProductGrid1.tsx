'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    StarIcon,
    HeartIcon,
    ShoppingCartIcon,
    EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// 产品接口定义
export interface Product {
    id: string
    name: string
    description?: string
    price: number
    originalPrice?: number
    currency?: string
    image: string
    images?: string[] // 多图片
    category?: string
    rating?: number
    reviewCount?: number
    badge?: {
        text: string
        type: 'sale' | 'new' | 'hot' | 'bestseller'
    }
    inStock?: boolean
    href: string
}

export interface ProductGrid1Props {
    // 区块标题
    title?: {
        main: string
        subtitle?: string
        alignment?: 'left' | 'center'
    }

    // 产品列表
    products: Product[]

    // 布局配置
    layout?: {
        columns?: {
            mobile: 1 | 2
            tablet: 2 | 3
            desktop: 3 | 4
        }
        spacing?: 'tight' | 'normal' | 'relaxed'
        showFilters?: boolean
    }

    // 交互配置
    interaction?: {
        hoverEffect?: 'lift' | 'zoom' | 'none'
        showQuickActions?: boolean // 快速操作按钮
        showWishlist?: boolean // 收藏功能
        animation?: boolean // 滚动动画
    }

    // 显示配置
    display?: {
        showRating?: boolean
        showBadge?: boolean
        showDescription?: boolean
        showCategory?: boolean
        priceFormat?: 'default' | 'range'
    }

    // 回调函数
    onAddToCart?: (product: Product) => void
    onWishlistToggle?: (productId: string, isWishlisted: boolean) => void
    onQuickView?: (product: Product) => void
}

/**
 * ProductGrid1 - 经典3列网格产品展示
 * 
 * 特点：
 * - 经典网格布局，电商标准
 * - 响应式列数配置
 * - 悬停效果和快速操作
 * - 产品评分和标签
 * - 收藏和购物车功能
 */
export function ProductGrid1({
    title,
    products,
    layout = {},
    interaction = {},
    display = {},
    onAddToCart,
    onWishlistToggle,
    onQuickView
}: ProductGrid1Props) {
    const {
        columns = { mobile: 1, tablet: 2, desktop: 3 },
        spacing = 'normal',
        showFilters = false
    } = layout

    const {
        hoverEffect = 'lift',
        showQuickActions = true,
        showWishlist = true,
        animation = true
    } = interaction

    const {
        showRating = true,
        showBadge = true,
        showDescription = false,
        showCategory = true,
        priceFormat = 'default'
    } = display

    // 获取网格类名
    const getGridColumns = () => {
        return `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`
    }

    // 获取间距类名
    const getSpacing = () => {
        const spacingMap = {
            tight: 'gap-4',
            normal: 'gap-6',
            relaxed: 'gap-8'
        }
        return spacingMap[spacing]
    }

    // 获取悬停效果类名
    const getHoverEffect = () => {
        const effectMap = {
            lift: 'hover:transform hover:scale-105 hover:shadow-xl',
            zoom: 'overflow-hidden hover:scale-110',
            none: ''
        }
        return effectMap[hoverEffect]
    }

    // 获取徽章样式
    const getBadgeStyle = (type: string) => {
        const badgeStyles = {
            sale: 'bg-red-500 text-white',
            new: 'bg-green-500 text-white',
            hot: 'bg-orange-500 text-white',
            bestseller: 'bg-purple-500 text-white'
        }
        return badgeStyles[type as keyof typeof badgeStyles] || badgeStyles.sale
    }

    // 格式化价格
    const formatPrice = (price: number, currency = '¥') => {
        return `${currency}${price.toLocaleString()}`
    }

    // 动画变体
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* 标题区域 */}
                {title && (
                    <div className={`mb-12 ${title.alignment === 'center' ? 'text-center' : 'text-left'}`}>
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            {title.main}
                        </h2>
                        {title.subtitle && (
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                {title.subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* 筛选器 (可选) */}
                {showFilters && (
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
                                全部
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                                热销
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                                新品
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                                特价
                            </button>
                        </div>
                    </div>
                )}

                {/* 产品网格 */}
                <motion.div
                    className={`grid ${getGridColumns()} ${getSpacing()}`}
                    variants={animation ? containerVariants : {}}
                    initial={animation ? "hidden" : "visible"}
                    whileInView={animation ? "visible" : {}}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300"
                            variants={animation ? itemVariants : {}}
                        >
                            {/* 产品图片 */}
                            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                <Link href={product.href}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className={`object-cover transition-transform duration-300 ${hoverEffect === 'zoom' ? 'group-hover:scale-110' : ''
                                            }`}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </Link>

                                {/* 产品徽章 */}
                                {showBadge && product.badge && (
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className={`px-2 py-1 text-xs font-bold rounded ${getBadgeStyle(product.badge.type)}`}>
                                            {product.badge.text}
                                        </span>
                                    </div>
                                )}

                                {/* 库存状态 */}
                                {product.inStock === false && (
                                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                                        <span className="text-white font-semibold">缺货</span>
                                    </div>
                                )}

                                {/* 快速操作按钮 */}
                                {showQuickActions && (
                                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {/* 收藏按钮 */}
                                        {showWishlist && (
                                            <button
                                                onClick={() => onWishlistToggle?.(product.id, false)}
                                                className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
                                                aria-label="添加到收藏"
                                            >
                                                <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                            </button>
                                        )}

                                        {/* 快速查看 */}
                                        <button
                                            onClick={() => onQuickView?.(product)}
                                            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
                                            aria-label="快速查看"
                                        >
                                            <EyeIcon className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                )}

                                {/* 快速添加到购物车 */}
                                {showQuickActions && onAddToCart && product.inStock !== false && (
                                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => onAddToCart(product)}
                                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                                        >
                                            <ShoppingCartIcon className="w-4 h-4" />
                                            <span>加入购物车</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* 产品信息 */}
                            <div className="p-4">
                                {/* 分类 */}
                                {showCategory && product.category && (
                                    <div className="mb-2">
                                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                                            {product.category}
                                        </span>
                                    </div>
                                )}

                                {/* 产品名称 */}
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    <Link href={product.href} className="hover:text-primary-600 transition-colors">
                                        {product.name}
                                    </Link>
                                </h3>

                                {/* 产品描述 */}
                                {showDescription && product.description && (
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {product.description}
                                    </p>
                                )}

                                {/* 评分 */}
                                {showRating && product.rating && (
                                    <div className="flex items-center space-x-1 mb-3">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`w-4 h-4 ${i < product.rating!
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        {product.reviewCount && (
                                            <span className="text-sm text-gray-500">
                                                ({product.reviewCount})
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* 价格 */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        {formatPrice(product.price, product.currency)}
                                    </span>
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {formatPrice(product.originalPrice, product.currency)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* 悬停效果 */}
                            <div className={`transition-all duration-300 ${getHoverEffect()}`} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* 加载更多按钮 */}
                <div className="mt-12 text-center">
                    <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                        加载更多产品
                    </button>
                </div>
            </div>
        </section>
    )
}
