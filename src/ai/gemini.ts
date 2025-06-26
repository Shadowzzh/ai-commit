import { GoogleGenAI } from "@google/genai";
import { configManager } from "../config";

export class GeminiService {
  private client: GoogleGenAI | null = null;

  constructor() {
    this.initializeClient();
  }

  private initializeClient(): void {
    const apiKey = configManager.getGeminiApiKey();
    if (apiKey) {
      this.client = new GoogleGenAI({ apiKey });
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
      const defaultPrompt = `
# 角色
你是一位严谨的版本控制专家，熟练掌握 Conventional Commits v1.0.0。

- 仅根据 <<DIFF>> 内的 **实际代码行**（以 + / - 开头）生成 commit message。
- **禁止捏造** diff 中不存在的功能、文件或改动。
- 类型暂固定为 feat；如果 diff 中只有注释或文档改动，也请如实描述其内容。
- 输出格式必须严格如下（勿包含多余内容）：
- 使用中文语言

feat(<scope>): <一句话描述，祈使句，≤ 72 字符>

- <改动点 1>
- <改动点 2>
- <改动点 3>

## DIFF
<<DIFF>>
${diff}
<<END>>
`;

      const prompt = customPrompt
        ? customPrompt.replace("{{diff}}", diff)
        : defaultPrompt;

      const result = await this.client.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      const text = result.text;

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
