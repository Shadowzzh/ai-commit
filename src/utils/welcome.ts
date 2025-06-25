import chalk from "chalk";
import figlet from "figlet";
import { showVersion } from "./version";

export function showWelcome() {
  const version = showVersion();

  const logo = figlet.textSync("Lazy Commit", {
    width: 80,
    font: "3D-ASCII",
    // font: "Ghost",

    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: true,
  });

  console.log(chalk.cyan(logo));
  console.log();

  console.log(chalk.cyan.bold(`🛸 Git 提交信息生成工具 v${version}`));
  console.log();

  console.log(
    chalk.gray(`💡 使用说明:
   • 这是一个智能 Git 提交信息生成工具
   • 可以自动分析代码改动并生成语义化提交信息
   • 支持查看当前未提交的改动
   • 即将支持 AI 自动生成提交信息

🎯 开始使用:`),
  );
}
