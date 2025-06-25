export const helpPlaceholder = `
📖 LCM - AI 智能提交信息生成工具

用法:
  lcm [选项]

选项:
  -v, --version   显示版本信息
  -h, --help      显示帮助信息
  -m, --menu      显示交互菜单
  -c, --config    打开配置菜单
  -d, --diff      查看 Git Diff
  -t, --test      测试 Gemini API 连接

功能说明:
  • 🚀 AI 提交信息生成 - 基于 Git 变更自动生成符合规范的提交信息
  • 📋 查看 Git Diff - 显示当前未提交的改动
  • ⚙️  配置管理 - 设置 Gemini API Key 和自定义 Prompt
  • 🧪 API 测试 - 验证 Gemini API 连接状态

使用方式:
  lcm               # 直接生成 commit message
  lcm -m            # 显示交互菜单
  lcm -c            # 快速打开配置
  lcm -d            # 查看代码变更
  lcm -t            # 测试 API 连接

更多信息: https://github.com/your-username/ai-commit
`;
