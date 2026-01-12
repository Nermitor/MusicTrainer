<template>
  <div class="statistics-view">
    <div class="stats-container">
      <h2 class="stats-title">📊 Статистика</h2>
      
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <div class="stat-value">{{ statistics.totalNotes }}</div>
            <div class="stat-label">Всего нот</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-value">{{ statistics.totalCorrect }}</div>
            <div class="stat-label">Правильно</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">❌</div>
          <div class="stat-content">
            <div class="stat-value">{{ statistics.totalWrong }}</div>
            <div class="stat-label">Ошибок</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <div class="stat-value">{{ accuracy }}%</div>
            <div class="stat-label">Точность</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <div class="stat-value">{{ statistics.totalSessions }}</div>
            <div class="stat-label">Тренировок</div>
          </div>
        </div>
      </div>

      <div class="sessions-history">
        <div class="history-header">
          <h3>История тренировок</h3>
          <button class="clear-stats-btn" @click="$emit('clear-statistics')">
            🗑️ Очистить
          </button>
        </div>
        
        <div v-if="sessions.length === 0" class="empty-history">
          Пока нет завершенных тренировок
        </div>
        
        <div v-else class="sessions-list">
          <div v-for="session in sessions" :key="session.id" class="session-item">
            <div class="session-time">
              {{ formatDate(session.startTime) }}
              {{ formatTime(session.startTime) }}
            </div>
            <div class="session-mode-badge">{{ getModeIcon(session.mode) }}</div>
            <div class="session-stats">
              <span 
                class="session-accuracy" 
                :class="getAccuracyClass(session.accuracy)"
              >
                {{ session.accuracy }}%
              </span>
              <span class="session-notes">{{ session.totalNotes }} нот</span>
              <span class="session-duration">{{ Math.floor(session.duration / 1000) }}с</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { StatisticsTypes } from '@/entities/statistics';
import type { SessionTypes } from '@/entities/session';
import type { TrainingMode } from '@/shared/types';

interface Props {
  statistics: StatisticsTypes.Statistics;
  sessions: SessionTypes.Session[];
}

const props = defineProps<Props>();

defineEmits<{
  'clear-statistics': [];
}>();

const accuracy = computed(() => {
  if (props.statistics.totalNotes === 0) return 0;
  return Math.round((props.statistics.totalCorrect / props.statistics.totalNotes) * 100);
});

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString();
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString();
}

function getModeIcon(mode: TrainingMode): string {
  const icons: Record<TrainingMode, string> = {
    infinite: '∞',
    exam: '📝',
    timed: '⏱️',
    survival: '❤️',
  };
  return icons[mode] || '?';
}

function getAccuracyClass(accuracy: number): string {
  if (accuracy >= 80) return 'good';
  if (accuracy >= 60) return 'medium';
  return '';
}
</script>

<style scoped>
.statistics-view {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-title {
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 2rem 0;
  background: linear-gradient(90deg, #42b883, #646cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.sessions-history {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.history-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
}

.clear-stats-btn {
  padding: 0.6rem 1.2rem;
  background: rgba(255, 65, 54, 0.2);
  border: 1px solid rgba(255, 65, 54, 0.4);
  color: #ff4136;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.clear-stats-btn:hover {
  background: rgba(255, 65, 54, 0.3);
  border-color: rgba(255, 65, 54, 0.6);
}

.empty-history {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: all 0.2s;
}

.session-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.session-time {
  flex: 1;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.session-mode-badge {
  font-size: 1.5rem;
}

.session-stats {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.session-accuracy {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff4136;
}

.session-accuracy.good {
  color: #2ecc40;
}

.session-accuracy.medium {
  color: #ffdc00;
}

.session-notes,
.session-duration {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
}
</style>
