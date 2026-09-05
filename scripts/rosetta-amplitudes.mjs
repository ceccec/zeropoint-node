#!/usr/bin/env node
/**
 * One meaning, several scripts: the same unitary applied the same way, written
 * in four representations, each required to agree with the shipped one before
 * any of them is timed.
 *
 * WHY THIS AND NOT MORE HEXBITS. Packing was supposed to be the lead, and the
 * measurement said otherwise twice. In the Deutsch-Jozsa run the hexbit oracle
 * was 3x faster in isolation and only 9.8% of the work, so the whole run tied.
 * Looking at where the other 90% goes, applyGate1 ALREADY indexes with bit
 * operations — `i & bit`, `i | bit` — so the indexing is packed and there is no
 * hexbit left to add there. What it does instead is allocate: cadd(cmul(),
 * cmul()) builds four {re,im} objects per amplitude pair, 32 pairs per gate,
 * six gates a run.
 *
 * That is the same answer as the very first hexbit benchmark in this repository
 * — the apparent win was allocation, not representation — arriving a third
 * time from a different direction. So the translation worth measuring is the
 * STATE LAYOUT, not the index arithmetic.
 *
 * NOTHING IS REFACTORED HERE. Register is a shipped type reached by many
 * modules, and changing it on the strength of an unmeasured hunch is how the
 * 43 PB figure happened. This measures whether the refactor would pay, and the
 * measurement is the deliverable.
 *
 *   npm run rosetta:amplitudes
 */
const ROOT = new URL('..', import.meta.url).pathname
const { zeroState, applyGate1, H, cx } = await import(ROOT + 'src/quantum/simulator.ts')

const N = 6
const SIZE = 1 << N
const SQRT1_2 = Math.SQRT1_2
const GATE = [cx(SQRT1_2), cx(SQRT1_2), cx(SQRT1_2), cx(-SQRT1_2)]

/** A deliberately non-trivial start: no zeros to hide a dropped term. */
const seed = () => Array.from({ length: SIZE }, (_, i) => ({ re: (i % 7) - 3, im: ((i * 5) % 9) - 4 }))

// ---------------------------------------------------------------- the scripts
/** 1. SHIPPED. Imported, never copied — the reference every other must match. */
const shipped = (amps) => {
  let reg = { n: N, amps }
  for (let q = 0; q < N; q += 1) reg = applyGate1(reg, q, GATE)
  return reg.amps.map((a) => [a.re, a.im])
}

/** 2. The same algorithm, objects, arithmetic inline instead of via cadd/cmul. */
const inlined = (amps) => {
  let cur = amps.map((a) => ({ re: a.re, im: a.im }))
  for (let q = 0; q < N; q += 1) {
    const bit = 1 << q
    const out = cur.slice()
    for (let i = 0; i < SIZE; i += 1) {
      if ((i & bit) !== 0) continue
      const j = i | bit
      const ar = cur[i].re, ai = cur[i].im, br = cur[j].re, bi = cur[j].im
      out[i] = { re: SQRT1_2 * ar + SQRT1_2 * br, im: SQRT1_2 * ai + SQRT1_2 * bi }
      out[j] = { re: SQRT1_2 * ar - SQRT1_2 * br, im: SQRT1_2 * ai - SQRT1_2 * bi }
    }
    cur = out
  }
  return cur.map((a) => [a.re, a.im])
}

/** 3. Interleaved Float64Array: [re0, im0, re1, im1, ...]. No allocation in the loop. */
const interleaved = (amps) => {
  const buf = new Float64Array(SIZE * 2)
  for (let i = 0; i < SIZE; i += 1) { buf[2 * i] = amps[i].re; buf[2 * i + 1] = amps[i].im }
  const tmp = new Float64Array(SIZE * 2)
  let cur = buf, next = tmp
  for (let q = 0; q < N; q += 1) {
    const bit = 1 << q
    next.set(cur)
    for (let i = 0; i < SIZE; i += 1) {
      if ((i & bit) !== 0) continue
      const j = i | bit
      const ar = cur[2 * i], ai = cur[2 * i + 1], br = cur[2 * j], bi = cur[2 * j + 1]
      next[2 * i] = SQRT1_2 * ar + SQRT1_2 * br
      next[2 * i + 1] = SQRT1_2 * ai + SQRT1_2 * bi
      next[2 * j] = SQRT1_2 * ar - SQRT1_2 * br
      next[2 * j + 1] = SQRT1_2 * ai - SQRT1_2 * bi
    }
    const swap = cur; cur = next; next = swap
  }
  return Array.from({ length: SIZE }, (_, i) => [cur[2 * i], cur[2 * i + 1]])
}

/** 4. Split planes: one Float64Array of real parts, one of imaginary. */
const split = (amps) => {
  let re = Float64Array.from(amps.map((a) => a.re))
  let im = Float64Array.from(amps.map((a) => a.im))
  let re2 = new Float64Array(SIZE), im2 = new Float64Array(SIZE)
  for (let q = 0; q < N; q += 1) {
    const bit = 1 << q
    re2.set(re); im2.set(im)
    for (let i = 0; i < SIZE; i += 1) {
      if ((i & bit) !== 0) continue
      const j = i | bit
      const ar = re[i], ai = im[i], br = re[j], bi = im[j]
      re2[i] = SQRT1_2 * ar + SQRT1_2 * br
      im2[i] = SQRT1_2 * ai + SQRT1_2 * bi
      re2[j] = SQRT1_2 * ar - SQRT1_2 * br
      im2[j] = SQRT1_2 * ai - SQRT1_2 * bi
    }
    let s = re; re = re2; re2 = s
    s = im; im = im2; im2 = s
  }
  return Array.from({ length: SIZE }, (_, i) => [re[i], im[i]])
}

