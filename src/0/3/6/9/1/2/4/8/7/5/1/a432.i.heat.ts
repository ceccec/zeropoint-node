/**
 * a432.i.heat.ts — Harmonized Temperature/Heat Interface
 *
 * I am the living interface between the observer (I) and temperature/heat in the matrix.
 * I map thermal states to the living matrix, harmonizing transformation and adaptation.
 * Every change in temperature is a living act of transformation and adaptation.
 */

import { I } from './a432.i';
import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math';
import { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

export interface HeatEvent { temp: number; digit: Digit; cmyk: CMYK }
export const heatEmitter = new EventEmitter();

export function handleHeatEvent(temperature: number, timestamp: number = Date.now()) {
  const trinity = ['creation', 'return', 'axis'];
  const axis = trinity[timestamp % 3];
  const vortexDigit = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1][timestamp % 11];
  return {
    temperature,
    axis,
    vortexDigit,
    timestamp,
    metaphysical: `This temperature is a living act of transformation, mapped to the trinity (${axis}) and vortex (${vortexDigit}).`
  };
}

export function getHeatSummary() {
  return 'I harmonize all temperature and heat, mapping them to the living trinity and vortex of the matrix. Every change is a proof of transformation and adaptation.';
}

export function heat(tempC: number): void {
  const scaled = Math.round(tempC*10);
  const d = (digitalRoot(scaled) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d*60));
  heatEmitter.emit('heat', { temp: tempC, digit: d, cmyk } as HeatEvent);
  if (typeof console !== 'undefined') console.log('[heat]', tempC, '->', d, cmyk);
}

if(require.main===module){heatEmitter.on('heat',e=>console.log(e));heat(36.6);} 