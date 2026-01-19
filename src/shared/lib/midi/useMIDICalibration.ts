import { ref } from 'vue';
import { safeNavigator, safeSetTimeout } from '../ssr-utils';

export function useMIDICalibration() {
  const calibrationMode = ref(false);
  const calibrationMessage = ref('');
  const calibrationOffset = ref(0);

  /**
   * Начать процесс калибровки MIDI клавиатуры
   * @param onComplete - callback функция, вызываемая при успешной калибровке
   */
  function startCalibration(onComplete?: (offset: number) => void): void {
    calibrationMode.value = true;
    calibrationMessage.value = 'Нажмите на вашей MIDI-клавиатуре ноту "До" (C) младшей октавы...';
    
    const navigatorResult = safeNavigator((navigator) => {
      if (navigator.requestMIDIAccess) {
        return navigator.requestMIDIAccess();
      }
      return null;
    });
    
    if (navigatorResult) {
      navigatorResult
        .then((midiAccess: MIDIAccess) => {
          try {
            const inputs = midiAccess.inputs.values();
            let inputCount = 0;
            for (const input of inputs) {
              input.onmidimessage = (event: MIDIMessageEvent) => 
                handleCalibrationMIDI(event, onComplete);
              inputCount++;
            }
            
            if (inputCount === 0) {
              calibrationMessage.value = 'MIDI устройство найдено, но входы отсутствуют';
              calibrationMode.value = false;
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (process.env.NODE_ENV !== 'production') {
              console.error('Error setting up MIDI calibration:', error);
            }
            calibrationMessage.value = `Ошибка настройки MIDI: ${errorMessage}`;
            calibrationMode.value = false;
          }
        })
        .catch((error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          if (process.env.NODE_ENV !== 'production') {
            console.error('MIDI access denied:', error);
          }
          calibrationMessage.value = `Ошибка доступа к MIDI устройству${errorMessage !== 'Unknown error' ? `: ${errorMessage}` : ''}`;
          calibrationMode.value = false;
        });
    } else {
      calibrationMessage.value = 'MIDI не поддерживается вашим браузером';
      calibrationMode.value = false;
    }
  }

  /**
   * Обработчик MIDI сообщения во время калибровки
   * @param event - MIDI событие
   * @param onComplete - callback функция, вызываемая при успешной калибровке
   */
  function handleCalibrationMIDI(event: MIDIMessageEvent, onComplete?: (offset: number) => void): void {
    if (!event.data || calibrationMode.value === false) return;
    
    try {
      const [status, noteNum] = event.data;
      
      // Проверяем валидность данных
      if (typeof status !== 'number' || typeof noteNum !== 'number') {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Invalid MIDI message data during calibration');
        }
        return;
      }
      
      // Note On message (status 144 = 0x90)
      if (status === 144 && noteNum > 0 && noteNum < 128) {
        const expectedC4 = 60; // MIDI number for C4 (middle C)
        const offset = expectedC4 - noteNum;
        calibrationOffset.value = offset;
        
        calibrationMode.value = false;
        calibrationMessage.value = `Калибровка завершена! Смещение: ${offset > 0 ? '+' : ''}${offset}`;
        
        // Отключаем обработчик MIDI
        const navigatorResult = safeNavigator((navigator) => {
          if (navigator.requestMIDIAccess) {
            return navigator.requestMIDIAccess();
          }
          return null;
        });
        
        if (navigatorResult) {
          navigatorResult
            .then((midiAccess: MIDIAccess) => {
              try {
                const inputs = midiAccess.inputs.values();
                for (const input of inputs) {
                  input.onmidimessage = null;
                }
              } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                  console.error('Error cleaning up MIDI handlers:', error);
                }
              }
            })
            .catch((error: unknown) => {
              if (process.env.NODE_ENV !== 'production') {
                console.error('Error accessing MIDI for cleanup:', error);
              }
            });
        }
        
        // Вызываем callback
        if (onComplete) {
          try {
            onComplete(offset);
          } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
              console.error('Error in calibration callback:', error);
            }
          }
        }
        
        // Очищаем сообщение через 3 секунды
        safeSetTimeout(() => {
          calibrationMessage.value = '';
        }, 3000);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error processing calibration MIDI message:', error);
      }
      // Не прерываем калибровку при ошибке обработки одного сообщения
    }
  }

  /**
   * Остановить процесс калибровки и очистить обработчики
   */
  function stopCalibration(): void {
    calibrationMode.value = false;
    calibrationMessage.value = '';
    
    const navigatorResult = safeNavigator((navigator) => {
      if (navigator.requestMIDIAccess) {
        return navigator.requestMIDIAccess();
      }
      return null;
    });
    
    if (navigatorResult) {
      navigatorResult
        .then((midiAccess: MIDIAccess) => {
          try {
            const inputs = midiAccess.inputs.values();
            for (const input of inputs) {
              input.onmidimessage = null;
            }
          } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
              console.error('Error cleaning up MIDI handlers on stop:', error);
            }
          }
        })
        .catch((error: unknown) => {
          if (process.env.NODE_ENV !== 'production') {
            console.error('Error accessing MIDI for cleanup on stop:', error);
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
