'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    CalendarIcon,
    ClockIcon,
    UserIcon,
    TagIcon,
    ArrowRightIcon,
    EyeIcon,
    ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

// 博客文章接口定义
export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content?: string
    author: {
        name: string
        avatar: string
        role?: string
    }
    publishedAt: string
    readTime: number
    category: {
        name: string
        slug: string
        color?: string
    }
    tags?: Array<{
        name: string
        slug: string
    }>
    featuredImage: string
    slug: string
    views?: number
    comments?: number
    featured?: boolean
    status?: 'published' | 'draft'
}

export interface BlogGrid1Props {
    // 区块标题
    title?: {
        main: string
        subtitle?: string
        alignment?: 'left' | 'center'
    }

    // 博客文章列表
    posts: BlogPost[]

    // 布局配置
    layout?: {
        columns?: {
            mobile: 1 | 2
            tablet: 2 | 3
            desktop: 3 | 4
        }
        spacing?: 'tight' | 'normal' | 'relaxed'
        backgroundColor?: string
        showFeatured?: boolean
    }

    // 卡片配置
    card?: {
        style?: 'minimal' | 'standard' | 'elevated' | 'modern'
        showExcerpt?: boolean
        showAuthor?: boolean
        showMeta?: boolean
        showCategory?: boolean
        showTags?: boolean
        showStats?: boolean
        imageAspect?: 'square' | 'video' | 'wide'
        hoverEffect?: 'lift' | 'scale' | 'none'
    }

    // 分页配置
    pagination?: {
        enabled: boolean
        currentPage?: number
        totalPages?: number
        loadMoreText?: string
        showPageNumbers?: boolean
    }

    // 筛选配置
    filter?: {
        showCategories?: boolean
        showSearch?: boolean
        categories?: Array<{
            name: string
            slug: string
            count: number
        }>
    }

    // 动画配置
    animation?: {
        enabled?: boolean
        stagger?: boolean
        type?: 'fadeIn' | 'slideUp'
    }

    // 回调函数
    onPostClick?: (post: BlogPost) => void
    onCategoryFilter?: (categorySlug: string) => void
    onLoadMore?: () => void
    onSearch?: (query: string) => void
}

/**
 * BlogGrid1 - 网格布局博客列表
 * 
 * 特点：
 * - 响应式网格布局
 * - 丰富的文章信息展示
 * - 分类筛选功能
 * - 搜索功能
 * - 作者和元数据
 */
