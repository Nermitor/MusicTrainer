import type { TrainingSession } from './training';

/**
 * Статистика по отдельной ноте
 */
export interface NoteStatistics {
  correct: number;
  wrong: number;
  avgReactionTime: number;
}

/**
 * Общая статистика тренировок
 */
export interface Statistics {
  totalSessions: number;
  totalNotes: number;
  totalCorrect: number;
  totalWrong: number;
  overallAccuracy: number;
  bestStreak: number;
  sessions: TrainingSession[];
  noteStats: Record<string, NoteStatistics>;
}
