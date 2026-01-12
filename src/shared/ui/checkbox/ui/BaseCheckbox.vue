<template>
  <label class="base-checkbox" :class="{ disabled }">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
      class="checkbox-input"
    />
    <span class="checkbox-label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<style scoped>
.base-checkbox {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 0;
  user-select: none;
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #42b883;
}

.checkbox-label {
  flex: 1;
}

.base-checkbox.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-checkbox.disabled .checkbox-input {
  cursor: not-allowed;
}

.base-checkbox:hover:not(.disabled) .checkbox-label {
  color: #fff;
}
</style>
