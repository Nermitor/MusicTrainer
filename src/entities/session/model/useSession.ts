import { ref, computed, readonly } from 'vue';
import type { TrainingMode, NoteAttempt, TrainingSettings } from '@/shared/types';
import type { SessionTypes } from '../types';

/**
 * Composable для работы с текущей сессией тренировки
 */
export const useSession = () => {
  const currentSession = ref<SessionTypes.Session | null>(null);
  
  /**
   * Начать новую сессию
   */
  const startSession = (mode: TrainingMode, settings: TrainingSettings): void => {
    currentSession.value = {
      id: Date.now().toString(),
      mode,
      startTime: Date.now(),
      endTime: 0,
      duration: 0,
      totalNotes: 0,
      correctNotes: 0,
      wrongNotes: 0,
      accuracy: 0,
      averageReactionTime: 0,
      attempts: [],
      settings: {
        withAccidentals: settings.withAccidentals,
        octaveRange: settings.octaveRange,
        locationRange: settings.locationRange,
      },
    };
  };
  
  /**
   * Завершить текущую сессию
   */
  const endSession = (): SessionTypes.Session | null => {
    if (!currentSession.value) return null;
    
    currentSession.value.endTime = Date.now();
    currentSession.value.duration = currentSession.value.endTime - currentSession.value.startTime;
    
    currentSession.value.accuracy =
      currentSession.value.totalNotes > 0
        ? Math.round((currentSession.value.correctNotes / currentSession.value.totalNotes) * 100)
        : 0;
    
    if (currentSession.value.attempts.length > 0) {
      const totalTime = currentSession.value.attempts.reduce(
        (sum, attempt) => sum + attempt.reactionTime,
        0
      );
      currentSession.value.averageReactionTime = Math.round(
        totalTime / currentSession.value.attempts.length
      );
    }
    
    const completedSession = { ...currentSession.value };
    currentSession.value = null;
    
    return completedSession;
  };
  
  /**
   * Добавить попытку угадать ноту
   */
  const addAttempt = (noteName: string, midi: number, correct: boolean, reactionTime: number = 0): NoteAttempt => {
    const attempt: NoteAttempt = {
      noteName,
      midi,
      correct,
      reactionTime,
      timestamp: Date.now(),
    };
    
    if (currentSession.value) {
      currentSession.value.attempts.push(attempt);
      currentSession.value.totalNotes++;
      
      if (correct) {
        currentSession.value.correctNotes++;
      } else {
        currentSession.value.wrongNotes++;
      }
    }
    
    return attempt;
  };
  
  /**
   * Проверить, активна ли сессия
   */
  const isActive = computed(() => currentSession.value !== null);
  
  /**
   * Получить текущую точность в сессии
   */
  const currentAccuracy = computed(() => {
    if (!currentSession.value || currentSession.value.totalNotes === 0) return 0;
    return Math.round(
      (currentSession.value.correctNotes / currentSession.value.totalNotes) * 100
    );
  });
  
  /**
   * Получить количество угаданных нот
   */
  const notesCompleted = computed(() => currentSession.value?.totalNotes || 0);
  
  return {
    // Оптимизация: используем readonly для предотвращения случайных мутаций извне
    // Методы startSession, endSession, addAttempt все еще могут изменять currentSession
    currentSession: readonly(currentSession),
    isActive,
    currentAccuracy,
    notesCompleted,
    startSession,
    endSession,
    addAttempt,
  };
};
