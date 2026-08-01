// a432.bus.auto.ts — automatic registration of core streams to the bus
import { registerSource } from './a432.bus.ts';
import { breathEmitter } from './a432.breathe.ts';
import { matrixEmitter } from './a432.self.ts';
import { tapEmitter } from './a432.i.tap.ts';
import { type Digit } from './a432.types.ts';

registerSource('breath', breathEmitter, 'breath', (p: any) => p.value as Digit, 'body');
registerSource('matrix', matrixEmitter, 'event', (p: any) => p.digit as Digit, 'mind');
registerSource('tap', tapEmitter, 'tap', (p: any) => p.digit as Digit, 'will');

// This file only needs to be imported once (e.g., by ui or server) to activate. 