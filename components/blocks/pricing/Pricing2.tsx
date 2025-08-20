'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    CheckIcon,
    StarIcon,
    SparklesIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'

// 继承基础定价计划接口
import { PricingPlan } from './Pricing1'

// 扩展定价计划，支持更多视觉元素
export interface PricingCard extends PricingPlan {
    icon?: string
    gradient?: {
        from: string
        to: string
    }
    testimonial?: {
        text: string
        author: string
        role: string
    }
    metrics?: Array<{
        label: string
        value: string
    }>
}

export interface Pricing2Props {
    // 区块标题
    title?: {
        main: string
        subtitle?: string
        alignment?: 'left' | 'center'
    }

    // 定价卡片
    plans: PricingCard[]

    // 布局配置
    layout?: {
        style?: 'cards' | 'elevated' | 'minimal' | 'modern'
        columns?: {
            mobile: 1 | 2
            tablet: 2 | 3
            desktop: 2 | 3 | 4
        }
        spacing?: 'tight' | 'normal' | 'relaxed'
        backgroundColor?: string
    }

    // 卡片配置
    card?: {
        showIcon?: boolean
        showGradient?: boolean
        showTestimonial?: boolean
        showMetrics?: boolean
        borderRadius?: 'small' | 'medium' | 'large' | 'xl'
        hoverEffect?: 'lift' | 'scale' | 'glow' | 'none'
    }

    // 显示配置
    display?: {
        showBadge?: boolean
        showFeatureIcons?: boolean
        priceFormat?: 'large' | 'compact'
        buttonStyle?: 'solid' | 'outline' | 'ghost'
    }

    // 动画配置
    animation?: {
        enabled?: boolean
        stagger?: boolean
        type?: 'fadeIn' | 'slideUp' | 'flip'
    }

    // 回调函数
    onPlanSelect?: (plan: PricingCard) => void
}

/**
 * Pricing2 - 卡片式定价
 * 
 * 特点：
 * - 现代化卡片设计
 * - 视觉友好的布局
 * - 渐变背景支持
 * - 客户证言集成
 * - 关键指标展示
 */
