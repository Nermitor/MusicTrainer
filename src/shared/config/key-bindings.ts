/**
 * Конфигурация раскладок клавиш для виртуального пианино
 */

export type KeyBindingLayout = 'chromatic' | 'daw' | 'piano';

export interface KeyBindingConfig {
  id: KeyBindingLayout;
  name: string;
  description: string;
  mapping: Record<string, number>;
}

/**
 * Хроматическая раскладка - каждый ряд = одна октава (все 12 полутонов подряд)
 */
const CHROMATIC_MAPPING: Record<string, number> = {
  // Первая октава (C4-B4) - ряд Q
  'q': 60, 'w': 61, 'e': 62, 'r': 63, 't': 64, 'y': 65,
  'u': 66, 'i': 67, 'o': 68, 'p': 69, '[': 70, ']': 71,
  
  // Вторая октава (C5-B5) - ряд A
  'a': 72, 's': 73, 'd': 74, 'f': 75, 'g': 76, 'h': 77,
  'j': 78, 'k': 79, 'l': 80, ';': 81, "'": 82, '\\': 83,
};

/**
 * DAW раскладка - как в профессиональных DAW (белые и черные клавиши перемешаны)
 */
const DAW_MAPPING: Record<string, number> = {
  // Первая октава (C4-B4) - нижний ряд
  'z': 60,  // C4
  's': 61,  // C#4
  'x': 62,  // D4
  'd': 63,  // D#4
  'c': 64,  // E4
  'v': 65,  // F4
  'g': 66,  // F#4
  'b': 67,  // G4
  'h': 68,  // G#4
  'n': 69,  // A4
  'j': 70,  // A#4
  'm': 71,  // B4
  
  // Вторая октава (C5-B5) - средний ряд
  'q': 72,  // C5
  'a': 73,  // C#5
  'w': 74,  // D5
  'f': 75,  // D#5
  'e': 76,  // E5
  'r': 77,  // F5
  'k': 78,  // F#5
  't': 79,  // G5
  'l': 80,  // G#5
  'y': 81,  // A5
  ';': 82,  // A#5
  'u': 83,  // B5
};

/**
 * Пианино раскладка - белые и черные клавиши логически разделены
 */
const PIANO_MAPPING: Record<string, number> = {
  // Первая октава - белые клавиши
  'z': 60,  // C4
  'x': 62,  // D4
  'c': 64,  // E4
  'v': 65,  // F4
  'b': 67,  // G4
  'n': 69,  // A4
  'm': 71,  // B4
  
  // Первая октава - черные клавиши
  's': 61,  // C#4
  'd': 63,  // D#4
  'g': 66,  // F#4
  'h': 68,  // G#4
  'j': 70,  // A#4
  
  // Вторая октава - белые клавиши
  'q': 72,  // C5
  'w': 74,  // D5
  'e': 76,  // E5
  'r': 77,  // F5
  't': 79,  // G5
  'y': 81,  // A5
  'u': 83,  // B5
  
  // Вторая октава - черные клавиши
  'a': 73,  // C#5
  'f': 75,  // D#5
  'k': 78,  // F#5
  'l': 80,  // G#5
  ';': 82,  // A#5
};

/**
 * Доступные раскладки клавиатуры
 */
export const KEY_BINDINGS: KeyBindingConfig[] = [
  {
    id: 'chromatic',
    name: 'Хроматическая',
    description: 'Каждый ряд = одна октава (все полутоны подряд)',
    mapping: CHROMATIC_MAPPING,
  },
  {
    id: 'daw',
    name: 'DAW стиль',
    description: 'Как в профессиональных DAW (FL Studio, Ableton)',
    mapping: DAW_MAPPING,
  },
  {
    id: 'piano',
    name: 'Пианино',
    description: 'Белые и черные клавиши на разных рядах',
    mapping: PIANO_MAPPING,
  },
];

/**
 * Получить маппинг по ID раскладки
 */
export function getKeyBindingMapping(layoutId: KeyBindingLayout): Record<string, number> {
  const binding = KEY_BINDINGS.find(b => b.id === layoutId);
  return binding?.mapping || CHROMATIC_MAPPING;
}
