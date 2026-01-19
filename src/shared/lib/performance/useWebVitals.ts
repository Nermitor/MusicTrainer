/**
 * Composable для отслеживания Web Vitals метрик
 * Требует установки: npm install web-vitals
 */

import { isClient } from '../ssr-utils';

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
    
    // Опционально: отправка метрик в аналитику
    // Например, Google Analytics или custom endpoint
    // sendToAnalytics(report);
  };
  
  /**
   * Инициализировать отслеживание Web Vitals
   */
  const initWebVitals = async () => {
    // Проверяем, что код выполняется на клиенте
    if (!isClient()) return;
    
    try {
      // Динамический импорт web-vitals для code splitting
      // В web-vitals v5 onFID удален, используется только onINP
      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
      
      // Отслеживаем все Core Web Vitals метрики
      onCLS(handleMetric);
      onFCP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
      
      // INP (Interaction to Next Paint) - замена FID в web-vitals v5
      if (onINP) {
        onINP(handleMetric);
      }
    } catch (error) {
      // Тихо игнорируем ошибки загрузки web-vitals
      // Ошибки загрузки не критичны для работы приложения
    }
  };
  
  return {
    initWebVitals,
  };
};
