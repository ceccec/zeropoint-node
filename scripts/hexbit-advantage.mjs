#!/usr/bin/env node
/**
 * Hexbit oracles against the quantum advantage they cannot create.
 *
 * A six-qubit register has 64 basis states, which is six bits, which is one
 * word — the same 64 as the hexagram lattice. So an oracle over it can be a
 * single machine operation instead of a loop: parity(x AND s) is
 * POPCOUNT[x & s] & 1, one table lookup, where the array form walks six
 * positions. That is the hexbit form and it is genuinely faster, measured
 * below.
 *
 * IT DOES NOT UNLOCK QUANTUM ADVANTAGE, AND THE MEASUREMENT SHOWS WHY.
 *
 * The advantage is a QUERY separation: Deutsch-Jozsa decides constant-versus-
 * balanced in ONE oracle query where an exact deterministic classical algorithm
 * needs 2^(n-1)+1. That is a property of the algorithm and no representation
 * changes it. Meanwhile the classical SIMULATION of that one quantum query
 * evaluates the oracle at all 2^n basis states, because it holds every
 * amplitude at once — so simulating the algorithm costs more oracle
 * evaluations than the classical algorithm the quantum one beats.
 *
 * Hexbits reduce the CONSTANT on each of those 2^n evaluations. They cannot
 * reduce the 2^n, and the 2^n is the whole reason a quantum computer would be
 * worth building. All three numbers are printed together so the claim cannot be
 * made by quoting one of them.
 *
 *   npm run hexbit:advantage
 */
const ROOT = new URL('..', import.meta.url).pathname
const { deutschJozsa, bernsteinVazirani } = await import(ROOT + 'src/quantum/algorithms.ts')
const { SEPARATIONS } = await import(ROOT + 'src/quantum/advantage.ts')

const N = 6
const SIZE = 1 << N

// ------------------------------------------------------------- the two oracles
const POPCOUNT = new Uint8Array(SIZE)
for (let i = 0; i < SIZE; i += 1) {
  let c = 0
  for (let x = i; x; x >>= 1) c += x & 1
  POPCOUNT[i] = c
}

/** Hexbit: the whole input is one word, so masking and parity are one op each. */
const hexbitOracle = (s) => (x) => (POPCOUNT[x & s] & 1)

/** Array form: the same function, walking six positions. */
const arrayOracle = (s) => {
  const bits = [0, 1, 2, 3, 4, 5].map((i) => (s >> i) & 1)
  return (x) => {
    let acc = 0
    for (let i = 0; i < N; i += 1) acc ^= ((x >> i) & 1) & bits[i]
    return acc
  }
}

// CORRECTNESS BEFORE SPEED. A faster oracle computing a different function is
// not a faster oracle, and every input is checked because there are only 64.
const HIDDEN = 0b101101
{
  const h = hexbitOracle(HIDDEN)
  const a = arrayOracle(HIDDEN)
  for (let x = 0; x < SIZE; x += 1) {
    if (h(x) !== a(x)) {
      console.error(`hexbit:advantage FAIL — the two oracles disagree at x=${x}`)
      process.exit(1)
    }
  }
}

// ------------------------------------------------ what the ALGORITHM costs
// Instrumented so the count is observed, not asserted.
let calls = 0
const counted = (f) => (x) => { calls += 1; return f(x) }

calls = 0
const verdict = deutschJozsa(N, counted(hexbitOracle(HIDDEN)))
const simulationCalls = calls

// The classical exact bound is a formula, and the repository already states it
// with the condition attached rather than quoting the exponential bare.
const classicalExact = 2 ** (N - 1) + 1
const quantumQueries = 1

console.log(`  Deutsch-Jozsa on ${N} qubits, hidden string ${HIDDEN.toString(2).padStart(N, '0')}`)
console.log(`    verdict: ${verdict}   (a non-zero hidden string is balanced)`)
console.log()
console.log('  three numbers, and only the first is the advantage:')
console.log(`    ${String(quantumQueries).padStart(3)}  oracle queries the QUANTUM ALGORITHM makes`)
console.log(`    ${String(classicalExact).padStart(3)}  oracle queries an exact deterministic CLASSICAL algorithm needs`)
console.log(`    ${String(simulationCalls).padStart(3)}  oracle evaluations the CLASSICAL SIMULATION of the quantum algorithm makes`)
console.log()
console.log(`  The simulation makes ${simulationCalls} evaluations to reproduce a ${quantumQueries}-query algorithm —`)
console.log(`  ${(simulationCalls / classicalExact).toFixed(1)}x MORE than the classical algorithm the quantum one beats. Holding every`)
console.log('  amplitude at once is what a quantum computer does for free and a simulator')
console.log('  pays 2^n for. No representation changes that exponent.')

