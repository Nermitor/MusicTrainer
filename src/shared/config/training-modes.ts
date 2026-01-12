import type { TrainingMode } from '../types';

/**
 * Конфигурация режима тренировки
 */
export interface TrainingModeConfig {
  id: TrainingMode;
  icon: string;
  name: string;
  description: string;
}

/**
 * Доступные режимы тренировки
 */
export const TRAINING_MODES: TrainingModeConfig[] = [
  {
    id: 'infinite',
    icon: '∞',
    name: 'Бесконечный',
    description: 'Тренировка без ограничений',
  },
  {
    id: 'exam',
    icon: '📝',
    name: 'Экзамен',
    description: '20 нот, оценка в конце',
  },
  {
    id: 'timed',
    icon: '⏱️',
    name: 'На время',
    description: '60 секунд испытание',
  },
  {
    id: 'survival',
    icon: '❤️',
    name: 'Выживание',
    description: '3 жизни, не ошибись!',
  },
];

/**
 * Параметры режимов
 */
export const MODE_PARAMS = {
  exam: {
    totalNotes: 20,
  },
  timed: {
    duration: 60, // seconds
  },
  survival: {
    lives: 3,
  },
} as const;
