'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckIcon,
    XMarkIcon,
    CurrencyDollarIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    SparklesIcon
} from '@heroicons/react/24/outline'

// 继承基础定价计划接口
import { PricingPlan } from './Pricing1'

// 扩展定价计划，支持多种计费周期
export interface PricingPlanWithPeriods extends Omit<PricingPlan, 'price'> {
    pricing: {
        monthly: number
        yearly: number
        quarterly?: number
        lifetime?: number
        currency?: string
    }
    limits?: {
        users?: number | 'unlimited'
        storage?: string
        projects?: number | 'unlimited'
        bandwidth?: string
    }
    addOns?: Array<{
        name: string
        description: string
        price: {
            monthly: number
            yearly: number
        }
    }>
}

export interface Pricing3Props {
    // 区块标题
    title?: {
        main: string
        subtitle?: string
        description?: string
    }

    // 定价计划
    plans: PricingPlanWithPeriods[]

    // 计费周期配置
    billing?: {
        periods: Array<{
            key: 'monthly' | 'yearly' | 'quarterly' | 'lifetime'
            label: string
            suffix: string
            discount?: number
            popular?: boolean
        }>
        defaultPeriod: 'monthly' | 'yearly' | 'quarterly' | 'lifetime'
    }

    // 布局配置
    layout?: {
        style?: 'toggle' | 'tabs' | 'slider'
        showComparison?: boolean
        maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
        backgroundColor?: string
    }

    // 显示配置
    display?: {
        showLimits?: boolean
        showAddOns?: boolean
        showSavings?: boolean
        showFeatureComparison?: boolean
        currencySymbol?: string
        compactView?: boolean
    }

    // 动画配置
    animation?: {
        enabled?: boolean
        switchTransition?: 'slide' | 'fade' | 'scale'
        duration?: number
    }

    // 回调函数
    onPlanSelect?: (plan: PricingPlanWithPeriods, period: string) => void
    onAddOnToggle?: (planId: string, addOnName: string, enabled: boolean) => void
    onPeriodChange?: (period: string) => void
}

/**
 * Pricing3 - 切换式定价
 * 
 * 特点：
 * - 灵活的计费周期切换
 * - 动态价格计算
 * - 附加服务选择
 * - 使用限制展示
 * - 功能对比表格
 */