// ------------------------------------------------- what the REPRESENTATION buys
const med = (xs) => xs.slice().sort((a, b) => a - b)[Math.floor(xs.length / 2)]
const time = (fn) => { const t = process.hrtime.bigint(); const s = fn(); return [Number(process.hrtime.bigint() - t) / 1e6, s] }
const REPS = 300
const bench = (make) => () => {
  let sink = 0
  for (let r = 0; r < REPS; r += 1) sink += deutschJozsa(N, make(HIDDEN)) === 'balanced' ? 1 : 0
  return sink
}
const runs = { hexbit: bench(hexbitOracle), array: bench(arrayOracle) }
for (const f of Object.values(runs)) { f(); f() }
const out = { hexbit: [], array: [] }
const sinks = new Set()
for (let t = 0; t < 9; t += 1) {
  for (const [k, f] of Object.entries(runs)) { const [d, s] = time(f); out[k].push(d); sinks.add(s) }
}
console.log()
if (sinks.size !== 1) {
  console.error('  the two oracles produced different verdicts — refusing to compare their speed')
  process.exit(1)
}
const mh = med(out.hexbit)
const ma = med(out.array)
const lo = (xs) => Math.min(...xs)
const hi = (xs) => Math.max(...xs)
const overlap = lo(out.hexbit) <= hi(out.array) && lo(out.array) <= hi(out.hexbit)
console.log(`  simulating it ${REPS} times, ${SIZE} oracle evaluations each:`)
console.log(`    array oracle   ${ma.toFixed(2).padStart(7)}ms  [${lo(out.array).toFixed(2)}–${hi(out.array).toFixed(2)}]`)
console.log(`    hexbit oracle  ${mh.toFixed(2).padStart(7)}ms  [${lo(out.hexbit).toFixed(2)}–${hi(out.hexbit).toFixed(2)}]`)
console.log(`    ${overlap ? 'TIE — the ranges overlap, so neither is the winner' : `hexbit is ${(ma / mh).toFixed(2)}x faster`}`)

// A NULL NEEDS EXPLAINING OR IT IS JUST A SHRUG. If the two forms tie, the
// oracle is not where the time goes, and that is measurable rather than
// arguable: time the oracles alone against the whole simulation.
const oracleOnly = (make) => () => {
  const f = make(HIDDEN)
  let sink = 0
  for (let r = 0; r < REPS; r += 1) for (let x = 0; x < SIZE; x += 1) sink += f(x)
  return sink
}
const oh = med(Array.from({ length: 9 }, () => time(oracleOnly(hexbitOracle))[0]))
const oa = med(Array.from({ length: 9 }, () => time(oracleOnly(arrayOracle))[0]))
console.log()
console.log('  where the time actually goes, same workload:')
console.log(`    the ${SIZE * REPS} oracle calls alone   array ${oa.toFixed(2)}ms   hexbit ${oh.toFixed(2)}ms`)
console.log(`    the full simulation              array ${ma.toFixed(2)}ms   hexbit ${mh.toFixed(2)}ms`)
console.log(`    so the oracle is ${(100 * oa / ma).toFixed(1)}% of the array run and ${(100 * oh / mh).toFixed(1)}% of the hexbit one.`)
console.log(`    ${N} Hadamard layers over ${SIZE} complex amplitudes dominate, and packing the`)
console.log('    ORACLE cannot move work that is not in the oracle. The hexbit form wins')
console.log('    where the packed operation IS the work — a 4x margin on all-pairs lattice')
console.log('    distance — and ties where it is a rounding error on something else.')

// Bernstein-Vazirani recovers the hidden string in one query; checked because a
// separation nobody verifies is a separation nobody has.
const recovered = bernsteinVazirani(N, HIDDEN)
console.log()
console.log(`  Bernstein-Vazirani recovers ${recovered.toString(2).padStart(N, '0')} in 1 query `
  + `(${recovered === HIDDEN ? 'matches the hidden string' : 'DOES NOT MATCH — ' + HIDDEN.toString(2)}); classical needs ${N}.`)
if (recovered !== HIDDEN) process.exit(1)

const dj = SEPARATIONS.find((s) => s.algorithm === 'Deutsch-Jozsa')
console.log()
console.log(`  the repository's own standing for this separation: ${dj?.standing}`)
console.log(`  ${dj?.note}`)
console.log()
console.log('hexbit:advantage ok — the separation is in QUERIES and is unchanged by representation;')
console.log('                     hexbits move only the constant on the 2^n evaluations a simulator pays.')
