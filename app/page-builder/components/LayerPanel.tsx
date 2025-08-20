'use client'

import { usePageBuilderStore } from '@/lib/page-builder-store'
import {
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
    LockOpenIcon,
    TrashIcon,
    DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

export function LayerPanel() {
    const {
        currentPage,
        selectedElement,
        selectElement,
        updateElement,
        deleteElement,
        duplicateElement
    } = usePageBuilderStore()

    if (!currentPage) return null

    return (
        <div className="border-t border-gray-200 bg-white">
            {/* 标题 */}
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">图层</h3>
                <p className="text-xs text-gray-500 mt-1">
                    {currentPage.elements.length} 个组件
                </p>
            </div>

            {/* 图层列表 */}
            <div className="max-h-64 overflow-y-auto">
                {currentPage.elements.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <div className="text-xs">暂无组件</div>
                    </div>
                ) : (
                    <div className="p-2">
                        {currentPage.elements
                            .sort((a, b) => a.position - b.position)
                            .map((element, index) => (
                                <div
                                    key={element.id}
                                    className={`group flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${selectedElement === element.id
                                            ? 'bg-primary-100 text-primary-900'
                                            : 'hover:bg-gray-100'
                                        }`}
                                    onClick={() => selectElement(element.id)}
                                >
                                    {/* 图层索引 */}
                                    <div className="w-6 h-6 bg-gray-200 rounded text-xs flex items-center justify-center font-medium">
                                        {index + 1}
                                    </div>

                                    {/* 组件信息 */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium truncate">
                                            {element.type}
                                        </div>
                                        <div className="text-xs text-gray-500 truncate">
                                            {element.props?.title?.main || element.props?.name || '未命名'}
                                        </div>
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">

                                        {/* 显示/隐藏 */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                updateElement(element.id, { visible: !element.visible })
                                            }}
                                            className="p-1 hover:bg-white rounded"
                                            title={element.visible ? '隐藏' : '显示'}
                                        >
                                            {element.visible ? (
                                                <EyeIcon className="w-3 h-3" />
                                            ) : (
                                                <EyeSlashIcon className="w-3 h-3" />
                                            )}
                                        </button>

                                        {/* 锁定/解锁 */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                updateElement(element.id, { locked: !element.locked })
                                            }}
                                            className="p-1 hover:bg-white rounded"
                                            title={element.locked ? '解锁' : '锁定'}
                                        >
                                            {element.locked ? (
                                                <LockClosedIcon className="w-3 h-3" />
                                            ) : (
                                                <LockOpenIcon className="w-3 h-3" />
                                            )}
                                        </button>

                                        {/* 复制 */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                duplicateElement(element.id)
                                            }}
                                            className="p-1 hover:bg-white rounded"
                                            title="复制"
                                        >
                                            <DocumentDuplicateIcon className="w-3 h-3" />
                                        </button>

                                        {/* 删除 */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (confirm('确定要删除这个组件吗？')) {
                                                    deleteElement(element.id)
                                                }
                                            }}
                                            className="p-1 hover:bg-red-100 hover:text-red-600 rounded"
                                            title="删除"
                                        >
                                            <TrashIcon className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}
