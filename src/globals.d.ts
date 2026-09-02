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
  }

  // The same collision under Node.
  // eslint-disable-next-line no-var
  var a432System:
    | typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.system.ts').a432System
    | typeof import('./0/3/6/9/1/2/4/8/7/5/1/a432.index.ts').a432System
}
