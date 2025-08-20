'use client'

import Image from 'next/image'
import { Factory } from '@/lib/templates'

interface FactoryProductsProps {
    factory: Factory
    variant?: string
    colorScheme?: {
        primary: string
        secondary: string
        accent: string
    }
}

// 根据工厂类型生成相关产品图片
function getProductImages(factoryId: string): string[] {
    const productImageMap: Record<string, string[]> = {
        'hailanzhi-garment': [
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'gujia-furniture': [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'foxconn-electronics': [
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'xugong-machinery': [
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1553029459-669-a89368c34f0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    }

    return productImageMap[factoryId] || [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
}

export function FactoryProducts({ factory, variant = 'grid1', colorScheme }: FactoryProductsProps) {
    const productImages = getProductImages(factory.id)

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Portfolio</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our comprehensive range of high-quality products manufactured with precision and care
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {factory.mainProducts.slice(0, 4).map((product, index) => (
                        <div key={index} className="group">
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4">
                                <Image
                                    src={productImages[index] || productImages[0]}
                                    alt={product}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 text-center">{product}</h3>
                        </div>
                    ))}
                </div>

                {/* Additional Products */}
                {factory.mainProducts.length > 4 && (
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Product Lines</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {factory.mainProducts.slice(4).map((product, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="font-medium text-gray-900">{product}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Production Capabilities */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h3 className="text-3xl font-bold mb-4">Production Capabilities</h3>
                    <p className="text-xl mb-6 opacity-90">
                        Annual production capacity of <span className="font-bold">{factory.annualOutput}</span> with state-of-the-art manufacturing facilities
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`mailto:${factory.contact.email}?subject=Product Inquiry - ${factory.englishName}`}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                        >
                            Request Product Catalog
                        </a>
                        <a
                            href={`mailto:${factory.contact.email}?subject=Custom Manufacturing Inquiry - ${factory.englishName}`}
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
                        >
                            Custom Manufacturing
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
