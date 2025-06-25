import { GoogleGenerativeAI } from "@google/generative-ai";
import { configManager } from "../config";

export class GeminiService {
  private client: GoogleGenerativeAI | null = null;

  constructor() {
    this.initializeClient();
  }

  private initializeClient(): void {
    const apiKey = configManager.getGeminiApiKey();
    if (apiKey) {
      this.client = new GoogleGenerativeAI(apiKey);
    }
  }

  public refreshClient(): void {
    this.initializeClient();
  }

  public isConfigured(): boolean {
    return this.client !== null && configManager.hasGeminiApiKey();
  }

  public async generateCommitMessage(
    diff: string,
    customPrompt?: string,
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error("Gemini API Key 未配置，请先设置 API Key");
    }

    if (!this.client) {
      throw new Error("Gemini 客户端未初始化");
    }

    try {
      const model = this.client.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const defaultPrompt = `# 角色
你是一位严谨的版本控制专家，熟练掌握 Conventional Commits v1.0.0。

# 任务
阅读下方 Git diff，仅输出一条 **feat** 类型的 commit message：
- **第一行**：\`feat(<scope>): <一句话描述，祈使句，≤ 72 字符>\`
- **随后多行**：每行以 \`- \` 开头，列出本次迭代的重要改动点（可多行）

# 输入${diff}

# 输出格式（必须完全符合）
feat(<scope>): <总体概述 | 祈使句>

- <改动点 1>
- <改动点 2>
- <改动点 3>
`;

      const prompt = customPrompt
        ? customPrompt.replace("{{diff}}", diff)
        : defaultPrompt;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("生成的提交信息为空");
      }

      return text.trim();
    } catch (error) {
      console.error("Gemini API 调用失败:", error);
      throw new Error(
        `生成提交信息失败: ${error instanceof Error ? error.message : "未知错误"}`,
      );
    }
  }

  public async testConnection(): Promise<boolean> {
    if (!this.isConfigured()) {
      return false;
    }

    try {
      await this.generateCommitMessage("test: add sample test file");
      return true;
    } catch (error) {
      console.error("Gemini API 连接测试失败:", error);
      return false;
    }
  }
}

export const geminiService = new GeminiService();
