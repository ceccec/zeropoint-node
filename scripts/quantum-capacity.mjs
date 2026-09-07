#!/usr/bin/env node
/**
 * Quantum cost has more than one axis, and this package had measured one.
 *
 * query:cost counts ORACLE CALLS on two functions and finds 0 of 7 with any
 * advantage. That is true and it is narrow, and I generalised it in writing to
 * "the more quantum the work is, the slower it runs". That sentence is false,
 * and the counterexample is in this repository: a Clifford circuit is
 * classically simulable in POLYNOMIAL time (Gottesman–Knill), so the
 * exponential cost paid by exact.ts and clifford-t.ts is a property of the
 * STATE-VECTOR REPRESENTATION they chose, not of the work being quantum.
 *
 * So this measures the axes rather than arguing them, and — more importantly —
 * NAMES THE ONES IT DOES NOT MEASURE. A partial measurement presented as a
 * general one is the error this file exists to correct, and it would be a poor
 * correction if it repeated the shape.
 *
 *   npm run capacity
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contentHashOf, sealRecord } from './lib/fingerprint.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RECORD = join(ROOT, 'src/verification/quantum-capacity.json')
const CHECK = process.argv.includes('--check')

const SOURCES = ['src/quantum/stabilizer.ts', 'src/quantum/simulator.ts', 'src/quantum/stabilizer-rank.ts', 'src/quantum/clifford-t.ts', 'scripts/quantum-capacity.mjs']
const fingerprint = (() => {
  const h = createHash('sha256')
  for (const f of SOURCES) h.update(f).update(readFileSync(join(ROOT, f)))
  return h.digest('hex').slice(0, 32)
})()

if (CHECK && existsSync(RECORD)) {
  const raw = readFileSync(RECORD, 'utf8')
  let rec = null
  try { rec = JSON.parse(raw) } catch { console.error('capacity FAIL — the record is not readable JSON'); process.exit(1) }
  if (JSON.stringify(rec, null, 2) + '\n' !== raw) { console.error('capacity FAIL — the record does not round-trip'); process.exit(1) }
  if (typeof rec.contentHash !== 'string' || contentHashOf(rec) !== rec.contentHash) {
    console.error('capacity FAIL — the record does not match its own contentHash'); process.exit(1)
  }
  if (rec.inputsFingerprint === fingerprint) {
    console.log(`capacity:check ok — ${rec.axes.measured.length} axes measured, ${rec.axes.unmeasured.length} named as unmeasured (recorded)`)
    process.exit(0)
  }
  console.log('capacity — a simulator has moved; re-measuring')
}

const st = await import(join(ROOT, 'src/quantum/stabilizer.ts'))
const sv = await import(join(ROOT, 'src/quantum/simulator.ts'))

/** The same Clifford circuit for both: 10 gates per qubit, deterministically chosen. */
const circuitFor = (n) => {
  const gates = []
  for (let g = 0; g < 10 * n; g += 1) {
    const a = g % n
    const b = (g + 1 + (g % 3)) % n
    gates.push(g % 4 === 3 && b !== a ? ['cnot', a, b] : [['h', 's', 'h'][g % 3], a, a])
  }
  return gates
}

const runStateVector = (n, gates) => {
  let s = sv.zeroState(n)
  for (const [k, a, b] of gates) {
    if (k === 'h') s = sv.applyGate1(s, a, sv.H)
    else if (k === 's') s = sv.applyGate1(s, a, sv.S)
    else s = sv.cnot(s, a, b)
  }
  return s
}

const runStabilizer = (n, gates) => {
  const s = st.stabilizerZeroState(n)
  for (const [k, a, b] of gates) {
    if (k === 'h') st.stabilizerH(s, a)
    else if (k === 's') st.stabilizerS(s, a)
    else st.stabilizerCnot(s, a, b)
  }
  return s
}

/** Warm, then the MEDIAN of three — a cold single run is not a sample. */
const timeOf = (f) => {
  f()
  const ts = []
  for (let k = 0; k < 3; k += 1) { const t0 = Date.now(); f(); ts.push(Date.now() - t0) }
  ts.sort((a, b) => a - b)
  return ts[1]
}

