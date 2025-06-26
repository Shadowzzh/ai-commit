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
阅读 <<DIFF>> 中的 **真实 Git diff 行**（仅以 + / - 开头的行），并生成 **且仅生成一条** commit message，须满足以下规则：

- **禁止臆测**：不得凭空添加 diff 中不存在的功能、文件或改动。
- **按改动内容选择最合适的 type**
   可选列表（遵循 Conventional Commits）：
   - feat      新功能或特性
   - fix       缺陷修复
   - docs      仅文档变更
   - style     代码格式（空格、缩进、缺少分号……）
   - refactor  重构：既不修复 bug，也不加新功能
   - perf      性能提升
   - test      添加或修改测试
   - build     构建系统或依赖变更
   - ci        CI 配置或脚本变更
   - chore     其他无法归类的杂项
   - revert    回滚提交
   \* 如一次 diff 同时涉及多种改动，**择其主要影响作为 type**，其余放到改动点列表中说明。
- 类型暂固定为 feat；如果 diff 中只有注释或文档改动，也请如实描述其内容。
- 使用中文语言
-  **只输出一条消息**：即便 diff 涉及多个文件 / 模块，也要合并为一条，确保主题语义清晰。
- 输出格式可参考如下（勿包含多余内容）：
  “feat(<scope>): <一句话描述，祈使句，≤ 72 字符>
  - <改动点 1>
  - <改动点 2>
  - <改动点 3>”

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
