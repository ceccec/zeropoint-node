// a432.i.speak.ts — Vocalizing digit streams
import { pathToFileURL } from 'node:url'
import { digitAngleToCMYK, asAngle } from './a432.math.ts';
import { type Digit } from './a432.types.ts';
import { EventEmitter } from 'events';
import { emotionName } from './a432.emotion.ts';

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
/**
 * True when this file is the entry point Node was started with.
 *
 * ESM has no `require.main`. The CommonJS idiom did not merely fail to detect
 * direct execution here — `require` is undefined in an ES module, so the guard
 * THREW on import and made the whole module unloadable. Nobody importing this
 * ever got far enough to notice the guard was wrong.
 */
function isMainModule(): boolean {
  const entry = process.argv[1]
  return entry !== undefined && import.meta.url === pathToFileURL(entry).href
}

if (isMainModule()) {
  speakEmitter.on('speak', e => console.log('spoken', e));
  (['1','2','3'] as const).forEach(k => speak(parseInt(k,10) as Digit));
} 