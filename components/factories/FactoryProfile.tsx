'use client'

import { Factory } from '@/lib/templates'
import { FactoryHero } from './FactoryHero'
import { FactoryStats } from './FactoryStats'
import { FactoryProducts } from './FactoryProducts'
import { FactoryContact } from './FactoryContact'
import { FactoryTestimonials } from './FactoryTestimonials'

interface FactoryProfileProps {
    factory: Factory
}

// 为不同工厂定义独特的设计配置
const getFactoryDesignConfig = (factoryId: string) => {
    const configs = {
        'hailanzhi-garment': {
            heroVariant: 'hero1',
            statsVariant: 'stats1',
            productsVariant: 'grid1',
            testimonialsVariant: 'testimonial1',
            contactVariant: 'contact1',
            colorScheme: {
                primary: '#1f2937',
                secondary: '#374151',
                accent: '#3b82f6'
            },
            background: 'bg-gradient-to-br from-slate-50 to-blue-50'
        },
        'gujia-furniture': {
            heroVariant: 'hero2',
            statsVariant: 'stats2',
            productsVariant: 'showcase',
            testimonialsVariant: 'testimonial2',
            contactVariant: 'contact2',
            colorScheme: {
                primary: '#92400e',
                secondary: '#d97706',
                accent: '#f59e0b'
            },
            background: 'bg-gradient-to-br from-amber-50 to-orange-50'
        },
        'foxconn-technology': {
            heroVariant: 'hero3',
            statsVariant: 'stats3',
            productsVariant: 'grid2',
            testimonialsVariant: 'testimonial3',
            contactVariant: 'contact3',
            colorScheme: {
                primary: '#1e40af',
                secondary: '#3b82f6',
                accent: '#06b6d4'
            },
            background: 'bg-gradient-to-r from-blue-50 to-cyan-50'
        },
        'xugong-machinery': {
            heroVariant: 'hero4',
            statsVariant: 'stats1',
            productsVariant: 'carousel',
            testimonialsVariant: 'testimonial1',
            contactVariant: 'contact1',
            colorScheme: {
                primary: '#dc2626',
                secondary: '#ef4444',
                accent: '#f97316'
            },
            background: 'bg-gradient-to-br from-red-50 to-orange-50'
        },
        'yili-dairy': {
            heroVariant: 'hero2',
            statsVariant: 'stats2',
            productsVariant: 'grid1',
            testimonialsVariant: 'testimonial2',
            contactVariant: 'contact2',
            colorScheme: {
                primary: '#059669',
                secondary: '#10b981',
                accent: '#34d399'
            },
            background: 'bg-gradient-to-br from-green-50 to-emerald-50'
        },
        'byd-automotive': {
            heroVariant: 'hero3',
            statsVariant: 'stats3',
            productsVariant: 'showcase',
            testimonialsVariant: 'testimonial3',
            contactVariant: 'contact3',
            colorScheme: {
                primary: '#7c3aed',
                secondary: '#8b5cf6',
                accent: '#a78bfa'
            },
            background: 'bg-gradient-to-br from-purple-50 to-indigo-50'
        },
        'wanhua-chemical': {
            heroVariant: 'hero1',
            statsVariant: 'stats1',
            productsVariant: 'grid2',
            testimonialsVariant: 'testimonial1',
            contactVariant: 'contact1',
            colorScheme: {
                primary: '#0f766e',
                secondary: '#14b8a6',
                accent: '#5eead4'
            },
            background: 'bg-gradient-to-br from-teal-50 to-cyan-50'
        },
        'yuto-packaging': {
            heroVariant: 'hero2',
            statsVariant: 'stats2',
            productsVariant: 'carousel',
            testimonialsVariant: 'testimonial2',
            contactVariant: 'contact2',
            colorScheme: {
                primary: '#be185d',
                secondary: '#ec4899',
                accent: '#f9a8d4'
            },
            background: 'bg-gradient-to-br from-pink-50 to-rose-50'
        },
        'lining-sports': {
            heroVariant: 'hero4',
            statsVariant: 'stats3',
            productsVariant: 'grid1',
            testimonialsVariant: 'testimonial3',
            contactVariant: 'contact3',
            colorScheme: {
                primary: '#ea580c',
                secondary: '#fb923c',
                accent: '#fed7aa'
            },
            background: 'bg-gradient-to-br from-orange-50 to-amber-50'
        },
        'jingdezhen-ceramics': {
            heroVariant: 'hero1',
            statsVariant: 'stats2',
            productsVariant: 'showcase',
            testimonialsVariant: 'testimonial1',
            contactVariant: 'contact1',
            colorScheme: {
                primary: '#7c2d12',
                secondary: '#dc2626',
                accent: '#fbbf24'
            },
            background: 'bg-gradient-to-br from-amber-50 to-yellow-50'
        }
    }

    return configs[factoryId as keyof typeof configs] || configs['hailanzhi-garment']
}

export function FactoryProfile({ factory }: FactoryProfileProps) {
    const designConfig = getFactoryDesignConfig(factory.id)

    return (
        <div className={`min-h-screen ${designConfig.background}`}>
            {/* Hero Section */}
            <FactoryHero factory={factory} variant={designConfig.heroVariant} colorScheme={designConfig.colorScheme} />

            {/* Stats Section */}
            <FactoryStats factory={factory} variant={designConfig.statsVariant} colorScheme={designConfig.colorScheme} />

            {/* Products Section */}
            <FactoryProducts factory={factory} variant={designConfig.productsVariant} colorScheme={designConfig.colorScheme} />

            {/* Testimonials/Certifications */}
            <FactoryTestimonials factory={factory} variant={designConfig.testimonialsVariant} colorScheme={designConfig.colorScheme} />

            {/* Contact Section */}
            <FactoryContact factory={factory} variant={designConfig.contactVariant} colorScheme={designConfig.colorScheme} />
        </div>
    )
}
