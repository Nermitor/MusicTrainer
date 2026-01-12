<template>
  <BaseModal v-model="isOpen" title="📁 Профили" @close="emit('close')">
    <div class="profile-manager">
      <!-- Сохранить новый профиль -->
      <div class="save-section">
        <button v-if="!showInput" class="save-button" @click="showInput = true">
          💾 Сохранить текущие настройки
        </button>
        <div v-else class="save-form">
          <input
            v-model="newProfileName"
            type="text"
            placeholder="Название профиля"
            class="profile-input"
            @keyup.enter="handleSave"
          />
          <div class="save-actions">
            <BaseButton variant="primary" @click="handleSave">Сохранить</BaseButton>
            <BaseButton @click="showInput = false">Отмена</BaseButton>
          </div>
        </div>
      </div>

      <!-- Список профилей -->
      <div v-if="profiles.length > 0" class="profiles-list">
        <h4>Сохраненные профили:</h4>
        <div class="profile-grid">
          <div v-for="profile in profiles" :key="profile.id" class="profile-card">
            <h5>{{ profile.name }}</h5>
            <div class="profile-actions">
              <BaseButton @click="emit('load', profile)">Загрузить</BaseButton>
              <BaseButton variant="danger" @click="emit('delete', profile.id)">Удалить</BaseButton>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        Нет сохраненных профилей
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Profile } from '@/shared/types';
import { BaseModal, BaseButton } from '@/shared/ui';

interface Props {
  modelValue: boolean;
  profiles: Profile[];
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
  save: [name: string];
  load: [profile: Profile];
  delete: [id: string];
}>();

const isOpen = ref(false);
const showInput = ref(false);
const newProfileName = ref('');

function handleSave() {
  if (newProfileName.value.trim()) {
    emit('save', newProfileName.value.trim());
    newProfileName.value = '';
    showInput.value = false;
  }
}
</script>

<style scoped>
.profile-manager {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.save-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.save-button {
  padding: 1rem;
  background: rgba(66, 184, 131, 0.2);
  border: 2px dashed rgba(66, 184, 131, 0.5);
  color: #42b883;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.save-button:hover {
  background: rgba(66, 184, 131, 0.3);
  border-color: #42b883;
}

.save-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-input {
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  text-align: left;
}

.profile-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.save-actions {
  display: flex;
  gap: 0.8rem;
}

.profiles-list h4 {
  margin: 0 0 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
}

.profile-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-card {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.profile-card h5 {
  margin: 0;
  font-size: 1rem;
  color: #fff;
  flex: 1;
  text-align: left;
}

.profile-actions {
  display: flex;
  gap: 0.5rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}
</style>
