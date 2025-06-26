# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.3.1 (2025-06-26)


### Features

* **cli:** 优化命令行工具并新增配置管理 603474e
* 使用 Gemini 实现 AI 提交信息生成 4e82697
* 实现基础 Lazy Commit CLI v0.1.0 fdccf17
* 更新欢迎信息，使用 figlet 显示项目名称 93399a1
* 更新欢迎信息的字体样式 f19f8ac
* 添加帮助信息功能并优化 CLI 输出 904d1e0

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