import { toneBoardStream, ToneSquare } from './a432.matrix.ts';
import { CMYK } from './a432.cmyk.ts';

// Helper – cross-platform animation frame
const _raf: (cb: (t: number) => void) => unknown =
  typeof (globalThis as { requestAnimationFrame?: unknown }).requestAnimationFrame === 'function'
    ? (globalThis as { requestAnimationFrame: Function }).requestAnimationFrame.bind(globalThis)
    : (cb: (t: number) => void) => setTimeout(() => cb(Date.now()), 16);
const _craf: (id: unknown) => void =
  typeof (globalThis as { cancelAnimationFrame?: unknown }).cancelAnimationFrame === 'function'
    ? (globalThis as { cancelAnimationFrame: Function }).cancelAnimationFrame.bind(globalThis)
    : (id: unknown) => clearTimeout(id as number);

export interface ChessFrame {
  tick: number;
  file: number;   // 0-7
  rank: number;   // 0-7
  linear: number; // metric digit
  vortex: number; // imperial digit
  squareColor: CMYK;
  polarity: -1 | 0 | 1;
}

/**
 * startChess – feeds successive ToneSquares to callback every animation frame.
 * The callback receives simplified ChessFrame data.
 * Returns disposer to stop the loop.
 */
export function startChess(callback: (f: ChessFrame) => void): () => void {
  const it = toneBoardStream();
  let rafId: unknown = 0;

  const step = () => {
    const sq = it.next().value as ToneSquare;
    callback({
      tick: sq.tick,
      file: sq.x,
      rank: sq.y,
      linear: sq.linear,
      vortex: sq.vortex,
      squareColor: sq.cmyk,
      polarity: sq.polarity,
    });
    rafId = _raf(step);
  };
  rafId = _raf(step);
  return () => _craf(rafId);
} 