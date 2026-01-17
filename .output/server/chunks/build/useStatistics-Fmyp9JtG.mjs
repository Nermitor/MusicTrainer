import { computed } from 'vue';
import { l as l$1, s, r as r$1, o } from './state-Cgstzz6o.mjs';

const l = { totalSessions: 0, totalNotes: 0, totalCorrect: 0, totalWrong: 0, overallAccuracy: 0, bestStreak: 0, sessions: [], noteStats: {} }, r = () => {
  const r2 = l$1("statistics", () => ({ ...l })), c = (t2 = false) => {
    r$1(o.STATISTICS, r2.value, t2);
  }, n = computed(() => r2.value.sessions.length > 0), i = computed(() => r2.value.overallAccuracy);
  return { statistics: r2, hasSessions: n, accuracy: i, loadStatistics: () => {
    var _a;
    r2.value = (_a = s(o.STATISTICS, l)) != null ? _a : l;
  }, saveStatistics: c, addSession: (t2) => {
    r2.value.sessions.unshift(t2), r2.value.totalSessions++, r2.value.totalNotes += t2.totalNotes, r2.value.totalCorrect += t2.correctNotes, r2.value.totalWrong += t2.wrongNotes, r2.value.overallAccuracy = r2.value.totalNotes > 0 ? Math.round(r2.value.totalCorrect / r2.value.totalNotes * 100) : 0, t2.attempts.forEach((t3) => {
      ((t4) => {
        const e2 = t4.noteName;
        r2.value.noteStats[e2] || (r2.value.noteStats[e2] = { correct: 0, wrong: 0, avgReactionTime: 0 });
        const s2 = r2.value.noteStats[e2];
        t4.correct ? s2.correct++ : s2.wrong++;
        const a2 = s2.correct + s2.wrong;
        s2.avgReactionTime = Math.round((s2.avgReactionTime * (a2 - 1) + t4.reactionTime) / a2);
      })(t3);
    }), c();
  }, clearStatistics: () => {
    r2.value = { totalSessions: 0, totalNotes: 0, totalCorrect: 0, totalWrong: 0, overallAccuracy: 0, bestStreak: 0, sessions: [], noteStats: {} }, c();
  }, getRecentSessions: (t2 = 20) => r2.value.sessions.slice(0, t2), getNoteStats: (t2) => r2.value.noteStats[t2] };
};

export { r };
