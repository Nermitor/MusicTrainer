import { ref, computed } from 'vue';
import type { OctaveRange, LocationRange } from '@/shared/types';
import { NATURAL_NOTES, ACCIDENTAL_NOTES } from '@/shared/config';
import { filterNotes, getRandomNote } from '@/shared/lib';
import type { NoteTypes } from '../types';

/**
 * Composable для управления нотами
 */
export const useNoteSelection = () => {
  const currentNote = ref<NoteTypes.Note | null>(null);
  const withAccidentals = ref(false);
  const octaveRange = ref<OctaveRange>('all');
  const locationRange = ref<LocationRange>('all');
  
  /**
   * Все доступные ноты (с учетом настроек)
   */
  const availableNotes = computed(() => {
    let notes = [...NATURAL_NOTES];
    
    if (withAccidentals.value) {
      notes = [...notes, ...ACCIDENTAL_NOTES];
    }
    
    return filterNotes(notes, octaveRange.value, locationRange.value);
  });
  
  /**
   * Выбрать случайную ноту
   */
  const selectRandomNote = (): NoteTypes.Note => {
    const note = getRandomNote(availableNotes.value);
    currentNote.value = note;
    return note;
  };
  
  /**
   * Сбросить текущую ноту
   */
  const resetNote = (): void => {
    currentNote.value = null;
  };
  
  /**
   * Установить настройки
   */
  const setSettings = (settings: {
    withAccidentals?: boolean;
    octaveRange?: OctaveRange;
    locationRange?: LocationRange;
  }): void => {
    if (settings.withAccidentals !== undefined) {
      withAccidentals.value = settings.withAccidentals;
    }
    if (settings.octaveRange !== undefined) {
      octaveRange.value = settings.octaveRange;
    }
    if (settings.locationRange !== undefined) {
      locationRange.value = settings.locationRange;
    }
  };
  
  return {
    currentNote,
    availableNotes,
    selectRandomNote,
    resetNote,
    setSettings,
  };
};
