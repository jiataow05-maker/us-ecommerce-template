'use client'

import { useState } from 'react'
import {
    PlayIcon,
    PauseIcon,
    EyeIcon,
    Cog6ToothIcon,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    DocumentDuplicateIcon,
    TrashIcon,
    CloudArrowUpIcon,
    CloudArrowDownIcon,
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
    RectangleStackIcon
} from '@heroicons/react/24/outline'
import { usePageBuilderStore } from '@/lib/page-builder-store'
import { useNotifications } from './NotificationSystem'

export function Toolbar() {
    const {
        currentPage,
        isPreviewMode,
        showPropertyPanel,
        selectedElement,
        canUndo,
        canRedo,
        undo,
        redo,
        togglePreviewMode,
        togglePropertyPanel,
        deleteElement,
        duplicateElement,
        savePage,
        exportPage,
        importPage
    } = usePageBuilderStore()

    const { showSuccess, showError, showInfo } = useNotifications()

    const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [showExportModal, setShowExportModal] = useState(false)
    const [showImportModal, setShowImportModal] = useState(false)
    const [importText, setImportText] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const handleExport = async () => {
        try {
            const json = exportPage()
            await navigator.clipboard.writeText(json)
            showSuccess('导出成功', '页面数据已复制到剪贴板，您可以保存为文件或分享给他人')
            setShowExportModal(false)
        } catch (error) {
            showError('导出失败', '无法复制到剪贴板，请手动复制数据')
        }
    }

    const handleImport = () => {
        try {
            importPage(importText)
            setImportText('')
            setShowImportModal(false)
            showSuccess('导入成功', '页面已成功导入，您可以开始编辑了')
        } catch (error) {
            showError('导入失败', '数据格式不正确，请检查后重试')
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await savePage()
            showSuccess('保存成功', '您的页面已保存到本地存储')
        } catch (error) {
            showError('保存失败', '无法保存页面，请重试')
        } finally {
            setIsSaving(false)
        }
    }

    const getDeviceFrameClass = () => {
        switch (devicePreview) {
            case 'mobile':
                return 'max-w-sm mx-auto'
            case 'tablet':
                return 'max-w-3xl mx-auto'
            default:
                return 'w-full'
        }
    }

    return (
        <>
            <div className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">

                    {/* 左侧：页面信息 */}
                    <div className="flex items-center space-x-4">
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">
                                {currentPage?.name || '未命名页面'}
                            </h1>
                            <p className="text-sm text-gray-500">
                                页面构建器 • {currentPage?.elements.length || 0} 个组件
                            </p>
                        </div>
                    </div>

                    {/* 中间：操作按钮 */}
                    <div className="flex items-center space-x-2">

                        {/* 撤销/重做 */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={undo}
                                disabled={!canUndo()}
                                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="撤销"
                            >
                                <ArrowUturnLeftIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={redo}
                                disabled={!canRedo()}
                                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l border-gray-300"
                                title="重做"
                            >
                                <ArrowUturnRightIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {/* 元素操作 */}
                        {selectedElement && !isPreviewMode && (
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => duplicateElement(selectedElement)}
                                    className="p-2 hover:bg-gray-50 transition-colors"
                                    title="复制组件"
                                >
                                    <DocumentDuplicateIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => deleteElement(selectedElement)}
                                    className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors border-l border-gray-300"
                                    title="删除组件"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* 设备预览 */}
                        {isPreviewMode && (
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setDevicePreview('desktop')}
                                    className={`p-2 transition-colors ${devicePreview === 'desktop'
                                        ? 'bg-primary-100 text-primary-600'
                                        : 'hover:bg-gray-50'
                                        }`}
                                    title="桌面预览"
                                >
                                    <ComputerDesktopIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDevicePreview('tablet')}
                                    className={`p-2 transition-colors border-l border-gray-300 ${devicePreview === 'tablet'
                                        ? 'bg-primary-100 text-primary-600'
                                        : 'hover:bg-gray-50'
                                        }`}
                                    title="平板预览"
                                >
                                    <RectangleStackIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDevicePreview('mobile')}
                                    className={`p-2 transition-colors border-l border-gray-300 ${devicePreview === 'mobile'
                                        ? 'bg-primary-100 text-primary-600'
                                        : 'hover:bg-gray-50'
                                        }`}
                                    title="手机预览"
                                >
                                    <DevicePhoneMobileIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* 视图切换 */}
                        <button
                            id="preview-button"
                            onClick={togglePreviewMode}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isPreviewMode
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                                }`}
                        >
                            {isPreviewMode ? (
                                <>
                                    <PauseIcon className="w-4 h-4" />
                                    <span>退出预览</span>
                                </>
                            ) : (
                                <>
                                    <EyeIcon className="w-4 h-4" />
                                    <span>预览</span>
                                </>
                            )}
                        </button>

                        {/* 属性面板切换 */}
                        {!isPreviewMode && (
                            <button
                                onClick={togglePropertyPanel}
                                className={`p-2 rounded-lg transition-colors ${showPropertyPanel
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'hover:bg-gray-100'
                                    }`}
                                title="属性面板"
                            >
                                <Cog6ToothIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* 右侧：保存和导入导出 */}
                    <div className="flex items-center space-x-2">

                        {/* 导入导出 */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setShowImportModal(true)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                                title="导入页面"
                            >
                                <CloudArrowDownIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setShowExportModal(true)}
                                className="p-2 hover:bg-gray-50 transition-colors border-l border-gray-300"
                                title="导出页面"
                            >
                                <CloudArrowUpIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {/* 保存按钮 */}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                            {isSaving && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            <span>{isSaving ? '保存中...' : '保存页面'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 导出模态框 */}
            {showExportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">导出页面</h3>
                        <p className="text-gray-600 mb-4">
                            页面数据将复制到剪贴板，您可以保存为文件或分享给他人。
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleExport}
                                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                                复制到剪贴板
                            </button>
                            <button
                                onClick={() => setShowExportModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 导入模态框 */}
            {showImportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">导入页面</h3>
                        <textarea
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                            placeholder="粘贴页面数据 JSON..."
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
                        />
                        <div className="flex space-x-3 mt-4">
                            <button
                                onClick={handleImport}
                                disabled={!importText.trim()}
                                className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                                导入
                            </button>
                            <button
                                onClick={() => {
                                    setShowImportModal(false)
                                    setImportText('')
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
