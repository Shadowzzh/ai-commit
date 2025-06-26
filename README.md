# 🚀 lazy-commit

<div align="center">

**基于 AI 的智能 Git 提交信息生成器**

[![NPM Version](https://img.shields.io/npm/v/lazy-commit?style=flat-square&color=blue)](https://www.npmjs.com/package/@zhangziheng/lazy-commit)

*快速写出提交信息，从此告别"fix bug"和"update code"*

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [使用指南](#-使用指南) • [配置说明](#-配置说明)

</div>

---

## 🌟 功能特性

- **规范遵循**：严格符合 [Conventional Commits v1.0.0](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范
- **自动检测**：智能识别已暂存和未暂存的文件变更
- **多操作支持**：复制到剪贴板、直接提交、重新生成
- **交互式界面**：友好的菜单驱动操作
- **彩色输出**：直观的差异显示和状态提示
- **加载动画**：实时操作状态反馈
- **跨平台支持**：macOS、Windows、Linux 全平台兼容
- **配置管理**：持久化配置存储和管理
- **CLI 灵活性**：支持命令行参数和交互式两种模式

---

## 🚀 快速开始

### 📦 安装

```bash
# 使用 npm
npm install -g @zhangziheng/lazy-commit

# 使用 pnpm (推荐)
pnpm add -g @zhangziheng/lazy-commit
l
# 使用 yarn
yarn global add @zhangziheng/lazy-commit
```

### 🔧 配置 API 密钥

首次使用需要配置 Google Gemini API 密钥：

```bash
# 启动配置菜单，选择 "设置 Gemini API Key"
lcm --config

# 测试 API 连接
lcm --test
```

> 💡 **获取 API 密钥**：访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取免费的 Gemini API 密钥

### ⚡ 开始使用

```bash
# 进入你的 Git 项目目录
cd your-project

# 启动 lazy-commit
lcm
```

---

## 📖 使用指南

### 🎮 交互式模式

运行 `lcm --menu` 启动交互式菜单：

```
🎉 欢迎使用 Lazy Commit v0.3.1

请选择要执行的操作:
❯ 🚀 生成 AI Commit Message
  📋 查看 Git Diff 内容
  🧪 测试 Gemini API 连接
  ⚙️  配置设置
  ❓ 帮助信息
  🚪 退出
```

### ⌨️ 命令行模式

```bash
# 直接生成提交信息
lcm

# 查看 Git 差异
lcm --diff

# 测试 API 连接
lcm --test

# 打开配置菜单
lcm --config

# 显示版本信息
lcm --version

# 显示帮助信息
lcm --help
```

### 📝 使用流程

1. **代码变更**：在你的项目中进行代码修改
2. **暂存文件**：使用 `git add` 暂存要提交的文件
3. **生成提交信息**：运行 `lcm` 让 AI 分析变更并生成提交信息
4. **选择操作**：
   - 📋 复制到剪贴板
   - ✅ 直接提交
   - 🔄 重新生成
   - ❌ 取消操作

---

## ⚙️ 配置说明

### 🔑 API 密钥配置

lazy-commit 支持多种方式配置 Gemini API 密钥：
**配置文件**：
   ```bash
   lcm --config
   # 选择 "设置 Gemini API Key"
   ```

### 🎨 自定义提示模板

你可以自定义 AI 生成提交信息的提示模板：

```bash
lcm --config
# 选择 "设置自定义 Prompt 模板"
```

**默认模板示例**：
```
# 角色
你是一位严谨的版本控制专家，熟练掌握 Conventional Commits v1.0.0。

- 仅根据 <<DIFF>> 内的 **实际代码行**（以 + / - 开头）生成 commit message。
- **禁止捏造** diff 中不存在的功能、文件或改动。
- 类型暂固定为 feat；如果 diff 中只有注释或文档改动，也请如实描述其内容。
- 输出格式必须严格如下（勿包含多余内容）：
- 使用中文语言

feat(<scope>): <一句话描述，祈使句，≤ 72 字符>

- <改动点 1>
- <改动点 2>
- <改动点 3>

## DIFF
<<DIFF>>
{{diff}}
<<END>>
```