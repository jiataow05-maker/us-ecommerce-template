# 美国市场独立站模板

这是一个专为美国市场设计的现代化电商独立站模板，使用 Next.js 14、TypeScript 和 Tailwind CSS 构建。

## ✨ 特性

- 🚀 **现代化技术栈**: Next.js 14 + TypeScript + Tailwind CSS
- 📱 **完全响应式**: 适配所有设备尺寸
- ⚡ **性能优化**: 图片优化、代码分割、SSR/SSG
- 🔍 **SEO友好**: 完整的SEO配置和结构化数据
- 🎨 **美观UI**: 现代化设计，符合美国用户审美
- 💳 **支付集成**: 预配置 Stripe 支付系统
- 📊 **分析工具**: Google Analytics 4 集成
- 🛡️ **安全性**: 内置安全头和最佳实践

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Heroicons
- **支付**: Stripe
- **分析**: Google Analytics 4
- **部署**: Vercel (推荐)

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
```

### 2. 环境配置

复制环境变量模板：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入你的配置：

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
```

### 3. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 📁 项目结构

```
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx          # 首页
│   ├── sitemap.ts        # 网站地图
│   └── robots.ts         # 爬虫配置
├── components/            # React 组件
│   ├── Header.tsx        # 头部导航
│   ├── Footer.tsx        # 页脚
│   ├── Hero.tsx          # 英雄区域
│   ├── Features.tsx      # 特性展示
│   ├── FeaturedProducts.tsx # 特色产品
│   ├── Testimonials.tsx  # 客户评价
│   ├── Newsletter.tsx    # 邮件订阅
│   └── Analytics.tsx     # 分析工具
├── lib/                  # 工具函数
│   └── seo.ts           # SEO 工具
├── public/              # 静态资源
└── styles/              # 样式文件
```

## 🎨 自定义配置

### 品牌颜色

在 `tailwind.config.js` 中修改主色调：

```javascript
colors: {
  primary: {
    // 修改这里的颜色值
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  }
}
```

### 网站信息

在 `app/layout.tsx` 中修改网站元信息：

```typescript
export const metadata: Metadata = {
  title: '你的网站名称',
  description: '你的网站描述',
  // ...
}
```

## 💳 支付配置

### Stripe 设置

1. 注册 [Stripe](https://stripe.com) 账户
2. 获取 API 密钥
3. 在 `.env.local` 中配置密钥
4. 测试支付流程

### 支持的支付方式

- 信用卡/借记卡
- Apple Pay
- Google Pay
- PayPal (需额外配置)

## 📊 分析和SEO

### Google Analytics 4

1. 创建 GA4 属性
2. 获取测量ID
3. 在 `.env.local` 中配置 `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### SEO 优化

- ✅ 自动生成网站地图
- ✅ 结构化数据
- ✅ Open Graph 标签
- ✅ Twitter Card
- ✅ 移动端优化

## 🚀 部署

### Vercel (推荐)

1. 推送代码到 GitHub
2. 连接 Vercel 账户
3. 导入项目
4. 配置环境变量
5. 部署

### 其他平台

- Netlify
- AWS Amplify
- Digital Ocean App Platform

## 🛡️ 安全性

- HTTPS 强制
- 安全头配置
- XSS 防护
- CSRF 保护
- 内容安全策略

## 📱 性能优化

- 图片自动优化
- 代码分割
- 预加载关键资源
- CDN 集成
- 缓存策略

## 🌐 美国市场优化

- 使用美国CDN节点
- 符合美国法律法规
- 本地化支付方式
- 美国时区支持
- 英语内容优化

## 📞 支持

如果你在使用过程中遇到问题，可以：

1. 查看文档
2. 提交 Issue
3. 联系技术支持

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**开始构建你的美国市场独立站！** 🚀
