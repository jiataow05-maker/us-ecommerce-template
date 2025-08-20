'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export interface StatItem {
    label: string
    value: number | string
    suffix?: string
    prefix?: string
    description?: string
    icon?: string
}

export interface Stats1Props {
    title?: {
        main: string
        subtitle?: string
    }
    stats: StatItem[]
    layout?: {
        backgroundColor?: string
        columns?: {
            mobile: 1 | 2 | 3 | 4
            tablet: 2 | 3 | 4
            desktop: 3 | 4 | 5 | 6
        }
        spacing?: 'tight' | 'normal' | 'relaxed'
        style?: 'minimal' | 'bordered' | 'cards'
    }
    animation?: {
        enabled?: boolean
        countUp?: boolean
        duration?: number
    }
}

export function Stats1({
    title,
    stats,
    layout = {},
    animation = {}
}: Stats1Props) {
    const {
        backgroundColor = 'bg-white',
        columns = { mobile: 2, tablet: 4, desktop: 4 },
        spacing = 'normal',
        style = 'minimal'
    } = layout

    const {
        enabled: animationEnabled = true,
        countUp = true,
        duration = 2
    } = animation

    // 数字动画状态
    const [animatedValues, setAnimatedValues] = useState<Record<number, number>>({})

    useEffect(() => {
        if (!countUp || !animationEnabled) return

        stats.forEach((stat, index) => {
            if (typeof stat.value === 'number') {
                let current = 0
                const increment = stat.value / (duration * 60) // 60fps

                const timer = setInterval(() => {
                    current += increment
                    if (current >= stat.value) {
                        current = stat.value
                        clearInterval(timer)
                    }
                    setAnimatedValues(prev => ({ ...prev, [index]: Math.floor(current) }))
                }, 1000 / 60)
            }
        })
    }, [stats, countUp, animationEnabled, duration])

    const getGridColumns = () => {
        return `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`
    }

    const getSpacing = () => {
        const spacingMap = {
            tight: 'gap-4',
            normal: 'gap-8',
            relaxed: 'gap-12'
        }
        return spacingMap[spacing]
    }

    const getItemClasses = () => {
        const baseClasses = 'text-center'

        const styleClasses = {
            minimal: '',
            bordered: 'border border-gray-200 rounded-lg p-6',
            cards: 'bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'
        }

        return `${baseClasses} ${styleClasses[style]}`
    }

    const formatValue = (stat: StatItem, index: number) => {
        let displayValue = stat.value

        if (countUp && animationEnabled && typeof stat.value === 'number') {
            displayValue = animatedValues[index] ?? 0
        }

        return `${stat.prefix || ''}${displayValue}${stat.suffix || ''}`
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

                <motion.div
                    className={`grid ${getGridColumns()} ${getSpacing()}`}
                    initial={animationEnabled ? { opacity: 0, y: 20 } : {}}
                    whileInView={animationEnabled ? { opacity: 1, y: 0 } : {}}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={getItemClasses()}
                            initial={animationEnabled ? { opacity: 0, y: 20 } : {}}
                            whileInView={animationEnabled ? { opacity: 1, y: 0 } : {}}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {stat.icon && (
                                <div className="text-4xl mb-4">
                                    {stat.icon}
                                </div>
                            )}

                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {formatValue(stat, index)}
                            </div>

                            <div className="text-lg text-gray-600 font-medium">
                                {stat.label}
                            </div>

                            {stat.description && (
                                <div className="text-sm text-gray-500 mt-2">
                                    {stat.description}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
