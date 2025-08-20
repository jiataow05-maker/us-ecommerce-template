'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    StarIcon,
    HeartIcon,
    ShoppingCartIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    ShareIcon
} from '@heroicons/react/24/outline'

// 继承基础产品接口
import { Product } from './ProductGrid1'

export interface ProductShowcaseProps {
    // 主推产品
    featuredProduct: Product & {
        images: string[] // 多图片必需
        features?: string[] // 产品特点
        specifications?: Record<string, string> // 规格参数
        variants?: Array<{
            id: string
            name: string
            value: string
            image?: string
        }> // 产品变体
    }

    // 相关产品列表
    relatedProducts?: Product[]

    // 布局配置
    layout?: {
        imagePosition?: 'left' | 'right'
        thumbnailPosition?: 'bottom' | 'side'
        showRelatedProducts?: boolean
        relatedProductsTitle?: string
    }

    // 显示配置
    display?: {
        showFeatures?: boolean
        showSpecifications?: boolean
        showVariants?: boolean
        showSocialShare?: boolean
        showZoom?: boolean
        showFullscreen?: boolean
    }

    // 交互配置
    interaction?: {
        enableImageZoom?: boolean
        enableThumbnailPreview?: boolean
        animation?: boolean
    }

    // 回调函数
    onAddToCart?: (product: Product, variant?: any) => void
    onAddToWishlist?: (productId: string) => void
    onImageZoom?: (imageUrl: string) => void
    onShare?: (product: Product) => void
    onVariantChange?: (variantId: string) => void
}

/**
 * ProductShowcase - 大图展示 + 小图列表
 * 
 * 特点：
 * - 高端产品展示布局
 * - 多图片轮播和缩略图
 * - 产品变体选择
 * - 详细规格展示
 * - 相关产品推荐
 */
