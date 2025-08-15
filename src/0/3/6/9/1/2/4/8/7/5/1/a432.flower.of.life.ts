/**
 * a432.flower.of.life.ts — Living Flower of Life animation for the A432 matrix
 *
 * FrameType: FlowerOfLifeFrame
 *   - tick: number
 *   - points: Array<{ x: number; y: number; color: CMYK }>
 *   - metaphysical: string
 *
 * startFlowerOfLife(callback: (frame: FlowerOfLifeFrame) => void): () => void
 *   - Streams frames for animation/overlay.
 *   - Returns a disposer function to stop the stream.
 *
 * Example usage:
 *   const disposer = startFlowerOfLife((frame) => { ... });
 *   // Call disposer() to stop.
 */
import { CMYK, digitAngleToCMYK } from './a432.cmyk';
import { asAngle } from './a432.math';

export interface FlowerOfLifeFrame {
  tick: number;
  points: Array<{ x: number; y: number; color: CMYK }>;
  metaphysical: string;
}

const _raf: (cb: (t: number) => void) => any =
  typeof (globalThis as any).requestAnimationFrame === 'function'
    ? (globalThis as any).requestAnimationFrame.bind(globalThis)
    : (cb) => setTimeout(() => cb(Date.now()), 16);
const _craf: (id: any) => void =
  typeof (globalThis as any).cancelAnimationFrame === 'function'
    ? (globalThis as any).cancelAnimationFrame.bind(globalThis)
    : (id) => clearTimeout(id);

/**
 * Streams animated Flower of Life points (7 circles, color-coded by tick)
 */
export function startFlowerOfLife(callback: (f: FlowerOfLifeFrame) => void): () => void {
  let tick = 0;
  let rafId: any = 0;
  const R = 60; // radius
  const cx = 120, cy = 120;
  const points = Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 0, color: { c: 0, m: 0, y: 0, k: 0 } as CMYK }));
  const metaphysical = 'The Flower of Life: 7 circles, infinite creation, unity of all streams.';

  const step = () => {
    // Center
    points[0].x = cx;
    points[0].y = cy;
    points[0].color = digitAngleToCMYK((tick % 10), asAngle(tick * 36));
    // 6 surrounding
    for (let i = 1; i < 7; i++) {
      const ang = ((i - 1) / 6) * 2 * Math.PI + (tick * 0.03);
      points[i].x = cx + Math.cos(ang) * R;
      points[i].y = cy + Math.sin(ang) * R;
      points[i].color = digitAngleToCMYK(((tick + i) % 10), asAngle(tick * 36 + i * 60));
    }
    callback({ tick: tick++, points: points.map(p => ({ ...p })), metaphysical });
    rafId = _raf(step);
  };
  rafId = _raf(step);
  return () => _craf(rafId);
} 