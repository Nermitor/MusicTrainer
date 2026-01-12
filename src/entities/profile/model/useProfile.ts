import { ref, computed } from 'vue';
import type { TrainingSettings } from '@/shared/types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '@/shared/lib';
import type { ProfileTypes } from '../types';

/**
 * Composable для работы с профилями пользователя
 */
export const useProfile = () => {
  const profiles = ref<ProfileTypes.Profile[]>([]);
  
  /**
   * Загрузить профили из localStorage
   */
  const loadProfiles = (): void => {
    profiles.value = loadFromStorage<ProfileTypes.Profile[]>(STORAGE_KEYS.PROFILES, []);
  };
  
  /**
   * Сохранить профили в localStorage
   */
  const saveProfiles = (): void => {
    saveToStorage(STORAGE_KEYS.PROFILES, profiles.value);
  };
  
  /**
   * Создать новый профиль
   */
  const createProfile = (name: string, settings: TrainingSettings): ProfileTypes.Profile => {
    const profile: ProfileTypes.Profile = {
      id: Date.now().toString(),
      name: name.trim(),
      ...settings,
    };
    
    profiles.value.push(profile);
    saveProfiles();
    
    return profile;
  };
  
  /**
   * Удалить профиль по ID
   */
  const deleteProfile = (id: string): void => {
    profiles.value = profiles.value.filter((p) => p.id !== id);
    saveProfiles();
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
