<template>
  <BaseModal v-model="isOpen" title="⌨️ Привязка клавиш" size="large" @close="emit('close')">
    <div class="key-binding-modal">
      <p class="instruction">
        Нажмите на клавишу пианино, затем нажмите кнопку на клавиатуре для привязки
      </p>

      <!-- Виртуальное пианино -->
      <div class="piano-container">
        <!-- Белые клавиши -->
        <div class="piano-keys">
          <div
            v-for="key in whiteKeys"
            :key="key.midi"
            class="piano-key white"
            :class="{ 
              selected: selectedMidi === key.midi,
              bound: customKeyBindings[key.midi]
            }"
            @click="selectNote(key.midi)"
          >
            <span class="note-name">{{ key.name }}</span>
            <span v-if="customKeyBindings[key.midi]" class="bound-key-label">
              {{ customKeyBindings[key.midi] }}
            </span>
          </div>
        </div>

        <!-- Черные клавиши -->
        <div class="black-keys-container">
          <div
            v-for="(key, index) in blackKeys"
            :key="key.midi"
            class="piano-key black"
            :class="{ 
              selected: selectedMidi === key.midi,
              bound: customKeyBindings[key.midi]
            }"
            :style="{ left: getBlackKeyPosition(index) }"
            @click="selectNote(key.midi)"
          >
            <span class="note-name-black">{{ key.name }}</span>
            <span v-if="customKeyBindings[key.midi]" class="bound-key-label-black">
              {{ customKeyBindings[key.midi] }}
            </span>
          </div>
        </div>
      </div>

      <!-- Текущий статус -->
      <div v-if="selectedMidi !== null" class="status-bar">
        <span class="status-text">
          Выбрана нота: <strong>{{ getNoteNameByMidi(selectedMidi) }}</strong> (MIDI {{ selectedMidi }})
          — Нажмите клавишу на клавиатуре
        </span>
      </div>

      <!-- Действия -->
      <div class="modal-actions">
        <button class="action-btn secondary" @click="resetAllBindings">
          🔄 Сбросить все
        </button>
        <button class="action-btn primary" @click="closeModal">
          ✓ Готово
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { BaseModal } from '@/shared/ui';
import { useKeyBindings } from '@/shared/lib';
import { useEventListener } from '@vueuse/core';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});

const pianoKeys = [
  { midi: 60, name: 'C4', isBlack: false },
  { midi: 61, name: 'C#4', isBlack: true },
  { midi: 62, name: 'D4', isBlack: false },
  { midi: 63, name: 'D#4', isBlack: true },
  { midi: 64, name: 'E4', isBlack: false },
  { midi: 65, name: 'F4', isBlack: false },
  { midi: 66, name: 'F#4', isBlack: true },
  { midi: 67, name: 'G4', isBlack: false },
  { midi: 68, name: 'G#4', isBlack: true },
  { midi: 69, name: 'A4', isBlack: false },
  { midi: 70, name: 'A#4', isBlack: true },
  { midi: 71, name: 'B4', isBlack: false },
  { midi: 72, name: 'C5', isBlack: false },
  { midi: 73, name: 'C#5', isBlack: true },
  { midi: 74, name: 'D5', isBlack: false },
  { midi: 75, name: 'D#5', isBlack: true },
  { midi: 76, name: 'E5', isBlack: false },
  { midi: 77, name: 'F5', isBlack: false },
  { midi: 78, name: 'F#5', isBlack: true },
  { midi: 79, name: 'G5', isBlack: false },
  { midi: 80, name: 'G#5', isBlack: true },
  { midi: 81, name: 'A5', isBlack: false },
  { midi: 82, name: 'A#5', isBlack: true },
  { midi: 83, name: 'B5', isBlack: false },
];

const whiteKeys = computed(() => pianoKeys.filter(k => !k.isBlack));
const blackKeys = computed(() => pianoKeys.filter(k => k.isBlack));

const selectedMidi = ref<number | null>(null);
const { rawBindings, saveKeyBindings, clearKeyBindings, refresh } = useKeyBindings();
const customKeyBindings = rawBindings;

watch(isOpen, (open) => {
  if (open) {
    refresh();
  } else {
    selectedMidi.value = null;
  }
}, { immediate: true });

function selectNote(midi: number) {
  selectedMidi.value = midi;
}

