'use client'

import { getTemplateById } from '@/lib/templates'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Testimonials } from '@/components/Testimonials'
import { Newsletter } from '@/components/Newsletter'

interface TemplatePreviewProps {
    templateId: string
}

export function TemplatePreview({ templateId }: TemplatePreviewProps) {
    const template = getTemplateById(templateId)

    if (!template) {
        return (
            <div className="h-96 flex items-center justify-center text-gray-500">
                模板未找到
            </div>
        )
    }

    // 根据不同工厂模板ID渲染不同的内容
    const renderTemplateContent = () => {
        switch (templateId) {
            case 'textile-manufacturing':
                return (
                    <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%] overflow-hidden">
                        <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                            {/* 纺织制造模板 */}
                            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 relative">
                                <div className="absolute inset-0 opacity-10">
                                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center"></div>
                                </div>
                                <div className="container-custom text-center relative">
                                    <h1 className="text-5xl font-bold mb-4">专业纺织制造</h1>
                                    <p className="text-xl mb-8">20年专业经验 • 年产能1000万件 • 服务全球500+品牌</p>
                                    <div className="flex justify-center gap-4">
                                        <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold">
                                            查看产线
                                        </button>
                                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                                            获取报价
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-16 bg-gray-50">
                                <div className="container-custom">
                                    <div className="grid grid-cols-4 gap-8 text-center">
                                        <div><div className="text-3xl font-bold text-red-600">20+</div><div className="text-gray-600">年制造经验</div></div>
                                        <div><div className="text-3xl font-bold text-red-600">500+</div><div className="text-gray-600">合作品牌</div></div>
                                        <div><div className="text-3xl font-bold text-red-600">1000万</div><div className="text-gray-600">年产能（件）</div></div>
                                        <div><div className="text-3xl font-bold text-red-600">ISO9001</div><div className="text-gray-600">质量认证</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'electronics-manufacturing':
                return (
                    <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%] overflow-hidden">
                        <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                            {/* 电子制造模板 */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 relative">
                                <div className="absolute inset-0 opacity-10">
                                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center"></div>
                                </div>
                                <div className="container-custom text-center relative">
                                    <h1 className="text-5xl font-bold mb-4">精密电子制造</h1>
                                    <p className="text-xl mb-8">10万级无尘车间 • SMT全自动产线 • 24小时质量监控</p>
                                    <div className="flex justify-center gap-4">
                                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">
                                            参观工厂
                                        </button>
                                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                                            技术咨询
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-16 bg-gray-50">
                                <div className="container-custom">
                                    <div className="grid grid-cols-4 gap-8 text-center">
                                        <div><div className="text-3xl font-bold text-blue-600">10万级</div><div className="text-gray-600">无尘车间</div></div>
                                        <div><div className="text-3xl font-bold text-blue-600">12条</div><div className="text-gray-600">SMT产线</div></div>
                                        <div><div className="text-3xl font-bold text-blue-600">99.8%</div><div className="text-gray-600">良品率</div></div>
                                        <div><div className="text-3xl font-bold text-blue-600">ISO14001</div><div className="text-gray-600">环境认证</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'machinery-manufacturing':
                return (
                    <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%] overflow-hidden">
                        <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                            {/* 机械制造模板 */}
                            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20 relative">
                                <div className="absolute inset-0 opacity-10">
                                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center"></div>
                                </div>
                                <div className="container-custom text-center relative">
                                    <h1 className="text-5xl font-bold mb-4">重工机械制造</h1>
                                    <p className="text-xl mb-8">30年制造经验 • 大型CNC加工中心 • 定制化解决方案</p>
                                    <div className="flex justify-center gap-4">
                                        <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold">
                                            设备展示
                                        </button>
                                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                                            定制方案
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-16 bg-gray-50">
                                <div className="container-custom">
                                    <div className="grid grid-cols-4 gap-8 text-center">
                                        <div><div className="text-3xl font-bold text-green-600">30+</div><div className="text-gray-600">年制造经验</div></div>
                                        <div><div className="text-3xl font-bold text-green-600">50台</div><div className="text-gray-600">CNC设备</div></div>
                                        <div><div className="text-3xl font-bold text-green-600">±0.01mm</div><div className="text-gray-600">加工精度</div></div>
                                        <div><div className="text-3xl font-bold text-green-600">CE</div><div className="text-gray-600">欧盟认证</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'chemical-manufacturing':
                return (
                    <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%] overflow-hidden">
                        <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                            {/* 化工制造模板 */}
                            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 relative">
                                <div className="container-custom text-center relative">
                                    <h1 className="text-5xl font-bold mb-4">安全化工制造</h1>
                                    <p className="text-xl mb-8">环保生产 • 严格质控 • 安全第一 • 绿色发展</p>
                                    <div className="flex justify-center gap-4">
                                        <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold">
                                            安全认证
                                        </button>
                                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                                            产品目录
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-16 bg-gray-50">
                                <div className="container-custom">
                                    <div className="grid grid-cols-4 gap-8 text-center">
                                        <div><div className="text-3xl font-bold text-purple-600">零事故</div><div className="text-gray-600">安全生产</div></div>
                                        <div><div className="text-3xl font-bold text-purple-600">ISO45001</div><div className="text-gray-600">安全认证</div></div>
                                        <div><div className="text-3xl font-bold text-purple-600">100%</div><div className="text-gray-600">环保达标</div></div>
                                        <div><div className="text-3xl font-bold text-purple-600">24/7</div><div className="text-gray-600">监控系统</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'furniture-manufacturing':
                return (
                    <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%] overflow-hidden">
                        <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                            {/* 家具制造模板 */}
                            <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-20 relative">
                                <div className="absolute inset-0 opacity-10">
                                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center"></div>
                                </div>
                                <div className="container-custom text-center relative">
                                    <h1 className="text-5xl font-bold mb-4">精工家具制造</h1>
                                    <p className="text-xl mb-8">实木工艺 • 环保材料 • 定制设计 • 全球配送</p>
                                    <div className="flex justify-center gap-4">
                                        <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold">
                                            工艺展示
                                        </button>
                                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                                            定制服务
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'food-processing':
                return (
                    <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%] overflow-hidden">
                        <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                            {/* 食品加工模板 */}
                            <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
                                <div className="container-custom text-center">
                                    <h1 className="text-5xl font-bold mb-4">安全食品加工</h1>
                                    <p className="text-xl mb-8">HACCP认证 • 全程冷链 • 营养健康 • 品质保证</p>
                                    <div className="flex justify-center gap-4">
                                        <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold">
                                            质量体系
                                        </button>
                                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                                            产品展示
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%] overflow-hidden">
                        <div style={{ '--primary-600': template.colors.primary } as React.CSSProperties}>
                            <Hero />
                            <Features />
                            <FeaturedProducts />
                            <Testimonials />
                            <Newsletter />
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="h-[600px] overflow-hidden bg-gray-50">
            {renderTemplateContent()}
        </div>
    )
}
