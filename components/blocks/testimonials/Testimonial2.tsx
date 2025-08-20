'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

// 继承基础评价接口
import { Testimonial } from './Testimonial1'

// 扩展评价接口，支持视频
export interface TestimonialWithVideo extends Testimonial {
  videoUrl?: string
  videoThumbnail?: string
  location?: string
  socialProof?: {
    platform: string
    followers?: string
    verified?: boolean
  }
}

export interface Testimonial2Props {
  // 区块标题
  title?: {
    main: string
    subtitle?: string
  }

  // 评价列表
  testimonials: TestimonialWithVideo[]

  // 轮播配置
  carousel?: {
    autoplay?: {
      enabled: boolean
      delay: number
      pauseOnHover: boolean
    }
    loop?: boolean
    navigation?: {
      arrows: boolean
      dots: boolean
      thumbnails: boolean
    }
    transition?: {
      type: 'slide' | 'fade' | 'scale'
      duration: number
    }
  }

  // 布局配置
  layout?: {
    backgroundType?: 'gradient' | 'image' | 'video' | 'solid'
    backgroundImage?: string
    backgroundVideo?: string
    backgroundColor?: string
    overlay?: 'light' | 'dark' | 'none'
    minHeight?: 'auto' | 'screen' | 'large'
    textAlign?: 'left' | 'center'
  }

  // 显示配置
  display?: {
    showQuote?: boolean
    showRating?: boolean
    showLocation?: boolean
    showSocialProof?: boolean
    showVideoPlay?: boolean
    avatarSize?: 'small' | 'medium' | 'large'
    contentMaxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  }

  // 回调函数
  onVideoPlay?: (testimonial: TestimonialWithVideo) => void
}

/**
 * Testimonial2 - 全屏证言 + 头像
 * 
 * 特点：
 * - 沉浸式全屏展示
 * - 强烈的视觉冲击力
 * - 支持视频证言
 * - 社交媒体证明
 * - 高信任感展示
 */
