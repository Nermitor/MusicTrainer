<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { Renderer, Stave, StaveNote, Accidental, Voice, Formatter, Stem } from 'vexflow';
import * as Tone from 'tone';
import { getKeyBindingMapping } from '@/shared/config/key-bindings';
import { VirtualPiano } from '@/widgets/virtual-piano';
import type { KeyBindingLayout } from '@/shared/types';

const props = defineProps<{
  speed: number;
  withAccidentals: boolean;
  noTimer: boolean;
  showClef: boolean;
  alwaysShowHint: boolean;
  hintDelay: number;
  octaveRange: 'octave4' | 'octave5' | 'all';
  locationRange: 'on' | 'between' | 'all';
  trainingMode: 'infinite' | 'exam' | 'timed' | 'survival';
  instrumentType: 'piano' | 'synth' | 'guitar' | 'bass' | 'organ';
  midiCalibration: number;
  inputMode: 'midi' | 'virtual-piano';
  enableKeyboardInput: boolean;
  keyBindingLayout: KeyBindingLayout;
}>();
const emit = defineEmits(['stop', 'noteAttempt']);

// Получаем маппинг клавиш в зависимости от выбранной раскладки
const keyboardMapping = computed(() => getKeyBindingMapping(props.keyBindingLayout));

const naturalNotes = [
  { key: 'c/4', midi: 60, name: 'C4' },
  { key: 'd/4', midi: 62, name: 'D4' },
  { key: 'e/4', midi: 64, name: 'E4' },
  { key: 'f/4', midi: 65, name: 'F4' },
  { key: 'g/4', midi: 67, name: 'G4' },
  { key: 'a/4', midi: 69, name: 'A4' },
  { key: 'b/4', midi: 71, name: 'B4' },
  { key: 'c/5', midi: 72, name: 'C5' },
  { key: 'd/5', midi: 74, name: 'D5' },
  { key: 'e/5', midi: 76, name: 'E5' },
  { key: 'f/5', midi: 77, name: 'F5' },
  { key: 'g/5', midi: 79, name: 'G5' },
  { key: 'a/5', midi: 81, name: 'A5' },
  { key: 'b/5', midi: 83, name: 'B5' },
];
const accidentals = [
  { key: 'c#/4', midi: 61, name: 'C#4/Db4', acc: '#' },
  { key: 'd#/4', midi: 63, name: 'D#4/Eb4', acc: '#' },
  { key: 'f#/4', midi: 66, name: 'F#4/Gb4', acc: '#' },
  { key: 'g#/4', midi: 68, name: 'G#4/Ab4', acc: '#' },
  { key: 'a#/4', midi: 70, name: 'A#4/Bb4', acc: '#' },
  { key: 'c#/5', midi: 73, name: 'C#5/Db5', acc: '#' },
  { key: 'd#/5', midi: 75, name: 'D#5/Eb5', acc: '#' },
  { key: 'f#/5', midi: 78, name: 'F#5/Gb5', acc: '#' },
  { key: 'g#/5', midi: 80, name: 'G#5/Ab5', acc: '#' },
  { key: 'a#/5', midi: 82, name: 'A#5/Bb5', acc: '#' },
];

const lineNotes = computed(() => [
  ...naturalNotes.filter(note => ['E4', 'G4', 'B4', 'D5', 'F5'].includes(note.name)),
  ...accidentals.filter(note => ['E#4/F4', 'Gb4', 'A#4/Bb4', 'C#5/Db5', 'E#5/F5'].includes(note.name)),
]);

const betweenNotes = computed(() => [
  ...naturalNotes.filter(note => ['F4', 'A4', 'C5', 'E5', 'G5'].includes(note.name)),
  ...accidentals.filter(note => ['F#4/Gb4', 'G#4/Ab4', 'A#4/Bb4', 'C#5/Db5', 'D#5/Eb5'].includes(note.name)),
]);

const filteredNaturalNotes = computed(() => {
  if (props.octaveRange === 'octave4') {
    return naturalNotes.filter(note => note.name.endsWith('4'));
  } else if (props.octaveRange === 'octave5') {
    return naturalNotes.filter(note => note.name.endsWith('5'));
  } else {
    return naturalNotes; // 'all' or any other value
  }
});

