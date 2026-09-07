#!/usr/bin/env node
/**
 * The QPU is the pentagram — CPU, GPU, RAM, CACHE, STORAGE — and each point
 * carries the state to a different width.
 *
 * A PRIOR MEASUREMENT HERE WAS WRONG BY OMISSION. qpu-reality.mjs grew a
 * register on one thread until a gate sweep missed a two-second budget, got 19
 * qubits, and called that "full quantum capacity on this machine". It had
 * measured ONE point of five and reported the result as the machine's. Ten
 * cores, thirty-two GPU cores, 32 GiB of memory, 12 MiB of L2 and 28 GiB of
 * free disk were all sitting outside the number.
 *
 * So each point is given its own limit in qubits, and the binding one is named.
 * A state of n qubits is 2^n complex amplitudes; at 16 bytes per amplitude —
 * two doubles, the floor for any representation carrying real and imaginary
 * parts — the width a capacity C supports is log2(C / 16).
 *
 * WHAT THIS IS NOT. None of the five is quantum hardware, and the exponent is
 * untouched by all of them together: every point buys a constant or a few
 * qubits, and each qubit doubles the state. Thirty-two gibibytes buys 31
 * qubits; a 300-qubit register has more amplitudes than the observable universe
 * has atoms. The pentagram is the honest ceiling of a classical machine, not a
 * route around the exponential.
 *
 * AND THE SAME OMISSION HAPPENED AGAIN, ONE LEVEL UP. Five points were
 * measured and a sixth axis was TYPED: BYTES_PER_AMP = 16, "two float64, the
 * floor for any representation carrying real and imaginary parts". That is a
 * true floor and it is not this repository's cost. The shipped simulator stores
 * `Complex[]` — an array of objects, not a Float64Array — and one amplitude
 * costs about 48 bytes, three times the floor. So every width printed here was
 * the width of a representation nobody ships, and the error is the same shape
 * as the one the file already documents twice: a number measured on one thing
 * and reported as the capacity of another.
 *
 * The representation is now MEASURED, for all three this repository ships, and
 * it turns out to be the largest lever of the lot. The same memory holds 29
 * qubits as a state vector or about 113,000 as a stabilizer tableau, because a
 * tableau is quadratic in n and a state vector is exponential. That factor is
 * bigger than every point of the pentagram put together, and the pentagram
 * never had an axis for it.
 *
 * THE TABLEAU IS NOT A FREE LUNCH AND IS NOT REPORTED AS ONE. Gottesman-Knill
 * covers the CLIFFORD fragment; a circuit with t T-gates is an exact sum of 2^t
 * Clifford circuits (src/quantum/stabilizer-rank.ts), so the exponential comes
 * back in t rather than in n. What changes is WHERE the exponent sits, which is
 * the same finding capacity:check reports from the other side.
 *
 *   npm run qpu:pentagram          measure and report
 *   npm run qpu:pentagram --check  fail if a relation between them breaks
 */
import { execFileSync } from 'node:child_process'
import { cpus, totalmem, freemem } from 'node:os'
import { statfsSync, writeFileSync } from 'node:fs'
import { relative } from 'node:path'

const RECORD = new URL('../src/verification/qpu-pentagram.json', import.meta.url).pathname

/**
 * The theoretical floor, kept as the floor and no longer used as the cost:
 * two float64 is the least a complex amplitude can occupy. Every measured
 * representation is compared against it, and each one exceeds it.
 */
const BYTES_PER_AMP_FLOOR = 16

/**
 * What a representation actually costs, measured in a child process — a forced
 * collection is needed between allocations and this process cannot ask for one.
 * See scripts/lib/qpu-representations.mjs for what the measurement refuses to
 * measure and why.
 */
const REPRESENTATIONS = (() => {
  const out = execFileSync(process.execPath,
    ['--expose-gc', '--experimental-strip-types', new URL('lib/qpu-representations.mjs', import.meta.url).pathname],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] })
  return JSON.parse(out)
})()

