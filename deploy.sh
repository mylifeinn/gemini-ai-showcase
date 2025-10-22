#!/bin/bash

# Gemini AI Showcase Docker 部署脚本

echo "🚀 Gemini AI Showcase Docker 部署脚本"
echo "=================================="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查Docker是否运行
if ! docker info &> /dev/null; then
    echo "❌ Docker 未运行，请启动 Docker Desktop"
    exit 1
fi

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo "📝 创建环境变量文件..."
    cp env.example .env
    echo "⚠️  请编辑 .env 文件，填入您的 GEMINI_API_KEY"
    echo "   然后重新运行此脚本"
    exit 1
fi

# 检查API密钥是否已设置
if grep -q "your_gemini_api_key_here" .env; then
    echo "⚠️  请在 .env 文件中设置您的 GEMINI_API_KEY"
    echo "   然后重新运行此脚本"
    exit 1
fi

# 加载环境变量
export $(cat .env | grep -v '^#' | xargs)

echo "🔨 构建 Docker 镜像..."
docker build --build-arg GEMINI_API_KEY=$GEMINI_API_KEY -t gemini-ai-showcase .

if [ $? -eq 0 ]; then
    echo "✅ 镜像构建成功！"
    echo ""
    echo "🚀 启动容器..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ 容器启动成功！"
        echo ""
        echo "🌐 应用已启动，访问地址："
        echo "   http://localhost:3000"
        echo ""
        echo "📋 常用命令："
        echo "   查看状态: docker-compose ps"
        echo "   查看日志: docker-compose logs -f"
        echo "   停止服务: docker-compose down"
    else
        echo "❌ 容器启动失败"
        exit 1
    fi
else
    echo "❌ 镜像构建失败"
    exit 1
fi
