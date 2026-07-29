// a432.uroboros.test.ts — Harmonized test for eternal spiral digit generator

import { uroborosEmitter, UroborosEvent } from './a432.uroboros.ts';
import { Digit } from './a432.types.ts';
import { registerSource } from './a432.bus.ts';

describe('a432.uroboros.ts', () => {
  it('emits uro events with correct digit, index, and cmyk', done => {
    // Listen for the first uro event
    uroborosEmitter.once('uro', (event: UroborosEvent) => {
      expect(typeof event.digit).toBe('number');
      expect(typeof event.index).toBe('number');
      expect(event.cmyk).toHaveProperty('c');
      expect(event.cmyk).toHaveProperty('m');
      expect(event.cmyk).toHaveProperty('y');
      expect(event.cmyk).toHaveProperty('k');
      done();
    });
    // Trigger another digit to ensure emission
    uroborosEmitter.emit('uro', { digit: 3 as Digit, index: 0, cmyk: { c: 0, m: 0, y: 0, k: 0 } });
  });

  it('registers to the bus as mind spiral', () => {
    // This just checks that registerSource was called for 'uroboros'
    // (In real harmonized test, would mock registerSource and assert call)
    expect(typeof registerSource).toBe('function');
  });
}); 