<template>
  <div class="base-slider" :class="{ disabled }">
    <label v-if="label" class="slider-label">
      {{ label }}
      <span v-if="showValue" class="slider-value">{{ displayValue }}</span>
    </label>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      @input="handleInput"
      class="slider-input"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: number;
  min: number;
  max: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  valueFormatter?: (value: number) => string;
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  showValue: true,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const displayValue = computed(() => {
  if (props.valueFormatter) {
    return props.valueFormatter(props.modelValue);
  }
  return props.modelValue.toString();
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', parseFloat(target.value));
}
</script>

<style scoped>
.base-slider {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.slider-value {
  font-weight: 600;
  color: #42b883;
}

.slider-input {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #35a372);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}

.slider-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #35a372);
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}

.slider-input:hover:not(:disabled)::-webkit-slider-thumb {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.5);
}

.slider-input:hover:not(:disabled)::-moz-range-thumb {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.5);
}

.base-slider.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.base-slider.disabled .slider-input {
  cursor: not-allowed;
}
</style>
