import Link from 'next/link'
import {
  CubeTransparentIcon,
  PaintBrushIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const features = [
    {
      icon: CubeTransparentIcon,
      title: '组件化设计',
      description: '23个精心设计的区块组件，自由组合构建任何页面'
    },
    {
      icon: PaintBrushIcon,
      title: '拖拽式编辑',
      description: '类似PPT的直观操作，无需代码即可创建专业网站'
    },
    {
      icon: SparklesIcon,
      title: '实时预览',
      description: '所见即所得的编辑体验，支持多设备预览'
    },
    {
      icon: RocketLaunchIcon,
      title: '快速部署',
      description: '一键导出页面代码，轻松部署到任何平台'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">网站构建器</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/templates"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                模板画廊
              </Link>
              <Link
                href="/hero-demo"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                组件演示
              </Link>
              <Link
                href="/page-builder"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                开始构建
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              像制作 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">PPT</span> 一样
              <br />
              创建专业网站
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              拖拽式可视化编辑器，23个精美组件，无需编程知识，
              让每个人都能创建出色的网站。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/page-builder"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 开始免费构建
              </Link>
              <Link
                href="/templates"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 transition-all"
              >
                🎨 浏览模板画廊
              </Link>
            </div>

            {/* 截图预览 */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="ml-4 text-sm text-gray-600">页面构建器</div>
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">🎨</div>
                    <div className="text-lg font-medium">拖拽式页面构建器界面</div>
                    <div className="text-sm mt-2">点击"开始构建"体验完整功能</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              为什么选择我们的构建器？
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              结合现代技术与直观设计，让网站创建变得简单而强大
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 组件展示 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              丰富的组件库
            </h2>
            <p className="text-lg text-gray-600">
              23个专业设计的组件，覆盖所有常见页面需求
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { emoji: '🎯', name: '英雄区', count: 4 },
              { emoji: '🛍️', name: '产品展示', count: 4 },
              { emoji: '💬', name: '客户评价', count: 3 },
              { emoji: '💰', name: '价格表', count: 3 },
              { emoji: '📰', name: '博客文章', count: 3 },
              { emoji: '📞', name: '联系表单', count: 3 },
              { emoji: '📊', name: '统计数据', count: 3 }
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{category.emoji}</div>
                <div className="font-medium text-gray-900 text-sm">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} 个组件</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <Link
              href="/templates"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mr-4"
            >
              <span>浏览模板画廊</span>
              <span>→</span>
            </Link>
            <Link
              href="/hero-demo"
              className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>查看所有组件</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            准备开始创建您的网站了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            无需任何技术背景，几分钟内就能创建出专业级的网站
          </p>
          <Link
            href="/page-builder"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            立即开始构建 →
          </Link>
        </div>
      </section>

      {/* 底部 */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2024 网站构建器. 基于 React + Next.js + Tailwind CSS 构建</p>
        </div>
      </footer>
    </div>
  )
}