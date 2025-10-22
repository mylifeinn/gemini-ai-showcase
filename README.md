<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/16X-9Tj5v0vHMgm9y9PiizBG638S00M2h

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Docker 部署

### 快速部署（推荐）

**Windows 用户：**
```bash
deploy.bat
```

**Linux/Mac 用户：**
```bash
chmod +x deploy.sh
./deploy.sh
```

### 手动部署

#### 使用 Docker Compose

1. 复制环境变量配置文件：
   ```bash
   cp env.example .env
   ```

2. 编辑 `.env` 文件，填入您的 Gemini API 密钥：
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. 构建并启动容器：
   ```bash
   docker compose up -d --build
   ```

4. 访问应用：
   打开浏览器访问 `http://localhost:3000`

#### 使用 Docker 命令

1. 设置环境变量：
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   ```

2. 构建镜像：
   ```bash
   docker build --build-arg GEMINI_API_KEY=$GEMINI_API_KEY -t gemini-ai-showcase .
   ```

3. 运行容器：
   ```bash
   docker run -d -p 3000:3000 gemini-ai-showcase
   ```

### 停止服务

使用 Docker Compose：
```bash
docker compose down
```

使用 Docker 命令：
```bash
docker stop <container_id>
```

## 生产环境部署

### 使用生产环境配置

1. 复制环境变量配置文件：
   ```bash
   cp env.example .env
   ```

2. 编辑 `.env` 文件，填入您的 Gemini API 密钥

3. 使用生产环境配置启动：
   ```bash
   docker compose -f docker compose.prod.yml up -d
   ```

4. 访问应用：
   打开浏览器访问 `http://localhost`（端口80）

### 常用Docker命令

查看容器状态：
```bash
docker compose ps
```

查看日志：
```bash
docker compose logs -f
```

重新构建并启动：
```bash
docker compose up -d --build
```

清理未使用的镜像：
```bash
docker system prune -a
```

## 故障排除

### 常见问题

#### 1. API_KEY environment variable is not set 错误

**问题**：控制台显示 "API_KEY environment variable is not set"

**解决方案**：
1. 确保 `.env` 文件存在且包含正确的 `GEMINI_API_KEY`
2. 重新构建镜像：
   ```bash
   docker compose down
   docker compose up -d --build
   ```

#### 2. Docker 构建失败

**问题**：构建过程中出现错误

**解决方案**：
1. 检查 Docker 是否正在运行
2. 确保 `.env` 文件中的 API 密钥格式正确
3. 清理 Docker 缓存：
   ```bash
   docker system prune -a
   docker compose build --no-cache
   ```

#### 3. 容器无法启动

**问题**：容器启动后立即退出

**解决方案**：
1. 查看容器日志：
   ```bash
   docker compose logs
   ```
2. 检查端口是否被占用：
   ```bash
   netstat -tulpn | grep :3000
   ```

#### 4. 无法访问应用

**问题**：浏览器无法访问 localhost:3000

**解决方案**：
1. 检查容器状态：
   ```bash
   docker compose ps
   ```
2. 确保防火墙允许 3000 端口访问
3. 尝试使用 `http://127.0.0.1:3000` 访问

**问题**：部署后国内无法使用
1. 纯前端架构在国内无法使用