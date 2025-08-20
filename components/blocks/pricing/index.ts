// Pricing 区块模板统一导出

export { Pricing1, type Pricing1Props, type PricingPlan } from './Pricing1'
export { Pricing2, type Pricing2Props, type PricingCard } from './Pricing2'
export { Pricing3, type Pricing3Props, type PricingPlanWithPeriods } from './Pricing3'

// 便捷类型定义
export type PricingVariant = 'pricing1' | 'pricing2' | 'pricing3'

// Pricing 模板映射
export const PRICING_COMPONENTS = {
    pricing1: 'Pricing1',
    pricing2: 'Pricing2',
    pricing3: 'Pricing3'
} as const

// Pricing 模板描述
export const PRICING_DESCRIPTIONS = {
    pricing1: {
        name: '经典对比表',
        description: 'SaaS标准的3列对比定价表，功能清晰对比',
        features: ['月付年付切换', '功能对比', '推荐标签', '清晰布局'],
        useCase: 'SaaS产品、订阅服务、软件工具'
    },
    pricing2: {
        name: '卡片式定价',
        description: '现代化卡片设计，视觉友好的定价展示',
        features: ['卡片设计', '渐变背景', '客户证言', '关键指标'],
        useCase: '创意服务、设计工具、高端产品'
    },
    pricing3: {
        name: '切换式定价',
        description: '灵活的计费周期切换，支持多种定价模式',
        features: ['多种周期', '动态价格', '附加服务', '使用限制'],
        useCase: '企业服务、B2B产品、定制解决方案'
    }
} as const
