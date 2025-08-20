// Hero 区块使用示例

import { Hero1Props, Hero2Props, Hero3Props, Hero4Props } from './index'

// Hero1 使用示例
export const hero1Example: Hero1Props = {
    title: {
        main: "优质产品",
        highlight: "快速交付"
    },
    description: "发现我们精心挑选的优质产品系列，享受有保障的品质和闪电般的美国境内配送服务。",
    buttons: {
        primary: {
            text: "立即购买",
            href: "/products",
            icon: true
        },
        secondary: {
            text: "了解更多",
            href: "/about",
            variant: "button"
        }
    },
    image: {
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        alt: "优质产品展示",
        width: 800,
        height: 600
    },
    stats: [
        { value: "50K+", label: "满意客户" },
        { value: "1-2天", label: "快速配送" },
        { value: "99.9%", label: "满意度" },
        { value: "24/7", label: "客户支持" }
    ],
    layout: {
        imagePosition: "right",
        contentAlignment: "left",
        backgroundColor: "bg-white"
    }
}

// Hero2 使用示例
export const hero2Example: Hero2Props = {
    background: {
        type: "gradient",
        gradient: {
            from: "#3b82f6",
            to: "#1e40af",
            direction: "to-br"
        }
    },
    content: {
        subtitle: "🚀 全新产品发布",
        title: {
            main: "改变世界的",
            highlight: "创新产品"
        },
        description: "体验前所未有的产品创新，让科技改变您的生活方式。加入我们，一起创造未来。",
        buttons: {
            primary: {
                text: "开始体验",
                href: "/get-started"
            },
            secondary: {
                text: "观看演示",
                href: "/demo",
                variant: "outline",
                icon: "play"
            }
        }
    },
    features: [
        { icon: "⚡", text: "极速性能" },
        { icon: "🔒", text: "安全可靠" },
        { icon: "🌍", text: "全球服务" },
        { icon: "💎", text: "高端品质" }
    ],
    layout: {
        textAlign: "center",
        maxWidth: "lg",
        minHeight: "screen"
    }
}

// Hero3 使用示例
export const hero3Example: Hero3Props = {
    leftContent: {
        badge: {
            text: "🏆 行业领先",
            color: "primary"
        },
        title: {
            main: "专业的",
            highlight: "解决方案"
        },
        description: "为您的企业提供量身定制的专业解决方案，助力业务增长和数字化转型。",
        features: [
            { text: "专业团队支持", icon: "check" },
            { text: "7x24小时服务", icon: "check" },
            { text: "定制化方案", icon: "star" },
            { text: "数据安全保障", icon: "check" }
        ],
        buttons: {
            primary: {
                text: "免费咨询",
                href: "/consultation"
            },
            secondary: {
                text: "查看案例",
                href: "/cases"
            }
        },
        trustIndicators: {
            rating: {
                value: 5,
                max: 5,
                reviewCount: "1,200+ 评价"
            },
            customers: "10,000+",
            security: "ISO 27001 认证"
        }
    },
    rightContent: {
        type: "product",
        product: {
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            name: "企业级解决方案",
            price: "¥999/月",
            oldPrice: "¥1,299/月",
            rating: 5,
            badge: "热销"
        }
    },
    layout: {
        backgroundColor: "bg-gray-50",
        spacing: "normal",
        animation: true
    }
}

// Hero4 使用示例  
export const hero4Example: Hero4Props = {
    video: {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        autoplay: true,
        loop: true,
        muted: true
    },
    content: {
        pretitle: "欢迎来到未来",
        title: {
            main: "创新无界限",
            highlight: "梦想成真",
            animated: true
        },
        subtitle: "用科技的力量点亮创意，用创新的思维改变世界",
        buttons: {
            primary: {
                text: "开启旅程",
                href: "/journey",
                size: "large"
            },
            secondary: {
                text: "观看故事",
                href: "/story",
                variant: "outline",
                icon: "play"
            }
        },
        scrollHint: {
            text: "向下滚动探索更多",
            show: true
        }
    },
    overlay: {
        type: "gradient",
        opacity: 50
    },
    animation: {
        parallax: true,
        fadeIn: true,
        stagger: true
    },
    controls: {
        showPlayButton: true,
        showMuteButton: true,
        position: "bottom-right"
    }
}
