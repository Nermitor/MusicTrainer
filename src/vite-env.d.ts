/// <reference types="vite/client" />

// WebMIDI API типы
// MIDIAccess и MIDIInput должны быть доступны из lib.dom.d.ts через tsconfig.app.json
// Если они отсутствуют, TypeScript будет использовать глобальные типы браузера
// MIDIMessageEvent расширяем для совместимости
declare global {
  interface MIDIMessageEvent extends Event {
    data: Uint8Array;
  }
}
