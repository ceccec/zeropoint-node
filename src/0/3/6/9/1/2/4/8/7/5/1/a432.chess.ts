import { toneBoardStream, type ToneSquare } from './a432.matrix.ts';
import { type CMYK } from './a432.cmyk.ts';

// Helper – cross-platform animation frame
import { raf as _raf, craf as _craf } from './a432.raf.ts'

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