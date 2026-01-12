import { computed } from 'vue';
import type { VirtualPianoTypes } from '../types';
import { midiToNoteName } from '@/shared/lib';

/**
 * Создает массив клавиш пианино для двух октав (C4-B5)
 */
export function usePiano() {
  const pianoKeys = computed<VirtualPianoTypes.PianoKey[]>(() => {
    const keys: VirtualPianoTypes.PianoKey[] = [];
    const startMidi = 60; // C4
    const endMidi = 83; // B5
    
    // Паттерн черных клавиш в октаве (1 = есть, 0 = нет)
    const blackKeyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
    
    for (let midi = startMidi; midi <= endMidi; midi++) {
      const noteIndex = midi % 12;
      const octave = Math.floor(midi / 12) - 1;
      const isBlack = blackKeyPattern[noteIndex] === 1;
      
      keys.push({
        midi,
        note: midiToNoteName(midi),
        octave,
        isBlack,
      });
    }
    
    return keys;
  });

  return {
    pianoKeys,
  };
}
