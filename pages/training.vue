<template>
  <div class="training-page-wrapper">
    <ClientOnly>
      <div v-if="!showResults" class="training-view">
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
        @view-statistics="viewStatistics"
      />
      <template #fallback>
        <div class="loading-placeholder">
          <div class="notation-block-placeholder"></div>
          <div class="piano-placeholder"></div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import type { TrainingSettings, NoteAttempt } from '@/shared/types';
import type { SessionTypes } from '@/entities/session';
import { NotationTrainer } from '@/widgets/notation-trainer';
import { useStatistics } from '@/entities/statistics';
import { useSession } from '@/entities/session';

// Оптимизация: используем defineAsyncComponent для тяжелых виджетов
const ResultsView = defineAsyncComponent(() => import('@/widgets/results-view').then(m => m.ResultsView));

// Оптимизация LCP - настройка мета-тегов
useHead({
  title: 'Музыкальный тренажёр - Тренировка',
});

// Оптимизация: используем useSeoMeta для SEO мета-тегов
useSeoMeta({
  title: 'Музыкальный тренажёр - Тренировка',
  description: 'Тренируйтесь читать ноты на музыкальном тренажере',
  ogTitle: 'Музыкальный тренажёр - Тренировка',
  ogDescription: 'Тренируйтесь читать ноты на музыкальном тренажере',
  ogType: 'website',
});

const showResults = ref(false);
const notationTrainerRef = ref<InstanceType<typeof NotationTrainer> | null>(null);
const lastCompletedSession = ref<SessionTypes.Session | null>(null);

// Получаем настройки из route state или используем значения по умолчанию
const route = useRoute();
const settings = ref<TrainingSettings>(
  route.state?.settings || {
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
  }
);

const statisticsStore = useStatistics();
const sessionStore = useSession();

onMounted(() => {
  // Начинаем сессию при монтировании
  sessionStore.startSession(settings.value.trainingMode, settings.value);
});

function start() {
  sessionStore.startSession(settings.value.trainingMode, settings.value);
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
  navigateTo('/');
}

function viewStatistics() {
  navigateTo('/statistics');
  showResults.value = false;
}

function handleNoteAttempt(attempt: NoteAttempt) {
  sessionStore.addAttempt(attempt.noteName, attempt.midi, attempt.correct, attempt.reactionTime);
}
</script>

<style scoped>
.training-page-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

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

@media (max-width: 768px) {
  .training-view {
    padding: 1rem 0;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .training-view {
    padding: 0.75rem 0;
    gap: 0.5rem;
  }
}

/* Placeholder для предотвращения layout shift при загрузке */
.loading-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  box-sizing: border-box;
}

.notation-block-placeholder {
  width: 100%;
  max-width: 500px;
  height: 220px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-sizing: border-box;
  /* Используем aspect-ratio для сохранения пропорций */
  aspect-ratio: 500 / 220;
  /* CSS containment для изоляции */
  contain: layout style paint;
}

.piano-placeholder {
  width: 100%;
  max-width: min(900px, 100%);
  height: 180px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-sizing: border-box;
  /* Используем aspect-ratio для сохранения пропорций */
  aspect-ratio: 900 / 180;
  /* CSS containment для изоляции */
  contain: layout style paint;
}

@media (max-width: 768px) {
  .loading-placeholder {
    padding: 1rem;
    gap: 1rem;
  }
  
  .notation-block-placeholder {
    max-width: calc(100vw - 2rem);
  }
  
  .piano-placeholder {
    height: 150px;
    aspect-ratio: 900 / 150;
  }
}

@media (max-width: 480px) {
  .loading-placeholder {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .notation-block-placeholder {
    height: 180px;
    max-width: calc(100vw - 1.5rem);
  }
  
  .piano-placeholder {
    height: 120px;
    aspect-ratio: 900 / 120;
  }
}
</style>
