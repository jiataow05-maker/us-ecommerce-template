'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ChevronRightIcon,
    CheckIcon,
    StarIcon
} from '@heroicons/react/24/outline'

export interface Hero3Props {
    // 左侧内容
    leftContent: {
        // 标签/类别
        badge?: {
            text: string
            color?: 'primary' | 'success' | 'warning'
        }

        // 主标题
        title: {
            main: string
            highlight?: string
        }

        // 描述
        description: string

        // 特点列表
        features?: Array<{
            text: string
            icon?: 'check' | 'star' | 'custom'
            customIcon?: string // emoji
        }>

        // 按钮
        buttons: {
            primary: {
                text: string
                href: string
            }
            secondary?: {
                text: string
                href: string
            }
        }

        // 信任指标（可选）
        trustIndicators?: {
            rating?: {
                value: number
                max: number
                reviewCount: string
            }
            customers?: string
            security?: string
        }
    }

    // 右侧内容
    rightContent: {
        type: 'image' | 'product' | 'dashboard'

        // 图片配置
        image?: {
            src: string
            alt: string
            width?: number
            height?: number
        }

        // 产品展示配置
        product?: {
            image: string
            name: string
            price?: string
            oldPrice?: string
            rating?: number
            badge?: string
        }

        // 仪表板预览配置
        dashboard?: {
            backgroundImage: string
            stats: Array<{
                label: string
                value: string
                trend?: 'up' | 'down'
            }>
        }
    }

    // 布局配置
    layout?: {
        backgroundColor?: string
        spacing?: 'normal' | 'large'
        animation?: boolean
    }
}

/**
 * Hero3 - 分屏设计英雄区
 * 
 * 特点：
 * - 现代分屏布局
 * - 支持多种右侧内容类型
 * - 动画交互效果
 * - 信任指标展示
 * - 适合产品/服务展示
 */
