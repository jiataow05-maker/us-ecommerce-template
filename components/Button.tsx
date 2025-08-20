import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    children: React.ReactNode
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
        secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 focus:ring-primary-500',
        outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    }

    return (
        <button
            className={cn(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <LoadingSpinner
                    size="sm"
                    color={variant === 'primary' ? 'white' : 'primary'}
                    className="mr-2"
                />
            )}
            {children}
        </button>
    )
}
