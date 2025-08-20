'use client'

import { useState, useEffect } from 'react'
import {
    XMarkIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    HandRaisedIcon,
    EyeIcon,
    Cog6ToothIcon,
    SparklesIcon
} from '@heroicons/react/24/outline'

interface OnboardingStep {
    id: string
    title: string
    description: string
    target: string
    position: 'top' | 'bottom' | 'left' | 'right'
    icon: React.ComponentType<{ className?: string }>
}

const ONBOARDING_STEPS: OnboardingStep[] = [
    {
        id: 'welcome',
        title: '欢迎使用页面构建器！',
        description: '让我们花1分钟时间了解如何使用这个强大的工具来创建您的专业网站。',
        target: 'canvas',
        position: 'top',
        icon: SparklesIcon
    },
    {
        id: 'components',
        title: '选择组件',
        description: '从左侧组件库中选择您需要的组件，我们提供了23个精美的组件供您使用。',
        target: 'component-library',
        position: 'right',
        icon: HandRaisedIcon
    },
    {
        id: 'drag-drop',
        title: '拖拽添加',
        description: '将组件拖拽到中间的画布区域，就像搭积木一样简单！您可以添加多个组件。',
        target: 'canvas',
        position: 'top',
        icon: HandRaisedIcon
    },
    {
        id: 'edit',
        title: '编辑内容',
        description: '点击任何组件来选中它，然后在右侧属性面板中编辑文字、图片和其他属性。',
        target: 'property-panel',
        position: 'left',
        icon: Cog6ToothIcon
    },
    {
        id: 'preview',
        title: '预览效果',
        description: '随时点击预览按钮查看最终效果，支持桌面、平板、手机三种设备预览。',
        target: 'preview-button',
        position: 'bottom',
        icon: EyeIcon
    }
]

interface OnboardingGuideProps {
    onComplete: () => void
}

export function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // 检查用户是否已经完成过引导
        const hasCompletedOnboarding = localStorage.getItem('page-builder-onboarding-completed')
        if (!hasCompletedOnboarding) {
            setTimeout(() => setIsVisible(true), 500)
        }
    }, [])

    const handleNext = () => {
        if (currentStep < ONBOARDING_STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleComplete()
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleComplete = () => {
        localStorage.setItem('page-builder-onboarding-completed', 'true')
        setIsVisible(false)
        onComplete()
    }

    const handleSkip = () => {
        localStorage.setItem('page-builder-onboarding-completed', 'true')
        setIsVisible(false)
        onComplete()
    }

    if (!isVisible) return null

    const currentStepData = ONBOARDING_STEPS[currentStep]
    const Icon = currentStepData.icon

    return (
        <>
            {/* 遮罩层 */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

            {/* 引导卡片 */}
            <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full pointer-events-auto">

                        {/* 头部 */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {currentStepData.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        步骤 {currentStep + 1} / {ONBOARDING_STEPS.length}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleSkip}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* 内容 */}
                        <div className="p-6">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {currentStepData.description}
                            </p>

                            {/* 进度条 */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                    <span>引导进度</span>
                                    <span>{Math.round(((currentStep + 1) / ONBOARDING_STEPS.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* 按钮 */}
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={handleSkip}
                                    className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                                >
                                    跳过引导
                                </button>

                                <div className="flex space-x-3">
                                    {currentStep > 0 && (
                                        <button
                                            onClick={handlePrevious}
                                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <ChevronLeftIcon className="w-4 h-4" />
                                            <span>上一步</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={handleNext}
                                        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        <span>{currentStep === ONBOARDING_STEPS.length - 1 ? '完成' : '下一步'}</span>
                                        {currentStep < ONBOARDING_STEPS.length - 1 && (
                                            <ChevronRightIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// 重新开始引导的功能
export function restartOnboarding() {
    localStorage.removeItem('page-builder-onboarding-completed')
    window.location.reload()
}
