/**
 * SSR-безопасные утилиты для работы с browser-only API
 */

/**
 * Проверка, выполняется ли код на клиенте
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined' && typeof process !== 'undefined' 
    ? process.client 
    : typeof window !== 'undefined';
};

/**
 * Проверка, выполняется ли код на сервере
 */
export const isServer = (): boolean => {
  return typeof process !== 'undefined' 
    ? process.server 
    : typeof window === 'undefined';
};

/**
 * SSR-безопасный доступ к window объекту
 * @param callback - функция, которая будет выполнена только на клиенте
 * @param fallback - значение, которое будет возвращено на сервере
 */
export const safeWindow = <T>(
  callback: (window: Window) => T,
  fallback?: T
): T | undefined => {
  if (isClient() && typeof window !== 'undefined') {
    return callback(window);
  }
  return fallback;
};

/**
 * SSR-безопасный доступ к localStorage
 * @param callback - функция, которая будет выполнена только на клиенте
 * @param fallback - значение, которое будет возвращено на сервере
 */
export const safeLocalStorage = <T>(
  callback: (localStorage: Storage) => T,
  fallback?: T
): T | undefined => {
  if (isClient() && typeof window !== 'undefined' && window.localStorage) {
    return callback(window.localStorage);
  }
  return fallback;
};

/**
 * SSR-безопасный доступ к document
 * @param callback - функция, которая будет выполнена только на клиенте
 * @param fallback - значение, которое будет возвращено на сервере
 */
export const safeDocument = <T>(
  callback: (document: Document) => T,
  fallback?: T
): T | undefined => {
  if (isClient() && typeof document !== 'undefined') {
    return callback(document);
  }
  return fallback;
};

/**
 * SSR-безопасный доступ к navigator
 * @param callback - функция, которая будет выполнена только на клиенте
 * @param fallback - значение, которое будет возвращено на сервере
 */
export const safeNavigator = <T>(
  callback: (navigator: Navigator) => T,
  fallback?: T
): T | undefined => {
  if (isClient() && typeof navigator !== 'undefined') {
    return callback(navigator);
  }
  return fallback;
};

/**
 * SSR-безопасный setTimeout
 * @param callback - функция для выполнения
 * @param delay - задержка в миллисекундах
 * @returns ID таймера или null на сервере
 */
export const safeSetTimeout = (
  callback: () => void,
  delay: number
): number | null => {
  if (isClient() && typeof window !== 'undefined') {
    return window.setTimeout(callback, delay) as unknown as number;
  }
  return null;
};

/**
 * SSR-безопасный setInterval
 * @param callback - функция для выполнения
 * @param delay - задержка в миллисекундах
 * @returns ID интервала или null на сервере
 */
export const safeSetInterval = (
  callback: () => void,
  delay: number
): number | null => {
  if (isClient() && typeof window !== 'undefined') {
    return window.setInterval(callback, delay) as unknown as number;
  }
  return null;
};

/**
 * SSR-безопасный clearTimeout
 * @param id - ID таймера
 */
export const safeClearTimeout = (id: number | null): void => {
  if (isClient() && typeof window !== 'undefined' && id !== null) {
    window.clearTimeout(id);
  }
};

/**
 * SSR-безопасный clearInterval
 * @param id - ID интервала
 */
export const safeClearInterval = (id: number | null): void => {
  if (isClient() && typeof window !== 'undefined' && id !== null) {
    window.clearInterval(id);
  }
};
