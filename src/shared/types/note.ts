/**
 * Музыкальная нота
 */
export interface Note {
  /** Основной ключ ноты (например, "c", "d", "e") */
  key: string;
  /** MIDI номер ноты */
  midi: number;
  /** Полное имя ноты (например, "C4", "D#5") */
  name: string;
  /** Аксидентальный знак (диез/бемоль) если есть */
  acc?: string;
  /** Русское название ноты */
  ruName?: string;
}

/**
 * Типы размещения ноты на нотном стане
 */
export type NotePlacement = 'on' | 'between';
