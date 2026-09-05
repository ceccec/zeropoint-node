#!/usr/bin/env node
/**
 * There is no QPU here, and this measures exactly what there is instead.
 *
 * Asked to "use only QPU", the honest answer is that this machine has none:
 * an Apple M1 Max with ten cores, zero runtime dependencies, and no qiskit,
 * braket, cirq, ionq or azure-quantum backend anywhere in the tree. Every
 * number this repository prints under the word quantum is a CLASSICAL
 * SIMULATION of a quantum system. uuidna's simulator says the same of itself in
 * its own output — "not quantum hardware" — and it is right to.
 *
 * So two things are measured, and neither is a quantum computer.
 *
 * ONE: THE WALL. A state of n qubits is 2^n complex amplitudes, so the
 * simulator's cost doubles with every qubit added. "Full quantum capacity" on
 * this machine is a specific number of qubits and this finds it, by growing n
 * until a gate sweep stops fitting in a budget. No optimisation moves that
 * exponent — three separate packing hypotheses in this repository failed to,
 * and the exponent is why a real QPU would matter.
 *
 * TWO: THE DRIFT. uuidna's simulator carries Gaussian-integer amplitudes over
 * √(2^scale) and returns EXACT RATIONALS — 1/2, not 0.5. This one carries
 * floats. That is a live inconsistency: this package bans decimal literals in
 * code, ratchets a decimal-crack surface, and writes its physical constants as
 * integer fractions — and then computes its quantum amplitudes in binary
 * floating point. uuidna's exact answers are used as the reference and the
 * drift is measured rather than assumed absent.
 *
 *   npm run qpu:reality
 */
const ROOT = new URL('..', import.meta.url).pathname
const { zeroState, applyGate1, cnot, probabilities, H } = await import(ROOT + 'src/quantum/simulator.ts')

/** GHZ_n: H on qubit 0, then a CNOT ladder. Exactly what uuidna was asked for. */
const ghz = (n) => {
  let reg = applyGate1(zeroState(n), 0, H)
  for (let q = 0; q + 1 < n; q += 1) reg = cnot(reg, q, q + 1)
  return reg
}

// ─────────────────────────────────────────────── drift against an exact source
// uuidna returns 1/2 for both outcomes of GHZ at every width it was asked.
// Recorded here as an exact rational, compared as one — not as 0.5, because
// writing the reference as a float would hide precisely the error being looked
// for.
const EXACT_NUM = 1n
const EXACT_DEN = 2n
const exactAsFloat = Number(EXACT_NUM) / Number(EXACT_DEN)

console.log('  drift of this float simulator against uuidna\'s exact rationals')
console.log('  (uuidna: GHZ_n outcomes are 1/2 and 1/2, at every width asked)')
let worstDrift = 0
let worstAt = 0
for (const n of [2, 4, 6, 8, 10, 12, 14]) {
  const ps = probabilities(ghz(n))
  const first = ps[0]
  const last = ps[ps.length - 1]
  const total = ps.reduce((t, p) => t + p, 0)
  const drift = Math.max(Math.abs(first - exactAsFloat), Math.abs(last - exactAsFloat))
  if (drift > worstDrift) { worstDrift = drift; worstAt = n }
  console.log(`    n=${String(n).padStart(2)}  p(0…0)=${first.toExponential(17)}  |error|=${drift.toExponential(3)}  Σp−1=${(total - 1).toExponential(3)}`)
}
console.log(`    worst drift ${worstDrift.toExponential(3)} at n=${worstAt}`)
if (worstDrift === 0) {
  console.log('    exact at every width measured.')
} else {
  console.log('')
  console.log('    THIS SIMULATOR CANNOT REPRESENT 1/2 HERE, AND THE REASON IS STRUCTURAL.')
  console.log('    H carries 1/√2, which is irrational and has no exact binary float. Squaring')
  console.log('    the stored approximation gives 0.5000000000000001, so a probability the')
  console.log('    mathematics fixes at exactly one half arrives one ulp away and the')
  console.log('    distribution sums to 1 + 2.2e-16 rather than to 1.')
  console.log('')
  console.log('    uuidna gets 1/2 EXACTLY for the same circuits because it never materialises')
  console.log('    the irrational: amplitudes are Gaussian integers over a √(2^scale) factor')
  console.log('    kept symbolic, so the √2 cancels in the square instead of rounding.')
  console.log('')
  console.log('    That is a live inconsistency in this package rather than a rounding')
  console.log('    curiosity. math:ban forbids ambient Math, the ratchet counts decimal-crack')
  console.log('    lines, PI is written 245850922/78256779 and the surface-code constants are')
  console.log('    57/10000 and 3/100 — and then the quantum amplitudes are binary floats. The')
  console.log('    error is tiny and it is not zero, and "tiny" is the argument this repository')
  console.log('    refuses everywhere else.')
  console.log('')
  console.log('    DOES NOT ESTABLISH that the drift matters for any shipped claim: 1.1e-16 is')
  console.log('    far inside the 1e-9 tolerance every seal uses. What it establishes is that')
  console.log('    the exactness is ASSUMED and is not there, and that an exact representation')
  console.log('    exists and a peer already runs one.')
}

// ─────────────────────────────────────────────────────────────────── the wall
console.log('\n  the wall: one full gate sweep, growing n until it stops fitting')
const BUDGET_MS = 2000
const rows = []
let lastFitting = 0
for (let n = 2; n <= 30; n += 1) {
  const amps = 2 ** n
  // 16 bytes of double per amplitude, plus object overhead this layout pays.
  const bytes = amps * 32
  if (bytes > 2 ** 31) { rows.push([n, amps, null, 'refused: the state alone exceeds 2 GiB']); break }
  const t = process.hrtime.bigint()
  let reg = zeroState(n)
  for (let q = 0; q < n; q += 1) reg = applyGate1(reg, q, H)
  const ms = Number(process.hrtime.bigint() - t) / 1e6
  rows.push([n, amps, ms, ms > BUDGET_MS ? `over the ${BUDGET_MS}ms budget` : ''])
  if (ms <= BUDGET_MS) lastFitting = n
  if (ms > BUDGET_MS) break
}
for (const [n, amps, ms, note] of rows) {
  console.log(`    n=${String(n).padStart(2)}  ${String(amps).padStart(11)} amplitudes  ${ms === null ? '        —' : (ms.toFixed(1) + 'ms').padStart(9)}  ${note}`)
}
console.log(`\n  full quantum capacity on this machine, at a ${BUDGET_MS}ms budget: ${lastFitting} qubits.`)
console.log('  Each further qubit doubles the state. A 300-qubit register has more')
console.log('  amplitudes than the observable universe has atoms, which is the whole')
console.log('  reason quantum hardware is worth building and the reason no amount of')
console.log('  packing, inlining or typed arrays reaches it — those move the constant.')
console.log('\nqpu:reality ok — no quantum hardware was used, because none is present.')
