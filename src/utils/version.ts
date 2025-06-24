import { readFileSync } from "node:fs";
import { join } from "node:path";

export function showVersion(): string {
  try {
    const packageJsonPath = join(__dirname, "../../package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    return packageJson.version;
  } catch {
    return "0.1.0";
  }
}
