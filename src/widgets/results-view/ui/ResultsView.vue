<template>
  <div class="results-view">
    <div class="results-card">
      <h2 class="results-title">🎉 Результаты тренировки</h2>
      
      <div class="results-mode">
        <span class="mode-badge">{{ modeLabel }}</span>
      </div>

      <div class="results-stats">
        <div class="result-item">
          <div class="result-label">Всего нот</div>
          <div class="result-value">{{ session.totalNotes }}</div>
        </div>
        <div class="result-item success">
          <div class="result-label">Правильно</div>
          <div class="result-value">{{ session.correctNotes }}</div>
        </div>
        <div class="result-item error">
          <div class="result-label">Ошибок</div>
          <div class="result-value">{{ session.wrongNotes }}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Точность</div>
          <div class="result-value">{{ session.accuracy }}%</div>
        </div>
        <div class="result-item">
          <div class="result-label">Среднее время</div>
          <div class="result-value">{{ averageTime }}с</div>
        </div>
        <div class="result-item">
          <div class="result-label">Длительность</div>
          <div class="result-value">{{ duration }}с</div>
        </div>
      </div>

      <div class="results-actions">
        <button class="result-btn primary" @click="$emit('restart')">
          🔄 Еще раз
        </button>
        <button class="result-btn" @click="$emit('back-to-settings')">
          ⚙️ Настройки
        </button>
        <button class="result-btn" @click="$emit('view-statistics')">
          📊 Статистика
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SessionTypes } from '@/entities/session';
import type { TrainingMode } from '@/shared/types';

interface Props {
  session: SessionTypes.Session;
  mode: TrainingMode;
}

const props = defineProps<Props>();

defineEmits<{
  'restart': [];
  'back-to-settings': [];
  'view-statistics': [];
}>();

const modeLabel = computed(() => {
  const labels: Record<TrainingMode, string> = {
    infinite: '∞ Бесконечный',
    exam: '📝 Экзамен',
    timed: '⏱️ На время',
    survival: '❤️ Выживание',
  };
  return labels[props.mode] || props.mode;
});

const averageTime = computed(() => {
  return ((props.session.averageReactionTime || 0) / 1000).toFixed(2);
});

const duration = computed(() => {
  return Math.floor((props.session.duration || 0) / 1000);
});
</script>

<style scoped>
.results-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.results-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  backdrop-filter: blur(10px);
}

.results-title {
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(90deg, #42b883, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.results-mode {
  text-align: center;
  margin-bottom: 2rem;
}

.mode-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(66, 184, 131, 0.2);
  border: 1px solid rgba(66, 184, 131, 0.4);
  border-radius: 20px;
  font-size: 1.1rem;
  color: #42b883;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.result-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.result-item.success {
  border-color: rgba(46, 204, 64, 0.3);
  background: rgba(46, 204, 64, 0.1);
}

.result-item.error {
  border-color: rgba(255, 65, 54, 0.3);
  background: rgba(255, 65, 54, 0.1);
}

.result-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.result-value {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.result-btn {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.result-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.result-btn.primary {
  background: linear-gradient(135deg, #42b883, #35a372);
  border-color: #42b883;
}

.result-btn.primary:hover {
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
}
</style>
