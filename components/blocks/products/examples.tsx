// Products 区块使用示例

import {
    ProductGrid1Props,
    ProductGrid2Props,
    ProductCarouselProps,
    ProductShowcaseProps,
    Product
} from './index'

// 示例产品数据
const sampleProducts: Product[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro Max',
        description: '配备A17 Pro芯片的专业级智能手机，拥有钛金属设计和48MP主摄像头',
        price: 9999,
        originalPrice: 10999,
        currency: '¥',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        category: '智能手机',
        rating: 5,
        reviewCount: 1256,
        badge: {
            text: '热销',
            type: 'hot'
        },
        inStock: true,
        href: '/products/iphone-15-pro-max'
    },
    {
        id: '2',
        name: 'MacBook Pro 16英寸',
        description: 'M3 Max芯片驱动的专业级笔记本电脑，适合创意工作者',
        price: 19999,
        originalPrice: 21999,
        currency: '¥',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        category: '笔记本电脑',
        rating: 5,
        reviewCount: 892,
        badge: {
            text: '新品',
            type: 'new'
        },
        inStock: true,
        href: '/products/macbook-pro-16'
    },
    {
        id: '3',
        name: 'AirPods Pro 2',
        description: '主动降噪无线耳机，支持空间音频和自适应透明模式',
        price: 1899,
        currency: '¥',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        category: '音频设备',
        rating: 4,
        reviewCount: 2341,
        inStock: true,
        href: '/products/airpods-pro-2'
    },
    {
        id: '4',
        name: 'iPad Air',
        description: 'M2芯片驱动的全面屏平板电脑，支持Apple Pencil 2',
        price: 4399,
        currency: '¥',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        category: '平板电脑',
        rating: 4,
        reviewCount: 567,
        badge: {
            text: '特价',
            type: 'sale'
        },
        inStock: true,
        href: '/products/ipad-air'
    },
    {
        id: '5',
        name: 'Apple Watch Ultra 2',
        description: '极限运动智能手表，钛金属表壳，100米防水',
        price: 6399,
        currency: '¥',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        category: '智能手表',
        rating: 5,
        reviewCount: 423,
        inStock: true,
        href: '/products/apple-watch-ultra-2'
    },
    {
        id: '6',
        name: 'Studio Display',
        description: '27英寸5K Retina显示器，内置A13仿生芯片',
        price: 11499,
        currency: '¥',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        category: '显示器',
        rating: 4,
        reviewCount: 234,
        inStock: true,
        href: '/products/studio-display'
    }
]

// ProductGrid1 使用示例
export const productGrid1Example: ProductGrid1Props = {
    title: {
        main: "热销产品",
        subtitle: "精选最受欢迎的科技产品，品质保证，快速发货",
        alignment: "center"
    },
    products: sampleProducts,
    layout: {
        columns: {
            mobile: 1,
            tablet: 2,
            desktop: 3
        },
        spacing: "normal",
        showFilters: true
    },
    interaction: {
        hoverEffect: "lift",
        showQuickActions: true,
        showWishlist: true,
        animation: true
    },
    display: {
        showRating: true,
        showBadge: true,
        showDescription: false,
        showCategory: true,
        priceFormat: "default"
    }
}

// ProductGrid2 使用示例
export const productGrid2Example: ProductGrid2Props = {
    title: {
        main: "创意产品集",
        subtitle: "发现更多精彩产品，每一件都值得拥有",
        alignment: "center"
    },
    products: sampleProducts,
    layout: {
        columns: {
            mobile: 2,
            tablet: 3,
            desktop: 4
        },
        minItemHeight: 300,
        maxItemHeight: 500,
        spacing: "normal"
    },
    interaction: {
        loadMore: {
            enabled: true,
            buttonText: "加载更多产品",
            loadingText: "正在加载..."
        },
        infiniteScroll: false,
        animation: {
            enabled: true,
            stagger: true
        }
    },
    display: {
        showPrice: true,
        showRating: true,
        showCategory: true,
        imageAspect: "auto",
        overlayStyle: "gradient"
    }
}

// ProductCarousel 使用示例
export const productCarouselExample: ProductCarouselProps = {
    title: {
        main: "推荐产品",
        subtitle: "为您精心挑选的优质产品",
        alignment: "left"
    },
    products: sampleProducts,
    carousel: {
        itemsPerView: {
            mobile: 1,
            tablet: 2,
            desktop: 4
        },
        spacing: 16,
        autoplay: {
            enabled: true,
            delay: 5000,
            pauseOnHover: true
        },
        loop: true,
        navigation: {
            arrows: true,
            dots: true,
            position: "outside"
        }
    },
    card: {
        style: "detailed",
        showQuickActions: true,
        hoverEffect: "lift",
        borderRadius: "medium"
    },
    display: {
        showPrice: true,
        showRating: true,
        showCategory: true,
        showDescription: false,
        showBadge: true
    }
}

// ProductShowcase 使用示例
export const productShowcaseExample: ProductShowcaseProps = {
    featuredProduct: {
        ...sampleProducts[0],
        images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        features: [
            'A17 Pro 芯片，性能提升 20%',
            '48MP 三摄系统，支持 5x 光学变焦',
            '钛金属设计，更轻更耐用',
            '支持 USB-C 接口',
            '电池续航提升至 29 小时',
            '支持 MagSafe 无线充电'
        ],
        specifications: {
            '屏幕尺寸': '6.7 英寸',
            '分辨率': '2796 x 1290 像素',
            '处理器': 'A17 Pro 芯片',
            '存储容量': '256GB / 512GB / 1TB',
            '摄像头': '48MP 主摄 + 12MP 超广角 + 12MP 长焦',
            '电池续航': '最长 29 小时视频播放',
            '防水等级': 'IP68',
            '重量': '221 克'
        },
        variants: [
            {
                id: 'storage-256',
                name: '存储容量',
                value: '256GB'
            },
            {
                id: 'storage-512',
                name: '存储容量',
                value: '512GB'
            },
            {
                id: 'storage-1tb',
                name: '存储容量',
                value: '1TB'
            },
            {
                id: 'color-black',
                name: '颜色',
                value: '深空黑色'
            },
            {
                id: 'color-white',
                name: '颜色',
                value: '原色钛金属'
            },
            {
                id: 'color-blue',
                name: '颜色',
                value: '蓝色钛金属'
            }
        ]
    },
    relatedProducts: sampleProducts.slice(1, 5),
    layout: {
        imagePosition: "left",
        thumbnailPosition: "bottom",
        showRelatedProducts: true,
        relatedProductsTitle: "您可能还喜欢"
    },
    display: {
        showFeatures: true,
        showSpecifications: true,
        showVariants: true,
        showSocialShare: true,
        showZoom: true,
        showFullscreen: true
    },
    interaction: {
        enableImageZoom: true,
        enableThumbnailPreview: true,
        animation: true
    }
}