/** Width from a capacity, for a state whose cost is 2^n units. */
const widthExponential = (bytes, perUnit) => Math.floor(Math.log2(bytes / perUnit))
/**
 * Width from a capacity, for a state whose cost is polynomial. Solved by
 * search rather than by inverting the quadratic in closed form, so that a
 * changed stabilizerBits needs no algebra here to stay correct.
 */
const widthPolynomial = (bytes, perUnit, bitsAt) => {
  // A non-positive cost per unit makes the search below unbounded: every width
  // fits, forever. It happened — mutating stabilizerBits to 2^n drove the
  // measured slope to zero and this function span until the process was
  // killed, with a corrupted source file sitting in the working tree while it
  // did. A measurement that came back as "free" is a measurement that failed.
  if (!(perUnit > 0) || !Number.isFinite(perUnit)) {
    throw new Error(`widthPolynomial: cost per unit measured as ${perUnit} — nothing is free, so the measurement is wrong`)
  }
  let lo = 1
  let hi = 1
  // Bounded by the capacity itself: a state cannot be narrower than one unit,
  // so no width past `bytes` can fit however cheap a unit is claimed to be.
  while (bitsAt(hi) * perUnit <= bytes && hi < bytes) hi *= 2
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2)
    if (bitsAt(mid) * perUnit <= bytes) lo = mid
    else hi = mid - 1
  }
  return lo
}
const stabilizerBitsAt = (n) => 2 * n * (2 * n + 1) + 2 * n

/** The float representation's measured cost — what the five points are read in. */
const BYTES_PER_AMP = REPRESENTATIONS.floatVector.bytesPerUnit
const widthFor = (bytes) => widthExponential(bytes, BYTES_PER_AMP)
const sysctl = (key) => {
  try { return Number(execFileSync('sysctl', ['-n', key], { encoding: 'utf8' }).trim()) } catch { return 0 }
}
// Units that suit the magnitude. Printing a 128 KiB cache as "0.0 GiB" makes
// three of the five points read as nothing at all.
const size = (b) => {
  if (b >= 1024 ** 3) return `${(b / 1024 ** 3).toFixed(1)} GiB`
  if (b >= 1024 ** 2) return `${(b / 1024 ** 2).toFixed(1)} MiB`
  return `${(b / 1024).toFixed(0)} KiB`
}

// ── the five points, measured rather than assumed ───────────────────────────
const cores = cpus().length
const ram = totalmem()
const free = freemem()
const l1d = sysctl('hw.perflevel0.l1dcachesize') || sysctl('hw.l1dcachesize')
const l2 = sysctl('hw.perflevel0.l2cachesize') || sysctl('hw.l2cachesize')
let storageFree = 0
try { const s = statfsSync('/'); storageFree = s.bavail * s.bsize } catch { storageFree = 0 }

let gpuCores = 0
let gpuName = 'unknown'
try {
  const out = execFileSync('system_profiler', ['SPDisplaysDataType'], { encoding: 'utf8', timeout: 20000 })
  gpuName = (out.match(/Chipset Model:\s*(.+)/)?.[1] ?? 'unknown').trim()
  gpuCores = Number(out.match(/Total Number of Cores:\s*(\d+)/)?.[1] ?? 0)
} catch { /* no profiler: reported as unknown rather than guessed */ }

const points = [
  {
    name: 'CACHE (L1d)', capacity: l1d, width: widthFor(l1d),
    note: 'the widest state that never leaves the fastest memory',
  },
  {
    name: 'CACHE (L2)', capacity: l2, width: widthFor(l2),
    note: 'beyond this every gate sweep is a trip to main memory',
  },
  {
    name: 'RAM (free)', capacity: free, width: widthFor(free),
    note: 'what is actually available now, not what is installed',
  },
  {
    name: 'RAM (total)', capacity: ram, width: widthFor(ram),
    note: 'the ceiling if nothing else were running',
  },
  {
    name: 'STORAGE (free)', capacity: storageFree, width: widthFor(storageFree),
    note: 'reachable only by spilling the state to disk, at enormous cost per gate',
  },
]

