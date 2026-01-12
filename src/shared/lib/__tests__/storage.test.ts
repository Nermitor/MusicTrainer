import { describe, it, expect, beforeEach } from 'vitest';
import { saveToStorage, loadFromStorage } from '../storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveToStorage', () => {
    it('should save data to localStorage', () => {
      const data = { name: 'Test', value: 42 };
      saveToStorage('test-key', data);
      
      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify(data));
    });

    it('should handle different data types', () => {
      saveToStorage('string', 'hello');
      saveToStorage('number', 123);
      saveToStorage('boolean', true);
      saveToStorage('array', [1, 2, 3]);
      saveToStorage('object', { a: 1, b: 2 });

      expect(localStorage.getItem('string')).toBe('"hello"');
      expect(localStorage.getItem('number')).toBe('123');
      expect(localStorage.getItem('boolean')).toBe('true');
      expect(localStorage.getItem('array')).toBe('[1,2,3]');
      expect(localStorage.getItem('object')).toBe('{"a":1,"b":2}');
    });

    it('should overwrite existing data', () => {
      saveToStorage('test', 'first');
      saveToStorage('test', 'second');
      
      expect(localStorage.getItem('test')).toBe('"second"');
    });
  });

  describe('loadFromStorage', () => {
    it('should load data from localStorage', () => {
      const data = { name: 'Test', value: 42 };
      localStorage.setItem('test-key', JSON.stringify(data));
      
      const loaded = loadFromStorage<typeof data>('test-key');
      expect(loaded).toEqual(data);
    });

    it('should return null for non-existent keys', () => {
      const loaded = loadFromStorage('non-existent');
      expect(loaded).toBeNull();
    });

    it('should return null for invalid JSON', () => {
      localStorage.setItem('invalid', 'not-json{');
      const loaded = loadFromStorage('invalid');
      expect(loaded).toBeNull();
    });

    it('should handle different data types', () => {
      localStorage.setItem('string', '"hello"');
      localStorage.setItem('number', '123');
      localStorage.setItem('boolean', 'true');
      localStorage.setItem('array', '[1,2,3]');
      localStorage.setItem('object', '{"a":1,"b":2}');

      expect(loadFromStorage<string>('string')).toBe('hello');
      expect(loadFromStorage<number>('number')).toBe(123);
      expect(loadFromStorage<boolean>('boolean')).toBe(true);
      expect(loadFromStorage<number[]>('array')).toEqual([1, 2, 3]);
      expect(loadFromStorage<{ a: number; b: number }>('object')).toEqual({ a: 1, b: 2 });
    });
  });

  describe('integration', () => {
    it('should save and load data correctly', () => {
      const originalData = {
        profiles: [
          { id: '1', name: 'Profile 1' },
          { id: '2', name: 'Profile 2' },
        ],
        settings: { speed: 1.5, volume: 0.8 },
      };

      saveToStorage('app-data', originalData);
      const loadedData = loadFromStorage<typeof originalData>('app-data');

      expect(loadedData).toEqual(originalData);
    });
  });
});
