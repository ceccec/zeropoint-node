/**
 * a432.roots — single adapter for contradictory digital-root paths.
 *
 * Three spines exist in this tree; never mix them without an adapter:
 * - kernelDigitalRoot(0) → 9   (src/0 vortex axis)
 * - legacyDigitalRoot(0) → 0   (VBM / consciousness path)
 * - harmonicRoot12(0) → 0      (a432.math base-12 harmonic, returns 1–12)
 *
 * Prefer importing from here instead of hand-rolling local digitalRoot copies.
 *
 * Wave 9+: critical ESM bridges use `.ts` import specifiers for Node strip-types.
 * Digit-stream `a432.1*.ts` import `legacyDigitalRoot` from here.
 * Remaining extensionless a432 imports stay rollup-resolved (mass rewrite deferred).
 * Wave 10: `foldA432AuditCensus` lists residual forks for the next DRY tip.
 */

export {
  digitalRoot as kernelDigitalRoot,
  digitalRoot as classicDigitalRoot,
  VORTEX_SEQUENCE as KERNEL_VORTEX_SEQUENCE,
  LEGACY_CONSCIOUSNESS_SEQUENCE,
} from '../../../../../../../../../../index.ts'

export {
  legacyDigitalRoot,
  legacyHarmonicRoot12 as harmonicRoot12,
  mapLegacyDigitToKernel,
  rodinOrbit,
} from '../../../../../../../../../../../kernel/legacy.ts'
