'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// 导入 Hero 组件
import { Hero1, Hero2, Hero3, Hero4 } from '@/components/blocks/hero'
import {
    hero1Example,
    hero2Example,
    hero3Example,
    hero4Example
} from '@/components/blocks/hero/examples'
import { HERO_DESCRIPTIONS } from '@/components/blocks/hero'

// Hero 组件映射
const HERO_COMPONENTS = {
    hero1: Hero1,
    hero2: Hero2,
    hero3: Hero3,
    hero4: Hero4
} as const

const HERO_EXAMPLES = {
    hero1: hero1Example,
    hero2: hero2Example,
    hero3: hero3Example,
    hero4: hero4Example
} as const

type HeroVariant = keyof typeof HERO_COMPONENTS

export default function HeroDemoPage() {
    const [currentHero, setCurrentHero] = useState<HeroVariant>('hero1')
    const [direction, setDirection] = useState(0)

    const heroVariants = Object.keys(HERO_COMPONENTS) as HeroVariant[]
    const currentIndex = heroVariants.indexOf(currentHero)

    const navigateHero = (newVariant: HeroVariant) => {
        const newIndex = heroVariants.indexOf(newVariant)
        setDirection(newIndex > currentIndex ? 1 : -1)
        setCurrentHero(newVariant)
    }

    const nextHero = () => {
        const nextIndex = (currentIndex + 1) % heroVariants.length
        navigateHero(heroVariants[nextIndex])
    }

    const prevHero = () => {
        const prevIndex = (currentIndex - 1 + heroVariants.length) % heroVariants.length
        navigateHero(heroVariants[prevIndex])
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

    const CurrentHeroComponent = HERO_COMPONENTS[currentHero]
    const currentProps = HERO_EXAMPLES[currentHero]
    const currentDescription = HERO_DESCRIPTIONS[currentHero]

    return (
        <div className="min-h-screen bg-gray-50">

            {/* 顶部控制栏 */}
            <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* 标题 */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                英雄区组件演示
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                体验不同的英雄区布局风格
                            </p>
                        </div>

                        {/* 导航控制 */}
                        <div className="flex items-center space-x-4">
                            {/* 组件选择器 */}
                            <div className="flex space-x-2">
                                {heroVariants.map((variant) => (
                                    <button
                                        key={variant}
                                        onClick={() => navigateHero(variant)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentHero === variant
                                                ? 'bg-primary-600 text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {HERO_DESCRIPTIONS[variant].name}
                                    </button>
                                ))}
                            </div>

                            {/* 前后切换按钮 */}
                            <div className="flex space-x-1">
                                <button
                                    onClick={prevHero}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                                    aria-label="上一个"
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextHero}
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

            {/* Hero 组件展示区域 */}
            <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentHero}
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
                        {/* 渲染当前 Hero 组件 */}
                        <CurrentHeroComponent {...(currentProps as any)} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 组件代码预览 (可选) */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        组件使用示例
                    </h3>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                            {`import { ${CurrentHeroComponent.name} } from '@/components/blocks/hero'

export default function MyPage() {
  return (
    <${CurrentHeroComponent.name}
      // ... props 配置
    />
  )
}`}
                        </pre>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <p>
                            💡 <strong>提示:</strong> 所有 Hero 组件都是完全响应式的，
                            支持自定义主题色彩，可以通过 props 配置实现不同的视觉效果。
                        </p>
                    </div>
                </div>
            </div>

            {/* 底部信息 */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <h4 className="text-lg font-semibold mb-2">
                        🎨 现代化英雄区组件库
                    </h4>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        基于 React + TypeScript + Tailwind CSS 构建的高质量、可复用的英雄区组件，
                        遵循原子化设计理念，支持完全的样式自定义和主题切换。
                    </p>

                    <div className="mt-6 flex justify-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>完全响应式</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>TypeScript 支持</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span>主题可定制</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>动画效果</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
