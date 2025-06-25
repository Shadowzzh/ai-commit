import Conf from "conf";

interface ConfigSchema {
  geminiApiKey?: string;
}

export class ConfigManager {
  private config: Conf<ConfigSchema>;

  constructor() {
    this.config = new Conf<ConfigSchema>({
      projectName: "lazy-commit",
      schema: {
        geminiApiKey: {
          type: "string",
          description: "Gemini API Key for AI commit message generation",
        },
      },
    });
  }

  getGeminiApiKey(): string | undefined {
    return this.config.get("geminiApiKey");
  }

  setGeminiApiKey(apiKey: string): void {
    this.config.set("geminiApiKey", apiKey);
  }

  hasGeminiApiKey(): boolean {
    return Boolean(this.config.get("geminiApiKey"));
  }

  getAllConfig(): ConfigSchema {
    return this.config.store;
  }

  resetConfig(): void {
    this.config.clear();
  }
}

export const configManager = new ConfigManager();