console.log('  the pentagram, each point measured and converted to qubits')
console.log(`  (a state of n qubits is 2^n amplitudes at ${BYTES_PER_AMP.toFixed(1)} bytes — MEASURED for the`)
console.log(`   shipped Complex[] simulator, against a ${BYTES_PER_AMP_FLOOR}-byte floor for two float64)\n`)
for (const p of points) {
  console.log(`    ${p.name.padEnd(15)} ${size(p.capacity).padStart(9)}   ${String(p.width).padStart(2)} qubits   ${p.note}`)
}
console.log(`    ${'CPU'.padEnd(15)} ${String(cores).padStart(7)} cores   —          divides the TIME per sweep, never the state`)
console.log(`    ${'GPU'.padEnd(15)} ${String(gpuCores).padStart(7)} cores   —          ${gpuName}; same: parallel width, not more state`)

/**
 * ── which point binds ──────────────────────────────────────────────────────
 *
 * COMPUTED, NOT NAMED. This announced "BINDING POINT: memory — N qubits in RAM"
 * unconditionally, two lines after computing `spillHelps` to ask whether
 * storage reaches further. On this machine RAM does bind, so the sentence was
 * true and it was not derived: a machine with a large disk and modest memory
 * would have been told its binding point was RAM and, in the next line, that
 * spilling to disk reaches further — the announcement contradicting the
 * comparison directly above it.
 *
 * The binding point is the WIDEST of the points that can actually hold a state.
 * Cache cannot hold one that outgrows it, so the candidates are the two that
 * can: memory and storage. Whichever is wider is named, and the reflection
 * below reads the same computed value rather than reaching for RAM by name.
 */
const holders = points.filter((p) => p.name === 'RAM (total)' || p.name.startsWith('STORAGE'))
const binding = holders.reduce((widest, p) => (p.width > widest.width ? p : widest))
const storageWidth = points.find((p) => p.name.startsWith('STORAGE')).width
const ramWidth = points.find((p) => p.name === 'RAM (total)').width
const spillHelps = storageWidth > ramWidth
console.log(`\n  BINDING POINT: ${binding.name} — ${binding.width} qubits.`)
/**
 * Three cases, not two. This printed "which is FEWER" whenever storage was not
 * strictly wider — including when the two are EQUAL, which is what happened the
 * moment the amplitude cost stopped being 16 bytes and both widths landed on
 * 29. A comparison with three outcomes reporting two is the same defect as a
 * check with one arm: it is right about the case it was written on and says
 * something false about the one it was not.
 */
if (spillHelps) {
  console.log(`  Spilling to disk would reach ${storageWidth}, at enormous cost per gate.`)
} else if (storageWidth === ramWidth) {
  console.log(`  Spilling to disk reaches ${storageWidth} — the SAME width, because ${size(storageFree)} free and`)
  console.log(`  ${size(ram)} of RAM fall inside one doubling. Every gate sweep would pay disk latency`)
  console.log('  to buy nothing at all.')
} else {
  console.log(`  Spilling to disk reaches ${storageWidth}, which is FEWER: only ${size(storageFree)} is free, less than`)
  console.log(`  the ${size(ram)} of RAM. On this machine storage is not an extension, it is a step down.`)
}
console.log('  CPU and GPU add no qubits at all — parallelism divides the time one sweep')
console.log('  takes and leaves the state exactly the size it was. Ten cores and thirty-two')
console.log('  GPU cores together move a constant.')

// ── what the earlier single-thread number actually measured ─────────────────
console.log('\n  the earlier figure of 19 qubits was a TIME budget on ONE thread, not a')
console.log(`  capacity. The state at 19 qubits is ${size(2 ** 19 * BYTES_PER_AMP)} — nowhere near any of the`)
console.log('  five limits above. What ran out was two seconds of one core, and the fix')
console.log('  for that is the CPU point of the pentagram, which the measurement omitted.')