export function ProductShowcase({
    featuredProduct,
    relatedProducts = [],
    layout = {},
    display = {},
    interaction = {},
    onAddToCart,
    onAddToWishlist,
    onImageZoom,
    onShare,
    onVariantChange
}: ProductShowcaseProps) {
    const {
        imagePosition = 'left',
        thumbnailPosition = 'bottom',
        showRelatedProducts = true,
        relatedProductsTitle = '相关推荐'
    } = layout

    const {
        showFeatures = true,
        showSpecifications = true,
        showVariants = true,
        showSocialShare = true,
        showZoom = true,
        showFullscreen = true
    } = display

    const {
        enableImageZoom = true,
        enableThumbnailPreview = true,
        animation = true
    } = interaction

    // 状态管理
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [quantity, setQuantity] = useState(1)

    // 图片导航
    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            (prev + 1) % featuredProduct.images.length
        )
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? featuredProduct.images.length - 1 : prev - 1
        )
    }

    const goToImage = (index: number) => {
        setCurrentImageIndex(index)
    }

    // 处理变体选择
    const handleVariantChange = (variantId: string) => {
        setSelectedVariant(variantId)
        onVariantChange?.(variantId)

        // 如果变体有对应图片，切换到该图片
        const variant = featuredProduct.variants?.find(v => v.id === variantId)
        if (variant?.image) {
            const imageIndex = featuredProduct.images.findIndex(img => img === variant.image)
            if (imageIndex !== -1) {
                setCurrentImageIndex(imageIndex)
            }
        }
    }

    // 处理收藏
    const handleWishlistToggle = () => {
        setIsWishlisted(!isWishlisted)
        onAddToWishlist?.(featuredProduct.id)
    }

    // 处理加入购物车
    const handleAddToCart = () => {
        const selectedVariantData = featuredProduct.variants?.find(v => v.id === selectedVariant)
        onAddToCart?.(featuredProduct, selectedVariantData)
    }

    // 格式化价格
    const formatPrice = (price: number, currency = '¥') => {
        return `${currency}${price.toLocaleString()}`
    }

    // 动画变体
    const imageVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    }

    const isImageLeft = imagePosition === 'left'

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* 主要产品展示 */}
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${isImageLeft ? '' : 'lg:grid-flow-col-dense'
                    }`}>

                    {/* 产品图片区域 */}
                    <div className={`space-y-4 ${isImageLeft ? '' : 'lg:col-start-2'}`}>

                        {/* 主图片 */}
                        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
                            <AnimatePresence mode="wait" custom={currentImageIndex}>
                                <motion.div
                                    key={currentImageIndex}
                                    custom={currentImageIndex}
                                    variants={animation ? imageVariants : {}}
                                    initial={animation ? "enter" : "center"}
                                    animate="center"
                                    exit={animation ? "exit" : "center"}
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={featuredProduct.images[currentImageIndex]}
                                        alt={featuredProduct.name}
                                        fill
                                        className="object-cover"
                                        priority={currentImageIndex === 0}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* 图片导航按钮 */}
                            {featuredProduct.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        aria-label="上一张图片"
                                    >
                                        <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        aria-label="下一张图片"
                                    >
                                        <ChevronRightIcon className="w-5 h-5 text-gray-700" />
                                    </button>
                                </>
                            )}

                            {/* 图片操作按钮 */}
                            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {showZoom && enableImageZoom && (
                                    <button
                                        onClick={() => onImageZoom?.(featuredProduct.images[currentImageIndex])}
                                        className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors duration-200"
                                        aria-label="放大图片"
                                    >
                                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-700" />
                                    </button>
                                )}
                                {showSocialShare && (
                                    <button
                                        onClick={() => onShare?.(featuredProduct)}
                                        className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors duration-200"
                                        aria-label="分享产品"
                                    >
                                        <ShareIcon className="w-5 h-5 text-gray-700" />
                                    </button>
                                )}
                            </div>

                            {/* 产品徽章 */}
                            {featuredProduct.badge && (
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded">
                                        {featuredProduct.badge.text}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 缩略图 */}
                        {featuredProduct.images.length > 1 && (
                            <div className={`grid gap-2 ${thumbnailPosition === 'bottom'
                                    ? `grid-cols-${Math.min(6, featuredProduct.images.length)}`
                                    : 'grid-cols-1 max-w-24'
                                }`}>
                                {featuredProduct.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${currentImageIndex === index
                                                ? 'border-primary-600 ring-2 ring-primary-200'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${featuredProduct.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="100px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 产品信息区域 */}
                    <div className={`space-y-6 ${isImageLeft ? '' : 'lg:col-start-1'}`}>

                        {/* 产品分类 */}
                        {featuredProduct.category && (
                            <div>
                                <span className="text-sm text-primary-600 font-medium uppercase tracking-wide">
                                    {featuredProduct.category}
                                </span>
                            </div>
                        )}

                        {/* 产品标题 */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                {featuredProduct.name}
                            </h1>
                            {featuredProduct.description && (
                                <p className="mt-4 text-lg text-gray-600">
                                    {featuredProduct.description}
                                </p>
                            )}
                        </div>

                        {/* 评分 */}
                        {featuredProduct.rating && (
                            <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-5 h-5 ${i < featuredProduct.rating!
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {featuredProduct.rating}/5
                                </span>
                                {featuredProduct.reviewCount && (
                                    <span className="text-sm text-gray-500">
                                        ({featuredProduct.reviewCount} 评价)
                                    </span>
                                )}
                            </div>
                        )}

                        {/* 价格 */}
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-gray-900">
                                {formatPrice(featuredProduct.price, featuredProduct.currency)}
                            </span>
                            {featuredProduct.originalPrice && featuredProduct.originalPrice > featuredProduct.price && (
                                <span className="text-xl text-gray-500 line-through">
                                    {formatPrice(featuredProduct.originalPrice, featuredProduct.currency)}
                                </span>
                            )}
                        </div>

                        {/* 产品特点 */}
                        {showFeatures && featuredProduct.features && featuredProduct.features.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">产品特点</h3>
                                <ul className="space-y-2">
                                    {featuredProduct.features.map((feature, index) => (
                                        <li key={index} className="flex items-center space-x-2 text-gray-700">
                                            <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* 产品变体 */}
                        {showVariants && featuredProduct.variants && featuredProduct.variants.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">选择规格</h3>
                                <div className="space-y-4">
                                    {featuredProduct.variants.map((variant) => (
                                        <div key={variant.id}>
                                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                                {variant.name}
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleVariantChange(variant.id)}
                                                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${selectedVariant === variant.id
                                                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                        }`}
                                                >
                                                    {variant.value}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 数量选择 */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                数量
                            </label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border border-gray-300 rounded-lg text-center min-w-16">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <ShoppingCartIcon className="w-5 h-5" />
                                <span>加入购物车</span>
                            </button>
                            <button
                                onClick={handleWishlistToggle}
                                className={`p-3 border rounded-lg transition-colors duration-200 ${isWishlisted
                                        ? 'border-red-500 bg-red-50 text-red-600'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                                aria-label="添加到收藏"
                            >
                                <HeartIcon className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* 产品规格 */}
                        {showSpecifications && featuredProduct.specifications && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">产品规格</h3>
                                <div className="space-y-2">
                                    {Object.entries(featuredProduct.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">{key}</span>
                                            <span className="text-gray-900 font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 相关产品推荐 */}
                {showRelatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            {relatedProductsTitle}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.slice(0, 4).map((product) => (
                                <Link
                                    key={product.id}
                                    href={product.href}
                                    className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="relative aspect-square bg-gray-100">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {product.name}
                                        </h4>
                                        <div className="text-lg font-bold text-gray-900">
                                            {formatPrice(product.price, product.currency)}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
