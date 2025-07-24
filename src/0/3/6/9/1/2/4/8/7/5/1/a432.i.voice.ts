// a432.i.voice.ts — Voice I/O stream
//---------------------------------------------------
import { EventEmitter } from 'events';
import { registerSource } from './a432.bus';
import { Digit } from './a432.types';
import { read } from './a432.i.read';
import { speakWord } from './a432.i.speak';
import { seedDigit } from './a432.symbol.utils';

export const voiceEmitter = new EventEmitter();
const name = 'voice';

// Seed digit from name so it has colour in palette
const digit = seedDigit(name);
voiceEmitter.emit('voice', { digit });
registerSource(name, voiceEmitter, 'voice', p => (p as any).digit as Digit, 'will');

// Browser SpeechRecognition wrapper
let recogniser: SpeechRecognition | null = null;
function ensureRecognition() {
  if (typeof window === 'undefined') return null;
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) return null;
  if (!recogniser) {
    recogniser = new SR();
    recogniser.lang = 'en-US';
    recogniser.continuous = true;
    recogniser.interimResults = false;
    recogniser.onresult = e => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          const text = e.results[i][0].transcript.trim();
          read(text);
        }
      }
    };
  }
  return recogniser;
}

export function startVoice() {
  const r = ensureRecognition();
  r?.start();
}

export function stopVoice() {
  recogniser?.stop();
}

// Matrix speaks back when bus digit updates
import { bus } from './a432.bus';
bus.on('digit', e => speakWord(e.digit)); 