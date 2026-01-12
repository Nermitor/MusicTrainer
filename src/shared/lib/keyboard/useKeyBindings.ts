import { computed } from 'vue';

const STORAGE_KEY = 'customKeyBindings';

export function useKeyBindings() {
  /**
   * Загружает пользовательские привязки клавиш из localStorage
   * @returns Record<string, number> - объект, где ключ - клавиша (lowercase), значение - MIDI номер
   */
  const keyboardMapping = computed(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const bindings = JSON.parse(saved);
        // Преобразуем в формат Record<string, number>
        const result: Record<string, number> = {};
        for (const [midi, key] of Object.entries(bindings)) {
          if (typeof key === 'string') {
            result[key.toLowerCase()] = Number(midi);
          }
        }
        return result;
      } catch (e) {
        console.error('Failed to load custom key bindings:', e);
      }
    }
    return {};
  });

  /**
   * Сохраняет пользовательские привязки клавиш в localStorage
   * @param bindings - объект, где ключ - MIDI номер, значение - клавиша
   */
  function saveKeyBindings(bindings: Record<number, string>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bindings));
    } catch (e) {
      console.error('Failed to save custom key bindings:', e);
    }
  }

  /**
   * Загружает привязки в обратном формате (MIDI -> key) для редактора
   * @returns Record<number, string> - объект, где ключ - MIDI номер, значение - клавиша
   */
  function loadRawBindings(): Record<number, string> {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load raw key bindings:', e);
      }
    }
    return {};
  }

  /**
   * Очищает все пользовательские привязки
   */
  function clearKeyBindings() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Проверяет, есть ли сохраненные привязки
   */
  function hasBindings(): boolean {
    return Object.keys(keyboardMapping.value).length > 0;
  }

  /**
   * Получает количество настроенных привязок
   */
  function getBindingsCount(): number {
    return Object.keys(keyboardMapping.value).length;
  }

  return {
    keyboardMapping,
    saveKeyBindings,
    loadRawBindings,
    clearKeyBindings,
    hasBindings,
    getBindingsCount,
  };
}
