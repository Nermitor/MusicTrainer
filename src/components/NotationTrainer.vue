<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, defineProps, defineEmits, nextTick } from 'vue';
import { Renderer, Stave, StaveNote, Accidental, Voice, Formatter, Stem } from 'vexflow';
import * as Tone from 'tone';

const props = defineProps<{
  speed: number;
  withAccidentals: boolean;
  noTimer: boolean;
  showClef: boolean;
  octaveRange: 'octave4' | 'octave5' | 'all';
}>();
const emit = defineEmits(['stop']);

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

const allNotes = computed(() => props.withAccidentals ? [...filteredNaturalNotes.value, ...filteredAccidentals.value] : filteredNaturalNotes.value);

const note = ref<typeof allNotes.value[0]>(allNotes.value[0]);
const paused = ref(false);
const intervalId = ref<number | null>(null);
const canvasRef = ref<HTMLDivElement | null>(null);
const showTooltip = ref(false);
const tooltipHovered = ref(false);
const tooltipVisible = computed(() => (showTooltip.value || tooltipHovered.value) && midiMatched.value !== true);
const countdown = ref(props.speed);
let countdownInterval: number | null = null;

const midiSupported = ref(false);
const midiStatus = ref('');
const midiMatched = ref<null | boolean>(null);

const lastMidiNote = ref<null | number>(null);
const lastMidiName = ref('');
const lastMidiRu = ref('');

const midiOffset = 12; // Октава вверх для звука и сравнения
const expectedMidi = computed(() => note.value.midi + midiOffset);

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

async function playMidiNoteSound(midi: number) {
  await Tone.start();
  const synth = new Tone.Synth().toDestination();
  const name = midiNumberToName(midi);
  synth.triggerAttackRelease(name, '8n');
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

function handleMIDIMessage(event: MIDIMessageEvent) {
  if (!event.data) return; // защита от null
  const status = event.data[0];
  const noteNum = event.data[1];
  const velocity = event.data[2];
  if (status === 144 && velocity > 0) {
    const noteNumShifted = noteNum + midiOffset;
    lastMidiNote.value = noteNumShifted;
    lastMidiName.value = midiNumberToName(noteNumShifted);
    lastMidiRu.value = midiNumberToRu(noteNumShifted);
    playMidiNoteSound(noteNumShifted);
    if (noteNumShifted === expectedMidi.value) {
      midiMatched.value = true;
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
      setTimeout(() => { midiMatched.value = null; }, 500);
    }
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

onMounted(() => {
  setRandomNoteAndSound();
  nextTick(drawNote);
  if (!props.noTimer) startInterval();
  window.addEventListener('keydown', onKeydown);
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    midiStatus.value = 'Web MIDI API не поддерживается';
  }
});
onUnmounted(() => {
  clearIntervalIfNeeded();
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
    <div class="controls">
      <button class="stop-btn" @click="stop">Прекратить</button>
      <span class="pause-indicator" v-if="paused">Пауза (пробел)</span>
    </div>
    <div class="midi-status">{{ midiStatus }}</div>
  </div>
</template>

<style scoped>
.trainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}
.notation-block {
  margin: 2rem 0;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px #0003;
  padding: 3rem 2rem 2.5rem 2rem;
  position: relative;
  min-width: 560px;
  min-height: 320px;
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
.controls {
  display: flex;
  gap: 2.5rem;
  align-items: center;
  margin-top: 3rem;
}
.stop-btn {
  font-size: 2rem;
  padding: 1.2rem 3.5rem;
  background: linear-gradient(90deg, #ff4e50, #f9d423);
  color: white;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.3s;
}
.stop-btn:hover {
  background: linear-gradient(90deg, #f9d423, #ff4e50);
}
.pause-indicator {
  color: #ff4e50;
  font-weight: bold;
  font-size: 1.5rem;
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
</style> 