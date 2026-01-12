import type { Note, NotePlacement, OctaveRange, LocationRange } from '../types';
import { NOTE_PLACEMENTS } from '../config';

/**
 * Получить русское название ноты по MIDI номеру
 */
export function getRussianNoteName(midi: number, notes: Note[]): string {
  const note = notes.find((n) => n.midi === midi);
  return note?.ruName || '';
}

/**
 * Конвертировать MIDI номер в имя ноты (например, 60 -> "C4")
 */
export function midiToNoteName(midiNum: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midiNum / 12) - 1;
  const noteIndex = midiNum % 12;
  return `${noteNames[noteIndex]}${octave}`;
}

/**
 * Конвертировать MIDI номер в русское название ноты
 */
export function midiToRussianName(midiNum: number): string {
  const noteNames = [
    'До',
    'До♯',
    'Ре',
    'Ре♯',
    'Ми',
    'Фа',
    'Фа♯',
    'Соль',
    'Соль♯',
    'Ля',
    'Ля♯',
    'Си',
  ];
  const noteIndex = midiNum % 12;
  return noteNames[noteIndex];
}

/**
 * Получить размещение ноты на нотном стане
 */
export function getNotePlacement(midi: number): NotePlacement {
  return NOTE_PLACEMENTS[midi] || 'on';
}

/**
 * Фильтр нот по октаве
 */
export function filterNotesByOctave(notes: Note[], octaveRange: OctaveRange): Note[] {
  if (octaveRange === 'all') return notes;
  if (octaveRange === 'octave4') return notes.filter((n) => n.midi >= 60 && n.midi < 72);
  if (octaveRange === 'octave5') return notes.filter((n) => n.midi >= 72 && n.midi < 84);
  return notes;
}

/**
 * Фильтр нот по расположению на нотном стане
 */
export function filterNotesByLocation(notes: Note[], locationRange: LocationRange): Note[] {
  if (locationRange === 'all') return notes;
  return notes.filter((n) => getNotePlacement(n.midi) === locationRange);
}

/**
 * Комбинированный фильтр нот
 */
export function filterNotes(
  notes: Note[],
  octaveRange: OctaveRange,
  locationRange: LocationRange
): Note[] {
  let filtered = filterNotesByOctave(notes, octaveRange);
  filtered = filterNotesByLocation(filtered, locationRange);
  return filtered;
}

/**
 * Получить случайную ноту из массива
 */
export function getRandomNote(notes: Note[]): Note {
  return notes[Math.floor(Math.random() * notes.length)];
}
