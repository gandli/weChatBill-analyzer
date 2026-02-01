# 微信账单分析 Web 版本

基于 Next.js 的在线微信支付账单分析平台。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **包管理**: Bun
- **部署**: Vercel

## 功能特性

- 📤 文件上传（支持 ZIP/PDF）
- 🔐 密码保护的 ZIP 解压
- 📊 多维度数据分析
- 📈 交互式图表可视化
- 📱 响应式设计（移动端适配）
- 💾 数据导出（Excel/PDF/PNG）

## 开发

```bash
# 安装依赖
bun install

# 启动开发服务器
bun dev

# 构建生产版本
bun build

# 启动生产服务器
bun start
```

## 项目结构

```
app/                    # Next.js App Router
├── (dashboard)/        # 仪表板路由组
├── api/                # API 路由
└── layout.tsx          # 根布局

components/             # React 组件
├── ui/                 # UI 组件库
├── upload/             # 上传组件
├── charts/             # 图表组件
└── analysis/           # 分析组件

lib/                    # 工具库
├── parsers/            # 文件解析器
├── analyzers/          # 数据分析器
└── utils/              # 通用工具

types/                  # TypeScript 类型定义
```

## 环境变量

创建 `.env.local` 文件：

```env
# 文件上传限制（字节）
NEXT_PUBLIC_MAX_FILE_SIZE=52428800

# API 基础路径
NEXT_PUBLIC_API_URL=/api
```

## 部署

### Vercel (推荐)

```bash
# 安装 Vercel CLI
bun add -g vercel

# 部署
vercel
```

### Docker

```bash
# 构建镜像
docker build -t wechat-bill-analyzer .

# 运行容器
docker run -p 3000:3000 wechat-bill-analyzer
```

## 相关项目

- [Python CLI 版本](https://github.com/gandli/weChatBill-analyzer/tree/main) - 命令行工具

## 许可证

MIT
