'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// 导入 Product 组件
import {
    ProductGrid1,
    ProductGrid2,
    ProductCarousel,
    ProductShowcase
} from '@/components/blocks/products'
import {
    productGrid1Example,
    productGrid2Example,
    productCarouselExample,
    productShowcaseExample
} from '@/components/blocks/products/examples'
import { PRODUCT_DESCRIPTIONS } from '@/components/blocks/products'

// Product 组件映射
const PRODUCT_COMPONENTS = {
    grid1: ProductGrid1,
    grid2: ProductGrid2,
    carousel: ProductCarousel,
    showcase: ProductShowcase
} as const

const PRODUCT_EXAMPLES = {
    grid1: productGrid1Example,
    grid2: productGrid2Example,
    carousel: productCarouselExample,
    showcase: productShowcaseExample
} as const

type ProductVariant = keyof typeof PRODUCT_COMPONENTS

export default function ProductsDemoPage() {
    const [currentProduct, setCurrentProduct] = useState<ProductVariant>('grid1')
    const [direction, setDirection] = useState(0)

    const productVariants = Object.keys(PRODUCT_COMPONENTS) as ProductVariant[]
    const currentIndex = productVariants.indexOf(currentProduct)

    const navigateProduct = (newVariant: ProductVariant) => {
        const newIndex = productVariants.indexOf(newVariant)
        setDirection(newIndex > currentIndex ? 1 : -1)
        setCurrentProduct(newVariant)
    }

    const nextProduct = () => {
        const nextIndex = (currentIndex + 1) % productVariants.length
        navigateProduct(productVariants[nextIndex])
    }

    const prevProduct = () => {
        const prevIndex = (currentIndex - 1 + productVariants.length) % productVariants.length
        navigateProduct(productVariants[prevIndex])
    }

    // 动画变体
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    const CurrentProductComponent = PRODUCT_COMPONENTS[currentProduct]
    const currentProps = PRODUCT_EXAMPLES[currentProduct]
    const currentDescription = PRODUCT_DESCRIPTIONS[currentProduct]

    // 模拟回调函数
    const handleAddToCart = (product: any) => {
        console.log('添加到购物车:', product)
        alert(`已将 "${product.name}" 添加到购物车`)
    }

    const handleAddToWishlist = (productId: string) => {
        console.log('添加到收藏:', productId)
        alert(`产品已添加到收藏夹`)
    }

    const handleProductClick = (product: any) => {
        console.log('查看产品:', product)
        alert(`查看产品详情: ${product.name}`)
    }

    const handleLoadMore = () => {
        console.log('加载更多产品')
        return new Promise(resolve => setTimeout(resolve, 1000))
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* 顶部控制栏 */}
            <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* 标题 */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                产品展示组件演示
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                体验不同的产品展示布局和交互效果
                            </p>
                        </div>

                        {/* 导航控制 */}
                        <div className="flex items-center space-x-4">
                            {/* 组件选择器 */}
                            <div className="flex space-x-2">
                                {productVariants.map((variant) => (
                                    <button
                                        key={variant}
                                        onClick={() => navigateProduct(variant)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentProduct === variant
                                                ? 'bg-primary-600 text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {PRODUCT_DESCRIPTIONS[variant].name}
                                    </button>
                                ))}
                            </div>

                            {/* 前后切换按钮 */}
                            <div className="flex space-x-1">
                                <button
                                    onClick={prevProduct}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                                    aria-label="上一个"
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextProduct}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                                    aria-label="下一个"
                                >
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 当前组件信息 */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {currentDescription.name} - {currentDescription.description}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    <strong>适用场景:</strong> {currentDescription.useCase}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">核心特性:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {currentDescription.features.map((feature, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product 组件展示区域 */}
            <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentProduct}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full"
                    >
                        {/* 渲染当前 Product 组件 */}
                        {currentProduct === 'grid1' && (
                            <ProductGrid1
                                {...currentProps}
                                onAddToCart={handleAddToCart}
                                onWishlistToggle={handleAddToWishlist}
                                onQuickView={handleProductClick}
                            />
                        )}
                        {currentProduct === 'grid2' && (
                            <ProductGrid2
                                {...currentProps}
                                onLoadMore={handleLoadMore}
                                onProductClick={handleProductClick}
                                onAddToWishlist={handleAddToWishlist}
                            />
                        )}
                        {currentProduct === 'carousel' && (
                            <ProductCarousel
                                {...currentProps}
                                onProductClick={handleProductClick}
                                onAddToCart={handleAddToCart}
                                onAddToWishlist={handleAddToWishlist}
                            />
                        )}
                        {currentProduct === 'showcase' && (
                            <ProductShowcase
                                {...currentProps}
                                onAddToCart={handleAddToCart}
                                onAddToWishlist={handleAddToWishlist}
                                onImageZoom={(imageUrl) => {
                                    console.log('放大图片:', imageUrl)
                                    alert('图片放大功能 - 在实际应用中会打开图片查看器')
                                }}
                                onShare={(product) => {
                                    console.log('分享产品:', product)
                                    alert(`分享产品: ${product.name}`)
                                }}
                                onVariantChange={(variantId) => {
                                    console.log('变体选择:', variantId)
                                }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 组件代码预览 */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        组件使用示例
                    </h3>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                            {`import { ${CurrentProductComponent.name} } from '@/components/blocks/products'

export default function MyPage() {
  return (
    <${CurrentProductComponent.name}
      title={{
        main: "产品展示",
        subtitle: "精选优质产品"
      }}
      products={productList}
      onAddToCart={(product) => {
        // 处理添加到购物车
        console.log('添加到购物车:', product)
      }}
      onAddToWishlist={(productId) => {
        // 处理添加到收藏
        console.log('添加到收藏:', productId)
      }}
      // ... 其他配置
    />
  )
}`}
                        </pre>
                    </div>

                    <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                            <p>
                                💡 <strong>响应式设计:</strong> 所有产品组件都完全适配移动端、平板和桌面端，
                                提供流畅的用户体验。
                            </p>
                        </div>
                        <div>
                            <p>
                                🎨 <strong>主题定制:</strong> 支持通过 Tailwind CSS 变量轻松定制主题色彩，
                                与您的品牌风格完美融合。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 功能特性说明 */}
            <div className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h4 className="text-2xl font-bold mb-4">
                            🛍️ 产品展示组件特性
                        </h4>
                        <p className="text-gray-400 max-w-3xl mx-auto">
                            专为电商和产品展示设计的高性能组件库，支持多种布局样式、
                            丰富的交互效果和完整的商业功能。
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl">📱</span>
                            </div>
                            <h5 className="font-semibold mb-2">响应式设计</h5>
                            <p className="text-sm text-gray-400">
                                完美适配所有设备，从手机到桌面端
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl">⚡</span>
                            </div>
                            <h5 className="font-semibold mb-2">高性能优化</h5>
                            <p className="text-sm text-gray-400">
                                懒加载、虚拟滚动等性能优化技术
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl">🎨</span>
                            </div>
                            <h5 className="font-semibold mb-2">高度可定制</h5>
                            <p className="text-sm text-gray-400">
                                丰富的配置选项，适应各种业务需求
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl">🔧</span>
                            </div>
                            <h5 className="font-semibold mb-2">易于集成</h5>
                            <p className="text-sm text-gray-400">
                                TypeScript 支持，清晰的 API 设计
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>购物车功能</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>收藏功能</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span>评分展示</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span>变体选择</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span>快速预览</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
