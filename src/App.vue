<script setup lang="ts">
import { ref } from 'vue';
import NotationTrainer from './components/NotationTrainer.vue';

const showTrainer = ref(false);
const speed = ref(1);
const withAccidentals = ref(false);
const noTimer = ref(false);
const showClef = ref(true);
const selectedOctaveRange = ref('all');

function start() {
  showTrainer.value = true;
}
function stop() {
  showTrainer.value = false;
}
</script>

<template>
  <div v-if="!showTrainer" class="start-screen">
    <h1>Музыкальный тренажёр</h1>
    <div class="controls">
      <label>
        Скорость: {{ speed }} с
        <input type="range" min="0.1" max="5" step="0.1" v-model.number="speed" />
      </label>
      <label>
        <input type="checkbox" v-model="withAccidentals" /> Полутоны
      </label>
      <label>
        <input type="checkbox" v-model="noTimer" /> Без таймера
      </label>
      <label>
        <input type="checkbox" v-model="showClef" /> Показать ключ
      </label>
    </div>
    <div class="controls">
      <label>Отображаемые ноты:</label>
      <label><input type="radio" value="octave4" v-model="selectedOctaveRange" /> Первая октава</label>
      <label><input type="radio" value="octave5" v-model="selectedOctaveRange" /> Вторая октава</label>
      <label><input type="radio" value="all" v-model="selectedOctaveRange" /> Все</label>
    </div>
    <button class="start-btn" @click="start">Старт</button>
  </div>
  <NotationTrainer
    v-else
    :speed="speed"
    :with-accidentals="withAccidentals"
    :no-timer="noTimer"
    :show-clef="showClef"
    :octave-range="selectedOctaveRange"
    @stop="stop"
  />
</template>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}
.controls {
  margin: 2rem 0;
  display: flex;
  gap: 2rem;
}
.start-btn {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #42b883, #646cff);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.start-btn:hover {
  background: linear-gradient(90deg, #646cff, #42b883);
}
</style>
