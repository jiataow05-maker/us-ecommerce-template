'use client'

import { SparklesIcon } from '@heroicons/react/24/outline'

// 页面加载状态
export function PageLoadingState() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <SparklesIcon className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    正在加载页面构建器
                </h2>
                <p className="text-gray-600 mb-6">
                    请稍候，我们正在为您准备最佳的构建体验...
                </p>

                <div className="w-64 mx-auto">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>加载进度</span>
                        <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 w-4/5"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 组件加载骨架屏
export function ComponentSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
    )
}

// 保存状态指示器
interface SaveStatusProps {
    status: 'idle' | 'saving' | 'saved' | 'error'
    message?: string
}

export function SaveStatus({ status, message }: SaveStatusProps) {
    if (status === 'idle') return null

    const getStatusConfig = () => {
        switch (status) {
            case 'saving':
                return {
                    color: 'text-blue-600 bg-blue-50 border-blue-200',
                    icon: (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    ),
                    text: '正在保存...'
                }
            case 'saved':
                return {
                    color: 'text-green-600 bg-green-50 border-green-200',
                    icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    ),
                    text: '已保存'
                }
            case 'error':
                return {
                    color: 'text-red-600 bg-red-50 border-red-200',
                    icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    ),
                    text: '保存失败'
                }
        }
    }

    const config = getStatusConfig()

    return (
        <div className={`fixed bottom-4 left-4 z-50 flex items-center space-x-2 px-3 py-2 rounded-lg border ${config.color} transition-all duration-300`}>
            {config.icon}
            <span className="text-sm font-medium">
                {message || config.text}
            </span>
        </div>
    )
}

// 拖拽反馈组件
interface DragFeedbackProps {
    isDragging: boolean
    componentName: string
}

export function DragFeedback({ isDragging, componentName }: DragFeedbackProps) {
    if (!isDragging) return null

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                    正在拖拽 {componentName}
                </span>
            </div>
        </div>
    )
}

// 操作加载状态
interface ActionLoadingProps {
    isLoading: boolean
    text: string
    children: React.ReactNode
}

export function ActionLoading({ isLoading, text, children }: ActionLoadingProps) {
    return (
        <div className="relative">
            {children}
            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium">{text}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

// 导入导出进度条
interface ProgressBarProps {
    progress: number
    text?: string
}

export function ProgressBar({ progress, text }: ProgressBarProps) {
    return (
        <div className="w-full">
            {text && (
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{text}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    )
}
