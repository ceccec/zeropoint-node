#!/usr/bin/env node
/**
 * What the float simulator costs, measured against an exact one.
 *
 * THIS FILE ONCE OPENED "there is no QPU here". That was a misreading. Asked to
 * use only the QPU, it answered that the machine has no quantum processing
 * unit — true, and not the question. The QPU is the PENTAGRAM: CPU, GPU, RAM,
 * CACHE, STORAGE. All five were present the whole time and this measured one of
 * them, on one thread, and called the result the machine's capacity. See
 * qpu-pentagram.mjs, which measures all five and finds memory binding at 31
 * qubits — where the number below is 19 and is a stopwatch, not a ceiling.
 *
 * There is no quantum HARDWARE, which is a separate and smaller claim: no
 * qiskit, braket, cirq, ionq or azure-quantum backend anywhere in the tree.
 * Every number this repository prints under the word quantum is a classical
 * simulation, and uuidna's simulator says the same of itself in its own output.
 *
 * ONE: THE TIME. A state of n qubits is 2^n complex amplitudes, so a sweep
 * doubles in cost with every qubit. Growing n until one sweep misses a budget
 * measures how long ONE CORE takes, and nothing else. No optimisation moves the
 * exponent — three packing hypotheses in this repository failed to — and
 * neither does any point of the pentagram.
 *
 * TWO: THE DRIFT. The float simulator carries binary floats; src/quantum/exact.ts
 * carries Gaussian-integer amplitudes over √(2^scale) and returns EXACT
 * RATIONALS — 1/2, not 0.5 — and qpu.uuidna.com's simulator does the same on
 * the same representation (qpu-agrees.json records the two agreeing on GHZ_3).
 * The reference below used to be TYPED, as `1n/2n` with a comment that uuidna
 * had returned it: a constant written into the instrument that measures drift
 * from it, which is the shape shadowed:check exists for. It is now COMPUTED by
 * exact.ts at every width measured, so the float simulator is compared with an
 * exact answer this repository derives rather than one it remembers.
 *
 *   npm run qpu:reality
 */
const ROOT = new URL('..', import.meta.url).pathname
const { zeroState, applyGate1, cnot, probabilities, H } = await import(ROOT + 'src/quantum/simulator.ts')
const { exactZeroState, exactH, exactCnot, exactProbability } = await import(ROOT + 'src/quantum/exact.ts')

/** GHZ_n: H on qubit 0, then a CNOT ladder. Exactly what uuidna was asked for. */
const ghz = (n) => {
  let reg = applyGate1(zeroState(n), 0, H)
  for (let q = 0; q + 1 < n; q += 1) reg = cnot(reg, q, q + 1)
  return reg
}

// ─────────────────────────────────────────────── drift against an exact source
// The same GHZ_n on exact.ts, whose probabilities are integer fractions over
// 2^scale. The reference is computed at each width and converted to a float
// only at the comparison — writing it as 0.5 in the source would hide precisely
// the error being looked for, and writing it as 1n/2n hid where it came from.
const exactGhz = (n) => {
  let reg = exactH(exactZeroState(n), 0)
  for (let q = 0; q + 1 < n; q += 1) reg = exactCnot(reg, q, q + 1)
  return reg
}
const asFloat = (p) => Number(p.numerator) / Number(p.denominator)

console.log('  drift of this float simulator against the exact simulator in src/quantum/exact.ts')
let worstDrift = 0
let worstAt = 0
for (const n of [2, 4, 6, 8, 10, 12, 14]) {
  const ps = probabilities(ghz(n))
  const first = ps[0]
  const last = ps[ps.length - 1]
  const total = ps.reduce((t, p) => t + p, 0)
  const ex = exactGhz(n)
  const exFirst = exactProbability(ex, 0)
  const exLast = exactProbability(ex, ex.amps.length - 1)
  const drift = Math.max(Math.abs(first - asFloat(exFirst)), Math.abs(last - asFloat(exLast)))
  if (drift > worstDrift) { worstDrift = drift; worstAt = n }
  console.log(`    n=${String(n).padStart(2)}  exact p(0…0)=${exFirst.numerator}/${exFirst.denominator}  float=${first.toExponential(17)}  |error|=${drift.toExponential(3)}  Σp−1=${(total - 1).toExponential(3)}`)
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
  console.log('    exact.ts gets 1/2 EXACTLY for the same circuits because it never materialises')
  console.log('    the irrational: amplitudes are Gaussian integers over a √(2^scale) factor')
  console.log('    kept symbolic, so the √2 cancels in the square instead of rounding. So does')
  console.log('    qpu.uuidna.com, on the same representation (qpu-agrees.json).')
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
  console.log('    the float simulator\'s exactness is ASSUMED and is not there, while the exact')
  console.log('    representation ships beside it and a peer runs the same one.')
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
console.log(`\n  ${lastFitting} qubits is ONE THREAD against a ${BUDGET_MS}ms budget — a time limit, not a`)
console.log('  capacity, and not this machine\'s. The QPU is the pentagram: CPU, GPU, RAM,')
console.log('  CACHE and STORAGE. Memory binds at 31 qubits and the state here is 8 MiB.')
console.log('  See npm run qpu:pentagram, which measures all five.')
console.log('  Each further qubit doubles the state. A 300-qubit register has more')
console.log('  amplitudes than the observable universe has atoms, which is the whole')
console.log('  reason quantum hardware is worth building and the reason no amount of')
console.log('  packing, inlining or typed arrays reaches it — those move the constant.')
console.log('\nqpu:reality ok — no quantum hardware was used, because none is present.')
