'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

export interface Contact1Props {
    title?: {
        main: string
        subtitle?: string
    }
    onSubmit?: (data: any) => void
}

export function Contact1({ title, onSubmit }: Contact1Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit?.(formData)
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">

                    {title && (
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">
                                {title.main}
                            </h2>
                            {title.subtitle && (
                                <p className="mt-4 text-lg text-gray-600">
                                    {title.subtitle}
                                </p>
                            )}
                        </div>
                    )}

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                姓名
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                邮箱
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                留言
                            </label>
                            <textarea
                                id="message"
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
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
