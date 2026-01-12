import type { TrainingSettings } from './training';

/**
 * Профиль пользователя с настройками тренировки
 */
export interface Profile extends TrainingSettings {
  id: string;
  name: string;
}
