import type { Metadata } from 'next'
import { Analytics } from '@/components/Analytics'

export const metadata: Metadata = {
    title: 'Global Manufacturing Command Center | Industrial Hub',
    description: 'Advanced manufacturing partnership intelligence platform. Connect with verified industrial leaders worldwide.',
    robots: {
        index: false, // Admin pages shouldn't be indexed
        follow: false,
    }
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <Analytics />
        </>
    )
}
