#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { showGitDiff } from "./commands/diff";
import { showVersion } from "./utils/version";
import { showWelcome } from "./utils/welcome";

const program = new Command();

async function main() {
  showWelcome();

  const choices = [
    {
      name: "📋 查看 Git Diff 内容",
      value: "diff",
    },
    {
      name: "⚙️ 配置设置",
      value: "config",
    },
    {
      name: "❓ 帮助信息",
      value: "help",
    },
    {
      name: "🚪 退出",
      value: "exit",
    },
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "请选择要执行的操作:",
      choices,
    },
  ]);

  switch (action) {
    case "diff":
      await showGitDiff();
      break;
    case "config":
      console.log(chalk.yellow("⚙️ 配置功能即将推出..."));
      break;
    case "help":
      showHelp();
      break;
    case "exit":
      console.log(chalk.green("👋 再见!"));
      process.exit(0);
      break;
    default:
      console.log(chalk.red("❌ 未知操作"));
  }
}

function showHelp() {
  console.log(
    chalk.blue(`
📖 Lazy Commit 帮助信息

可用命令:
  lazy-commit          启动交互模式
  lazy-commit --version 显示版本信息
  lazy-commit --help   显示帮助信息

功能说明:
  • 查看 Git Diff - 显示当前未提交的改动
  • 配置设置 - 设置 AI API 等配置项 (即将推出)
  • 自动生成提交信息 - 基于改动生成语义化提交信息 (即将推出)

更多信息请访问: https://github.com/your-username/lazy-commit
`),
  );
}

// 设置命令行参数
program
  .name("lazy-commit")
  .description("AI-powered Git commit message generator")
  .version(showVersion(), "-v, --version", "显示版本信息")
  .option("-h, --help", "显示帮助信息")
  .action(main);

// 自定义帮助命令
program.on("--help", showHelp);

program.parse();
