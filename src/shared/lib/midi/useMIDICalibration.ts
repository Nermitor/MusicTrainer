import { ref } from 'vue';

export function useMIDICalibration() {
  const calibrationMode = ref(false);
  const calibrationMessage = ref('');
  const calibrationOffset = ref(0);

  function startCalibration(onComplete?: (offset: number) => void) {
    calibrationMode.value = true;
    calibrationMessage.value = 'Нажмите на вашей MIDI-клавиатуре ноту "До" (C) младшей октавы...';
    
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        const inputs = midiAccess.inputs.values();
        for (const input of inputs) {
          input.onmidimessage = (event: MIDIMessageEvent) => 
            handleCalibrationMIDI(event, onComplete);
        }
      }).catch((error) => {
        console.error('MIDI access denied:', error);
        calibrationMessage.value = 'Ошибка доступа к MIDI устройству';
        calibrationMode.value = false;
      });
    } else {
      calibrationMessage.value = 'MIDI не поддерживается вашим браузером';
      calibrationMode.value = false;
    }
  }

  function handleCalibrationMIDI(event: MIDIMessageEvent, onComplete?: (offset: number) => void) {
    if (!event.data || calibrationMode.value === false) return;
    
    const [status, noteNum] = event.data;
    
    // Note On message
    if (status === 144 && noteNum > 0) {
      const expectedC4 = 60; // MIDI number for C4 (middle C)
      const offset = expectedC4 - noteNum;
      calibrationOffset.value = offset;
      
      calibrationMode.value = false;
      calibrationMessage.value = `Калибровка завершена! Смещение: ${offset > 0 ? '+' : ''}${offset}`;
      
      // Отключаем обработчик MIDI
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then((midiAccess) => {
          const inputs = midiAccess.inputs.values();
          for (const input of inputs) {
            input.onmidimessage = null;
          }
        });
      }
      
      // Вызываем callback
      if (onComplete) {
        onComplete(offset);
      }
      
      // Очищаем сообщение через 3 секунды
      setTimeout(() => {
        calibrationMessage.value = '';
      }, 3000);
    }
  }

  function stopCalibration() {
    calibrationMode.value = false;
    calibrationMessage.value = '';
    
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        const inputs = midiAccess.inputs.values();
        for (const input of inputs) {
          input.onmidimessage = null;
        }
      });
    }
  }

  return {
    calibrationMode,
    calibrationMessage,
    calibrationOffset,
    startCalibration,
    stopCalibration,
  };
}
