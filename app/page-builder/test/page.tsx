'use client'

export default function PageBuilderTestPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">✅</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    页面构建器测试
                </h1>
                <p className="text-gray-600 mb-6">
                    如果您能看到这个页面，说明基本路由工作正常。
                </p>
                <div className="space-y-3">
                    <a
                        href="/page-builder"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                        进入页面构建器
                    </a>
                    <a
                        href="/"
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                        返回首页
                    </a>
                </div>
            </div>
        </div>
    )
}
