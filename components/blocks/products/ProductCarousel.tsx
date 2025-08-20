'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
    HeartIcon,
    ShoppingCartIcon
} from '@heroicons/react/24/outline'

// 继承基础产品接口
import { Product } from './ProductGrid1'

export interface ProductCarouselProps {
    // 区块标题
    title?: {
        main: string
        subtitle?: string
        alignment?: 'left' | 'center'
    }

    // 产品列表
    products: Product[]

    // 轮播配置
    carousel?: {
        itemsPerView?: {
            mobile: number
            tablet: number
            desktop: number
        }
        spacing?: number // 项目间距
        autoplay?: {
            enabled: boolean
            delay: number
            pauseOnHover: boolean
        }
        loop?: boolean
        navigation?: {
            arrows: boolean
            dots: boolean
            position?: 'inside' | 'outside'
        }
    }

    // 卡片配置
    card?: {
        style?: 'minimal' | 'detailed' | 'compact'
        showQuickActions?: boolean
        hoverEffect?: 'lift' | 'scale' | 'none'
        borderRadius?: 'none' | 'small' | 'medium' | 'large'
    }

    // 显示配置
    display?: {
        showPrice?: boolean
        showRating?: boolean
        showCategory?: boolean
        showDescription?: boolean
        showBadge?: boolean
    }

    // 回调函数
    onProductClick?: (product: Product) => void
    onAddToCart?: (product: Product) => void
    onAddToWishlist?: (productId: string) => void
}

/**
 * ProductCarousel - 横向轮播产品展示
 * 
 * 特点：
 * - 流畅的横向滚动
 * - 自适应响应式显示
 * - 自动播放支持
 * - 多种卡片样式
 * - 触摸滑动支持
 */
