'use client'

import { useEffect, useState } from 'react'
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { usePageBuilderStore } from '@/lib/page-builder-store'
import { ComponentLibrary } from './components/ComponentLibrary'
import { CanvasEditor } from './components/CanvasEditor'
import { PropertyPanel } from './components/PropertyPanel'
import { Toolbar } from './components/Toolbar'
import { LayerPanel } from './components/LayerPanel'
import { OnboardingGuide } from './components/OnboardingGuide'
import { NotificationProvider } from './components/NotificationSystem'
import { MobileWarning } from './components/MobileWarning'
import { PageLoadingState } from './components/LoadingStates'

export default function PageBuilderPage() {
    const {
        currentPage,
        isPreviewMode,
        showPropertyPanel,
        setDraggedElement,
        createElement,
        reorderElements,
        createNewPage
    } = usePageBuilderStore()

    const [showOnboarding, setShowOnboarding] = useState(false)

    // 检查是否显示引导
    useEffect(() => {
        const hasCompletedOnboarding = localStorage.getItem('page-builder-onboarding-completed')
        if (!hasCompletedOnboarding) {
            setShowOnboarding(true)
        }
    }, [])

    // 处理拖拽开始
    const handleDragStart = (event: DragStartEvent) => {
        setDraggedElement(event.active.id as string)
    }

    // 处理拖拽结束
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setDraggedElement(null)

        if (!over) return

        // 如果是从组件库拖拽到画布
        if (active.data.current?.type === 'component' && over.id === 'canvas') {
            createElement(active.id as string)
            return
        }

        // 如果是从组件库拖拽到某个元素上，插入到该元素后面
        if (active.data.current?.type === 'component' && over.data.current?.type === 'element') {
            const targetElement = currentPage?.elements.find(el => el.id === over.id)
            if (targetElement) {
                createElement(active.id as string, {}, targetElement.position + 1)
            }
            return
        }

        // 如果是在画布内重新排序
        if (active.data.current?.type === 'element' && over.data.current?.type === 'element') {
            const oldIndex = currentPage?.elements.findIndex(el => el.id === active.id) ?? -1
            const newIndex = currentPage?.elements.findIndex(el => el.id === over.id) ?? -1

            if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                reorderElements(oldIndex, newIndex)
            }
        }
    }

    return (
        <NotificationProvider>
            <MobileWarning />

            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="min-h-screen bg-gray-100 flex flex-col">

                    {/* 顶部工具栏 */}
                    <Toolbar />

                    {/* 主要内容区域 */}
                    <div className="flex-1 flex overflow-hidden">

                        {/* 左侧组件库 */}
                        {!isPreviewMode && (
                            <div className="w-80 bg-white border-r border-gray-200 flex flex-col" id="component-library">
                                <ComponentLibrary />
                                <LayerPanel />
                            </div>
                        )}

                        {/* 中间画布区域 */}
                        <div className="flex-1 flex flex-col" id="canvas">
                            <CanvasEditor />
                        </div>

                        {/* 右侧属性面板 */}
                        {!isPreviewMode && showPropertyPanel && (
                            <div className="w-80 bg-white border-l border-gray-200" id="property-panel">
                                <PropertyPanel />
                            </div>
                        )}
                    </div>
                </div>

                {/* 新手引导 */}
                {showOnboarding && (
                    <OnboardingGuide onComplete={() => setShowOnboarding(false)} />
                )}
            </DndContext>
        </NotificationProvider>
    )
}
