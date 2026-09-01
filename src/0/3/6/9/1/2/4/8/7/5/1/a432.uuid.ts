/**
 * a432.uuid.ts — Content-addressed UUID bridge (Wave 8 purge).
 *
 * Random / hand-minted ids are forbidden. All generators fold through
 * kernel `toUuid` (FNV) so same seed ⇒ same address.
 * Cryptographic seals live in `src/integrity` (SHA content-uuid).
 *
 * Export names uuidV1–V5 kept as thin adapters for legacy callers.
 */

import { round } from './a432.algebra.ts'
import {
  toUuid,
  merge,
  VORTEX_ORBIT,
  VORTEX_AXIS,
} from '../../../../../../../../../../index.ts'

const RODIN = [...VORTEX_ORBIT] as const

/** Timestamp folded with label — deterministic for a given ms + label. */
export function uuidV1(label = 'v1', at: number = 0): string {
  const t = at || 0
  return toUuid(`a432.uuid.v1:${label}:${t}`)
}

/** Name-based soft address (FNV). Prefer content-uuid for proofs. */
export function uuidV3(name: string): string {
  return toUuid(`a432.uuid.v3:${name}`)
}

/**
 * Former Math.random path — now seed-required content address.
 * Calling with no seed uses a fixed namespace (still deterministic, never random).
 */
export function uuidV4(seed = 'a432.uuid.v4:namespace'): string {
  return toUuid(seed)
}

/** Name product folded through kernel merge. */
export function uuidV5(name: string): string {
  return merge(toUuid('a432.uuid.v5'), toUuid(name))
}

export function geometryUuid(step: number): string {
  const n = step % 3 === 0 ? 3 : step % 3 === 1 ? 6 : 9
  const d = step % 3 === 0 ? 6 : step % 3 === 1 ? 9 : 3
  const angle = (step % 3) * 120
  return toUuid(`a432.uuid.geometry:${n}/${d}@${angle}`)
}

export function soundUuid(step: number, base = 432): string {
  const i = step % 6
  const n = RODIN[i]!
  const d = RODIN[(i + 1) % 6]!
  const freq = round(base * (n / d))
  return toUuid(`a432.uuid.sound:${n}/${d}@${freq}Hz`)
}

export function colorUuid(step: number): string {
  const n = step % 3 === 0 ? 3 : step % 3 === 1 ? 6 : 9
  const d = step % 3 === 0 ? 6 : step % 3 === 1 ? 9 : 3
  const hue = (step % 3) * 120
  return toUuid(`a432.uuid.color:${n}/${d}@${hue}`)
}

export function dimensionalVortexUuid(step: number): string {
  const dim = VORTEX_ORBIT[step % VORTEX_ORBIT.length]!
  const axis = VORTEX_AXIS[step % VORTEX_AXIS.length]!
  return toUuid(`a432.uuid.vortex:${step}:${dim}:${axis}`)
}

export function vortexMatrixUuid(seed = 'vortex-matrix'): string {
  return toUuid(`a432.uuid.vortex-matrix:${seed}`)
}

export function trinityMatrixUuid(seed = 'trinity-matrix'): string {
  return toUuid(`a432.uuid.trinity-matrix:${seed}`)
}

/** Living API — all paths content-addressed. */
export const a432UUID = {
  uuid: uuidV4,
  vortexMatrixUuid,
  trinityMatrixUuid,
  geometryUuid,
  soundUuid,
  colorUuid,
  dimensionalVortexUuid,
  doc: 'a432.uuid bridges to kernel toUuid — no random hand-minted ids.',
}

export default a432UUID
