'use client'

import Link from 'next/link'
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline'

export function BackToHallButton() {
    return (
        <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
        >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <HomeIcon className="w-4 h-4" />
            <span className="font-medium">返回大厅</span>
        </Link>
    )
}
