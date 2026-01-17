<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <div class="header-left">
        <div class="app-logo">🎵</div>
        <h1 class="app-title">Музыкальный тренажёр</h1>
      </div>
      <div class="header-right">
        <BaseButton v-if="isSettingsPage" @click="navigateTo('/statistics')">
          📊 Статистика
        </BaseButton>
        <BaseButton v-if="isSettingsPage" @click="showProfileModal = true">
          📁 Профили
        </BaseButton>
        <BaseButton v-if="isStatisticsPage" @click="navigateTo('/')">
          ⬅ К настройкам
        </BaseButton>
        <BaseButton v-if="isTrainingPage && !showResults" variant="danger" @click="handleStop">
          ⏹ Завершить
        </BaseButton>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <span>Музыкальный тренажёр © 2026</span>
        <span class="footer-separator">•</span>
        <span>Версия 3.0 (Nuxt 3)</span>
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
import { ref, computed, onMounted, provide } from 'vue';
import { useRoute } from 'vue-router';
import { BaseButton } from '@/shared/ui';
import { ProfileManager } from '@/features/profile-manager';
import { useProfile } from '@/entities/profile';
import type { TrainingSettings } from '@/shared/types';
import type { ProfileTypes } from '@/entities/profile';

const route = useRoute();
const profileStore = useProfile();
const showProfileModal = ref(false);
const showResults = ref(false);

// Определение текущей страницы
const isSettingsPage = computed(() => route.path === '/');
const isStatisticsPage = computed(() => route.path === '/statistics');
const isTrainingPage = computed(() => route.path === '/training');

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

function handleStop() {
  // Эта функция будет переопределена в training.vue через provide/inject или событие
  navigateTo('/');
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

// Предоставляем настройки для дочерних компонентов
provide('settings', settings);

onMounted(() => {
  profileStore.loadProfiles();
});
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
  /* Фиксируем высоту для предотвращения layout shift */
  min-height: 70px;
  box-sizing: border-box;
  /* CSS containment для изоляции */
  contain: layout style;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
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
  align-items: center;
  flex-shrink: 0;
}

/* Main Content */
.app-main {
  flex: 1;
  display: flex;
  overflow-y: auto;
  position: relative;
}

/* Footer */
.app-footer {
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  flex-shrink: 0;
  /* Фиксируем минимальную высоту для предотвращения layout shift */
  min-height: 60px;
  box-sizing: border-box;
  /* CSS containment для изоляции */
  contain: layout style;
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
    padding: 1rem 1rem;
    flex-wrap: nowrap;
  }
  
  .header-left {
    gap: 0.75rem;
  }
  
  .app-title {
    font-size: 1.2rem;
    line-height: 1.2;
    padding: 0;
  }
  
  .app-logo {
    font-size: 1.5rem;
  }
  
  .header-right {
    gap: 0.5rem;
    flex-wrap: nowrap;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 0.75rem 0.75rem;
  }
  
  .header-left {
    gap: 0.5rem;
  }
  
  .app-title {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .app-logo {
    font-size: 1.3rem;
  }
  
  .header-right {
    gap: 0.4rem;
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
