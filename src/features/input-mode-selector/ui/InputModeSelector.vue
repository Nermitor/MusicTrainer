<template>
  <div class="input-mode-selector">
    <h3 class="selector-title">⌨️ Режим ввода</h3>
    <div class="modes-grid">
      <label
        v-for="mode in modes"
        :key="mode.id"
        class="mode-card"
        :class="{ active: modelValue === mode.id }"
      >
        <input
          type="radio"
          :value="mode.id"
          :checked="modelValue === mode.id"
          @change="handleChange"
          class="mode-input"
        />
        <div class="mode-icon">{{ mode.icon }}</div>
        <div class="mode-name">{{ mode.name }}</div>
        <div class="mode-description">{{ mode.description }}</div>
      </label>
    </div>

    <!-- Калибровка MIDI (только для режима MIDI) -->
    <div v-if="modelValue === 'midi'" class="calibration-section">
      <h4 class="calibration-title">🎛️ Калибровка MIDI</h4>
      <p class="calibration-description">
        Выберите ноту "До" младшей октавы на вашей MIDI-клавиатуре
      </p>
      <div class="calibration-value">
        Текущее смещение: {{ midiCalibration > 0 ? '+' : '' }}{{ midiCalibration }}
      </div>
      <button class="calibration-btn" @click="emit('startCalibration')">
        🎹 Начать калибровку
      </button>
    </div>

    <!-- Опции виртуального пианино -->
    <div v-if="modelValue === 'virtual-piano'" class="keyboard-section">
      <label class="keyboard-checkbox">
        <input 
          type="checkbox" 
          :checked="enableKeyboardInput"
          @change="emit('update:enableKeyboardInput', ($event.target as HTMLInputElement).checked)"
        />
        <span>⌨️ Использовать клавиатуру компьютера (A-L, Q-P)</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InputMode } from '@/shared/types';

interface Props {
  modelValue: InputMode;
  midiCalibration: number;
  enableKeyboardInput: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: InputMode];
  'update:enableKeyboardInput': [value: boolean];
  'startCalibration': [];
}>();

const modes = [
  {
    id: 'midi' as InputMode,
    icon: '🎹',
    name: 'MIDI-клавиатура',
    description: 'Подключите MIDI-устройство',
  },
  {
    id: 'virtual-piano' as InputMode,
    icon: '🎼',
    name: 'Виртуальное пианино',
    description: 'Мышь или клавиатура',
  },
];

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value as InputMode);
}
</script>

<style scoped>
.input-mode-selector {
  width: 100%;
}

.selector-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #fff;
}

.modes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mode-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.mode-card.active {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.6);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.mode-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.mode-icon {
  font-size: 2rem;
}

.mode-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
}

.mode-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.calibration-section {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.calibration-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.calibration-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1rem 0;
}

.calibration-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(139, 92, 246, 1);
  margin-bottom: 1rem;
}

.calibration-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(139, 92, 246, 0.3);
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 8px;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calibration-btn:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.calibration-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Keyboard Section */
.keyboard-section {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.keyboard-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #fff;
}

.keyboard-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.keyboard-checkbox span {
  user-select: none;
}
</style>
