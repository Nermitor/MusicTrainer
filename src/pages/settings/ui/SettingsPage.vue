<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1>⚙️ Настройки тренировки</h1>
      <p>Настройте параметры для комфортной тренировки</p>
    </div>
    
    <SettingsPanel v-model="settings" @start-calibration="emit('start-calibration')" />
    
    <div class="settings-footer">
      <BaseButton variant="primary" size="large" @click="emit('start')">
        🎵 Начать тренировку
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TrainingSettings } from '@/shared/types';
import { BaseButton } from '@/shared/ui';
import { SettingsPanel } from '@/widgets/settings-panel';

interface Props {
  modelValue: TrainingSettings;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: TrainingSettings];
  start: [];
  'start-calibration': [];
}>();

const settings = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});
</script>

<style scoped>
.settings-page {
  width: 100%;
  max-width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.settings-header {
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}

.settings-header h1 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  background: linear-gradient(90deg, #42b883, #646cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.settings-header p {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}

.settings-footer {
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}

@media (max-width: 640px) {
  .settings-header {
    padding: 1.5rem 1rem;
  }
  
  .settings-header h1 {
    font-size: 1.5rem;
  }
  
  .settings-footer {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .settings-header {
    padding: 1rem 0.75rem;
  }
  
  .settings-header h1 {
    font-size: 1.3rem;
  }
  
  .settings-footer {
    padding: 1rem 0.75rem;
  }
}
</style>