function handleKeyPress(event: KeyboardEvent) {
  if (selectedMidi.value === null) return;
  
  // Игнорируем служебные клавиши
  if (['Escape', 'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) {
    if (event.key === 'Escape') {
      selectedMidi.value = null;
    }
    return;
  }
  
  event.preventDefault();
  
  const key = event.key.toLowerCase();
  
  const updatedBindings = { ...customKeyBindings.value };
  // Удаляем предыдущую привязку этой клавиши
  for (const midi in updatedBindings) {
    if (updatedBindings[midi] === key.toUpperCase()) {
      delete updatedBindings[midi];
    }
  }
  // Устанавливаем новую привязку
  updatedBindings[selectedMidi.value] = key.toUpperCase();
  saveKeyBindings(updatedBindings);
  
  // Переходим к следующей ноте
  moveToNextNote();
}

function moveToNextNote() {
  if (selectedMidi.value === null) return;
  
  const currentIndex = pianoKeys.findIndex(k => k.midi === selectedMidi.value);
  if (currentIndex < pianoKeys.length - 1) {
    selectedMidi.value = pianoKeys[currentIndex + 1].midi;
  } else {
    selectedMidi.value = null;
  }
}

function resetAllBindings() {
  if (confirm('Вы уверены, что хотите сбросить все привязки клавиш?')) {
    clearKeyBindings();
    selectedMidi.value = null;
  }
}

function closeModal() {
  selectedMidi.value = null;
  emit('close');
}

function getNoteNameByMidi(midi: number): string {
  const key = pianoKeys.find(k => k.midi === midi);
  return key?.name || '';
}

function getBlackKeyPosition(index: number): string {
  const octavePattern = [1.0, 2.0, 4.0, 5.0, 6.0];
  const octaveIndex = Math.floor(index / 5);
  const positionInOctave = index % 5;
  const whiteKeyWidth = 100 / 14;
  const position = (octaveIndex * 7 + octavePattern[positionInOctave]) * whiteKeyWidth;
  return `${position}%`;
}

// Используем useEventListener на верхнем уровне с SSR-проверкой
// Слушатель активен только когда модал открыт
if (typeof window !== 'undefined') {
  useEventListener(window, 'keydown', (event: KeyboardEvent) => {
    if (!isOpen.value) return;
    handleKeyPress(event);
  });
}
</script>

<style scoped>
.key-binding-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 1rem;
  max-height: 80vh;
  overflow: hidden;
}

.instruction {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
  padding: 0.5rem 0;
}

.piano-container {
  position: relative;
  width: 100%;
  height: 140px;
  margin: 0.5rem 0;
}

.piano-keys {
  display: flex;
  height: 100%;
  gap: 2px;
}

.piano-key {
  position: relative;
  flex: 1;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
}

.piano-key.white {
  background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
  border: 2px solid #333;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.piano-key.white:hover {
  background: linear-gradient(180deg, #f0f0f0 0%, #e8e8e8 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.piano-key.white.bound:not(.selected) {
  background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%);
  border-color: #1976d2;
}

.piano-key.white.selected {
  background: linear-gradient(180deg, #42b883 0%, #35a372 100%) !important;
  border-color: #2d8a5f !important;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.5) !important;
  transform: scale(1.05) !important;
  z-index: 10;
}

.black-keys-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55%;
  pointer-events: none;
}

.piano-key.black {
  position: absolute;
  width: 5%;
  height: 100%;
  background: linear-gradient(180deg, #2a2a2a 0%, #000000 100%);
  border: 2px solid #000;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  pointer-events: all;
  transform: translateX(-50%);
  z-index: 2;
  padding: 0.4rem 0.2rem;
}

.piano-key.black:hover {
  background: linear-gradient(180deg, #3a3a3a 0%, #111 100%);
  transform: translateX(-50%) translateY(-2px);
}

.piano-key.black.bound:not(.selected) {
  background: linear-gradient(180deg, #1976d2 0%, #1565c0 100%);
  border-color: #1565c0;
}

.piano-key.black.selected {
  background: linear-gradient(180deg, #42b883 0%, #2d8a5f 100%) !important;
  border-color: #2d8a5f !important;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.5) !important;
  transform: translateX(-50%) scale(1.1) !important;
  z-index: 20;
}

.note-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
  margin-top: auto;
}

.note-name-black {
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-top: auto;
}

.bound-key-label {
  font-size: 1rem;
  font-weight: 700;
  color: #1976d2;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  line-height: 1;
}

.bound-key-label-black {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  background: rgba(25, 118, 210, 0.95);
  padding: 0.15rem 0.3rem;
  border-radius: 3px;
  line-height: 1;
}

.status-bar {
  padding: 0.75rem 1rem;
  background: rgba(66, 184, 131, 0.1);
  border: 2px solid rgba(66, 184, 131, 0.3);
  border-radius: 8px;
  text-align: center;
}

.status-text {
  color: #fff;
  font-size: 0.95rem;
}

.status-text strong {
  color: #42b883;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.secondary {
  background: rgba(255, 99, 71, 0.2);
  border: 1px solid rgba(255, 99, 71, 0.4);
  color: #ff6347;
}

.action-btn.secondary:hover {
  background: rgba(255, 99, 71, 0.3);
  transform: translateY(-2px);
}

.action-btn.primary {
  background: linear-gradient(135deg, #42b883, #35a372);
  color: #fff;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(66, 184, 131, 0.4);
}
</style>
