'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

// 继承基础博客文章接口
import { BlogPost } from './BlogGrid1'

export interface BlogListProps {
    title?: {
        main: string
        subtitle?: string
    }
    posts: BlogPost[]
    layout?: {
        style?: 'classic' | 'modern' | 'minimal'
        showImage?: boolean
        imagePosition?: 'left' | 'right'
    }
    onPostClick?: (post: BlogPost) => void
}

/**
 * BlogList - 列表布局博客
 * 
 * 特点：
 * - 传统列表布局
 * - 左图右文或右图左文
 * - 适合文字为主的博客
 */
export function BlogList({
    title,
    posts,
    layout = {},
    onPostClick
}: BlogListProps) {
    const {
        style = 'classic',
        showImage = true,
        imagePosition = 'left'
    } = layout

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <section className="py-16 bg-white">
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

                {/* 文章列表 */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/blog/${post.slug}`} onClick={() => onPostClick?.(post)}>
                                <div className={`flex flex-col ${showImage ? 'md:flex-row' : ''} gap-6`}>

                                    {/* 文章图片 */}
                                    {showImage && (
                                        <div className={`${imagePosition === 'right' ? 'md:order-2' : ''} md:w-1/3 flex-shrink-0`}>
                                            <div className="aspect-video relative rounded-lg overflow-hidden">
                                                <Image
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* 文章内容 */}
                                    <div className="flex-1">

                                        {/* 分类和日期 */}
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                            <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium">
                                                {post.category.name}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <ClockIcon className="w-4 h-4" />
                                                <span>{post.readTime} 分钟</span>
                                            </div>
                                        </div>

                                        {/* 标题 */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                                            {post.title}
                                        </h3>

                                        {/* 摘要 */}
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* 作者 */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full"
                                                />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {post.author.name}
                                                </span>
                                            </div>

                                            <div className="flex items-center text-primary-600 text-sm font-medium">
                                                阅读更多
                                                <ArrowRightIcon className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
