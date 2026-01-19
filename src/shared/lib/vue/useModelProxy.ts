import { computed, type WritableComputedRef } from 'vue';

/**
 * Создаёт двустороннюю привязку для вложенного свойства v-model
 * @param props - props компонента
 * @param emit - emit функция компонента
 * @param key - ключ свойства в modelValue
 * @returns WritableComputedRef для использования с v-model
 */
export function useModelProxy<T extends Record<string, unknown>, K extends keyof T>(
  props: { modelValue: T },
  emit: (event: 'update:modelValue', value: T) => void,
  key: K
): WritableComputedRef<T[K]> {
  return computed({
    get: () => props.modelValue[key],
    set: (value) => emit('update:modelValue', { ...props.modelValue, [key]: value }),
  });
}

/**
 * Создаёт несколько proxy computed properties для вложенных свойств v-model
 * @param props - props компонента
 * @param emit - emit функция компонента
 * @param keys - массив ключей свойств
 * @returns объект с WritableComputedRef для каждого ключа
 */
export function useModelProxies<T extends Record<string, unknown>>(
  props: { modelValue: T },
  emit: (event: 'update:modelValue', value: T) => void,
  keys: (keyof T)[]
): { [K in keyof T]: WritableComputedRef<T[K]> } {
  const proxies = {} as { [K in keyof T]: WritableComputedRef<T[K]> };
  
  for (const key of keys) {
    proxies[key] = useModelProxy(props, emit, key);
  }
  
  return proxies;
}
