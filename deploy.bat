@echo off
chcp 65001 >nul
echo 🚀 Gemini AI Showcase Docker 部署脚本
echo ==================================

REM 检查Docker是否安装
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker 未安装，请先安装 Docker
    pause
    exit /b 1
)

REM 检查Docker是否运行
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker 未运行，请启动 Docker Desktop
    pause
    exit /b 1
)

REM 检查环境变量文件
if not exist ".env" (
    echo 📝 创建环境变量文件...
    copy env.example .env
    echo ⚠️  请编辑 .env 文件，填入您的 GEMINI_API_KEY
    echo    然后重新运行此脚本
    pause
    exit /b 1
)

REM 检查API密钥是否已设置
findstr /C:"your_gemini_api_key_here" .env >nul
if %errorlevel% equ 0 (
    echo ⚠️  请在 .env 文件中设置您的 GEMINI_API_KEY
    echo    然后重新运行此脚本
    pause
    exit /b 1
)

REM 读取环境变量
for /f "tokens=2 delims==" %%a in ('findstr "GEMINI_API_KEY" .env') do set GEMINI_API_KEY=%%a

echo 🔨 构建 Docker 镜像...
docker build --build-arg GEMINI_API_KEY=%GEMINI_API_KEY% -t gemini-ai-showcase .

if %errorlevel% equ 0 (
    echo ✅ 镜像构建成功！
    echo.
    echo 🚀 启动容器...
    docker compose up -d
    
    if %errorlevel% equ 0 (
        echo ✅ 容器启动成功！
        echo.
        echo 🌐 应用已启动，访问地址：
        echo    http://localhost:3000
        echo.
        echo 📋 常用命令：
        echo    查看状态: docker compose ps
        echo    查看日志: docker compose logs -f
        echo    停止服务: docker compose down
    ) else (
        echo ❌ 容器启动失败
        pause
        exit /b 1
    )
) else (
    echo ❌ 镜像构建失败
    pause
    exit /b 1
)

pause