export function Pricing3({
    title,
    plans,
    billing = {},
    layout = {},
    display = {},
    animation = {},
    onPlanSelect,
    onAddOnToggle,
    onPeriodChange
}: Pricing3Props) {
    const {
        periods = [
            { key: 'monthly', label: '月付', suffix: '/月' },
            { key: 'yearly', label: '年付', suffix: '/年', discount: 20, popular: true },
            { key: 'lifetime', label: '终身', suffix: '一次性' }
        ],
        defaultPeriod = 'monthly'
    } = billing

    const {
        style = 'toggle',
        showComparison = true,
        maxWidth = 'lg',
        backgroundColor = 'bg-gray-50'
    } = layout

    const {
        showLimits = true,
        showAddOns = false,
        showSavings = true,
        showFeatureComparison = false,
        currencySymbol = '¥',
        compactView = false
    } = display

    const {
        enabled: animationEnabled = true,
        switchTransition = 'slide',
        duration = 0.3
    } = animation

    // 状态管理
    const [selectedPeriod, setSelectedPeriod] = useState<string>(defaultPeriod)
    const [selectedAddOns, setSelectedAddOns] = useState<Record<string, string[]>>({})

    // 处理计费周期切换
    const handlePeriodChange = (period: string) => {
        setSelectedPeriod(period)
        onPeriodChange?.(period)
    }

    // 处理附加服务切换
    const handleAddOnToggle = (planId: string, addOnName: string) => {
        const currentAddOns = selectedAddOns[planId] || []
        const isEnabled = currentAddOns.includes(addOnName)

        const newAddOns = isEnabled
            ? currentAddOns.filter(name => name !== addOnName)
            : [...currentAddOns, addOnName]

        setSelectedAddOns(prev => ({
            ...prev,
            [planId]: newAddOns
        }))

        onAddOnToggle?.(planId, addOnName, !isEnabled)
    }

    // 获取最大宽度类名
    const getMaxWidth = () => {
        const widthClasses = {
            sm: 'max-w-4xl',
            md: 'max-w-5xl',
            lg: 'max-w-6xl',
            xl: 'max-w-7xl',
            full: 'max-w-full'
        }
        return widthClasses[maxWidth]
    }

    // 格式化价格
    const formatPrice = (price: number) => {
        if (price === 0) return '免费'
        return `${currencySymbol}${price.toLocaleString()}`
    }

    // 计算当前价格
    const getCurrentPrice = (plan: PricingPlanWithPeriods) => {
        const basePrice = plan.pricing[selectedPeriod as keyof typeof plan.pricing] || 0

        // 计算附加服务价格
        const addOnPrice = (selectedAddOns[plan.id] || []).reduce((total, addOnName) => {
            const addOn = plan.addOns?.find(a => a.name === addOnName)
            if (addOn) {
                return total + (addOn.price[selectedPeriod as keyof typeof addOn.price] || 0)
            }
            return total
        }, 0)

        return basePrice + addOnPrice
    }

    // 计算节省金额
    const getSavings = (plan: PricingPlanWithPeriods) => {
        if (selectedPeriod === 'yearly' && plan.pricing.monthly) {
            const monthlyTotal = plan.pricing.monthly * 12
            const yearlyPrice = plan.pricing.yearly
            return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100)
        }
        return 0
    }

    // 获取计费周期选择器
    const renderPeriodSelector = () => {
        if (style === 'toggle' && periods.length === 2) {
            return (
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                        <div className="grid grid-cols-2 gap-1">
                            {periods.map((period) => (
                                <button
                                    key={period.key}
                                    onClick={() => handlePeriodChange(period.key)}
                                    className={`px-8 py-3 text-sm font-medium rounded-lg transition-all duration-200 relative ${selectedPeriod === period.key
                                        ? 'bg-primary-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {period.label}
                                    {period.discount && (
                                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            省{period.discount}%
                                        </span>
                                    )}
                                    {period.popular && selectedPeriod !== period.key && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            推荐
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }

        if (style === 'tabs') {
            return (
                <div className="flex justify-center mb-12">
                    <div className="flex space-x-2 bg-white p-2 rounded-xl border border-gray-200">
                        {periods.map((period) => (
                            <button
                                key={period.key}
                                onClick={() => handlePeriodChange(period.key)}
                                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${selectedPeriod === period.key
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {period.label}
                            </button>
                        ))}
                    </div>
                </div>
            )
        }

        // Default slider style
        return (
            <div className="flex justify-center mb-12 overflow-x-auto">
                <div className="flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 min-w-max">
                    {periods.map((period) => (
                        <button
                            key={period.key}
                            onClick={() => handlePeriodChange(period.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${selectedPeriod === period.key
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {period.label}
                            {period.discount && (
                                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    -{period.discount}%
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    // 动画变体
    const priceVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    }

    const currentPeriod = periods.find(p => p.key === selectedPeriod)

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`${getMaxWidth()} mx-auto`}>

                    {/* 标题区域 */}
                    {title && (
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                {title.main}
                            </h2>
                            {title.subtitle && (
                                <p className="mt-4 text-xl text-gray-600">
                                    {title.subtitle}
                                </p>
                            )}
                            {title.description && (
                                <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                                    {title.description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* 计费周期选择器 */}
                    {renderPeriodSelector()}

                    {/* 定价表格 */}
                    <div className={`grid ${compactView
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        } gap-8`}>
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                className={`relative bg-white rounded-2xl border transition-all duration-300 ${plan.highlighted
                                    ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-20 shadow-xl scale-105'
                                    : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                                    }`}
                                whileHover={{ y: -4 }}
                            >

                                {/* 推荐标签 */}
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                                            <SparklesIcon className="w-4 h-4 mr-1" />
                                            推荐方案
                                        </span>
                                    </div>
                                )}

                                <div className="p-8">

                                    {/* 计划标题 */}
                                    <div className="text-center mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* 动态价格 */}
                                    <div className="text-center mb-8">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={selectedPeriod}
                                                variants={priceVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration }}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-baseline justify-center">
                                                    <span className="text-4xl font-bold text-gray-900">
                                                        {formatPrice(getCurrentPrice(plan))}
                                                    </span>
                                                    <span className="text-gray-600 ml-2">
                                                        {currentPeriod?.suffix}
                                                    </span>
                                                </div>

                                                {showSavings && getSavings(plan) > 0 && (
                                                    <div className="text-sm text-green-600 font-medium">
                                                        相比月付节省 {getSavings(plan)}%
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* 使用限制 */}
                                    {showLimits && plan.limits && (
                                        <div className="mb-8 space-y-3">
                                            {plan.limits.users && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="flex items-center text-gray-600">
                                                        <UserGroupIcon className="w-4 h-4 mr-2" />
                                                        用户数量
                                                    </span>
                                                    <span className="font-medium">
                                                        {plan.limits.users === 'unlimited' ? '无限制' : plan.limits.users}
                                                    </span>
                                                </div>
                                            )}
                                            {plan.limits.storage && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="flex items-center text-gray-600">
                                                        <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                                                        存储空间
                                                    </span>
                                                    <span className="font-medium">{plan.limits.storage}</span>
                                                </div>
                                            )}
                                            {plan.limits.projects && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">项目数量</span>
                                                    <span className="font-medium">
                                                        {plan.limits.projects === 'unlimited' ? '无限制' : plan.limits.projects}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* 购买按钮 */}
                                    <div className="mb-8">
                                        <button
                                            onClick={() => onPlanSelect?.(plan, selectedPeriod)}
                                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${plan.highlighted
                                                ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                                }`}
                                        >
                                            {plan.buttonText || '选择方案'}
                                        </button>
                                    </div>

                                    {/* 功能列表 */}
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                            核心功能
                                        </h4>

                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    {feature.included ? (
                                                        <CheckIcon className="w-4 h-4 text-green-500" />
                                                    ) : (
                                                        <XMarkIcon className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </div>
                                                <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'
                                                    }`}>
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 附加服务 */}
                                    {showAddOns && plan.addOns && plan.addOns.length > 0 && (
                                        <div className="mt-8 pt-8 border-t border-gray-200">
                                            <h4 className="font-semibold text-gray-900 text-sm mb-4">
                                                附加服务
                                            </h4>

                                            {plan.addOns.map((addOn, addOnIndex) => (
                                                <div key={addOnIndex} className="flex items-center justify-between py-3">
                                                    <div className="flex-1">
                                                        <label className="flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={(selectedAddOns[plan.id] || []).includes(addOn.name)}
                                                                onChange={() => handleAddOnToggle(plan.id, addOn.name)}
                                                                className="sr-only"
                                                            />
                                                            <div className={`w-4 h-4 border rounded mr-3 transition-colors ${(selectedAddOns[plan.id] || []).includes(addOn.name)
                                                                ? 'bg-primary-600 border-primary-600'
                                                                : 'border-gray-300'
                                                                }`}>
                                                                {(selectedAddOns[plan.id] || []).includes(addOn.name) && (
                                                                    <CheckIcon className="w-4 h-4 text-white" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {addOn.name}
                                                                </div>
                                                                <div className="text-xs text-gray-600">
                                                                    {addOn.description}
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        +{formatPrice(addOn.price[selectedPeriod as keyof typeof addOn.price] || 0)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* 功能对比表 */}
                    {showFeatureComparison && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                详细功能对比
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                                                功能
                                            </th>
                                            {plans.map((plan) => (
                                                <th key={plan.id} className="py-4 px-6 text-center text-sm font-semibold text-gray-900">
                                                    {plan.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* 这里可以添加详细的功能对比表格 */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 底部说明 */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 text-sm mb-4">
                            所有方案均支持随时升级或降级 • 无隐藏费用 • 专业技术支持
                        </p>
                        <div className="flex justify-center space-x-8 text-xs text-gray-500">
                            <span>✓ SSL 安全认证</span>
                            <span>✓ 99.9% 在线保证</span>
                            <span>✓ 全球 CDN 加速</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
