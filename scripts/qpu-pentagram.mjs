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
 *   npm run qpu:pentagram
 */
import { execFileSync } from 'node:child_process'
import { cpus, totalmem, freemem } from 'node:os'
import { statfsSync } from 'node:fs'

const BYTES_PER_AMP = 16          // two float64: the floor for any complex layout
const widthFor = (bytes) => Math.floor(Math.log2(bytes / BYTES_PER_AMP))
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
console.log(`  (a state of n qubits is 2^n amplitudes at ${BYTES_PER_AMP} bytes — two float64)\n`)
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
console.log(spillHelps
  ? `  Spilling to disk would reach ${storageWidth}, at enormous cost per gate.`
  : `  Spilling to disk reaches ${storageWidth}, which is FEWER: only ${size(storageFree)} is free, less than`)
if (!spillHelps) console.log(`  the ${size(ram)} of RAM. On this machine storage is not an extension, it is a step down.`)
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

console.log('\nqpu:pentagram ok — five points measured, the binding one named, the exponent untouched.')
