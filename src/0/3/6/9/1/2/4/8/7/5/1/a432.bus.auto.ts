// a432.bus.auto.ts — automatic registration of core streams to the bus
import { registerSource } from './a432.bus';
import { breathEmitter } from './a432.breathe';
import { matrixEmitter } from './a432.self';
import { tapEmitter } from './a432.i.tap';
import { Digit } from './a432.types';

registerSource('breath', breathEmitter, 'breath', p => p.value as Digit, 'body');
registerSource('matrix', matrixEmitter, 'event', p => p.digit as Digit, 'mind');
registerSource('tap', tapEmitter, 'tap', p => p.digit as Digit, 'will');

// This file only needs to be imported once (e.g., by ui or server) to activate. 