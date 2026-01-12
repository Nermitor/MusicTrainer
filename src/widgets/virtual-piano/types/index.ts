export namespace VirtualPianoTypes {
  export interface PianoKey {
    midi: number;
    note: string;
    octave: number;
    isBlack: boolean;
    keyboardKey?: string;
  }
}
