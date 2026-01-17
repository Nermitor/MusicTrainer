import { computed } from 'vue';
import type { TrainingSettings } from '@/shared/types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '@/shared/lib';
import type { ProfileTypes } from '../types';

/**
 * Composable для работы с профилями пользователя
 * Использует useState для SSR-совместимого глобального состояния
 */
export const useProfile = () => {
  // Используем useState для SSR-совместимого глобального состояния
  // useState автоматически синхронизирует состояние между сервером и клиентом
  const profiles = useState<ProfileTypes.Profile[]>('profiles', () => []);
  
  /**
   * Загрузить профили из localStorage (ленивая загрузка)
   */
  const loadProfiles = (): void => {
    // Проверяем, не загружены ли уже профили
    if (profiles.value.length === 0) {
      // loadFromStorage уже проверяет SSR, дополнительная проверка не нужна
      profiles.value = loadFromStorage<ProfileTypes.Profile[]>(STORAGE_KEYS.PROFILES, []) ?? [];
    }
  };
  
  /**
   * Сохранить профили в localStorage (с дебаунсом)
   */
  const saveProfiles = (immediate = false): void => {
    saveToStorage(STORAGE_KEYS.PROFILES, profiles.value, immediate);
  };
  
  /**
   * Создать новый профиль
   */
  const createProfile = (name: string, settings: TrainingSettings): ProfileTypes.Profile => {
    const profile: ProfileTypes.Profile = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: name.trim(),
      ...settings,
    };
    
    profiles.value.push(profile);
    // Сохраняем сразу для критичной операции создания
    saveProfiles(true);
    
    return profile;
  };
  
  /**
   * Удалить профиль по ID
   */
  const deleteProfile = (id: string): void => {
    profiles.value = profiles.value.filter((p) => p.id !== id);
    // Сохраняем сразу для критичной операции удаления
    saveProfiles(true);
  };
  
  /**
   * Получить профиль по ID
   */
  const getProfileById = (id: string): ProfileTypes.Profile | undefined => {
    return profiles.value.find((p) => p.id === id);
  };
  
  /**
   * Получить количество профилей
   */
  const profileCount = computed(() => profiles.value.length);
  
  return {
    profiles,
    profileCount,
    loadProfiles,
    saveProfiles,
    createProfile,
    deleteProfile,
    getProfileById,
  };
};
