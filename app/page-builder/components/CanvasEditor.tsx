'use client'

import { useDroppable, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { usePageBuilderStore, PageElement } from '@/lib/page-builder-store'
import { ComponentRenderer } from './ComponentRenderer'
import { EmptyState } from './EmptyState'
import {
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
    LockOpenIcon
} from '@heroicons/react/24/outline'

// 可拖拽的页面元素
function DraggableElement({ element }: { element: PageElement }) {
    const { selectedElement, selectElement, updateElement } = usePageBuilderStore()

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging
    } = useDraggable({
        id: element.id,
        data: {
            type: 'element'
        },
        disabled: element.locked
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1
    }

    const isSelected = selectedElement === element.id

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative ${element.visible ? '' : 'opacity-50'}`}
            onClick={(e) => {
                e.stopPropagation()
                selectElement(element.id)
            }}
        >
            {/* 选中状态边框 */}
            {isSelected && (
                <div className="absolute inset-0 border-2 border-primary-500 pointer-events-none z-10 rounded-lg">
                    <div className="absolute -top-8 left-0 bg-primary-500 text-white px-2 py-1 text-xs rounded-t-lg">
                        {element.type}
                    </div>
                </div>
            )}

            {/* 悬停状态边框 */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-300 pointer-events-none rounded-lg transition-colors" />

            {/* 工具栏 */}
            {isSelected && (
                <div className="absolute -top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg px-2 py-1 flex items-center space-x-1 z-20">

                    {/* 拖拽手柄 */}
                    {!element.locked && (
                        <button
                            {...listeners}
                            {...attributes}
                            className="p-1 hover:bg-gray-100 rounded cursor-move"
                            title="拖拽移动"
                        >
                            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                        </button>
                    )}

                    {/* 显示/隐藏 */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            updateElement(element.id, { visible: !element.visible })
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={element.visible ? '隐藏' : '显示'}
                    >
                        {element.visible ? (
                            <EyeIcon className="w-4 h-4" />
                        ) : (
                            <EyeSlashIcon className="w-4 h-4" />
                        )}
                    </button>

                    {/* 锁定/解锁 */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            updateElement(element.id, { locked: !element.locked })
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={element.locked ? '解锁' : '锁定'}
                    >
                        {element.locked ? (
                            <LockClosedIcon className="w-4 h-4" />
                        ) : (
                            <LockOpenIcon className="w-4 h-4" />
                        )}
                    </button>
                </div>
            )}

            {/* 渲染组件 */}
            <div className={element.locked ? 'pointer-events-none' : ''}>
                <ComponentRenderer element={element} />
            </div>
        </div>
    )
}

export function CanvasEditor() {
    const {
        currentPage,
        isPreviewMode,
        selectedElement,
        selectElement
    } = usePageBuilderStore()

    const { isOver, setNodeRef } = useDroppable({
        id: 'canvas'
    })

    if (!currentPage) return null

    return (
        <div className="flex-1 overflow-auto bg-gray-100">
            <div className="p-8">

                {/* 画布容器 */}
                <div
                    ref={setNodeRef}
                    className={`bg-white min-h-screen shadow-lg transition-all ${isOver ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
                        } ${isPreviewMode ? '' : 'border-2 border-dashed border-gray-300'}`}
                    onClick={() => !isPreviewMode && selectElement(null)}
                >

                    {/* 空状态提示 */}
                    {currentPage.elements.length === 0 && !isPreviewMode && (
                        <EmptyState onQuickStart={() => { }} />
                    )}

                    {/* 渲染页面元素 */}
                    {currentPage.elements
                        .sort((a, b) => a.position - b.position)
                        .map((element) => (
                            <div key={element.id}>
                                {isPreviewMode ? (
                                    <div className={element.visible ? '' : 'hidden'}>
                                        <ComponentRenderer element={element} />
                                    </div>
                                ) : (
                                    <DraggableElement element={element} />
                                )}
                            </div>
                        ))}
                </div>

                {/* 预览模式提示 */}
                {isPreviewMode && (
                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                            <EyeIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">预览模式</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
