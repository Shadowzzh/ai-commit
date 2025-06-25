import { execSync } from "node:child_process";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import { geminiService } from "../ai/gemini";
import { getGitDiff, getGitStatus, isGitRepository } from "../git/operations";

/**
 * 生成 commit 信息
 * @returns
 */
export async function generateCommitMessage() {
  const spinner = ora("检查 Git 仓库状态...").start();

  try {
    // 检查是否是 Git 仓库
    if (!isGitRepository()) {
      spinner.fail(chalk.red("❌ 当前目录不是一个 Git 仓库"));
      return;
    }

    // 检查 Gemini API 配置
    if (!geminiService.isConfigured()) {
      spinner.fail(chalk.red("❌ Gemini API Key 未配置，请先配置 API Key"));
      return;
    }

    // 获取 Git 状态
    const status = await getGitStatus();

    if (!status.hasChanges) {
      spinner.fail(chalk.yellow("📝 没有检测到代码变更"));
      return;
    }

    spinner.text = "获取代码变更...";

    // 优先使用已暂存的变更，如果没有则使用未暂存的变更
    const useStaged = status.stagedFiles.length > 0;
    const diff = getGitDiff(useStaged);

    if (!diff.trim()) {
      spinner.fail(chalk.yellow("📝 没有找到可用的代码变更"));
      return;
    }

    spinner.text = "生成 commit message...";

    // 生成 commit message
    const commitMessage = await geminiService.generateCommitMessage(diff);

    spinner.succeed(chalk.green("✅ Commit message 生成完成"));

    // 显示生成的 commit message
    console.log(chalk.blue("\n🚀 生成的 Commit Message:"));
    console.log(chalk.gray("─".repeat(60)));
    console.log(chalk.white(commitMessage));
    console.log(chalk.gray("─".repeat(60)));

    // 提供用户选择
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "请选择操作:",
        choices: [
          {
            name: "📋 复制到剪贴板",
            value: "copy",
          },
          {
            name: "🚀 直接提交",
            value: "commit",
          },
          {
            name: "🔄 重新生成",
            value: "regenerate",
          },
          {
            name: "🔙 返回主菜单",
            value: "back",
          },
        ],
      },
    ]);

    switch (action) {
      case "copy":
        await copyToClipboard(commitMessage);
        break;
      case "commit":
        await commitChanges(commitMessage, useStaged);
        break;
      case "regenerate":
        await generateCommitMessage();
        break;
      case "back":
        return;
    }
  } catch (error) {
    spinner.fail(
      chalk.red(
        `❌ 生成 commit message 失败: ${error instanceof Error ? error.message : "未知错误"}`,
      ),
    );
  }
}

/**
 * 复制 commit message 到剪贴板
 * @param message commit message
 */
async function copyToClipboard(message: string) {
  try {
    // 使用系统剪贴板命令
    let command: string;

    if (process.platform === "darwin") {
      command = "pbcopy";
    } else if (process.platform === "win32") {
      command = "clip";
    } else {
      command = "xclip -selection clipboard";
    }

    execSync(command, { input: message });
    console.log(chalk.green("\n✅ Commit message 已复制到剪贴板"));
  } catch (_error) {
    console.log(chalk.red("\n❌ 复制到剪贴板失败，请手动复制"));
    console.log(chalk.gray("Commit message:"));
    console.log(chalk.white(message));
  }
}

/**
 * 提交代码变更
 * @param message commit message
 * @param useStaged 是否使用暂存区
 */
async function commitChanges(message: string, useStaged: boolean) {
  try {
    const spinner = ora("提交代码变更...").start();

    // 如果没有暂存文件，先暂存所有变更
    if (!useStaged) {
      execSync("git add .", { stdio: "pipe" });
    }

    // 提交变更
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
      stdio: "pipe",
    });

    spinner.succeed(chalk.green("✅ 代码变更已成功提交"));
  } catch (error) {
    console.log(
      chalk.red(
        `❌ 提交失败: ${error instanceof Error ? error.message : "未知错误"}`,
      ),
    );
  }
}

/**
 * 测试 Gemini API 连接
 */
export async function testGeminiConnection() {
  const spinner = ora("测试 Gemini API 连接...").start();

  try {
    if (!geminiService.isConfigured()) {
      spinner.fail(chalk.red("❌ Gemini API Key 未配置"));
      return;
    }

    const isConnected = await geminiService.testConnection();

    if (isConnected) {
      spinner.succeed(chalk.green("✅ Gemini API 连接测试成功"));
    } else {
      spinner.fail(chalk.red("❌ Gemini API 连接测试失败"));
    }
  } catch (error) {
    spinner.fail(
      chalk.red(
        `❌ 连接测试失败: ${error instanceof Error ? error.message : "未知错误"}`,
      ),
    );
  }
}
