<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-left">
        <span class="app-logo">🎵</span>
        <h1 class="app-title">Музыкальный тренажёр</h1>
      </div>
      <div class="header-right">
        <BaseButton v-if="currentView === 'settings'" @click="showProfileModal = true">
          📁 Профили
        </BaseButton>
        <BaseButton v-if="currentView === 'settings'" @click="currentView = 'statistics'">
          📊 Статистика
        </BaseButton>
        <BaseButton v-if="currentView !== 'settings'" @click="handleBackToSettings">
          ⬅ К настройкам
        </BaseButton>
      </div>
    </header>

    <main class="app-main">
      <!-- Settings Page -->
      <SettingsPage
        v-if="currentView === 'settings'"
        v-model="settings"
        @start="handleStartTraining"
      />

      <!-- Training Page -->
      <div v-else-if="currentView === 'training'" class="training-view">
        <NotationTrainer
          :speed="settings.speed"
          :with-accidentals="settings.withAccidentals"
          :no-timer="settings.noTimer"
          :show-clef="settings.showClef"
          :always-show-hint="settings.alwaysShowHint"
          :hint-delay="settings.hintDelay"
          :octave-range="settings.octaveRange"
          :location-range="settings.locationRange"
          :training-mode="settings.trainingMode"
          @stop="handleStopTraining"
          @note-attempt="handleNoteAttempt"
        />
      </div>

      <!-- Statistics Page -->
      <div v-else-if="currentView === 'statistics'" class="statistics-view">
        <div class="stats-container">
          <h2 class="stats-title">📊 Статистика</h2>
          
          <div class="stats-overview">
            <div class="stat-card">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.statistics.totalNotes }}</div>
                <div class="stat-label">Всего нот</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.statistics.totalCorrect }}</div>
                <div class="stat-label">Правильно</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📈</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.accuracy }}%</div>
                <div class="stat-label">Точность</div>
              </div>
            </div>
          </div>

          <div class="sessions-history">
            <div class="history-header">
              <h3>История тренировок</h3>
              <BaseButton variant="danger" @click="handleClearStatistics">
                🗑️ Очистить
              </BaseButton>
            </div>
            
            <div v-if="!statisticsStore.hasSessions" class="empty-history">
              Пока нет завершенных тренировок
            </div>
            
            <div v-else class="sessions-list">
              <div v-for="session in statisticsStore.getRecentSessions(20)" :key="session.id" class="session-item">
                <div class="session-time">
                  {{ new Date(session.startTime).toLocaleString() }}
                </div>
                <div class="session-stats">
                  <span class="session-accuracy" :class="getAccuracyClass(session.accuracy)">
                    {{ session.accuracy }}%
                  </span>
                  <span class="session-notes">{{ session.totalNotes }} нот</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Profile Manager Modal -->
    <ProfileManager
      v-model="showProfileModal"
      :profiles="profileStore.profiles"
      @save="handleSaveProfile"
      @load="handleLoadProfile"
      @delete="handleDeleteProfile"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TrainingSettings, Profile, NoteAttempt } from '@/shared/types';
import { BaseButton } from '@/shared/ui';
import { SettingsPage } from '@/pages/settings';
import { ProfileManager } from '@/features/profile-manager';
import { useProfileStore } from '@/entities/profile';
import { useStatisticsStore } from '@/entities/statistics';
import { useSessionStore } from '@/entities/session';
import NotationTrainer from './components/NotationTrainer.vue';

type ViewMode = 'settings' | 'training' | 'statistics';

const currentView = ref<ViewMode>('settings');
const showProfileModal = ref(false);

const settings = ref<TrainingSettings>({
  speed: 1,
  withAccidentals: false,
  noTimer: true,
  showClef: true,
  alwaysShowHint: false,
  hintDelay: 0,
  octaveRange: 'all',
  locationRange: 'all',
  trainingMode: 'infinite',
});

// Stores
const profileStore = useProfileStore();
const statisticsStore = useStatisticsStore();
const sessionStore = useSessionStore();

// Lifecycle
onMounted(() => {
  profileStore.loadProfiles();
  statisticsStore.loadStatistics();
});

// Training handlers
function handleStartTraining() {
  sessionStore.startSession(settings.value.trainingMode, settings.value);
  currentView.value = 'training';
}

function handleStopTraining() {
  const completedSession = sessionStore.endSession();
  if (completedSession) {
    statisticsStore.addSession(completedSession);
  }
  currentView.value = 'settings';
}

function handleNoteAttempt(attempt: NoteAttempt) {
  sessionStore.addAttempt(attempt.noteName, attempt.midi, attempt.correct);
}

function handleBackToSettings() {
  if (currentView.value === 'training') {
    handleStopTraining();
  } else {
    currentView.value = 'settings';
  }
}

// Profile handlers
function handleSaveProfile(name: string) {
  profileStore.createProfile(name, settings.value);
  showProfileModal.value = false;
}

function handleLoadProfile(profile: Profile) {
  settings.value = {
    speed: profile.speed,
    withAccidentals: profile.withAccidentals,
    noTimer: profile.noTimer,
    showClef: profile.showClef,
    alwaysShowHint: profile.alwaysShowHint,
    hintDelay: profile.hintDelay,
    octaveRange: profile.octaveRange,
    locationRange: profile.locationRange,
    trainingMode: profile.trainingMode,
  };
  showProfileModal.value = false;
}

function handleDeleteProfile(id: string) {
  profileStore.deleteProfile(id);
}

// Statistics handlers
function handleClearStatistics() {
  if (confirm('Вы уверены, что хотите удалить всю статистику?')) {
    statisticsStore.clearStatistics();
  }
}

function getAccuracyClass(accuracy: number): string {
  if (accuracy >= 80) return 'good';
  if (accuracy >= 60) return 'medium';
  return '';
}
</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1e1e2d 0%, #141423 100%);
  color: #fff;
  overflow: hidden;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-logo {
  font-size: 2rem;
}

.app-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-right {
  display: flex;
  gap: 1rem;
}

.app-main {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.training-view,
.statistics-view {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.stats-title {
  text-align: center;
  font-size: 2rem;
  margin: 0 0 2rem;
  background: linear-gradient(90deg, #42b883, #646cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
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
}

.empty-history {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.session-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
}

.session-time {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.session-stats {
  display: flex;
  gap: 1rem;
}

.session-accuracy {
  font-weight: 600;
  color: #ff4136;
}

.session-accuracy.good {
  color: #2ecc40;
}

.session-accuracy.medium {
  color: #ffdc00;
}

.session-notes {
  color: rgba(255, 255, 255, 0.6);
}
</style>