// ── the part no point of the pentagram changes ──────────────────────────────
const universeAtoms = 1e80
const at300 = 2 ** 300
console.log('\n  AND THE EXPONENT IS UNTOUCHED BY ALL FIVE.')
console.log(`    every qubit added DOUBLES the state, so each point buys a fixed few:`)
console.log(`    L1d to RAM is a factor of ${(ram / l1d).toExponential(1)} in bytes and ${ramWidth - widthFor(l1d)} qubits.`)
console.log(`    a 300-qubit register is 2^300 ≈ ${at300.toExponential(1)} amplitudes, against roughly`)
console.log(`    ${universeAtoms.toExponential(0)} atoms in the observable universe. No arrangement of these five`)
console.log('    reaches it, which is the entire argument for quantum hardware.')
/**
 * THE REFLECTION OF "CPU AND GPU DIVIDE THE TIME" IS FTL, AND IT IS ARITHMETIC.
 *
 * The five points above bound the STATE. The measurement then says CPU and GPU
 * add no qubits and only divide the time one sweep takes — which invites the
 * question the repository's own vocabulary is built for: what is that
 * statement's reflection? `throughVoid` is an involution and so is this one.
 * Dividing a time is multiplying a rate, and rates have a ceiling.
 *
 * One gate sweep at the binding point touches every amplitude. If touching an
 * amplitude requires one signal across a distance d, no arrangement of
 * processors finishes the sweep faster than d/c per amplitude, and P processors
 * divide that by P and no further: at P equal to the number of amplitudes each
 * processor holds one, and beyond that the division would need a signal to
 * cross d in less than d/c. That is the reflection, and it is not a metaphor —
 * it is the same c that this repository's closed-arithmetic theorems carry, the
 * one that justifies the float ban.
 *
 * d IS AN ASSUMPTION AND IS LABELLED AS ONE. Nothing here measures the physical
 * span of this machine, so the bound is stated as a function of d and evaluated
 * at reference distances. c is exact by definition of the metre and is not a
 * measurement at all.
 */
const C_M_PER_S = 299_792_458
const amplitudesAtBinding = 2 ** binding.width
console.log('\n  THE REFLECTION: dividing time terminates, and the wall is c.')
console.log(`    one sweep at the binding point touches ${amplitudesAtBinding.toExponential(2)} amplitudes (${binding.width} qubits at ${binding.name})`)
console.log('')
console.log('       signalling d   light crosses d   serial sweep floor   at 10 cores   division ends at')
const reflection = []
for (const d of [1 / 1000, 1 / 100, 1 / 10]) {
  const crossS = d / C_M_PER_S
  const serialS = amplitudesAtBinding * crossS
  reflection.push({
    metres: d,
    lightCrossingS: crossS,
    serialSweepS: serialS,
    atTenCoresS: serialS / 10,
    processorsAtWhichDivisionEnds: amplitudesAtBinding,
  })
  console.log(`    ${String((d * 1000).toFixed(0) + ' mm').padStart(12)}   ${(crossS * 1e12).toFixed(1).padStart(11)} ps   `
    + `${(serialS * 1000).toFixed(1).padStart(15)} ms   ${(serialS * 100).toFixed(1).padStart(8)} ms   `
    + `${amplitudesAtBinding.toExponential(2)} cores`)
}
console.log('')
console.log('    Past that core count every further division asks a signal to cross d in less')
console.log('    than d/c. The reflection of "parallelism divides the time" is "and the quotient')
console.log('    stops at the speed of light" — an involution, not a limit that engineering moves.')
console.log('    CPU and GPU add no state; they divide a time that has a floor. Both halves bound.')


/**
 * ── THE SIXTH AXIS: THE REPRESENTATION ──────────────────────────────────────
 *
 * The five points bound a capacity in BYTES. What that buys in QUBITS depends
 * on what a state costs, and this file used to answer that with a typed 16.
 * Three representations ship here and all three exceed the floor, so the axis
 * that was assumed constant is both measured and the widest lever present.
 */
