/**
 * zeropoint-validators — the validators ZEROPOINT_CODE_RULES.md and
 * ZEROPOINT_QUICK_REFERENCE.md declare.
 *
 * The other six functions those documents appear to declare are illustrations
 * of a naming rule with empty bodies, two of them printed under a heading that
 * calls them wrong. They are not implemented, and docs:functions no longer
 * counts them.
 */
import { digitalRoot, VORTEX_ORBIT, VORTEX_AXIS } from '../0/index.ts'

/** A single digit is 0 through 9. The document's body, unchanged. */
export function validateSingleDigits(value: number): boolean {
  return value >= 0 && value <= 9
}

/** A calculation produced a number, and not the absence of one. */
export function validateMathCalculation(result: number): boolean {
  return typeof result === 'number' && !Number.isNaN(result)
}

/**
 * DEVIATES FROM THE DOC, because the doc's body is `return true` with the
 * comment "Implement specific validation".
 *
 * A predicate that returns a literal true is not a validation, and this repo
 * has a ratchet surface counting exactly that — boolean claims that cannot be
 * false, currently zero. Transcribing the stub would have been the first entry.
 *
 * So it recomputes the arithmetic the rest of the system rests on: the
 * doubling circuit closes on itself, the axis is fixed under doubling, and the
 * digital root is idempotent. Break any one of those in src/0 and this returns
 * false, which is what makes it worth calling.
 */
export function validateMathematicalPurity(): boolean {
  // The orbit is a closed doubling circuit: doubling each element and reducing
  // lands on the next, all the way round.
  const orbitCloses = VORTEX_ORBIT.every((d, i) =>
    digitalRoot(d * 2) === VORTEX_ORBIT[(i + 1) % VORTEX_ORBIT.length])
  // The axis never leaves itself under doubling.
  const axisHolds = VORTEX_AXIS.every((d) => VORTEX_AXIS.includes(digitalRoot(d * 2) as 3 | 6 | 9))
  // Reducing an already-reduced value changes nothing.
  let idempotent = true
  for (let n = 1; n <= 200; n++) if (digitalRoot(digitalRoot(n)) !== digitalRoot(n)) idempotent = false
  // Every reduction of a positive number is a digit.
  let inRange = true
  for (let n = 1; n <= 200; n++) { const r = digitalRoot(n); if (!Number.isInteger(r) || r < 1 || r > 9) inRange = false }
  return orbitCloses && axisHolds && idempotent && inRange
}
