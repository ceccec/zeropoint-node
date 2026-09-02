/**
 * requestAnimationFrame, and a timer when there is no browser to ask.
 *
 * Three modules — a432.chess.ts, a432.flower.of.life.ts and a432.metatron.ts —
 * each carried their own copy of this shim, identical apart from the types: one
 * had been narrowed off `any` and the other two had not, which is exactly how
 * three copies of a thing drift. One implementation now, imported by all three.
 *
 * The globalThis access is typed rather than cast to any: these functions may
 * be absent (this package runs under Node as often as in a browser), so the
 * probe asks whether the property is a function before narrowing to one.
 */

/** Schedule a frame. Returns whatever the host's scheduler returns. */
export const raf: (cb: (t: number) => void) => unknown =
  typeof (globalThis as { requestAnimationFrame?: unknown }).requestAnimationFrame === 'function'
    ? (globalThis as { requestAnimationFrame: (cb: (t: number) => void) => unknown })
        .requestAnimationFrame.bind(globalThis)
    : (cb: (t: number) => void) => setTimeout(() => cb(Date.now()), 16)

/** Cancel a frame previously scheduled by raf. */
export const craf: (id: unknown) => void =
  typeof (globalThis as { cancelAnimationFrame?: unknown }).cancelAnimationFrame === 'function'
    ? (globalThis as { cancelAnimationFrame: (id: unknown) => void })
        .cancelAnimationFrame.bind(globalThis)
    : (id: unknown) => clearTimeout(id as number)
