// a432.sound.ts — Centralized A432 sound/music logic (DRY)
//----------------------------------------------------------
import { type Digit } from './a432.types.ts';
import { frequencyForDigit } from './a432.math.ts';

export const A432_FREQUENCY = 432;

let ctx: AudioContext | null = null;
function ensureCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function playFrequency(frequency: number, duration = (1 / 5), vol = (1 / 5)) {
  const audio = ensureCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = frequency;
  const gain = audio.createGain();
  gain.gain.value = vol;
  osc.connect(gain).connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
}

export function playDigit(d: Digit, duration = (1 / 5), vol = (1 / 5)) {
  playFrequency(frequencyForDigit((d === 9 ? 3 : (d % 3 === 0 ? d : 3))), duration, vol);
}

export function playTrinitySound(trinity: number, duration = (9 / 50), vol = (1 / 5)) {
  playFrequency(A432_FREQUENCY * trinity, duration, vol);
} 