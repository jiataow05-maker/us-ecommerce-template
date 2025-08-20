import { notFound } from 'next/navigation'
import { getFactoryById } from '@/lib/templates'
import { FactoryProfile } from '@/components/factories/FactoryProfile'

interface FactoryPageProps {
    params: {
        id: string
    }
}

export default function FactoryPage({ params }: FactoryPageProps) {
    const factory = getFactoryById(params.id)

    if (!factory) {
        notFound()
    }

    return <FactoryProfile factory={factory} />
}

// 生成静态路径
export async function generateStaticParams() {
    // 这里应该返回所有工厂的ID
    const factoryIds = [
        'hailanzhi-garment',
        'gujia-furniture',
        'foxconn-electronics',
        'xugong-machinery',
        'yili-food',
        'byd-automotive',
        'wanhua-chemical',
        'yutong-packaging',
        'lining-sports',
        'jingdezhen-ceramics'
    ]

    return factoryIds.map((id) => ({
        id: id,
    }))
}
