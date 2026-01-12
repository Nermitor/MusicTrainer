import { ref, computed } from 'vue';
import type { TrainingSession, NoteAttempt } from '@/shared/types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '@/shared/lib';
import type { StatisticsTypes } from '../types';

const DEFAULT_STATISTICS: StatisticsTypes.Statistics = {
  totalSessions: 0,
  totalNotes: 0,
  totalCorrect: 0,
  totalWrong: 0,
  overallAccuracy: 0,
  bestStreak: 0,
  sessions: [],
  noteStats: {},
};

/**
 * Composable для работы со статистикой тренировок
 */
export const useStatistics = () => {
  const statistics = ref<StatisticsTypes.Statistics>({ ...DEFAULT_STATISTICS });
  
  /**
   * Загрузить статистику из localStorage
   */
  const loadStatistics = (): void => {
    statistics.value = loadFromStorage<StatisticsTypes.Statistics>(
      STORAGE_KEYS.STATISTICS,
      DEFAULT_STATISTICS
    );
  };
  
  /**
   * Сохранить статистику в localStorage
   */
  const saveStatistics = (): void => {
    saveToStorage(STORAGE_KEYS.STATISTICS, statistics.value);
  };
  
  /**
   * Обновить статистику по конкретной ноте
   */
  const updateNoteStats = (attempt: NoteAttempt): void => {
    const noteName = attempt.noteName;
    
    if (!statistics.value.noteStats[noteName]) {
      statistics.value.noteStats[noteName] = {
        correct: 0,
        wrong: 0,
        avgReactionTime: 0,
      };
    }
    
    const stat = statistics.value.noteStats[noteName];
    
    if (attempt.correct) {
      stat.correct++;
    } else {
      stat.wrong++;
    }
    
    const total = stat.correct + stat.wrong;
    stat.avgReactionTime = Math.round(
      (stat.avgReactionTime * (total - 1) + attempt.reactionTime) / total
    );
  };
  
  /**
   * Добавить завершенную сессию в статистику
   */
  const addSession = (session: TrainingSession): void => {
    statistics.value.sessions.unshift(session);
    statistics.value.totalSessions++;
    statistics.value.totalNotes += session.totalNotes;
    statistics.value.totalCorrect += session.correctNotes;
    statistics.value.totalWrong += session.wrongNotes;
    
    statistics.value.overallAccuracy =
      statistics.value.totalNotes > 0
        ? Math.round((statistics.value.totalCorrect / statistics.value.totalNotes) * 100)
        : 0;
    
    session.attempts.forEach((attempt) => {
      updateNoteStats(attempt);
    });
    
    saveStatistics();
  };
  
  /**
   * Очистить всю статистику
   */
  const clearStatistics = (): void => {
    statistics.value = { ...DEFAULT_STATISTICS };
    saveStatistics();
  };
  
  /**
   * Получить последние N сессий
   */
  const getRecentSessions = (count: number = 20): TrainingSession[] => {
    return statistics.value.sessions.slice(0, count);
  };
  
  /**
   * Получить статистику по конкретной ноте
   */
  const getNoteStats = (noteName: string): StatisticsTypes.NoteStatistics | undefined => {
    return statistics.value.noteStats[noteName];
  };
  
  /**
   * Проверить, есть ли сессии
   */
  const hasSessions = computed(() => statistics.value.sessions.length > 0);
  
  /**
   * Получить общую точность
   */
  const accuracy = computed(() => statistics.value.overallAccuracy);
  
  return {
    statistics,
    hasSessions,
    accuracy,
    loadStatistics,
    saveStatistics,
    addSession,
    clearStatistics,
    getRecentSessions,
    getNoteStats,
  };
};
