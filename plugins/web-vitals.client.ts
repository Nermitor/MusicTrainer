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
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/09d0a9f9-ea71-4228-8202-d9671cc8bda9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'plugins/web-vitals.client.ts:14',message:'Web Vitals plugin init - checking window context',data:{hasWindow:typeof window!=='undefined',hasRequestIdleCallback:typeof window.requestIdleCallback!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    // Используем requestIdleCallback для неблокирующей инициализации
    // Проверяем на window, так как requestIdleCallback должен быть методом window
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window && typeof window.requestIdleCallback === 'function') {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/09d0a9f9-ea71-4228-8202-d9671cc8bda9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'plugins/web-vitals.client.ts:19',message:'Using requestIdleCallback',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      window.requestIdleCallback(() => {
        initWebVitals();
      }, { timeout: 2000 });
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/09d0a9f9-ea71-4228-8202-d9671cc8bda9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'plugins/web-vitals.client.ts:26',message:'Using setTimeout fallback',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      // Fallback для браузеров без requestIdleCallback
      setTimeout(() => {
        initWebVitals();
      }, 1000);
    }
  }
});
