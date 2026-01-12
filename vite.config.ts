import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages будет размещён по адресу: https://<username>.github.io/<repo-name>/
  // Если репозиторий называется MusicTrainer, раскомментируйте строку ниже:
  // base: '/MusicTrainer/',
  base: process.env.GITHUB_ACTIONS ? '/MusicTrainer/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Оптимизация для production
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
