/**
 * Утилиты для работы с localStorage
 * Используют простые функции для обратной совместимости
 * Для реактивного доступа используйте useStorage из @vueuse/core напрямую в composables
 */

// Дебаунс таймеры для каждого ключа
const debounceTimers: Record<string, ReturnType<typeof setTimeout> | null> = {};
const DEBOUNCE_DELAY = 300; // 300ms задержка для дебаунса

/**
 * Проверка доступности localStorage (SSR-безопасно)
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Очистить дебаунс таймер для ключа
 */
function clearDebounceTimer(key: string): void {
  if (debounceTimers[key] !== null && debounceTimers[key] !== undefined) {
    clearTimeout(debounceTimers[key]!);
    debounceTimers[key] = null;
  }
}

/**
 * Сохранить данные в localStorage с дебаунсом
 */
export function saveToStorage<T>(key: string, data: T, immediate = false): void {
  if (!isLocalStorageAvailable()) return;
  
  // Если immediate = true, сохраняем сразу без дебаунса
  if (immediate) {
    clearDebounceTimer(key);
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Error saving to localStorage (key: ${key}):`, error);
      }
    }
    return;
  }
  
  // Очищаем предыдущий таймер для этого ключа
  clearDebounceTimer(key);
  
  // Устанавливаем новый таймер
  debounceTimers[key] = setTimeout(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      debounceTimers[key] = null;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Error saving to localStorage (key: ${key}):`, error);
      }
      debounceTimers[key] = null;
    }
  }, DEBOUNCE_DELAY);
}

/**
 * Загрузить данные из localStorage
 */
export function loadFromStorage<T>(key: string, defaultValue?: T): T | null {
  if (!isLocalStorageAvailable()) return defaultValue !== undefined ? defaultValue : null;
  
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : (defaultValue !== undefined ? defaultValue : null);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error loading from localStorage (key: ${key}):`, error);
    }
    return defaultValue !== undefined ? defaultValue : null;
  }
}

/**
 * Удалить данные из localStorage
 */
export function removeFromStorage(key: string): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.removeItem(key);
    // Очищаем дебаунс таймер, если он есть
    clearDebounceTimer(key);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error removing from localStorage (key: ${key}):`, error);
    }
  }
}

/**
 * Проверить, есть ли данные в localStorage
 */
export function hasInStorage(key: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  return localStorage.getItem(key) !== null;
}

/**
 * Ключи для хранения данных приложения
 */
export const STORAGE_KEYS = {
  PROFILES: 'musicTrainerProfiles',
  STATISTICS: 'musicTrainerStatistics',
} as const;
