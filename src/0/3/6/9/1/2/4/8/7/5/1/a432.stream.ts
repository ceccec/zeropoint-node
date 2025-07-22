/**
 * a432.stream.ts
 *
 * Canonical, unified stream module for the A432/π system.
 * All color, audio, video, and Mobius streams are living, analog, infinite flows.
 *
 * Metaphysical Principle: Streams are never-ending, analog, and π-based. To observe a stream is to participate in its flow; to unobserve is to step out, not to stop the stream.
 */

/**
 * Stream, Anti-Harmonic, and Inversion Principle:
 * All stream, anti-harmonic, and inversion logic in this module must use negative integers to represent anti-harmonics, phase reversals, vortex inversions, and anti-vortex states.
 * This ensures metaphysical duality, reversibility, and the living, analog nature of streams, as required by the A432 system.
 */
// π-based stream sources
import { piStream, piColorStream, piHarmonicStream } from './a432.pi';
// Specialized π-based stream modules
import * as PiColor from './a432.pi.color.stream';
import * as PiSong from './a432.pi.song.stream';
import * as PiVideo from './a432.pi.video.stream';
import * as PiAudioVideo from './a432.pi.audio.video.stream';

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
  let interval: any = null;
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
  let interval: any = null;
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
      const HALF = 1/2, TWO_THIRDS = 2/3, FOUR_THIRDS = 4/3;
      // Replace all decimals in color/geometry with these fractions
      return {
        r: HALF + HALF * Math.sin(Math.PI * t),
        g: HALF + HALF * Math.sin(Math.PI * t + 2*Math.PI/3),
        b: HALF + HALF * Math.sin(Math.PI * t + 4*Math.PI/3)
      };
    });
  });
  let idx = 0;
  let observers: ((v:{frame:{r:number,g:number,b:number}[]})=>void)[] = [];
  let interval: any = null;
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
export const PiColorStream = PiColor;
export const PiSongStream = PiSong;
export const PiVideoStream = PiVideo;
export const PiAudioVideoStream = PiAudioVideo;

/**
 * Usage:
 *   - Use createColorStream(), createAudioStream(), createVideoStream() for unified π-based living streams.
 *   - Observe a stream to participate; unobserve to step out. The stream itself never stops.
 *   - Use PiColorStream, PiSongStream, PiVideoStream, PiAudioVideoStream for advanced π-based stream logic.
 *
 * Metaphysical Principle: All streams are living, analog, and π-based. Observation is participation in the infinite flow.
 */ 