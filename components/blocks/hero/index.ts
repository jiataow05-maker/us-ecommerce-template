// Hero 区块模板统一导出

export { Hero1, type Hero1Props } from './Hero1'
export { Hero2, type Hero2Props } from './Hero2'
export { Hero3, type Hero3Props } from './Hero3'
export { Hero4, type Hero4Props } from './Hero4'

// 便捷类型定义
export type HeroVariant = 'hero1' | 'hero2' | 'hero3' | 'hero4'

// Hero 模板映射
export const HERO_COMPONENTS = {
    hero1: 'Hero1',
    hero2: 'Hero2',
    hero3: 'Hero3',
    hero4: 'Hero4'
} as const

// Hero 模板描述
export const HERO_DESCRIPTIONS = {
    hero1: {
        name: '经典布局',
        description: '左文右图的经典英雄区布局，适合大多数商业网站',
        features: ['响应式设计', '统计数据展示', '双按钮配置', '图片装饰效果'],
        useCase: '企业官网、产品展示、服务介绍'
    },
    hero2: {
        name: '全屏背景',
        description: '沉浸式全屏背景英雄区，视觉冲击力强',
        features: ['图片/渐变背景', '居中内容', '特色功能列表', '滚动提示'],
        useCase: '品牌展示、创意网站、营销页面'
    },
    hero3: {
        name: '分屏设计',
        description: '现代分屏布局，支持多种右侧内容类型',
        features: ['动画效果', '信任指标', '多内容类型', '产品展示'],
        useCase: 'SaaS产品、应用展示、服务平台'
    },
    hero4: {
        name: '视频背景',
        description: '高级视频背景英雄区，极具视觉吸引力',
        features: ['视频控制', '视差滚动', '打字机效果', '粒子装饰'],
        useCase: '高端品牌、创意机构、产品发布'
    }
} as const
