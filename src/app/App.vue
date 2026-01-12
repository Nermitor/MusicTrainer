<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <div class="header-left">
        <div class="app-logo">🎵</div>
        <h1 class="app-title">Музыкальный тренажёр</h1>
      </div>
      <div class="header-right">
        <button v-if="currentView === 'settings'" class="header-btn" @click="viewStatistics">
          📊 Статистика
        </button>
        <button v-if="currentView === 'settings'" class="header-btn" @click="showProfileModal = true">
          📁 Профили
        </button>
        <button v-if="currentView === 'statistics'" class="header-btn" @click="currentView = 'settings'">
          ⬅ К настройкам
        </button>
        <button v-if="currentView === 'training'" class="header-btn stop-training-btn" @click="stop">
          ⏹ Завершить
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <!-- Settings Screen -->
      <div v-if="currentView === 'settings'" class="settings-screen">
        <div class="settings-sidebar">
          <h2 class="sidebar-title">⚙️ Настройки тренировки</h2>
          <p class="sidebar-description">
            Настройте параметры тренировки под свой уровень подготовки
          </p>
        </div>

        <div class="settings-content">
          <div class="settings-grid">
            <!-- Таймер и скорость -->
            <div class="settings-card">
              <h3 class="card-title">⏱️ Таймер</h3>
              <div class="card-content">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="settings.noTimer" />
                  <span>Без таймера</span>
                </label>
                <label class="slider-control" :class="{ disabled: settings.noTimer }">
                  <span class="slider-label">Скорость смены нот</span>
                  <div class="slider-wrapper">
                    <input type="range" min="0.1" max="5" step="0.1" v-model.number="settings.speed" :disabled="settings.noTimer" />
                    <span class="slider-value">{{ settings.speed }} с</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Подсказки -->
            <div class="settings-card">
              <h3 class="card-title">💡 Подсказки</h3>
              <div class="card-content">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="settings.alwaysShowHint" />
                  <span>Всегда показывать</span>
                </label>
                <label class="slider-control" :class="{ disabled: settings.alwaysShowHint }">
                  <span class="slider-label">Задержка появления</span>
                  <div class="slider-wrapper">
                    <input type="range" min="0" max="10" step="0.5" v-model.number="settings.hintDelay" :disabled="settings.alwaysShowHint" />
                    <span class="slider-value">{{ settings.hintDelay === 0 ? 'Никогда' : `${settings.hintDelay} с` }}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Диапазон нот -->
            <div class="settings-card">
              <h3 class="card-title">🎼 Диапазон нот</h3>
              <div class="card-content">
                <div class="radio-group">
                  <span class="radio-group-label">Октавы:</span>
                  <label class="radio-label">
                    <input type="radio" value="octave4" v-model="settings.octaveRange" />
                    <span>Первая</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" value="octave5" v-model="settings.octaveRange" />
                    <span>Вторая</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" value="all" v-model="settings.octaveRange" />
                    <span>Все</span>
                  </label>
                </div>
                <div class="radio-group">
                  <span class="radio-group-label">Расположение:</span>
                  <label class="radio-label">
                    <input type="radio" value="between" v-model="settings.locationRange" />
                    <span>Между линий</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" value="on" v-model="settings.locationRange" />
                    <span>На линии</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" value="all" v-model="settings.locationRange" />
                    <span>Все</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Дополнительные настройки -->
            <div class="settings-card">
              <h3 class="card-title">⚙️ Дополнительно</h3>
              <div class="card-content">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="settings.withAccidentals" />
                  <span>Полутоны (диезы и бемоли)</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="settings.showClef" />
                  <span>Показать ключ</span>
                </label>
              </div>
            </div>

            <!-- Инструмент -->
            <div class="settings-card">
              <h3 class="card-title">🎹 Инструмент</h3>
              <div class="card-content">
                <div class="instrument-selector">
                  <label class="instrument-option" :class="{ active: settings.instrumentType === 'piano' }">
                    <input type="radio" value="piano" v-model="settings.instrumentType" />
                    <div class="instrument-content">
                      <div class="instrument-icon">🎹</div>
                      <div class="instrument-name">Пианино</div>
                    </div>
                  </label>
                  <label class="instrument-option" :class="{ active: settings.instrumentType === 'synth' }">
                    <input type="radio" value="synth" v-model="settings.instrumentType" />
                    <div class="instrument-content">
                      <div class="instrument-icon">🎛️</div>
                      <div class="instrument-name">Синтезатор</div>
                    </div>
                  </label>
                  <label class="instrument-option" :class="{ active: settings.instrumentType === 'guitar' }">
                    <input type="radio" value="guitar" v-model="settings.instrumentType" />
                    <div class="instrument-content">
                      <div class="instrument-icon">🎸</div>
                      <div class="instrument-name">Гитара</div>
                    </div>
                  </label>
                  <label class="instrument-option" :class="{ active: settings.instrumentType === 'bass' }">
                    <input type="radio" value="bass" v-model="settings.instrumentType" />
                    <div class="instrument-content">
                      <div class="instrument-icon">🎸</div>
                      <div class="instrument-name">Бас</div>
                    </div>
                  </label>
                  <label class="instrument-option" :class="{ active: settings.instrumentType === 'organ' }">
                    <input type="radio" value="organ" v-model="settings.instrumentType" />
                    <div class="instrument-content">
                      <div class="instrument-icon">🎹</div>
                      <div class="instrument-name">Орган</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Режим ввода -->
            <div class="settings-card input-card">
              <h3 class="card-title">⌨️ Режим ввода</h3>
              <div class="card-content">
                <div class="input-mode-selector">
                  <label class="input-mode-option" :class="{ active: settings.inputMode === 'midi' }">
                    <input type="radio" value="midi" v-model="settings.inputMode" />
                    <div class="input-mode-content">
                      <div class="input-mode-icon">🎹</div>
                      <div class="input-mode-name">MIDI-клавиатура</div>
                      <div class="input-mode-description">Подключите MIDI-устройство</div>
                    </div>
                  </label>
                  <label class="input-mode-option" :class="{ active: settings.inputMode === 'virtual-piano' }">
                    <input type="radio" value="virtual-piano" v-model="settings.inputMode" />
                    <div class="input-mode-content">
                      <div class="input-mode-icon">🎼</div>
                      <div class="input-mode-name">Виртуальное пианино</div>
                      <div class="input-mode-description">Мышь или клавиатура</div>
                    </div>
                  </label>
                </div>

                <!-- Калибровка MIDI -->
                <div v-if="settings.inputMode === 'midi'" class="calibration-section">
                  <h4 class="calibration-title">🎛️ Калибровка MIDI</h4>
                  <p class="calibration-description">
                    Текущее смещение: {{ settings.midiCalibration > 0 ? '+' : '' }}{{ settings.midiCalibration }}
                  </p>
                  <button class="calibration-btn" @click="startCalibration" :disabled="calibrationMode">
                    🎹 {{ calibrationMode ? 'Ожидание...' : 'Начать калибровку' }}
                  </button>
                  <p v-if="calibrationMessage" class="calibration-message">{{ calibrationMessage }}</p>
                </div>

                <!-- Опции виртуального пианино -->
                <div v-if="settings.inputMode === 'virtual-piano'" class="keyboard-option-section">
                  <label class="keyboard-option-checkbox">
                    <input type="checkbox" v-model="settings.enableKeyboardInput" />
                    <span>⌨️ Использовать клавиатуру компьютера (A-L, Q-P)</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Режим тренировки -->
            <div class="settings-card mode-card">
              <h3 class="card-title">🎮 Режим тренировки</h3>
              <div class="card-content">
                <div class="mode-selector">
                  <label class="mode-option" :class="{ active: settings.trainingMode === 'infinite' }">
                    <input type="radio" value="infinite" v-model="settings.trainingMode" />
                    <div class="mode-content">
                      <div class="mode-icon">∞</div>
                      <div class="mode-name">Бесконечный</div>
                      <div class="mode-description">Тренировка без ограничений</div>
                    </div>
                  </label>
                  
                  <label class="mode-option" :class="{ active: settings.trainingMode === 'exam' }">
                    <input type="radio" value="exam" v-model="settings.trainingMode" />
                    <div class="mode-content">
                      <div class="mode-icon">📝</div>
                      <div class="mode-name">Экзамен</div>
                      <div class="mode-description">20 нот, оценка в конце</div>
                    </div>
                  </label>
                  
                  <label class="mode-option" :class="{ active: settings.trainingMode === 'timed' }">
                    <input type="radio" value="timed" v-model="settings.trainingMode" />
                    <div class="mode-content">
                      <div class="mode-icon">⏱️</div>
                      <div class="mode-name">На время</div>
                      <div class="mode-description">60 секунд испытание</div>
                    </div>
                  </label>
                  
                  <label class="mode-option" :class="{ active: settings.trainingMode === 'survival' }">
                    <input type="radio" value="survival" v-model="settings.trainingMode" />
                    <div class="mode-content">
                      <div class="mode-icon">❤️</div>
                      <div class="mode-name">Выживание</div>
                      <div class="mode-description">3 жизни, не ошибись!</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="start-section">
            <button class="start-btn" @click="start">
              <span class="start-icon">🎹</span>
              <span>Начать тренировку</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Training Screen -->
      <div v-else-if="currentView === 'training' && !showResults" class="training-screen">
        <NotationTrainer
          :speed="settings.speed"
          :with-accidentals="settings.withAccidentals"
          :no-timer="settings.noTimer"
          :show-clef="settings.showClef"
          :always-show-hint="settings.alwaysShowHint"
          :hint-delay="settings.hintDelay"
          :octave-range="settings.octaveRange"
          :location-range="settings.locationRange"
          :training-mode="settings.trainingMode"
          :instrument-type="settings.instrumentType"
          :midi-calibration="settings.midiCalibration"
          :input-mode="settings.inputMode"
          :enable-keyboard-input="settings.enableKeyboardInput"
          :key-binding-layout="settings.keyBindingLayout"
          @stop="stop"
          @note-attempt="handleNoteAttempt"
        />
      </div>

      <!-- Results Screen -->
      <div v-else-if="showResults && sessionStore.currentSession.value" class="results-screen">
        <div class="results-card">
          <h2 class="results-title">🎉 Результаты тренировки</h2>
          
          <div class="results-mode">
            <span class="mode-badge">
              {{ settings.trainingMode === 'infinite' ? '∞ Бесконечный' : 
                 settings.trainingMode === 'exam' ? '📝 Экзамен' :
                 settings.trainingMode === 'timed' ? '⏱️ На время' : '❤️ Выживание' }}
            </span>
          </div>

          <div class="results-stats">
            <div class="result-item">
              <div class="result-label">Всего нот</div>
              <div class="result-value">{{ sessionStore.currentSession.value?.totalNotes }}</div>
            </div>
            <div class="result-item success">
              <div class="result-label">Правильно</div>
              <div class="result-value">{{ sessionStore.currentSession.value?.correctNotes }}</div>
            </div>
            <div class="result-item error">
              <div class="result-label">Ошибок</div>
              <div class="result-value">{{ sessionStore.currentSession.value?.wrongNotes }}</div>
            </div>
            <div class="result-item">
              <div class="result-label">Точность</div>
              <div class="result-value">{{ sessionStore.currentSession.value?.accuracy }}%</div>
            </div>
            <div class="result-item">
              <div class="result-label">Среднее время</div>
              <div class="result-value">{{ ((sessionStore.currentSession.value?.averageReactionTime || 0) / 1000).toFixed(2) }}с</div>
            </div>
            <div class="result-item">
              <div class="result-label">Длительность</div>
              <div class="result-value">{{ Math.floor((sessionStore.currentSession.value?.duration || 0) / 1000) }}с</div>
            </div>
          </div>

          <div class="results-actions">
            <button class="result-btn primary" @click="start">
              🔄 Еще раз
            </button>
            <button class="result-btn" @click="backToSettings">
              ⚙️ Настройки
            </button>
            <button class="result-btn" @click="viewStatistics(); showResults = false">
              📊 Статистика
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics Screen -->
      <div v-else-if="currentView === 'statistics'" class="statistics-screen">
        <div class="stats-container">
          <h2 class="stats-title">📊 Статистика</h2>
          
          <div class="stats-overview">
            <div class="stat-card">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.statistics.value.totalNotes }}</div>
                <div class="stat-label">Всего нот</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.statistics.value.totalCorrect }}</div>
                <div class="stat-label">Правильно</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">❌</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.statistics.value.totalWrong }}</div>
                <div class="stat-label">Ошибок</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📈</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.accuracy.value }}%</div>
                <div class="stat-label">Точность</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏆</div>
              <div class="stat-content">
                <div class="stat-value">{{ statisticsStore.statistics.value.totalSessions }}</div>
                <div class="stat-label">Тренировок</div>
              </div>
            </div>
          </div>

          <div class="sessions-history">
            <div class="history-header">
              <h3>История тренировок</h3>
              <button class="clear-stats-btn" @click="handleClearStatistics">
                🗑️ Очистить
              </button>
            </div>
            
            <div v-if="!statisticsStore.hasSessions" class="empty-history">
              Пока нет завершенных тренировок
            </div>
            
            <div v-else class="sessions-list">
              <div v-for="session in statisticsStore.getRecentSessions(20)" :key="session.id" class="session-item">
                <div class="session-time">
                  {{ new Date(session.startTime).toLocaleDateString() }}
                  {{ new Date(session.startTime).toLocaleTimeString() }}
                </div>
                <div class="session-mode-badge">
                  {{ session.mode === 'infinite' ? '∞' : 
                     session.mode === 'exam' ? '📝' :
                     session.mode === 'timed' ? '⏱️' : '❤️' }}
                </div>
                <div class="session-stats">
                  <span class="session-accuracy" :class="{ good: session.accuracy >= 80, medium: session.accuracy >= 60 && session.accuracy < 80 }">
                    {{ session.accuracy }}%
                  </span>
                  <span class="session-notes">{{ session.totalNotes }} нот</span>
                  <span class="session-duration">{{ Math.floor(session.duration / 1000) }}с</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <span>Музыкальный тренажёр © 2026</span>
        <span class="footer-separator">•</span>
        <span>Версия 2.0 (FSD)</span>
      </div>
    </footer>

    <!-- Profile Modal -->
    <div v-if="showProfileModal" class="modal-overlay" @click.self="showProfileModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>📁 Профили настроек</h2>
          <button class="close-btn" @click="showProfileModal = false">✕</button>
        </div>
        
        <div class="modal-body">
          <div class="save-section">
            <button 
              v-if="!showSaveInput" 
              class="save-new-btn" 
              @click="showSaveInput = true"
            >
              ➕ Сохранить текущие настройки
            </button>
            
            <div v-else class="save-input-group">
              <input 
                v-model="newProfileName" 
                type="text" 
                placeholder="Название профиля..."
                @keyup.enter="createProfile"
                class="profile-input"
                autofocus
              />
              <button @click="createProfile" class="confirm-btn">✓</button>
              <button @click="showSaveInput = false; newProfileName = ''" class="cancel-btn">✕</button>
            </div>
          </div>

          <div class="profiles-list">
            <div v-if="profileStore.profiles.value.length === 0" class="empty-state">
              Нет сохранённых профилей
            </div>
            
            <div 
              v-for="profile in profileStore.profiles.value" 
              :key="profile.id" 
              class="profile-item"
            >
              <div class="profile-info">
                <div class="profile-name">{{ profile.name }}</div>
              </div>
              <div class="profile-actions">
                <button class="load-btn" @click="loadProfile(profile)">Загрузить</button>
                <button class="delete-btn" @click="deleteProfile(profile.id)">🗑</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TrainingSettings, NoteAttempt } from '@/shared/types';