export function ProductCarousel({
    title,
    products,
    carousel = {},
    card = {},
    display = {},
    onProductClick,
    onAddToCart,
    onAddToWishlist
}: ProductCarouselProps) {
    const {
        itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
        spacing = 16,
        autoplay = { enabled: false, delay: 5000, pauseOnHover: true },
        loop = true,
        navigation = { arrows: true, dots: true, position: 'outside' }
    } = carousel

    const {
        style = 'detailed',
        showQuickActions = true,
        hoverEffect = 'lift',
        borderRadius = 'medium'
    } = card

    const {
        showPrice = true,
        showRating = true,
        showCategory = true,
        showDescription = false,
        showBadge = true
    } = display

    // 轮播状态
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)
    const autoplayRef = useRef<NodeJS.Timeout>()

    // 响应式项目数量
    const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView.desktop)

    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth < 768) {
                setCurrentItemsPerView(itemsPerView.mobile)
            } else if (window.innerWidth < 1024) {
                setCurrentItemsPerView(itemsPerView.tablet)
            } else {
                setCurrentItemsPerView(itemsPerView.desktop)
            }
        }

        updateItemsPerView()
        window.addEventListener('resize', updateItemsPerView)
        return () => window.removeEventListener('resize', updateItemsPerView)
    }, [itemsPerView])

    // 自动播放
    useEffect(() => {
        if (!autoplay.enabled || isAutoplayPaused) return

        autoplayRef.current = setInterval(() => {
            nextSlide()
        }, autoplay.delay)

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current)
            }
        }
    }, [autoplay.enabled, isAutoplayPaused, currentIndex])

    // 计算最大索引
    const maxIndex = Math.max(0, products.length - currentItemsPerView)

    // 下一张
    const nextSlide = () => {
        setCurrentIndex(prev => {
            if (loop) {
                return prev >= maxIndex ? 0 : prev + 1
            }
            return Math.min(prev + 1, maxIndex)
        })
    }

    // 上一张
    const prevSlide = () => {
        setCurrentIndex(prev => {
            if (loop) {
                return prev <= 0 ? maxIndex : prev - 1
            }
            return Math.max(prev - 1, 0)
        })
    }

    // 跳转到指定索引
    const goToSlide = (index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
    }

    // 暂停/恢复自动播放
    const pauseAutoplay = () => setIsAutoplayPaused(true)
    const resumeAutoplay = () => setIsAutoplayPaused(false)

    // 获取卡片样式类名
    const getCardClasses = () => {
        const baseClasses = 'bg-white overflow-hidden transition-all duration-300'

        const radiusClasses = {
            none: '',
            small: 'rounded-md',
            medium: 'rounded-lg',
            large: 'rounded-xl'
        }

        const hoverClasses = {
            lift: 'hover:transform hover:scale-105 hover:shadow-xl',
            scale: 'hover:scale-105',
            none: ''
        }

        return `${baseClasses} ${radiusClasses[borderRadius]} ${hoverClasses[hoverEffect]} shadow-sm hover:shadow-lg`
    }

    // 格式化价格
    const formatPrice = (price: number, currency = '¥') => {
        return `${currency}${price.toLocaleString()}`
    }

    // 获取产品徽章样式
    const getBadgeStyle = (type: string) => {
        const badgeStyles = {
            sale: 'bg-red-500 text-white',
            new: 'bg-green-500 text-white',
            hot: 'bg-orange-500 text-white',
            bestseller: 'bg-purple-500 text-white'
        }
        return badgeStyles[type as keyof typeof badgeStyles] || badgeStyles.sale
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* 标题区域 */}
                {title && (
                    <div className={`mb-12 ${title.alignment === 'center' ? 'text-center' : 'text-left flex justify-between items-end'}`}>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                {title.main}
                            </h2>
                            {title.subtitle && (
                                <p className="mt-4 text-lg text-gray-600">
                                    {title.subtitle}
                                </p>
                            )}
                        </div>

                        {/* 导航箭头 (外部位置) */}
                        {navigation.arrows && navigation.position === 'outside' && (
                            <div className="flex space-x-2">
                                <button
                                    onClick={prevSlide}
                                    disabled={!loop && currentIndex === 0}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    aria-label="上一个"
                                >
                                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    disabled={!loop && currentIndex >= maxIndex}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    aria-label="下一个"
                                >
                                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 轮播容器 */}
                <div
                    className="relative"
                    onMouseEnter={autoplay.pauseOnHover ? pauseAutoplay : undefined}
                    onMouseLeave={autoplay.pauseOnHover ? resumeAutoplay : undefined}
                >
                    {/* 产品轮播 */}
                    <div className="overflow-hidden" ref={carouselRef}>
                        <motion.div
                            className="flex"
                            style={{ gap: `${spacing}px` }}
                            animate={{
                                x: `-${currentIndex * (100 / currentItemsPerView)}%`
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                        >
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    className="flex-shrink-0"
                                    style={{ width: `calc(${100 / currentItemsPerView}% - ${spacing * (currentItemsPerView - 1) / currentItemsPerView}px)` }}
                                    whileHover={{ y: hoverEffect === 'lift' ? -8 : 0 }}
                                >
                                    <div className={getCardClasses()}>
                                        {/* 产品图片 */}
                                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />

                                            {/* 产品徽章 */}
                                            {showBadge && product.badge && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className={`px-2 py-1 text-xs font-bold rounded ${getBadgeStyle(product.badge.type)}`}>
                                                        {product.badge.text}
                                                    </span>
                                                </div>
                                            )}

                                            {/* 快速操作按钮 */}
                                            {showQuickActions && (
                                                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button
                                                        onClick={() => onAddToWishlist?.(product.id)}
                                                        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
                                                        aria-label="添加到收藏"
                                                    >
                                                        <HeartIcon className="w-4 h-4 text-gray-600 hover:text-red-500" />
                                                    </button>
                                                </div>
                                            )}

                                            {/* 快速购买按钮 */}
                                            {showQuickActions && onAddToCart && (
                                                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button
                                                        onClick={() => onAddToCart(product)}
                                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                                                    >
                                                        <ShoppingCartIcon className="w-4 h-4" />
                                                        <span>加入购物车</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* 产品信息 */}
                                        <div className={`p-4 ${style === 'compact' ? 'p-3' : style === 'minimal' ? 'p-2' : 'p-4'}`}>
                                            {/* 分类 */}
                                            {showCategory && product.category && style !== 'minimal' && (
                                                <div className="mb-2">
                                                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                                                        {product.category}
                                                    </span>
                                                </div>
                                            )}

                                            {/* 产品名称 */}
                                            <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 ${style === 'compact' ? 'text-sm' : 'text-base'
                                                }`}>
                                                <Link
                                                    href={product.href}
                                                    onClick={() => onProductClick?.(product)}
                                                    className="hover:text-primary-600 transition-colors"
                                                >
                                                    {product.name}
                                                </Link>
                                            </h3>

                                            {/* 产品描述 */}
                                            {showDescription && product.description && style === 'detailed' && (
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}

                                            {/* 评分 */}
                                            {showRating && product.rating && style !== 'minimal' && (
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
                                                    <span className={`font-bold text-gray-900 ${style === 'compact' ? 'text-base' : 'text-lg'
                                                        }`}>
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
                    </div>

                    {/* 导航箭头 (内部位置) */}
                    {navigation.arrows && navigation.position === 'inside' && (
                        <>
                            <button
                                onClick={prevSlide}
                                disabled={!loop && currentIndex === 0}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-10"
                                aria-label="上一个"
                            >
                                <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={!loop && currentIndex >= maxIndex}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-10"
                                aria-label="下一个"
                            >
                                <ChevronRightIcon className="w-5 h-5 text-gray-700" />
                            </button>
                        </>
                    )}
                </div>

                {/* 指示点 */}
                {navigation.dots && maxIndex > 0 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: maxIndex + 1 }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                                        ? 'bg-primary-600 scale-110'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`跳转到第 ${index + 1} 页`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