const bindingBytes = binding.capacity
const reps = [
  {
    name: 'state vector (float)',
    module: 'src/quantum/simulator.ts',
    per: REPRESENTATIONS.floatVector.bytesPerUnit,
    unit: 'amplitude',
    width: widthExponential(bindingBytes, REPRESENTATIONS.floatVector.bytesPerUnit),
    law: '2^n amplitudes',
    covers: 'any circuit, approximately — amplitudes are binary floating point',
  },
  {
    name: 'state vector (exact)',
    module: 'src/quantum/exact.ts',
    per: REPRESENTATIONS.exactVector.bytesPerUnit,
    unit: 'amplitude',
    width: widthExponential(bindingBytes, REPRESENTATIONS.exactVector.bytesPerUnit),
    law: '2^n amplitudes',
    covers: 'Clifford+T exactly, in Z[zeta8] — no rounding at any width',
  },
  {
    name: 'stabilizer tableau',
    module: 'src/quantum/stabilizer.ts',
    per: REPRESENTATIONS.stabilizerTableau.bytesPerUnit,
    unit: 'tableau bit',
    width: widthPolynomial(bindingBytes, REPRESENTATIONS.stabilizerTableau.bytesPerUnit, stabilizerBitsAt),
    law: '2n(2n+1)+2n bits — QUADRATIC',
    covers: 'the CLIFFORD fragment only. T gates cost 2^t branches, not width',
  },
]
console.log('\n  THE SIXTH AXIS: THE REPRESENTATION, which this file used to type as 16 bytes.')
console.log(`  Measured cost of one unit of state, and the width ${size(bindingBytes)} at the binding`)
console.log('  point buys in each:\n')
for (const r of reps) {
  console.log(`    ${r.name.padEnd(21)} ${r.per.toFixed(2).padStart(7)} B / ${r.unit.padEnd(12)} ${String(r.width).padStart(7)} qubits   ${r.law}`)
}
console.log('')
for (const r of reps) console.log(`    ${r.name.padEnd(21)} ${r.covers}`)

const widest = reps.reduce((w, r) => (r.width > w.width ? r : w))
const narrowest = reps.reduce((w, r) => (r.width < w.width ? r : w))
const representationFactor = widest.width / narrowest.width
console.log('')
console.log(`  The same ${size(bindingBytes)} holds ${narrowest.width} qubits or ${widest.width}, a factor of ${representationFactor.toFixed(0)} in width,`)
console.log('  decided entirely by how the state is written down. Every point of the')
console.log(`  pentagram together spans ${ramWidth - widthFor(l1d)} qubits, from L1d to RAM. THE REPRESENTATION IS`)
console.log('  THE LARGER LEVER, and it was the one axis here that was never measured.')
console.log('')
console.log('  It is not a route around the exponential either, and is not reported as one:')
console.log('  a tableau covers the Clifford fragment, and a circuit with t T-gates is an')
console.log('  exact sum of 2^t Clifford circuits (src/quantum/stabilizer-rank.ts). The')
console.log('  exponent moves from n to t. Where it sits is a property of the')
console.log('  REPRESENTATION AND THE FRAGMENT, never of the work being quantum.')

/**
 * The zero state is not a state, and the control says so out loud. Left in the
 * output rather than in a comment because it is the reason the numbers above
 * are what they are: measured on |0...0>, exact arithmetic reports 5.97 bytes
 * an amplitude, which would have made it the CHEAPEST representation here.
 */
const zc = REPRESENTATIONS.controls
console.log('')
console.log('  CONTROL — the same measurement taken on the zero state, which is not one:')
console.log(`    exact on |0...0>  ${zc.exactZeroState.toFixed(2)} B/amplitude against ${REPRESENTATIONS.exactVector.bytesPerUnit.toFixed(2)} spread — `
  + `${(REPRESENTATIONS.exactVector.bytesPerUnit / zc.exactZeroState).toFixed(1)}x low, because`)
