// Blog 区块模板统一导出

export { BlogGrid1, type BlogGrid1Props, type BlogPost } from './BlogGrid1'
export { BlogList, type BlogListProps } from './BlogList'
export { BlogMasonry, type BlogMasonryProps } from './BlogMasonry'

// 便捷类型定义
export type BlogVariant = 'grid1' | 'list' | 'masonry'

// Blog 模板映射
export const BLOG_COMPONENTS = {
    grid1: 'BlogGrid1',
    list: 'BlogList',
    masonry: 'BlogMasonry'
} as const

// Blog 模板描述
export const BLOG_DESCRIPTIONS = {
    grid1: {
        name: '网格布局',
        description: '响应式网格布局，丰富的文章信息展示',
        features: ['响应式网格', '分类筛选', '搜索功能', '元数据展示'],
        useCase: '企业博客、新闻网站、内容平台'
    },
    list: {
        name: '列表布局',
        description: '传统列表布局，适合文字为主的博客',
        features: ['列表布局', '图文并茂', '简洁设计', '易于阅读'],
        useCase: '个人博客、文章列表、新闻列表'
    },
    masonry: {
        name: '瀑布流',
        description: 'Pinterest风格瀑布流，视觉丰富的展示',
        features: ['瀑布流布局', '自适应高度', '视觉冲击', '创意展示'],
        useCase: '设计博客、创意展示、视觉内容'
    }
} as const
