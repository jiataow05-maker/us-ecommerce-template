export interface Factory {
    id: string
    name: string
    englishName: string
    description: string
    category: string
    location: string
    establishedYear: number
    employees: string
    annualOutput: string
    mainProducts: string[]
    certifications: string[]
    preview: string
    thumbnail: string
    colors: {
        primary: string
        secondary: string
    }
    contact: {
        phone: string
        email: string
        website: string
        address: string
    }
    status: 'active' | 'draft' | 'archived'
    createdAt: string
    updatedAt: string
}

// 中国真实工厂数据 - 基于阿里巴巴分类体系
export const factories: Factory[] = [
    {
        id: 'hailanzhi-garment',
        name: '海澜之家服饰有限公司',
        englishName: 'Heilan Home Garment Co., Ltd.',
        description: '中国领先的男装品牌制造商，拥有完整的服装产业链和现代化生产基地',
        category: '服装',
        location: '江苏省无锡市',
        establishedYear: 1997,
        employees: '10000+',
        annualOutput: '5000万件',
        mainProducts: ['男装', '休闲装', '商务装', '童装'],
        certifications: ['ISO9001', 'OEKO-TEX', 'BSCI', 'WRAP'],
        preview: '/factory-previews/hailanzhi-garment.jpg',
        thumbnail: '/factory-previews/hailanzhi-garment-thumb.jpg',
        colors: {
            primary: '#1f2937',
            secondary: '#374151'
        },
        contact: {
            phone: '+86-510-8888-8888',
            email: 'export@hla.com.cn',
            website: 'www.hla.com.cn',
            address: '江苏省无锡市新吴区梅村工业园'
        },
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-08-20'
    },
    {
        id: 'gujia-furniture',
        name: '顾家家居股份有限公司',
        englishName: 'Kuka Home Co., Ltd.',
        description: '亚洲领先的家具制造企业，专注软体家具研发、生产与销售',
        category: '家居用品',
        location: '浙江省杭州市',
        establishedYear: 1982,
        employees: '15000+',
        annualOutput: '200万套',
        mainProducts: ['沙发', '床垫', '软床', '定制家具'],
        certifications: ['ISO9001', 'FSC', 'CFC', '绿色产品认证'],
        preview: '/factory-previews/gujia-furniture.jpg',
        thumbnail: '/factory-previews/gujia-furniture-thumb.jpg',
        colors: {
            primary: '#b45309',
            secondary: '#92400e'
        },
        contact: {
            phone: '+86-571-8888-8888',
            email: 'export@kukahome.com',
            website: 'www.kukahome.com',
            address: '浙江省杭州市余杭区南苑街道'
        },
        status: 'active',
        createdAt: '2024-01-20',
        updatedAt: '2024-08-18'
    },
    {
        id: 'foxconn-electronics',
        name: '富士康科技集团',
        englishName: 'Foxconn Technology Group',
        description: '全球最大的电子制造服务商，为世界知名品牌提供代工生产服务',
        category: '电子产品',
        location: '广东省深圳市',
        establishedYear: 1988,
        employees: '100万+',
        annualOutput: '3亿台设备',
        mainProducts: ['智能手机', '平板电脑', '笔记本电脑', '服务器'],
        certifications: ['ISO9001', 'ISO14001', 'OHSAS18001', 'IATF16949'],
        preview: '/factory-previews/foxconn-electronics.jpg',
        thumbnail: '/factory-previews/foxconn-electronics-thumb.jpg',
        colors: {
            primary: '#2563eb',
            secondary: '#1e40af'
        },
        contact: {
            phone: '+86-755-2888-8888',
            email: 'export@foxconn.com',
            website: 'www.foxconn.com',
            address: '广东省深圳市宝安区龙华新区'
        },
        status: 'active',
        createdAt: '2024-02-01',
        updatedAt: '2024-08-15'
    },
    {
        id: 'xugong-machinery',
        name: '徐工集团工程机械有限公司',
        englishName: 'XCMG Group',
        description: '中国工程机械行业排头兵企业，全球工程机械制造商50强',
        category: '机械设备',
        location: '江苏省徐州市',
        establishedYear: 1989,
        employees: '30000+',
        annualOutput: '10万台设备',
        mainProducts: ['挖掘机', '起重机', '装载机', '压路机'],
        certifications: ['ISO9001', 'CE', 'EPA', 'GOST'],
        preview: '/factory-previews/xugong-machinery.jpg',
        thumbnail: '/factory-previews/xugong-machinery-thumb.jpg',
        colors: {
            primary: '#059669',
            secondary: '#047857'
        },
        contact: {
            phone: '+86-516-8888-8888',
            email: 'export@xcmg.com',
            website: 'www.xcmg.com',
            address: '江苏省徐州市泉山区建国西路1号'
        },
        status: 'active',
        createdAt: '2024-02-10',
        updatedAt: '2024-08-12'
    },
    {
        id: 'yili-food',
        name: '内蒙古伊利实业集团股份有限公司',
        englishName: 'Inner Mongolia Yili Industrial Group Co., Ltd.',
        description: '中国乳业龙头企业，亚洲第一、全球第五大乳品公司',
        category: '食品饮料',
        location: '内蒙古呼和浩特市',
        establishedYear: 1993,
        employees: '80000+',
        annualOutput: '1000万吨',
        mainProducts: ['液态奶', '奶粉', '酸奶', '冷饮'],
        certifications: ['ISO9001', 'HACCP', 'BRC', 'IFS'],
        preview: '/factory-previews/yili-food.jpg',
        thumbnail: '/factory-previews/yili-food-thumb.jpg',
        colors: {
            primary: '#ea580c',
            secondary: '#c2410c'
        },
        contact: {
            phone: '+86-471-3388888',
            email: 'export@yili.com',
            website: 'www.yili.com',
            address: '内蒙古呼和浩特市金山开发区金山大街1号'
        },
        status: 'active',
        createdAt: '2024-02-15',
        updatedAt: '2024-08-10'
    },
    {
        id: 'byd-automotive',
        name: '比亚迪汽车有限公司',
        englishName: 'BYD Auto Co., Ltd.',
        description: '中国新能源汽车领军企业，全球电池和新能源汽车技术领导者',
        category: '汽车及配件',
        location: '广东省深圳市',
        establishedYear: 2003,
        employees: '50000+',
        annualOutput: '300万辆',
        mainProducts: ['新能源汽车', '动力电池', '汽车零部件', '充电设备'],
        certifications: ['ISO9001', 'TS16949', 'ISO14001', 'VDA6.3'],
        preview: '/factory-previews/byd-automotive.jpg',
        thumbnail: '/factory-previews/byd-automotive-thumb.jpg',
        colors: {
            primary: '#dc2626',
            secondary: '#991b1b'
        },
        contact: {
            phone: '+86-755-8988-8888',
            email: 'export@byd.com',
            website: 'www.byd.com',
            address: '广东省深圳市坪山区比亚迪路3009号'
        },
        status: 'active',
        createdAt: '2024-03-01',
        updatedAt: '2024-08-08'
    },
    {
        id: 'wanhua-chemical',
        name: '万华化学集团股份有限公司',
        englishName: 'Wanhua Chemical Group Co., Ltd.',
        description: '全球领先的MDI供应商，中国化工行业领军企业',
        category: '化工产品',
        location: '山东省烟台市',
        establishedYear: 1998,
        employees: '25000+',
        annualOutput: '500万吨',
        mainProducts: ['聚氨酯', 'MDI', 'TDI', '石化产品'],
        certifications: ['ISO9001', 'ISO14001', 'OHSAS18001', 'RC14001'],
        preview: '/factory-previews/wanhua-chemical.jpg',
        thumbnail: '/factory-previews/wanhua-chemical-thumb.jpg',
        colors: {
            primary: '#7c3aed',
            secondary: '#6d28d9'
        },
        contact: {
            phone: '+86-535-8888888',
            email: 'export@whchem.com',
            website: 'www.whchem.com',
            address: '山东省烟台市幸福南路7号'
        },
        status: 'active',
        createdAt: '2024-03-10',
        updatedAt: '2024-08-05'
    },
    {
        id: 'yutong-packaging',
        name: '裕同科技股份有限公司',
        englishName: 'Yuto Packaging Technology Co., Ltd.',
        description: '中国包装印刷行业领军企业，为全球知名品牌提供包装解决方案',
        category: '包装印刷',
        location: '广东省深圳市',
        establishedYear: 2002,
        employees: '20000+',
        annualOutput: '50亿个包装',
        mainProducts: ['彩盒包装', '标签印刷', '环保包装', '智能包装'],
        certifications: ['ISO9001', 'FSC', 'SEDEX', 'Disney FAMA'],
        preview: '/factory-previews/yutong-packaging.jpg',
        thumbnail: '/factory-previews/yutong-packaging-thumb.jpg',
        colors: {
            primary: '#16a34a',
            secondary: '#15803d'
        },
        contact: {
            phone: '+86-755-2788-8888',
            email: 'export@yuto.com.cn',
            website: 'www.yuto.com.cn',
            address: '广东省深圳市龙岗区南湾街道布澜路31号'
        },
        status: 'active',
        createdAt: '2024-03-20',
        updatedAt: '2024-08-02'
    },
    {
        id: 'lining-sports',
        name: '李宁（中国）体育用品有限公司',
        englishName: 'Li-Ning (China) Sports Goods Co., Ltd.',
        description: '中国领先的体育品牌公司，专业从事体育用品设计、研发、制造和销售',
        category: '运动娱乐',
        location: '北京市',
        establishedYear: 1990,
        employees: '8000+',
        annualOutput: '5000万件',
        mainProducts: ['运动鞋', '运动服装', '运动配件', '专业装备'],
        certifications: ['ISO9001', 'ISO14001', 'BSCI', 'WRAP'],
        preview: '/factory-previews/lining-sports.jpg',
        thumbnail: '/factory-previews/lining-sports-thumb.jpg',
        colors: {
            primary: '#ef4444',
            secondary: '#dc2626'
        },
        contact: {
            phone: '+86-10-5888-8888',
            email: 'export@li-ning.com.cn',
            website: 'www.li-ning.com.cn',
            address: '北京市通州区中关村科技园区通州园光机电一体化产业基地'
        },
        status: 'active',
        createdAt: '2024-04-01',
        updatedAt: '2024-07-30'
    },
    {
        id: 'jingdezhen-ceramics',
        name: '景德镇陶瓷集团有限责任公司',
        englishName: 'Jingdezhen Ceramics Group Co., Ltd.',
        description: '中国陶瓷工艺美术的代表企业，千年瓷都的现代化陶瓷制造基地',
        category: '礼品工艺品',
        location: '江西省景德镇市',
        establishedYear: 1958,
        employees: '5000+',
        annualOutput: '2000万件',
        mainProducts: ['艺术陶瓷', '日用陶瓷', '工艺礼品', '定制陶瓷'],
        certifications: ['ISO9001', '中国陶瓷工艺美术大师', '非物质文化遗产'],
        preview: '/factory-previews/jingdezhen-ceramics.jpg',
        thumbnail: '/factory-previews/jingdezhen-ceramics-thumb.jpg',
        colors: {
            primary: '#0891b2',
            secondary: '#0e7490'
        },
        contact: {
            phone: '+86-798-8888888',
            email: 'export@jdztc.com',
            website: 'www.jdztc.com',
            address: '江西省景德镇市珠山区新厂街道'
        },
        status: 'active',
        createdAt: '2024-04-10',
        updatedAt: '2024-07-25'
    }
]