import type { ProfileTypes } from '@/entities/profile';
import { useProfile } from '@/entities/profile';
import { useStatistics } from '@/entities/statistics';
import { useSession } from '@/entities/session';
import { NotationTrainer } from '@/widgets/notation-trainer';

type ViewMode = 'settings' | 'training' | 'statistics';

const currentView = ref<ViewMode>('settings');
const showProfileModal = ref(false);
const showSaveInput = ref(false);
const newProfileName = ref('');
const showResults = ref(false);

const settings = ref<TrainingSettings>({
  speed: 1,
  withAccidentals: false,
  noTimer: true,
  showClef: true,
  alwaysShowHint: false,
  hintDelay: 0,
  octaveRange: 'all',
  locationRange: 'all',
  trainingMode: 'infinite',
  instrumentType: 'piano',
  midiCalibration: 0,
  inputMode: 'virtual-piano',
  enableKeyboardInput: true,
  keyBindingLayout: 'chromatic',
});

const profileStore = useProfile();
const statisticsStore = useStatistics();
const sessionStore = useSession();

onMounted(() => {
  profileStore.loadProfiles();
  statisticsStore.loadStatistics();
});

function start() {
  sessionStore.startSession(settings.value.trainingMode, settings.value);
  currentView.value = 'training';
  showResults.value = false;
}

