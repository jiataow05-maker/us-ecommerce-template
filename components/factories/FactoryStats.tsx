'use client'

import { ChartBarIcon, TrophyIcon, GlobeAltIcon, CogIcon } from '@heroicons/react/24/outline'
import { Factory } from '@/lib/templates'

interface FactoryStatsProps {
    factory: Factory
    variant?: string
    colorScheme?: {
        primary: string
        secondary: string
        accent: string
    }
}

export function FactoryStats({ factory, variant = 'stats1', colorScheme }: FactoryStatsProps) {
    // 根据变体渲染不同的Stats样式
    if (variant === 'stats2') {
        return <Stats2Variant factory={factory} colorScheme={colorScheme} />
    }

    if (variant === 'stats3') {
        return <Stats3Variant factory={factory} colorScheme={colorScheme} />
    }

    // 默认 stats1 样式
    return <Stats1Variant factory={factory} colorScheme={colorScheme} />
}

// Stats1 变体 - 横向数字展示
function Stats1Variant({ factory, colorScheme }: { factory: Factory, colorScheme?: any }) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4" style={{ color: colorScheme?.primary || '#1f2937' }}>Manufacturing Excellence</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the key metrics that demonstrate our commitment to quality and innovation
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Annual Output */}
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: `${colorScheme?.accent}20` }}>
                            <ChartBarIcon className="w-8 h-8" style={{ color: colorScheme?.accent }} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2" style={{ color: colorScheme?.primary }}>{factory.annualOutput}</h3>
                        <p className="text-gray-600 font-medium">Annual Production Capacity</p>
                    </div>

                    {/* Employees */}
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: `${colorScheme?.secondary}20` }}>
                            <CogIcon className="w-8 h-8" style={{ color: colorScheme?.secondary }} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2" style={{ color: colorScheme?.primary }}>{factory.employees}</h3>
                        <p className="text-gray-600 font-medium">Skilled Workforce</p>
                    </div>

                    {/* Years of Experience */}
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: `${colorScheme?.primary}20` }}>
                            <TrophyIcon className="w-8 h-8" style={{ color: colorScheme?.primary }} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2" style={{ color: colorScheme?.primary }}>
                            {new Date().getFullYear() - factory.establishedYear}+
                        </h3>
                        <p className="text-gray-600 font-medium">Years of Excellence</p>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: `${colorScheme?.accent}20` }}>
                            <GlobeAltIcon className="w-8 h-8" style={{ color: colorScheme?.accent }} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2" style={{ color: colorScheme?.primary }}>{factory.certifications.length}</h3>
                        <p className="text-gray-600 font-medium">International Certifications</p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Core Products */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold mb-6" style={{ color: colorScheme?.primary }}>Core Product Lines</h3>
                        <div className="space-y-4">
                            {factory.mainProducts.map((product, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScheme?.accent }}></div>
                                    <span className="text-gray-700 font-medium">{product}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold mb-6" style={{ color: colorScheme?.primary }}>Quality Certifications</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {factory.certifications.map((cert, index) => (
                                <div key={index} className="rounded-lg p-4 text-center"
                                    style={{ backgroundColor: `${colorScheme?.accent}10` }}>
                                    <div className="font-semibold" style={{ color: colorScheme?.primary }}>{cert}</div>
                                    <div className="text-sm text-gray-600">Certified</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Stats2 变体 - 卡片式统计
function Stats2Variant({ factory, colorScheme }: { factory: Factory, colorScheme?: any }) {
    return (
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Performance Metrics</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Industry-leading numbers that speak to our manufacturing excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br rounded-3xl opacity-20"
                            style={{ background: `linear-gradient(135deg, ${colorScheme?.accent}40, ${colorScheme?.primary}40)` }}></div>
                        <div className="relative">
                            <ChartBarIcon className="w-12 h-12 mx-auto mb-4" style={{ color: colorScheme?.accent }} />
                            <h3 className="text-4xl font-bold text-white mb-2">{factory.annualOutput}</h3>
                            <p className="text-gray-300">Annual Capacity</p>
                        </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br rounded-3xl opacity-20"
                            style={{ background: `linear-gradient(135deg, ${colorScheme?.secondary}40, ${colorScheme?.accent}40)` }}></div>
                        <div className="relative">
                            <CogIcon className="w-12 h-12 mx-auto mb-4" style={{ color: colorScheme?.secondary }} />
                            <h3 className="text-4xl font-bold text-white mb-2">{factory.employees}</h3>
                            <p className="text-gray-300">Expert Team</p>
                        </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br rounded-3xl opacity-20"
                            style={{ background: `linear-gradient(135deg, ${colorScheme?.primary}40, ${colorScheme?.secondary}40)` }}></div>
                        <div className="relative">
                            <TrophyIcon className="w-12 h-12 mx-auto mb-4" style={{ color: colorScheme?.primary }} />
                            <h3 className="text-4xl font-bold text-white mb-2">{new Date().getFullYear() - factory.establishedYear}+</h3>
                            <p className="text-gray-300">Years Experience</p>
                        </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br rounded-3xl opacity-20"
                            style={{ background: `linear-gradient(135deg, ${colorScheme?.accent}40, ${colorScheme?.primary}40)` }}></div>
                        <div className="relative">
                            <GlobeAltIcon className="w-12 h-12 mx-auto mb-4" style={{ color: colorScheme?.accent }} />
                            <h3 className="text-4xl font-bold text-white mb-2">{factory.certifications.length}</h3>
                            <p className="text-gray-300">Certifications</p>
                        </div>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6">Manufacturing Specialties</h3>
                        <div className="space-y-4">
                            {factory.mainProducts.map((product, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colorScheme?.accent }}></div>
                                    <span className="text-gray-200 font-medium">{product}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6">Quality Standards</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {factory.certifications.map((cert, index) => (
                                <div key={index} className="p-4 text-center rounded-xl"
                                    style={{ backgroundColor: `${colorScheme?.primary}20` }}>
                                    <div className="font-semibold text-white">{cert}</div>
                                    <div className="text-sm text-gray-300">Certified</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Stats3 变体 - 进度条 + 数字
function Stats3Variant({ factory, colorScheme }: { factory: Factory, colorScheme?: any }) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: colorScheme?.primary }}>Manufacturing Capabilities</h2>
                        <p className="text-xl text-gray-600">
                            Advanced metrics showcasing our operational excellence and industry leadership
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Production Capacity */}
                        <div className="flex items-center justify-between p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${colorScheme?.primary}20` }}>
                                    <ChartBarIcon className="w-8 h-8" style={{ color: colorScheme?.primary }} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold" style={{ color: colorScheme?.primary }}>Production Capacity</h3>
                                    <p className="text-gray-600">Annual manufacturing output</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold" style={{ color: colorScheme?.accent }}>{factory.annualOutput}</div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                                    <div className="h-2 rounded-full" style={{ backgroundColor: colorScheme?.accent, width: '85%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Workforce */}
                        <div className="flex items-center justify-between p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${colorScheme?.secondary}20` }}>
                                    <CogIcon className="w-8 h-8" style={{ color: colorScheme?.secondary }} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold" style={{ color: colorScheme?.primary }}>Skilled Workforce</h3>
                                    <p className="text-gray-600">Experienced manufacturing professionals</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold" style={{ color: colorScheme?.accent }}>{factory.employees}</div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                                    <div className="h-2 rounded-full" style={{ backgroundColor: colorScheme?.secondary, width: '92%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="flex items-center justify-between p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${colorScheme?.accent}20` }}>
                                    <TrophyIcon className="w-8 h-8" style={{ color: colorScheme?.accent }} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold" style={{ color: colorScheme?.primary }}>Industry Experience</h3>
                                    <p className="text-gray-600">Years of manufacturing excellence</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold" style={{ color: colorScheme?.accent }}>{new Date().getFullYear() - factory.establishedYear}+</div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                                    <div className="h-2 rounded-full" style={{ backgroundColor: colorScheme?.primary, width: '78%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Quality Standards */}
                        <div className="flex items-center justify-between p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${colorScheme?.primary}20` }}>
                                    <GlobeAltIcon className="w-8 h-8" style={{ color: colorScheme?.primary }} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold" style={{ color: colorScheme?.primary }}>Quality Certifications</h3>
                                    <p className="text-gray-600">International quality standards</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold" style={{ color: colorScheme?.accent }}>{factory.certifications.length}</div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                                    <div className="h-2 rounded-full" style={{ backgroundColor: colorScheme?.accent, width: '95%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl" style={{ backgroundColor: `${colorScheme?.primary}10` }}>
                            <h4 className="font-bold text-lg mb-3" style={{ color: colorScheme?.primary }}>Product Portfolio</h4>
                            <div className="flex flex-wrap gap-2">
                                {factory.mainProducts.map((product, index) => (
                                    <span key={index} className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                        style={{ backgroundColor: colorScheme?.secondary }}>
                                        {product}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-xl" style={{ backgroundColor: `${colorScheme?.accent}10` }}>
                            <h4 className="font-bold text-lg mb-3" style={{ color: colorScheme?.primary }}>Certifications</h4>
                            <div className="flex flex-wrap gap-2">
                                {factory.certifications.map((cert, index) => (
                                    <span key={index} className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                        style={{ backgroundColor: colorScheme?.accent }}>
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
