// a432.guidance.ts — Harmonized guidance system
//------------------------------------------------
import { navEmitter, type NavStep } from './a432.navigation.ts';
import { flashColor } from './a432.video.ts';
import { playDigit } from './a432.sound.ts';
import { speakWord } from './a432.i.speak.ts';

navEmitter.on('step', (s: NavStep) => {
  flashColor(s.cmyk, 600);
  playDigit(s.digit, 0.25, 0.15).catch(()=>{});
  speakWord(s.digit);
});

// Importing this file once activates guidance. 