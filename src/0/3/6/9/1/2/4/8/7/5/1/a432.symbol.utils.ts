// a432.symbol.utils.ts — helper to compute seed digit and CMYK
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math.ts';
import { type Digit } from './a432.types.ts';
import { type CMYK } from './a432.cmyk.ts';

export function seedDigit(name:string): Digit {
  const sum=[...name].reduce((a,c)=>a+c.charCodeAt(0),0);
  const d= digitalRoot(sum) as Digit;
  return d===0? (9 as Digit): d;
}

export function seedColor(d:Digit): CMYK {
  return digitAngleToCMYK(d, asAngle(d*60));
} 