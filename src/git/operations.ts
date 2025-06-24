import { execSync } from "node:child_process";
import chalk from "chalk";

export interface GitStatus {
  hasChanges: boolean;
  stagedFiles: string[];
  unstagedFiles: string[];
  untrackedFiles: string[];
}

export function getGitStatus(): GitStatus {
  try {
    const output = execSync("git status --porcelain", { encoding: "utf-8" });
    const lines = output
      .trim()
      .split("\n")
      .filter((line) => line.length > 0);

    const stagedFiles: string[] = [];
    const unstagedFiles: string[] = [];
    const untrackedFiles: string[] = [];

    for (const line of lines) {
      const status = line.substring(0, 2);
      const filename = line.substring(3);

      if (status[0] !== " " && status[0] !== "?") {
        stagedFiles.push(filename);
      }
      if (status[1] !== " ") {
        unstagedFiles.push(filename);
      }
      if (status[0] === "?" && status[1] === "?") {
        untrackedFiles.push(filename);
      }
    }

    return {
      hasChanges: lines.length > 0,
      stagedFiles,
      unstagedFiles,
      untrackedFiles,
    };
  } catch {
    throw new Error("无法获取 Git 状态。请确保当前目录是一个 Git 仓库。");
  }
}

export function getGitDiff(staged: boolean = false): string {
  try {
    const command = staged ? "git diff --cached" : "git diff";
    const diff = execSync(command, { encoding: "utf-8" });
    return diff;
  } catch {
    throw new Error("无法获取 Git diff。请确保当前目录是一个 Git 仓库。");
  }
}

export function isGitRepository(): boolean {
  try {
    execSync("git rev-parse --git-dir", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

export function formatGitStatus(status: GitStatus): string {
  let output = "";

  if (!status.hasChanges) {
    return chalk.green("✅ 工作目录是干净的，没有未提交的改动");
  }

  if (status.stagedFiles.length > 0) {
    output += chalk.green("\n📦 已暂存的文件:\n");
    for (const file of status.stagedFiles) {
      output += chalk.green(`  ✓ ${file}\n`);
    }
  }

  if (status.unstagedFiles.length > 0) {
    output += chalk.yellow("\n📝 已修改但未暂存的文件:\n");
    for (const file of status.unstagedFiles) {
      output += chalk.yellow(`  ○ ${file}\n`);
    }
  }

  if (status.untrackedFiles.length > 0) {
    output += chalk.red("\n❓ 未跟踪的文件:\n");
    for (const file of status.untrackedFiles) {
      output += chalk.red(`  ? ${file}\n`);
    }
  }

  return output;
}
