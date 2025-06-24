import { readFileSync } from 'fs';
import { join } from 'path';

export function showVersion(): string {
  try {
    const packageJsonPath = join(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return packageJson.version;
  } catch (error) {
    return '0.1.0';
  }
}