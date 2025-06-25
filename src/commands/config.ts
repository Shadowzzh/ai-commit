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
    console.log(
      chalk.yellow(`当前已配置 API Key: ${maskApiKey(currentApiKey)}`),
    );
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

async function viewCurrentConfig(): Promise<void> {
  console.log();
  console.log(chalk.blue("📋 当前配置信息"));
  console.log();

  const config = configManager.getAllConfig();
  const apiKey = config.geminiApiKey;

  if (apiKey) {
    console.log(chalk.green("🔑 Gemini API Key:"), maskApiKey(apiKey));
  } else {
    console.log(chalk.yellow("🔑 Gemini API Key: 未配置"));
  }

  console.log();
}

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

function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) {
    return "***";
  }
  const start = apiKey.slice(0, 4);
  const end = apiKey.slice(-4);
  return `${start}***${end}`;
}
