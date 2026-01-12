<template>
  <button :class="['base-button', variant, { disabled }]" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface Props {
  variant?: ButtonVariant;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  disabled: false,
});

const emit = defineEmits<{
  click: [];
}>();

function handleClick() {
  emit('click');
}
</script>

<style scoped>
.base-button {
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  font-family: inherit;
}

.base-button:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.base-button:active:not(.disabled) {
  transform: translateY(0);
}

.base-button.primary {
  background: linear-gradient(135deg, #42b883, #35a372);
  border-color: #42b883;
}

.base-button.primary:hover:not(.disabled) {
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
  background: linear-gradient(135deg, #4cd396, #3bb880);
}

.base-button.danger {
  background: rgba(255, 65, 54, 0.2);
  border-color: rgba(255, 65, 54, 0.4);
  color: #ff4136;
}

.base-button.danger:hover:not(.disabled) {
  background: rgba(255, 65, 54, 0.3);
  border-color: rgba(255, 65, 54, 0.6);
}

.base-button.ghost {
  background: transparent;
  border-color: transparent;
}

.base-button.ghost:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.base-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