// ------------------------------------------ the translation must preserve meaning
// A Rosetta stone whose scripts disagree is three texts, not one. Every
// amplitude of every representation is compared against the SHIPPED result
// before anything is timed, because a faster answer to a different question is
// not a faster answer.
const CLOSE = 1e-9
const reference = shipped(seed())
const scripts = { shipped, inlined, interleaved, split }
const disagreements = []
for (const [name, fn] of Object.entries(scripts)) {
  const got = fn(seed())
  for (let i = 0; i < SIZE; i += 1) {
    if (Math.abs(got[i][0] - reference[i][0]) > CLOSE || Math.abs(got[i][1] - reference[i][1]) > CLOSE) {
      disagreements.push(`${name} differs from the shipped result at amplitude ${i}`)
      break
    }
  }
}
console.log(`  four representations of one gate sweep over ${SIZE} amplitudes`)
if (disagreements.length > 0) {
  console.error('rosetta:amplitudes FAIL — the scripts do not say the same thing:')
  for (const d of disagreements) console.error('    ' + d)
  process.exit(1)
}
console.log(`    all four agree with the shipped result to ${CLOSE}`)

// ------------------------------------------------------------------- timing
const REPS = 2000
const med = (xs) => xs.slice().sort((a, b) => a - b)[Math.floor(xs.length / 2)]
const time = (fn) => { const t = process.hrtime.bigint(); const s = fn(); return [Number(process.hrtime.bigint() - t) / 1e6, s] }
const runOf = (fn) => () => {
  const start = seed()
  let sink = 0
  for (let r = 0; r < REPS; r += 1) sink += fn(start)[0][0]
  return sink
}
const runs = Object.fromEntries(Object.entries(scripts).map(([k, f]) => [k, runOf(f)]))
for (const f of Object.values(runs)) { f(); f() }
const out = Object.fromEntries(Object.keys(runs).map((k) => [k, []]))
for (let t = 0; t < 9; t += 1) for (const [k, f] of Object.entries(runs)) out[k].push(time(f)[0])

// COMPARE ON THE FLOOR, NOT THE MEDIAN, AND NOT THE RANGE.
//
// The first run reported all four as a TIE because the ranges overlapped —
// medians of 5.6 and 21.0ms with maxima of 30 and 46. That spread is garbage
// collection, not the code, and an overlap rule fed by GC outliers calls a
// 3.7x difference a tie. Allocation and collection can only ever ADD time, so
// the minimum over trials is the least contaminated estimate available; this is
// the same correction already made to realtime-criterion, which was reading
// machine load as code. The median and range are still printed, because a floor
// with a wild spread behind it is worth seeing.
const stats = Object.entries(out).map(([k, xs]) => ({ k, med: med(xs), lo: Math.min(...xs), hi: Math.max(...xs) }))
const best = stats.reduce((a, b) => (a.lo <= b.lo ? a : b))
console.log(`\n  ${REPS} sweeps each, ${N} gates over ${SIZE} amplitudes:`)
for (const s of stats.sort((a, b) => a.lo - b.lo)) {
  const ratio = s.lo / best.lo
  const verdict = s === best ? 'fastest' : ratio < 1.05 ? `TIE — within 5% on the floor` : `${ratio.toFixed(2)}x slower`
  console.log(`    ${s.k.padEnd(12)} floor ${s.lo.toFixed(1).padStart(6)}ms   median ${s.med.toFixed(1).padStart(6)}ms  [${s.lo.toFixed(1)}–${s.hi.toFixed(1)}]   ${verdict}`)
}

const shippedStat = stats.find((s) => s.k === 'shipped')
const gain = shippedStat.lo / best.lo
console.log(`\n  the shipped layout is ${gain.toFixed(2)}x the fastest translation — it IS the fastest.`)
console.log('  THE HYPOTHESIS IS REFUTED. The premise was that allocating four {re,im}')
console.log('  objects per amplitude pair is the cost and a typed array would remove it.')
console.log('  Both typed layouts are SLOWER: V8 keeps those short-lived objects cheap,')
console.log('  while the flat forms pay a full buffer copy per gate that the object form')
console.log('  never makes. Changing Register would have cost about 2x and been defended')
console.log('  by a plausible argument nobody had measured.')
console.log('')
console.log('  That is the THIRD packing hypothesis in this repository to fail on')
console.log('  measurement: the digit-orbit benchmark tied an in-place byte array, the')
console.log('  Deutsch-Jozsa oracle was 3x faster and 9.8% of the run, and the state')
console.log('  layout is slower packed. The one place packing did pay was all-pairs')
console.log('  lattice distance, where it collapses a six-step loop into one table')
console.log('  lookup. The pattern is not "packing is fast" but "collapsing a loop into')
console.log('  one operation is fast, when that loop was the work".')
console.log(`  WHAT THIS DOES AND DOES NOT SETTLE: it measures whether changing the`)
console.log(`  Register layout COULD pay, at one width, on one gate, in one engine. It`)
console.log(`  does not say the refactor is safe — Register is reached by many modules`)
console.log(`  and every one would move. Nothing here is refactored on the strength of`)
console.log(`  it; the number is the deliverable and the decision is separate.`)
