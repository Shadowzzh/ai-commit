#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { showConfigMenu } from "./commands/config";
import { showGitDiff } from "./commands/diff";
import { helpPlaceholder } from "./utils/showHelp";
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
      name: "⚙️  配置设置",
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
      await showConfigMenu();
      break;
    case "help":
      console.log();
      console.log(chalk.blue(helpPlaceholder));
      break;
    case "exit":
      console.log();
      console.log(chalk.green("👋 再见!"));
      process.exit(0);
      break;
    default:
      console.log();
      console.log(chalk.red("❌ 未知操作"));
  }
}

// 设置命令行参数
program
  .name("lcm")
  .description(
    "🛸 Git 提交信息生成工具 - AI-powered Git commit message generator",
  )
  .version(showVersion(), "-v, --version", "显示版本信息")
  .helpOption("-h, --help", "显示帮助信息")
  .action(main);

// 覆盖默认的帮助信息
program.configureHelp({
  formatHelp: () => {
    return chalk.blue(helpPlaceholder);
  },
});

program.parse();
