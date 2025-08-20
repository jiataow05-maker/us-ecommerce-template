'use client'

import { useRef, useCallback } from 'react'
import { ComponentRenderer } from './ComponentRenderer'
import { Template } from './TemplatePreview'

interface ThumbnailGeneratorProps {
    template: Template
    onThumbnailGenerated?: (dataUrl: string) => void
}

export function ThumbnailGenerator({ template, onThumbnailGenerated }: ThumbnailGeneratorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const generateThumbnail = useCallback(async () => {
        if (!containerRef.current || !canvasRef.current) return

        try {
            // 使用 html2canvas 生成缩略图（需要安装）
            // 这里提供一个简化版本的实现
            const container = containerRef.current
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')

            if (!ctx) return

            // 设置画布尺寸
            canvas.width = 400
            canvas.height = 300

            // 绘制背景
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // 绘制模板名称
            ctx.fillStyle = '#1f2937'
            ctx.font = '20px Inter, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(template.name, canvas.width / 2, 50)

            // 绘制组件数量
            ctx.fillStyle = '#6b7280'
            ctx.font = '14px Inter, sans-serif'
            ctx.fillText(`${template.components.length} 个组件`, canvas.width / 2, 80)

            // 绘制模板类型标识
            const categoryColors: Record<string, string> = {
                marketing: '#3b82f6',
                ecommerce: '#10b981',
                corporate: '#8b5cf6',
                creative: '#f59e0b',
                saas: '#06b6d4',
                content: '#ef4444'
            }

            ctx.fillStyle = categoryColors[template.category] || '#6b7280'
            ctx.fillRect(50, 120, canvas.width - 100, 100)

            // 添加类型文字
            ctx.fillStyle = '#ffffff'
            ctx.font = '16px Inter, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(getCategoryName(template.category), canvas.width / 2, 180)

            // 添加标签
            if (template.tags.length > 0) {
                ctx.fillStyle = '#374151'
                ctx.font = '12px Inter, sans-serif'
                ctx.fillText(template.tags.slice(0, 3).join(' • '), canvas.width / 2, 260)
            }

            // 转换为数据URL
            const dataUrl = canvas.toDataURL('image/png', 0.8)
            onThumbnailGenerated?.(dataUrl)

            return dataUrl
        } catch (error) {
            console.error('生成缩略图失败:', error)
            return null
        }
    }, [template, onThumbnailGenerated])

    return (
        <div className="hidden">
            {/* 隐藏的容器用于渲染组件 */}
            <div
                ref={containerRef}
                className="w-[400px] bg-white"
                style={{ transform: 'scale(0.3)', transformOrigin: 'top left' }}
            >
                {template.components.map((component, index) => (
                    <ComponentRenderer
                        key={index}
                        element={{
                            id: `thumb-${index}`,
                            type: component.type,
                            props: component.props || {},
                            position: index,
                            visible: true,
                            locked: false
                        }}
                    />
                ))}
            </div>

            {/* 隐藏的画布 */}
            <canvas ref={canvasRef} className="hidden" />

            {/* 生成按钮（开发时使用） */}
            <button
                onClick={generateThumbnail}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                生成缩略图
            </button>
        </div>
    )
}

// 生成所有模板的缩略图
export function generateAllThumbnails(templates: Template[]) {
    templates.forEach(template => {
        // 这里可以批量生成缩略图
        console.log(`生成 ${template.name} 的缩略图`)
    })
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
