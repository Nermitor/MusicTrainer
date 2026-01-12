import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSession } from '../useSession';
import type { TrainingSettings } from '@/shared/types';

describe('useSession', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should initialize with no active session', () => {
    const { currentSession, isActive } = useSession();
    
    expect(currentSession.value).toBeNull();
    expect(isActive.value).toBe(false);
  });

  describe('startSession', () => {
    it('should create a new session', () => {
      const { startSession, currentSession, isActive } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: true,
        noTimer: false,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);

      expect(currentSession.value).not.toBeNull();
      expect(isActive.value).toBe(true);
      expect(currentSession.value?.mode).toBe('infinite');
      expect(currentSession.value?.totalNotes).toBe(0);
      expect(currentSession.value?.correctNotes).toBe(0);
      expect(currentSession.value?.wrongNotes).toBe(0);
    });

    it('should store selected settings', () => {
      const { startSession, currentSession } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: true,
        noTimer: false,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'octave4',
        locationRange: 'on',
        trainingMode: 'exam',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('exam', settings);

      expect(currentSession.value?.settings).toEqual({
        withAccidentals: true,
        octaveRange: 'octave4',
        locationRange: 'on',
      });
    });
  });

  describe('addAttempt', () => {
    it('should add attempt and update statistics', () => {
      const { startSession, addAttempt, currentSession } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);

      vi.setSystemTime(1000);
      const attempt = addAttempt('C4', 60, true);

      expect(attempt.noteName).toBe('C4');
      expect(attempt.midi).toBe(60);
      expect(attempt.correct).toBe(true);
      expect(currentSession.value?.totalNotes).toBe(1);
      expect(currentSession.value?.correctNotes).toBe(1);
      expect(currentSession.value?.wrongNotes).toBe(0);
    });

    it('should track reaction time', () => {
      const { startSession, recordNoteStart, addAttempt } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);

      vi.setSystemTime(1000);
      recordNoteStart();
      
      vi.setSystemTime(2500); // 1500ms later
      const attempt = addAttempt('D4', 62, true);

      expect(attempt.reactionTime).toBe(1500);
    });

    it('should handle incorrect attempts', () => {
      const { startSession, addAttempt, currentSession } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);

      addAttempt('C4', 60, false);

      expect(currentSession.value?.totalNotes).toBe(1);
      expect(currentSession.value?.correctNotes).toBe(0);
      expect(currentSession.value?.wrongNotes).toBe(1);
    });
  });

  describe('currentAccuracy', () => {
    it('should calculate accuracy correctly', () => {
      const { startSession, addAttempt, currentAccuracy } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);

      addAttempt('C4', 60, true);
      addAttempt('D4', 62, true);
      addAttempt('E4', 64, true);
      addAttempt('F4', 65, false);

      expect(currentAccuracy.value).toBe(75); // 3/4 = 75%
    });

    it('should return 0 when no notes attempted', () => {
      const { startSession, currentAccuracy } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);

      expect(currentAccuracy.value).toBe(0);
    });
  });

  describe('endSession', () => {
    it('should complete session and calculate final stats', () => {
      const { startSession, addAttempt, recordNoteStart, endSession } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      vi.setSystemTime(1000);
      startSession('infinite', settings);

      recordNoteStart();
      vi.setSystemTime(2000);
      addAttempt('C4', 60, true);

      recordNoteStart();
      vi.setSystemTime(3500);
      addAttempt('D4', 62, true);

      vi.setSystemTime(5000);
      const session = endSession();

      expect(session).not.toBeNull();
      expect(session?.duration).toBe(4000); // 5000 - 1000
      expect(session?.accuracy).toBe(100);
      expect(session?.averageReactionTime).toBe(1250); // (1000 + 1500) / 2
    });

    it('should reset current session', () => {
      const { startSession, endSession, currentSession, isActive } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);
      expect(isActive.value).toBe(true);

      endSession();
      expect(currentSession.value).toBeNull();
      expect(isActive.value).toBe(false);
    });

    it('should return null if no active session', () => {
      const { endSession } = useSession();
      const result = endSession();
      expect(result).toBeNull();
    });
  });

  describe('notesCompleted', () => {
    it('should track number of completed notes', () => {
      const { startSession, addAttempt, notesCompleted } = useSession();
      
      const settings: TrainingSettings = {
        speed: 1,
        withAccidentals: false,
        noTimer: true,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 0,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      startSession('infinite', settings);

      expect(notesCompleted.value).toBe(0);

      addAttempt('C4', 60, true);
      expect(notesCompleted.value).toBe(1);

      addAttempt('D4', 62, false);
      expect(notesCompleted.value).toBe(2);
    });
  });
});
