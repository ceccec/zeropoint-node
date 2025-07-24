import { a432SequenceStream } from './a432.math';
import { digitAngleToCMYK, type CMYK } from './a432.cmyk';
import { asAngle } from './a432.math';
import { Digit, AngleDeg } from './a432.types';

// ——————————————————————————————————————————
// Cross-platform animation frame helpers
// ---------------------------------------------------------
const _raf: (cb: (t: number) => void) => any =
  typeof (globalThis as any).requestAnimationFrame === 'function'
    ? (globalThis as any).requestAnimationFrame.bind(globalThis)
    : (cb) => setTimeout(() => cb(Date.now()), 16);
const _craf: (id: any) => void =
  typeof (globalThis as any).cancelAnimationFrame === 'function'
    ? (globalThis as any).cancelAnimationFrame.bind(globalThis)
    : (id) => clearTimeout(id);

// ——————————————————————————————————————————
// Metatron frame definition
// ---------------------------------------------------------
export interface MetatronNode {
  index: number;       // 0-11 (12 nodes of cube/star)
  digit: Digit;        // source digit
  angle: AngleDeg;     // rotation for visualisation
  color: CMYK;         // node colour
}

export interface MetatronFrame {
  tick: number;
  nodes: MetatronNode[]; // always length 12
}

/**
 * startMetatron — consumes digits from a432SequenceStream and maps each
 * digit to one of the 12 Metatron-cube nodes, cycling through them.
 * Calls callback every animation frame with full node array.
 * Returns disposer to stop loop.
 */
export function startMetatron(callback: (f: MetatronFrame) => void): () => void {
  const seq = a432SequenceStream();
  let tick = 0;
  let rafId: any = 0;
  const nodes: MetatronNode[] = Array.from({ length: 12 }, (_, i) => ({
    index: i,
    digit: 0 as Digit,
    angle: asAngle(0),
    color: { c: 0, m: 0, y: 0, k: 100 },
  }));

  const step = () => {
    // update one node per tick
    const n = nodes[tick % 12];
    const d = seq.next().value as Digit;
    const ang = asAngle((d * 30) % 360); // 12 nodes ⇒ 30° spacing
    n.digit = d;
    n.angle = ang;
    n.color = digitAngleToCMYK(d, ang);

    callback({ tick: tick++, nodes: [...nodes] });
    rafId = _raf(step);
  };
  rafId = _raf(step);
  return () => _craf(rafId);
} 