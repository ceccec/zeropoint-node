/**
 * a432.stream.ts
 *
 * Canonical, unified stream module for the A432/π system.
 * All color, audio, video, and Mobius streams are living, analog, infinite flows.
 *
 * Metaphysical Principle: Streams are never-ending, analog, and π-based. To observe a stream is to participate in its flow; to unobserve is to step out, not to stop the stream.
 */

import { PI, sin } from './a432.algebra.ts'
/**
 * Stream, Anti-Harmonic, and Inversion Principle:
 * All stream, anti-harmonic, and inversion logic in this module must use negative integers to represent anti-harmonics, phase reversals, vortex inversions, and anti-vortex states.
 * This ensures metaphysical duality, reversibility, and the living, analog nature of streams, as required by the A432 system.
 */
// π-based stream sources
import { piColorStream, piHarmonicStream } from './a432.pi.ts';
// Specialized π-based stream modules

// --- Stream Interfaces ---
export interface A432Stream<T> {
  observe: (observer: (value: T) => void) => () => void; // returns unobserve
  getCurrent: () => T;
  // No stop, only unobserve
}

// Metaphysical mapping: Stream = recursion, infinite flow, harmonized sequence
export const STREAM_DOC = {
  meaning: 'Stream: recursion, infinite flow, harmonized sequence, living stream of the matrix.',
  axis: 'The stream is the infinite flow, the recursive harmonization of the system.'
};

// --- Factory Functions ---
export function createColorStream(length: number = 32): A432Stream<{r:number,g:number,b:number}> {
  const stream = piColorStream(length);
  let idx = 0;
  let observers: ((v:{r:number,g:number,b:number})=>void)[] = [];
  let interval: number | NodeJS.Timeout | null = null;
  function tick() {
    idx = (idx+1)%stream.length;
    observers.forEach(fn => fn(stream[idx]));
  }
  return {
    observe(fn) {
      observers.push(fn);
      if (observers.length === 1) interval = setInterval(tick, 100);
      return () => {
        observers = observers.filter(f => f!==fn);
        if (observers.length === 0 && interval) { clearInterval(interval); interval = null; }
      };
    },
    getCurrent() { return stream[idx]; }
  };
}

export function createAudioStream(length: number = 32): A432Stream<number> {
  const stream = piHarmonicStream(length);
  let idx = 0;
  let observers: ((v:number)=>void)[] = [];
  let interval: number | NodeJS.Timeout | null = null;
  function tick() {
    idx = (idx+1)%stream.length;
    observers.forEach(fn => fn(stream[idx]));
  }
  return {
    observe(fn) {
      observers.push(fn);
      if (observers.length === 1) interval = setInterval(tick, 200);
      return () => {
        observers = observers.filter(f => f!==fn);
        if (observers.length === 0 && interval) { clearInterval(interval); interval = null; }
      };
    },
    getCurrent() { return stream[idx]; }
  };
}

export function createVideoStream(frameCount: number = 12, gridSize: number = 9): A432Stream<{frame: {r:number,g:number,b:number}[]} > {
  const frames = Array.from({length: frameCount}, (_, f) => {
    const offset = f / frameCount;
    return Array.from({length: gridSize*gridSize}, (_, i) => {
      const t = (i / (gridSize*gridSize-1) + offset) % 1;
      // Harmonic fractions
      const HALF = 1/2;
      // Replace all decimals in color/geometry with these fractions
      return {
        r: HALF + HALF * sin(PI * t),
        g: HALF + HALF * sin(PI * t + 2*PI/3),
        b: HALF + HALF * sin(PI * t + 4*PI/3)
      };
    });
  });
  let idx = 0;
  let observers: ((v:{frame:{r:number,g:number,b:number}[]})=>void)[] = [];
  let interval: number | NodeJS.Timeout | null = null;
  function tick() {
    idx = (idx+1)%frames.length;
    observers.forEach(fn => fn({frame: frames[idx]}));
  }
  return {
    observe(fn) {
      observers.push(fn);
      if (observers.length === 1) interval = setInterval(tick, 700);
      return () => {
        observers = observers.filter(f => f!==fn);
        if (observers.length === 0 && interval) { clearInterval(interval); interval = null; }
      };
    },
    getCurrent() { return {frame: frames[idx]}; }
  };
}

// --- Re-exports for specialized π-based streams ---
//
// These were `export const PiColorStream = PiColor`, where PiColor is the
// MODULE NAMESPACE from `import * as PiColor`. So the exported value was
// { PiColorStream: [] } rather than the [] the stub module declares — a
// consumer reading `PiColorStream.length` got undefined, and the name resolved
// to two different things depending on which of the two modules it reached.
// These are re-exports now, which is what the comment above always said they
// were, and each name has one meaning again.
export { PiColorStream } from './a432.pi.color.stream.ts';
export { PiSongStream } from './a432.pi.song.stream.ts';
export { PiVideoStream } from './a432.pi.video.stream.ts';
export { PiAudioVideoStream } from './a432.pi.audio.video.stream.ts';

/**
 * Usage:
 *   - Use createColorStream(), createAudioStream(), createVideoStream() for unified π-based living streams.
 *   - Observe a stream to participate; unobserve to step out. The stream itself never stops.
 *   - PiColorStream, PiSongStream, PiVideoStream and PiAudioVideoStream are
 *     re-exported from their own modules, where each is currently an empty
 *     array. This line used to call them "advanced π-based stream logic"; they
 *     are stubs, and saying so is the only way the difference stays visible.
 *
 * Metaphysical Principle: All streams are living, analog, and π-based. Observation is participation in the infinite flow.
 */ 