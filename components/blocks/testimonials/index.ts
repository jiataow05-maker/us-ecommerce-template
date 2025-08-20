// Testimonials 区块模板统一导出

export { Testimonial1, type Testimonial1Props, type Testimonial } from './Testimonial1'
export { Testimonial2, type Testimonial2Props, type TestimonialWithVideo } from './Testimonial2'
export { Testimonial3, type Testimonial3Props } from './Testimonial3'

// 便捷类型定义
export type TestimonialVariant = 'testimonial1' | 'testimonial2' | 'testimonial3'

// Testimonial 模板映射
export const TESTIMONIAL_COMPONENTS = {
  testimonial1: 'Testimonial1',
  testimonial2: 'Testimonial2',
  testimonial3: 'Testimonial3'
} as const

// Testimonial 模板描述
export const TESTIMONIAL_DESCRIPTIONS = {
  testimonial1: {
    name: '卡片式轮播',
    description: '清晰的卡片布局，流畅的轮播展示客户评价',
    features: ['轮播动画', '评分展示', '客户信息', '响应式布局'],
    useCase: '首页推荐、产品页面、服务展示'
  },
  testimonial2: {
    name: '全屏证言',
    description: '沉浸式全屏展示，强烈的视觉冲击力和信任感',
    features: ['全屏展示', '视频支持', '社交证明', '高端体验'],
    useCase: '着陆页、品牌展示、重要产品发布'
  },
  testimonial3: {
    name: '多列展示',
    description: '网格/瀑布流多列布局，展示大量客户评价',
    features: ['多列布局', '瀑布流', '统计信息', '社会证明'],
    useCase: '关于我们页、客户案例、信任建立'
  }
} as const
