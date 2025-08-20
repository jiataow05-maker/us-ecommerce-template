# 🚀 网站上线指南

## 第一步：准备基础环境变量

创建 `.env.local` 文件，包含以下基础配置：

```env
# 网站基础信息
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Your Store Name

# Google Analytics（可选，用于网站统计）
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**注意：** 
- 支付相关的环境变量暂时不需要
- 如果暂时不需要 Google Analytics，可以留空

## 第二步：本地测试

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 确认网站正常运行。

## 第三步：推送到 GitHub

```bash
# 初始化 git（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit - ready for deployment"

# 添加远程仓库
git remote add origin https://github.com/your-username/your-repo.git

# 推送到 GitHub
git push -u origin main
```

## 第四步：部署到 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 配置项目设置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: 留空（使用默认）
6. 添加环境变量（如果有的话）
7. 点击 "Deploy"

## 第五步：配置自定义域名（可选）

如果你有自己的域名：

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 根据提示配置 DNS 记录：
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

## 第六步：测试网站

访问你的网站URL，检查：
- ✅ 页面正常加载
- ✅ 导航菜单工作正常
- ✅ 响应式设计在不同设备上正常
- ✅ 所有链接可以正常访问

## 常见问题解决

### 构建失败
```bash
# 本地测试构建
npm run build

# 检查是否有 TypeScript 错误
npm run type-check
```

### 环境变量问题
- 确保环境变量名正确
- 重新部署以应用新的环境变量

### 页面404错误
- 检查文件路径是否正确
- 确认 `app` 目录结构

## 完成上线！

恭喜！你的网站现在已经成功上线了！🎉

后续可以添加：
- Google Analytics 统计
- 支付功能
- 更多页面内容
- SEO 优化
