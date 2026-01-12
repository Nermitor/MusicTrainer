import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useProfile } from '../useProfile';
import type { TrainingSettings } from '@/shared/types';

describe('useProfile', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty profiles', () => {
    const { profiles } = useProfile();
    expect(profiles.value).toEqual([]);
  });

  describe('createProfile', () => {
    it('should create a new profile with settings', () => {
      const { createProfile, profiles } = useProfile();
      
      const settings: TrainingSettings = {
        speed: 1.5,
        withAccidentals: true,
        noTimer: false,
        showClef: true,
        alwaysShowHint: false,
        hintDelay: 2,
        octaveRange: 'all',
        locationRange: 'all',
        trainingMode: 'infinite',
        instrumentType: 'piano',
        midiCalibration: 0,
        inputMode: 'virtual-piano',
        enableKeyboardInput: true,
      };

      const profile = createProfile('Test Profile', settings);

      expect(profile.name).toBe('Test Profile');
      expect(profile.speed).toBe(1.5);
      expect(profile.withAccidentals).toBe(true);
      expect(profiles.value).toHaveLength(1);
      expect(profiles.value[0]).toEqual(profile);
    });

    it('should trim profile name', () => {
      const { createProfile } = useProfile();
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

      const profile = createProfile('  Spaced Name  ', settings);

      expect(profile.name).toBe('Spaced Name');
    });

    it('should generate unique IDs', () => {
      const { createProfile, profiles } = useProfile();
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

      const profile1 = createProfile('Profile 1', settings);
      const profile2 = createProfile('Profile 2', settings);

      expect(profile1.id).not.toBe(profile2.id);
      expect(profiles.value).toHaveLength(2);
    });

    it('should save profiles to localStorage', () => {
      const { createProfile } = useProfile();
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

      createProfile('Test', settings);

      const stored = localStorage.getItem('musicTrainerProfiles');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe('Test');
    });
  });

  describe('deleteProfile', () => {
    it('should delete profile by id', () => {
      const { createProfile, deleteProfile, profiles } = useProfile();
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

      const profile1 = createProfile('Profile 1', settings);
      const profile2 = createProfile('Profile 2', settings);

      expect(profiles.value).toHaveLength(2);

      deleteProfile(profile1.id);

      expect(profiles.value).toHaveLength(1);
      expect(profiles.value[0].id).toBe(profile2.id);
    });

    it('should save to localStorage after deletion', () => {
      const { createProfile, deleteProfile } = useProfile();
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

      const profile = createProfile('Test', settings);
      deleteProfile(profile.id);

      const stored = localStorage.getItem('musicTrainerProfiles');
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(0);
    });
  });

  describe('loadProfiles', () => {
    it('should load profiles from localStorage', () => {
      const profilesData = [
        {
          id: '1',
          name: 'Profile 1',
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
        },
      ];

      localStorage.setItem('musicTrainerProfiles', JSON.stringify(profilesData));

      const { profiles, loadProfiles } = useProfile();
      loadProfiles();

      expect(profiles.value).toHaveLength(1);
      expect(profiles.value[0].name).toBe('Profile 1');
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('musicTrainerProfiles', 'invalid-json{');

      const { profiles, loadProfiles } = useProfile();
      loadProfiles();

      expect(profiles.value).toEqual([]);
    });
  });
});
