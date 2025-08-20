import type { Metadata } from 'next'
import { getFactoryById } from '@/lib/templates'

interface FactoryLayoutProps {
    children: React.ReactNode
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const factory = getFactoryById(params.id)

    if (!factory) {
        return {
            title: 'Factory Not Found',
            description: 'The requested factory could not be found.'
        }
    }

    return {
        title: `${factory.englishName} | Manufacturing Excellence`,
        description: factory.description,
        robots: {
            index: true,
            follow: true,
        }
    }
}

export default function FactoryLayout({ children }: FactoryLayoutProps) {
    return <>{children}</>
}
