'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export interface Contact3Props {
    title?: {
        main: string
        subtitle?: string
    }
    onSubmit?: (data: any) => void
}

export function Contact3({ title, onSubmit }: Contact3Props) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        // 步骤1: 基本信息
        name: '',
        email: '',
        phone: '',
        company: '',

        // 步骤2: 项目详情
        projectType: '',
        budget: '',
        timeline: '',
        description: '',

        // 步骤3: 其他需求
        services: [] as string[],
        priority: '',
        additionalInfo: ''
    })

    const totalSteps = 3

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit?.(formData)
    }

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }))
    }

    const isStepValid = (step: number) => {
        switch (step) {
            case 1:
                return formData.name && formData.email
            case 2:
                return formData.projectType && formData.budget
            case 3:
                return true
            default:
                return false
        }
    }

    return (
        <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    {title && (
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                {title.main}
                            </h2>
                            {title.subtitle && (
                                <p className="mt-4 text-lg text-gray-600">
                                    {title.subtitle}
                                </p>
                            )}
                        </div>
                    )}

                    {/* 步骤指示器 */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center">
                            {Array.from({ length: totalSteps }, (_, index) => {
                                const stepNumber = index + 1
                                const isCompleted = stepNumber < currentStep
                                const isCurrent = stepNumber === currentStep

                                return (
                                    <div key={stepNumber} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-200 ${isCompleted
                                            ? 'bg-primary-600 text-white'
                                            : isCurrent
                                                ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                                                : 'bg-gray-300 text-gray-600'
                                            }`}>
                                            {isCompleted ? (
                                                <CheckIcon className="w-6 h-6" />
                                            ) : (
                                                stepNumber
                                            )}
                                        </div>

                                        {stepNumber < totalSteps && (
                                            <div className={`w-16 h-1 mx-4 transition-colors duration-200 ${isCompleted ? 'bg-primary-600' : 'bg-gray-300'
                                                }`} />
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="text-center mt-4">
                            <span className="text-sm text-gray-600">
                                步骤 {currentStep} / {totalSteps}
                            </span>
                        </div>
                    </div>

                    {/* 表单内容 */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">

                                {/* 步骤1: 基本信息 */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h3 className="text-xl font-bold text-gray-900">基本信息</h3>
                                            <p className="text-gray-600 mt-2">让我们先了解一下您的基本信息</p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    姓名 *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    邮箱 *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    电话
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    公司
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 步骤2: 项目详情 */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h3 className="text-xl font-bold text-gray-900">项目详情</h3>
                                            <p className="text-gray-600 mt-2">告诉我们您的项目需求</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                项目类型 *
                                            </label>
                                            <select
                                                value={formData.projectType}
                                                onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                required
                                            >
                                                <option value="">请选择项目类型</option>
                                                <option value="website">网站开发</option>
                                                <option value="app">移动应用</option>
                                                <option value="ecommerce">电商平台</option>
                                                <option value="other">其他</option>
                                            </select>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    预算范围 *
                                                </label>
                                                <select
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                    required
                                                >
                                                    <option value="">请选择预算</option>
                                                    <option value="5k-10k">5千-1万</option>
                                                    <option value="10k-50k">1万-5万</option>
                                                    <option value="50k+">5万以上</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    期望时间
                                                </label>
                                                <select
                                                    value={formData.timeline}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                >
                                                    <option value="">请选择时间</option>
                                                    <option value="1month">1个月内</option>
                                                    <option value="3months">3个月内</option>
                                                    <option value="6months">6个月内</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                项目描述
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.description}
                                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                placeholder="请简要描述您的项目需求..."
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* 步骤3: 其他需求 */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h3 className="text-xl font-bold text-gray-900">补充信息</h3>
                                            <p className="text-gray-600 mt-2">最后一步，帮助我们更好地为您服务</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                                需要的服务（可多选）
                                            </label>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {['UI/UX设计', '前端开发', '后端开发', 'SEO优化', '数据分析', '技术支持'].map((service) => (
                                                    <label key={service} className="flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.services.includes(service)}
                                                            onChange={() => handleServiceToggle(service)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center transition-colors ${formData.services.includes(service)
                                                            ? 'bg-primary-600 border-primary-600'
                                                            : 'border-gray-300'
                                                            }`}>
                                                            {formData.services.includes(service) && (
                                                                <CheckIcon className="w-3 h-3 text-white" />
                                                            )}
                                                        </div>
                                                        <span className="text-gray-700">{service}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                项目优先级
                                            </label>
                                            <div className="flex space-x-4">
                                                {['低', '中', '高', '紧急'].map((priority) => (
                                                    <label key={priority} className="flex items-center cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="priority"
                                                            value={priority}
                                                            checked={formData.priority === priority}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-4 h-4 border-2 rounded-full mr-2 ${formData.priority === priority
                                                            ? 'bg-primary-600 border-primary-600'
                                                            : 'border-gray-300'
                                                            }`} />
                                                        <span className="text-gray-700">{priority}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                补充说明
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.additionalInfo}
                                                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                                placeholder="还有什么需要我们了解的吗？"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* 导航按钮 */}
                            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={currentStep === 1}
                                    className="flex items-center px-6 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900 transition-colors"
                                >
                                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                                    上一步
                                </button>

                                {currentStep < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!isStepValid(currentStep)}
                                        className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
                                    >
                                        下一步
                                        <ChevronRightIcon className="w-5 h-5 ml-2" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
                                    >
                                        <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                                        提交申请
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
