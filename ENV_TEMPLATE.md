# 环境变量配置模板

## 必需的环境变量配置

```env
# 网站基础配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Store Name

# Google Analytics 4 (必需 - 美国市场分析)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe 支付配置 (必需 - 美国支付处理)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# 美国税务配置 (推荐)
NEXT_PUBLIC_TAX_RATE=0.0875  # 纽约州税率示例
STRIPE_TAX_CALCULATION=true

# 邮件服务 (客户通知)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# 数据库 (订单存储)
DATABASE_URL=postgresql://username:password@localhost:5432/your_db

# 安全配置
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=https://your-domain.com

# 第三方服务 (可选)
SHIPPO_API_TOKEN=your_shippo_token  # 物流追踪
FACEBOOK_PIXEL_ID=your_facebook_pixel  # 广告追踪
```

## 配置说明

### 必需配置
1. **STRIPE_** 变量 - 支付处理
2. **NEXT_PUBLIC_GA_MEASUREMENT_ID** - 网站分析
3. **NEXT_PUBLIC_SITE_URL** - 网站域名

### 推荐配置  
4. **税务相关** - 美国各州税率
5. **邮件服务** - 订单确认和通知
6. **数据库** - 订单和用户数据存储

请复制上述内容到 `.env.local` 文件中并填入真实值。

