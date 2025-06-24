# Changelog

所有对该项目的重要更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且该项目遵循 [语义化版本控制](https://semver.org/lang/zh-CN/)。

## [0.1.0] - 2024-06-24

### 新增
- 🎉 初始化 Lazy Commit CLI 项目
- 📋 实现基础 CLI 界面，支持交互式菜单
- 🔍 实现 Git Diff 查看功能，支持查看已暂存和未暂存的改动
- 📊 实现 Git 状态显示功能，展示文件状态统计
- 🎨 添加彩色输出和友好的用户界面
- ⚡ 支持开发模式 (`pnpm dev`) 和生产构建 (`pnpm build`)
- 📦 配置 TypeScript + tsup + tsx 开发环境
- 🔧 集成 Biome 代码规范检查工具

### 技术特性
- 📱 交互式 CLI 界面 (inquirer.js)
- 🎨 彩色终端输出 (chalk)
- ⚡ 加载动画和进度提示 (ora)
- 🔧 配置文件支持 (conf)
- 📋 Git 操作集成

### 支持的功能
- ✅ 查看 Git 仓库状态
- ✅ 查看已暂存和未暂存的文件改动
- ✅ 彩色 diff 输出
- ✅ 版本信息显示
- ✅ 帮助信息

### 即将推出
- 🤖 AI 驱动的 commit 信息生成
- ⚙️ 配置管理界面
- 🌍 中文提交信息翻译和润色