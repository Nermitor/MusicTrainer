import type { TrainingSettings } from '@/shared/types';

/**
 * Типы для профилей пользователя
 */
export namespace ProfileTypes {
  /**
   * Профиль пользователя с настройками тренировки
   */
  export type Profile = TrainingSettings & {
    id: string;
    name: string;
  };
}
