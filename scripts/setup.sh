#!/bin/bash

# 美国市场独立站模板设置脚本
echo "🚀 Setting up US E-Commerce Template..."

# 检查 Node.js 版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ $NODE_VERSION -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required"
    echo "Current version: $(node -v)"
    echo "Please upgrade Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version check passed"

# 安装依赖
echo "📦 Installing dependencies..."
npm install

# 复制环境变量文件
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your configuration"
else
    echo "✅ Environment file already exists"
fi

# 创建必要的目录
echo "📁 Creating directories..."
mkdir -p public/images
mkdir -p public/icons

# 生成 favicon 和图标（如果不存在）
if [ ! -f public/favicon.ico ]; then
    echo "🎨 Generating default favicon..."
    # 这里可以添加生成默认图标的逻辑
    echo "⚠️  Please add your favicon.ico to public/ directory"
fi

# 检查必要的环境变量
echo "🔍 Checking environment configuration..."
if grep -q "your-domain.com" .env.local; then
    echo "⚠️  Please update NEXT_PUBLIC_SITE_URL in .env.local"
fi

if grep -q "G-XXXXXXXXXX" .env.local; then
    echo "⚠️  Please update Google Analytics ID in .env.local"
fi

# 运行类型检查
echo "🔍 Running type check..."
npm run type-check

# 运行 linting
echo "🧹 Running linter..."
npm run lint

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Add your favicon and icons to public/ directory"
echo "3. Run 'npm run dev' to start development server"
echo "4. Open http://localhost:3000 to view your site"
echo ""
echo "For deployment:"
echo "1. Push to GitHub"
echo "2. Connect to Vercel"
echo "3. Configure environment variables"
echo "4. Deploy!"
echo ""
echo "Need help? Check the README.md file"
