import chalk from "chalk";
import inquirer from "inquirer";
import { configManager } from "../config";

export async function showConfigMenu(): Promise<void> {
  const currentApiKey = configManager.getGeminiApiKey();

  const choices = [
    {
      name: "🔑 设置 Gemini API Key",
      value: "setApiKey",
    },
    {
      name: "📝 管理自定义 Prompt",
      value: "managePrompt",
    },
    {
      name: "👁️  查看当前配置",
      value: "viewConfig",
    },
    ...(currentApiKey
      ? [
          {
            name: "🗑️  清除配置",
            value: "resetConfig",
          },
        ]
      : []),
    {
      name: "↩️  返回主菜单",
      value: "back",
    },
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "请选择配置操作:",
      choices,
    },
  ]);

  switch (action) {
    case "setApiKey":
      await setGeminiApiKey();
      break;
    case "managePrompt":
      await manageCustomPrompt();
      break;
    case "viewConfig":
      await viewCurrentConfig();
      break;
    case "resetConfig":
      await resetConfiguration();
      break;
    case "back":
      return;
    default:
      console.log(chalk.red("❌ 未知操作"));
  }

  // 递归调用，继续显示配置菜单
  await showConfigMenu();
}

async function setGeminiApiKey(): Promise<void> {
  console.log();
  console.log(chalk.blue("🔑 设置 Gemini API Key"));
  console.log(
    chalk.gray("请输入您的 Gemini API Key，该密钥将被安全保存在本地配置中。"),
  );
  console.log();

  const currentApiKey = configManager.getGeminiApiKey();
  if (currentApiKey) {
    console.log(chalk.yellow(`当前已配置 API Key: ${currentApiKey}`));
    console.log();
  }

  const { apiKey } = await inquirer.prompt([
    {
      type: "input",
      name: "apiKey",
      message: "请输入 Gemini API Key:",
      validate: (input: string) => {
        if (!input.trim()) {
          return "API Key 不能为空";
        }
        if (input.length < 10) {
          return "API Key 长度过短，请检查输入";
        }
        return true;
      },
    },
  ]);

  try {
    configManager.setGeminiApiKey(apiKey.trim());
    console.log();
    console.log(chalk.green("✅ API Key 设置成功!"));
    console.log();
  } catch (error) {
    console.log();
    console.log(chalk.red("❌ API Key 设置失败:"), error);
    console.log();
  }
}

async function manageCustomPrompt(): Promise<void> {
  const currentPrompt = configManager.getCustomPrompt();

  const choices = [
    {
      name: "📝 设置自定义 Prompt",
      value: "setPrompt",
    },
    {
      name: "👁️  查看当前 Prompt",
      value: "viewPrompt",
    },
    ...(currentPrompt
      ? [
          {
            name: "🔄 重置为默认 Prompt",
            value: "resetPrompt",
          },
        ]
      : []),
    {
      name: "↩️  返回",
      value: "back",
    },
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "请选择 Prompt 操作:",
      choices,
    },
  ]);

  switch (action) {
    case "setPrompt":
      await setCustomPrompt();
      break;
    case "viewPrompt":
      await viewCurrentPrompt();
      break;
    case "resetPrompt":
      await resetCustomPrompt();
      break;
    case "back":
      return;
    default:
      console.log(chalk.red("❌ 未知操作"));
  }
}

/** 设置自定义 Prompt */
async function setCustomPrompt(): Promise<void> {
  console.log();
  console.log(chalk.blue("📝 设置自定义 Prompt"));
  console.log(
    chalk.gray(
      "请输入自定义的 Prompt 模板，使用 {{diff}} 作为 Git diff 的占位符。",
    ),
  );
  console.log();

  const { prompt } = await inquirer.prompt([
    {
      type: "editor",
      name: "prompt",
      message: "请输入自定义 Prompt:",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Prompt 不能为空";
        }
        if (!input.includes("{{diff}}")) {
          return "Prompt 必须包含 {{diff}} 占位符";
        }
        return true;
      },
    },
  ]);

  try {
    configManager.setCustomPrompt(prompt.trim());
    console.log();
    console.log(chalk.green("✅ 自定义 Prompt 设置成功!"));
    console.log();
  } catch (error) {
    console.log();
    console.log(chalk.red("❌ 自定义 Prompt 设置失败:"), error);
    console.log();
  }
}

/** 查看当前 Prompt 配置 */
async function viewCurrentPrompt(): Promise<void> {
  console.log();
  console.log(chalk.blue("📋 当前 Prompt 配置"));
  console.log();

  const customPrompt = configManager.getCustomPrompt();

  if (customPrompt) {
    console.log(chalk.green("📝 使用自定义 Prompt:"));
    console.log(chalk.gray("─".repeat(60)));
    console.log(customPrompt);
    console.log(chalk.gray("─".repeat(60)));
  } else {
    console.log(chalk.yellow("📝 使用默认 Prompt"));
  }

  console.log();
}

/** 重置自定义 Prompt */
async function resetCustomPrompt(): Promise<void> {
  console.log();

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "确定要重置为默认 Prompt 吗？",
      default: false,
    },
  ]);

  if (confirm) {
    try {
      configManager.resetCustomPrompt();
      console.log();
      console.log(chalk.green("✅ 已重置为默认 Prompt"));
      console.log();
    } catch (error) {
      console.log();
      console.log(chalk.red("❌ 重置失败:"), error);
      console.log();
    }
  } else {
    console.log();
    console.log(chalk.blue("操作已取消"));
    console.log();
  }
}

/** 查看当前配置信息 */
async function viewCurrentConfig(): Promise<void> {
  console.log();
  console.log(chalk.blue("📋 当前配置信息"));
  console.log();

  const config = configManager.getAllConfig();
  const apiKey = config.geminiApiKey;
  const customPrompt = config.customPrompt;

  if (apiKey) {
    console.log(chalk.green("🔑 Gemini API Key:"), apiKey);
  } else {
    console.log(chalk.yellow("🔑 Gemini API Key: 未配置"));
  }

  if (customPrompt) {
    console.log(chalk.green("📝 自定义 Prompt: 已配置"));
  } else {
    console.log(chalk.yellow("📝 自定义 Prompt: 使用默认"));
  }

  console.log();
}

/** 重置所有配置 */
async function resetConfiguration(): Promise<void> {
  console.log();

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "确定要清除所有配置信息吗？此操作不可撤销。",
      default: false,
    },
  ]);

  if (confirm) {
    try {
      configManager.resetConfig();
      console.log();
      console.log(chalk.green("✅ 配置已清除"));
      console.log();
    } catch (error) {
      console.log();
      console.log(chalk.red("❌ 清除配置失败:"), error);
      console.log();
    }
  } else {
    console.log();
    console.log(chalk.blue("操作已取消"));
    console.log();
  }
}
