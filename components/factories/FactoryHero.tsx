'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Factory } from '@/lib/templates'

interface FactoryHeroProps {
    factory: Factory
    variant?: string
    colorScheme?: {
        primary: string
        secondary: string
        accent: string
    }
}

// 获取工厂图片的函数
function getFactoryImage(factoryId: string): string {
    const imageMap: Record<string, string> = {
        'hailanzhi-garment': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'gujia-furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'foxconn-electronics': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'xugong-machinery': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'yili-food': 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'byd-automotive': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'wanhua-chemical': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'yutong-packaging': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'lining-sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'jingdezhen-ceramics': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    }
    return imageMap[factoryId] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
}

export function FactoryHero({ factory, variant = 'hero1', colorScheme }: FactoryHeroProps) {
    // 根据变体渲染不同的Hero样式
    if (variant === 'hero2') {
        return <Hero2Variant factory={factory} colorScheme={colorScheme} />
    }

    if (variant === 'hero3') {
        return <Hero3Variant factory={factory} colorScheme={colorScheme} />
    }

    if (variant === 'hero4') {
        return <Hero4Variant factory={factory} colorScheme={colorScheme} />
    }

    // 默认 hero1 样式
    return <Hero1Variant factory={factory} colorScheme={colorScheme} />
}

