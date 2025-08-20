'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    InformationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
    id: string
    type: NotificationType
    title: string
    message?: string
    duration?: number
    action?: {
        label: string
        onClick: () => void
    }
}

interface NotificationContextType {
    showNotification: (notification: Omit<Notification, 'id'>) => void
    showSuccess: (title: string, message?: string) => void
    showError: (title: string, message?: string) => void
    showWarning: (title: string, message?: string) => void
    showInfo: (title: string, message?: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context
}

interface NotificationItemProps {
    notification: Notification
    onRemove: (id: string) => void
}

function NotificationItem({ notification, onRemove }: NotificationItemProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        // 入场动画
        setTimeout(() => setIsVisible(true), 100)

        // 自动消失
        if (notification.duration !== 0) {
            const timer = setTimeout(() => {
                handleRemove()
            }, notification.duration || 5000)

            return () => clearTimeout(timer)
        }
    }, [notification.duration])

    const handleRemove = () => {
        setIsExiting(true)
        setTimeout(() => {
            onRemove(notification.id)
        }, 300)
    }

    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return <CheckCircleIcon className="w-5 h-5 text-green-500" />
            case 'error':
                return <XCircleIcon className="w-5 h-5 text-red-500" />
            case 'warning':
                return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
            case 'info':
                return <InformationCircleIcon className="w-5 h-5 text-blue-500" />
        }
    }

    const getBorderColor = () => {
        switch (notification.type) {
            case 'success':
                return 'border-l-green-500'
            case 'error':
                return 'border-l-red-500'
            case 'warning':
                return 'border-l-yellow-500'
            case 'info':
                return 'border-l-blue-500'
        }
    }

    return (
        <div
            className={`
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        bg-white border-l-4 ${getBorderColor()} rounded-lg shadow-lg p-4 mb-3 max-w-sm w-full
      `}
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                    {getIcon()}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                        {notification.title}
                    </h4>
                    {notification.message && (
                        <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                        </p>
                    )}

                    {notification.action && (
                        <button
                            onClick={notification.action.onClick}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500 mt-2"
                        >
                            {notification.action.label}
                        </button>
                    )}
                </div>

                <button
                    onClick={handleRemove}
                    className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <XMarkIcon className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </div>
    )
}

interface NotificationProviderProps {
    children: React.ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const showNotification = (notificationData: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        const notification: Notification = {
            id,
            duration: 5000,
            ...notificationData
        }

        setNotifications(prev => [...prev, notification])
    }

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    const showSuccess = (title: string, message?: string) => {
        showNotification({ type: 'success', title, message })
    }

    const showError = (title: string, message?: string) => {
        showNotification({ type: 'error', title, message })
    }

    const showWarning = (title: string, message?: string) => {
        showNotification({ type: 'warning', title, message })
    }

    const showInfo = (title: string, message?: string) => {
        showNotification({ type: 'info', title, message })
    }

    return (
        <NotificationContext.Provider
            value={{
                showNotification,
                showSuccess,
                showError,
                showWarning,
                showInfo
            }}
        >
            {children}

            {/* 通知容器 */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onRemove={removeNotification}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    )
}