console.log('  AXIS 1 — time for the same Clifford circuit, 10 gates per qubit\n')
console.log('     n   state vector   stabilizer   amplitudes      tableau bits')
const rows = []
for (const n of [4, 8, 12, 16, 18, 20]) {
  const gates = circuitFor(n)
  const svMs = timeOf(() => runStateVector(n, gates))
  const stMs = timeOf(() => runStabilizer(n, gates))
  rows.push({ n, svMs, stMs, amplitudes: 2 ** n, tableauBits: st.stabilizerBits(n) })
  console.log(`  ${String(n).padStart(4)}   ${String(svMs).padStart(10)}ms ${String(stMs).padStart(10)}ms   ${String(2 ** n).padStart(11)}   ${String(st.stabilizerBits(n)).padStart(15)}`)
}

console.log('\n  AXIS 2 — where the state vector cannot go at all\n')
const beyond = []
for (const n of [100, 400, 1000]) {
  const gates = circuitFor(n)
  const stMs = timeOf(() => runStabilizer(n, gates))
  beyond.push({ n, stMs, tableauBits: st.stabilizerBits(n) })
  console.log(`  ${String(n).padStart(4)} qubits   stabilizer ${String(stMs).padStart(6)}ms   tableau ${st.stabilizerBits(n)} bits   `
    + `state vector would need 2^${n} amplitudes`)
}

const growth = rows.length > 1
  ? rows.slice(1).map((r, i) => ({ n: r.n, svRatio: (r.svMs + 1) / (rows[i].svMs + 1), stRatio: (r.stMs + 1) / (rows[i].stMs + 1) }))
  : []

console.log('\n  The state vector doubles its work with every qubit because it holds 2^n')
console.log('  amplitudes. The tableau is 2n(2n+1)+2n bits and every gate walks 2n rows,')
console.log('  so the same circuits are polynomial. Same gates, same answers — the')
console.log('  stabilizer suite checks the agreement against the state vector in both')
console.log('  directions over 200 random Clifford circuits.')
console.log('')
console.log('  WHERE THE HARDNESS ACTUALLY IS: not qubit count and not "quantum". It is')
console.log('  the T gate. Clifford is free, and classical simulation cost grows with the')
console.log('  NUMBER OF T GATES — which is why clifford-t.ts is the file next door and')
console.log('  why its boundary is the real shape of the thing.')

/**
 * NAMED, NOT MEASURED. The error being corrected here is a narrow measurement
 * read as a general one, so the list of what is still unmeasured is part of the
 * output rather than a footnote.
 */
const rank = await import(join(ROOT, 'src/quantum/stabilizer-rank.ts'))

console.log('\n  AXIS 3 — where the hardness is: T count, not qubit count\n')
const decomposition = rank.verifyTDecomposition()
if (!decomposition.sumsToOne || !decomposition.reproducesT) {
  console.error('capacity FAIL — the T decomposition is not exact, so every branch count below counts the wrong thing')
  process.exit(1)
}
console.log('  T = a*I + b*S with both coefficients in Z[zeta8] over 2 — exact, and checked:')
console.log(`    a + b = 1: ${decomposition.sumsToOne}   ·   a + b*i = zeta: ${decomposition.reproducesT}`)
console.log('')
console.log('     T gates   branches   qubits   Clifford gates   agrees with direct')
const tScaling = []
for (const c of [
  { t: 0, n: 1, gates: [{ gate: 'h', a: 0 }] },
  { t: 1, n: 1, gates: [{ gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'h', a: 0 }] },
  { t: 2, n: 2, gates: [{ gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'cnot', a: 0, b: 1 }, { gate: 't', a: 1 }] },
  { t: 3, n: 2, gates: [{ gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'cnot', a: 0, b: 1 }, { gate: 't', a: 1 }, { gate: 'h', a: 1 }, { gate: 't', a: 0 }] },
  { t: 4, n: 3, gates: [{ gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'cnot', a: 0, b: 1 }, { gate: 't', a: 1 }, { gate: 'h', a: 2 }, { gate: 't', a: 2 }, { gate: 'cz', a: 1, b: 2 }, { gate: 't', a: 0 }] },
]) {
  const t = rank.tCountOf(c.gates)
  const branches = rank.branchCount(t)
  const agrees = rank.branchingAgreesWithDirect(c.n, c.gates)
  const clifford = c.gates.length - t
  tScaling.push({ tCount: t, branches: `${branches}`, qubits: c.n, cliffordGates: clifford, agreesWithDirect: agrees, depth: rank.circuitDepth(c.gates) })
  console.log(`  ${String(t).padStart(8)}   ${String(branches).padStart(8)}   ${String(c.n).padStart(6)}   ${String(clifford).padStart(14)}   ${agrees}`)
  if (!agrees) {
    console.error('capacity FAIL — a branch sum disagreed with the direct simulation; the decomposition is wrong')
    process.exit(1)
  }
}
console.log('')
console.log('  Every T doubles the branch count and the qubit count does not enter it. A five-qubit')
console.log('  Clifford circuit is one branch; three T gates on ONE qubit are eight. That is the')
console.log('  scaling law, counted here rather than cited — and each sum was checked against the')
console.log('  same circuit run directly, exactly, with no tolerance.')
console.log('')
console.log('  IT DOES NOT MAKE ANYTHING FASTER, and saying so is the point of the ledger below.')
console.log('  These branches run on the exact state vector, so the cost is 2^t * 2^n and strictly')
console.log('  worse than running the circuit directly. Realising the gain needs each branch as a')
console.log('  stabilizer tableau with amplitudes extracted from it, and the better decompositions')
console.log('  the literature reaches (~2^0.23t by decomposing several T gates at once). Neither is')
console.log('  implemented here.')

