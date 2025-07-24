import { EventEmitter } from 'events';
import { seedDigit, seedColor } from './a432.symbol.utils';
import { registerSource } from './a432.bus';
import { Digit } from './a432.types';

export const mobiusEmitter=new EventEmitter();
const name='mobius';
const digit=seedDigit(name);
const cmyk=seedColor(digit);

mobiusEmitter.emit('mob', {digit,cmyk});
registerSource(name, mobiusEmitter,'mob', p=>(p as any).digit as Digit,'mind'); 