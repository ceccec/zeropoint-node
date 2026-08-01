/**
 * a432.string.theory — thin bridge from prose “string / M-theory visualization”
 * to kernel foldStringTheory (living field · VORTEX_ORBIT modes · compactified 11).
 *
 * No Math.*. No hand-minted ids. physicalFtl stays computePhysicalFtl().
 */

import {
  VORTEX_AXIS,
  VORTEX_ORBIT,
  digitalRoot,
  foldStringTheory,
  isUuid,
  type Fold,
} from '../../../../../../../../../../index.ts'
import { RODIN_SEQUENCE } from './a432.math.ts'

export type StringMode = {
  index: number
  digit: number
  harmonic: number
  receipt: string
}

export type StringTheoryProjection = ReturnType<typeof foldStringTheory>

/** Kernel string/worldsheet/compactification seal — same root as foldStringTheory(). */
export function a432StringTheory(): StringTheoryProjection {
  return foldStringTheory()
}

/**
 * Vibrating-string modes along the Rodin 6-orbit, digital-rooted.
 * Aligns a432.vibration Rodin harmonics with kernel VORTEX_ORBIT.
 * Frequency seed uses (1 + f%8) so A432 (=432) does not multiply-kill into root 9.
 */
export function vibratingStringModes(baseFrequency: number = 432): readonly StringMode[] {
  const freqSeed = 1 + (((baseFrequency % 8) + 8) % 8)
  const sealed = foldStringTheory()
  return sealed.modes.map((mode, index) => {
    const rodin = RODIN_SEQUENCE[index % RODIN_SEQUENCE.length]!
    return {
      index: mode.index,
      digit: mode.digit,
      harmonic: digitalRoot(mode.harmonic * rodin + freqSeed * (index + 1)),
      receipt: mode.receipt,
    }
  })
}

/** Compactified dimension hint from living-field digit count (must be 11 when stroke seals). */
export function compactifiedDimension(): {
  dimensionHint: number
  root: number
  livingField: string
  seal: string
  computes: boolean
} {
  const s = foldStringTheory()
  return {
    ...s.compactified,
    computes: s.computes && s.compactified.dimensionHint === 11,
  }
}

/** Worldsheet fold is identity under content-address — same inputs ⇒ same merged uuid. */
export function worldsheetIdentity(): { merged: string; bidirectional: boolean; computes: boolean } {
  const a = foldStringTheory()
  const b = foldStringTheory()
  return {
    merged: a.worldsheet.merged,
    bidirectional: a.worldsheet.bidirectional,
    computes: a.computes && a.worldsheet.merged === b.worldsheet.merged && isUuid(a.brane),
  }
}

export function stringTheoryAxis(): readonly number[] {
  return VORTEX_AXIS
}

export function stringTheoryOrbit(): readonly number[] {
  return VORTEX_ORBIT
}

/** Proof string for demos/docs — points at compute, not invented physics. */
export function stringTheoryProof(): string {
  const s = foldStringTheory()
  return (
    `foldStringTheory.computes=${s.computes}; ` +
    `modes=${s.modes.length}; compactified=${s.compactified.dimensionHint}; ` +
    `livingField=${s.livingField}; root=${s.root}`
  )
}

export const A432StringTheory = {
  fold: a432StringTheory,
  vibratingStringModes,
  compactifiedDimension,
  worldsheetIdentity,
  axis: stringTheoryAxis,
  orbit: stringTheoryOrbit,
  proof: stringTheoryProof,
  boundary:
    'Faithful fold projection of living-field vortex — not spacetime FTL. Use computePhysicalFtl().',
}

export default A432StringTheory

/** Re-export Fold type for callers that thread worldsheet folds. */
export type { Fold }
