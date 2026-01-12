import type { Note } from '../types';

/**
 * MIDI сдвиг для интерпретации нот на октаву выше
 */
export const MIDI_OFFSET = 12;

/**
 * Базовые натуральные ноты (без диезов и бемолей)
 */
export const NATURAL_NOTES: Note[] = [
  { key: 'c', midi: 60, name: 'C4', ruName: 'До' },
  { key: 'd', midi: 62, name: 'D4', ruName: 'Ре' },
  { key: 'e', midi: 64, name: 'E4', ruName: 'Ми' },
  { key: 'f', midi: 65, name: 'F4', ruName: 'Фа' },
  { key: 'g', midi: 67, name: 'G4', ruName: 'Соль' },
  { key: 'a', midi: 69, name: 'A4', ruName: 'Ля' },
  { key: 'b', midi: 71, name: 'B4', ruName: 'Си' },
  { key: 'c', midi: 72, name: 'C5', ruName: 'До' },
  { key: 'd', midi: 74, name: 'D5', ruName: 'Ре' },
  { key: 'e', midi: 76, name: 'E5', ruName: 'Ми' },
  { key: 'f', midi: 77, name: 'F5', ruName: 'Фа' },
  { key: 'g', midi: 79, name: 'G5', ruName: 'Соль' },
  { key: 'a', midi: 81, name: 'A5', ruName: 'Ля' },
  { key: 'b', midi: 83, name: 'B5', ruName: 'Си' },
];

/**
 * Ноты с диезами и бемолями
 */
export const ACCIDENTAL_NOTES: Note[] = [
  { key: 'c', midi: 61, name: 'C#4', acc: '#', ruName: 'До♯' },
  { key: 'd', midi: 63, name: 'D#4', acc: '#', ruName: 'Ре♯' },
  { key: 'f', midi: 66, name: 'F#4', acc: '#', ruName: 'Фа♯' },
  { key: 'g', midi: 68, name: 'G#4', acc: '#', ruName: 'Соль♯' },
  { key: 'a', midi: 70, name: 'A#4', acc: '#', ruName: 'Ля♯' },
  { key: 'c', midi: 73, name: 'C#5', acc: '#', ruName: 'До♯' },
  { key: 'd', midi: 75, name: 'D#5', acc: '#', ruName: 'Ре♯' },
  { key: 'f', midi: 78, name: 'F#5', acc: '#', ruName: 'Фа♯' },
  { key: 'g', midi: 80, name: 'G#5', acc: '#', ruName: 'Соль♯' },
  { key: 'a', midi: 82, name: 'A#5', acc: '#', ruName: 'Ля♯' },
];

/**
 * Соответствие MIDI номера ноты её размещению на нотном стане
 * (на линии или между линиями)
 */
export const NOTE_PLACEMENTS: Record<number, 'on' | 'between'> = {
  60: 'between', // C4
  61: 'between', // C#4
  62: 'on',      // D4
  63: 'on',      // D#4
  64: 'between', // E4
  65: 'on',      // F4
  66: 'on',      // F#4
  67: 'between', // G4
  68: 'between', // G#4
  69: 'on',      // A4
  70: 'on',      // A#4
  71: 'between', // B4
  72: 'on',      // C5
  73: 'on',      // C#5
  74: 'between', // D5
  75: 'between', // D#5
  76: 'on',      // E5
  77: 'between', // F5
  78: 'between', // F#5
  79: 'on',      // G5
  80: 'on',      // G#5
  81: 'between', // A5
  82: 'between', // A#5
  83: 'on',      // B5
};