export function BlogGrid1({
    title,
    posts,
    layout = {},
    card = {},
    pagination = {},
    filter = {},
    animation = {},
    onPostClick,
    onCategoryFilter,
    onLoadMore,
    onSearch
}: BlogGrid1Props) {
    const {
        columns = { mobile: 1, tablet: 2, desktop: 3 },
        spacing = 'normal',
        backgroundColor = 'bg-gray-50',
        showFeatured = true
    } = layout

    const {
        style = 'standard',
        showExcerpt = true,
        showAuthor = true,
        showMeta = true,
        showCategory = true,
        showTags = false,
        showStats = true,
        imageAspect = 'video',
        hoverEffect = 'lift'
    } = card

    const {
        enabled: paginationEnabled = false,
        loadMoreText = '加载更多文章'
    } = pagination

    const {
        showCategories = true,
        showSearch = true,
        categories = []
    } = filter

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

    // 获取图片宽高比类名
    const getImageAspect = () => {
        const aspectMap = {
            square: 'aspect-square',
            video: 'aspect-video',
            wide: 'aspect-[2/1]'
        }
        return aspectMap[imageAspect]
    }

    // 获取卡片样式类名
    const getCardClasses = () => {
        const baseClasses = 'bg-white overflow-hidden transition-all duration-300'

        const styleClasses = {
            minimal: 'border border-gray-200',
            standard: 'border border-gray-200 shadow-sm hover:shadow-md',
            elevated: 'shadow-lg hover:shadow-xl',
            modern: 'border border-gray-200/50 shadow-sm hover:shadow-lg backdrop-blur-sm'
        }

        const hoverClasses = {
            lift: 'hover:transform hover:scale-105 hover:-translate-y-1',
            scale: 'hover:scale-105',
            none: ''
        }

        return `${baseClasses} ${styleClasses[style]} ${hoverClasses[hoverEffect]} rounded-xl`
    }

    // 格式化日期
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // 获取分类颜色
    const getCategoryColor = (color?: string) => {
        return color || 'bg-primary-100 text-primary-800'
    }

    // 分离特色文章和普通文章
    const featuredPosts = showFeatured ? posts.filter(post => post.featured) : []
    const regularPosts = showFeatured ? posts.filter(post => !post.featured) : posts

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
            } else {
                return { opacity: 0 }
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
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

                {/* 筛选和搜索 */}
                {(showCategories || showSearch) && (
                    <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        {/* 分类筛选 */}
                        {showCategories && categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => onCategoryFilter?.('')}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium"
                                >
                                    全部
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.slug}
                                        onClick={() => onCategoryFilter?.(category.slug)}
                                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        {category.name} ({category.count})
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* 搜索框 */}
                        {showSearch && (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="搜索文章..."
                                    onChange={(e) => onSearch?.(e.target.value)}
                                    className="w-full md:w-80 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 特色文章 */}
                {featuredPosts.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">精选文章</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredPosts.slice(0, 2).map((post) => (
                                <motion.article
                                    key={post.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                    whileHover={{ y: -4 }}
                                >
                                    <Link href={`/blog/${post.slug}`} onClick={() => onPostClick?.(post)}>
                                        <div className="aspect-video relative">
                                            <Image
                                                src={post.featuredImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(post.category.color)}`}>
                                                        {post.category.name}
                                                    </span>
                                                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-medium rounded">
                                                        精选
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white line-clamp-2">
                                                    {post.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                )}

                {/* 文章网格 */}
                <motion.div
                    className={`grid ${getGridColumns()} ${getSpacing()}`}
                    variants={animationEnabled ? containerVariants : {}}
                    initial={animationEnabled ? "hidden" : "visible"}
                    whileInView={animationEnabled ? "visible" : {}}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {regularPosts.map((post) => (
                        <motion.article
                            key={post.id}
                            className={getCardClasses()}
                            variants={animationEnabled ? itemVariants : {}}
                        >
                            <Link href={`/blog/${post.slug}`} onClick={() => onPostClick?.(post)}>

                                {/* 文章图片 */}
                                <div className={`relative ${getImageAspect()}`}>
                                    <Image
                                        src={post.featuredImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* 分类标签 */}
                                    {showCategory && (
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category.color)}`}>
                                                {post.category.name}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* 文章内容 */}
                                <div className="p-6">

                                    {/* 元数据 */}
                                    {showMeta && (
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                            <div className="flex items-center space-x-1">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <ClockIcon className="w-4 h-4" />
                                                <span>{post.readTime} 分钟阅读</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* 文章标题 */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
                                        {post.title}
                                    </h3>

                                    {/* 文章摘要 */}
                                    {showExcerpt && (
                                        <p className="text-gray-600 line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* 标签 */}
                                    {showTags && post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag.slug}
                                                    className="inline-flex items-center px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                                                >
                                                    <TagIcon className="w-3 h-3 mr-1" />
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* 作者和统计信息 */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">

                                        {/* 作者信息 */}
                                        {showAuthor && (
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full object-cover"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {post.author.name}
                                                    </div>
                                                    {post.author.role && (
                                                        <div className="text-xs text-gray-500">
                                                            {post.author.role}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* 统计信息 */}
                                        {showStats && (
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                {post.views && (
                                                    <div className="flex items-center space-x-1">
                                                        <EyeIcon className="w-4 h-4" />
                                                        <span>{post.views}</span>
                                                    </div>
                                                )}
                                                {post.comments && (
                                                    <div className="flex items-center space-x-1">
                                                        <ChatBubbleLeftIcon className="w-4 h-4" />
                                                        <span>{post.comments}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>

                {/* 分页或加载更多 */}
                {paginationEnabled && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={onLoadMore}
                            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            {loadMoreText}
                            <ArrowRightIcon className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
