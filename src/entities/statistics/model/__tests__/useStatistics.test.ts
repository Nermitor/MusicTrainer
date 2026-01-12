import { describe, it, expect, beforeEach } from 'vitest';
import { useStatistics } from '../useStatistics';
import type { SessionTypes } from '@/entities/session';

describe('useStatistics', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with zero statistics', () => {
    const { statistics } = useStatistics();
    
    expect(statistics.value.totalNotes).toBe(0);
    expect(statistics.value.totalCorrect).toBe(0);
    expect(statistics.value.totalWrong).toBe(0);
    expect(statistics.value.totalSessions).toBe(0);
    expect(statistics.value.sessions).toEqual([]);
  });

  describe('addSession', () => {
    it('should add session to statistics', () => {
      const { addSession, statistics } = useStatistics();

      const session: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: Date.now(),
        endTime: Date.now() + 60000,
        duration: 60000,
        totalNotes: 10,
        correctNotes: 8,
        wrongNotes: 2,
        accuracy: 80,
        averageReactionTime: 1500,
        notes: [],
      };

      addSession(session);

      expect(statistics.value.totalSessions).toBe(1);
      expect(statistics.value.totalNotes).toBe(10);
      expect(statistics.value.totalCorrect).toBe(8);
      expect(statistics.value.totalWrong).toBe(2);
      expect(statistics.value.sessions).toHaveLength(1);
    });

    it('should accumulate statistics from multiple sessions', () => {
      const { addSession, statistics } = useStatistics();

      const session1: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: Date.now(),
        endTime: Date.now() + 60000,
        duration: 60000,
        totalNotes: 10,
        correctNotes: 8,
        wrongNotes: 2,
        accuracy: 80,
        averageReactionTime: 1500,
        notes: [],
      };

      const session2: SessionTypes.Session = {
        id: '2',
        mode: 'exam',
        startTime: Date.now(),
        endTime: Date.now() + 30000,
        duration: 30000,
        totalNotes: 20,
        correctNotes: 15,
        wrongNotes: 5,
        accuracy: 75,
        averageReactionTime: 1200,
        notes: [],
      };

      addSession(session1);
      addSession(session2);

      expect(statistics.value.totalSessions).toBe(2);
      expect(statistics.value.totalNotes).toBe(30);
      expect(statistics.value.totalCorrect).toBe(23);
      expect(statistics.value.totalWrong).toBe(7);
    });

    it('should save to localStorage after adding session', () => {
      const { addSession } = useStatistics();

      const session: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: Date.now(),
        endTime: Date.now() + 60000,
        duration: 60000,
        totalNotes: 10,
        correctNotes: 8,
        wrongNotes: 2,
        accuracy: 80,
        averageReactionTime: 1500,
        notes: [],
      };

      addSession(session);

      const stored = localStorage.getItem('statistics');
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(parsed.totalSessions).toBe(1);
    });
  });

  describe('clearStatistics', () => {
    it('should reset all statistics', () => {
      const { addSession, clearStatistics, statistics } = useStatistics();

      const session: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: Date.now(),
        endTime: Date.now() + 60000,
        duration: 60000,
        totalNotes: 10,
        correctNotes: 8,
        wrongNotes: 2,
        accuracy: 80,
        averageReactionTime: 1500,
        notes: [],
      };

      addSession(session);
      expect(statistics.value.totalSessions).toBe(1);

      clearStatistics();

      expect(statistics.value.totalNotes).toBe(0);
      expect(statistics.value.totalCorrect).toBe(0);
      expect(statistics.value.totalWrong).toBe(0);
      expect(statistics.value.totalSessions).toBe(0);
      expect(statistics.value.sessions).toEqual([]);
    });

    it('should clear localStorage', () => {
      const { addSession, clearStatistics } = useStatistics();

      const session: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: Date.now(),
        endTime: Date.now() + 60000,
        duration: 60000,
        totalNotes: 10,
        correctNotes: 8,
        wrongNotes: 2,
        accuracy: 80,
        averageReactionTime: 1500,
        notes: [],
      };

      addSession(session);
      clearStatistics();

      const stored = localStorage.getItem('statistics');
      const parsed = JSON.parse(stored!);
      expect(parsed.totalSessions).toBe(0);
    });
  });

  describe('accuracy', () => {
    it('should calculate accuracy correctly', () => {
      const { addSession, accuracy } = useStatistics();

      const session: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: Date.now(),
        endTime: Date.now() + 60000,
        duration: 60000,
        totalNotes: 10,
        correctNotes: 7,
        wrongNotes: 3,
        accuracy: 70,
        averageReactionTime: 1500,
        notes: [],
      };

      addSession(session);

      expect(accuracy.value).toBe(70);
    });

    it('should return 0 when no notes', () => {
      const { accuracy } = useStatistics();
      expect(accuracy.value).toBe(0);
    });
  });

  describe('hasSessions', () => {
    it('should return false when no sessions', () => {
      const { hasSessions } = useStatistics();
      expect(hasSessions.value).toBe(false);
    });

    it('should return true when has sessions', () => {
      const { addSession, hasSessions } = useStatistics();

      const session: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: Date.now(),
        endTime: Date.now() + 60000,
        duration: 60000,
        totalNotes: 10,
        correctNotes: 8,
        wrongNotes: 2,
        accuracy: 80,
        averageReactionTime: 1500,
        notes: [],
      };

      addSession(session);

      expect(hasSessions.value).toBe(true);
    });
  });

  describe('getRecentSessions', () => {
    it('should return recent sessions in reverse order', () => {
      const { addSession, getRecentSessions } = useStatistics();

      const session1: SessionTypes.Session = {
        id: '1',
        mode: 'infinite',
        startTime: 1000,
        endTime: 2000,
        duration: 1000,
        totalNotes: 10,
        correctNotes: 8,
        wrongNotes: 2,
        accuracy: 80,
        averageReactionTime: 1500,
        notes: [],
      };

      const session2: SessionTypes.Session = {
        id: '2',
        mode: 'exam',
        startTime: 3000,
        endTime: 4000,
        duration: 1000,
        totalNotes: 20,
        correctNotes: 15,
        wrongNotes: 5,
        accuracy: 75,
        averageReactionTime: 1200,
        notes: [],
      };

      addSession(session1);
      addSession(session2);

      const recent = getRecentSessions(10);

      expect(recent).toHaveLength(2);
      expect(recent[0].id).toBe('2'); // Most recent first
      expect(recent[1].id).toBe('1');
    });

    it('should limit number of returned sessions', () => {
      const { addSession, getRecentSessions } = useStatistics();

      for (let i = 0; i < 10; i++) {
        const session: SessionTypes.Session = {
          id: `${i}`,
          mode: 'infinite',
          startTime: i * 1000,
          endTime: (i + 1) * 1000,
          duration: 1000,
          totalNotes: 10,
          correctNotes: 8,
          wrongNotes: 2,
          accuracy: 80,
          averageReactionTime: 1500,
          notes: [],
        };
        addSession(session);
      }

      const recent = getRecentSessions(5);
      expect(recent).toHaveLength(5);
      expect(recent[0].id).toBe('9'); // Most recent
    });
  });

  describe('loadStatistics', () => {
    it('should load statistics from localStorage', () => {
      const statsData = {
        totalNotes: 100,
        totalCorrect: 75,
        totalWrong: 25,
        totalSessions: 5,
        sessions: [],
      };

      localStorage.setItem('statistics', JSON.stringify(statsData));

      const { statistics, loadStatistics } = useStatistics();
      loadStatistics();

      expect(statistics.value.totalNotes).toBe(100);
      expect(statistics.value.totalCorrect).toBe(75);
      expect(statistics.value.totalWrong).toBe(25);
      expect(statistics.value.totalSessions).toBe(5);
    });
  });
});
