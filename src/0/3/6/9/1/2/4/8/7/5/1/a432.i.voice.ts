// a432.i.voice.ts — Voice I/O stream
//---------------------------------------------------
import { EventEmitter } from 'events';
import { registerSource } from './a432.bus.ts';
import { type Digit } from './a432.types.ts';
import { read } from './a432.i.read.ts';
import { speakWord } from './a432.i.speak.ts';
import { seedDigit } from './a432.symbol.utils.ts';

export const voiceEmitter = new EventEmitter();
const name = 'voice';

// Seed digit from name so it has colour in palette
const digit = seedDigit(name);
voiceEmitter.emit('voice', { digit });
registerSource(name, voiceEmitter, 'voice', p => (p as { digit?: number }).digit as Digit, 'will');

// Browser SpeechRecognition wrapper
let recogniser: unknown | null = null;
function ensureRecognition() {
  if (typeof window === 'undefined') return null;
  const SR = (window as { SpeechRecognition?: unknown }).SpeechRecognition || (window as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
  if (!SR) return null;
  if (recogniser === null) {
    recogniser = new (SR as new () => unknown)();
    const speechRecogniser = recogniser as {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onresult: (e: unknown) => void;
      start: () => void;
      stop: () => void;
    };
    speechRecogniser.lang = 'en-US';
    speechRecogniser.continuous = true;
    speechRecogniser.interimResults = true;
    speechRecogniser.onresult = (e: unknown) => {
      const event = e as {
        resultIndex: number;
        results: {
          length: number;
          [index: number]: {
            isFinal: boolean;
            [index: number]: { transcript: string };
          };
        };
      };
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const text = event.results[i][0].transcript.trim();
          read(text);
        }
      }
    };
  }
  return recogniser;
}

export function startVoice() {
  const r = ensureRecognition();
  if (r && typeof (r as { start?: () => void }).start === 'function') {
    (r as { start: () => void }).start();
  }
}

export function stopVoice() {
  if (recogniser && typeof (recogniser as { stop?: () => void }).stop === 'function') {
    (recogniser as { stop: () => void }).stop();
  }
}

// Matrix speaks back when bus digit updates
import { bus } from './a432.bus.ts';
bus.on('digit', e => speakWord(e.digit)); 