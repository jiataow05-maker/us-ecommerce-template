// Stats 区块模板统一导出

export { Stats1, type Stats1Props, type StatItem } from './Stats1'
export { Stats2, type Stats2Props, type StatCard } from './Stats2'
export { Stats3, type Stats3Props, type ProgressStat } from './Stats3'

// 便捷类型定义
export type StatsVariant = 'stats1' | 'stats2' | 'stats3'

// Stats 模板映射
export const STATS_COMPONENTS = {
    stats1: 'Stats1',
    stats2: 'Stats2',
    stats3: 'Stats3'
} as const

// Stats 模板描述
export const STATS_DESCRIPTIONS = {
    stats1: {
        name: '横向数字展示',
        description: '简洁的数字统计展示，支持数字动画',
        features: ['数字动画', '多列布局', '图标支持', '简洁设计'],
        useCase: '关键指标、业绩展示、数据概览'
    },
    stats2: {
        name: '卡片式统计',
        description: '彩色卡片设计，支持趋势变化展示',
        features: ['渐变背景', '趋势指标', '图标展示', '悬停效果'],
        useCase: '仪表板、数据面板、业务统计'
    },
    stats3: {
        name: '进度条统计',
        description: '进度条形式展示数据，适合目标完成度',
        features: ['进度动画', '目标对比', '详细描述', '百分比显示'],
        useCase: '目标达成、技能展示、项目进度'
    }
} as const