const filteredAccidentals = computed(() => {
  if (props.octaveRange === 'octave4') {
    return accidentals.filter(note => note.name.endsWith('4'));
  } else if (props.octaveRange === 'octave5') {
    return accidentals.filter(note => note.name.endsWith('5'));
  } else {
    return accidentals; // 'all' or any other value
  }
});

const filteredNotesByLocation = computed(() => {
  const currentNotes = props.withAccidentals ? [...filteredNaturalNotes.value, ...filteredAccidentals.value] : filteredNaturalNotes.value;
  if (props.locationRange === 'on') {
    return currentNotes.filter(note => lineNotes.value.some(lineNote => lineNote.midi === note.midi));
  } else if (props.locationRange === 'between') {
    return currentNotes.filter(note => betweenNotes.value.some(betweenNote => betweenNote.midi === note.midi));
  } else {
    return currentNotes; // 'all' or any other value
  }
});

const allNotes = computed(() => filteredNotesByLocation.value);

const note = ref<typeof allNotes.value[0]>(allNotes.value[0]);
const paused = ref(false);
const intervalId = ref<number | null>(null);
const canvasRef = ref<HTMLDivElement | null>(null);
const showTooltip = ref(false);
const tooltipHovered = ref(false);
const autoShowTooltip = ref(false);
const tooltipVisible = computed(() => (props.alwaysShowHint || showTooltip.value || tooltipHovered.value || autoShowTooltip.value) && midiMatched.value !== true);
const countdown = ref(props.speed);
let countdownInterval: number | null = null;
let hintTimeout: number | null = null;

const midiSupported = ref(false);
const midiStatus = ref('');
const midiMatched = ref<null | boolean>(null);

const lastMidiNote = ref<null | number>(null);
const lastMidiName = ref('');
const lastMidiRu = ref('');

// Режимы тренировки
const notesCompleted = ref(0);
const livesRemaining = ref(3);
const timeRemaining = ref(60);
const noteStartTime = ref(0);
let modeTimer: number | null = null;

const modeInfo = computed(() => {
  if (props.trainingMode === 'exam') {
    return `Нота ${notesCompleted.value + 1} / 20`;
  } else if (props.trainingMode === 'timed') {
    return `Осталось: ${timeRemaining.value}с`;
  } else if (props.trainingMode === 'survival') {
    return `❤️ × ${livesRemaining.value}`;
  }
  return '';
});

const midiOffset = 12; // Октава вверх для MIDI-клавиатуры
const expectedMidi = computed(() => note.value.midi);

