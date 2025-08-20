'use client'

import {
    PlusIcon,
    SparklesIcon,
    RocketLaunchIcon,
    HandRaisedIcon
} from '@heroicons/react/24/outline'
import { usePageBuilderStore } from '@/lib/page-builder-store'

const QUICK_START_TEMPLATES = [
    {
        id: 'landing-page',
        name: '营销落地页',
        description: '英雄区 + 特性介绍 + 客户评价 + 联系表单',
        components: ['hero1', 'grid1', 'testimonial1', 'contact1'],
        icon: '🎯'
    },
    {
        id: 'product-showcase',
        name: '产品展示页',
        description: '产品英雄区 + 产品网格 + 价格表 + 统计数据',
        components: ['hero2', 'grid1', 'pricing1', 'stats1'],
        icon: '🛍️'
    },
    {
        id: 'company-profile',
        name: '企业介绍页',
        description: '企业英雄区 + 统计数据 + 客户评价 + 联系方式',
        components: ['hero3', 'stats2', 'testimonial2', 'contact2'],
        icon: '🏢'
    }
]

interface EmptyStateProps {
    onQuickStart: (components: string[]) => void
}

export function EmptyState({ onQuickStart }: EmptyStateProps) {
    const { createElement } = usePageBuilderStore()

    const handleQuickStart = (components: string[]) => {
        // 依次添加组件
        components.forEach((componentType, index) => {
            setTimeout(() => {
                createElement(componentType)
            }, index * 200) // 添加延迟动画效果
        })
        onQuickStart(components)
    }

    return (
        <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-2xl mx-auto text-center">

                {/* 主要图标和标题 */}
                <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <SparklesIcon className="w-10 h-10 text-blue-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        开始创建您的页面
                    </h2>

                    <p className="text-gray-600 text-lg mb-8">
                        从左侧拖拽组件到这里，或者选择一个模板快速开始
                    </p>
                </div>

                {/* 操作指南 */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <HandRaisedIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">1. 选择组件</h3>
                        <p className="text-sm text-gray-600">从左侧组件库选择需要的组件</p>
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <PlusIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">2. 拖拽添加</h3>
                        <p className="text-sm text-gray-600">将组件拖拽到画布中</p>
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <RocketLaunchIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">3. 自定义内容</h3>
                        <p className="text-sm text-gray-600">编辑文字、图片等内容</p>
                    </div>
                </div>

                {/* 快速开始模板 */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        🚀 快速开始模板
                    </h3>
                    <p className="text-gray-600 mb-6">
                        选择一个预设模板，快速创建专业页面
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                        {QUICK_START_TEMPLATES.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => handleQuickStart(template.components)}
                                className="bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-lg p-4 text-left transition-all group"
                            >
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="text-2xl">{template.icon}</span>
                                    <h4 className="font-medium text-gray-900 group-hover:text-blue-700">
                                        {template.name}
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    {template.description}
                                </p>
                                <div className="text-xs text-blue-600 font-medium">
                                    点击创建 →
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                        💡 提示：您可以随时添加、删除或重新排序组件
                    </div>
                </div>

                {/* 更多选项 */}
                <div className="mt-8 space-y-4">
                    <div className="text-center">
                        <a
                            href="/templates"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            <span>浏览更多模板</span>
                        </a>
                    </div>

                    {/* 拖拽提示 */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-center space-x-2 text-blue-700">
                            <HandRaisedIcon className="w-5 h-5" />
                            <span className="font-medium">拖拽提示</span>
                        </div>
                        <p className="text-sm text-blue-600 mt-2">
                            将左侧的组件拖拽到这个区域，即可开始构建您的页面
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
