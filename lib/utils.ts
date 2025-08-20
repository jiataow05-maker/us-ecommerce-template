import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 类名的工具函数
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * 格式化价格显示
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(price)
}

/**
 * 格式化日期
 */
export function formatDate(date: Date | string, locale: string = 'en-US'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(dateObj)
}

/**
 * 生成随机ID
 */
export function generateId(length: number = 8): string {
    return Math.random().toString(36).substring(2, 2 + length)
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * 检查是否为有效邮箱
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * 检查是否为有效手机号码（美国格式）
 */
export function isValidPhoneUS(phone: string): boolean {
    const phoneRegex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/
    return phoneRegex.test(phone)
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}

/**
 * 将字符串转换为URL友好的slug
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // 移除特殊字符
        .replace(/[\s_-]+/g, '-') // 替换空格和下划线为连字符
        .replace(/^-+|-+$/g, '') // 移除开头和结尾的连字符
}

/**
 * 计算两个日期之间的天数差
 */
export function daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay))
}

/**
 * 深拷贝对象
 */
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime()) as any
    if (obj instanceof Array) return obj.map(item => deepClone(item)) as any
    if (typeof obj === 'object') {
        const clonedObj: any = {}
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key])
            }
        }
        return clonedObj
    }
    return obj
}

/**
 * 本地存储工具
 */
export const storage = {
    get: (key: string) => {
        if (typeof window === 'undefined') return null
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch {
            return null
        }
    },
    set: (key: string, value: any) => {
        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // Handle quota exceeded error
        }
    },
    remove: (key: string) => {
        if (typeof window === 'undefined') return
        localStorage.removeItem(key)
    },
}

/**
 * 获取设备类型
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop'

    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
}

/**
 * 复制文本到剪贴板
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    if (!navigator.clipboard) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            document.body.removeChild(textArea)
            return true
        } catch {
            document.body.removeChild(textArea)
            return false
        }
    }

    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        return false
    }
}
