/**
 * Nuxt plugin для автоматического отслеживания Web Vitals
 * Выполняется только на клиенте (client-side)
 */

import { useWebVitals } from '@/shared/lib/performance/useWebVitals';

export default defineNuxtPlugin(() => {
  // Инициализируем отслеживание Web Vitals при загрузке приложения
  const { initWebVitals } = useWebVitals();
  
  // Запускаем отслеживание после полной загрузки страницы
  if (typeof window !== 'undefined') {
    // Используем requestIdleCallback для неблокирующей инициализации
    // Проверяем на window, так как requestIdleCallback должен быть методом window
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window && typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => {
        initWebVitals();
      }, { timeout: 2000 });
    } else {
      // Fallback для браузеров без requestIdleCallback
      setTimeout(() => {
        initWebVitals();
      }, 1000);
    }
  }
});