console.log('\n  AXIS 4 — depth, which is what hardware pays and gate count is not\n')
const depthCases = [
  { name: 'three H on disjoint qubits', gates: [{ gate: 'h', a: 0 }, { gate: 'h', a: 1 }, { gate: 'h', a: 2 }] },
  { name: 'three H on one qubit', gates: [{ gate: 'h', a: 0 }, { gate: 'h', a: 0 }, { gate: 'h', a: 0 }] },
  { name: 'a CNOT chain over five qubits', gates: [{ gate: 'cnot', a: 0, b: 1 }, { gate: 'cnot', a: 1, b: 2 }, { gate: 'cnot', a: 2, b: 3 }, { gate: 'cnot', a: 3, b: 4 }] },
  { name: 'four disjoint CNOTs', gates: [{ gate: 'cnot', a: 0, b: 1 }, { gate: 'cnot', a: 2, b: 3 }, { gate: 'cnot', a: 4, b: 5 }, { gate: 'cnot', a: 6, b: 7 }] },
]
const depths = depthCases.map((c) => ({ name: c.name, gates: c.gates.length, depth: rank.circuitDepth(c.gates) }))
for (const d of depths) console.log(`  ${String(d.gates).padStart(2)} gates, depth ${String(d.depth).padStart(2)}   ${d.name}`)
console.log('')
console.log('  Same gate count, different depth, in both directions — four gates at depth 1 and')
console.log('  four at depth 4. Counting gates and counting depth are different measurements.')

const UNMEASURED = [
  'the SPEEDUP a stabilizer-rank simulator would give — the 2^t scaling is measured here, but realising it needs tableau branches with amplitude extraction, and the better ~2^{0.23t} decompositions, neither of which is implemented',
  'noise, error correction and the physical qubit overhead a real device needs per logical qubit',
  'any hardware timing whatsoever — no quantum processor was involved in any number in this repository',
  'communication and readout cost, which dominate on real devices and are free in every simulator',
  'the asymptotic separations themselves (Simon, Shor), which are proven results about query and gate complexity and are not measurable at the sizes anything here can run',
]
console.log('\n  NOT MEASURED, and named so this is not read as a general result:')
for (const u of UNMEASURED) console.log(`    · ${u}`)

if (rows.length === 0) {
  console.error('capacity FAIL — measured nothing')
  process.exit(1)
}

writeFileSync(RECORD, JSON.stringify(sealRecord({
  what: 'Several axes of quantum simulation cost, measured, after this package measured ONE (oracle calls) and generalised it in prose to all of them. A Clifford circuit is polynomial classically; the exponential cost here is the state-vector representation, not the quantum content.',
  inputsFingerprint: fingerprint,
  axes: {
    measured: [
      'wall-clock for identical Clifford circuits in both representations',
      'memory: amplitudes against tableau bits',
      'reach: qubit counts the state vector cannot represent at all',
      'T-count scaling: 2^t branches, from an EXACT decomposition T = a*I + b*S checked against direct simulation',
      'circuit depth, counted separately from gate count',
    ],
    unmeasured: UNMEASURED,
  },
  tDecompositionExact: decomposition,
  tCountScaling: tScaling,
  depth: depths,
  stateVectorVsStabilizer: rows,
  stabilizerBeyondStateVector: beyond,
  growth,
}), null, 2) + '\n')

console.log(`\ncapacity ok — 5 axes measured, ${UNMEASURED.length} named as unmeasured`)
