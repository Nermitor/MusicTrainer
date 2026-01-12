<template>
  <div class="base-radio-group">
    <label v-if="label" class="group-label">{{ label }}</label>
    <div class="radio-options" :class="{ inline }">
      <label
        v-for="option in options"
        :key="option.value"
        class="radio-option"
        :class="{ disabled }"
      >
        <input
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled"
          @change="handleChange"
          class="radio-input"
        />
        <span class="radio-label">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
interface RadioOption<V = T> {
  value: V;
  label: string;
}

interface Props {
  modelValue: T;
  options: RadioOption<T>[];
  label?: string;
  inline?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  inline: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: T];
}>();

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value as T);
}
</script>

<style scoped>
.base-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.group-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.radio-options.inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  user-select: none;
}

.radio-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #42b883;
}

.radio-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.radio-option.disabled .radio-input {
  cursor: not-allowed;
}

.radio-option:hover:not(.disabled) .radio-label {
  color: #fff;
}
</style>
