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

  public async generateCommitMessage(diff: string): Promise<string> {
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

      const prompt = `
请根据以下 Git diff 内容，生成一个符合 Conventional Commits 规范的提交信息。

要求：
1. 使用中文生成提交信息
2. 格式：type(scope): description
3. type 包括：feat, fix, docs, style, refactor, test, chore 等
4. description 应该简洁明了，描述具体变更内容
5. 只返回提交信息，不要包含其他解释文本

Git diff 内容：
\`\`\`
${diff}
\`\`\`

提交信息：`;

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
