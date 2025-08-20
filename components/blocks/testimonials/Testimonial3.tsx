'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

// 继承基础评价接口
import { Testimonial } from './Testimonial1'

export interface Testimonial3Props {
  // 区块标题
  title?: {
    main: string
    subtitle?: string
    alignment?: 'left' | 'center'
  }

  // 评价列表
  testimonials: Testimonial[]

  // 布局配置
  layout?: {
    columns?: {
      mobile: 1 | 2
      tablet: 2 | 3
      desktop: 3 | 4
    }
    spacing?: 'tight' | 'normal' | 'relaxed'
    backgroundColor?: string
    pattern?: 'masonry' | 'grid' | 'staggered'
  }

  // 卡片配置
  card?: {
    style?: 'minimal' | 'bordered' | 'shadow' | 'filled'
    showQuote?: boolean
    showRating?: boolean
    showDate?: boolean
    showVerified?: boolean
    avatarPosition?: 'top' | 'side'
    borderRadius?: 'none' | 'small' | 'medium' | 'large'
  }

  // 动画配置
  animation?: {
    enabled?: boolean
    type?: 'fadeIn' | 'slideUp' | 'scale'
    stagger?: boolean
    duration?: number
  }

  // 显示配置
  display?: {
    maxItemsShow?: number
    showLoadMore?: boolean
    loadMoreText?: string
  }

  // 回调函数
  onLoadMore?: () => void
  onTestimonialClick?: (testimonial: Testimonial) => void
}

/**
 * Testimonial3 - 多列展示客户评价
 * 
 * 特点：
 * - 瀑布流/网格多列布局
 * - 社会证明展示
 * - 大量客户评价展示
 * - 多种卡片样式
 * - 错落有致的视觉效果
 */
export function Testimonial3({
  title,
  testimonials,
  layout = {},
  card = {},
  animation = {},
  display = {},
  onLoadMore,
  onTestimonialClick
}: Testimonial3Props) {
  const {
    columns = { mobile: 1, tablet: 2, desktop: 3 },
    spacing = 'normal',
    backgroundColor = 'bg-white',
    pattern = 'grid'
  } = layout

  const {
    style = 'shadow',
    showQuote = true,
    showRating = true,
    showDate = true,
    showVerified = true,
    avatarPosition = 'side',
    borderRadius = 'medium'
  } = card

  const {
    enabled: animationEnabled = true,
    type: animationType = 'fadeIn',
    stagger = true,
    duration = 0.5
  } = animation

  const {
    maxItemsShow,
    showLoadMore = false,
    loadMoreText = '加载更多评价'
  } = display

  // 获取显示的评价列表
  const displayedTestimonials = maxItemsShow
    ? testimonials.slice(0, maxItemsShow)
    : testimonials

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
  const getCardClasses = () => {
    const baseClasses = 'transition-all duration-300 overflow-hidden'

    const styleClasses = {
      minimal: 'bg-white',
      bordered: 'bg-white border border-gray-200 hover:border-gray-300',
      shadow: 'bg-white shadow-sm hover:shadow-md',
      filled: 'bg-gray-50 hover:bg-gray-100'
    }

    const radiusClasses = {
      none: '',
      small: 'rounded-md',
      medium: 'rounded-lg',
      large: 'rounded-xl'
    }

    return `${baseClasses} ${styleClasses[style]} ${radiusClasses[borderRadius]}`
  }

  // 获取布局模式类名
  const getLayoutPattern = () => {
    if (pattern === 'masonry') {
      return `columns-${columns.mobile} md:columns-${columns.tablet} lg:columns-${columns.desktop} space-y-${spacing === 'tight' ? '4' : spacing === 'relaxed' ? '8' : '6'}`
    } else if (pattern === 'staggered') {
      return `grid ${getGridColumns()} ${getSpacing()}`
    } else {
      return `grid ${getGridColumns()} ${getSpacing()}`
    }
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short'
    })
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
        return { opacity: 0, y: 20 }
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
        duration: duration,
        ease: "easeOut"
      }
    }
  }

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

        {/* 评价网格/瀑布流 */}
        <motion.div
          className={getLayoutPattern()}
          variants={animationEnabled ? containerVariants : {}}
          initial={animationEnabled ? "hidden" : "visible"}
          whileInView={animationEnabled ? "visible" : {}}
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`${pattern === 'masonry' ? 'break-inside-avoid mb-6' : ''} ${pattern === 'staggered' && index % 2 === 1 ? 'mt-8' : ''
                }`}
              variants={animationEnabled ? itemVariants : {}}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`${getCardClasses()} p-6 h-full flex flex-col cursor-pointer`}
                onClick={() => onTestimonialClick?.(testimonial)}
              >

                {/* 引号 */}
                {showQuote && (
                  <div className="mb-4">
                    <ChatBubbleLeftIcon className="w-6 h-6 text-primary-600 opacity-60" />
                  </div>
                )}

                {/* 评价内容 */}
                <blockquote className="flex-1 mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* 评分 */}
                {showRating && (
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
                )}

                {/* 客户信息 */}
                <div className={`flex ${avatarPosition === 'top'
                    ? 'flex-col items-center text-center space-y-3'
                    : 'items-center space-x-3'
                  }`}>

                  {/* 头像 */}
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={avatarPosition === 'top' ? 56 : 40}
                      height={avatarPosition === 'top' ? 56 : 40}
                      className={`${avatarPosition === 'top' ? 'w-14 h-14' : 'w-10 h-10'
                        } rounded-full object-cover`}
                    />
                  </div>

                  {/* 客户详细信息 */}
                  <div className={`flex-1 min-w-0 ${avatarPosition === 'top' ? 'text-center' : ''
                    }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
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

                    <p className="text-xs text-gray-600">
                      {testimonial.role}
                      {testimonial.company && (
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

        {/* 加载更多按钮 */}
        {showLoadMore && maxItemsShow && testimonials.length > maxItemsShow && (
          <div className="mt-12 text-center">
            <button
              onClick={onLoadMore}
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              {loadMoreText}
            </button>
          </div>
        )}

        {/* 统计信息 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 px-6 py-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {testimonials.length}+
              </div>
              <div className="text-sm text-gray-600">客户评价</div>
            </div>

            <div className="w-px h-8 bg-gray-300" />

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">平均评分</div>
            </div>

            <div className="w-px h-8 bg-gray-300" />

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">满意度</div>
            </div>
          </div>
        </div>

        {/* 底部 CTA */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              加入数千名满意客户的行列
            </h3>
            <p className="text-gray-600 mb-6">
              体验我们的服务，成为下一个满意客户
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200">
              立即开始
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