function stop() {
  const completedSession = sessionStore.endSession();
  if (completedSession) {
    statisticsStore.addSession(completedSession);
  }
  showResults.value = true;
}

function backToSettings() {
  currentView.value = 'settings';
  showResults.value = false;
}

function viewStatistics() {
  currentView.value = 'statistics';
}

function handleNoteAttempt(attempt: NoteAttempt) {
  sessionStore.addAttempt(attempt.noteName, attempt.midi, attempt.correct);
}

const calibrationMode = ref(false);
const calibrationMessage = ref('');

function startCalibration() {
  calibrationMode.value = true;
  calibrationMessage.value = 'Нажмите на вашей MIDI-клавиатуре ноту "До" (C) младшей октавы...';
  
  // Временно подписываемся на MIDI события
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then((midiAccess) => {
      const inputs = midiAccess.inputs.values();
      for (const input of inputs) {
        input.onmidimessage = handleCalibrationMIDI;
      }
    });
  }
}

function handleCalibrationMIDI(event: WebMIDI.MIDIMessageEvent) {
  if (!event.data || calibrationMode.value === false) return;
  
  const [status, noteNum] = event.data;
  
  // 144 = note on
  if (status === 144) {
    // Ожидаем C4 (MIDI 60) или C5 (MIDI 72)
    // Вычисляем смещение
    const expectedC4 = 60;
    const offset = expectedC4 - noteNum;
    settings.value.midiCalibration = offset;
    
    calibrationMode.value = false;
    calibrationMessage.value = `Калибровка завершена! Смещение: ${offset > 0 ? '+' : ''}${offset}`;
    
    // Отключаем обработчик
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        const inputs = midiAccess.inputs.values();
        for (const input of inputs) {
          input.onmidimessage = null;
        }
      });
    }
    
    setTimeout(() => {
      calibrationMessage.value = '';
    }, 3000);
  }
}