console.log('    2^n slots hold one shared ZERO object and the measurement counts pointers.')
console.log(`    float on |0...0>  ${zc.floatZeroState.toFixed(2)} B/amplitude against ${REPRESENTATIONS.floatVector.bytesPerUnit.toFixed(2)} spread.`)
console.log('    Measured on the zero state, exact arithmetic would read as the cheapest')
console.log('    representation on this page. It is the most expensive.')

/**
 * ── --check ─────────────────────────────────────────────────────────────────
 *
 * RELATIONS, NOT NUMBERS. Every figure above depends on the machine, so a gate
 * pinning 29 qubits or 47.6 bytes would fail on every other computer and mean
 * nothing on this one. What does not depend on the machine is the ORDER of the
 * quantities, and each relation below fails for a different real reason.
 */
if (process.argv.includes('--check')) {
  const failures = []
  const assert = (ok, what, saw) => { if (!ok) failures.push(`${what} — measured ${saw}`) }

  // Switching the simulator to a Float64Array pair would make this false, and
  // then the floor IS the cost and the sentence above must change with it.
  assert(REPRESENTATIONS.floatVector.bytesPerUnit > BYTES_PER_AMP_FLOOR,
    'the shipped float amplitude should cost MORE than the two-float64 floor',
    `${REPRESENTATIONS.floatVector.bytesPerUnit.toFixed(2)} against ${BYTES_PER_AMP_FLOOR}`)

  // Exact amplitudes are bigints. If they ever measured cheaper than floats,
  // the spread state is not spread and the measurement is on pointers again.
  assert(REPRESENTATIONS.exactVector.bytesPerUnit > REPRESENTATIONS.floatVector.bytesPerUnit,
    'exact amplitudes should cost more than float amplitudes',
    `${REPRESENTATIONS.exactVector.bytesPerUnit.toFixed(2)} against ${REPRESENTATIONS.floatVector.bytesPerUnit.toFixed(2)}`)

  // The control that keeps the control honest: the zero state must read as
  // dramatically cheaper, or it has stopped being the artifact it is here to
  // demonstrate and these numbers were taken on the wrong subject.
  assert(REPRESENTATIONS.exactVector.bytesPerUnit > zc.exactZeroState * 4,
    'the exact zero state should measure far cheaper than a spread state — that artifact is the whole reason the spread state is used',
    `${REPRESENTATIONS.exactVector.bytesPerUnit.toFixed(2)} against ${zc.exactZeroState.toFixed(2)}`)

  /**
   * Gottesman-Knill, as something this machine checks rather than cites.
   *
   * THE FIRST VERSION OF THIS ASSERTED THAT THE TABLEAU IS WIDE, AND A
   * MUTATION SURVIVED IT. Replacing stabilizerBits with 2^n drove the fitted
   * cost per bit to nearly zero, blew the reported width up to 34 BILLION
   * qubits, and every relation here still passed — because they all said the
   * tableau reaches far, and a broken cost law made it reach further. The
   * property was monotone under the mutation, which is exactly the trap: a
   * check run on the quantity a change moves, in the direction it moves it,
   * cannot catch that change.
   *
   * So the LAW is checked instead of the magnitude. The slope is fitted from
   * two widths and used to predict a THIRD that the fit never saw. Fitting a
   * line through two points always succeeds; predicting the held-out one is
   * the part that can fail, and under the mutation it fails by a factor of
   * 10^170 — the claimed unit count and the bytes actually allocated stop
   * having anything to do with each other.
   */
  for (const [label, rep, bitsAt] of [
    ['float state vector', REPRESENTATIONS.floatVector, (n) => 2 ** n],
    ['exact state vector', REPRESENTATIONS.exactVector, (n) => 2 ** n],
    ['stabilizer tableau', REPRESENTATIONS.stabilizerTableau, stabilizerBitsAt],
  ]) {
    const held = rep.heldOut
    const predicted = rep.bytesPerUnit * bitsAt(held.n)
    const ratio = predicted / held.bytes
    assert(ratio > 1 / 2 && ratio < 2,
      `${label}: the cost law fitted on two widths should predict the held-out width within a factor of two`,
      `predicted ${predicted.toExponential(2)} B at n=${held.n}, allocated ${held.bytes.toExponential(2)} B — off by ${ratio.toExponential(2)}x`)
  }

  // And nothing is free. A representation measured at effectively zero cost per
  // unit has not been measured; it is the same failure as a timing gate reading
  // zero because the work was optimised away.
  for (const r of reps) {
    assert(r.per > 1 / 8 && r.per < 1024,
      `${r.name}: cost per ${r.unit} should be a plausible number of bytes`,
      `${r.per.toExponential(3)} B`)
  }

  // The ordering, kept as well — it is the finding, and it is now guarded by
  // the law checks above rather than standing alone.
  assert(widest.name === 'stabilizer tableau' && widest.width > narrowest.width * 100,
    'the tableau should reach orders of magnitude past any state vector at the same capacity',
    `${widest.name} at ${widest.width} against ${narrowest.width}`)

  // The finding this upgrade exists for: the axis that was typed outweighs the
  // five that were measured. If that ever stops being true, the headline goes.
  assert(representationFactor > (ramWidth - widthFor(l1d)),
    'the representation should be a larger lever than the whole pentagram',
    `factor ${representationFactor.toFixed(0)} against ${ramWidth - widthFor(l1d)} qubits`)

  // Fail closed. A run that measured nothing prints the same green as one that
  // measured everything, which is the failure mode every gate here guards.
  assert(reps.length === 3 && reps.every((r) => Number.isFinite(r.per) && r.per > 0),
    'three representations should have been measured with a positive cost each',
    `${reps.length} representations`)

  if (failures.length) {
    console.error(`\nqpu:pentagram:check FAIL — ${failures.length} relation(s) broke:`)
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
  }
  console.log(`\nqpu:pentagram:check ok — every relation holds across ${reps.length} measured representations, including the held-out prediction of each cost law`)
}

