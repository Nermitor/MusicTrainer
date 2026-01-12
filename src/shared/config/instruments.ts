import type { InstrumentType } from '../types';

/**
 * Конфигурация инструмента
 */
export interface InstrumentConfig {
  id: InstrumentType;
  name: string;
  icon: string;
  toneSynth: string; // Tone.js synth type
}

/**
 * Доступные инструменты
 */
export const INSTRUMENTS: InstrumentConfig[] = [
  {
    id: 'piano',
    name: 'Пианино',
    icon: '🎹',
    toneSynth: 'piano',
  },
  {
    id: 'synth',
    name: 'Синтезатор',
    icon: '🎛️',
    toneSynth: 'synth',
  },
  {
    id: 'guitar',
    name: 'Гитара',
    icon: '🎸',
    toneSynth: 'pluck',
  },
  {
    id: 'bass',
    name: 'Бас',
    icon: '🎸',
    toneSynth: 'membraneSynth',
  },
  {
    id: 'organ',
    name: 'Орган',
    icon: '🎹',
    toneSynth: 'fmSynth',
  },
];

/**
 * Mapping клавиш компьютера на ноты
 * Первый ряд (Q-]): первая октава (C4-B4) - 12 полутонов
 * Второй ряд (A-\): вторая октава (C5-B5) - 12 полутонов
 */
export const KEYBOARD_MAPPING: Record<string, number> = {
  // Первая октава (C4-B4) - ряд Q
  'q': 60,  // C4
  'w': 61,  // C#4
  'e': 62,  // D4
  'r': 63,  // D#4
  't': 64,  // E4
  'y': 65,  // F4
  'u': 66,  // F#4
  'i': 67,  // G4
  'o': 68,  // G#4
  'p': 69,  // A4
  '[': 70,  // A#4
  ']': 71,  // B4
  
  // Вторая октава (C5-B5) - ряд A
  'a': 72,  // C5
  's': 73,  // C#5
  'd': 74,  // D5
  'f': 75,  // D#5
  'g': 76,  // E5
  'h': 77,  // F5
  'j': 78,  // F#5
  'k': 79,  // G5
  'l': 80,  // G#5
  ';': 81,  // A5
  "'": 82,  // A#5
  '\\': 83, // B5
};