function createProfile() {
  if (newProfileName.value.trim()) {
    profileStore.createProfile(newProfileName.value.trim(), settings.value);
    newProfileName.value = '';
    showSaveInput.value = false;
  }
}

function loadProfile(profile: ProfileTypes.Profile) {
  settings.value = {
    speed: profile.speed,
    withAccidentals: profile.withAccidentals,
    noTimer: profile.noTimer,
    showClef: profile.showClef,
    alwaysShowHint: profile.alwaysShowHint,
    hintDelay: profile.hintDelay,
    octaveRange: profile.octaveRange,
    locationRange: profile.locationRange,
    trainingMode: profile.trainingMode,
    instrumentType: profile.instrumentType || 'piano',
    midiCalibration: profile.midiCalibration || 0,
    inputMode: profile.inputMode || 'virtual-piano',
    enableKeyboardInput: profile.enableKeyboardInput ?? true,
    keyBindingLayout: profile.keyBindingLayout || 'chromatic',
  };
  showProfileModal.value = false;
}

function deleteProfile(id: string) {
  profileStore.deleteProfile(id);
}

function handleClearStatistics() {
  if (confirm('Вы уверены, что хотите удалить всю статистику? Это действие необратимо.')) {
    statisticsStore.clearStatistics();
  }
}
</script>

