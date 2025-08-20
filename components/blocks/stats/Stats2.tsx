'use client'

import { motion } from 'framer-motion'
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/24/outline'

export interface StatCard {
    title: string
    value: number | string
    change?: {
        value: number
        type: 'increase' | 'decrease'
        period: string
    }
    icon?: React.ReactNode
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
    suffix?: string
    description?: string
}

export interface Stats2Props {
    title?: {
        main: string
        subtitle?: string
    }
    stats: StatCard[]
    layout?: {
        columns?: {
            mobile: 1 | 2
            tablet: 2 | 3
            desktop: 3 | 4
        }
        backgroundColor?: string
    }
}

export function Stats2({ title, stats, layout = {} }: Stats2Props) {
    const {
        columns = { mobile: 1, tablet: 2, desktop: 4 },
        backgroundColor = 'bg-gray-50'
    } = layout

    const getColorClasses = (color?: string) => {
        const colorMap = {
            blue: 'from-blue-500 to-blue-600 text-white',
            green: 'from-green-500 to-green-600 text-white',
            yellow: 'from-yellow-500 to-yellow-600 text-white',
            red: 'from-red-500 to-red-600 text-white',
            purple: 'from-purple-500 to-purple-600 text-white'
        }
        return colorMap[color as keyof typeof colorMap] || 'from-gray-800 to-gray-900 text-white'
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

                <div className={`grid grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} gap-6`}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={`bg-gradient-to-r ${getColorClasses(stat.color)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-medium opacity-90">
                                        {stat.title}
                                    </h3>
                                </div>
                                {stat.icon && (
                                    <div className="text-2xl opacity-80">
                                        {stat.icon}
                                    </div>
                                )}
                            </div>

                            <div className="mb-2">
                                <span className="text-3xl font-bold">
                                    {stat.value}{stat.suffix}
                                </span>
                            </div>

                            {stat.change && (
                                <div className="flex items-center text-sm opacity-90">
                                    {stat.change.type === 'increase' ? (
                                        <TrendingUpIcon className="w-4 h-4 mr-1" />
                                    ) : (
                                        <TrendingDownIcon className="w-4 h-4 mr-1" />
                                    )}
                                    <span>
                                        {stat.change.value}% {stat.change.period}
                                    </span>
                                </div>
                            )}

                            {stat.description && (
                                <div className="text-sm opacity-75 mt-2">
                                    {stat.description}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