// 获取所有工厂
export function getAllFactories(): Factory[] {
    return factories
}

// 根据ID获取工厂
export function getFactoryById(id: string): Factory | undefined {
    return factories.find(factory => factory.id === id)
}

// 根据分类获取工厂
export function getFactoriesByCategory(category: string): Factory[] {
    return factories.filter(factory => factory.category === category)
}

// 获取所有分类
export function getCategories(): string[] {
    const categories = new Set(factories.map(factory => factory.category))
    return Array.from(categories)
}

// 搜索工厂
export function searchFactories(query: string): Factory[] {
    const lowercaseQuery = query.toLowerCase()
    return factories.filter(factory =>
        factory.name.toLowerCase().includes(lowercaseQuery) ||
        factory.englishName.toLowerCase().includes(lowercaseQuery) ||
        factory.description.toLowerCase().includes(lowercaseQuery) ||
        factory.category.toLowerCase().includes(lowercaseQuery) ||
        factory.location.toLowerCase().includes(lowercaseQuery) ||
        factory.mainProducts.some(product => product.toLowerCase().includes(lowercaseQuery))
    )
}

// 模板相关类型和函数（为了兼容性）
export interface Template {
    id: string
    name: string
    description: string
    preview: string
    category: string
}

// 兼容性函数 - 将工厂数据作为模板使用
export function getTemplateById(id: string): Template | undefined {
    const factory = getFactoryById(id)
    if (!factory) return undefined
    
    return {
        id: factory.id,
        name: factory.englishName,
        description: factory.description,
        preview: factory.preview,
        category: factory.category
    }
}

export function getAllTemplates(): Template[] {
    return factories.map(factory => ({
        id: factory.id,
        name: factory.englishName,
        description: factory.description,
        preview: factory.preview,
        category: factory.category
    }))
}