<style scoped>
/* Base Container */
.app-container {
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background: linear-gradient(135deg, #1e1e2d 0%, #141423 100%);
  color: #fff;
  overflow: auto;
}

/* Header */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-logo {
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.app-title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  background: linear-gradient(90deg, #42b883, #646cff, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 0.5rem 0;
  line-height: 1.3;
  display: inline-block;
}

.header-right {
  display: flex;
  gap: 1rem;
}

.header-btn {
  padding: 0.7rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  font-weight: 500;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.stop-training-btn {
  background: rgba(255, 65, 54, 0.15);
  border-color: rgba(255, 65, 54, 0.3);
}

.stop-training-btn:hover {
  background: rgba(255, 65, 54, 0.25);
  border-color: rgba(255, 65, 54, 0.5);
}

/* Main Content */
.app-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Settings Screen */
.settings-screen {
  display: flex;
  width: 100%;
  height: 100%;
}

.settings-sidebar {
  width: 300px;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-title {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
}

.sidebar-description {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  line-height: 1.5;
}

.settings-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.settings-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.8rem;
  transition: all 0.3s ease;
  height: fit-content;
}

.settings-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  color: #fff;
  font-weight: 600;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #e0e0e0;
  font-size: 1.05rem;
  cursor: pointer;
  transition: color 0.2s;
}

.checkbox-label:hover {
  color: #fff;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #42b883;
}

.slider-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: opacity 0.3s;
}

.slider-control.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.slider-label {
  color: #b0b0b0;
  font-size: 0.95rem;
}

.slider-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider-wrapper input[type="range"] {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.slider-wrapper input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #646cff);
  cursor: pointer;
  transition: transform 0.2s;
}

.slider-wrapper input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #646cff);
  cursor: pointer;
  border: none;
  transition: transform 0.2s;
}

