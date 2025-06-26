## [0.3.4](https://github.com/Shadowzzh/ai-commit/compare/v0.3.1...v0.3.4) (2025-06-26)


### Features

* **ai:** 更新 Gemini Prompt 优化生成 Commit Message 的规则 ([bd09b42](https://github.com/Shadowzzh/ai-commit/commit/bd09b4260b8d0c8292dfc6e5693798f4815acf27))
* **ai:** 更新 Gemini 模型至 2.0-flash 并优化 Prompt ([f2a6680](https://github.com/Shadowzzh/ai-commit/commit/f2a668063b24fe5d1ae4c3c1fd34ff2008a2c6fa))
* **build:** 更新gitignore文件，忽略更多文件 ([14f0416](https://github.com/Shadowzzh/ai-commit/commit/14f0416e7327d4a555d599c41fd9df60f35edaba))
* **gemini:** 更新 Gemini SDK 并调整 API 调用方式 ([c4aa62b](https://github.com/Shadowzzh/ai-commit/commit/c4aa62b9197b78b727157c73d4a83e57d4381061))
* **package:** 更新 package.json 文件元数据 ([67c59e6](https://github.com/Shadowzzh/ai-commit/commit/67c59e61169fb29d49ac138022ad76ce79f1f44a))
* 添加 lazy-commit 项目 README 文件 ([eb3049b](https://github.com/Shadowzzh/ai-commit/commit/eb3049be2afdb0bed3fd748b8157275540421101))



## [0.3.3](https://github.com/Shadowzzh/ai-commit/compare/v0.3.1...v0.3.3) (2025-06-26)


### Features

* **ai:** 更新 Gemini 模型至 2.0-flash 并优化 Prompt ([f2a6680](https://github.com/Shadowzzh/ai-commit/commit/f2a668063b24fe5d1ae4c3c1fd34ff2008a2c6fa))
* **build:** 更新gitignore文件，忽略更多文件 ([14f0416](https://github.com/Shadowzzh/ai-commit/commit/14f0416e7327d4a555d599c41fd9df60f35edaba))
* **gemini:** 更新 Gemini SDK 并调整 API 调用方式 ([c4aa62b](https://github.com/Shadowzzh/ai-commit/commit/c4aa62b9197b78b727157c73d4a83e57d4381061))
* **package:** 更新 package.json 文件元数据 ([67c59e6](https://github.com/Shadowzzh/ai-commit/commit/67c59e61169fb29d49ac138022ad76ce79f1f44a))
* 添加 lazy-commit 项目 README 文件 ([eb3049b](https://github.com/Shadowzzh/ai-commit/commit/eb3049be2afdb0bed3fd748b8157275540421101))



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