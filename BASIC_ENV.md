# 基础环境变量配置

## 最小化配置（立即上线）

创建 `.env.local` 文件，复制以下内容：

```env
# 网站基础信息
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
NEXT_PUBLIC_SITE_NAME=Your Store Name
```

**说明：**
- `NEXT_PUBLIC_SITE_URL`: 部署后的网站地址，先用 Vercel 默认域名
- `NEXT_PUBLIC_SITE_NAME`: 你的网站名称

## 可选配置（后续添加）

如果你有 Google Analytics：
```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 创建步骤

1. 在项目根目录创建 `.env.local` 文件
2. 复制上面的配置并修改为你的信息
3. 保存文件

**注意：** `.env.local` 文件不会被提交到 Git，这是正确的行为。
