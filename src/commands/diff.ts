import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import {
  formatGitStatus,
  getGitDiff,
  getGitStatus,
  isGitRepository,
} from "../git/operations";

export async function showGitDiff() {
  const spinner = ora("检查 Git 仓库状态...").start();

  try {
    // 检查是否是 Git 仓库
    if (!isGitRepository()) {
      spinner.fail(chalk.red("❌ 当前目录不是一个 Git 仓库"));
      return;
    }

    // 获取 Git 状态
    const status = await getGitStatus();
    spinner.succeed("✅ Git 状态检查完成");

    // 显示文件状态
    console.log(chalk.blue("\n📊 Git 状态:"));
    console.log(formatGitStatus(status));

    if (!status.hasChanges) {
      return;
    }

    // 询问用户要查看哪种类型的 diff
    const choices = [];

    if (status.stagedFiles.length > 0) {
      choices.push({
        name: `📦 查看已暂存的改动 (${status.stagedFiles.length} 个文件)`,
        value: "staged",
      });
    }

    if (status.unstagedFiles.length > 0) {
      choices.push({
        name: `📝 查看未暂存的改动 (${status.unstagedFiles.length} 个文件)`,
        value: "unstaged",
      });
    }

    choices.push({
      name: "🔙 返回主菜单",
      value: "back",
    });

    if (choices.length <= 1) {
      return;
    }

    const { diffType } = await inquirer.prompt([
      {
        type: "list",
        name: "diffType",
        message: "选择要查看的改动类型:",
        choices,
      },
    ]);

    if (diffType === "back") {
      return;
    }

    // 显示 diff
    const diffSpinner = ora("获取代码改动...").start();

    try {
      const diff = getGitDiff(diffType === "staged");
      diffSpinner.succeed("✅ 代码改动获取完成");

      if (!diff.trim()) {
        console.log(chalk.yellow("📝 没有找到改动内容"));
        return;
      }

      console.log(chalk.blue("\n📋 代码改动:"));
      console.log(chalk.gray("─".repeat(60)));

      // 简单的 diff 着色
      const coloredDiff = diff
        .split("\n")
        .map((line) => {
          if (line.startsWith("+") && !line.startsWith("+++")) {
            return chalk.green(line);
          } else if (line.startsWith("-") && !line.startsWith("---")) {
            return chalk.red(line);
          } else if (line.startsWith("@@")) {
            return chalk.cyan(line);
          } else if (line.startsWith("diff --git")) {
            return chalk.yellow(line);
          }
          return line;
        })
        .join("\n");

      console.log(coloredDiff);
      console.log(chalk.gray("─".repeat(60)));
    } catch (error) {
      diffSpinner.fail(
        chalk.red(
          `❌ 获取改动失败: ${error instanceof Error ? error.message : "未知错误"}`,
        ),
      );
    }
  } catch (error) {
    spinner.fail(
      chalk.red(
        `❌ 检查 Git 状态失败: ${error instanceof Error ? error.message : "未知错误"}`,
      ),
    );
  }
}
