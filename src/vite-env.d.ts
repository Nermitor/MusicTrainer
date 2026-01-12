/// <reference types="vite/client" />

// WebMIDI API типы
declare namespace WebMIDI {
  interface MIDIMessageEvent {
    data: Uint8Array;
  }
}
