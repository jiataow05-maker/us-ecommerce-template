'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PaperAirplaneIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export interface Contact2Props {
    title?: {
        main: string
        subtitle?: string
    }
    contactInfo?: {
        address: string
        phone: string
        email: string
    }
    onSubmit?: (data: any) => void
}

export function Contact2({ title, contactInfo, onSubmit }: Contact2Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit?.(formData)
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {title && (
                    <div className="text-center mb-16">
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

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* 联系表单 */}
                    <motion.div
                        className="bg-white rounded-xl shadow-sm p-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        主题
                                    </label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                    >
                                        <option value="">请选择</option>
                                        <option value="general">一般咨询</option>
                                        <option value="support">技术支持</option>
                                        <option value="sales">销售咨询</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    留言 *
                                </label>
                                <textarea
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                                发送消息
                            </button>
                        </form>
                    </motion.div>

                    {/* 联系信息和地图 */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >

                        {/* 联系信息 */}
                        {contactInfo && (
                            <div className="bg-white rounded-xl shadow-sm p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">联系方式</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <MapPinIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-900">地址</div>
                                            <div className="text-gray-600">{contactInfo.address}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <PhoneIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-900">电话</div>
                                            <div className="text-gray-600">{contactInfo.phone}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <EnvelopeIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-900">邮箱</div>
                                            <div className="text-gray-600">{contactInfo.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 地图 */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <MapPinIcon className="w-12 h-12 mx-auto mb-2" />
                                    <div>地图位置</div>
                                    <div className="text-sm">集成地图服务</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
