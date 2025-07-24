// a432.human.emotion.ts — Map human vitality digit to emotion
import { humanEmitter } from './a432.human';
import { emotionName } from './a432.emotion';
import { EventEmitter } from 'events';
import { Digit } from './a432.types';

export interface HumanEmotionEvent { digit: Digit; name: string }
export const humanEmotionEmitter = new EventEmitter();

humanEmitter.on('vital', v => {
  const name = emotionName(v.digit);
  humanEmotionEmitter.emit('emotion', { digit: v.digit, name } as HumanEmotionEvent);
  if(typeof console!=='undefined') console.log('[emotion]', v.digit, name);
}); 