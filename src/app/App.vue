<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <div class="header-left">
        <div class="app-logo">🎵</div>
        <h1 class="app-title">Музыкальный тренажёр</h1>
      </div>
      <div class="header-right">
        <BaseButton v-if="currentView === 'settings'" @click="viewStatistics">
          📊 Статистика
        </BaseButton>
        <BaseButton v-if="currentView === 'settings'" @click="showProfileModal = true">
          📁 Профили
        </BaseButton>
        <BaseButton v-if="currentView === 'statistics'" @click="currentView = 'settings'">
          ⬅ К настройкам
        </BaseButton>
        <BaseButton v-if="currentView === 'training' && !showResults" variant="danger" @click="stop">
          ⏹ Завершить
        </BaseButton>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <!-- Settings Page -->
      <SettingsPage
        v-if="currentView === 'settings'"
        v-model="settings"
        @start="start"
        @start-calibration="startCalibration"
      />

      <!-- Training View -->
      <div v-else-if="currentView === 'training' && !showResults" class="training-view">
        <NotationTrainer
          ref="notationTrainerRef"
          :speed="settings.speed"
          :with-accidentals="settings.withAccidentals"
          :no-timer="settings.noTimer"
          :show-clef="settings.showClef"
          :always-show-hint="settings.alwaysShowHint"
          :hint-delay="settings.hintDelay"
          :octave-range="settings.octaveRange"
          :location-range="settings.locationRange"
          :training-mode="settings.trainingMode"
          :instrument-type="settings.instrumentType"
          :midi-calibration="settings.midiCalibration"
          :input-mode="settings.inputMode"
          :enable-keyboard-input="settings.enableKeyboardInput"
          @stop="stop"
          @note-attempt="handleNoteAttempt"
        />
      </div>

      <!-- Results View -->
      <ResultsView
        v-else-if="showResults && lastCompletedSession"
        :session="lastCompletedSession"
        :mode="settings.trainingMode"
        @restart="start"
        @back-to-settings="backToSettings"
        @view-statistics="viewStatistics(); showResults = false"
      />

      <!-- Statistics View -->
      <StatisticsView
        v-if="currentView === 'statistics'"
        :statistics="statisticsStore.statistics.value"
        :sessions="statisticsStore.getRecentSessions(20)"
        @clear-statistics="handleClearStatistics"
      />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <span>Музыкальный тренажёр © 2026</span>
        <span class="footer-separator">•</span>
        <span>Версия 2.0 (FSD)</span>
      </div>
    </footer>

    <!-- Profile Manager Modal -->
    <ProfileManager
      v-model="showProfileModal"
      :profiles="profileStore.profiles.value"
      @save="createProfile"
      @load="loadProfile"
      @delete="deleteProfile"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TrainingSettings, NoteAttempt } from '@/shared/types';
import type { ProfileTypes } from '@/entities/profile';
import type { SessionTypes } from '@/entities/session';
import { BaseButton } from '@/shared/ui';
import { useMIDICalibration } from '@/shared/lib';
import { SettingsPage } from '@/pages/settings';
import { ProfileManager } from '@/features/profile-manager';
import { useProfile } from '@/entities/profile';
import { useStatistics } from '@/entities/statistics';
import { useSession } from '@/entities/session';
import { NotationTrainer } from '@/widgets/notation-trainer';
import { ResultsView } from '@/widgets/results-view';
import { StatisticsView } from '@/widgets/statistics-view';

type ViewMode = 'settings' | 'training' | 'statistics';

const currentView = ref<ViewMode>('settings');
const showProfileModal = ref(false);
const showResults = ref(false);
const notationTrainerRef = ref<InstanceType<typeof NotationTrainer> | null>(null);
const lastCompletedSession = ref<SessionTypes.Session | null>(null);

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
  instrumentType: 'piano',
  midiCalibration: 0,
  inputMode: 'virtual-piano',
  enableKeyboardInput: true,
});

const profileStore = useProfile();
const statisticsStore = useStatistics();
const sessionStore = useSession();

// MIDI Calibration composable
const { startCalibration: startMIDICalibration } = useMIDICalibration();

onMounted(() => {
  profileStore.loadProfiles();
  statisticsStore.loadStatistics();
});

function start() {
  sessionStore.startSession(settings.value.trainingMode, settings.value);
  currentView.value = 'training';
  showResults.value = false;
  lastCompletedSession.value = null;
}

function stop() {
  const completedSession = sessionStore.endSession();
  if (completedSession) {
    statisticsStore.addSession(completedSession);
    lastCompletedSession.value = completedSession;
  }
  showResults.value = true;
}

function backToSettings() {
  currentView.value = 'settings';
  showResults.value = false;
}

function viewStatistics() {
  currentView.value = 'statistics';
}

function handleNoteAttempt(attempt: NoteAttempt) {
  sessionStore.addAttempt(attempt.noteName, attempt.midi, attempt.correct, attempt.reactionTime);
}

// MIDI Calibration
function startCalibration() {
  startMIDICalibration((offset: number) => {
    settings.value.midiCalibration = offset;
  });
}

// Profile Management
function createProfile(name: string) {
  profileStore.createProfile(name, settings.value);
  showProfileModal.value = false;
}

function loadProfile(profile: ProfileTypes.Profile) {
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
    instrumentType: profile.instrumentType || 'piano',
    midiCalibration: profile.midiCalibration || 0,
    inputMode: profile.inputMode || 'virtual-piano',
    enableKeyboardInput: profile.enableKeyboardInput ?? true,
  };
  showProfileModal.value = false;
}

function deleteProfile(id: string) {
  profileStore.deleteProfile(id);
}

// Statistics
function handleClearStatistics() {
  if (confirm('Вы уверены, что хотите удалить всю статистику? Это действие необратимо.')) {
    statisticsStore.clearStatistics();
  }
}
</script>

<style scoped>
/* Base Container */
.app-container {
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1e1e2d 0%, #141423 100%);
  color: #fff;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Header */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-logo {
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.app-title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  background: linear-gradient(90deg, #42b883, #646cff, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 0.5rem 0;
  line-height: 1.3;
  display: inline-block;
}

.header-right {
  display: flex;
  gap: 1rem;
}


/* Main Content */
.app-main {
  flex: 1;
  display: flex;
  overflow-y: auto;
  position: relative;
}

/* Training View */
.training-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  gap: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Footer */
.app-footer {
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  flex-shrink: 0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.footer-separator {
  color: rgba(255, 255, 255, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-header {
    padding: 1rem 1.5rem;
  }
  
  .app-title {
    font-size: 1.3rem;
  }
  
  .app-logo {
    font-size: 1.5rem;
  }
  
  .header-right {
    flex-wrap: wrap;
  }
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

