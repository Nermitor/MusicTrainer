<template>
  <div class="key-binding-selector">
    <h4 class="selector-title">⌨️ Раскладка клавиатуры</h4>
    <div class="binding-options">
      <label
        v-for="binding in KEY_BINDINGS"
        :key="binding.id"
        class="binding-option"
      >
        <input
          type="radio"
          :value="binding.id"
          :checked="modelValue === binding.id"
          @change="$emit('update:modelValue', binding.id)"
        />
        <div class="binding-info">
          <span class="binding-name">{{ binding.name }}</span>
          <span class="binding-description">{{ binding.description }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KEY_BINDINGS } from '@/shared/config/key-bindings';
import type { KeyBindingLayout } from '@/shared/types';

console.log('KeyBindingSelector rendering, KEY_BINDINGS:', KEY_BINDINGS);

defineOptions({
  name: 'KeyBindingSelector',
});

interface Props {
  modelValue: KeyBindingLayout;
}

defineProps<Props>();

defineEmits<{
  'update:modelValue': [value: KeyBindingLayout];
}>();
</script>

<style scoped>
.key-binding-selector {
  width: 100%;
}

.selector-title {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.binding-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.binding-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.binding-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(66, 184, 131, 0.3);
}

.binding-option input[type="radio"] {
  margin-top: 0.25rem;
  cursor: pointer;
}

.binding-option input[type="radio"]:checked {
  accent-color: #42b883;
}

.binding-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.binding-name {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
}

.binding-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
}
</style>
