import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useModelProxy, useModelProxies } from '../useModelProxy';

describe('useModelProxy', () => {
  describe('useModelProxy', () => {
    it('should create a computed property that gets value from modelValue', () => {
      const modelValue = ref({ name: 'John', age: 30 });
      const props = { modelValue: modelValue.value };
      const emit = vi.fn();

      const nameProxy = useModelProxy(props, emit, 'name');
      
      expect(nameProxy.value).toBe('John');
    });

    it('should emit update:modelValue when value changes', () => {
      const modelValue = ref({ name: 'John', age: 30 });
      const props = { modelValue: modelValue.value };
      const emit = vi.fn();

      const nameProxy = useModelProxy(props, emit, 'name');
      nameProxy.value = 'Jane';

      expect(emit).toHaveBeenCalledWith('update:modelValue', { name: 'Jane', age: 30 });
    });

    it('should preserve other properties when updating', () => {
      const modelValue = ref({ name: 'John', age: 30, city: 'NYC' });
      const props = { modelValue: modelValue.value };
      const emit = vi.fn();

      const nameProxy = useModelProxy(props, emit, 'name');
      nameProxy.value = 'Jane';

      const emittedValue = emit.mock.calls[0][1];
      expect(emittedValue).toEqual({ name: 'Jane', age: 30, city: 'NYC' });
    });

    it('should work with different data types', () => {
      const modelValue = ref({ 
        str: 'text', 
        num: 42, 
        bool: true, 
        arr: [1, 2, 3] 
      });
      const props = { modelValue: modelValue.value };
      const emit = vi.fn();

      const numProxy = useModelProxy(props, emit, 'num');
      numProxy.value = 100;

      expect(emit).toHaveBeenCalledWith('update:modelValue', {
        str: 'text',
        num: 100,
        bool: true,
        arr: [1, 2, 3],
      });
    });
  });

  describe('useModelProxies', () => {
    it('should create multiple proxy computed properties', () => {
      const modelValue = ref({ name: 'John', age: 30, city: 'NYC' });
      const props = { modelValue: modelValue.value };
      const emit = vi.fn();

      const proxies = useModelProxies(props, emit, ['name', 'age', 'city']);

      expect(proxies.name.value).toBe('John');
      expect(proxies.age.value).toBe(30);
      expect(proxies.city.value).toBe('NYC');
    });

    it('should emit updates for each proxy independently', () => {
      const modelValue = ref({ name: 'John', age: 30, city: 'NYC' });
      const props = { modelValue: modelValue.value };
      const emit = vi.fn();

      const proxies = useModelProxies(props, emit, ['name', 'age', 'city']);

      proxies.name.value = 'Jane';
      expect(emit).toHaveBeenLastCalledWith('update:modelValue', {
        name: 'Jane',
        age: 30,
        city: 'NYC',
      });

      // Обновляем props.modelValue как это делает Vue в реальной ситуации
      props.modelValue = { name: 'Jane', age: 30, city: 'NYC' };

      proxies.age.value = 25;
      expect(emit).toHaveBeenLastCalledWith('update:modelValue', {
        name: 'Jane',
        age: 25,
        city: 'NYC',
      });
    });

    it('should handle empty keys array', () => {
      const modelValue = ref({ name: 'John' });
      const props = { modelValue: modelValue.value };
      const emit = vi.fn();

      const proxies = useModelProxies(props, emit, []);

      expect(Object.keys(proxies)).toHaveLength(0);
    });

    it('should work with TrainingSettings-like objects', () => {
      const settings = ref({
        speed: 1.0,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
      });
      const props = { modelValue: settings.value };
      const emit = vi.fn();

      const proxies = useModelProxies(props, emit, [
        'speed',
        'withAccidentals',
        'noTimer',
        'showClef',
      ]);

      expect(proxies.speed.value).toBe(1.0);
      expect(proxies.withAccidentals.value).toBe(false);

      proxies.speed.value = 2.5;
      proxies.withAccidentals.value = true;

      expect(emit).toHaveBeenCalledTimes(2);
    });
  });
});
