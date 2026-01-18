<template>
  <div class="settings-page-wrapper">
    <SettingsPage
      v-model="settings"
      @start="start"
      @start-calibration="startCalibration"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, toRaw } from 'vue';
import type { TrainingSettings } from '@/shared/types';
import SettingsPage from '~/src/pages/settings/ui/SettingsPage.vue';
import { useMIDICalibration } from '@/shared/lib';
import { useProfile } from '@/entities/profile';
import { useStatistics } from '@/entities/statistics';

// Оптимизация LCP - настройка мета-тегов и resource hints
useHead({
  title: 'Музыкальный тренажёр - Настройки',
  meta: [
    { name: 'description', content: 'Настройте параметры музыкального тренажера для изучения нот' }
  ],
  link: [
    // Preconnect для внешних ресурсов (если есть)
    // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  ]
});

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
const { startCalibration: startMIDICalibration } = useMIDICalibration();

onMounted(() => {
  // Загружаем данные сразу, но асинхронно - не блокируем рендеринг
  // loadProfiles и loadStatistics используют localStorage, который доступен только на клиенте
  // Они уже проверяют SSR, поэтому можно вызывать сразу
  profileStore.loadProfiles();
  statisticsStore.loadStatistics();
});

function start() {
  navigateTo({
    path: '/training',
    state: { settings: toRaw(settings.value) }
  });
}

function startCalibration() {
  startMIDICalibration((offset: number) => {
    settings.value.midiCalibration = offset;
  });
}

// Предоставляем настройки для layout (для профилей)
provide('settings', settings);
</script>

<style scoped>
.settings-page-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
