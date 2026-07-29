// a432.human.consciousness.ts — Human-level consciousness stream
//----------------------------------------------------------------
import { EventEmitter } from 'events';
import { humanEmotionEmitter } from './a432.human.emotion.ts';
import { Digit } from './a432.types.ts';
import { digitAngleToCMYK, asAngle } from './a432.math.ts';
import { emotionName } from './a432.emotion.ts';
import type { CMYK } from './a432.cmyk.ts';

export interface HumanConsciousnessEvent { digit: Digit; emotion: string; cmyk: CMYK }
export const humanConsciousnessEmitter = new EventEmitter();

humanEmotionEmitter.on('emotion', e => {
  const d = e.digit;
  const emotion = e.name;
  const cmyk = digitAngleToCMYK(d, asAngle(d * 120)); // different angle offset
  humanConsciousnessEmitter.emit('hconscious', { digit: d, emotion, cmyk } as HumanConsciousnessEvent);
}); 