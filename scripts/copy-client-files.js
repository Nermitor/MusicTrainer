/**
 * Скрипт для копирования клиентских файлов из .nuxt/dist/client в .output/public/_nuxt
 * Необходим для работы Nuxt 3 с GitHub Pages
 */
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const sourceDir = join(rootDir, '.nuxt/dist/client');
const targetDir = join(rootDir, '.output/public/_nuxt');

function copyRecursive(src, dest) {
  if (!existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }

  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true });
      }
      copyRecursive(srcPath, destPath);
    } else {
      const destDir = dirname(destPath);
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }
      copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying client files from .nuxt/dist/client to .output/public/_nuxt...');
copyRecursive(sourceDir, targetDir);
console.log('Client files copied successfully!');
