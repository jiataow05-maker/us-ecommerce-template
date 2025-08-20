'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

// 继承基础博客文章接口
import { BlogPost } from './BlogGrid1'

export interface BlogMasonryProps {
    title?: {
        main: string
        subtitle?: string
    }
    posts: BlogPost[]
    layout?: {
        columns?: {
            mobile: 1 | 2
            tablet: 2 | 3
            desktop: 3 | 4
        }
        spacing?: 'tight' | 'normal' | 'relaxed'
    }
    onPostClick?: (post: BlogPost) => void
}

/**
 * BlogMasonry - 瀑布流博客布局
 * 
 * 特点：
 * - Pinterest 风格瀑布流
 * - 自适应高度
 * - 视觉丰富的展示
 */
export function BlogMasonry({
    title,
    posts,
    layout = {},
    onPostClick
}: BlogMasonryProps) {
    const {
        columns = { mobile: 1, tablet: 2, desktop: 3 },
        spacing = 'normal'
    } = layout

    const getColumns = () => {
        return `columns-${columns.mobile} md:columns-${columns.tablet} lg:columns-${columns.desktop}`
    }

    const getSpacing = () => {
        const spacingMap = {
            tight: 'gap-4',
            normal: 'gap-6',
            relaxed: 'gap-8'
        }
        return spacingMap[spacing]
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('zh-CN', {
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* 标题 */}
                {title && (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            {title.main}
                        </h2>
                        {title.subtitle && (
                            <p className="mt-4 text-lg text-gray-600">
                                {title.subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* 瀑布流布局 */}
                <div className={`${getColumns()} space-y-${spacing === 'tight' ? '4' : spacing === 'relaxed' ? '8' : '6'}`}>
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="break-inside-avoid"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-6">
                                <Link href={`/blog/${post.slug}`} onClick={() => onPostClick?.(post)}>

                                    {/* 图片 */}
                                    <div className="relative aspect-[4/3]">
                                        <Image
                                            src={post.featuredImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded text-xs font-medium">
                                                {post.category.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 内容 */}
                                    <div className="p-4">
                                        <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                                            <div className="flex items-center space-x-1">
                                                <CalendarIcon className="w-3 h-3" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <ClockIcon className="w-3 h-3" />
                                                <span>{post.readTime}min</span>
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center space-x-2">
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                width={24}
                                                height={24}
                                                className="rounded-full"
                                            />
                                            <span className="text-xs text-gray-700 font-medium">
                                                {post.author.name}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
