'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline'

export interface Hero2Props {
    // 背景配置
    background: {
        type: 'image' | 'gradient'
        image?: {
            src: string
            alt: string
            overlay?: 'light' | 'dark' | 'none' // 遮罩层
        }
        gradient?: {
            from: string // Tailwind 颜色类
            to: string
            direction?: 'to-r' | 'to-br' | 'to-b' // 渐变方向
        }
    }

    // 内容配置
    content: {
        // 小标题（可选）
        subtitle?: string

        // 主标题
        title: {
            main: string
            highlight?: string
        }

        // 描述
        description: string

        // 按钮配置
        buttons: {
            primary: {
                text: string
                href: string
            }
            secondary?: {
                text: string
                href: string
                variant?: 'outline' | 'text'
                icon?: 'play' | 'none'
            }
        }
    }

    // 特色功能列表（可选）
    features?: Array<{
        icon?: string // emoji 或图标名
        text: string
    }>

    // 布局配置
    layout?: {
        textAlign?: 'center' | 'left'
        maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
        minHeight?: 'screen' | 'auto'
    }
}

/**
 * Hero2 - 全屏背景英雄区
 * 
 * 特点：
 * - 全屏视觉冲击
 * - 支持图片/渐变背景
 * - 居中内容布局
 * - 可选特色功能展示
 * - 适合品牌展示页面
 */
export function Hero2({
    background,
    content,
    features,
    layout = {}
}: Hero2Props) {
    const {
        textAlign = 'center',
        maxWidth = 'lg',
        minHeight = 'screen'
    } = layout

    const textAlignClass = textAlign === 'center' ? 'text-center' : 'text-left'
    const maxWidthClass = {
        sm: 'max-w-2xl',
        md: 'max-w-3xl',
        lg: 'max-w-4xl',
        xl: 'max-w-5xl',
        '2xl': 'max-w-6xl'
    }[maxWidth]

    const minHeightClass = minHeight === 'screen' ? 'min-h-screen' : 'min-h-[600px]'

    return (
        <section className={`relative ${minHeightClass} flex items-center justify-center overflow-hidden`}>

            {/* 背景层 */}
            <div className="absolute inset-0 -z-20">
                {background.type === 'image' && background.image ? (
                    <Image
                        src={background.image.src}
                        alt={background.image.alt}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                ) : background.type === 'gradient' && background.gradient ? (
                    <div
                        className="w-full h-full"
                        style={{
                            background: `linear-gradient(${background.gradient.direction === 'to-r' ? 'to right' :
                                    background.gradient.direction === 'to-b' ? 'to bottom' :
                                        'to bottom right'
                                }, ${background.gradient.from}, ${background.gradient.to})`
                        }}
                    />
                ) : null}
            </div>

            {/* 遮罩层 */}
            {background.type === 'image' && background.image?.overlay && background.image.overlay !== 'none' && (
                <div className={`absolute inset-0 -z-10 ${background.image.overlay === 'dark'
                    ? 'bg-black/50'
                    : 'bg-white/30'
                    }`} />
            )}

            {/* 内容区域 */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`${textAlignClass} ${maxWidthClass} mx-auto`}>

                    {/* 小标题 */}
                    {content.subtitle && (
                        <div className="mb-6">
                            <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800">
                                {content.subtitle}
                            </span>
                        </div>
                    )}

                    {/* 主标题 */}
                    <h1 className={`text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8 ${background.type === 'image' && background.image?.overlay === 'dark'
                        ? 'text-white'
                        : 'text-gray-900'
                        }`}>
                        {content.title.main}
                        {content.title.highlight && (
                            <>
                                {' '}
                                <span className="text-primary-400">
                                    {content.title.highlight}
                                </span>
                            </>
                        )}
                    </h1>

                    {/* 描述 */}
                    <p className={`text-xl leading-8 mb-10 ${maxWidthClass} ${textAlign === 'center' ? 'mx-auto' : ''
                        } ${background.type === 'image' && background.image?.overlay === 'dark'
                            ? 'text-gray-200'
                            : 'text-gray-600'
                        }`}>
                        {content.description}
                    </p>

                    {/* 按钮组 */}
                    <div className={`flex flex-col sm:flex-row gap-4 mb-12 ${textAlign === 'center' ? 'justify-center' : 'justify-start'
                        }`}>
                        {/* 主按钮 */}
                        <Link
                            href={content.buttons.primary.href}
                            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            {content.buttons.primary.text}
                            <ChevronRightIcon className="ml-2 h-5 w-5" />
                        </Link>

                        {/* 副按钮 */}
                        {content.buttons.secondary && (
                            <Link
                                href={content.buttons.secondary.href}
                                className={`inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-200 ${content.buttons.secondary.variant === 'outline'
                                    ? background.type === 'image' && background.image?.overlay === 'dark'
                                        ? 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                                        : 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                                    : background.type === 'image' && background.image?.overlay === 'dark'
                                        ? 'text-white hover:text-primary-400'
                                        : 'text-gray-900 hover:text-primary-600'
                                    }`}
                            >
                                {content.buttons.secondary.icon === 'play' && (
                                    <PlayIcon className="mr-2 h-6 w-6" />
                                )}
                                {content.buttons.secondary.text}
                            </Link>
                        )}
                    </div>

                    {/* 特色功能 */}
                    {features && features.length > 0 && (
                        <div className={`flex flex-wrap gap-6 ${textAlign === 'center' ? 'justify-center' : 'justify-start'
                            }`}>
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center space-x-2 ${background.type === 'image' && background.image?.overlay === 'dark'
                                        ? 'text-gray-200'
                                        : 'text-gray-700'
                                        }`}
                                >
                                    {feature.icon && (
                                        <span className="text-lg">
                                            {feature.icon}
                                        </span>
                                    )}
                                    <span className="text-sm font-medium">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 底部滚动提示 */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${background.type === 'image' && background.image?.overlay === 'dark'
                    ? 'border-white'
                    : 'border-gray-400'
                    }`}>
                    <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${background.type === 'image' && background.image?.overlay === 'dark'
                        ? 'bg-white'
                        : 'bg-gray-400'
                        }`} />
                </div>
            </div>

            {/* 装饰性元素 */}
            <div className="absolute inset-0 -z-10">
                {/* 浮动圆点 */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-pulse opacity-60" />
                <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary-300 rounded-full animate-pulse opacity-40 animation-delay-1000" />
                <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-primary-500 rounded-full animate-pulse opacity-80 animation-delay-2000" />
            </div>
        </section>
    )
}