export function Hero3({
    leftContent,
    rightContent,
    layout = {}
}: Hero3Props) {
    const {
        backgroundColor = 'bg-gray-50',
        spacing = 'normal',
        animation = true
    } = layout

    const spacingClass = spacing === 'large' ? 'py-20 lg:py-32' : 'py-16 lg:py-24'

    const getBadgeColor = (color: string = 'primary') => {
        const colors = {
            primary: 'bg-primary-100 text-primary-800',
            success: 'bg-green-100 text-green-800',
            warning: 'bg-yellow-100 text-yellow-800'
        }
        return colors[color as keyof typeof colors] || colors.primary
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    return (
        <section className={`relative ${backgroundColor} overflow-hidden`}>
            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${spacingClass}`}>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* 左侧内容 */}
                    <motion.div
                        className="space-y-8"
                        variants={animation ? containerVariants : {}}
                        initial={animation ? "hidden" : "visible"}
                        animate="visible"
                    >
                        {/* 标签 */}
                        {leftContent.badge && (
                            <motion.div variants={animation ? itemVariants : {}}>
                                <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${getBadgeColor(leftContent.badge.color)}`}>
                                    {leftContent.badge.text}
                                </span>
                            </motion.div>
                        )}

                        {/* 主标题 */}
                        <motion.h1
                            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                            variants={animation ? itemVariants : {}}
                        >
                            {leftContent.title.main}
                            {leftContent.title.highlight && (
                                <>
                                    {' '}
                                    <span className="text-primary-600">
                                        {leftContent.title.highlight}
                                    </span>
                                </>
                            )}
                        </motion.h1>

                        {/* 描述 */}
                        <motion.p
                            className="text-lg leading-8 text-gray-600"
                            variants={animation ? itemVariants : {}}
                        >
                            {leftContent.description}
                        </motion.p>

                        {/* 特点列表 */}
                        {leftContent.features && leftContent.features.length > 0 && (
                            <motion.div
                                className="space-y-3"
                                variants={animation ? itemVariants : {}}
                            >
                                {leftContent.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            {feature.icon === 'check' && (
                                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                    <CheckIcon className="w-4 h-4 text-green-600" />
                                                </div>
                                            )}
                                            {feature.icon === 'star' && (
                                                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                                    <StarIcon className="w-4 h-4 text-yellow-600 fill-current" />
                                                </div>
                                            )}
                                            {feature.icon === 'custom' && feature.customIcon && (
                                                <span className="text-xl">{feature.customIcon}</span>
                                            )}
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* 按钮组 */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            variants={animation ? itemVariants : {}}
                        >
                            <Link
                                href={leftContent.buttons.primary.href}
                                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all duration-200"
                            >
                                {leftContent.buttons.primary.text}
                                <ChevronRightIcon className="ml-2 h-5 w-5" />
                            </Link>

                            {leftContent.buttons.secondary && (
                                <Link
                                    href={leftContent.buttons.secondary.href}
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all duration-200"
                                >
                                    {leftContent.buttons.secondary.text}
                                </Link>
                            )}
                        </motion.div>

                        {/* 信任指标 */}
                        {leftContent.trustIndicators && (
                            <motion.div
                                className="pt-6 border-t border-gray-200"
                                variants={animation ? itemVariants : {}}
                            >
                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                    {/* 评分 */}
                                    {leftContent.trustIndicators.rating && (
                                        <div className="flex items-center space-x-1">
                                            <div className="flex space-x-1">
                                                {[...Array(leftContent.trustIndicators.rating.max)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className={`w-4 h-4 ${i < leftContent.trustIndicators.rating!.value
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-medium">
                                                {leftContent.trustIndicators.rating.value}/{leftContent.trustIndicators.rating.max}
                                            </span>
                                            <span>({leftContent.trustIndicators.rating.reviewCount})</span>
                                        </div>
                                    )}

                                    {/* 客户数量 */}
                                    {leftContent.trustIndicators.customers && (
                                        <div>
                                            <span className="font-medium">
                                                {leftContent.trustIndicators.customers}
                                            </span>
                                            <span> 用户信赖</span>
                                        </div>
                                    )}

                                    {/* 安全认证 */}
                                    {leftContent.trustIndicators.security && (
                                        <div className="flex items-center space-x-1">
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <CheckIcon className="w-3 h-3 text-white" />
                                            </div>
                                            <span>{leftContent.trustIndicators.security}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* 右侧内容 */}
                    <motion.div
                        className="relative"
                        variants={animation ? itemVariants : {}}
                        initial={animation ? "hidden" : "visible"}
                        animate="visible"
                    >
                        {/* 图片展示 */}
                        {rightContent.type === 'image' && rightContent.image && (
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl rotate-3 opacity-60" />
                                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={rightContent.image.src}
                                        alt={rightContent.image.alt}
                                        width={rightContent.image.width || 600}
                                        height={rightContent.image.height || 400}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* 产品展示 */}
                        {rightContent.type === 'product' && rightContent.product && (
                            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                                <div className="aspect-square relative mb-6 bg-gray-50 rounded-xl overflow-hidden">
                                    <Image
                                        src={rightContent.product.image}
                                        alt={rightContent.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {rightContent.product.badge && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            {rightContent.product.badge}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {rightContent.product.name}
                                    </h3>

                                    {rightContent.product.rating && (
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`w-4 h-4 ${i < rightContent.product.rating!
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {rightContent.product.price && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-gray-900">
                                                {rightContent.product.price}
                                            </span>
                                            {rightContent.product.oldPrice && (
                                                <span className="text-lg text-gray-500 line-through">
                                                    {rightContent.product.oldPrice}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 仪表板预览 */}
                        {rightContent.type === 'dashboard' && rightContent.dashboard && (
                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="h-64 relative bg-gradient-to-br from-gray-900 to-gray-700">
                                    <Image
                                        src={rightContent.dashboard.backgroundImage}
                                        alt="Dashboard preview"
                                        fill
                                        className="object-cover opacity-20"
                                    />

                                    {/* 模拟数据卡片 */}
                                    <div className="absolute inset-6 grid grid-cols-2 gap-4">
                                        {rightContent.dashboard.stats.map((stat, index) => (
                                            <div
                                                key={index}
                                                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white"
                                            >
                                                <div className="text-xs text-gray-300 mb-1">
                                                    {stat.label}
                                                </div>
                                                <div className="text-2xl font-bold">
                                                    {stat.value}
                                                </div>
                                                {stat.trend && (
                                                    <div className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                                        }`}>
                                                        {stat.trend === 'up' ? '↗' : '↘'} 趋势
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 浮动元素 */}
                        <div className="absolute -top-4 -right-4 bg-primary-500 text-white rounded-full p-3 shadow-lg hidden lg:block">
                            <div className="w-6 h-6 flex items-center justify-center">
                                ✨
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
