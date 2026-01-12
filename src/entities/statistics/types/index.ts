import type { TrainingSession } from '@/shared/types';

/**
 * Типы для статистики тренировок
 */
export namespace StatisticsTypes {
  /**
   * Статистика по отдельной ноте
   */
  export type NoteStatistics = {
    correct: number;
    wrong: number;
    avgReactionTime: number;
  };

  /**
   * Общая статистика тренировок
   */
  export type Statistics = {
    totalSessions: number;
    totalNotes: number;
    totalCorrect: number;
    totalWrong: number;
    overallAccuracy: number;
    bestStreak: number;
    sessions: TrainingSession[];
    noteStats: Record<string, NoteStatistics>;
  };
}
