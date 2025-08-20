# 部署指南

本指南将帮助你将独立站部署到生产环境，专门针对美国市场优化。

## 🚀 快速部署到 Vercel（推荐）

Vercel 是 Next.js 的官方推荐平台，在美国有多个CDN节点，非常适合美国市场。

### 步骤 1: 准备代码

```bash
# 确保代码已推送到 GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

### 步骤 2: 连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测到 Next.js 项目

### 步骤 3: 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_secret
```

### 步骤 4: 部署

点击 "Deploy" 按钮，Vercel 会自动构建和部署你的网站。

## 🌐 自定义域名

### 在 Vercel 中配置域名

1. 在项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

### DNS 配置示例

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 🔧 其他部署平台

### Netlify

```bash
npm run build
npm run export
```

然后将 `out` 文件夹拖到 Netlify 部署页面。

### AWS Amplify

1. 连接 GitHub 仓库
2. 构建设置：
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

## 📊 性能监控设置

### Google Analytics 4

1. 创建 GA4 属性
2. 获取测量 ID
3. 在环境变量中设置 `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Google Search Console

1. 验证网站所有权
2. 提交网站地图：`https://your-domain.com/sitemap.xml`
3. 监控搜索表现

### Core Web Vitals 监控

网站会自动收集性能数据，你可以在浏览器开发者工具中查看。

## 💳 支付系统配置

### Stripe 生产环境

1. 激活 Stripe 账户
2. 获取生产环境密钥
3. 配置 Webhook 端点：`https://your-domain.com/api/webhooks/stripe`
4. 测试支付流程

### 支付合规性

确保符合美国支付法规：
- PCI DSS 合规
- SSL 证书
- 隐私政策
- 服务条款

## 🛡️ 安全配置

### SSL 证书

Vercel 自动提供 SSL 证书，其他平台请确保启用 HTTPS。

### 安全头

项目已配置安全头，包括：
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- HSTS

### 环境变量安全

- 永远不要在客户端代码中暴露敏感信息
- 使用 `NEXT_PUBLIC_` 前缀的变量会暴露给客户端
- 敏感数据只在服务端使用

## 📈 SEO 优化

### 网站地图

网站地图会自动生成在 `/sitemap.xml`

### Robots.txt

已配置 `/robots.txt` 文件

### 结构化数据

项目包含了结构化数据配置，有助于搜索引擎理解内容。

## 🔄 持续集成/持续部署

### GitHub Actions 示例

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📱 PWA 配置

项目已配置为 PWA：
- Web App Manifest
- Service Worker（可选）
- 离线支持（可选）

## 🌍 CDN 和缓存

### Vercel Edge Network

Vercel 在美国有多个边缘节点：
- 东海岸：弗吉尼亚州
- 西海岸：加利福尼亚州
- 中部：德克萨斯州

### 缓存策略

- 静态资源：1年缓存
- API 响应：5分钟缓存
- 页面：1小时缓存

## 🚨 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本（需要 18+）
   - 确认所有依赖已安装
   - 检查 TypeScript 错误

2. **环境变量问题**
   - 确认变量名拼写正确
   - 重新部署以应用新的环境变量

3. **支付问题**
   - 确认 Stripe 密钥正确
   - 检查 Webhook 配置

### 性能问题

1. **页面加载慢**
   - 检查图片优化
   - 启用 CDN
   - 检查第三方脚本

2. **SEO 问题**
   - 确认元标签正确
   - 检查网站地图
   - 验证结构化数据

## 📞 技术支持

如果遇到部署问题，请检查：
1. 项目文档
2. 平台文档（Vercel/Netlify等）
3. 社区论坛

---

**祝你部署成功！** 🎉
