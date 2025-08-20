'use client'

import { useEffect, useState } from 'react'
import {
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export function MobileWarning() {
    const [isMobile, setIsMobile] = useState(false)
    const [showWarning, setShowWarning] = useState(true)

    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth < 768
            setIsMobile(isMobileDevice)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (!isMobile || !showWarning) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">

                {/* 图标和标题 */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        移动端访问提醒
                    </h2>

                    <p className="text-gray-600">
                        页面构建器需要在桌面端使用以获得最佳体验
                    </p>
                </div>

                {/* 设备对比 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                        <DevicePhoneMobileIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-red-700">移动端</div>
                        <div className="text-xs text-red-600 mt-1">功能受限</div>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <ComputerDesktopIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-green-700">桌面端</div>
                        <div className="text-xs text-green-600 mt-1">完整体验</div>
                    </div>
                </div>

                {/* 建议 */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-blue-900 mb-2">💡 建议</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 使用电脑或平板（横屏）访问</li>
                        <li>• 确保屏幕宽度至少 768px</li>
                        <li>• 使用现代浏览器（Chrome、Firefox、Safari）</li>
                    </ul>
                </div>

                {/* 操作按钮 */}
                <div className="space-y-3">
                    <button
                        onClick={() => setShowWarning(false)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                        我了解，继续使用
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                        返回上一页
                    </button>
                </div>

                {/* 底部提示 */}
                <div className="mt-4 text-center text-xs text-gray-500">
                    <p>移动端可能出现布局错乱、功能异常等问题</p>
                </div>
            </div>
        </div>
    )
}
