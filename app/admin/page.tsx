'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    EyeIcon,
    ChevronDownIcon,
    Squares2X2Icon,
    ListBulletIcon,
    BuildingOfficeIcon,
    MapPinIcon,
    UsersIcon,
    CalendarIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    EnvelopeIcon,
    ArrowLeftIcon,
    ShoppingCartIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { getAllFactories, getCategories, searchFactories, type Factory } from '@/lib/templates'

// 防抖Hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

// 排序类型
type SortOption = 'newest' | 'oldest' | 'employees' | 'capacity'

// 视图类型
type ViewMode = 'grid' | 'list'

// 获取工厂对应的高质量图片
function getFactoryImage(factoryId: string): string {
    const imageMap: Record<string, string> = {
        'hailanzhi-garment': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'gujia-furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'foxconn-electronics': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'xugong-machinery': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'yili-food': 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'byd-automotive': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'wanhua-chemical': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'yutong-packaging': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'lining-sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'jingdezhen-ceramics': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
    return imageMap[factoryId] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}

export default function AdminPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortOption, setSortOption] = useState<SortOption>('newest')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')

    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const categories = getCategories()

    // 处理工厂数据的筛选和排序
    const filteredAndSortedFactories = useMemo(() => {
        let result = getAllFactories()

        // 搜索筛选
        if (debouncedSearchQuery.trim() !== '') {
            result = searchFactories(debouncedSearchQuery)
        }

        // 分类筛选
        if (selectedCategory !== 'all') {
            result = result.filter(factory => factory.category === selectedCategory)
        }

        // 排序
        result.sort((a, b) => {
            switch (sortOption) {
                case 'newest':
                    return b.establishedYear - a.establishedYear
                case 'oldest':
                    return a.establishedYear - b.establishedYear
                case 'employees':
                    const aEmployees = parseInt(a.employees.replace(/[^0-9]/g, '')) || 0
                    const bEmployees = parseInt(b.employees.replace(/[^0-9]/g, '')) || 0
                    return bEmployees - aEmployees
                case 'capacity':
                    const aCapacity = parseInt(a.annualOutput.replace(/[^0-9]/g, '')) || 0
                    const bCapacity = parseInt(b.annualOutput.replace(/[^0-9]/g, '')) || 0
                    return bCapacity - aCapacity
                default:
                    return 0
            }
        })

        return result
    }, [debouncedSearchQuery, selectedCategory, sortOption])

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
    }, [])

    const handleCategoryFilter = useCallback((category: string) => {
        setSelectedCategory(category)
    }, [])

    // 获取分类的英文名称
    const getCategoryEnglishName = (category: string) => {
        const categoryMap: Record<string, string> = {
            '服装': 'Apparel',
            '家居用品': 'Furniture',
            '电子产品': 'Electronics',
            '机械设备': 'Machinery',
            '食品饮料': 'Food & Beverage',
            '汽车及配件': 'Automotive',
            '化工产品': 'Chemicals',
            '包装印刷': 'Packaging',
            '运动娱乐': 'Sports',
            '礼品工艺品': 'Crafts'
        }
        return categoryMap[category] || category
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* 工业风格导航栏 */}
            <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        {/* 左侧：返回主站按钮 */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-400 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                            >
                                <ArrowLeftIcon className="w-4 h-4 group-hover:text-amber-400 transition-colors duration-200" />
                                <span>Back to Store</span>
                            </Link>

                            <div className="hidden md:block w-px h-6 bg-slate-700"></div>

                            <div className="hidden md:flex items-center gap-3">
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                <span className="text-slate-300 text-sm font-medium">Manufacturing Command Center</span>
                            </div>
                        </div>

                        {/* 中间：品牌标识 */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                                <span className="text-slate-900 font-bold text-sm">US</span>
                            </div>
                            <span className="text-white font-bold text-lg hidden sm:block">Industrial Hub</span>
                        </div>

                        {/* 右侧：快速导航 */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/account"
                                className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
                            >
                                <UserIcon className="w-4 h-4" />
                                <span className="hidden sm:block">Account</span>
                            </Link>
                            <Link
                                href="/cart"
                                className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium relative"
                            >
                                <ShoppingCartIcon className="w-4 h-4" />
                                <span className="hidden sm:block">Cart</span>
                                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                                    0
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* 工业指挥中心头部 */}
            <div className="bg-slate-900 border-b border-slate-700">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        {/* 左侧：标题和统计 */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
                                    <BuildingOfficeIcon className="w-7 h-7 text-slate-900" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white mb-1">
                                        Global Manufacturing Command Center
                                    </h1>
                                    <p className="text-slate-300 text-lg">
                                        Real-time industrial partnership intelligence
                                    </p>
                                </div>
                            </div>

                            {/* 关键统计数据 */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="flex items-center gap-3">
                                    <ShieldCheckIcon className="w-5 h-5 text-amber-400" />
                                    <div>
                                        <div className="text-amber-400 font-bold text-lg">1,200+</div>
                                        <div className="text-slate-400 text-sm">Certified Partners</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ChartBarIcon className="w-5 h-5 text-amber-400" />
                                    <div>
                                        <div className="text-amber-400 font-bold text-lg">25+</div>
                                        <div className="text-slate-400 text-sm">Industries Covered</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BuildingOfficeIcon className="w-5 h-5 text-amber-400" />
                                    <div>
                                        <div className="text-amber-400 font-bold text-lg">Global</div>
                                        <div className="text-slate-400 text-sm">Supply Chain Ready</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 右侧：搜索和筛选 */}
                        <div className="lg:w-1/2">
                            <div className="space-y-4">
                                {/* 搜索框 */}
                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search manufacturers, products, locations..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors duration-200"
                                    />
                                </div>

                                {/* 分类筛选按钮组 */}
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleCategoryFilter('all')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedCategory === 'all'
                                            ? 'bg-amber-400 text-slate-900'
                                            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400'
                                            }`}
                                    >
                                        All Industries
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => handleCategoryFilter(category)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                                                ? 'bg-amber-400 text-slate-900'
                                                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400'
                                                }`}
                                        >
                                            {getCategoryEnglishName(category)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* 结果摘要和控制面板 */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-amber-400 rounded-full"></div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Manufacturing Directory</h2>
                            <p className="text-slate-300">
                                <span className="font-semibold text-amber-400">{filteredAndSortedFactories.length}</span> active manufacturing partners
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* 排序选择器 */}
                        <div className="relative">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="appearance-none bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 pr-8 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-sm"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="employees">Most Employees</option>
                                <option value="capacity">Highest Capacity</option>
                            </select>
                            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>

                        {/* 视图切换 */}
                        <div className="flex bg-slate-800 rounded-lg border border-slate-700 p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded transition-colors duration-200 ${viewMode === 'grid'
                                    ? 'bg-amber-400 text-slate-900'
                                    : 'text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                <Squares2X2Icon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded transition-colors duration-200 ${viewMode === 'list'
                                    ? 'bg-amber-400 text-slate-900'
                                    : 'text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                <ListBulletIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 工厂展示区域 */}
                {viewMode === 'grid' ? (
                    <div className="factory-grid">
                        {filteredAndSortedFactories.map((factory) => (
                            <Link
                                key={factory.id}
                                href={`/factories/${factory.id}`}
                                className="block bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-amber-400 transition-all duration-300 opacity-0 animate-fade-in group cursor-pointer transform hover:scale-105"
                                style={{ animationDelay: `${Math.random() * 200}ms` }}
                            >
                                {/* 工厂图片和基本信息 */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={getFactoryImage(factory.id)}
                                        alt={factory.englishName}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                                    {/* 覆盖在图片上的公司信息 */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-bold text-lg mb-1 leading-tight">
                                            {factory.englishName}
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                                            <MapPinIcon className="w-4 h-4" />
                                            <span>{factory.location}</span>
                                        </div>
                                    </div>

                                    {/* 行业标签 */}
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-lg">
                                            {getCategoryEnglishName(factory.category)}
                                        </span>
                                    </div>
                                </div>

                                {/* 卡片主体 */}
                                <div className="p-6">
                                    {/* 关键指标网格 */}
                                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-900 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-amber-400 font-bold text-lg">{factory.annualOutput}</div>
                                            <div className="text-slate-400 text-xs">Annual Output</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-amber-400 font-bold text-lg">{factory.employees}</div>
                                            <div className="text-slate-400 text-xs">Employees</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-amber-400 font-bold text-lg">{factory.establishedYear}</div>
                                            <div className="text-slate-400 text-xs">Founded</div>
                                        </div>
                                    </div>

                                    {/* 核心产品 */}
                                    <div className="mb-4">
                                        <h4 className="text-slate-300 text-sm font-medium mb-2">Core Products</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {factory.mainProducts.slice(0, 2).map((product, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded"
                                                >
                                                    {product}
                                                </span>
                                            ))}
                                            {factory.mainProducts.length > 2 && (
                                                <span className="text-slate-400 text-xs px-2 py-1">
                                                    +{factory.mainProducts.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* 认证 */}
                                    <div className="mb-6">
                                        <h4 className="text-slate-300 text-sm font-medium mb-2">Certifications</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {factory.certifications.slice(0, 2).map((cert, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded border border-slate-600"
                                                >
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 查看详情提示 */}
                                    <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium pt-2 border-t border-slate-700">
                                        <EyeIcon className="w-4 h-4" />
                                        <span>Click to view factory profile</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* 列表视图 */
                    <div className="space-y-4">
                        {filteredAndSortedFactories.map((factory) => (
                            <Link
                                key={factory.id}
                                href={`/factories/${factory.id}`}
                                className="block bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-amber-400 transition-all duration-300 opacity-0 animate-fade-in cursor-pointer transform hover:scale-102"
                                style={{ animationDelay: `${Math.random() * 200}ms` }}
                            >
                                <div className="flex items-center gap-6">
                                    {/* 工厂缩略图 */}
                                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                        <Image
                                            src={getFactoryImage(factory.id)}
                                            alt={factory.englishName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* 工厂信息 */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-white font-bold text-lg mb-1">
                                                    {factory.englishName}
                                                </h3>
                                                <p className="text-slate-400 text-sm">{factory.name}</p>
                                            </div>
                                            <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-lg">
                                                {getCategoryEnglishName(factory.category)}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                                <MapPinIcon className="w-4 h-4 text-slate-400" />
                                                <span>{factory.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                                <UsersIcon className="w-4 h-4 text-slate-400" />
                                                <span>{factory.employees}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                                <CalendarIcon className="w-4 h-4 text-slate-400" />
                                                <span>{factory.establishedYear}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                                <ChartBarIcon className="w-4 h-4 text-slate-400" />
                                                <span>{factory.annualOutput}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-1">
                                                {factory.mainProducts.slice(0, 3).map((product, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded"
                                                    >
                                                        {product}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                <EyeIcon className="w-4 h-4" />
                                                <span>Click to view profile</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* 空状态 */}
                {filteredAndSortedFactories.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <MagnifyingGlassIcon className="w-8 h-8 text-slate-600" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-300 mb-2">No manufacturers found</h3>
                        <p className="text-slate-400 max-w-md mx-auto">Adjust your search criteria or try different industry filters to discover manufacturing partners.</p>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                
                /* 确保网格布局正确显示 */
                .factory-grid {
                    display: grid;
                    grid-template-columns: repeat(1, minmax(0, 1fr));
                    gap: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .factory-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                
                @media (min-width: 1024px) {
                    .factory-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }
                
                @media (min-width: 1280px) {
                    .factory-grid {
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                    }
                }
            `}</style>
        </div>
    )
}