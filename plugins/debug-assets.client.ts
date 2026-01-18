/**
 * Debug plugin для отладки путей ресурсов и baseURL
 * Только для отладки проблем с загрузкой ассетов
 */

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;
  
  // Запускаем логирование после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logAssetInfo);
  } else {
    // DOM уже загружен
    setTimeout(logAssetInfo, 0);
  }
  
  function logAssetInfo() {
    // #region agent log
    // Логируем информацию о baseURL и путях ресурсов
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => (s as HTMLScriptElement).src);
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"], link[rel="modulepreload"], link[rel="preload"]')).map(l => (l as HTMLLinkElement).href);
    const baseElement = document.querySelector('base');
    const baseHref = baseElement?.getAttribute('href') || '/';
    
    fetch('http://127.0.0.1:7244/ingest/09d0a9f9-ea71-4228-8202-d9671cc8bda9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'plugins/debug-assets.client.ts:18',message:'Debug assets - baseURL and resource paths',data:{baseHref,currentPath:window.location.pathname,scripts:scripts.slice(0,5),links:links.slice(0,5)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  }
});