// Hero1 变体 - 经典左文右图
function Hero1Variant({ factory, colorScheme }: { factory: Factory, colorScheme?: any }) {
    return (
        <section className="relative min-h-screen flex items-center bg-gradient-to-r from-slate-900 to-slate-800">
            {/* Back Button */}
            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/admin"
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>Back to Directory</span>
                </Link>
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-white space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                        style={{ backgroundColor: colorScheme?.accent || '#3b82f6' }}>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>Verified Partner</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        {factory.englishName}
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
                        {factory.name}
                    </h2>

                    <p className="text-lg text-gray-200 leading-relaxed">
                        {factory.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold" style={{ color: colorScheme?.accent }}>{factory.establishedYear}</div>
                            <div className="text-sm text-gray-400">Founded</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold" style={{ color: colorScheme?.accent }}>{factory.employees}</div>
                            <div className="text-sm text-gray-400">Employees</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold" style={{ color: colorScheme?.accent }}>{factory.annualOutput}</div>
                            <div className="text-sm text-gray-400">Annual Output</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={`mailto:${factory.contact.email}`}
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center text-white"
                            style={{ backgroundColor: colorScheme?.primary }}
                        >
                            Contact Factory
                        </a>
                        <a
                            href={`https://${factory.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 text-center"
                            style={{ borderColor: colorScheme?.accent }}
                        >
                            Visit Website
                        </a>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                        <Image
                            src={getFactoryImage(factory.id)}
                            alt={factory.englishName}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

// Hero2 变体 - 全屏背景
function Hero2Variant({ factory, colorScheme }: { factory: Factory, colorScheme?: any }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={getFactoryImage(factory.id)}
                    alt={factory.englishName}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40" />
            </div>

            {/* Back Button */}
            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/admin"
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>Back to Directory</span>
                </Link>
            </div>

            {/* Centered Content */}
            <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mb-8"
                    style={{ backgroundColor: colorScheme?.accent || '#f59e0b' }}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Industry Leader Since {factory.establishedYear}</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
                    {factory.englishName}
                </h1>

                <h2 className="text-2xl md:text-4xl mb-8 font-medium opacity-90">
                    {factory.name}
                </h2>

                <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {factory.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a
                        href={`mailto:${factory.contact.email}`}
                        className="px-10 py-5 rounded-xl font-bold text-xl transition-all duration-200 text-white transform hover:scale-105"
                        style={{ backgroundColor: colorScheme?.primary }}
                    >
                        Start Partnership
                    </a>
                    <a
                        href={`https://${factory.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105"
                        style={{ borderColor: colorScheme?.accent }}
                    >
                        Explore Capabilities
                    </a>
                </div>
            </div>

            {/* Features List at Bottom */}
            <div className="absolute bottom-12 left-0 right-0 z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                        <div>
                            <div className="text-2xl font-bold" style={{ color: colorScheme?.accent }}>{factory.employees}</div>
                            <div className="text-sm opacity-80">Employees</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold" style={{ color: colorScheme?.accent }}>{factory.annualOutput}</div>
                            <div className="text-sm opacity-80">Annual Output</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold" style={{ color: colorScheme?.accent }}>{factory.certifications.length}+</div>
                            <div className="text-sm opacity-80">Certifications</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold" style={{ color: colorScheme?.accent }}>{factory.mainProducts.length}</div>
                            <div className="text-sm opacity-80">Product Lines</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Hero3 变体 - 现代分屏
function Hero3Variant({ factory, colorScheme }: { factory: Factory, colorScheme?: any }) {
    return (
        <section className="min-h-screen grid lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex items-center justify-center p-12 bg-gradient-to-br from-slate-50 to-blue-50 relative">
                {/* Back Button */}
                <div className="absolute top-8 left-8">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-lg border hover:shadow-xl transition-all duration-200"
                        style={{ color: colorScheme?.primary }}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>Back to Directory</span>
                    </Link>
                </div>

                <div className="max-w-lg space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white"
                            style={{ backgroundColor: colorScheme?.accent }}>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>Manufacturing Excellence</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ color: colorScheme?.primary }}>
                            {factory.englishName}
                        </h1>

                        <h2 className="text-xl md:text-2xl mb-6 font-medium text-gray-600">
                            {factory.name}
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {factory.description}
                        </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScheme?.accent }}></div>
                            <span className="text-gray-700">{factory.location} • Established {factory.establishedYear}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScheme?.accent }}></div>
                            <span className="text-gray-700">{factory.employees} employees • {factory.annualOutput} annual output</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScheme?.accent }}></div>
                            <span className="text-gray-700">{factory.certifications.join(', ')} certified</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={`mailto:${factory.contact.email}`}
                            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 text-center text-white transform hover:scale-105"
                            style={{ backgroundColor: colorScheme?.primary }}
                        >
                            Get Quote
                        </a>
                        <a
                            href={`https://${factory.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 text-center hover:bg-gray-50"
                            style={{ borderColor: colorScheme?.secondary, color: colorScheme?.primary }}
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            {/* Right Image */}
            <div className="relative">
                <Image
                    src={getFactoryImage(factory.id)}
                    alt={factory.englishName}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
            </div>
        </section>
    )
}

// Hero4 变体 - 视频背景风格
function Hero4Variant({ factory, colorScheme }: { factory: Factory, colorScheme?: any }) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background with parallax effect */}
            <div className="absolute inset-0 scale-110">
                <Image
                    src={getFactoryImage(factory.id)}
                    alt={factory.englishName}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />
            </div>

            {/* Back Button */}
            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/admin"
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>Back to Directory</span>
                </Link>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6">
                <div className="max-w-4xl text-white">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-pulse"
                        style={{ backgroundColor: colorScheme?.accent }}>
                        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                        <span>Live Manufacturing • Since {factory.establishedYear}</span>
                    </div>

                    {/* Typewriter effect style title */}
                    <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight">
                        <span className="block">{factory.englishName.split(' ')[0]}</span>
                        <span className="block" style={{ color: colorScheme?.accent }}>
                            {factory.englishName.split(' ').slice(1).join(' ')}
                        </span>
                    </h1>

                    <h2 className="text-2xl md:text-4xl mb-8 font-light opacity-90">
                        {factory.name}
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl">
                        {factory.description}
                    </p>

                    {/* Action Buttons with hover effects */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <a
                            href={`mailto:${factory.contact.email}`}
                            className="group relative px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 text-white overflow-hidden"
                            style={{ backgroundColor: colorScheme?.primary }}
                        >
                            <span className="relative z-10">Request Consultation</span>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </a>
                        <a
                            href={`https://${factory.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border-2 text-white hover:bg-white hover:text-gray-900 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105"
                            style={{ borderColor: colorScheme?.accent }}
                        >
                            Virtual Tour
                        </a>
                    </div>
                </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute bottom-8 right-8 z-10 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-3xl font-bold" style={{ color: colorScheme?.accent }}>{factory.employees}</div>
                            <div className="text-xs opacity-80">Team Size</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold" style={{ color: colorScheme?.accent }}>{factory.annualOutput}</div>
                            <div className="text-xs opacity-80">Capacity</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