const noteNamesRu: Record<string, string> = {
  'C': 'До', 'C#': 'До♯', 'Db': 'Ре♭', 'D': 'Ре', 'D#': 'Ре♯', 'Eb': 'Ми♭',
  'E': 'Ми', 'F': 'Фа', 'F#': 'Фа♯', 'Gb': 'Соль♭', 'G': 'Соль', 'G#': 'Соль♯',
  'Ab': 'Ля♭', 'A': 'Ля', 'A#': 'Ля♯', 'Bb': 'Си♭', 'B': 'Си',
};
function getRuName(noteName: string) {
  const match = noteName.match(/^([A-G](#|b)?)/);
  return match ? noteNamesRu[match[1]] || '' : '';
}

function setRandomNoteAndSound() {
  const notes = allNotes.value;
  note.value = notes[Math.floor(Math.random() * notes.length)];
  playMidiNoteSound(expectedMidi.value);
  if (!props.noTimer) countdown.value = props.speed;
  startHintTimer();
  noteStartTime.value = Date.now();
}

function drawNote() {
  if (!canvasRef.value) return;
  canvasRef.value.innerHTML = '';
  const renderer = new Renderer(canvasRef.value, Renderer.Backends.SVG);
  renderer.resize(500, 220);
  const context = renderer.getContext();
  context.setFont('Arial', 16, '').setBackgroundFillStyle('#fff');
  const stave = new Stave(30, 100, 440);
  if (props.showClef) {
    stave.addClef('treble');
  }
  stave.setContext(context).draw();
  const n = note.value;
  const staveNote = new StaveNote({ keys: [n.key], duration: 'q', clef: 'treble' });
  if ('acc' in n && n.acc) {
    // @ts-expect-error: vexflow типизация несовместима, но в рантайме работает
    staveNote.addModifier(new Accidental(n.acc), 0);
  }
  if (midiMatched.value !== null) {
    staveNote.setStyle({ fillStyle: midiMatched.value ? '#2ecc40' : '#ff4136', strokeStyle: '#111' });
  } else {
    staveNote.setStyle({ fillStyle: '#111', strokeStyle: '#111' });
  }
  if (n.midi >= 72) {
    staveNote.setStemDirection(Stem.DOWN);
  } else {
    staveNote.setStemDirection(Stem.UP);
  }
  const voice = new Voice({ numBeats: 1, beatValue: 4 });
  voice.setStrict(false);
  voice.addTickable(staveNote);
  new Formatter().joinVoices([voice]).format([voice], 350);
  voice.draw(context, stave);
  const svg = canvasRef.value.querySelector('svg');
  if (svg) svg.style.color = '#111';
}

// Создаем синтезатор в зависимости от выбранного инструмента
let currentSynth: any = null;

function createSynth() {
  // Dispose старого синтезатора, если он есть
  if (currentSynth) {
    currentSynth.dispose();
  }
  
  switch (props.instrumentType) {
    case 'piano':
      currentSynth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
      }).toDestination();
      break;
    case 'synth':
      currentSynth = new Tone.Synth({
        oscillator: { type: 'square' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.8 }
      }).toDestination();
      break;
    case 'guitar':
      currentSynth = new Tone.PluckSynth().toDestination();
      break;
    case 'bass':
      currentSynth = new Tone.MembraneSynth().toDestination();
      break;
    case 'organ':
      currentSynth = new Tone.FMSynth().toDestination();
      break;
    default:
      currentSynth = new Tone.Synth().toDestination();
  }
}

async function playMidiNoteSound(midi: number) {
  await Tone.start();
  if (!currentSynth) {
    createSynth();
  }
  const name = midiNumberToName(midi);
  
  if (props.instrumentType === 'bass' || props.instrumentType === 'guitar') {
    currentSynth.triggerAttackRelease(name, '4n');
  } else {
    currentSynth.triggerAttackRelease(name, '8n');
  }
}

function startCountdown() {
  if (props.noTimer) return;
  countdown.value = props.speed;
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (!paused.value) {
      countdown.value = Math.max(0, +(countdown.value - 0.1).toFixed(1));
    }
  }, 100);
}
function stopCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
}

function startHintTimer() {
  if (props.alwaysShowHint || props.hintDelay === 0) return;
  autoShowTooltip.value = false;
  if (hintTimeout) clearTimeout(hintTimeout);
  hintTimeout = setTimeout(() => {
    autoShowTooltip.value = true;
  }, props.hintDelay * 1000) as unknown as number;
}

function stopHintTimer() {
  if (hintTimeout) {
    clearTimeout(hintTimeout);
    hintTimeout = null;
  }
  autoShowTooltip.value = false;
}

function startModeTimer() {
  if (props.trainingMode === 'timed') {
    timeRemaining.value = 60;
    modeTimer = setInterval(() => {
      timeRemaining.value--;
      if (timeRemaining.value <= 0) {
        stop();
      }
    }, 1000) as unknown as number;
  }
}

function stopModeTimer() {
  if (modeTimer) {
    clearInterval(modeTimer);
    modeTimer = null;
  }
}

function initializeMode() {
  notesCompleted.value = 0;
  livesRemaining.value = 3;
  timeRemaining.value = 60;
  stopModeTimer();
  
  if (props.trainingMode === 'timed') {
    startModeTimer();
  }
}

function startInterval() {
  if (props.noTimer) return;
  clearIntervalIfNeeded();
  stopCountdown();
  if (!props.noTimer) countdown.value = props.speed;
  startCountdown();
  intervalId.value = setInterval(() => {
    if (!paused.value) {
      setRandomNoteAndSound();
    }
  }, props.speed * 1000) as unknown as number;
}
function clearIntervalIfNeeded() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
  stopCountdown();
  stopHintTimer();
}

function stop() {
  clearIntervalIfNeeded();
  emit('stop');
}

