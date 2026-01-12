import { describe, it, expect, beforeEach } from 'vitest';
import { useKeyBindings } from '../useKeyBindings';

describe('useKeyBindings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('keyboardMapping', () => {
    it('should return empty object when no bindings saved', () => {
      const { keyboardMapping } = useKeyBindings();
      expect(keyboardMapping.value).toEqual({});
    });

    it('should load saved bindings from localStorage', () => {
      const bindings = { 60: 'a', 62: 'b', 64: 'c' };
      localStorage.setItem('customKeyBindings', JSON.stringify(bindings));

      const { keyboardMapping } = useKeyBindings();

      expect(keyboardMapping.value).toEqual({
        a: 60,
        b: 62,
        c: 64,
      });
    });

    it('should convert keys to lowercase', () => {
      localStorage.setItem('customKeyBindings', JSON.stringify({ '60': 'A', '62': 'B' }));

      const { keyboardMapping } = useKeyBindings();

      expect(keyboardMapping.value).toEqual({ a: 60, b: 62 });
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('customKeyBindings', 'invalid-json{');

      const { keyboardMapping } = useKeyBindings();

      expect(keyboardMapping.value).toEqual({});
    });
  });

  describe('useKeyBindings composable functions', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should save key bindings', () => {
      const { saveKeyBindings } = useKeyBindings();
      const bindings = { 60: 'a', 62: 's', 64: 'd' };

      saveKeyBindings(bindings);

      const stored = localStorage.getItem('customKeyBindings');
      expect(stored).toBe(JSON.stringify(bindings));
    });

    it('should load raw bindings', () => {
      const bindings = { 60: 'a', 62: 'd', 64: 'f' };
      localStorage.setItem('customKeyBindings', JSON.stringify(bindings));

      const { loadRawBindings } = useKeyBindings();
      const loaded = loadRawBindings();

      expect(loaded).toEqual(bindings);
    });

    it('should clear bindings', () => {
      localStorage.setItem('customKeyBindings', JSON.stringify({ 60: 'a', 61: 'w' }));

      const { clearKeyBindings, keyboardMapping } = useKeyBindings();
      expect(Object.keys(keyboardMapping.value)).toHaveLength(2);

      clearKeyBindings();
      
      expect(localStorage.getItem('customKeyBindings')).toBeNull();
    });

    it('should check if has bindings', () => {
      const { hasBindings, saveKeyBindings } = useKeyBindings();

      expect(hasBindings()).toBe(false);

      saveKeyBindings({ 60: 'a', 62: 's' });
      
      // Нужно пересоздать composable чтобы увидеть изменения
      const { keyboardMapping } = useKeyBindings();
      expect(Object.keys(keyboardMapping.value).length).toBeGreaterThan(0);
    });

    it('should get bindings count', () => {
      localStorage.setItem('customKeyBindings', JSON.stringify({
        60: 'a',
        62: 's',
        64: 'd',
      }));

      const { getBindingsCount } = useKeyBindings();
      expect(getBindingsCount()).toBe(3);
    });
  });
});
