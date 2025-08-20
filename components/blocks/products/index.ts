// Products 区块模板统一导出

export { ProductGrid1, type ProductGrid1Props, type Product } from './ProductGrid1'
export { ProductGrid2, type ProductGrid2Props } from './ProductGrid2'
export { ProductCarousel, type ProductCarouselProps } from './ProductCarousel'
export { ProductShowcase, type ProductShowcaseProps } from './ProductShowcase'

// 便捷类型定义
export type ProductVariant = 'grid1' | 'grid2' | 'carousel' | 'showcase'

// Product 模板映射
export const PRODUCT_COMPONENTS = {
    grid1: 'ProductGrid1',
    grid2: 'ProductGrid2',
    carousel: 'ProductCarousel',
    showcase: 'ProductShowcase'
} as const

// Product 模板描述
export const PRODUCT_DESCRIPTIONS = {
    grid1: {
        name: '经典网格',
        description: '标准的3列网格布局，适合电商产品展示',
        features: ['响应式网格', '快速操作', '评分展示', '收藏功能'],
        useCase: '电商网站、产品目录、在线商店'
    },
    grid2: {
        name: '瀑布流布局',
        description: 'Pinterest风格的瀑布流展示，视觉效果丰富',
        features: ['自适应高度', '无限滚动', '视觉冲击', '流畅动画'],
        useCase: '创意产品、视觉展示、设计作品集'
    },
    carousel: {
        name: '横向轮播',
        description: '节省空间的轮播展示，支持自动播放',
        features: ['自动轮播', '触摸滑动', '响应式显示', '多种样式'],
        useCase: '首页推荐、相关产品、空间有限场景'
    },
    showcase: {
        name: '大图展示',
        description: '高端产品详情展示，支持多图和变体选择',
        features: ['多图轮播', '变体选择', '详细规格', '相关推荐'],
        useCase: '产品详情页、高端商品、详细展示'
    }
} as const
