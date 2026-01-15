<template>
  <div class="settings-panel">
    <div class="settings-grid">
      <!-- Ряд 1: Скорость (средняя карточка) -->
      <div class="settings-card medium-card">
        <h3>⏱️ Скорость</h3>
        <BaseCheckbox v-model="noTimer">Без таймера</BaseCheckbox>
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

      <!-- Ряд 1: Дополнительно (маленькая карточка) -->
      <div class="settings-card small-card">
        <h3>⚙️ Дополнительно</h3>
        <BaseCheckbox v-model="withAccidentals">Полутоны</BaseCheckbox>
        <BaseCheckbox v-model="showClef">Показать ключ</BaseCheckbox>
      </div>

      <!-- Ряд 2: Ноты (маленькая карточка) -->
      <div class="settings-card small-card">
        <h3>🎹 Ноты</h3>
        <BaseRadioGroup
          v-model="octaveRange"
          label="Октава"
          :options="octaveOptions"
          :inline="true"
        />
        <BaseRadioGroup
          v-model="locationRange"
          label="Расположение"
          :options="locationOptions"
          :inline="true"
        />
      </div>

      <!-- Ряд 2: Инструмент (маленькая карточка) -->
      <div class="settings-card small-card">
        <InstrumentSelector v-model="instrumentType" />
      </div>

      <!-- Ряд 3: Подсказки (средняя карточка) -->
      <div class="settings-card medium-card">
        <h3>💡 Подсказки</h3>
        <BaseCheckbox v-model="alwaysShowHint">Всегда показывать</BaseCheckbox>
        <BaseSlider
          v-model="hintDelay"
          :min="0"
          :max="10"
          :step="0.5"
          label="Задержка (сек)"
          :disabled="alwaysShowHint"
          :value-formatter="(v) => v === 0 ? 'Нет' : `${v}с`"
        />
      </div>

      <!-- Режим ввода и привязка клавиш - объединённая карточка -->
      <div class="settings-card full-width">
        <InputModeSelector 
          v-model="inputMode" 
          :midi-calibration="midiCalibration"
          :enable-keyboard-input="enableKeyboardInput"
          @start-calibration="handleStartCalibration"
        />
        
        <!-- Разделитель -->
        <div class="section-divider"></div>
        
        <!-- Привязка клавиш -->
        <div class="key-binding-section">
          <h3>⌨️ Привязка клавиш</h3>
          <p class="hint-text">Настройте привязки клавиш клавиатуры к нотам</p>
          <button class="open-binding-btn" @click="showKeyBindingModal = true">
            🎹 Открыть редактор привязок
          </button>
          <div v-if="hasBindings" class="bindings-summary">
            <span class="summary-text">✓ Настроено привязок: {{ bindingsCount }}</span>
          </div>
        </div>
      </div>

      <!-- Режим тренировки - полная ширина (в самом низу) -->
      <div class="settings-card full-width">
        <h3>🎮 Режим тренировки</h3>
        <div class="mode-selector">
          <label class="mode-option" :class="{ active: trainingMode === 'infinite' }">
            <input type="radio" value="infinite" v-model="trainingMode" />
            <div class="mode-content">
              <div class="mode-icon">∞</div>
              <div class="mode-name">Бесконечный</div>
              <div class="mode-description">Тренировка без ограничений</div>
            </div>
          </label>
          
          <label class="mode-option" :class="{ active: trainingMode === 'exam' }">
            <input type="radio" value="exam" v-model="trainingMode" />
            <div class="mode-content">
              <div class="mode-icon">📝</div>
              <div class="mode-name">Экзамен</div>
              <div class="mode-description">20 нот, оценка в конце</div>
            </div>
          </label>
          
          <label class="mode-option" :class="{ active: trainingMode === 'timed' }">
            <input type="radio" value="timed" v-model="trainingMode" />
            <div class="mode-content">
              <div class="mode-icon">⏱️</div>
              <div class="mode-name">На время</div>
              <div class="mode-description">60 секунд испытание</div>
            </div>
          </label>
          
          <label class="mode-option" :class="{ active: trainingMode === 'survival' }">
            <input type="radio" value="survival" v-model="trainingMode" />
            <div class="mode-content">
              <div class="mode-icon">❤️</div>
              <div class="mode-name">Выживание</div>
              <div class="mode-description">3 жизни, не ошибись!</div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Модальное окно привязки клавиш -->
    <KeyBindingModal v-model="showKeyBindingModal" @close="handleKeyBindingModalClose" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { TrainingSettings } from '@/shared/types';
