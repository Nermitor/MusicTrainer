import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  // Отключаем devtools в production
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // TypeScript
  typescript: {
    strict: true,
    // Отключаем typeCheck в Nuxt из-за проблемы с vue-tsc и vite-plugin-checker
    // Используйте отдельную команду: npm run type-check
    typeCheck: false
  },

  // SSR режим - для GitHub Pages используется SSG (Static Site Generation)
  // При `nuxt generate` Nuxt автоматически генерирует статические страницы
  ssr: true,

  // Base URL для GitHub Pages
  // Используем проверку CI окружения для правильной работы с GitHub Pages
  // В GitHub Actions переменные CI и GITHUB_ACTIONS всегда установлены как 'true'
  app: {
    baseURL: (process.env.CI || process.env.GITHUB_ACTIONS) ? '/MusicTrainer/' : '/',
    buildAssetsDir: '/_nuxt/',
    // Оптимизация head для SSR
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  // Алиасы для FSD структуры
  alias: {
    '@/': './src/'
  },
  
  // Nitro конфигурация для правильных путей
  nitro: {
    // Используем preset static только для деплоя на GitHub Pages
    // В других окружениях используем node-server для полноценного SSR
    preset: (process.env.CI || process.env.GITHUB_ACTIONS) ? 'static' : 'node-server',
    alias: {
      '@/': './src/'
    },
    // Настройка publicAssets для автоматического копирования клиентских файлов
    // Файлы из .nuxt/dist/client будут доступны по /_nuxt/ в .output/public
    publicAssets: [
      {
        baseURL: '/_nuxt/',
        dir: resolve('.nuxt/dist/client'),
        maxAge: 60 * 60 * 24 * 365 // 1 год кеширования
      }
    ],
    // Оптимизация для production
    compressPublicAssets: process.env.NODE_ENV === 'production',
    sourceMap: process.env.NODE_ENV !== 'production',
    // SSG оптимизации - prerender всех страниц для GitHub Pages
    prerender: {
      routes: ['/', '/training', '/statistics'],
      crawlLinks: true,
    },
    // Настройка кеширования маршрутов для SSG
    routeRules: {
      '/': { 
        prerender: true,
        headers: { 'Cache-Control': 'public, max-age=3600' }
      },
      '/training': { 
        prerender: true,
        headers: { 'Cache-Control': 'public, max-age=3600' }
      },
      '/statistics': { 
        prerender: true,
        headers: { 'Cache-Control': 'public, max-age=3600' }
      },
      '/_nuxt/**': { 
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
      },
    },
  },

  // CSS - глобальные стили
  css: ['~/src/app/styles/index.css'],

  // Конфигурация автоимпортов для совместимости с FSD
  imports: {
    // Автоимпорт только для shared слоя (общие утилиты)
    // Composables из entities, features, widgets НЕ автоимпортируются
    // Они должны импортироваться явно через публичный API (@/entities/*, @/features/*, @/widgets/*)
    // Это гарантирует соблюдение правил FSD импортов (слои могут импортировать только из нижних слоев)
    
    // Автоимпорт composables из shared/lib (опционально - можно импортировать явно)
    // По умолчанию Nuxt сканирует composables/ директорию, но у нас FSD структура
    // Можно настроить автоимпорт только для shared/lib или импортировать явно через @/shared/lib
    dirs: [
      // Автоимпорт из shared/lib (общие утилиты для всех слоев)
      // Примеры: useKeyBindings, useMIDICalibration, useModelProxy
      'src/shared/lib/**/*.{ts,js}',
      // НЕ включаем entities/features/widgets/pages для автоимпорта
      // Это соответствует правилам FSD: эти слои импортируются явно через публичный API
    ],
    
    // Отключаем автоматическое сканирование стандартных директорий composables/utils
    // Это предотвращает автоимпорт из entities/features/widgets, которые находятся вне стандартных директорий
    // Стандартные Vue/Nuxt composables (ref, computed, useRoute, navigateTo и т.д.) все равно автоимпортируются
    global: true, // Оставляем true для стандартных автоимпортов Vue/Nuxt
    
    // Исключаем директории, которые не должны автоимпортироваться (дополнительная защита)
    exclude: [
      // Исключаем entities - должны импортироваться явно через @/entities/*
      /.*[\/\\]entities[\/\\].*/,
      // Исключаем features - должны импортироваться явно через @/features/*
      /.*[\/\\]features[\/\\].*/,
      // Исключаем widgets - должны импортироваться явно через @/widgets/*
      /.*[\/\\]widgets[\/\\].*/,
      // Исключаем pages - должны импортироваться явно через @/pages/*
      /.*[\/\\]pages[\/\\].*/,
      // Исключаем тесты
      /.*[\/\\]__tests__[\/\\].*/,
      /.*\.test\.(ts|js)$/,
      /.*\.spec\.(ts|js)$/,
      // Исключаем типы (используются через namespace)
      /.*[\/\\]types[\/\\].*/,
    ],
    
    // Префикс для автоимпорта composables (опционально)
    // По умолчанию Nuxt автоимпортирует файлы с префиксом 'use' или 'get' или 'is'
    // Это соответствует нашим соглашениям именования (useKeyBindings, useProfile и т.д.)
  },

  // Vite конфигурация для оптимизации сборки
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/': fileURLToPath(new URL('./src/', import.meta.url))
      }
    },
    css: {
      // Оптимизация CSS - отключение sourcemaps для CSS в development для улучшения производительности
      devSourcemap: false,
      // В production CSS уже минифицируется автоматически через Vite
      // PostCSS плагины настраиваются автоматически Nuxt/Vite
    },
    build: {
      // Минификация только для production
      minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
      // Оптимизация terser для production - удаление console.log
      terserOptions: process.env.NODE_ENV === 'production' ? {
        compress: {
          drop_console: true, // Удаляем console.log в production
          drop_debugger: true,
        },
      } : undefined,
      // Sourcemaps только для development
      sourcemap: process.env.NODE_ENV !== 'production',
      // Оптимизация chunk splitting
      rollupOptions: {
        output: {
          // Разделение vendor chunks для лучшего кеширования (только для production)
          manualChunks: process.env.NODE_ENV === 'production' ? ((id: string) => {
            if (id.includes('node_modules')) {
              // Выделяем Tone.js в отдельный chunk
              if (id.includes('tone')) {
                return 'vendor-tone';
              }
              // Выделяем VexFlow в отдельный chunk
              if (id.includes('vexflow')) {
                return 'vendor-vexflow';
              }
              // Vue и Nuxt объединяем в один chunk для избежания циклических зависимостей
              if (id.includes('vue') || id.includes('nuxt') || id.includes('@nuxt')) {
                return 'vendor-vue-nuxt';
              }
              // Остальные vendor библиотеки
              return 'vendor';
            }
          }) : undefined,
          // Оптимизация имен chunk файлов (только для production)
          // В development используем стандартные имена Vite для избежания 404 ошибок
          chunkFileNames: process.env.NODE_ENV === 'production' ? 'chunks/[name]-[hash].js' : undefined,
          entryFileNames: process.env.NODE_ENV === 'production' ? 'entry/[name]-[hash].js' : undefined,
          assetFileNames: process.env.NODE_ENV === 'production' ? 'assets/[name]-[hash].[ext]' : undefined,
        }
      },
      // Предупреждения о больших chunks
      // Увеличиваем лимит до 1200 KB, так как vendor-vexflow (~1100 KB) загружается динамически
      // и не влияет на начальную загрузку страницы
      chunkSizeWarningLimit: 1200,
    },
    // Оптимизация SSR - исключаем клиентские библиотеки из SSR bundle
    ssr: {
      // Исключаем Tone.js и VexFlow из SSR bundle - они требуют browser-only API
      // Tone.js требует AudioContext, VexFlow требует Canvas/DOM
      // Эти библиотеки загружаются только на клиенте через ClientOnly компоненты
      // Не включаем их в noExternal, чтобы они были внешними для SSR
    },
    // Оптимизация зависимостей - исключаем vexflow и tone из предварительной оптимизации
    // чтобы избежать проблем с путями в development режиме
    optimizeDeps: {
      exclude: ['vexflow', 'tone']
    }
  },

  // Experimental features для оптимизации
  experimental: {
    // Оптимизация watcher в development
    watcher: 'chokidar',
    // Уменьшение размера HTML через payload extraction
    payloadExtraction: true,
  },
  
  // Оптимизация CSS - встраивание критического CSS inline для уменьшения render-blocking
  // Nuxt автоматически встраивает критический CSS через renderInlineStyles
  // CSS code splitting уже включено по умолчанию в Vite, что уменьшает размер CSS файлов
})