export function Pricing2({
    title,
    plans,
    layout = {},
    card = {},
    display = {},
    animation = {},
    onPlanSelect
}: Pricing2Props) {
    const {
        style = 'cards',
        columns = { mobile: 1, tablet: 2, desktop: 3 },
        spacing = 'normal',
        backgroundColor = 'bg-white'
    } = layout

    const {
        showIcon = true,
        showGradient = true,
        showTestimonial = true,
        showMetrics = true,
        borderRadius = 'large',
        hoverEffect = 'lift'
    } = card

    const {
        showBadge = true,
        showFeatureIcons = true,
        priceFormat = 'large',
        buttonStyle = 'solid'
    } = display

    const {
        enabled: animationEnabled = true,
        stagger = true,
        type: animationType = 'slideUp'
    } = animation

    // 获取网格列数类名
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

    // 获取卡片样式类名
    const getCardClasses = (plan: PricingCard) => {
        const baseClasses = 'relative overflow-hidden transition-all duration-300'

        const styleClasses = {
            cards: 'bg-white border border-gray-200 shadow-sm hover:shadow-lg',
            elevated: 'bg-white shadow-lg hover:shadow-xl',
            minimal: 'bg-white border border-gray-100',
            modern: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 backdrop-blur-sm'
        }

        const radiusClasses = {
            small: 'rounded-lg',
            medium: 'rounded-xl',
            large: 'rounded-2xl',
            xl: 'rounded-3xl'
        }

        const hoverClasses = {
            lift: 'hover:transform hover:scale-105 hover:-translate-y-2',
            scale: 'hover:scale-105',
            glow: 'hover:shadow-2xl hover:shadow-primary-500/25',
            none: ''
        }

        let classes = `${baseClasses} ${styleClasses[style]} ${radiusClasses[borderRadius]} ${hoverClasses[hoverEffect]}`

        if (plan.highlighted) {
            classes += ' ring-2 ring-primary-500 ring-opacity-50'
        }

        return classes
    }

    // 获取按钮样式
    const getButtonClasses = (plan: PricingCard) => {
        const baseClasses = 'w-full py-3 px-6 rounded-lg font-medium transition-all duration-200'

        if (plan.highlighted || buttonStyle === 'solid') {
            return `${baseClasses} bg-primary-600 hover:bg-primary-700 text-white shadow-sm`
        } else if (buttonStyle === 'outline') {
            return `${baseClasses} border-2 border-primary-600 text-primary-600 hover:bg-primary-50`
        } else {
            return `${baseClasses} bg-gray-100 hover:bg-gray-200 text-gray-900`
        }
    }

    // 格式化价格
    const formatPrice = (price: number, currency = '¥') => {
        if (price === 0) return '免费'
        return `${currency}${price.toLocaleString()}`
    }

    // 动画变体
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger ? 0.15 : 0
            }
        }
    }

    const itemVariants = {
        hidden: () => {
            if (animationType === 'slideUp') {
                return { opacity: 0, y: 30 }
            } else if (animationType === 'flip') {
                return { opacity: 0, rotateY: -90 }
            } else {
                return { opacity: 0 }
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* 标题区域 */}
                {title && (
                    <div className={`mb-16 ${title.alignment === 'center' ? 'text-center' : 'text-left'}`}>
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            {title.main}
                        </h2>
                        {title.subtitle && (
                            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                                {title.subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* 定价卡片 */}
                <motion.div
                    className={`grid ${getGridColumns()} ${getSpacing()} max-w-7xl mx-auto`}
                    variants={animationEnabled ? containerVariants : {}}
                    initial={animationEnabled ? "hidden" : "visible"}
                    whileInView={animationEnabled ? "visible" : {}}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            className={getCardClasses(plan)}
                            variants={animationEnabled ? itemVariants : {}}
                            style={{
                                transformOrigin: 'center',
                                ...(plan.highlighted ? { zIndex: 10 } : {})
                            }}
                        >

                            {/* 渐变背景 */}
                            {showGradient && plan.gradient && (
                                <div
                                    className="absolute inset-0 opacity-5"
                                    style={{
                                        background: `linear-gradient(135deg, ${plan.gradient.from}, ${plan.gradient.to})`
                                    }}
                                />
                            )}

                            {/* 热门标签 */}
                            {showBadge && (plan.popular || plan.badge) && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                    <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                                        <SparklesIcon className="w-4 h-4 inline-block mr-2" />
                                        {plan.badge || '最受欢迎'}
                                    </span>
                                </div>
                            )}

                            <div className="relative p-8">

                                {/* 图标和标题 */}
                                <div className="text-center mb-8">
                                    {showIcon && plan.icon && (
                                        <div className="mb-4">
                                            <span className="text-4xl">{plan.icon}</span>
                                        </div>
                                    )}

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* 价格 */}
                                <div className="text-center mb-8">
                                    <div className="flex items-baseline justify-center">
                                        <span className={`font-bold text-gray-900 ${priceFormat === 'large' ? 'text-5xl' : 'text-3xl'
                                            }`}>
                                            {formatPrice(plan.price.monthly)}
                                        </span>
                                        {plan.price.monthly > 0 && (
                                            <span className="text-gray-600 ml-2 text-lg">
                                                /月
                                            </span>
                                        )}
                                    </div>

                                    {plan.price.yearly && plan.price.yearly < plan.price.monthly * 12 && (
                                        <div className="mt-2 text-sm text-gray-500">
                                            年付 {formatPrice(plan.price.yearly)}
                                            <span className="text-green-600 ml-2">节省 20%</span>
                                        </div>
                                    )}
                                </div>

                                {/* 关键指标 */}
                                {showMetrics && plan.metrics && plan.metrics.length > 0 && (
                                    <div className="mb-8 grid grid-cols-2 gap-4">
                                        {plan.metrics.map((metric, index) => (
                                            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {metric.value}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {metric.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 购买按钮 */}
                                <div className="mb-8">
                                    <button
                                        onClick={() => onPlanSelect?.(plan)}
                                        className={getButtonClasses(plan)}
                                    >
                                        <span className="flex items-center justify-center">
                                            {plan.buttonText || '开始使用'}
                                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                                        </span>
                                    </button>
                                </div>

                                {/* 功能列表 */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 text-center mb-4">
                                        包含功能
                                    </h4>

                                    {plan.features.slice(0, 6).map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                {showFeatureIcons ? (
                                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                        <CheckIcon className="w-3 h-3 text-green-600" />
                                                    </div>
                                                ) : (
                                                    <CheckIcon className="w-5 h-5 text-green-500" />
                                                )}
                                            </div>
                                            <span className="text-gray-700 text-sm">
                                                {feature.name}
                                            </span>
                                        </div>
                                    ))}

                                    {plan.features.length > 6 && (
                                        <div className="text-center pt-2">
                                            <span className="text-sm text-gray-500">
                                                + {plan.features.length - 6} 更多功能
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* 客户证言 */}
                                {showTestimonial && plan.testimonial && (
                                    <div className="mt-8 pt-8 border-t border-gray-200">
                                        <div className="text-center">
                                            <div className="flex justify-center mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className="w-4 h-4 text-yellow-400 fill-current"
                                                    />
                                                ))}
                                            </div>
                                            <blockquote className="text-sm text-gray-700 italic mb-3">
                                                "{plan.testimonial.text}"
                                            </blockquote>
                                            <div className="text-xs text-gray-600">
                                                <div className="font-medium">{plan.testimonial.author}</div>
                                                <div>{plan.testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 装饰性元素 */}
                            {plan.highlighted && (
                                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-primary-500 rounded-full opacity-20 animate-pulse" />
                                    <div className="absolute top-1 right-1 w-4 h-4 bg-primary-600 rounded-full opacity-40 animate-ping" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* 底部保证 */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-8 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            <span>30天退款保证</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            <span>免费迁移服务</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            <span>24/7专业支持</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
