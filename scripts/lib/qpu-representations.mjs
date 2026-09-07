#!/usr/bin/env node
/**
 * qpu-representations — how many bytes one unit of state costs, MEASURED, for
 * each representation this repository actually ships.
 *
 * Run as a child under --expose-gc by scripts/qpu-pentagram.mjs, which needs a
 * forced collection between allocations and cannot ask for one in its own
 * process. Prints one JSON record on stdout and nothing else.
 *
 * TWO THINGS THIS GETS RIGHT THAT THE OBVIOUS VERSION DOES NOT, both found by
 * running the obvious version first and disbelieving the answer.
 *
 * THE ZERO STATE IS NOT A STATE TO MEASURE. exactZeroState fills 2^n slots with
 * one shared ZERO object, so every slot is a pointer to the same amplitude and
 * the measurement reports 5.96 bytes where a spread state costs 65.60 — an
 * eleven-fold understatement, and it would have been reported as the cost of
 * exact arithmetic. Both states are measured here and the zero one is kept only
 * as the control that shows why it cannot be the answer.
 *
 * HEAP IS NOT ALL THE MEMORY. The stabilizer tableau is Uint8Arrays, which live
 * outside heapUsed; measuring heapUsed alone reported 0.047 bytes per bit for a
 * structure that plainly costs about one. arrayBuffers is added.
 */
import { totalmem } from 'node:os'

const ROOT = new URL('../..', import.meta.url).pathname
const { zeroState, applyGate1, H } = await import(ROOT + 'src/quantum/simulator.ts')
const { exactZeroState, exactH } = await import(ROOT + 'src/quantum/exact.ts')
const { stabilizerZeroState, stabilizerBits } = await import(ROOT + 'src/quantum/stabilizer.ts')

if (typeof globalThis.gc !== 'function') {
  console.error('qpu-representations: needs --expose-gc; without a forced collection the numbers are garbage that has not been collected yet')
  process.exit(2)
}
const used = () => { const m = process.memoryUsage(); return m.heapUsed + m.arrayBuffers }
const settle = () => { globalThis.gc(); globalThis.gc(); globalThis.gc(); return used() }

/**
 * Bytes per unit, as the SLOPE between two widths rather than a total divided
 * by a count. A total carries the register's fixed overhead and the module
 * graph with it; a slope cancels every constant, which is what makes the same
 * number come back to two decimal places on a machine doing other work.
 *
 * The minimum over trials is taken, per the rule that a resource measurement
 * on a shared machine has a floor and no ceiling: anything else running can
 * only add.
 */
function bytesPerUnit(build, unitsAt, widths, trials = 3) {
  let best = Infinity
  let points = []
  for (let t = 0; t < trials; t += 1) {
    const pts = []
    for (const n of widths) {
      settle()
      const before = settle()
      const state = build(n)
      const after = settle()
      pts.push({ n, units: unitsAt(n), bytes: after - before, held: state.n })
    }
    const first = pts[0]
    const last = pts[pts.length - 1]
    const per = (last.bytes - first.bytes) / (last.units - first.units)
    if (per < best) { best = per; points = pts.map((p) => ({ n: p.n, bytes: p.bytes, units: p.units })) }
  }
  /**
   * The slope is fitted from the FIRST and LAST widths only. The middle one is
   * never used for the fit and is reported as a HELD-OUT point, so a caller can
   * ask whether the claimed cost law predicts a measurement it did not see.
   * Fitting a line through two points always succeeds; predicting a third is
   * the only part that can fail.
   */
  return { bytesPerUnit: best, points, heldOut: points[Math.floor(points.length / 2)] }
}

/** A state with DISTINCT amplitudes — H on every qubit. See the header. */
const spreadFloat = (n) => { let r = zeroState(n); for (let q = 0; q < n; q += 1) r = applyGate1(r, q, H); return r }
const spreadExact = (n) => { let r = exactZeroState(n); for (let q = 0; q < n; q += 1) r = exactH(r, q); return r }

const AMPLITUDE_WIDTHS = [12, 16, 18]
const TABLEAU_WIDTHS = [200, 600, 1000]

console.log(JSON.stringify({
  totalmem: totalmem(),
  /** unit = one amplitude. cost = 2^n units. */
  floatVector: { unit: 'amplitude', exponential: true, ...bytesPerUnit(spreadFloat, (n) => 2 ** n, AMPLITUDE_WIDTHS) },
  exactVector: { unit: 'amplitude', exponential: true, ...bytesPerUnit(spreadExact, (n) => 2 ** n, AMPLITUDE_WIDTHS) },
  /** unit = one bit of the tableau. cost = stabilizerBits(n) units — quadratic. */
  stabilizerTableau: { unit: 'tableau bit', exponential: false, ...bytesPerUnit(stabilizerZeroState, stabilizerBits, TABLEAU_WIDTHS) },
  /** The controls: the same measurement on the zero state, which is not one. */
  controls: {
    floatZeroState: bytesPerUnit(zeroState, (n) => 2 ** n, AMPLITUDE_WIDTHS).bytesPerUnit,
    exactZeroState: bytesPerUnit(exactZeroState, (n) => 2 ** n, AMPLITUDE_WIDTHS).bytesPerUnit,
  },
}))
