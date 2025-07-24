// a432.i.move.ts — Motion vector to digit stream
// ------------------------------------------------------
import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math';
import { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

export interface MoveEvent { ax: number; ay: number; az: number; digit: Digit; cmyk: CMYK }

export const moveEmitter = new EventEmitter();

export function move(ax: number, ay: number, az: number): void {
  const mag = Math.round(Math.sqrt(ax*ax + ay*ay + az*az)*1000);
  const d = (digitalRoot(mag) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d*60));
  moveEmitter.emit('move', { ax, ay, az, digit: d, cmyk } as MoveEvent);
  if (typeof console !== 'undefined') console.log('[move]', ax, ay, az, '->', d, cmyk);
}

if (require.main === module) {
  moveEmitter.on('move', e => console.log('motion', e));
  move(0.01,0.02,0.98);
} 