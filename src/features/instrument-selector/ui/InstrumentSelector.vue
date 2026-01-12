<template>
  <div class="instrument-selector">
    <h3 class="selector-title">🎹 Инструмент</h3>
    <div class="instruments-grid">
      <label
        v-for="instrument in instruments"
        :key="instrument.id"
        class="instrument-card"
        :class="{ active: modelValue === instrument.id }"
      >
        <input
          type="radio"
          :value="instrument.id"
          :checked="modelValue === instrument.id"
          @change="handleChange"
          class="instrument-input"
        />
        <div class="instrument-icon">{{ instrument.icon }}</div>
        <div class="instrument-name">{{ instrument.name }}</div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InstrumentType } from '@/shared/types';
import { INSTRUMENTS } from '@/shared/config';

interface Props {
  modelValue: InstrumentType;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: InstrumentType];
}>();

const instruments = INSTRUMENTS;

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value as InstrumentType);
}
</script>

<style scoped>
.instrument-selector {
  width: 100%;
}

.selector-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #fff;
}

.instruments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
}

.instrument-card {
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

.instrument-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.instrument-card.active {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.6);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.instrument-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.instrument-icon {
  font-size: 2rem;
}

.instrument-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  text-align: center;
}
</style>
