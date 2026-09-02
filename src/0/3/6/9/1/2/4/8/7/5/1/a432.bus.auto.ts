// a432.bus.auto.ts — automatic registration of core streams to the bus
import { registerSource } from './a432.bus.ts';
import { breathEmitter } from './a432.breathe.ts';
import { matrixEmitter } from './a432.self.ts';
import { tapEmitter } from './a432.i.tap.ts';
import { type Digit } from './a432.types.ts';

// registerSource already declares its picker as (payload: unknown) => Digit;
// `any` was ignoring a type that was already correct.
registerSource('breath', breathEmitter, 'breath', (p) => (p as { value: Digit }).value, 'body');
registerSource('matrix', matrixEmitter, 'event', (p) => (p as { digit: Digit }).digit, 'mind');
registerSource('tap', tapEmitter, 'tap', (p) => (p as { digit: Digit }).digit, 'will');

// This file only needs to be imported once (e.g., by ui or server) to activate. 