function togglePause() {
  paused.value = !paused.value;
}

function onKeydown(e: KeyboardEvent) {
  if (e.code === 'Space') {
    e.preventDefault();
    togglePause();
    return;
  }
  
  // Обработка клавиатурного режима ввода (только для виртуального пианино с включенной клавиатурой)
  if (props.inputMode === 'virtual-piano' && props.enableKeyboardInput) {
    const key = e.key.toLowerCase();
    const midiNote = keyboardMapping.value[key];
    if (midiNote !== undefined) {
      e.preventDefault();
      handleNotePress(midiNote);
    }
  }
}

function midiNumberToName(midi: number): string {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const note = notes[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return note + octave;
}
function midiNumberToRu(midi: number): string {
  const name = midiNumberToName(midi);
  const match = name.match(/^([A-G]#?)/);
  return match ? noteNamesRu[match[1]] || '' : '';
}

// Универсальная функция обработки нажатия ноты (из любого источника ввода)
function handleNotePress(pressedMidi: number) {
  lastMidiNote.value = pressedMidi;
  lastMidiName.value = midiNumberToName(pressedMidi);
  lastMidiRu.value = midiNumberToRu(pressedMidi);
  playMidiNoteSound(pressedMidi);
  
  const isCorrect = pressedMidi === expectedMidi.value;
  const reactionTime = Date.now() - noteStartTime.value;
  
  // Отправить попытку в статистику
  emit('noteAttempt', {
    noteName: note.value.name,
    midi: note.value.midi,
    correct: isCorrect,
    reactionTime,
    timestamp: Date.now()
  });
  
  if (isCorrect) {
    midiMatched.value = true;
    stopHintTimer();
    notesCompleted.value++;
    
    // Проверить условия завершения режимов
    if (props.trainingMode === 'exam' && notesCompleted.value >= 20) {
      setTimeout(() => {
        stop();
      }, 500);
      return;
    }
    
    setTimeout(() => {
      midiMatched.value = null;
      setRandomNoteAndSound();
      setTimeout(() => {
        lastMidiNote.value = null;
        lastMidiName.value = '';
        lastMidiRu.value = '';
      }, 200);
    }, 500);
  } else {
    midiMatched.value = false;
    
    // Обработка режима выживания
    if (props.trainingMode === 'survival') {
      livesRemaining.value--;
      if (livesRemaining.value <= 0) {
        setTimeout(() => {
          stop();
        }, 500);
        return;
      }
    }
    
    setTimeout(() => { midiMatched.value = null; }, 500);
  }
}

function handleMIDIMessage(event: MIDIMessageEvent) {
  if (!event.data) return;
  const status = event.data[0];
  const noteNum = event.data[1];
  const velocity = event.data[2];
  if (status === 144 && velocity > 0) {
    // Применяем калибровку и смещение октавы
    const noteNumShifted = noteNum + midiOffset + props.midiCalibration;
    handleNotePress(noteNumShifted);
  }
}

function onMIDISuccess(midiAccess: any) {
  midiSupported.value = true;
  midiStatus.value = 'MIDI-клавиатура подключена';
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = handleMIDIMessage;
  }
}
function onMIDIFailure() {
  midiSupported.value = false;
  midiStatus.value = 'MIDI-клавиатура не найдена или не поддерживается';
}

// Обработчик для виртуального пианино
function handleVirtualPianoPress(midi: number) {
  handleNotePress(midi);
}

onMounted(() => {
  initializeMode();
  setRandomNoteAndSound();
  nextTick(drawNote);
  if (!props.noTimer) startInterval();
  window.addEventListener('keydown', onKeydown);
  
  // Инициализируем синтезатор
  createSynth();
  
  // Подключаем MIDI, если это режим MIDI
  if (props.inputMode === 'midi') {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      midiStatus.value = 'Web MIDI API не поддерживается';
    }
  }
});
onUnmounted(() => {
  clearIntervalIfNeeded();
  stopModeTimer();
  window.removeEventListener('keydown', onKeydown);
});

watch(() => props.speed, startInterval);
watch(() => props.withAccidentals, () => {
  setRandomNoteAndSound();
  startInterval();
});
watch(() => props.octaveRange, () => {
  setRandomNoteAndSound();
  startInterval();
});
watch(() => props.locationRange, () => {
  setRandomNoteAndSound();
  startInterval();
});
watch(() => props.instrumentType, () => {
  // Пересоздаем синтезатор при смене инструмента
  createSynth();
});
watch(() => props.inputMode, (newMode) => {
  // При смене режима ввода, переинициализируем MIDI если нужно
  if (newMode === 'midi' && navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }
});
watch(note, () => {
  nextTick(drawNote);
});

</script>

<template>
  <div class="trainer">
    <div class="notation-block">
      <div v-if="!props.noTimer" class="countdown-text">{{ countdown.toFixed(1) }} сек</div>
      <div
        ref="canvasRef"
        class="notation-canvas"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
        @click="playMidiNoteSound(expectedMidi)"
      ></div>
      <div v-if="tooltipVisible" class="tooltip" @mouseenter="tooltipHovered = true" @mouseleave="tooltipHovered = false">
        <div style="font-size: 1.2em; font-weight: bold;">
          {{ note.name }}
          <span style="color:#888;font-size:0.8em">({{ getRuName(note.name) }})</span>
        </div>
        <div style="font-size: 0.9em; color: #888;">MIDI: {{ note.midi }}</div>
      </div>
      <div v-if="lastMidiNote !== null" class="midi-last">
        Нажата клавиша: <b>{{ lastMidiName }}</b> <span v-if="lastMidiRu">({{ lastMidiRu }})</span> <span v-if="lastMidiNote !== null" style="color:#888;font-size:0.9em">MIDI: {{ lastMidiNote }}</span>
      </div>
    </div>

    <!-- Виртуальное пианино -->
    <div v-if="props.inputMode === 'virtual-piano'" class="virtual-piano-container">
      <VirtualPiano
        :show-keyboard-mapping="props.enableKeyboardInput"
        :correct-note="expectedMidi"
        :highlight-correct="midiMatched === true"
        :highlight-incorrect="midiMatched === false"
        :pressed-midi-note="lastMidiNote"
        :keyboard-mapping="keyboardMapping"
        @note-pressed="handleVirtualPianoPress"
      />
    </div>

    <div class="trainer-info">
      <div v-if="modeInfo" class="mode-info">{{ modeInfo }}</div>
      <div v-if="props.inputMode === 'midi'" class="midi-status">{{ midiStatus }}</div>
      <div class="pause-indicator" v-if="paused">⏸️ Пауза (нажмите пробел)</div>
    </div>
  </div>
</template>

<style scoped>
.trainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
}
.notation-block {
  margin: 0.5rem 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px #0003;
  padding: 1rem 1rem 0.75rem 1rem;
  position: relative;
  min-width: 480px;
  min-height: 200px;
}
.notation-canvas {
  width: 500px;
  height: 220px;
  cursor: pointer;
}
.tooltip {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: #333;
  border: 1.5px solid #ccc;
  border-radius: 14px;
  padding: 1.2rem 2.2rem 0.8rem 2.2rem;
  box-shadow: 0 4px 24px #0002;
  z-index: 10;
  min-width: 180px;
  text-align: center;
  font-size: 2rem;
}
.trainer-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.mode-info {
  background: rgba(66, 184, 131, 0.15);
  border: 2px solid rgba(66, 184, 131, 0.4);
  color: #42b883;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.8rem 2rem;
  border-radius: 12px;
}
.pause-indicator {
  background: rgba(255, 78, 80, 0.2);
  border: 2px solid rgba(255, 78, 80, 0.5);
  color: #ff4e50;
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.countdown-text {
  position: absolute;
  top: 0.7rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.2rem;
  color: #222;
  font-weight: bold;
  letter-spacing: 0.04em;
  z-index: 2;
}
.midi-status { text-align: center; color: #888; font-size: 1.1rem; margin-bottom: 0.5rem; }
.midi-last { text-align: center; color: #333; font-size: 1.3rem; margin-top: 1.2rem; }

.virtual-piano-container {
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.keyboard-hint-banner {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(139, 92, 246, 0.1);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  text-align: center;
}

.hint-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.75rem;
}

.hint-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}
</style> 