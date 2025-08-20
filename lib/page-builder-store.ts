import { create } from 'zustand'
import { nanoid } from 'nanoid'

// 页面元素类型定义
export interface PageElement {
    id: string
    type: string // 组件类型，如 'hero1', 'product-grid1' 等
    props: Record<string, any> // 组件的配置属性
    position: number // 在页面中的位置
    visible: boolean
    locked: boolean
}

// 页面数据结构
export interface PageData {
    id: string
    name: string
    elements: PageElement[]
    metadata: {
        title: string
        description: string
        createdAt: string
        updatedAt: string
    }
}

// 编辑器状态
interface PageBuilderState {
    // 当前页面数据
    currentPage: PageData | null

    // 编辑器状态
    selectedElement: string | null
    draggedElement: string | null
    isPreviewMode: boolean
    showPropertyPanel: boolean

    // 历史记录 (撤销/重做)
    history: PageData[]
    historyIndex: number

    // 组件库分类
    currentCategory: string

    // Actions
    setCurrentPage: (page: PageData) => void
    createElement: (type: string, props?: Record<string, any>, position?: number) => void
    updateElement: (id: string, updates: Partial<PageElement>) => void
    deleteElement: (id: string) => void
    duplicateElement: (id: string) => void
    reorderElements: (oldIndex: number, newIndex: number) => void

    selectElement: (id: string | null) => void
    setDraggedElement: (id: string | null) => void
    togglePreviewMode: () => void
    togglePropertyPanel: () => void

    setCurrentCategory: (category: string) => void

    // 历史记录操作
    saveHistory: () => void
    undo: () => void
    redo: () => void
    canUndo: () => boolean
    canRedo: () => boolean

    // 页面操作
    createNewPage: (name: string) => PageData
    savePage: () => void
    exportPage: () => string
    importPage: (pageJson: string) => void
}

