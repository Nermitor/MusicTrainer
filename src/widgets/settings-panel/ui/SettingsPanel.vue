<template>
  <div class="settings-panel">
    <div class="settings-grid">
      <!-- ТЕСТОВАЯ КАРТОЧКА В НАЧАЛЕ -->
      <div class="settings-card full-width" style="background: red !important; padding: 30px;">
        <h2 style="color: yellow; font-size: 30px;">⚠️ ТЕСТОВАЯ КАРТОЧКА</h2>
        <p style="color: white; font-size: 20px;">Если видите это - значит файл обновляется!</p>
      </div>
      
      <!-- Скорость -->
      <div class="settings-card">
        <h3>⏱️ Скорость</h3>
        <BaseSlider
          v-model="speed"
          :min="0.1"
          :max="5"
          :step="0.1"
          label="Время на ноту (сек)"
          :disabled="noTimer"
          :value-formatter="(v) => `${v}с`"
        />
      </div>

      <!-- Таймер -->
      <div class="settings-card">
        <h3>⏳ Таймер</h3>
        <BaseCheckbox v-model="noTimer">Без таймера</BaseCheckbox>
      </div>

      <!-- Октавы и расположение -->
      <div class="settings-card">
        <h3>🎹 Ноты</h3>
        <BaseRadioGroup
          v-model="octaveRange"
          label="Октава"
          :options="octaveOptions"
        />
        <BaseRadioGroup
          v-model="locationRange"
          label="Расположение"
          :options="locationOptions"
        />
      </div>

      <!-- Дополнительно -->
      <div class="settings-card">
        <h3>⚙️ Дополнительно</h3>
        <BaseCheckbox v-model="withAccidentals">Полутоны (диезы и бемоли)</BaseCheckbox>
        <BaseCheckbox v-model="showClef">Показать ключ</BaseCheckbox>
      </div>

      <!-- Подсказки -->
      <div class="settings-card">
        <h3>💡 Подсказки</h3>
        <BaseCheckbox v-model="alwaysShowHint">Всегда показывать подсказку</BaseCheckbox>
        <BaseSlider
          v-model="hintDelay"
          :min="0"
          :max="10"
          :step="0.5"
          label="Задержка подсказки (сек)"
          :disabled="alwaysShowHint"
          :value-formatter="(v) => v === 0 ? 'Нет' : `${v}с`"
        />
      </div>

      <!-- Режим тренировки -->
      <div class="settings-card full-width">
        <TrainingModeSelector v-model="trainingMode" />
      </div>

      <!-- Инструмент -->
      <div class="settings-card">
        <InstrumentSelector v-model="instrumentType" />
      </div>

      <!-- Режим ввода -->
      <div class="settings-card full-width">
        <InputModeSelector 
          v-model="inputMode" 
          :midi-calibration="midiCalibration"
          @start-calibration="handleStartCalibration"
        />
      </div>

      <!-- Раскладка клавиатуры -->
      <div class="settings-card full-width">
        <h3 style="color: white;">⌨️ Раскладка клавиатуры</h3>
        <p style="color: red; font-size: 20px; font-weight: bold;">ТЕСТ - Раскладка: {{ keyBindingLayout }}</p>
        <div style="background: red; padding: 20px; color: white;">
          <p>Это тестовая карточка!</p>
          <p>Если видите это - значит карточка рендерится</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TrainingSettings } from '@/shared/types';
import { BaseSlider, BaseCheckbox, BaseRadioGroup } from '@/shared/ui';
import { TrainingModeSelector } from '@/features/training-mode-selector';
import { InstrumentSelector } from '@/features/instrument-selector';
import { InputModeSelector } from '@/features/input-mode-selector';
import { KeyBindingSelector } from '@/features/key-binding-selector';

interface Props {
  modelValue: TrainingSettings;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: TrainingSettings];
  'startCalibration': [];
}>();

const speed = computed({
  get: () => props.modelValue.speed,
  set: (v) => emit('update:modelValue', { ...props.modelValue, speed: v }),
});

const withAccidentals = computed({
  get: () => props.modelValue.withAccidentals,
  set: (v) => emit('update:modelValue', { ...props.modelValue, withAccidentals: v }),
});

const noTimer = computed({
  get: () => props.modelValue.noTimer,
  set: (v) => emit('update:modelValue', { ...props.modelValue, noTimer: v }),
});

const showClef = computed({
  get: () => props.modelValue.showClef,
  set: (v) => emit('update:modelValue', { ...props.modelValue, showClef: v }),
});

const alwaysShowHint = computed({
  get: () => props.modelValue.alwaysShowHint,
  set: (v) => emit('update:modelValue', { ...props.modelValue, alwaysShowHint: v }),
});

const hintDelay = computed({
  get: () => props.modelValue.hintDelay,
  set: (v) => emit('update:modelValue', { ...props.modelValue, hintDelay: v }),
});

const octaveRange = computed({
  get: () => props.modelValue.octaveRange,
  set: (v) => emit('update:modelValue', { ...props.modelValue, octaveRange: v }),
});

const locationRange = computed({
  get: () => props.modelValue.locationRange,
  set: (v) => emit('update:modelValue', { ...props.modelValue, locationRange: v }),
});

const trainingMode = computed({
  get: () => props.modelValue.trainingMode,
  set: (v) => emit('update:modelValue', { ...props.modelValue, trainingMode: v }),
});

const instrumentType = computed({
  get: () => props.modelValue.instrumentType,
  set: (v) => emit('update:modelValue', { ...props.modelValue, instrumentType: v }),
});

const midiCalibration = computed({
  get: () => props.modelValue.midiCalibration,
  set: (v) => emit('update:modelValue', { ...props.modelValue, midiCalibration: v }),
});

const inputMode = computed({
  get: () => props.modelValue.inputMode,
  set: (v) => emit('update:modelValue', { ...props.modelValue, inputMode: v }),
});

const keyBindingLayout = computed({
  get: () => props.modelValue.keyBindingLayout,
  set: (v) => emit('update:modelValue', { ...props.modelValue, keyBindingLayout: v }),
});

function handleStartCalibration() {
  emit('startCalibration');
}

const octaveOptions = [
  { value: 'all', label: 'Все' },
  { value: 'octave4', label: 'Первая октава' },
  { value: 'octave5', label: 'Вторая октава' },
];

const locationOptions = [
  { value: 'all', label: 'Все' },
  { value: 'on', label: 'На линии' },
  { value: 'between', label: 'Между линий' },
];
</script>

<style scoped>
.settings-panel {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.settings-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-card.full-width {
  grid-column: 1 / -1;
}

.settings-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #fff;
}
</style>
