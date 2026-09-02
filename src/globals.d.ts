/**
 * The properties this package attaches to `window`, declared where they can be
 * checked.
 *
 * Six of the 96 typecheck errors were `Property 'x' does not exist on type
 * 'Window'` — the browser entry points assign to `window` so a page can reach
 * them, and nothing said they were allowed to. Typing each as `typeof` the
 * value actually assigned keeps the check real: renaming or retyping the
 * export moves this declaration with it, and `any` here would have traded a
 * typecheck error for a lint one.
 */
import type { Application } from '@hotwired/stimulus'

declare global {
  /**
   * Two browser APIs TypeScript's lib does not carry. They were declared inside
   * a432.os.ts, where an ambient block is easy to miss and easy to duplicate —
   * a432.living.os.ts went on casting `performance as any` for the same fields
   * three lines at a time, because nothing pointed it at the declaration.
   */
  interface Navigator {
    connection?: { effectiveType?: string }
  }
  interface Performance {
    memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number }
  }

  interface Window {
    Stimulus: Application
    a432LivingMatrix: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.1.2.4.8.7.5.1.ts').a432LivingMatrix
    a432LivingMatrixStreams: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.1.2.4.8.7.5.1.ts').a432LivingMatrixStreams
    a432OpenDoublingVortex: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.1.ts').a432OpenDoublingVortex
    /**
     * TWO modules export `a432System`, of two different A432System classes —
     * a432.system.ts and a432.index.ts — and both assign this global. Whichever
     * loads second wins, and a consumer reading window.a432System gets that one.
     * The union is what is actually there; five `as any` casts had been hiding
     * the collision rather than resolving it.
     */
    a432System:
      | typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.system.ts').a432System
      | typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.index.ts').a432System
    A432: Record<string, unknown>

    /**
     * The rest of what this package attaches to the page. Each was written as
     * `(window as any).X = X`, which typechecks because a cast asks no
     * questions — and asking is the point: declaring `a432System` this way is
     * what revealed that two modules were writing it.
     *
     * The lower-case name is the instance the module exports; the upper-case
     * one is a hand-built namespace object, so it is only Record<string,
     * unknown> — nothing here knows what belongs in it.
     */
    cmykMultimedia: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.cmyk.multimedia.ts').cmykMultimedia
    CMYKMultimedia: Record<string, unknown>
    a432ElectricFlow: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.electric.flow.ts').a432ElectricFlow
    A432ElectricFlow: Record<string, unknown>
    A432I: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.i.ts').a432I
    a432Kabbalistic: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.kabbalah.ts').a432Kabbalistic
    A432Kabbalah: Record<string, unknown>
    A432MathConstants: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.math.constants.ts').MATH_CONSTANTS
    A432MobiusCircuit: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.mobius.circuit.ts').a432MobiusCircuit
    a432SacredGeometry: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.sacred.geometry.ts').a432SacredGeometry
    A432SacredGeometry: Record<string, unknown>
    a432SimpleSystem: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.simple.ts').a432SimpleSystem
    A432Simple: Record<string, unknown>
    A432WaveEnergy: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.wave.energy.ts').a432WaveEnergy

    /** Safari's prefixed constructor, probed for before use. */
    webkitAudioContext?: typeof AudioContext
  }

  /** The same instances under Node, where these modules also load. */
  // eslint-disable-next-line no-var
  var cmykMultimedia: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.cmyk.multimedia.ts').cmykMultimedia
  // eslint-disable-next-line no-var
  var a432ElectricFlow: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.electric.flow.ts').a432ElectricFlow
  // eslint-disable-next-line no-var
  var A432I: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.i.ts').a432I
  // eslint-disable-next-line no-var
  var a432Kabbalistic: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.kabbalah.ts').a432Kabbalistic
  // eslint-disable-next-line no-var
  var A432MathConstants: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.math.constants.ts').MATH_CONSTANTS
  // eslint-disable-next-line no-var
  var A432MobiusCircuit: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.mobius.circuit.ts').a432MobiusCircuit
  // eslint-disable-next-line no-var
  var a432SacredGeometry: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.sacred.geometry.ts').a432SacredGeometry
  // eslint-disable-next-line no-var
  var a432SimpleSystem: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.simple.ts').a432SimpleSystem
  // eslint-disable-next-line no-var
  var A432WaveEnergy: typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.wave.energy.ts').a432WaveEnergy

  // The same collision under Node.
  // eslint-disable-next-line no-var
  var a432System:
    | typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.system.ts').a432System
    | typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.index.ts').a432System
}
