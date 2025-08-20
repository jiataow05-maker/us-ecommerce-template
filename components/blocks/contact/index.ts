// Contact 区块模板统一导出

export { Contact1, type Contact1Props } from './Contact1'
export { Contact2, type Contact2Props } from './Contact2'
export { Contact3, type Contact3Props } from './Contact3'

// 便捷类型定义
export type ContactVariant = 'contact1' | 'contact2' | 'contact3'

// Contact 模板映射
export const CONTACT_COMPONENTS = {
    contact1: 'Contact1',
    contact2: 'Contact2',
    contact3: 'Contact3'
} as const

// Contact 模板描述
export const CONTACT_DESCRIPTIONS = {
    contact1: {
        name: '简单表单',
        description: '基础的联系表单，简洁直接',
        features: ['基础字段', '简洁设计', '快速提交', '响应式'],
        useCase: '简单咨询、意见反馈、一般联系'
    },
    contact2: {
        name: '表单 + 地图',
        description: '完整的联系页面，包含表单和地图',
        features: ['详细表单', '联系信息', '地图展示', '多种联系方式'],
        useCase: '企业联系页、门店展示、客户服务'
    },
    contact3: {
        name: '多步骤表单',
        description: '分步骤的详细咨询表单，适合复杂需求',
        features: ['分步引导', '详细信息', '需求分析', '项目评估'],
        useCase: '项目咨询、定制服务、B2B业务'
    }
} as const
