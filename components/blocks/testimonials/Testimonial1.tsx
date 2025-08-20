'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

// 客户评价接口定义
export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  avatar: string
  rating: number
  content: string
  date?: string
  verified?: boolean
}

export interface Testimonial1Props {
  // 区块标题
  title?: {
    main: string
    subtitle?: string
    alignment?: 'left' | 'center'
  }

  // 评价列表
  testimonials: Testimonial[]

  // 轮播配置
  carousel?: {
    itemsPerView?: {
      mobile: number
      tablet: number
      desktop: number
    }
    autoplay?: {
      enabled: boolean
      delay: number
      pauseOnHover: boolean
    }
    loop?: boolean
    spacing?: number
    navigation?: {
      arrows: boolean
      dots: boolean
      position?: 'inside' | 'outside'
    }
  }

  // 卡片配置
  card?: {
    style?: 'minimal' | 'standard' | 'elevated'
    showQuote?: boolean
    showDate?: boolean
    showCompany?: boolean
    showVerified?: boolean
    borderRadius?: 'none' | 'small' | 'medium' | 'large'
  }

  // 布局配置
  layout?: {
    backgroundColor?: string
    padding?: 'normal' | 'large'
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  }

  // 动画配置
  animation?: {
    enabled?: boolean
    type?: 'slide' | 'fade'
    duration?: number
  }
}

/**
 * Testimonial1 - 卡片式轮播客户评价
 * 
 * 特点：
 * - 清晰的卡片布局设计
 * - 流畅的轮播动画
 * - 响应式多列显示
 * - 客户信息完整展示
 * - 评分星级系统
 */
export function Testimonial1({
  title,
  testimonials,
  carousel = {},
  card = {},
  layout = {},
  animation = {}
}: Testimonial1Props) {
  const {
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
    autoplay = { enabled: true, delay: 5000, pauseOnHover: true },
    loop = true,
    spacing = 24,
    navigation = { arrows: true, dots: true, position: 'outside' }
  } = carousel

  const {
    style = 'standard',
    showQuote = true,
    showDate = true,
    showCompany = true,
    showVerified = true,
    borderRadius = 'medium'
  } = card

  const {
    backgroundColor = 'bg-gray-50',
    padding = 'normal',
    maxWidth = 'lg'
  } = layout

  const {
    enabled: animationEnabled = true,
    type: animationType = 'slide',
    duration: animationDuration = 0.5
  } = animation

  // 轮播状态
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView.desktop)
  const autoplayRef = useRef<NodeJS.Timeout>()

  // 响应式项目数量
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
  const maxIndex = Math.max(0, testimonials.length - currentItemsPerView)

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

  // 获取卡片样式
  const getCardClasses = () => {
    const baseClasses = 'bg-white transition-all duration-300'

    const styleClasses = {
      minimal: 'border border-gray-200 hover:border-gray-300',
      standard: 'border border-gray-200 shadow-sm hover:shadow-md',
      elevated: 'shadow-lg hover:shadow-xl border-0'
    }

    const radiusClasses = {
      none: '',
      small: 'rounded-md',
      medium: 'rounded-lg',
      large: 'rounded-xl'
    }

    return `${baseClasses} ${styleClasses[style]} ${radiusClasses[borderRadius]}`
  }

  // 获取容器最大宽度
  const getMaxWidth = () => {
    const widthClasses = {
      sm: 'max-w-4xl',
      md: 'max-w-5xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl'
    }
    return widthClasses[maxWidth]
  }

  // 获取内边距
  const getPadding = () => {
    return padding === 'large' ? 'py-20' : 'py-16'
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long'
    })
  }

  // 动画变体
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: animationType === 'fade' ? 0 : 1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: animationType === 'fade' ? 0 : 1
    })
  }

  return (
    <section className={`${backgroundColor} ${getPadding()}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${getMaxWidth()} mx-auto`}>

          {/* 标题区域 */}
          {title && (
            <div className={`mb-12 ${title.alignment === 'center' ? 'text-center' : 'text-left flex justify-between items-end'}`}>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {title.main}
                </h2>
                {title.subtitle && (
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl">
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
                    className="p-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="上一个评价"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={!loop && currentIndex >= maxIndex}
                    className="p-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="下一个评价"
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
            onMouseEnter={autoplay.pauseOnHover ? () => setIsAutoplayPaused(true) : undefined}
            onMouseLeave={autoplay.pauseOnHover ? () => setIsAutoplayPaused(false) : undefined}
          >
            {/* 评价轮播 */}
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                style={{ gap: `${spacing}px` }}
                animate={{
                  x: `-${currentIndex * (100 / currentItemsPerView)}%`
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: animationDuration
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / currentItemsPerView}% - ${spacing * (currentItemsPerView - 1) / currentItemsPerView}px)` }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`${getCardClasses()} p-6 h-full flex flex-col`}>

                      {/* 引号图标 */}
                      {showQuote && (
                        <div className="mb-4">
                          <ChatBubbleLeftIcon className="w-8 h-8 text-primary-600 opacity-60" />
                        </div>
                      )}

                      {/* 评价内容 */}
                      <blockquote className="flex-1 mb-6">
                        <p className="text-gray-700 leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </blockquote>

                      {/* 评分 */}
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>

                      {/* 客户信息 */}
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">
                              {testimonial.name}
                            </h4>
                            {showVerified && testimonial.verified && (
                              <div className="flex-shrink-0">
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-gray-600">
                            {testimonial.role}
                            {showCompany && testimonial.company && (
                              <span> • {testimonial.company}</span>
                            )}
                          </p>

                          {showDate && testimonial.date && (
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(testimonial.date)}
                            </p>
                          )}
                        </div>
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
                  aria-label="上一个评价"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={!loop && currentIndex >= maxIndex}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-10"
                  aria-label="下一个评价"
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
                  aria-label={`跳转到第 ${index + 1} 页评价`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
