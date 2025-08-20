'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline'

export interface Hero1Props {
    // 主标题配置
    title: {
        main: string
        highlight?: string // 高亮部分（可选）
    }

    // 副标题/描述
    description: string

    // 按钮配置
    buttons: {
        primary: {
            text: string
            href: string
            icon?: boolean // 是否显示箭头图标
        }
        secondary?: {
            text: string
            href: string
            variant?: 'link' | 'button' // 样式变体
            icon?: 'play' | 'arrow' | 'none' // 图标类型
        }
    }

    // 图片配置
    image: {
        src: string
        alt: string
        width?: number
        height?: number
    }

    // 统计数据（可选）
    stats?: Array<{
        value: string
        label: string
    }>

    // 布局配置
    layout?: {
        imagePosition?: 'left' | 'right' // 图片位置
        contentAlignment?: 'left' | 'center' // 内容对齐
        backgroundColor?: string // 背景色类名
    }
}

/**
 * Hero1 - 经典左文右图布局英雄区
 * 
 * 特点：
 * - 清晰的左右分屏布局
 * - 支持主副按钮组合
 * - 可选统计数据展示
 * - 完全响应式设计
 * - 样式中立，由主题驱动
 */
export function Hero1({
    title,
    description,
    buttons,
    image,
    stats,
    layout = {}
}: Hero1Props) {
    const {
        imagePosition = 'right',
        contentAlignment = 'left',
        backgroundColor = 'bg-white'
    } = layout

    const isImageRight = imagePosition === 'right'
    const contentAlignClass = contentAlignment === 'center'
        ? 'text-center mx-auto'
        : 'text-left'

    return (
        <section className={`relative overflow-hidden ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative py-16 sm:py-24 lg:py-32">
                    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isImageRight ? '' : 'lg:grid-flow-col-dense'
                        }`}>

                        {/* 内容区域 */}
                        <div className={`${contentAlignClass} ${isImageRight ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'
                            }`}>
                            {/* 主标题 */}
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                {title.main}
                                {title.highlight && (
                                    <>
                                        {' '}
                                        <span className="text-primary-600">
                                            {title.highlight}
                                        </span>
                                    </>
                                )}
                            </h1>

                            {/* 描述文字 */}
                            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
                                {description}
                            </p>

                            {/* 按钮组 */}
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                {/* 主按钮 */}
                                <Link
                                    href={buttons.primary.href}
                                    className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all duration-200"
                                >
                                    {buttons.primary.text}
                                    {buttons.primary.icon && (
                                        <ChevronRightIcon className="ml-2 h-5 w-5" />
                                    )}
                                </Link>

                                {/* 副按钮 */}
                                {buttons.secondary && (
                                    <Link
                                        href={buttons.secondary.href}
                                        className={`inline-flex items-center justify-center transition-all duration-200 ${buttons.secondary.variant === 'button'
                                                ? 'rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                                                : 'text-base font-semibold text-gray-900 hover:text-primary-600'
                                            }`}
                                    >
                                        {buttons.secondary.icon === 'play' && (
                                            <PlayIcon className="mr-2 h-5 w-5" />
                                        )}
                                        {buttons.secondary.text}
                                        {buttons.secondary.icon === 'arrow' && (
                                            <ChevronRightIcon className="ml-2 h-5 w-5" />
                                        )}
                                    </Link>
                                )}
                            </div>

                            {/* 统计数据 */}
                            {stats && stats.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                                        {stats.map((stat, index) => (
                                            <div key={index} className={contentAlignClass}>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 图片区域 */}
                        <div className={`relative ${isImageRight ? 'lg:pl-8' : 'lg:pr-8 lg:col-start-1 lg:row-start-1'
                            }`}>
                            <div className="relative">
                                {/* 装饰性背景元素 */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl -rotate-2 opacity-50" />

                                {/* 主图片 */}
                                <div className="relative rounded-xl overflow-hidden shadow-xl">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={image.width || 800}
                                        height={image.height || 600}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>

                                {/* 浮动装饰元素 */}
                                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden sm:block">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-sm font-medium text-gray-700">
                                            在线服务
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-50/30 to-transparent rounded-full" />
            </div>
        </section>
    )
}
