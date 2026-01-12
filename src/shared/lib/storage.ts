/**
 * Утилиты для работы с localStorage
 */

/**
 * Сохранить данные в localStorage
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
  }
}

/**
 * Загрузить данные из localStorage
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
}

/**
 * Удалить данные из localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
  }
}

/**
 * Проверить, есть ли данные в localStorage
 */
export function hasInStorage(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

/**
 * Ключи для хранения данных приложения
 */
export const STORAGE_KEYS = {
  PROFILES: 'musicTrainerProfiles',
  STATISTICS: 'musicTrainerStatistics',
} as const;
