'use client'

import { StarIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { Factory } from '@/lib/templates'

interface FactoryTestimonialsProps {
    factory: Factory
    variant?: string
    colorScheme?: {
        primary: string
        secondary: string
        accent: string
    }
}

// 根据工厂生成相应的客户评价
function getTestimonials(factoryId: string) {
    const testimonialMap: Record<string, any[]> = {
        'hailanzhi-garment': [
            {
                name: 'Sarah Johnson',
                company: 'Fashion Forward Inc.',
                country: 'USA',
                text: 'Outstanding quality and timely delivery. Their attention to detail in garment manufacturing is exceptional.',
                rating: 5
            },
            {
                name: 'Marco Rodriguez',
                company: 'European Brands Ltd.',
                country: 'Spain',
                text: 'Professional team with excellent communication. They understand our brand requirements perfectly.',
                rating: 5
            }
        ],
        'foxconn-electronics': [
            {
                name: 'David Chen',
                company: 'TechVision Corp.',
                country: 'USA',
                text: 'World-class electronic manufacturing with cutting-edge technology. Highly recommended for complex products.',
                rating: 5
            },
            {
                name: 'Emma Williams',
                company: 'Innovation Electronics',
                country: 'UK',
                text: 'Reliable partner for electronic components. Their quality control is industry-leading.',
                rating: 5
            }
        ]
    }

    return testimonialMap[factoryId] || [
        {
            name: 'Michael Thompson',
            company: 'Global Manufacturing',
            country: 'USA',
            text: 'Excellent manufacturing partner with consistent quality and reliable delivery schedules.',
            rating: 5
        },
        {
            name: 'Anna Schmidt',
            company: 'European Industries',
            country: 'Germany',
            text: 'Professional service and high-quality products. Great communication throughout the process.',
            rating: 5
        }
    ]
}

export function FactoryTestimonials({ factory, variant = 'testimonial1', colorScheme }: FactoryTestimonialsProps) {
    const testimonials = getTestimonials(factory.id)

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Hear what our international partners say about our manufacturing excellence
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-gray-600">{testimonial.company} • {testimonial.country}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications Section */}
                <div className="bg-white rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-4">
                            <ShieldCheckIcon className="w-5 h-5" />
                            Quality Assured
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">International Certifications</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our commitment to quality is validated by internationally recognized certifications and standards
                        </p>
                    </div>

                    {/* Certifications Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {factory.certifications.map((cert, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                                        {cert.substring(0, 2)}
                                    </div>
                                </div>
                                <h4 className="font-semibold text-gray-900">{cert}</h4>
                                <p className="text-sm text-gray-600">Certified</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                        <div className="text-gray-600">Global Clients</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-green-600 mb-2">99.8%</div>
                        <div className="text-gray-600">Quality Rate</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                        <div className="text-gray-600">Countries Served</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
