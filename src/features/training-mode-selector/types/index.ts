import type { TrainingMode } from '@/shared/types';

/**
 * Типы для выбора режима тренировки
 */
export namespace TrainingModeSelectorTypes {
  /**
   * Конфигурация режима тренировки
   */
  export type ModeConfig = {
    id: TrainingMode;
    icon: string;
    name: string;
    description: string;
  };
}