import { BaseSlider, BaseCheckbox, BaseRadioGroup } from '@/shared/ui';
import { useModelProxies, useKeyBindings } from '@/shared/lib';
import { InstrumentSelector } from '@/features/instrument-selector';
import { InputModeSelector } from '@/features/input-mode-selector';
import { KeyBindingModal } from '@/features/key-binding-modal';

interface Props {
  modelValue: TrainingSettings;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: TrainingSettings];
  'startCalibration': [];
}>();

// Создаём proxy computed properties для всех настроек
const {
  speed,
  withAccidentals,
  noTimer,
  showClef,
  alwaysShowHint,
  hintDelay,
  octaveRange,
  locationRange,
  trainingMode,
  instrumentType,
  midiCalibration,
  inputMode,
  enableKeyboardInput,
} = useModelProxies(props, emit, [
  'speed',
  'withAccidentals',
  'noTimer',
  'showClef',
  'alwaysShowHint',
  'hintDelay',
  'octaveRange',
  'locationRange',
  'trainingMode',
  'instrumentType',
  'midiCalibration',
  'inputMode',
  'enableKeyboardInput',
]);

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

// Модальное окно привязки клавиш
const showKeyBindingModal = ref(false);
const { rawBindings, refresh } = useKeyBindings();

onMounted(() => {
  refresh();
});

function handleKeyBindingModalClose() {
  showKeyBindingModal.value = false;
}

const hasBindings = computed(() => Object.keys(rawBindings.value).length > 0);
const bindingsCount = computed(() => Object.keys(rawBindings.value).length);
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
  grid-template-columns: repeat(3, 1fr);
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
  transition: all 0.3s ease;
}

/* Маленькая карточка - 1 колонка */
.small-card {
  grid-column: span 1;
}

/* Средняя карточка - 2 колонки */
.medium-card {
  grid-column: span 2;
}

/* Большая карточка - вся ширина */
.full-width {
  grid-column: 1 / -1;
}

.settings-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.settings-card.full-width {
  grid-column: 1 / -1;
}

.settings-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #fff;
}

.hint-text {
  margin: 0 0 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  text-align: center;
}

/* Разделитель между секциями */
.section-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  margin: 1.5rem 0;
}

/* Секция привязки клавиш */
.key-binding-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.open-binding-btn {
  width: 100%;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, #42b883, #35a372);
  border: none;
  color: #fff;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.open-binding-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
}

.bindings-summary {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 8px;
  text-align: center;
}

.summary-text {
  color: #42b883;
  font-size: 0.95rem;
  font-weight: 600;
}

/* Mode Selector */
.mode-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.mode-option {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s;
  overflow: hidden;
}

.mode-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.mode-option:hover {
  border-color: rgba(66, 184, 131, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.mode-option.active {
  border-color: #42b883;
  background: rgba(66, 184, 131, 0.15);
}

.mode-content {
  padding: 1.5rem;
  text-align: center;
}

.mode-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.mode-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.3rem;
}

.mode-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive */
@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
  
  /* На планшетах все карточки занимают 1-2 колонки */
  .small-card {
    grid-column: span 1;
  }
  
  .medium-card {
    grid-column: span 2;
  }
  
  .mode-selector {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .settings-panel {
    padding: 1rem;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  /* На мобильных все карточки занимают всю ширину */
  .small-card,
  .medium-card {
    grid-column: span 1;
  }
  
  .settings-card {
    padding: 1.25rem;
  }
  
  .mode-selector {
    grid-template-columns: 1fr;
  }
}
</style>
