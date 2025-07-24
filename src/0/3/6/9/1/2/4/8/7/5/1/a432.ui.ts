// a432.ui.ts — Umbrella UI controller for the living matrix
// ---------------------------------------------------------
// Listens to breathing and self-evolution streams, fuses them into final
// CMYK pulses, and paints them onto the document background.
// Only runs in browser (guards against Node).

import { matrixEmitter, startSelfEvolution } from './a432.self';
import { breathEmitter, startBreathing } from './a432.breathe';
import { challengeCMYK } from './a432.challenge';
import { digitAngleToCMYK, asAngle } from './a432.math';
import type { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';
import { playDigit } from './a432.sound';
import { flashColor } from './a432.video';
import './a432.bus.auto';
import './a432.guidance';
import './a432.formulas';
import './a432.modules.ui';
import './a432.uro.ui';
import './a432.heptagram.ui';
import './a432.solids.ui';
import './a432.voice.ui';
import { cmykToCss } from './a432.cmyk';

let breathDigit: Digit = 4 as Digit;
let matrixDigit: Digit = 1 as Digit;
let userDigit: Digit = 0 as Digit;

function xorDigit(a: Digit, b: Digit, c: Digit): Digit {
  const x = (a ^ b ^ c) % 9;
  return (x === 0 ? 9 : x) as Digit;
}

function paint(cmyk: CMYK) {
  if (typeof document === 'undefined') return;
  document.body.style.backgroundColor = cmykToCss(cmyk);
}

export function startA432UI() {
  // Start streams
  startSelfEvolution();
  startBreathing();

  // Breath update
  breathEmitter.on('breath', ev => {
    breathDigit = ev.value;
    update();
  });

  // Matrix update
  matrixEmitter.on('event', ev => {
    matrixDigit = ev.digit;
    update();
  });

  // User input (numeric keys 1-9)
  if (typeof document !== 'undefined') {
    window.addEventListener('keydown', e => {
      const d = parseInt(e.key, 10);
      if (d >= 1 && d <= 9) { userDigit = d as Digit; update(); }
    });
  }
}

function update() {
  const d = xorDigit(breathDigit, matrixDigit, userDigit);
  const cmyk = digitAngleToCMYK(d, asAngle(d * 40)); // 40° offset for UI
  paint(cmyk);
  playDigit(d).catch(()=>{});
  flashColor(cmyk);
}

// Auto-start when loaded in browser
if (typeof window !== 'undefined') {
  startA432UI();
} 