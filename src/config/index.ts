import Conf from "conf";

/** 定义配置项的数据结构接口 */
interface ConfigSchema {
  /** Gemini API 密钥 */
  geminiApiKey?: string;
  /** 自定义提示模板 */
  customPrompt?: string;
}

/** 配置管理器类 */
export class ConfigManager {
  /** 私有成员变量，存储配置实例 */
  private config: Conf<ConfigSchema>;

  /** 构造函数，初始化配置 */
  constructor() {
    /** 创建新的配置实例 */
    this.config = new Conf<ConfigSchema>({
      /** 项目名称 */
      projectName: "lazy-commit",
      /** 配置项的验证规则 */
      schema: {
        /** Gemini API 密钥 */
        geminiApiKey: {
          type: "string",
          description: "用于 AI 提交消息生成的 Gemini API 密钥",
        },
        /** 自定义提示模板 */
        customPrompt: {
          type: "string",
          description: "AI 提交消息生成的自定义提示模板",
        },
      },
    });
  }

  /** 获取 Gemini API 密钥 */
  getGeminiApiKey(): string | undefined {
    return this.config.get("geminiApiKey");
  }

  /** 设置 Gemini API 密钥 */
  setGeminiApiKey(apiKey: string): void {
    this.config.set("geminiApiKey", apiKey);
  }

  /** 检查是否已设置 Gemini API 密钥 */
  hasGeminiApiKey(): boolean {
    return Boolean(this.config.get("geminiApiKey"));
  }

  /** 获取所有配置项 */
  getAllConfig(): ConfigSchema {
    return this.config.store;
  }

  /** 获取自定义提示模板 */
  getCustomPrompt(): string | undefined {
    return this.config.get("customPrompt");
  }

  /** 设置自定义提示模板 */
  setCustomPrompt(prompt: string): void {
    this.config.set("customPrompt", prompt);
  }

  /** 检查是否已设置自定义提示模板 */
  hasCustomPrompt(): boolean {
    return Boolean(this.config.get("customPrompt"));
  }

  /** 重置自定义提示模板 */
  resetCustomPrompt(): void {
    this.config.delete("customPrompt");
  }

  /** 重置所有配置 */
  resetConfig(): void {
    this.config.clear();
  }
}

/** 导出配置管理器实例，供全局使用 */
export const configManager = new ConfigManager();
