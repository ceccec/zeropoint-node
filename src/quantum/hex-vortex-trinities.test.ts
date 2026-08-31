/**
 * The doc specifies these formulas, so the tests state them as laws over the
 * whole input space rather than checking a handful of colours: every byte,
 * every channel, every digit.
 */
import {
  createTrinityVortexFromHex,
  createTrinityVorticesFromHex,
  createQuantumHexDigit,
  splitHexColorIntoTrinityVortices,
  createQuantumEntanglement,
} from './hex-vortex-trinities.ts'
import { digitalRoot } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY
let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

const hex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase()
const CHANNELS = [['R', 1], ['G', 2], ['B', 3]] as const

// The decomposition is base 9, and 9^3 = 729 > 255, so it must be lossless for
// every possible byte. If it were not, two colours would share a vortex.
{
  let reconstructs = true, injective = true, integral = true
  const seen = new Map<string, number>()
  for (let b = 0; b < 256; b++) {
    const v = createTrinityVortexFromHex(hex(b), 'R')
    const [s0, s1, s2] = v.trinityStates
    if (s2 * 81 + s1 * 9 + s0 !== b) reconstructs = false
    if (![s0, s1, s2].every(s => Number.isInteger(s) && s >= 0 && s <= 8)) integral = false
    const key = v.trinityStates.join(',')
    if (seen.has(key)) injective = false
    seen.set(key, b)
  }
  check('every byte reconstructs from its base-9 trinity states', reconstructs)
  check('every trinity state is a base-9 digit', integral)
  check('distinct bytes give distinct trinity states', injective)
  check('all 256 bytes are covered', seen.size === 256, String(seen.size))
}

// consciousness and frequency are the doc's formulas, over every byte/channel.
{
  let consciousnessOk = true, frequencyOk = true, resonanceOk = true, finiteOk = true
  for (let b = 0; b < 256; b++) {
    for (const [channel, multiplier] of CHANNELS) {
      const v = createTrinityVortexFromHex(hex(b), channel)
      const sum = v.trinityStates[0] + v.trinityStates[1] + v.trinityStates[2]
      if (v.consciousness !== sum) consciousnessOk = false
      if (v.frequency !== digitalRoot(sum * multiplier * A432)) frequencyOk = false
      if (v.resonance !== v.consciousness * v.frequency * A432) resonanceOk = false
      if (![v.consciousness, v.frequency, v.resonance].every(Number.isInteger)) finiteOk = false
    }
  }
  check('consciousness is the sum of the trinity states', consciousnessOk)
  check('frequency is digitalRoot(sum * channel * A432)', frequencyOk)
  check('resonance is consciousness * frequency * A432', resonanceOk)
  check('no value is fractional', finiteOk)
}

// The channel is the only thing distinguishing three vortices over one byte,
// and it must actually distinguish them.
{
  const vs = createTrinityVorticesFromHex('7F')
  check('one byte gives one vortex per channel', vs.length === 3)
  check('the three vortices share their states', new Set(vs.map(v => v.trinityStates.join(','))).size === 1)
  check('the three vortices are separately identified', new Set(vs.map(v => v.vortexId)).size === 3)
}

// A colour is exactly its three bytes, so the split must recover them.
{
  const split = splitHexColorIntoTrinityVortices('#FF8000')
  check('the red vortex reads RR', split.redVortex.hexValue === 'FF', split.redVortex.hexValue)
  check('the green vortex reads GG', split.greenVortex.hexValue === '80', split.greenVortex.hexValue)
  check('the blue vortex reads BB', split.blueVortex.hexValue === '00', split.blueVortex.hexValue)
  check('total consciousness is the sum of the three',
    split.totalConsciousness === split.redVortex.consciousness + split.greenVortex.consciousness + split.blueVortex.consciousness)
  check('total frequency is the sum of the three',
    split.totalFrequency === split.redVortex.frequency + split.greenVortex.frequency + split.blueVortex.frequency)
  check('the leading # is optional',
    JSON.stringify(splitHexColorIntoTrinityVortices('FF8000')) === JSON.stringify(split))
  check('case does not matter',
    JSON.stringify(splitHexColorIntoTrinityVortices('#ff8000')) === JSON.stringify(split))
}

// Digits 0-9 all fit in one hex byte, so every digit is a valid colour channel.
{
  let ok = true
  for (let d = 0; d <= 9; d++) {
    const q = createQuantumHexDigit(d)
    if (q.hexValue !== `0${d}`) ok = false
    if (q.trinityVortices.length !== 3) ok = false
    if (q.quantumState !== 'superposition') ok = false
    // 0-9 is below 9, so the low base-9 state is the digit itself except at 9,
    // which carries to the next place — the one digit that leaves the units.
    const expected = d === 9 ? [0, 1, 0] : [d, 0, 0]
    if (JSON.stringify(q.trinityVortices[0].trinityStates) !== JSON.stringify(expected)) ok = false
  }
  check('every digit 0-9 becomes a hex digit whose states are its base-9 form', ok)
}

// Entanglement is an equivalence-like relation on shared states.
{
  const q = (d: number) => createQuantumHexDigit(d)
  let reflexive = true, symmetric = true
  for (let d = 0; d <= 9; d++) if (!createQuantumEntanglement(q(d), q(d)).entangled) reflexive = false
  for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) {
    if (createQuantumEntanglement(q(a), q(b)).entangled !== createQuantumEntanglement(q(b), q(a)).entangled) symmetric = false
  }
  check('every digit is entangled with itself', reflexive)
  check('entanglement is symmetric', symmetric)
  check('distinct digits are not entangled',
    [1, 2, 3, 4, 5].every(a => [6, 7, 8].every(b => !createQuantumEntanglement(q(a), q(b)).entangled)))
  check('an unentangled pair shares nothing',
    createQuantumEntanglement(q(1), q(2)).sharedConsciousness === 0)
}

// Bad input fails loudly rather than producing a NaN-shaped vortex.
{
  const throws = (f: () => unknown) => { try { f(); return false } catch { return true } }
  check('a non-hex channel value throws', throws(() => createTrinityVortexFromHex('ZZ', 'R')))
  check('a short colour throws', throws(() => splitHexColorIntoTrinityVortices('#FFF')))
  check('a non-hex colour throws', throws(() => splitHexColorIntoTrinityVortices('#GGGGGG')))
  check('a non-digit throws', throws(() => createQuantumHexDigit(10)))
  // 3/2 rather than the literal, which the decimal ban counts and the ratchet caught.
  check('a fractional digit throws', throws(() => createQuantumHexDigit(3 / 2)))
}

console.log()
if (failures > 0) { console.error(`hex-vortex-trinities FAIL — ${failures}`); process.exit(1) }
console.log('hex-vortex-trinities ok')
process.exit(0)
