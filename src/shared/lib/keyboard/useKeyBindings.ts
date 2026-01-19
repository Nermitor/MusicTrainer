import { computed } from 'vue';
import { useStorage } from '@vueuse/core';

const STORAGE_KEY = 'customKeyBindings';

// Синглтон для хранения состояния (общий для всех вызовов useKeyBindings)
let rawBindings: ReturnType<typeof useStorage<Record<number, string>>> | null = null;
let keyboardMapping: ReturnType<typeof computed<Record<string, number>>> | null = null;

function refreshFromStorage() {
  // useStorage автоматически синхронизируется с localStorage, ничего не нужно делать
}

export function useKeyBindings() {
  // Инициализируем useStorage только один раз при первом вызове
  // Это безопасно для SSR, так как выполняется внутри composable функции
  if (!rawBindings) {
    rawBindings = useStorage<Record<number, string>>(STORAGE_KEY, {}, undefined, {
      serializer: {
        read: (v: string) => {
          if (!v) return {};
          try {
            return JSON.parse(v) as Record<number, string>;
          } catch {
            return {};
          }
        },
        write: (v: Record<number, string>) => JSON.stringify(v),
      },
    });

    // Вычисляемое значение для маппинга клавиш (key -> midi)
    keyboardMapping = computed<Record<string, number>>(() => {
      if (!rawBindings) return {};
      const result: Record<string, number> = {};
      for (const [midi, key] of Object.entries(rawBindings.value)) {
        if (typeof key === 'string') {
          result[key.toLowerCase()] = Number(midi);
        }
      }
      return result;
    });
  }
  
  // Гарантируем, что rawBindings и keyboardMapping инициализированы
  // Это защита от редких случаев, когда они могут быть null
  if (!rawBindings || !keyboardMapping) {
    throw new Error('useKeyBindings: Failed to initialize key bindings storage');
  }
  
  /**
   * Сохраняет пользовательские привязки клавиш в localStorage
   * @param bindings - объект, где ключ - MIDI номер, значение - клавиша
   */
  function saveKeyBindings(bindings: Record<number, string>) {
    if (!rawBindings) {
      throw new Error('useKeyBindings: rawBindings not initialized');
    }
    rawBindings.value = { ...bindings };
    // useStorage автоматически сохраняет в localStorage
  }

  /**
   * Загружает привязки в обратном формате (MIDI -> key) для редактора
   * @returns Record<number, string> - объект, где ключ - MIDI номер, значение - клавиша
   */
  function loadRawBindings(): Record<number, string> {
    if (!rawBindings) {
      throw new Error('useKeyBindings: rawBindings not initialized');
    }
    return { ...rawBindings.value };
  }

  /**
   * Очищает все пользовательские привязки
   */
  function clearKeyBindings() {
    if (!rawBindings) {
      throw new Error('useKeyBindings: rawBindings not initialized');
    }
    rawBindings.value = {};
    // useStorage автоматически обновит localStorage
  }

  /**
   * Проверяет, есть ли сохраненные привязки
   */
  function hasBindings(): boolean {
    if (!rawBindings) {
      return false;
    }
    return Object.keys(rawBindings.value).length > 0;
  }

  /**
   * Получает количество настроенных привязок
   */
  function getBindingsCount(): number {
    if (!rawBindings) {
      return 0;
    }
    return Object.keys(rawBindings.value).length;
  }

  return {
    // Гарантируем, что keyboardMapping не null (инициализируется выше)
    keyboardMapping: keyboardMapping!,
    // Гарантируем, что rawBindings не null (инициализируется выше)
    rawBindings: rawBindings!,
    refresh: refreshFromStorage,
    saveKeyBindings,
    loadRawBindings,
    clearKeyBindings,
    hasBindings,
    getBindingsCount,
  };
}