.slider-wrapper input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.slider-wrapper input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.2);
}

.slider-wrapper input[type="range"]:disabled::-webkit-slider-thumb {
  background: #555;
  cursor: not-allowed;
}

.slider-wrapper input[type="range"]:disabled::-moz-range-thumb {
  background: #555;
  cursor: not-allowed;
}

.slider-value {
  min-width: 70px;
  text-align: right;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.radio-group-label {
  color: #b0b0b0;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #e0e0e0;
  font-size: 1.05rem;
  cursor: pointer;
  padding-left: 0.5rem;
  transition: color 0.2s;
}

.radio-label:hover {
  color: #fff;
}

.radio-label input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #42b883;
}

/* Mode Selection */
.mode-card {
  grid-column: 1 / -1;
}

.mode-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.mode-option {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s;
  overflow: hidden;
}

.mode-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.mode-option:hover {
  border-color: rgba(66, 184, 131, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.mode-option.active {
  border-color: #42b883;
  background: rgba(66, 184, 131, 0.15);
}

.mode-content {
  padding: 1.5rem;
  text-align: center;
}

.mode-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.mode-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.3rem;
}

.mode-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Instrument Selector */
.instrument-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
}

.instrument-option {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s;
  overflow: hidden;
}

.instrument-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.instrument-option:hover {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.instrument-option.active {
  border-color: rgba(139, 92, 246, 0.6);
  background: rgba(139, 92, 246, 0.15);
}

.instrument-content {
  padding: 1rem;
  text-align: center;
}

.instrument-icon {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.instrument-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #fff;
}

/* Input Mode Selector */
.input-mode-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.input-mode-option {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s;
  overflow: hidden;
}

.input-mode-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.input-mode-option:hover {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.input-mode-option.active {
  border-color: rgba(139, 92, 246, 0.6);
  background: rgba(139, 92, 246, 0.15);
}

.input-mode-content {
  padding: 1rem;
  text-align: center;
}

.input-mode-icon {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.input-mode-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.2rem;
}

.input-mode-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Calibration Section */
.calibration-section {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.calibration-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.calibration-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.75rem 0;
}

.calibration-btn {
  padding: 0.6rem 1rem;
  background: rgba(139, 92, 246, 0.3);
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 8px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calibration-btn:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.5);
  transform: translateY(-2px);
}

.calibration-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.calibration-message {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: rgba(34, 197, 94, 1);
  font-weight: 500;
}

/* Keyboard Option Section */
.keyboard-option-section {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.keyboard-option-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #fff;
}

.keyboard-option-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.keyboard-option-checkbox span {
  user-select: none;
}

/* Start Section */
.start-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  margin-top: auto;
}

.start-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  padding: 1.5rem 4rem;
  background: linear-gradient(135deg, #42b883, #35a372, #646cff);
  background-size: 200% 200%;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(66, 184, 131, 0.4);
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.start-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.start-btn:hover::before {
  left: 100%;
}

.start-btn:hover {
  background-position: 100% 0;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 35px rgba(66, 184, 131, 0.5);
}

.start-btn:active {
  transform: translateY(-1px) scale(0.98);
}

.start-icon {
  font-size: 2rem;
}

/* Training Screen */
.training-screen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Results Screen */
.results-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.results-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  backdrop-filter: blur(10px);
}

