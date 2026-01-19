import { computed, readonly } from 'vue';
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

// Лимиты для оптимизации памяти
const MAX_SESSIONS = 100; // Максимальное количество хранимых сессий
const MAX_NOTE_STATS = 50; // Максимальное количество нот в статистике

/**
 * Composable для работы со статистикой тренировок
 * Использует useState для SSR-совместимого глобального состояния
 */
export const useStatistics = () => {
  // Используем useState для SSR-совместимого глобального состояния
  // useState автоматически синхронизирует состояние между сервером и клиентом
  // Примечание: для очень больших массивов (1000+ элементов) можно рассмотреть использование shallowRef
  // но для текущего использования (до 100 сессий) useState оптимален
  const statistics = useState<StatisticsTypes.Statistics>('statistics', () => ({ ...DEFAULT_STATISTICS }));
  
  /**
   * Загрузить статистику из localStorage
   */
  const loadStatistics = (): void => {
    // loadFromStorage уже проверяет SSR, дополнительная проверка не нужна
    statistics.value = loadFromStorage<StatisticsTypes.Statistics>(
      STORAGE_KEYS.STATISTICS,
      DEFAULT_STATISTICS
    ) ?? DEFAULT_STATISTICS;
    
    // Оптимизация памяти: применяем лимиты при загрузке (на случай, если данные были сохранены до введения лимитов)
    if (statistics.value.sessions.length > MAX_SESSIONS) {
      statistics.value.sessions = statistics.value.sessions.slice(0, MAX_SESSIONS);
    }
    limitNoteStats();
  };
  
  /**
   * Сохранить статистику в localStorage (с дебаунсом)
   */
  const saveStatistics = (immediate = false): void => {
    saveToStorage(STORAGE_KEYS.STATISTICS, statistics.value, immediate);
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
    
    // Оптимизация памяти: ограничиваем количество хранимых сессий
    if (statistics.value.sessions.length > MAX_SESSIONS) {
      statistics.value.sessions = statistics.value.sessions.slice(0, MAX_SESSIONS);
    }
    
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
    
    // Оптимизация памяти: ограничиваем количество нот в статистике
    limitNoteStats();
    
    saveStatistics();
  };
  
  /**
   * Ограничить количество нот в статистике до топ N по количеству попыток
   */
  const limitNoteStats = (): void => {
    const noteStats = statistics.value.noteStats;
    const noteEntries = Object.entries(noteStats);
    
    if (noteEntries.length <= MAX_NOTE_STATS) {
      return;
    }
    
    // Сортируем по общему количеству попыток (correct + wrong)
    noteEntries.sort((a, b) => {
      const totalA = a[1].correct + a[1].wrong;
      const totalB = b[1].correct + b[1].wrong;
      return totalB - totalA; // По убыванию
    });
    
    // Оставляем только топ N нот
    const topNotes = noteEntries.slice(0, MAX_NOTE_STATS);
    statistics.value.noteStats = Object.fromEntries(topNotes) as StatisticsTypes.Statistics['noteStats'];
  };
  
  /**
   * Очистить всю статистику
   */
  const clearStatistics = (): void => {
    statistics.value = {
      totalSessions: 0,
      totalNotes: 0,
      totalCorrect: 0,
      totalWrong: 0,
      overallAccuracy: 0,
      bestStreak: 0,
      sessions: [],
      noteStats: {},
    };
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
    // Оптимизация: используем readonly для предотвращения случайных мутаций извне
    // Методы addSession, clearStatistics, updateNoteStats все еще могут изменять statistics
    statistics: readonly(statistics),
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
