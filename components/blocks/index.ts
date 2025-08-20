// 统一导出所有区块组件

// Hero 英雄区组件
export * from './hero'

// Products 产品展示组件  
export * from './products'

// Testimonials 客户评价组件
export * from './testimonials'

// Pricing 价格表组件
export * from './pricing'

// Blog 博客文章组件
export * from './blog'

// Contact 联系表单组件
export * from './contact'

// Stats 统计数据组件
export * from './stats'

// 所有区块类型的统一类型定义
export type BlockVariant =
    | 'hero1' | 'hero2' | 'hero3' | 'hero4'
    | 'grid1' | 'grid2' | 'carousel' | 'showcase'
    | 'testimonial1' | 'testimonial2' | 'testimonial3'
    | 'pricing1' | 'pricing2' | 'pricing3'
    | 'blog-grid1' | 'blog-list' | 'blog-masonry'
    | 'contact1' | 'contact2' | 'contact3'
    | 'stats1' | 'stats2' | 'stats3'

// 区块分类
export const BLOCK_CATEGORIES = {
    hero: ['hero1', 'hero2', 'hero3', 'hero4'],
    products: ['grid1', 'grid2', 'carousel', 'showcase'],
    testimonials: ['testimonial1', 'testimonial2', 'testimonial3'],
    pricing: ['pricing1', 'pricing2', 'pricing3'],
    blog: ['blog-grid1', 'blog-list', 'blog-masonry'],
    contact: ['contact1', 'contact2', 'contact3'],
    stats: ['stats1', 'stats2', 'stats3']
} as const

// 所有区块组件的描述信息
export const ALL_BLOCK_DESCRIPTIONS = {
    // Hero 组件
    hero1: {
        category: 'hero',
        name: '经典布局',
        description: '左文右图的经典英雄区布局',
        features: ['响应式设计', '统计数据展示', '双按钮配置'],
        useCase: '企业官网、产品展示、服务介绍'
    },
    hero2: {
        category: 'hero',
        name: '全屏背景',
        description: '沉浸式全屏背景英雄区',
        features: ['图片/渐变背景', '居中内容', '特色功能列表'],
        useCase: '品牌展示、创意网站、营销页面'
    },
    hero3: {
        category: 'hero',
        name: '分屏设计',
        description: '现代分屏布局，支持多种右侧内容',
        features: ['动画效果', '信任指标', '多内容类型'],
        useCase: 'SaaS产品、应用展示、服务平台'
    },
    hero4: {
        category: 'hero',
        name: '视频背景',
        description: '高级视频背景英雄区',
        features: ['视频控制', '视差滚动', '打字机效果'],
        useCase: '高端品牌、创意机构、产品发布'
    },

    // Products 组件
    grid1: {
        category: 'products',
        name: '经典网格',
        description: '标准的3列网格布局产品展示',
        features: ['响应式网格', '快速操作', '评分展示'],
        useCase: '电商网站、产品目录、在线商店'
    },
    grid2: {
        category: 'products',
        name: '瀑布流布局',
        description: 'Pinterest风格的瀑布流展示',
        features: ['自适应高度', '无限滚动', '视觉冲击'],
        useCase: '创意产品、视觉展示、设计作品集'
    },
    carousel: {
        category: 'products',
        name: '横向轮播',
        description: '节省空间的轮播展示',
        features: ['自动轮播', '触摸滑动', '响应式显示'],
        useCase: '首页推荐、相关产品、空间有限场景'
    },
    showcase: {
        category: 'products',
        name: '大图展示',
        description: '高端产品详情展示',
        features: ['多图轮播', '变体选择', '详细规格'],
        useCase: '产品详情页、高端商品、详细展示'
    },

    // 其他组件...
} as const
