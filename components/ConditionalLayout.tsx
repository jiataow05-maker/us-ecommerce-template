'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

interface ConditionalLayoutProps {
    children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname()
    const isAdminPage = pathname?.startsWith('/admin')

    // 如果是admin页面，只渲染children，不加Header和Footer
    if (isAdminPage) {
        return <>{children}</>
    }

    // 普通页面渲染完整布局
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}
