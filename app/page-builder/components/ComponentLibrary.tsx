'use client'

import { useDraggable } from '@dnd-kit/core'
import { usePageBuilderStore, COMPONENT_CATEGORIES, COMPONENT_TYPES } from '@/lib/page-builder-store'

// 可拖拽组件项
function DraggableComponent({ type, name, icon, description }: {
    type: string
    name: string
    icon: string
    description: string
}) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: type,
        data: {
            type: 'component'
        }
    })

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-move"
        >
            <div className="flex items-center space-x-3">
                <div className="text-2xl">{icon}</div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{name}</h3>
                    <p className="text-sm text-gray-500 truncate">{description}</p>
                </div>
            </div>

            {/* 拖拽提示 */}
            <div className="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                拖拽到画布中使用
            </div>
        </div>
    )
}

export function ComponentLibrary() {
    const { currentCategory, setCurrentCategory } = usePageBuilderStore()

    return (
        <div className="flex-1 flex flex-col">
            {/* 标题 */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">组件库</h2>
                <p className="text-sm text-gray-500 mt-1">拖拽组件到画布中构建页面</p>
            </div>

            {/* 分类选择 */}
            <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                    {COMPONENT_CATEGORIES.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => setCurrentCategory(category.key)}
                            className={`flex items-center space-x-2 p-3 rounded-lg text-left transition-all ${currentCategory === category.key
                                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent'
                                }`}
                        >
                            <span className="text-lg">{category.icon}</span>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium truncate">{category.name}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 组件列表 */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-3">
                    {COMPONENT_TYPES[currentCategory as keyof typeof COMPONENT_TYPES]?.map((component) => (
                        <DraggableComponent
                            key={component.type}
                            type={component.type}
                            name={component.name}
                            icon={component.icon}
                            description={component.description}
                        />
                    ))}
                </div>
            </div>

            {/* 底部提示 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-600">
                    <div className="font-medium mb-1">使用提示:</div>
                    <ul className="space-y-1">
                        <li>• 拖拽组件到画布中添加</li>
                        <li>• 点击组件进行编辑</li>
                        <li>• 使用右侧面板调整属性</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
