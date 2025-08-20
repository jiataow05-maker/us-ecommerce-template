'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
    StarIcon,
    HeartIcon,
    ShoppingCartIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

// 继承基础产品接口
import { Product } from './ProductGrid1'

export interface ProductGrid2Props {
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
            mobile: 2 | 3
            tablet: 3 | 4
            desktop: 4 | 5
        }
        minItemHeight?: number // 最小项目高度
        maxItemHeight?: number // 最大项目高度
        spacing?: 'tight' | 'normal' | 'relaxed'
    }

    // 交互配置
    interaction?: {
        loadMore?: {
            enabled: boolean
            loadingText?: string
            buttonText?: string
        }
        infiniteScroll?: boolean
        animation?: {
            enabled: boolean
            stagger: boolean
        }
    }

    // 显示配置
    display?: {
        showPrice?: boolean
        showRating?: boolean
        showCategory?: boolean
        imageAspect?: 'auto' | 'square' | 'portrait' | 'landscape'
        overlayStyle?: 'gradient' | 'solid' | 'none'
    }

    // 回调函数
    onLoadMore?: () => void
    onProductClick?: (product: Product) => void
    onAddToWishlist?: (productId: string) => void
}

/**
 * ProductGrid2 - 瀑布流布局产品展示
 * 
 * 特点：
 * - Pinterest 风格瀑布流
 * - 自适应高度布局
 * - 无限滚动支持
 * - 优雅的悬停效果
 * - 视觉丰富的产品展示
 */
export function ProductGrid2({
    title,
    products,
    layout = {},
    interaction = {},
    display = {},
    onLoadMore,
    onProductClick,
    onAddToWishlist
}: ProductGrid2Props) {
    const {
        columns = { mobile: 2, tablet: 3, desktop: 4 },
        minItemHeight = 300,
        maxItemHeight = 500,
        spacing = 'normal'
    } = layout

    const {
        loadMore = { enabled: true, buttonText: '加载更多', loadingText: '加载中...' },
        infiniteScroll = false,
        animation = { enabled: true, stagger: true }
    } = interaction

    const {
        showPrice = true,
        showRating = true,
        showCategory = true,
        imageAspect = 'auto',
        overlayStyle = 'gradient'
    } = display

    const [isLoading, setIsLoading] = useState(false)
    const [visibleProducts, setVisibleProducts] = useState(products)

    // 获取随机高度（瀑布流效果）
    const getRandomHeight = () => {
        return Math.floor(Math.random() * (maxItemHeight - minItemHeight + 1)) + minItemHeight
    }

    // 获取网格类名
    const getGridColumns = () => {
        return `columns-${columns.mobile} md:columns-${columns.tablet} lg:columns-${columns.desktop}`
    }

    // 获取间距类名
    const getSpacing = () => {
        const spacingMap = {
            tight: 'gap-2',
            normal: 'gap-4',
            relaxed: 'gap-6'
        }
        return spacingMap[spacing]
    }

    // 获取图片宽高比
    const getImageAspect = () => {
        const aspectMap = {
            auto: 'aspect-auto',
            square: 'aspect-square',
            portrait: 'aspect-[3/4]',
            landscape: 'aspect-[4/3]'
        }
        return aspectMap[imageAspect]
    }

    // 获取覆盖层样式
    const getOverlayClass = () => {
        const overlayMap = {
            gradient: 'bg-gradient-to-t from-black/60 via-transparent to-transparent',
            solid: 'bg-black/40',
            none: ''
        }
        return overlayMap[overlayStyle]
    }

    // 处理加载更多
    const handleLoadMore = async () => {
        if (isLoading) return

        setIsLoading(true)
        try {
            await onLoadMore?.()
        } finally {
            setIsLoading(false)
        }
    }

    // 无限滚动处理
    useEffect(() => {
        if (!infiniteScroll) return

        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 1000
            ) {
                handleLoadMore()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [infiniteScroll])

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
                staggerChildren: animation.stagger ? 0.05 : 0
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="py-16 bg-gray-50">
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

                {/* 瀑布流网格 */}
                <motion.div
                    className={`${getGridColumns()} ${getSpacing()} space-y-4`}
                    variants={animation.enabled ? containerVariants : {}}
                    initial={animation.enabled ? "hidden" : "visible"}
                    whileInView={animation.enabled ? "visible" : {}}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {visibleProducts.map((product, index) => (
                        <motion.div
                            key={`${product.id}-${index}`}
                            className="group relative break-inside-avoid mb-4"
                            variants={animation.enabled ? itemVariants : {}}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">

                                {/* 产品图片 */}
                                <div className="relative overflow-hidden">
                                    <div
                                        className={`relative ${imageAspect === 'auto'
                                                ? `h-[${getRandomHeight()}px]`
                                                : getImageAspect()
                                            }`}
                                        style={imageAspect === 'auto' ? { height: `${getRandomHeight()}px` } : {}}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        />

                                        {/* 覆盖层 */}
                                        {overlayStyle !== 'none' && (
                                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getOverlayClass()}`} />
                                        )}

                                        {/* 产品徽章 */}
                                        {product.badge && (
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">
                                                    {product.badge.text}
                                                </span>
                                            </div>
                                        )}

                                        {/* 悬停操作按钮 */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => onProductClick?.(product)}
                                                    className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors duration-200"
                                                    aria-label="查看详情"
                                                >
                                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-700" />
                                                </button>
                                                <button
                                                    onClick={() => onAddToWishlist?.(product.id)}
                                                    className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors duration-200"
                                                    aria-label="添加到收藏"
                                                >
                                                    <HeartIcon className="w-5 h-5 text-gray-700 hover:text-red-500" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* 快速购买按钮 */}
                                        <div className="absolute bottom-3 left-3 right-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                                                <ShoppingCartIcon className="w-4 h-4" />
                                                <span>立即购买</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* 产品信息 */}
                                <div className="p-4">
                                    {/* 分类 */}
                                    {showCategory && product.category && (
                                        <div className="mb-2">
                                            <span className="text-xs text-primary-600 font-medium uppercase tracking-wide">
                                                {product.category}
                                            </span>
                                        </div>
                                    )}

                                    {/* 产品名称 */}
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                        <Link
                                            href={product.href}
                                            className="hover:text-primary-600 transition-colors"
                                        >
                                            {product.name}
                                        </Link>
                                    </h3>

                                    {/* 评分 */}
                                    {showRating && product.rating && (
                                        <div className="flex items-center space-x-1 mb-3">
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className={`w-3 h-3 ${i < product.rating!
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            {product.reviewCount && (
                                                <span className="text-xs text-gray-500">
                                                    ({product.reviewCount})
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* 价格 */}
                                    {showPrice && (
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
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 加载更多按钮 */}
                {loadMore.enabled && !infiniteScroll && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={isLoading}
                            className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                    {loadMore.loadingText}
                                </>
                            ) : (
                                loadMore.buttonText
                            )}
                        </button>
                    </div>
                )}

                {/* 无限滚动加载提示 */}
                {infiniteScroll && isLoading && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <div className="animate-spin h-5 w-5 border-2 border-primary-600 border-t-transparent rounded-full" />
                            <span>{loadMore.loadingText}</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