/**
 * ── THE RECORD ──────────────────────────────────────────────────────────────
 *
 * Written so no page has to retype a measurement. docs/QUANTUM_COMPUTER.md
 * said "a state vector stops at about 31 qubits" as a LITERAL, and the number
 * became wrong the moment the amplitude cost stopped being the typed 16 — the
 * page kept saying 31 while this file computed 29. A hand-written copy of a
 * measurement is the defect this repository keeps finding.
 *
 * --check does not write: a corrupted record must FAIL rather than be quietly
 * regenerated by the thing that checks it.
 */
const record = {
  what: 'The QPU as six axes: five machine resources and the representation the state is written in.',
  doesNotEstablish:
    'that any of this is quantum hardware, or that the exponential is avoidable. The tableau'
    + ' width applies to the CLIFFORD fragment only; a circuit with t T-gates is an exact sum of'
    + ' 2^t Clifford circuits, so the exponent moves from n to t rather than disappearing.',
  machine: { cores, gpuCores, gpuName, ramBytes: ram, freeBytes: free, l1dBytes: l1d, l2Bytes: l2, storageFreeBytes: storageFree },
  bytesPerAmplitudeFloor: BYTES_PER_AMP_FLOOR,
  points: points.map((p) => ({ name: p.name, capacity: p.capacity, width: p.width })),
  binding: { name: binding.name, width: binding.width, capacity: binding.capacity },
  representations: reps.map((r) => ({
    name: r.name, module: r.module, bytesPerUnit: r.per, unit: r.unit, width: r.width, law: r.law, covers: r.covers,
  })),
  widest: { name: widest.name, width: widest.width },
  narrowest: { name: narrowest.name, width: narrowest.width },
  representationFactor,
  pentagramSpanQubits: ramWidth - widthFor(l1d),
  controls: REPRESENTATIONS.controls,
}
if (!process.argv.includes('--check')) {
  writeFileSync(RECORD, JSON.stringify(record, null, 2) + '\n')
  console.log(`\n  wrote ${relative(process.cwd(), RECORD)}`)
}

console.log('\nqpu:pentagram ok — six axes measured, the binding point named, the exponent relocated but never removed.')