.results-title {
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(90deg, #42b883, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.results-mode {
  text-align: center;
  margin-bottom: 2rem;
}

.mode-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(66, 184, 131, 0.2);
  border: 1px solid rgba(66, 184, 131, 0.4);
  border-radius: 20px;
  font-size: 1.1rem;
  color: #42b883;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.result-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.result-item.success {
  border-color: rgba(46, 204, 64, 0.3);
  background: rgba(46, 204, 64, 0.1);
}

.result-item.error {
  border-color: rgba(255, 65, 54, 0.3);
  background: rgba(255, 65, 54, 0.1);
}

.result-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.result-value {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.result-btn {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.result-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.result-btn.primary {
  background: linear-gradient(135deg, #42b883, #35a372);
  border-color: #42b883;
}

.result-btn.primary:hover {
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
}

/* Statistics Screen */
.statistics-screen {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-title {
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 2rem 0;
  background: linear-gradient(90deg, #42b883, #646cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.sessions-history {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.history-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
}

.clear-stats-btn {
  padding: 0.6rem 1.2rem;
  background: rgba(255, 65, 54, 0.2);
  border: 1px solid rgba(255, 65, 54, 0.4);
  color: #ff4136;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.clear-stats-btn:hover {
  background: rgba(255, 65, 54, 0.3);
  border-color: rgba(255, 65, 54, 0.6);
}

.empty-history {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: all 0.2s;
}

.session-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.session-time {
  flex: 1;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.session-mode-badge {
  font-size: 1.5rem;
}

.session-stats {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.session-accuracy {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff4136;
}

.session-accuracy.good {
  color: #2ecc40;
}

.session-accuracy.medium {
  color: #ffdc00;
}

.session-notes, .session-duration {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Footer */
.app-footer {
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  flex-shrink: 0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.footer-separator {
  color: rgba(255, 255, 255, 0.3);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #1e2a3a 0%, #2a3f5f 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  margin: 0;
  color: #fff;
  font-size: 1.8rem;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

.modal-body {
  padding: 1.5rem 2rem;
  max-height: calc(80vh - 100px);
  overflow-y: auto;
}

.save-section {
  margin-bottom: 1.5rem;
}

.save-new-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #42b883, #35a372);
  border: none;
  color: #fff;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.save-new-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.4);
}

.save-input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.profile-input {
  flex: 1;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.profile-input:focus {
  border-color: #42b883;
  background: rgba(255, 255, 255, 0.08);
}

.profile-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.confirm-btn, .cancel-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-btn {
  background: #42b883;
  color: #fff;
}

.confirm-btn:hover {
  background: #35a372;
  transform: scale(1.1);
}

.cancel-btn {
  background: rgba(255, 65, 54, 0.8);
  color: #fff;
}

.cancel-btn:hover {
  background: rgba(255, 65, 54, 1);
  transform: scale(1.1);
}

.profiles-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
}

.profile-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.profile-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.profile-info {
  flex: 1;
}

.profile-name {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
}

.profile-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.load-btn {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(90deg, #42b883, #35a372);
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s;
}

.load-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}

.delete-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 65, 54, 0.2);
  border: 1px solid rgba(255, 65, 54, 0.4);
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background: rgba(255, 65, 54, 0.4);
  border-color: rgba(255, 65, 54, 0.6);
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .settings-sidebar {
    width: 250px;
  }
  
  .mode-selector {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .settings-screen {
    flex-direction: column;
  }
  
  .settings-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
  }
  
  .settings-content {
    padding: 1.5rem;
  }
  
  .app-header {
    padding: 1rem 1.5rem;
  }
  
  .app-title {
    font-size: 1.3rem;
  }
  
  .app-logo {
    font-size: 1.5rem;
  }
  
  .start-btn {
    padding: 1.2rem 2.5rem;
    font-size: 1.3rem;
  }
  
  .mode-selector {
    grid-template-columns: 1fr;
  }
  
  .results-card {
    padding: 2rem 1.5rem;
  }
  
  .results-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .session-item {
    flex-wrap: wrap;
  }
}

/* Scrollbar styles */
.settings-content::-webkit-scrollbar,
.modal-body::-webkit-scrollbar {
  width: 10px;
}

.settings-content::-webkit-scrollbar-track,
.modal-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.settings-content::-webkit-scrollbar-thumb,
.modal-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.settings-content::-webkit-scrollbar-thumb:hover,
.modal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
