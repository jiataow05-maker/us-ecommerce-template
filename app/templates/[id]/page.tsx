'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, EyeIcon, CodeBracketIcon, ShareIcon } from '@heroicons/react/24/outline'
import { getTemplateById } from '@/lib/templates'
import { TemplatePreview } from '@/components/admin/TemplatePreview'
import { BackToHallButton } from '@/components/admin/BackToHallButton'

interface Props {
    params: Promise<{ id: string }>
}

export default function TemplatePage({ params }: Props) {
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 顶部工具栏 */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* 返回大厅按钮 */}
                            <BackToHallButton />

                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">{template.name}</h1>
                                <p className="text-sm text-gray-500">{template.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <ShareIcon className="w-4 h-4" />
                                分享
                            </button>

                            <Link
                                href={`/templates/${template.id}/preview`}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <EyeIcon className="w-4 h-4" />
                                全屏预览
                            </Link>

                            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                                <CodeBracketIcon className="w-4 h-4" />
                                使用此模板
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* 左侧信息面板 */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">模板信息</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">分类</label>
                                    <p className="text-gray-900">{template.category}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">适用行业</label>
                                    <p className="text-gray-900">{template.industry}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">主题色</label>
                                    <div className="flex gap-2 mt-1">
                                        <div
                                            className="w-8 h-8 rounded border-2 border-white shadow-sm"
                                            style={{ backgroundColor: template.colors.primary }}
                                            title="主色调"
                                        />
                                        <div
                                            className="w-8 h-8 rounded border-2 border-white shadow-sm"
                                            style={{ backgroundColor: template.colors.secondary }}
                                            title="辅助色"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">特性功能</label>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {template.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">状态</label>
                                    <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                        {template.status === 'active' ? '可用' : template.status}
                                    </span>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">最后更新</label>
                                    <p className="text-gray-900">{template.updatedAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧预览区域 */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gray-100 px-6 py-3 border-b flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">模板预览</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {template.name} - {template.category}
                                </div>
                            </div>

                            {/* 模板预览组件 */}
                            <TemplatePreview templateId={template.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