export function Testimonial2({
  title,
  testimonials,
  carousel = {},
  layout = {},
  display = {},
  onVideoPlay
}: Testimonial2Props) {
  const {
    autoplay = { enabled: true, delay: 7000, pauseOnHover: true },
    loop = true,
    navigation = { arrows: true, dots: true, thumbnails: false },
    transition = { type: 'fade', duration: 0.8 }
  } = carousel

  const {
    backgroundType = 'gradient',
    backgroundImage,
    backgroundVideo,
    backgroundColor = 'bg-gray-900',
    overlay = 'dark',
    minHeight = 'screen',
    textAlign = 'center'
  } = layout

  const {
    showQuote = true,
    showRating = true,
    showLocation = true,
    showSocialProof = true,
    showVideoPlay = true,
    avatarSize = 'large',
    contentMaxWidth = 'lg'
  } = display

  // 轮播状态
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [direction, setDirection] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout>()

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

  // 下一张
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex(prev =>
      loop ? (prev + 1) % testimonials.length : Math.min(prev + 1, testimonials.length - 1)
    )
  }

  // 上一张
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex(prev =>
      loop ? (prev - 1 + testimonials.length) % testimonials.length : Math.max(prev - 1, 0)
    )
  }

  // 跳转到指定索引
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // 获取容器高度类名
  const getMinHeight = () => {
    const heightClasses = {
      auto: 'min-h-96',
      screen: 'min-h-screen',
      large: 'min-h-[80vh]'
    }
    return heightClasses[minHeight]
  }

  // 获取头像尺寸
  const getAvatarSize = () => {
    const sizeMap = {
      small: { width: 64, height: 64, className: 'w-16 h-16' },
      medium: { width: 80, height: 80, className: 'w-20 h-20' },
      large: { width: 120, height: 120, className: 'w-30 h-30' }
    }
    return sizeMap[avatarSize]
  }

  // 获取内容最大宽度
  const getContentMaxWidth = () => {
    const widthClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-3xl',
      lg: 'max-w-4xl',
      xl: 'max-w-5xl'
    }
    return widthClasses[contentMaxWidth]
  }

  // 获取文本对齐类名
  const getTextAlign = () => {
    return textAlign === 'center' ? 'text-center' : 'text-left'
  }

  // 动画变体
  const slideVariants = {
    enter: (direction: number) => {
      if (transition.type === 'fade') {
        return { opacity: 0, scale: 0.95 }
      } else if (transition.type === 'scale') {
        return { opacity: 0, scale: 0.8 }
      } else {
        return { x: direction > 0 ? 1000 : -1000, opacity: 0 }
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => {
      if (transition.type === 'fade') {
        return { opacity: 0, scale: 1.05 }
      } else if (transition.type === 'scale') {
        return { opacity: 0, scale: 1.2 }
      } else {
        return { x: direction < 0 ? 1000 : -1000, opacity: 0 }
      }
    }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className={`relative ${getMinHeight()} flex items-center justify-center overflow-hidden`}>

      {/* 背景层 */}
      <div className="absolute inset-0 -z-20">
        {backgroundType === 'image' && backgroundImage && (
          <Image
            src={backgroundImage}
            alt="背景图片"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {backgroundType === 'video' && backgroundVideo && (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}
        {backgroundType === 'gradient' && (
          <div className="w-full h-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
        )}
        {backgroundType === 'solid' && (
          <div className={`w-full h-full ${backgroundColor}`} />
        )}
      </div>

      {/* 遮罩层 */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 -z-10 ${overlay === 'dark' ? 'bg-black/50' : 'bg-white/30'
          }`} />
      )}

      {/* 主要内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 标题 */}
        {title && (
          <div className={`mb-12 ${getTextAlign()}`}>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4">
              {title.main}
            </h2>
            {title.subtitle && (
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                {title.subtitle}
              </p>
            )}
          </div>
        )}

        {/* 证言内容 */}
        <div
          className={`${getContentMaxWidth()} mx-auto ${getTextAlign()}`}
          onMouseEnter={autoplay.pauseOnHover ? () => setIsAutoplayPaused(true) : undefined}
          onMouseLeave={autoplay.pauseOnHover ? () => setIsAutoplayPaused(false) : undefined}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: transition.duration, ease: "easeInOut" }}
              className="space-y-8"
            >

              {/* 引号 */}
              {showQuote && (
                <div className={getTextAlign()}>
                  <ChatBubbleLeftIcon className="w-12 h-12 text-white/60 mx-auto" />
                </div>
              )}

              {/* 评价内容 */}
              <blockquote className="text-2xl font-medium text-white leading-relaxed sm:text-3xl lg:text-4xl">
                "{currentTestimonial.content}"
              </blockquote>

              {/* 评分 */}
              {showRating && (
                <div className={`flex items-center space-x-1 ${textAlign === 'center' ? 'justify-center' : ''}`}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-6 h-6 ${i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                        }`}
                    />
                  ))}
                </div>
              )}

              {/* 客户信息 */}
              <div className={`flex items-center space-x-6 ${textAlign === 'center' ? 'justify-center' : ''
                }`}>

                {/* 头像 */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    width={getAvatarSize().width}
                    height={getAvatarSize().height}
                    className={`${getAvatarSize().className} rounded-full object-cover border-4 border-white/20`}
                  />

                  {/* 视频播放按钮 */}
                  {showVideoPlay && currentTestimonial.videoUrl && (
                    <button
                      onClick={() => onVideoPlay?.(currentTestimonial)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                      aria-label="播放视频证言"
                    >
                      <PlayIcon className="w-8 h-8 text-white" />
                    </button>
                  )}
                </div>

                {/* 客户详细信息 */}
                <div className={textAlign === 'center' ? 'text-center' : 'text-left'}>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-xl font-bold text-white">
                      {currentTestimonial.name}
                    </h3>
                    {currentTestimonial.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-200 mb-1">
                    {currentTestimonial.role}
                    {currentTestimonial.company && (
                      <span> • {currentTestimonial.company}</span>
                    )}
                  </p>

                  {showLocation && currentTestimonial.location && (
                    <p className="text-sm text-gray-300">
                      📍 {currentTestimonial.location}
                    </p>
                  )}

                  {/* 社交媒体证明 */}
                  {showSocialProof && currentTestimonial.socialProof && (
                    <div className="mt-2 flex items-center space-x-2 text-sm text-gray-300">
                      <span>{currentTestimonial.socialProof.platform}</span>
                      {currentTestimonial.socialProof.followers && (
                        <span>• {currentTestimonial.socialProof.followers} 关注者</span>
                      )}
                      {currentTestimonial.socialProof.verified && (
                        <span>• ✓ 已验证</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 导航控制 */}
        <div className="mt-12 flex items-center justify-center space-x-6">

          {/* 导航箭头 */}
          {navigation.arrows && (
            <div className="flex space-x-4">
              <button
                onClick={prevSlide}
                disabled={!loop && currentIndex === 0}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="上一个证言"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                disabled={!loop && currentIndex === testimonials.length - 1}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="下一个证言"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {/* 指示点 */}
          {navigation.dots && (
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`跳转到第 ${index + 1} 个证言`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 缩略图导航 */}
        {navigation.thumbnails && (
          <div className="mt-8 flex justify-center space-x-4 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-3 transition-all duration-200 ${index === currentIndex
                    ? 'border-white scale-110'
                    : 'border-white/40 hover:border-white/70'
                  }`}
              >
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 装饰性元素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 浮动粒子 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  )
}
