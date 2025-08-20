'use client'

import { useState } from 'react'
import { usePageBuilderStore } from '@/lib/page-builder-store'
import {
    PaintBrushIcon,
    Cog6ToothIcon,
    EyeIcon
} from '@heroicons/react/24/outline'

export function PropertyPanel() {
    const { currentPage, selectedElement, updateElement } = usePageBuilderStore()
    const [activeTab, setActiveTab] = useState<'content' | 'style' | 'advanced'>('content')

    if (!selectedElement || !currentPage) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="text-center text-gray-500">
                    <EyeIcon className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">选择一个组件</h3>
                    <p className="text-sm">点击画布中的组件来编辑其属性</p>
                </div>
            </div>
        )
    }

    const element = currentPage.elements.find(el => el.id === selectedElement)
    if (!element) return null

    const handlePropChange = (path: string, value: any) => {
        const keys = path.split('.')
        const updatedProps = { ...element.props }

        let current = updatedProps
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {}
            }
            current = current[keys[i]]
        }
        current[keys[keys.length - 1]] = value

        updateElement(element.id, { props: updatedProps })
    }

    const getPropValue = (path: string) => {
        const keys = path.split('.')
        let current = element.props

        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key]
            } else {
                return undefined
            }
        }
        return current
    }

    const tabs = [
        { id: 'content', name: '内容', icon: PaintBrushIcon },
        { id: 'style', name: '样式', icon: Cog6ToothIcon },
        { id: 'advanced', name: '高级', icon: Cog6ToothIcon }
    ]

    return (
        <div className="h-full flex flex-col">
            {/* 标题 */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">属性编辑</h2>
                <p className="text-sm text-gray-500 mt-1">
                    编辑 {element.type} 组件
                </p>
            </div>

            {/* 选项卡 */}
            <div className="border-b border-gray-200">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {activeTab === 'content' && (
                    <div className="space-y-6">

                        {/* 标题部分 */}
                        {(getPropValue('title.main') !== undefined || getPropValue('content.title.main') !== undefined) && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">标题设置</h4>

                                {/* 主标题 */}
                                {(getPropValue('title.main') !== undefined) && (
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            主标题
                                        </label>
                                        <input
                                            type="text"
                                            value={getPropValue('title.main') || ''}
                                            onChange={(e) => handlePropChange('title.main', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        />
                                    </div>
                                )}

                                {/* Hero2/3/4 的标题结构 */}
                                {(getPropValue('content.title.main') !== undefined) && (
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            主标题
                                        </label>
                                        <input
                                            type="text"
                                            value={getPropValue('content.title.main') || ''}
                                            onChange={(e) => handlePropChange('content.title.main', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        />
                                    </div>
                                )}

                                {/* 副标题 */}
                                {(getPropValue('title.subtitle') !== undefined) && (
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            副标题
                                        </label>
                                        <input
                                            type="text"
                                            value={getPropValue('title.subtitle') || ''}
                                            onChange={(e) => handlePropChange('title.subtitle', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        />
                                    </div>
                                )}

                                {/* Hero 组件的副标题 */}
                                {(getPropValue('content.subtitle') !== undefined) && (
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            副标题
                                        </label>
                                        <input
                                            type="text"
                                            value={getPropValue('content.subtitle') || ''}
                                            onChange={(e) => handlePropChange('content.subtitle', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        />
                                    </div>
                                )}

                                {/* 高亮词 */}
                                {(getPropValue('title.highlight') !== undefined) && (
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            高亮词
                                        </label>
                                        <input
                                            type="text"
                                            value={getPropValue('title.highlight') || ''}
                                            onChange={(e) => handlePropChange('title.highlight', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        />
                                    </div>
                                )}

                                {/* Hero 组件的高亮词 */}
                                {(getPropValue('content.title.highlight') !== undefined) && (
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            高亮词
                                        </label>
                                        <input
                                            type="text"
                                            value={getPropValue('content.title.highlight') || ''}
                                            onChange={(e) => handlePropChange('content.title.highlight', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 描述文本 */}
                        {(getPropValue('description') !== undefined || getPropValue('content.description') !== undefined) && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">描述内容</h4>
                                <textarea
                                    rows={4}
                                    value={getPropValue('description') || getPropValue('content.description') || ''}
                                    onChange={(e) => {
                                        if (getPropValue('description') !== undefined) {
                                            handlePropChange('description', e.target.value)
                                        } else {
                                            handlePropChange('content.description', e.target.value)
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                    placeholder="输入描述内容..."
                                />
                            </div>
                        )}

                        {/* 按钮设置 */}
                        {(getPropValue('buttons.primary.text') !== undefined || getPropValue('content.buttons.primary.text') !== undefined) && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">按钮设置</h4>

                                {/* 主按钮文本 */}
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        主按钮文本
                                    </label>
                                    <input
                                        type="text"
                                        value={getPropValue('buttons.primary.text') || getPropValue('content.buttons.primary.text') || ''}
                                        onChange={(e) => {
                                            if (getPropValue('buttons.primary.text') !== undefined) {
                                                handlePropChange('buttons.primary.text', e.target.value)
                                            } else {
                                                handlePropChange('content.buttons.primary.text', e.target.value)
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                    />
                                </div>

                                {/* 副按钮文本 */}
                                {(getPropValue('buttons.secondary.text') !== undefined || getPropValue('content.buttons.secondary.text') !== undefined) && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            副按钮文本
                                        </label>
                                        <input
                                            type="text"
                                            value={getPropValue('buttons.secondary.text') || getPropValue('content.buttons.secondary.text') || ''}
                                            onChange={(e) => {
                                                if (getPropValue('buttons.secondary.text') !== undefined) {
                                                    handlePropChange('buttons.secondary.text', e.target.value)
                                                } else {
                                                    handlePropChange('content.buttons.secondary.text', e.target.value)
                                                }
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 图片设置 */}
                        {(getPropValue('image.src') !== undefined) && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">图片设置</h4>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        图片链接
                                    </label>
                                    <input
                                        type="url"
                                        value={getPropValue('image.src') || ''}
                                        onChange={(e) => handlePropChange('image.src', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        图片描述
                                    </label>
                                    <input
                                        type="text"
                                        value={getPropValue('image.alt') || ''}
                                        onChange={(e) => handlePropChange('image.alt', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                                        placeholder="图片描述文字"
                                    />
                                </div>
                            </div>
                        )}

                        {/* 产品名称编辑 (针对产品组件) */}
                        {(getPropValue('products.0.name') !== undefined) && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">产品信息</h4>
                                {Array.from({ length: 3 }, (_, index) => (
                                    getPropValue(`products.${index}.name`) !== undefined && (
                                        <div key={index} className="mb-4 last:mb-0 p-3 bg-gray-50 rounded-lg">
                                            <h5 className="text-xs font-medium text-gray-700 mb-2">产品 {index + 1}</h5>

                                            <div className="grid grid-cols-1 gap-2">
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">产品名称</label>
                                                    <input
                                                        type="text"
                                                        value={getPropValue(`products.${index}.name`) || ''}
                                                        onChange={(e) => handlePropChange(`products.${index}.name`, e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">描述</label>
                                                    <textarea
                                                        rows={2}
                                                        value={getPropValue(`products.${index}.description`) || ''}
                                                        onChange={(e) => handlePropChange(`products.${index}.description`, e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-xs text-gray-600 mb-1">价格</label>
                                                        <input
                                                            type="number"
                                                            value={getPropValue(`products.${index}.price`) || 0}
                                                            onChange={(e) => handlePropChange(`products.${index}.price`, Number(e.target.value))}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-600 mb-1">图片链接</label>
                                                        <input
                                                            type="url"
                                                            value={getPropValue(`products.${index}.image`) || ''}
                                                            onChange={(e) => handlePropChange(`products.${index}.image`, e.target.value)}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                            placeholder="https://..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}

                        {/* 统计数据编辑 */}
                        {(getPropValue('stats.0.label') !== undefined) && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">统计数据</h4>
                                {Array.from({ length: 4 }, (_, index) => (
                                    getPropValue(`stats.${index}.label`) !== undefined && (
                                        <div key={index} className="mb-3 last:mb-0 p-3 bg-gray-50 rounded-lg">
                                            <h5 className="text-xs font-medium text-gray-700 mb-2">数据项 {index + 1}</h5>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">标签</label>
                                                    <input
                                                        type="text"
                                                        value={getPropValue(`stats.${index}.label`) || ''}
                                                        onChange={(e) => handlePropChange(`stats.${index}.label`, e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">数值</label>
                                                    <input
                                                        type="text"
                                                        value={getPropValue(`stats.${index}.value`) || ''}
                                                        onChange={(e) => handlePropChange(`stats.${index}.value`, e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'style' && (
                    <div className="space-y-4">

                        {/* 背景颜色 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                背景色
                            </label>
                            <select
                                value={getPropValue('layout.backgroundColor') || 'bg-white'}
                                onChange={(e) => handlePropChange('layout.backgroundColor', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            >
                                <option value="bg-white">白色</option>
                                <option value="bg-gray-50">浅灰色</option>
                                <option value="bg-gray-100">灰色</option>
                                <option value="bg-primary-50">主色浅色</option>
                                <option value="bg-blue-50">蓝色浅色</option>
                                <option value="bg-green-50">绿色浅色</option>
                            </select>
                        </div>

                        {/* 文本对齐 */}
                        {(getPropValue('title.alignment') !== undefined) && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    文本对齐
                                </label>
                                <select
                                    value={getPropValue('title.alignment') || 'center'}
                                    onChange={(e) => handlePropChange('title.alignment', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                >
                                    <option value="left">左对齐</option>
                                    <option value="center">居中</option>
                                    <option value="right">右对齐</option>
                                </select>
                            </div>
                        )}

                        {/* 间距设置 */}
                        {(getPropValue('layout.spacing') !== undefined) && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    间距
                                </label>
                                <select
                                    value={getPropValue('layout.spacing') || 'normal'}
                                    onChange={(e) => handlePropChange('layout.spacing', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                >
                                    <option value="tight">紧凑</option>
                                    <option value="normal">正常</option>
                                    <option value="relaxed">宽松</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'advanced' && (
                    <div className="space-y-4">

                        {/* 动画设置 */}
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={getPropValue('animation.enabled') !== false}
                                    onChange={(e) => handlePropChange('animation.enabled', e.target.checked)}
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                                />
                                <span className="text-sm font-medium text-gray-700">启用动画</span>
                            </label>
                        </div>

                        {/* 自定义 CSS 类 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                自定义 CSS 类
                            </label>
                            <input
                                type="text"
                                value={getPropValue('customClass') || ''}
                                onChange={(e) => handlePropChange('customClass', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                placeholder="custom-class-name"
                            />
                        </div>

                        {/* 组件 ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                组件 ID
                            </label>
                            <input
                                type="text"
                                value={getPropValue('elementId') || ''}
                                onChange={(e) => handlePropChange('elementId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                placeholder="unique-element-id"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* 底部信息 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-600">
                    <div className="flex items-center justify-between mb-2">
                        <span>组件类型:</span>
                        <span className="font-mono">{element.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>组件 ID:</span>
                        <span className="font-mono text-xs">{element.id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
