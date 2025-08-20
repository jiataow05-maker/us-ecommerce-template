'use client'

import { useState } from 'react'
import {
    EyeIcon,
    XMarkIcon,
    SparklesIcon,
    PlayIcon
} from '@heroicons/react/24/outline'
import { ComponentRenderer } from './ComponentRenderer'

// 模板定义
export interface Template {
    id: string
    name: string
    description: string
    category: string
    components: Array<{
        type: string
        props?: Record<string, any>
    }>
    thumbnail: string
    tags: string[]
    difficulty: 'easy' | 'medium' | 'hard'
}

// 预设模板数据
export const TEMPLATE_LIBRARY: Template[] = [
    {
        id: 'landing-page-1',
        name: '营销落地页',
        description: '经典的产品营销页面，包含英雄区、特性展示、客户评价和联系表单',
        category: 'marketing',
        components: [
            { type: 'hero1' },
            { type: 'grid1' },
            { type: 'testimonial1' },
            { type: 'contact1' }
        ],
        thumbnail: '/template-previews/landing-page-1.jpg',
        tags: ['营销', '落地页', '转化'],
        difficulty: 'easy'
    },
    {
        id: 'product-showcase',
        name: '产品展示页',
        description: '专业的产品展示页面，突出产品特色和价值主张',
        category: 'ecommerce',
        components: [
            { type: 'hero2' },
            { type: 'showcase' },
            { type: 'pricing1' },
            { type: 'stats1' }
        ],
        thumbnail: '/template-previews/product-showcase.jpg',
        tags: ['产品', '电商', '展示'],
        difficulty: 'medium'
    },
    {
        id: 'company-profile',
        name: '企业介绍页',
        description: '专业的企业形象展示页面，建立品牌信任度',
        category: 'corporate',
        components: [
            { type: 'hero3' },
            { type: 'stats2' },
            { type: 'testimonial2' },
            { type: 'contact2' }
        ],
        thumbnail: '/template-previews/company-profile.jpg',
        tags: ['企业', '品牌', '信任'],
        difficulty: 'easy'
    },
    {
        id: 'creative-portfolio',
        name: '创意作品集',
        description: '展示创意作品的精美页面，适合设计师和艺术家',
        category: 'creative',
        components: [
            { type: 'hero4' },
            { type: 'grid2' },
            { type: 'testimonial3' },
            { type: 'contact3' }
        ],
        thumbnail: '/template-previews/creative-portfolio.jpg',
        tags: ['创意', '作品集', '设计'],
        difficulty: 'hard'
    },
    {
        id: 'saas-product',
        name: 'SaaS产品页',
        description: '现代化的SaaS产品介绍页面，包含功能展示和定价',
        category: 'saas',
        components: [
            { type: 'hero1' },
            { type: 'grid1' },
            { type: 'pricing2' },
            { type: 'testimonial1' }
        ],
        thumbnail: '/template-previews/saas-product.jpg',
        tags: ['SaaS', '软件', '订阅'],
        difficulty: 'medium'
    },
    {
        id: 'blog-homepage',
        name: '博客首页',
        description: '内容丰富的博客首页，突出最新文章和作者信息',
        category: 'content',
        components: [
            { type: 'hero2' },
            { type: 'blog-grid1' },
            { type: 'stats3' },
            { type: 'contact1' }
        ],
        thumbnail: '/template-previews/blog-homepage.jpg',
        tags: ['博客', '内容', '文章'],
        difficulty: 'easy'
    }
]

interface TemplatePreviewProps {
    template: Template
    onUseTemplate: (template: Template) => void
    onPreview: (template: Template) => void
}

export function TemplatePreviewCard({ template, onUseTemplate, onPreview }: TemplatePreviewProps) {
    const [imageError, setImageError] = useState(false)

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-700'
            case 'medium': return 'bg-yellow-100 text-yellow-700'
            case 'hard': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return '简单'
            case 'medium': return '中等'
            case 'hard': return '复杂'
            default: return '未知'
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">

            {/* 缩略图区域 */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                {!imageError ? (
                    <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                            <SparklesIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">模板预览</p>
                        </div>
                    </div>
                )}

                {/* 悬浮操作按钮 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onPreview(template)}
                            className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                            <EyeIcon className="w-4 h-4" />
                            <span>预览</span>
                        </button>
                        <button
                            onClick={() => onUseTemplate(template)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                            <PlayIcon className="w-4 h-4" />
                            <span>使用</span>
                        </button>
                    </div>
                </div>

                {/* 难度标签 */}
                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {getDifficultyText(template.difficulty)}
                    </span>
                </div>
            </div>

            {/* 内容区域 */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                        {template.name}
                    </h3>
                    <div className="text-xs text-gray-500">
                        {template.components.length} 个组件
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {template.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                    {template.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                            +{template.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => onPreview(template)}
                        className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                        预览
                    </button>
                    <button
                        onClick={() => onUseTemplate(template)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                        使用模板
                    </button>
                </div>
            </div>
        </div>
    )
}

// 模板预览模态框
interface TemplatePreviewModalProps {
    template: Template | null
    onClose: () => void
    onUseTemplate: (template: Template) => void
}

export function TemplatePreviewModal({ template, onClose, onUseTemplate }: TemplatePreviewModalProps) {
    if (!template) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">

                {/* 头部 */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
                        <p className="text-gray-600 mt-1">{template.description}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* 预览内容 */}
                <div className="flex-1 overflow-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                    <div className="p-6">
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="transform scale-75 origin-top-left w-[133.33%]">
                                <div className="bg-white min-h-screen">
                                    {template.components.map((component, index) => (
                                        <ComponentRenderer
                                            key={index}
                                            element={{
                                                id: `preview-${index}`,
                                                type: component.type,
                                                props: component.props || {},
                                                position: index,
                                                visible: true,
                                                locked: false
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部操作 */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">组件数量:</span>
                            <span className="font-medium text-gray-900">{template.components.length}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">难度:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                {getDifficultyText(template.difficulty)}
                            </span>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={() => {
                                onUseTemplate(template)
                                onClose()
                            }}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            使用此模板
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    function getDifficultyColor(difficulty: string) {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-700'
            case 'medium': return 'bg-yellow-100 text-yellow-700'
            case 'hard': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    function getDifficultyText(difficulty: string) {
        switch (difficulty) {
            case 'easy': return '简单'
            case 'medium': return '中等'
            case 'hard': return '复杂'
            default: return '未知'
        }
    }
}
