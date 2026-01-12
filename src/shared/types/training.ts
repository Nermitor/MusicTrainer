/**
 * Режимы тренировки
 */
export type TrainingMode = 'infinite' | 'exam' | 'timed' | 'survival';

/**
 * Диапазоны октав
 */
export type OctaveRange = 'all' | 'octave4' | 'octave5';

/**
 * Расположение ноты на нотном стане
 */
export type LocationRange = 'all' | 'on' | 'between';

/**
 * Типы инструментов для звучания
 */
export type InstrumentType = 'piano' | 'synth' | 'guitar' | 'bass' | 'organ';

/**
 * Режимы ввода нот
 */
export type InputMode = 'midi' | 'virtual-piano';

/**
 * Попытка угадать ноту
 */
export interface NoteAttempt {
  noteName: string;
  midi: number;
  correct: boolean;
  reactionTime: number;
  timestamp: number;
}

/**
 * Сессия тренировки
 */
export interface TrainingSession {
  id: string;
  mode: TrainingMode;
  startTime: number;
  endTime: number;
  duration: number;
  totalNotes: number;
  correctNotes: number;
  wrongNotes: number;
  accuracy: number;
  averageReactionTime: number;
  attempts: NoteAttempt[];
  settings: {
    withAccidentals: boolean;
    octaveRange: string;
    locationRange: string;
  };
}

/**
 * Настройки тренировки
 */
export interface TrainingSettings {
  speed: number;
  withAccidentals: boolean;
  noTimer: boolean;
  showClef: boolean;
  alwaysShowHint: boolean;
  hintDelay: number;
  octaveRange: OctaveRange;
  locationRange: LocationRange;
  trainingMode: TrainingMode;
  instrumentType: InstrumentType;
  midiCalibration: number;
  inputMode: InputMode;
  enableKeyboardInput: boolean;
}
