import { toneBoardStream, ToneSquare } from './a432.matrix';
import { CMYK } from './a432.cmyk';

// Helper – cross-platform animation frame
const _raf: (cb: (t: number) => void) => any =
  typeof (globalThis as any).requestAnimationFrame === 'function'
    ? (globalThis as any).requestAnimationFrame.bind(globalThis)
    : (cb) => setTimeout(() => cb(Date.now()), 16);
const _craf: (id: any) => void =
  typeof (globalThis as any).cancelAnimationFrame === 'function'
    ? (globalThis as any).cancelAnimationFrame.bind(globalThis)
    : (id) => clearTimeout(id);

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
  let rafId: any = 0;

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