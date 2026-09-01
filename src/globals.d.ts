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
  }
}
