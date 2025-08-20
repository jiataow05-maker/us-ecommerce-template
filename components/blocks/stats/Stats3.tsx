'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export interface ProgressStat {
    label: string
    value: number // 0-100 的百分比
    target?: number
    color?: string
    description?: string
    icon?: string
}

export interface Stats3Props {
    title?: {
        main: string
        subtitle?: string
    }
    stats: ProgressStat[]
    layout?: {
        backgroundColor?: string
        showValues?: boolean
        showTargets?: boolean
        barHeight?: 'small' | 'medium' | 'large'
        orientation?: 'vertical' | 'horizontal'
    }
    animation?: {
        enabled?: boolean
        duration?: number
        delay?: number
    }
}

export function Stats3({ title, stats, layout = {}, animation = {} }: Stats3Props) {
    const {
        backgroundColor = 'bg-white',
        showValues = true,
        showTargets = false,
        barHeight = 'medium',
        orientation = 'horizontal'
    } = layout

    const {
        enabled: animationEnabled = true,
        duration = 1.5,
        delay = 0.1
    } = animation

    const [animatedProgress, setAnimatedProgress] = useState<Record<number, number>>({})

    useEffect(() => {
        if (!animationEnabled) return

        stats.forEach((stat, index) => {
            setTimeout(() => {
                let progress = 0
                const increment = stat.value / (duration * 60)

                const timer = setInterval(() => {
                    progress += increment
                    if (progress >= stat.value) {
                        progress = stat.value
                        clearInterval(timer)
                    }
                    setAnimatedProgress(prev => ({ ...prev, [index]: progress }))
                }, 1000 / 60)
            }, index * delay * 1000)
        })
    }, [stats, animationEnabled, duration, delay])

    const getBarHeight = () => {
        const heightMap = {
            small: 'h-2',
            medium: 'h-4',
            large: 'h-6'
        }
        return heightMap[barHeight]
    }

    const getProgress = (stat: ProgressStat, index: number) => {
        if (animationEnabled) {
            return animatedProgress[index] ?? 0
        }
        return stat.value
    }

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

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

                <div className="max-w-4xl mx-auto space-y-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            initial={animationEnabled ? { opacity: 0, x: -20 } : {}}
                            whileInView={animationEnabled ? { opacity: 1, x: 0 } : {}}
                            viewport={{ once: true }}
                            transition={{ delay: index * delay }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    {stat.icon && (
                                        <span className="text-2xl">{stat.icon}</span>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {stat.label}
                                        </h3>
                                        {stat.description && (
                                            <p className="text-sm text-gray-600">
                                                {stat.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {showValues && (
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {Math.round(getProgress(stat, index))}%
                                        </div>
                                        {showTargets && stat.target && (
                                            <div className="text-sm text-gray-500">
                                                目标: {stat.target}%
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* 进度条 */}
                            <div className={`relative ${getBarHeight()} bg-gray-200 rounded-full overflow-hidden`}>
                                <motion.div
                                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300`}
                                    style={{
                                        backgroundColor: stat.color || '#3B82F6',
                                        width: `${getProgress(stat, index)}%`
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getProgress(stat, index)}%` }}
                                    transition={{ duration: duration, delay: index * delay }}
                                />

                                {/* 目标线 */}
                                {showTargets && stat.target && (
                                    <div
                                        className="absolute top-0 h-full w-0.5 bg-gray-600"
                                        style={{ left: `${stat.target}%` }}
                                    />
                                )}
                            </div>

                            {/* 进度标签 */}
                            {orientation === 'horizontal' && (
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>0%</span>
                                    {showTargets && stat.target && (
                                        <span style={{ marginLeft: `${stat.target - 10}%` }}>
                                            目标
                                        </span>
                                    )}
                                    <span>100%</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
