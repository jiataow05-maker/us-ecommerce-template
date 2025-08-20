'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    SparklesIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { TemplatePreviewCard, TemplatePreviewModal, TEMPLATE_LIBRARY, Template } from '@/app/page-builder/components/TemplatePreview'
import { useNotifications } from '@/app/page-builder/components/NotificationSystem'
import { NotificationProvider } from '@/app/page-builder/components/NotificationSystem'
import { usePageBuilderStore } from '@/lib/page-builder-store'
import { useRouter } from 'next/navigation'

function TemplateGalleryContent() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedDifficulty, setSelectedDifficulty] = useState('all')
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

    const { showSuccess } = useNotifications()
    const { createElement, setCurrentPage } = usePageBuilderStore()
    const router = useRouter()

    // 获取所有分类
    const categories = [
        { id: 'all', name: '全部模板', count: TEMPLATE_LIBRARY.length },
        ...Array.from(new Set(TEMPLATE_LIBRARY.map(t => t.category))).map(category => ({
            id: category,
            name: getCategoryName(category),
            count: TEMPLATE_LIBRARY.filter(t => t.category === category).length
        }))
    ]

    // 过滤模板
    const filteredTemplates = TEMPLATE_LIBRARY.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
        const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty

        return matchesSearch && matchesCategory && matchesDifficulty
    })

    const handleUseTemplate = async (template: Template) => {
        try {
            // 清空当前页面
            const newPage = {
                id: Date.now().toString(),
                name: `${template.name} - 副本`,
                elements: [],
                metadata: {
                    title: template.name,
                    description: template.description,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }

            setCurrentPage(newPage)

            // 依次添加模板中的组件
            template.components.forEach((component, index) => {
                setTimeout(() => {
                    createElement(component.type, component.props || {})
                }, index * 100)
            })

            showSuccess('模板应用成功', `${template.name} 已添加到您的页面中`)

            // 跳转到页面构建器
            setTimeout(() => {
                router.push('/page-builder')
            }, 500)

        } catch (error) {
            console.error('应用模板失败:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 头部 */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-8">

                        {/* 导航 */}
                        <div className="flex items-center space-x-4 mb-6">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                                <span>返回首页</span>
                            </Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-900 font-medium">模板画廊</span>
                        </div>

                        {/* 标题和描述 */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <SparklesIcon className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">模板画廊</h1>
                            </div>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                精选专业设计的页面模板，一键应用到您的项目中，快速创建出色的网站
                            </p>
                        </div>

                        {/* 搜索和筛选 */}
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

                            {/* 搜索框 */}
                            <div className="relative flex-1 max-w-md">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="搜索模板名称、描述或标签..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* 筛选器 */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <FunnelIcon className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm text-gray-600">筛选:</span>
                                </div>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name} ({category.count})
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">所有难度</option>
                                    <option value="easy">简单</option>
                                    <option value="medium">中等</option>
                                    <option value="hard">复杂</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 模板网格 */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredTemplates.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                找到 <span className="font-semibold text-gray-900">{filteredTemplates.length}</span> 个模板
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTemplates.map(template => (
                                <TemplatePreviewCard
                                    key={template.id}
                                    template={template}
                                    onUseTemplate={handleUseTemplate}
                                    onPreview={setPreviewTemplate}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的模板</h3>
                        <p className="text-gray-600 mb-4">
                            尝试调整搜索条件或筛选器，或者
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setSelectedCategory('all')
                                setSelectedDifficulty('all')
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            清除所有筛选条件
                        </button>
                    </div>
                )}
            </div>

            {/* 预览模态框 */}
            <TemplatePreviewModal
                template={previewTemplate}
                onClose={() => setPreviewTemplate(null)}
                onUseTemplate={handleUseTemplate}
            />
        </div>
    )
}

export default function TemplateGalleryPage() {
    return (
        <NotificationProvider>
            <TemplateGalleryContent />
        </NotificationProvider>
    )
}

// 辅助函数
function getCategoryName(category: string) {
    const categoryNames: Record<string, string> = {
        marketing: '营销推广',
        ecommerce: '电商购物',
        corporate: '企业官网',
        creative: '创意设计',
        saas: 'SaaS产品',
        content: '内容博客'
    }
    return categoryNames[category] || category
}
