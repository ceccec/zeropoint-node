// a432.sound.ts — Play digits as A432-based tones using Web Audio
//-----------------------------------------------------------------
import { Digit } from './a432.types';
import { frequencyForDigit } from './a432.math';

let ctx: AudioContext | null = null;
function ensureCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export async function playDigit(d: Digit, duration = 0.2, vol = 0.2) {
  const audio = ensureCtx();
  if (!audio) return;
  const freq = frequencyForDigit((d === 9 ? 3 : (d % 3 === 0 ? d : 3)));
  const osc = audio.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const gain = audio.createGain();
  gain.gain.value = vol;
  osc.connect(gain).connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
} 