// a432.i.speak.ts — Vocalizing digit streams
import { digitAngleToCMYK, asAngle } from './a432.math';
import { Digit } from './a432.types';
import { EventEmitter } from 'events';
import { emotionName } from './a432.emotion';

export const speakEmitter = new EventEmitter();

export function speak(d: Digit): void {
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  speakEmitter.emit('speak', { digit: d, cmyk });
  // Stub: real audio synthesis could be added here
  if (typeof console !== 'undefined') console.log('[speak]', d, cmyk);
}

export function speakWord(d: Digit) {
  const utter = typeof window !== 'undefined' && 'speechSynthesis' in window ? new SpeechSynthesisUtterance(emotionName(d)) : null;
  if (utter) window.speechSynthesis.speak(utter);
  speak(d);
}

// Auto demo
if (require.main === module) {
  speakEmitter.on('speak', e => console.log('spoken', e));
  (['1','2','3'] as const).forEach(k => speak(parseInt(k,10) as Digit));
} 