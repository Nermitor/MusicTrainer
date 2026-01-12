<template>
  <div class="virtual-piano">
    <div class="piano-container">
      <div class="piano-keys">
        <!-- Белые клавиши -->
         <div
           v-for="key in whiteKeys"
           :key="key.midi"
           class="piano-key white"
           :class="{ active: pressedKey === key.midi || pressedMidiNote === key.midi, correct: highlightCorrect && key.midi === correctNote, incorrect: highlightIncorrect && key.midi === pressedMidiNote }"
           @mousedown="handleKeyPress(key.midi)"
           @touchstart.prevent="handleKeyPress(key.midi)"
         >
          <span v-if="showKeyboardMapping && key.keyboardKey" class="keyboard-hint">
            {{ key.keyboardKey }}
          </span>
          <span class="note-label">{{ key.note }}</span>
        </div>
      </div>
      
      <!-- Черные клавиши (абсолютное позиционирование) -->
      <div class="black-keys-container">
         <div
           v-for="(key, index) in blackKeys"
           :key="key.midi"
           class="piano-key black"
           :class="{ active: pressedKey === key.midi || pressedMidiNote === key.midi, correct: highlightCorrect && key.midi === correctNote, incorrect: highlightIncorrect && key.midi === pressedMidiNote }"
           :style="{ left: getBlackKeyPosition(index) }"
           @mousedown="handleKeyPress(key.midi)"
           @touchstart.prevent="handleKeyPress(key.midi)"
         >
          <span v-if="showKeyboardMapping && key.keyboardKey" class="keyboard-hint">
            {{ key.keyboardKey }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePiano } from '../model/usePiano';

interface Props {
  showKeyboardMapping?: boolean;
  correctNote?: number | null;
  highlightCorrect?: boolean;
  highlightIncorrect?: boolean;
  pressedMidiNote?: number | null;
  keyboardMapping?: Record<string, number>;
}

const props = withDefaults(defineProps<Props>(), {
  showKeyboardMapping: false,
  correctNote: null,
  highlightCorrect: false,
  highlightIncorrect: false,
  pressedMidiNote: null,
  keyboardMapping: () => ({}),
});

const emit = defineEmits<{
  'note-pressed': [midi: number];
}>();

const { pianoKeys } = usePiano();
const pressedKey = ref<number | null>(null);
const lastPressedNote = ref<number | null>(null);

// Разделяем клавиши на белые и черные и всегда добавляем mapping
const reverseMapping = computed(() => {
  const mapping: Record<number, string> = {};
  Object.entries(props.keyboardMapping || {}).forEach(([key, midi]) => {
    mapping[midi] = key.toUpperCase();
  });
  return mapping;
});

const whiteKeys = computed(() => {
  const keys = pianoKeys.value.filter(k => !k.isBlack);
  return keys.map(k => ({ ...k, keyboardKey: reverseMapping.value[k.midi] }));
});

const blackKeys = computed(() => {
  const keys = pianoKeys.value.filter(k => k.isBlack);
  return keys.map(k => ({ ...k, keyboardKey: reverseMapping.value[k.midi] }));
});

// Вычисляет позицию черной клавиши
function getBlackKeyPosition(index: number): string {
  // Паттерн расположения черных клавиш в октаве
  // C# между C и D, D# между D и E, F# между F и G, G# между G и A, A# между A и B
  // Позиции: 1.0 = граница между 1-й и 2-й клавишами
  const octavePattern = [1.0, 2.0, 4.0, 5.0, 6.0]; // позиции на границах белых клавиш
  const octaveIndex = Math.floor(index / 5);
  const positionInOctave = index % 5;
  const whiteKeyWidth = 100 / 14; // 14 белых клавиш на 2 октавы (7*2)
  const position = (octaveIndex * 7 + octavePattern[positionInOctave]) * whiteKeyWidth;
  return `${position}%`;
}

function handleKeyPress(midi: number) {
  pressedKey.value = midi;
  lastPressedNote.value = midi;
  emit('note-pressed', midi);
  
  // Снять визуальное нажатие через короткое время
  setTimeout(() => {
    pressedKey.value = null;
  }, 200);
}
</script>

<style scoped>
.virtual-piano {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.piano-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 180px;
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
  transition: all 0.1s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
}

.piano-key.white {
  background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%);
  border: 1px solid #333;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.piano-key.white:hover {
  background: linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%);
}

.piano-key.white:active,
.piano-key.white.active {
  background: linear-gradient(180deg, #e0e0e0 0%, #d0d0d0 100%);
  transform: translateY(2px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.piano-key.white.correct {
  background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%) !important;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
}

.piano-key.white.incorrect {
  background: linear-gradient(180deg, #f87171 0%, #ef4444 100%) !important;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

.black-keys-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  pointer-events: none;
}

.piano-key.black {
  position: absolute;
  width: 5%;
  height: 100%;
  background: linear-gradient(180deg, #2a2a2a 0%, #000000 100%);
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  pointer-events: all;
  transform: translateX(-50%);
  z-index: 2;
  padding-bottom: 5px;
}

.piano-key.black:hover {
  background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
}

.piano-key.black:active,
.piano-key.black.active {
  background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
  transform: translateX(-50%) translateY(2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.piano-key.black.correct {
  background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%) !important;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.7);
}

.piano-key.black.incorrect {
  background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%) !important;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.7);
}

.note-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.piano-key.black .note-label {
  color: #fff;
  font-size: 0.65rem;
}

.keyboard-hint {
  position: absolute;
  top: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
}

.piano-key.black .keyboard-hint {
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
</style>
