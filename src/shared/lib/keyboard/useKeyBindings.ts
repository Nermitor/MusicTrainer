import { ref } from 'vue';

const STORAGE_KEY = 'customKeyBindings';
const keyboardMapping = ref<Record<string, number>>({});
const rawBindings = ref<Record<number, string>>({});
let initialized = false;

function buildKeyboardMapping(bindings: Record<number, string>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [midi, key] of Object.entries(bindings)) {
    if (typeof key === 'string') {
      result[key.toLowerCase()] = Number(midi);
    }
  }
  return result;
}

function refreshFromStorage() {
  if (typeof window === 'undefined') return; // SSR check
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    rawBindings.value = {};
    keyboardMapping.value = {};
    return;
  }
  try {
    const bindings = JSON.parse(saved) as Record<number, string>;
    rawBindings.value = bindings || {};
    keyboardMapping.value = buildKeyboardMapping(rawBindings.value);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load custom key bindings:', e);
    }
    rawBindings.value = {};
    keyboardMapping.value = {};
  }
}

function ensureInitialized() {
  if (!initialized && typeof window !== 'undefined') {
    // Инициализируем синхронно, но только если на клиенте
    // Это безопасно, так как localStorage доступен только на клиенте
    refreshFromStorage();
    initialized = true;
  } else if (!initialized) {
    // SSR - помечаем как инициализированный, но не читаем localStorage
    initialized = true;
  }
}

export function useKeyBindings() {
  ensureInitialized();

  /**
   * Сохраняет пользовательские привязки клавиш в localStorage
   * @param bindings - объект, где ключ - MIDI номер, значение - клавиша
   */
  function saveKeyBindings(bindings: Record<number, string>) {
    if (typeof window === 'undefined') return; // SSR check
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bindings));
      rawBindings.value = { ...bindings };
      keyboardMapping.value = buildKeyboardMapping(rawBindings.value);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to save custom key bindings:', e);
      }
    }
  }

  /**
   * Загружает привязки в обратном формате (MIDI -> key) для редактора
   * @returns Record<number, string> - объект, где ключ - MIDI номер, значение - клавиша
   */
  function loadRawBindings(): Record<number, string> {
    refreshFromStorage();
    return { ...rawBindings.value };
  }

  /**
   * Очищает все пользовательские привязки
   */
  function clearKeyBindings() {
    if (typeof window === 'undefined') return; // SSR check
    localStorage.removeItem(STORAGE_KEY);
    rawBindings.value = {};
    keyboardMapping.value = {};
  }

  /**
   * Проверяет, есть ли сохраненные привязки
   */
  function hasBindings(): boolean {
    return Object.keys(rawBindings.value).length > 0;
  }

  /**
   * Получает количество настроенных привязок
   */
  function getBindingsCount(): number {
    return Object.keys(rawBindings.value).length;
  }

  return {
    keyboardMapping,
    rawBindings,
    refresh: refreshFromStorage,
    saveKeyBindings,
    loadRawBindings,
    clearKeyBindings,
    hasBindings,
    getBindingsCount,
  };
}
