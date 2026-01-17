/**
 * Утилиты для работы с localStorage
 * Используют process.client для SSR-безопасности
 */

// Проверка на клиент (SSR-безопасно)
const isClient = typeof process !== 'undefined' ? process.client : typeof window !== 'undefined';

// Дебаунс таймеры для каждого ключа
const debounceTimers: Record<string, number | null> = {};
const DEBOUNCE_DELAY = 300; // 300ms задержка для дебаунса

/**
 * Сохранить данные в localStorage с дебаунсом
 */
export function saveToStorage<T>(key: string, data: T, immediate = false): void {
  if (!isClient) return;
  
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
  debounceTimers[key] = window.setTimeout(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      debounceTimers[key] = null;
    } catch (error) {
      console.error(`Error saving to localStorage (key: ${key}):`, error);
      debounceTimers[key] = null;
    }
  }, DEBOUNCE_DELAY) as unknown as number;
}

/**
 * Очистить дебаунс таймер для ключа
 */
function clearDebounceTimer(key: string): void {
  if (debounceTimers[key] !== null && debounceTimers[key] !== undefined) {
    if (typeof window !== 'undefined') {
      window.clearTimeout(debounceTimers[key] as number);
    }
    debounceTimers[key] = null;
  }
}

/**
 * Загрузить данные из localStorage
 */
export function loadFromStorage<T>(key: string, defaultValue?: T): T | null {
  if (!isClient) return defaultValue !== undefined ? defaultValue : null;
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
  if (!isClient) return;
  try {
    localStorage.removeItem(key);
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
  if (!isClient) return false;
  return localStorage.getItem(key) !== null;
}

/**
 * Ключи для хранения данных приложения
 */
export const STORAGE_KEYS = {
  PROFILES: 'musicTrainerProfiles',
  STATISTICS: 'musicTrainerStatistics',
} as const;
