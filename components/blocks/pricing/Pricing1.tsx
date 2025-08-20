'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

// 定价计划接口
export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    currency?: string
  }
  features: Array<{
    name: string
    included: boolean
    description?: string
  }>
  highlighted?: boolean
  popular?: boolean
  badge?: string
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline'
  customFeatures?: string[]
}

export interface Pricing1Props {
  // 区块标题
  title?: {
    main: string
    subtitle?: string
    alignment?: 'left' | 'center'
  }
  
  // 定价计划
  plans: PricingPlan[]
  
  // 计费周期配置
  billing?: {
    showToggle: boolean
    defaultPeriod: 'monthly' | 'yearly'
    yearlyDiscount?: number
    monthlyLabel?: string
    yearlyLabel?: string
  }
  
  // 布局配置
  layout?: {
    maxColumns?: 2 | 3 | 4
    spacing?: 'tight' | 'normal' | 'relaxed'
    backgroundColor?: string
    centerHighlighted?: boolean
  }
  
  // 显示配置
  display?: {
    showPopularBadge?: boolean
    showFeatureDescriptions?: boolean
    showCustomFeatures?: boolean
    comparisonMode?: boolean
    currencySymbol?: string
  }
  
  // 动画配置
  animation?: {
    enabled?: boolean
    stagger?: boolean
    type?: 'fadeIn' | 'slideUp' | 'scale'
  }
  
  // 回调函数
  onPlanSelect?: (plan: PricingPlan, period: 'monthly' | 'yearly') => void
  onFeatureClick?: (feature: string) => void
}

/**
 * Pricing1 - 经典3列对比表
 * 
 * 特点：
 * - SaaS 标准的定价表布局
 * - 月付/年付切换
 * - 特色计划高亮
 * - 功能对比表格
 * - 清晰的价格层级
 */
export function Pricing1({
  title,
  plans,
  billing = {},
  layout = {},
  display = {},
  animation = {},
  onPlanSelect,
  onFeatureClick
}: Pricing1Props) {
  const {
    showToggle = true,
    defaultPeriod = 'monthly',
    yearlyDiscount = 20,
    monthlyLabel = '月付',
    yearlyLabel = '年付'
  } = billing

  const {
    maxColumns = 3,
    spacing = 'normal',
    backgroundColor = 'bg-gray-50',
    centerHighlighted = true
  } = layout

  const {
    showPopularBadge = true,
    showFeatureDescriptions = false,
    showCustomFeatures = true,
    comparisonMode = false,
    currencySymbol = '¥'
  } = display

  const {
    enabled: animationEnabled = true,
    stagger = true,
    type: animationType = 'slideUp'
  } = animation

  // 状态管理
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(defaultPeriod)

  // 获取间距类名
  const getSpacing = () => {
    const spacingMap = {
      tight: 'gap-4',
      normal: 'gap-6',
      relaxed: 'gap-8'
    }
    return spacingMap[spacing]
  }

  // 获取网格列数
  const getGridCols = () => {
    const actualColumns = Math.min(plans.length, maxColumns)
    return `grid-cols-1 md:grid-cols-${Math.min(actualColumns, 2)} lg:grid-cols-${actualColumns}`
  }

  // 格式化价格
  const formatPrice = (price: number) => {
    if (price === 0) return '免费'
    return `${currencySymbol}${price.toLocaleString()}`
  }

  // 获取年付折扣价格
  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * (1 - yearlyDiscount / 100))
  }

  // 计算折扣百分比
  const getSavingsText = () => {
    return `节省 ${yearlyDiscount}%`
  }

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.1 : 0
      }
    }
  }

  const itemVariants = {
    hidden: () => {
      if (animationType === 'slideUp') {
        return { opacity: 0, y: 30 }
      } else if (animationType === 'scale') {
        return { opacity: 0, scale: 0.8 }
      } else {
        return { opacity: 0 }
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // 排序计划（高亮的放中间）
  const sortedPlans = centerHighlighted 
    ? [...plans].sort((a, b) => {
        if (a.highlighted && !b.highlighted) return plans.length === 3 ? 0 : -1
        if (!a.highlighted && b.highlighted) return plans.length === 3 ? 0 : 1
        return 0
      })
    : plans

  return (
    <section className={`py-16 ${backgroundColor}`}>
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

        {/* 计费周期切换 */}
        {showToggle && (
          <div className="flex justify-center mb-12">
            <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    billingPeriod === 'monthly'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {monthlyLabel}
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 relative ${
                    billingPeriod === 'yearly'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {yearlyLabel}
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {getSavingsText()}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 定价表格 */}
        <motion.div
          className={`grid ${getGridCols()} ${getSpacing()} max-w-7xl mx-auto`}
          variants={animationEnabled ? containerVariants : {}}
          initial={animationEnabled ? "hidden" : "visible"}
          whileInView={animationEnabled ? "visible" : {}}
          viewport={{ once: true, margin: "-100px" }}
        >
          {sortedPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg ${
                plan.highlighted 
                  ? 'border-primary-600 ring-2 ring-primary-600 ring-opacity-20 transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              variants={animationEnabled ? itemVariants : {}}
              whileHover={{ y: -4 }}
            >
              
              {/* 热门标签 */}
              {showPopularBadge && (plan.popular || plan.badge) && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {plan.badge || '最受欢迎'}
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
                
                {/* 价格 */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(
                        billingPeriod === 'monthly' 
                          ? plan.price.monthly 
                          : Math.round(plan.price.monthly * 12 * (1 - yearlyDiscount / 100) / 12)
                      )}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-600 ml-2">
                        /{billingPeriod === 'monthly' ? '月' : '年'}
                      </span>
                    )}
                  </div>
                  
                  {billingPeriod === 'yearly' && plan.price.monthly > 0 && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(plan.price.monthly * 12)}/年
                      </span>
                      <span className="text-sm text-green-600 ml-2 font-medium">
                        {getSavingsText()}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* 购买按钮 */}
                <div className="mb-8">
                  <button
                    onClick={() => onPlanSelect?.(plan, billingPeriod)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      plan.highlighted || plan.buttonVariant === 'primary'
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
                        : plan.buttonVariant === 'outline'
                          ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {plan.buttonText || '立即开始'}
                  </button>
                </div>
                
                {/* 功能列表 */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    包含功能
                  </h4>
                  
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className={`flex items-start space-x-3 ${
                        onFeatureClick ? 'cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded' : ''
                      }`}
                      onClick={() => onFeatureClick?.(feature.name)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {feature.name}
                        </span>
                        {showFeatureDescriptions && feature.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* 自定义功能 */}
                  {showCustomFeatures && plan.customFeatures && plan.customFeatures.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="font-medium text-gray-900 text-sm mb-2">
                        专属功能
                      </h5>
                      {plan.customFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 mb-2">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-primary-600 rounded-full" />
                          </div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 底部说明 */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            所有计划均包含 30 天免费试用期 • 随时取消 • 无需绑定信用卡
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
            <span>✓ 免费技术支持</span>
            <span>✓ 数据安全保障</span>
            <span>✓ 99.9% 可用性保证</span>
          </div>
        </div>

        {/* FAQ 链接 */}
        <div className="mt-8 text-center">
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            查看常见问题 →
          </button>
        </div>
      </div>
    </section>
  )
}
