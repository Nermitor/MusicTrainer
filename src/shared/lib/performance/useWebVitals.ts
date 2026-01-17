/**
 * Composable для отслеживания Web Vitals метрик
 * Требует установки: npm install web-vitals
 */

// Интерфейс метрики Web Vitals (определен локально, чтобы не требовать установку пакета для типизации)
interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

export interface WebVitalsReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

/**
 * Composable для отслеживания Web Vitals
 */
export const useWebVitals = () => {
  // Логируем метрики только в development
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  /**
   * Обработчик для логирования метрик
   */
  const handleMetric = (metric: Metric) => {
    const report: WebVitalsReport = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    };
    
    // Логируем в development для отладки (убрано для production)
    // if (isDevelopment) {
    //   console.log(`[Web Vitals] ${metric.name}:`, report);
    // }
    
    // Опционально: отправка метрик в аналитику
    // Например, Google Analytics или custom endpoint
    // sendToAnalytics(report);
  };
  
  /**
   * Инициализировать отслеживание Web Vitals
   */
  const initWebVitals = async () => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window === 'undefined') return;
    
    try {
      // Динамический импорт web-vitals для code splitting
      const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
      
      // Отслеживаем все Core Web Vitals метрики
      onCLS(handleMetric);
      onFID(handleMetric);
      onFCP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
      
      // INP (Interaction to Next Paint) - новая метрика для FID
      if (onINP) {
        onINP(handleMetric);
      }
    } catch (error) {
      // Тихо игнорируем ошибки загрузки web-vitals
      if (isDevelopment) {
        // console.warn('Web Vitals tracking not available:', error);
      }
    }
  };
  
  return {
    initWebVitals,
  };
};
