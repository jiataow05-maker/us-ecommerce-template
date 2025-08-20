'use client'

import { use } from 'react'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { getTemplateById } from '@/lib/templates'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Testimonials } from '@/components/Testimonials'
import { Newsletter } from '@/components/Newsletter'

interface Props {
    params: Promise<{ id: string }>
}

export default function TemplatePreviewPage({ params }: Props) {
    const { id } = use(params)
    const template = getTemplateById(id)

    if (!template) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">模板未找到</h1>
                    <Link href="/admin" className="text-primary-600 hover:text-primary-700">
                        返回模板大厅
                    </Link>
                </div>
            </div>
        )
    }

    const renderFullTemplate = () => {
        switch (id) {
            case 'us-ecommerce':
                return (
                    <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                        <Hero />
                        <Features />
                        <FeaturedProducts />
                        <Testimonials />
                        <Newsletter />
                    </div>
                )

            case 'fashion-store':
                return (
                    <div style={{
                        '--primary-600': template.colors.primary,
                        '--primary-700': template.colors.primary,
                        '--primary-500': template.colors.primary
                    } as React.CSSProperties}>
                        {/* 时尚模板全屏版本 */}
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-32">
                            <div className="container-custom text-center">
                                <h1 className="text-7xl font-bold mb-6">Fashion Forward</h1>
                                <p className="text-2xl mb-12 max-w-3xl mx-auto">
                                    Discover the latest trends in fashion with our curated collection of premium clothing and accessories
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                                        Shop Collection
                                    </button>
                                    <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-pink-600 transition-colors">
                                        View Lookbook
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Features />
                        <FeaturedProducts />
                        <Testimonials />
                        <Newsletter />
                    </div>
                )

            case 'tech-gadgets':
                return (
                    <div style={{
                        '--primary-600': template.colors.primary,
                        '--primary-700': template.colors.primary
                    } as React.CSSProperties}>
                        {/* 科技模板全屏版本 */}
                        <div className="bg-gray-900 text-white py-32">
                            <div className="container-custom text-center">
                                <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                    Tech Innovation
                                </h1>
                                <p className="text-2xl mb-12 max-w-3xl mx-auto">
                                    Experience the future with cutting-edge technology and innovative gadgets that transform your digital lifestyle
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors">
                                        Explore Tech
                                    </button>
                                    <button className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-500 hover:text-white transition-colors">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Features />
                        <FeaturedProducts />
                        <Testimonials />
                        <Newsletter />
                    </div>
                )

            default:
                return (
                    <div>
                        <Hero />
                        <Features />
                        <FeaturedProducts />
                        <Testimonials />
                        <Newsletter />
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen">
            {/* 关闭按钮 - 固定在右上角 */}
            <div className="fixed top-4 right-4 z-50">
                <Link
                    href={`/templates/${id}`}
                    className="flex items-center justify-center w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors duration-200"
                >
                    <XMarkIcon className="w-6 h-6" />
                </Link>
            </div>

            {/* 返回大厅按钮 - 固定在左上角 */}
            <div className="fixed top-4 left-4 z-50">
                <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors duration-200"
                >
                    返回大厅
                </Link>
            </div>

            {/* 模板标题 - 固定在顶部中间 */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="font-medium">{template.name}</span>
                    <span className="text-gray-300 ml-2">- 全屏预览</span>
                </div>
            </div>

            {/* 模板内容 */}
            <div className="w-full">
                {renderFullTemplate()}
            </div>
        </div>
    )
}
