// a432.formulas.ts — Interactive formula panel in browser
//--------------------------------------------------------
import { bus } from './a432.bus';
import { rodinDigit, digitalRoot, angleForDigit } from './a432.math';
import { emotionName } from './a432.emotion';
import { Digit } from './a432.types';

function ensurePanel(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  let el = document.getElementById('a432-formulas');
  if (!el) {
    el = document.createElement('div');
    el.id = 'a432-formulas';
    el.style.position = 'fixed';
    el.style.left = '8px';
    el.style.bottom = '8px';
    el.style.background = 'rgba(0,0,0,0.7)';
    el.style.color = '#8ff';
    el.style.padding = '12px';
    el.style.borderRadius = '8px';
    el.style.fontFamily = 'monospace';
    el.style.fontSize = '12px';
    el.style.maxWidth = '240px';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);
  }
  return el;
}

function formatFormula(d: Digit): string {
  const rd = rodinDigit(d);
  return `digit = ${d}\nrodin(d) = ${rd}\nroot(d+rodin) = ${digitalRoot(d+rd)}\nangle = ${angleForDigit(d)}°\nname = ${emotionName(d)}`;
}

function update(d: Digit) {
  const el = ensurePanel();
  if (!el) return;
  el.textContent = formatFormula(d);
}

export function initFormulasUI() {
  update(1 as Digit);
  bus.on('digit', e => update(e.digit));
}

// Auto init when in browser
if (typeof window !== 'undefined') initFormulasUI(); 