// 创建默认页面
const createDefaultPage = (): PageData => ({
    id: nanoid(),
    name: '未命名页面',
    elements: [],
    metadata: {
        title: '未命名页面',
        description: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
})

export const usePageBuilderStore = create<PageBuilderState>((set, get) => ({
    // 初始状态
    currentPage: createDefaultPage(),
    selectedElement: null,
    draggedElement: null,
    isPreviewMode: false,
    showPropertyPanel: true,
    history: [],
    historyIndex: -1,
    currentCategory: 'hero',

    // 页面操作
    setCurrentPage: (page) => {
        set({ currentPage: page })
        get().saveHistory()
    },

    createElement: (type, props = {}, position) => {
        const state = get()
        if (!state.currentPage) return

        const insertPosition = position !== undefined ? position : state.currentPage.elements.length

        const newElement: PageElement = {
            id: nanoid(),
            type,
            props,
            position: insertPosition,
            visible: true,
            locked: false
        }

        // 如果指定了位置，需要调整其他元素的位置
        const updatedElements = position !== undefined
            ? [
                ...state.currentPage.elements.slice(0, insertPosition),
                newElement,
                ...state.currentPage.elements.slice(insertPosition)
            ].map((element, index) => ({ ...element, position: index }))
            : [...state.currentPage.elements, newElement]

        const updatedPage = {
            ...state.currentPage,
            elements: updatedElements,
            metadata: {
                ...state.currentPage.metadata,
                updatedAt: new Date().toISOString()
            }
        }

        set({
            currentPage: updatedPage,
            selectedElement: newElement.id
        })
        get().saveHistory()
    },

    updateElement: (id, updates) => {
        const state = get()
        if (!state.currentPage) return

        const updatedElements = state.currentPage.elements.map(element =>
            element.id === id ? { ...element, ...updates } : element
        )

        const updatedPage = {
            ...state.currentPage,
            elements: updatedElements,
            metadata: {
                ...state.currentPage.metadata,
                updatedAt: new Date().toISOString()
            }
        }

        set({ currentPage: updatedPage })
        get().saveHistory()
    },

    deleteElement: (id) => {
        const state = get()
        if (!state.currentPage) return

        const filteredElements = state.currentPage.elements
            .filter(element => element.id !== id)
            .map((element, index) => ({ ...element, position: index }))

        const updatedPage = {
            ...state.currentPage,
            elements: filteredElements,
            metadata: {
                ...state.currentPage.metadata,
                updatedAt: new Date().toISOString()
            }
        }

        set({
            currentPage: updatedPage,
            selectedElement: state.selectedElement === id ? null : state.selectedElement
        })
        get().saveHistory()
    },

    duplicateElement: (id) => {
        const state = get()
        if (!state.currentPage) return

        const elementToDuplicate = state.currentPage.elements.find(el => el.id === id)
        if (!elementToDuplicate) return

        const newElement: PageElement = {
            ...elementToDuplicate,
            id: nanoid(),
            position: elementToDuplicate.position + 1
        }

        const updatedElements = [
            ...state.currentPage.elements.slice(0, elementToDuplicate.position + 1),
            newElement,
            ...state.currentPage.elements.slice(elementToDuplicate.position + 1)
        ].map((element, index) => ({ ...element, position: index }))

        const updatedPage = {
            ...state.currentPage,
            elements: updatedElements,
            metadata: {
                ...state.currentPage.metadata,
                updatedAt: new Date().toISOString()
            }
        }

        set({
            currentPage: updatedPage,
            selectedElement: newElement.id
        })
        get().saveHistory()
    },

    reorderElements: (oldIndex, newIndex) => {
        const state = get()
        if (!state.currentPage) return

        const elements = [...state.currentPage.elements]
        const [removed] = elements.splice(oldIndex, 1)
        elements.splice(newIndex, 0, removed)

        const reorderedElements = elements.map((element, index) => ({
            ...element,
            position: index
        }))

        const updatedPage = {
            ...state.currentPage,
            elements: reorderedElements,
            metadata: {
                ...state.currentPage.metadata,
                updatedAt: new Date().toISOString()
            }
        }

        set({ currentPage: updatedPage })
        get().saveHistory()
    },

    // 编辑器状态
    selectElement: (id) => set({ selectedElement: id }),
    setDraggedElement: (id) => set({ draggedElement: id }),
    togglePreviewMode: () => set(state => ({
        isPreviewMode: !state.isPreviewMode,
        selectedElement: null
    })),
    togglePropertyPanel: () => set(state => ({
        showPropertyPanel: !state.showPropertyPanel
    })),

    setCurrentCategory: (category) => set({ currentCategory: category }),

    // 历史记录
    saveHistory: () => {
        const state = get()
        if (!state.currentPage) return

        const newHistory = state.history.slice(0, state.historyIndex + 1)
        newHistory.push(JSON.parse(JSON.stringify(state.currentPage)))

        // 限制历史记录数量
        if (newHistory.length > 50) {
            newHistory.shift()
        }

        set({
            history: newHistory,
            historyIndex: newHistory.length - 1
        })
    },

    undo: () => {
        const state = get()
        if (!state.canUndo()) return

        const newIndex = state.historyIndex - 1
        set({
            currentPage: JSON.parse(JSON.stringify(state.history[newIndex])),
            historyIndex: newIndex,
            selectedElement: null
        })
    },

    redo: () => {
        const state = get()
        if (!state.canRedo()) return

        const newIndex = state.historyIndex + 1
        set({
            currentPage: JSON.parse(JSON.stringify(state.history[newIndex])),
            historyIndex: newIndex,
            selectedElement: null
        })
    },

    canUndo: () => {
        const state = get()
        return state.historyIndex > 0
    },

    canRedo: () => {
        const state = get()
        return state.historyIndex < state.history.length - 1
    },

    // 页面管理
    createNewPage: (name) => {
        const newPage: PageData = {
            id: nanoid(),
            name,
            elements: [],
            metadata: {
                title: name,
                description: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        }

        set({ currentPage: newPage })
        get().saveHistory()
        return newPage
    },

    savePage: () => {
        const state = get()
        if (!state.currentPage) return

        // 这里可以添加保存到服务器的逻辑
        localStorage.setItem('pagebuilder_current_page', JSON.stringify(state.currentPage))
        console.log('页面已保存到本地存储')
    },

    exportPage: () => {
        const state = get()
        if (!state.currentPage) return ''

        return JSON.stringify(state.currentPage, null, 2)
    },

    importPage: (pageJson) => {
        try {
            const pageData = JSON.parse(pageJson) as PageData
            set({ currentPage: pageData })
            get().saveHistory()
        } catch (error) {
            console.error('导入页面失败:', error)
        }
    }
}))

// 组件类型配置
export const COMPONENT_TYPES = {
    hero: [
        { type: 'hero1', name: '经典布局', icon: '🎯', description: '左文右图经典布局' },
        { type: 'hero2', name: '全屏背景', icon: '🌟', description: '沉浸式全屏背景' },
        { type: 'hero3', name: '分屏设计', icon: '📱', description: '现代分屏布局' },
        { type: 'hero4', name: '视频背景', icon: '🎬', description: '动态视频背景' }
    ],
    products: [
        { type: 'grid1', name: '网格布局', icon: '📊', description: '经典3列网格' },
        { type: 'grid2', name: '瀑布流', icon: '🌊', description: 'Pinterest风格' },
        { type: 'carousel', name: '轮播展示', icon: '🎠', description: '横向轮播' },
        { type: 'showcase', name: '大图展示', icon: '🖼️', description: '详情展示' }
    ],
    testimonials: [
        { type: 'testimonial1', name: '卡片轮播', icon: '💬', description: '卡片式轮播' },
        { type: 'testimonial2', name: '全屏证言', icon: '🎭', description: '沉浸式证言' },
        { type: 'testimonial3', name: '多列展示', icon: '📋', description: '网格多列' }
    ],
    pricing: [
        { type: 'pricing1', name: '对比表', icon: '📋', description: '经典3列对比' },
        { type: 'pricing2', name: '卡片定价', icon: '💳', description: '现代卡片式' },
        { type: 'pricing3', name: '切换定价', icon: '🔄', description: '灵活切换' }
    ],
    blog: [
        { type: 'blog-grid1', name: '网格博客', icon: '📰', description: '网格布局' },
        { type: 'blog-list', name: '列表博客', icon: '📝', description: '列表布局' },
        { type: 'blog-masonry', name: '瀑布流', icon: '📚', description: '瀑布流布局' }
    ],
    contact: [
        { type: 'contact1', name: '简单表单', icon: '📞', description: '基础联系表单' },
        { type: 'contact2', name: '完整表单', icon: '🗺️', description: '表单+地图' },
        { type: 'contact3', name: '多步表单', icon: '📋', description: '分步骤表单' }
    ],
    stats: [
        { type: 'stats1', name: '数字展示', icon: '📊', description: '横向数字' },
        { type: 'stats2', name: '卡片统计', icon: '💹', description: '彩色卡片' },
        { type: 'stats3', name: '进度统计', icon: '📈', description: '进度条式' }
    ]
} as const

export const COMPONENT_CATEGORIES = [
    { key: 'hero', name: '英雄区', icon: '🎯', color: 'bg-blue-500' },
    { key: 'products', name: '产品展示', icon: '🛍️', color: 'bg-green-500' },
    { key: 'testimonials', name: '客户评价', icon: '💬', color: 'bg-purple-500' },
    { key: 'pricing', name: '价格表', icon: '💰', color: 'bg-yellow-500' },
    { key: 'blog', name: '博客文章', icon: '📰', color: 'bg-red-500' },
    { key: 'contact', name: '联系表单', icon: '📞', color: 'bg-indigo-500' },
    { key: 'stats', name: '统计数据', icon: '📊', color: 'bg-pink-500' }
] as const
