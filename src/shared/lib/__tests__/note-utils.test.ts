import { describe, it, expect } from 'vitest';
import { midiToNoteName, midiToRussianName } from '../note-utils';

describe('note-utils', () => {
  describe('midiToNoteName', () => {
    it('should convert MIDI number to note name', () => {
      expect(midiToNoteName(60)).toBe('C4');
      expect(midiToNoteName(61)).toBe('C#4');
      expect(midiToNoteName(62)).toBe('D4');
      expect(midiToNoteName(72)).toBe('C5');
    });

    it('should handle edge cases', () => {
      expect(midiToNoteName(0)).toBe('C-1');
      expect(midiToNoteName(127)).toBe('G9');
    });

    it('should handle middle octave correctly', () => {
      expect(midiToNoteName(48)).toBe('C3'); // C below middle C
      expect(midiToNoteName(60)).toBe('C4'); // Middle C
      expect(midiToNoteName(72)).toBe('C5'); // C above middle C
    });
  });

  describe('midiToRussianName', () => {
    it('should convert MIDI number to Russian note name', () => {
      expect(midiToRussianName(60)).toBe('До');
      expect(midiToRussianName(61)).toBe('До♯');
      expect(midiToRussianName(62)).toBe('Ре');
      expect(midiToRussianName(64)).toBe('Ми');
      expect(midiToRussianName(65)).toBe('Фа');
      expect(midiToRussianName(67)).toBe('Соль');
      expect(midiToRussianName(69)).toBe('Ля');
      expect(midiToRussianName(71)).toBe('Си');
    });

    it('should handle sharps correctly', () => {
      expect(midiToRussianName(61)).toBe('До♯');
      expect(midiToRussianName(63)).toBe('Ре♯');
      expect(midiToRussianName(66)).toBe('Фа♯');
      expect(midiToRussianName(68)).toBe('Соль♯');
      expect(midiToRussianName(70)).toBe('Ля♯');
    });

    it('should handle different octaves', () => {
      expect(midiToRussianName(48)).toBe('До'); // C3
      expect(midiToRussianName(60)).toBe('До'); // C4
      expect(midiToRussianName(72)).toBe('До'); // C5
    });
  });
});
