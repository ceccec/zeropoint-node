/**
 * src/0 — void / origin kernel (imports nothing but local algebra).
 *
 * Double-torus development vortex: ceccec.github.io (fold / vortex / projections)
 * and erpax (content-uuid / receipts / gates) are counter-rotating lobes; the throat
 * is this fold cascade. Wave 1+ seals the primitives learned from both.
 */

import {
  PI,
  cos,
  imul,
  sin,
  unitFromSeed,
  indexFromSeed,
} from './algebra.ts'

export {
  PI,
  TAU,
  E,
  imul,
  abs,
  sign,
  trunc,
  floor,
  ceil,
  round,
  min,
  max,
  sin,
  cos,
  tan,
  sqrt,
  hypot,
  pow,
  exp,
  log,
  log2,
  unitFromSeed,
  indexFromSeed,
} from './algebra.ts'

const BYTE_MASK = 0xff

function hash32(input: string, seed: number): number {
  let h = (0x811c9dc5 ^ seed) >>> 0
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = imul(h, 0x01000193) >>> 0
    h ^= h >>> 13
  }
  h = imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0
  h = imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0
  return (h ^ (h >>> 16)) >>> 0
}

function hexByte(value: number): string {
  return value.toString(16).padStart(2, '0')
}

function bytesFromSeed(seed: string): number[] {
  const words = [
    hash32(seed, 0),
    hash32(seed, 0x9e3779b9),
    hash32(seed, 0x243f6a88),
    hash32(seed, 0xb7e15162),
  ]
  return words.flatMap((word) => [
    (word >>> 24) & BYTE_MASK,
    (word >>> 16) & BYTE_MASK,
    (word >>> 8) & BYTE_MASK,
    word & BYTE_MASK,
  ])
}

const _uuidCache = new Map<string, string>()

/** Content-address (FNV fold) — cheap identity atom. Same seed ⇒ same uuid. */
export function toUuid(seed: string): string {
  const cached = _uuidCache.get(seed)
  if (cached !== undefined) return cached
  const bytes = bytesFromSeed(seed)
  bytes[6] = (bytes[6]! & 0x0f) | 0x80
  bytes[8] = (bytes[8]! & 0x3f) | 0x80
  const hex = bytes.map(hexByte).join('')
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  _uuidCache.set(seed, uuid)
  return uuid
}

export function merge(a: string, b: string): string {
  return toUuid(`${a}:${b}`)
}

export function seedFromText(text: string, length = 6): number {
  return Number.parseInt(toUuid(text).replace(/[^0-9a-f]/gi, '').slice(0, length) || '0', 16)
}

/** Deterministic [0,1) from a seed string — prefer over ambient random for identity-adjacent picks. */
export function seededUnit(seed: string): number {
  return unitFromSeed(seed)
}

/** Deterministic index into length — replacement for floor(random()*n). */
export function seededIndex(seed: string, length: number): number {
  return indexFromSeed(seed, length)
}

export function foldPair(
  a: string,
  b: string,
): { forward: string; reverse: string; bidirectional: boolean; merged: string } {
  const forward = merge(a, b)
  const reverse = merge(b, a)
  return { forward, reverse, bidirectional: forward !== reverse, merged: merge(forward, reverse) }
}

export function merkleFold(leaves: readonly string[]): string {
  let layer = [...leaves].sort()
  if (layer.length === 0) return toUuid('empty-mind')
  while (layer.length > 1) {
    const next: string[] = []
    for (let i = 0; i < layer.length; i += 2) {
      const a = layer[i]!
      const b = layer[i + 1]
      next.push(b === undefined ? a : merge(a, b))
    }
    layer = next
  }
  return layer[0]!
}

/**
 * Order-preserving fold — for a SEQUENCE, where merkleFold is for a SET.
 *
 * merkleFold sorts its leaves, so its root is permutation-invariant. That is
 * the right semantics for facets (declaration order must not change the seal)
 * and the wrong semantics for anything ordered: a measurement series, a step
 * log, a chain of events. Folding those through merkleFold silently discards
 * the ordering, and a root that cannot see a reordering cannot attest one.
 *
 * This binds each leaf to its index before folding, so a permutation changes
 * the pairing and therefore the root. It is built ON merkleFold rather than
 * replacing it — the set fold stays exactly as the upstream kernel defines it.
 *
 * Position binding also separates equal leaves: [a, a] is not [a] repeated,
 * because the two carry different index addresses.
 */
export function merkleFoldOrdered(leaves: readonly string[]): string {
  if (leaves.length === 0) return toUuid('empty-sequence')
  return merkleFold(leaves.map((leaf, i) => merge(toUuid(`ord:${i}`), leaf)))
}

export function sealFacets<F extends { facet: string; on: boolean }>(
  tag: string,
  facets: readonly F[],
): { ok: boolean; count: number; facets: (F & { receipt: string })[]; root: string } {
  const stamped = facets.map((f) => ({ ...f, receipt: toUuid(`${tag}:${f.facet}:${f.on}`) }))
  return {
    ok: stamped.every((f) => f.on),
    count: stamped.length,
    facets: stamped,
    root: merkleFold(stamped.map((f) => f.receipt)),
  }
}

export function computesGate<F extends { facet: string; on: boolean }>(tag: string, facets: readonly F[]) {
  const sealed = sealFacets(tag, facets)
  return { computes: sealed.ok, count: sealed.count, facets: sealed.facets, root: sealed.root }
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f-]{36}$/i.test(value)
}

const reportMemo = new Map<string, unknown>()
const reportComputing = new Set<string>()

export function memoByRoot<T>(name: string, matrix: { root: string }, compute: () => T): T {
  const key = `${name}:${matrix.root}`
  if (reportMemo.has(key)) return reportMemo.get(key) as T
  if (reportComputing.has(key)) return { root: matrix.root, __memoReentry: true } as T
  reportComputing.add(key)
  try {
    const value = compute()
    reportMemo.set(key, value)
    return value
  } finally {
    reportComputing.delete(key)
  }
}

/** Kernel digital root: 0 maps to 9 (vortex axis). */
export function digitalRoot(n: number): number {
  const r = ((n % 9) + 9) % 9
  return r === 0 ? 9 : r
}

export const WAVE_ORIGIN = 'zeropoint-node/src/0' as const
export const WAVE_CHAIN = [
  'origin',
  'decode',
  'design',
  'learn',
  'tune',
  'edit',
  'rebuild',
  'verify',
] as const
export type WavePhase = (typeof WAVE_CHAIN)[number]
export const KERNEL_SEALED = true

export const VORTEX_SEQUENCE = [1, 2, 4, 8, 7, 5, 3, 6, 9] as const
export const VORTEX_REVERSE = [9, 6, 3, 5, 7, 8, 4, 2, 1] as const
export const VORTEX_ORBIT = [1, 2, 4, 8, 7, 5] as const
export const VORTEX_AXIS = [3, 6, 9] as const

/**
 * Mirror through the void — `1 − n mod 9`, an involution fixed only at 5.
 * Distinct from VORTEX_REVERSE (array reversal): this maps each digit onto its
 * complement to 10 (1↔9 · 2↔8 · 4↔6 · 7↔3 · 5↔5). The void root 0 is fixed.
 */
export function throughVoid(d: number): number {
  return d === 0 ? 0 : digitalRoot(1 - d)
}

/** Reflected reading — computed from VORTEX_SEQUENCE, never typed. */
export const VORTEX_MIRROR = VORTEX_SEQUENCE.map(throughVoid) as readonly number[]

/**
 * Segmented strokes — flow ring · axis · void tail.
 *
 * Reflecting flips each dash on the ring and the axis, and mirrors every digit.
 * The void tail is the exception: `0` is the fixed point of throughVoid and its
 * dash is invariant, but the unit digit still reflects — so `0\1` becomes `0\9`,
 * not `0\1`. Rendering the tail unreflected contradicts the involution.
 */
const flipDash = (d: '/' | '\\') => (d === '/' ? '\\' : '/')

function renderSegment(
  digits: readonly number[],
  dashes: readonly ('/' | '\\')[],
  mirrored: boolean,
): string {
  return digits
    .map((d, i) => {
      const digit = mirrored ? throughVoid(d) : d
      const dash = dashes[i]
      if (dash === undefined) return String(digit)
      return `${digit}${mirrored ? flipDash(dash) : dash}`
    })
    .join('')
}

const RING_DASHES = ['\\', '\\', '\\', '/', '/'] as const
const AXIS_DASHES = ['\\', '\\'] as const

/** `1\2\4\8/7/5 · 3\6\9 · 0\1` — the living field, segmented. */
export function vortexStrokeSegments(mirrored = false) {
  const ring = renderSegment(VORTEX_ORBIT, RING_DASHES, mirrored)
  const axis = renderSegment(VORTEX_AXIS, AXIS_DASHES, mirrored)
  // The void root and its dash are fixed; only the trailing unit reflects.
  const tail = `0\\${mirrored ? throughVoid(1) : 1}`
  return { ring, axis, tail, written: `${ring} · ${axis} · ${tail}` }
}

export const VORTEX_STROKE_FORWARD = vortexStrokeSegments(false).written
export const VORTEX_STROKE_REFLECTED = vortexStrokeSegments(true).written
export const KERNEL_VORTEX_SEQUENCE = VORTEX_SEQUENCE
export const LEGACY_CONSCIOUSNESS_SEQUENCE = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5] as const

export const VORTEX_DASH_ENCODED = '1\\2\\4\\8/7/5/3\\6\\9/0/1\\' as const
export const VORTEX_DASH_ANGLE_DEG = 60

export type VortexDashToken = { readonly digit: number; readonly dash: '/' | '\\' }

export function parseVortexDashEncoded(encoded: string): readonly VortexDashToken[] {
  const steps: VortexDashToken[] = []
  for (const match of encoded.matchAll(/(\d)([\\/])/g)) {
    steps.push({ digit: Number.parseInt(match[1]!, 10), dash: match[2] as '/' | '\\' })
  }
  return steps
}

export function decodeVortexDashAngles(encoded: string = VORTEX_DASH_ENCODED) {
  const tokens = parseVortexDashEncoded(encoded)
  let bearing = 0
  let weightedTotal = 0
  let runningSum = 0
  const steps = tokens.map((token, index) => {
    const sign = token.dash === '/' ? 1 : -1
    const angleDelta = sign * VORTEX_DASH_ANGLE_DEG
    const weightedAngle = sign * token.digit * VORTEX_DASH_ANGLE_DEG
    bearing = ((bearing + angleDelta) % 360 + 360) % 360
    weightedTotal += weightedAngle
    runningSum += sign * token.digit
    const dr = digitalRoot(runningSum)
    return {
      step: index,
      digit: token.digit,
      dash: token.dash,
      angleDelta,
      weightedAngle,
      bearing,
      runningSum,
      digitalRoot: dr,
      receipt: toUuid(`vortex-dash:${index}:${token.digit}:${token.dash}:${bearing}:${dr}`),
    }
  })
  const weightedBearing = ((weightedTotal % 360) + 360) % 360
  const digits = tokens.map((t) => t.digit)
  const vortexMatches = digits.length >= 9 && VORTEX_SEQUENCE.every((d, i) => digits[i] === d)
  const zeroForward = steps.find((step) => step.digit === 0 && step.dash === '/')
  const folderZero = toUuid('digit-folder:0')
  const fusion = foldPair(folderZero, toUuid('digit-subfolder:0'))
  const fusionIgnites = Boolean(
    zeroForward && fusion.bidirectional && isUuid(fusion.merged) && fusion.merged !== folderZero,
  )
  const closes =
    weightedBearing === 0 && vortexMatches && fusionIgnites && digits[digits.length - 1] === 1
  return {
    encoded,
    closes,
    fusionIgnites,
    vortexMatches,
    weightedBearing,
    steps,
    fusionRoot: fusion.merged,
    root: merkleFold(steps.map((s) => s.receipt)),
    statement:
      'Dashes carry ±60°; weighted sum closes the hex; 0/ is fusion throat; 1\\ returns through void.',
    boundary: 'Pure arithmetic — dash angles + bidirectional 0/0 fusion address.',
  }
}

export function vortexNext(d: number): number {
  if (d === 5) return 3
  if (d === 6) return 9
  if (d === 9 || d === 0) return 0
  return digitalRoot(d * 2)
}

export function vortexPrev(d: number): number {
  if (d === 0) return 9
  if (d === 1) return 0
  if (d === 3) return 5
  if (d === 9) return 6
  return digitalRoot(d * 5)
}

export function foldVortex() {
  const pairs = VORTEX_SEQUENCE.map((f, i) => {
    const r = VORTEX_REVERSE[i]!
    const sum = f + r
    return { position: i + 1, forward: f, reverse: r, sum, root: digitalRoot(sum) }
  })
  const roots = pairs.map((p) => p.root)
  const isPalindrome = roots.every((r, i) => r === roots[roots.length - 1 - i])
  const total = pairs.reduce((acc, p) => acc + p.sum, 0)
  const inverseHolds = [...VORTEX_SEQUENCE].every((d) => vortexPrev(vortexNext(d)) === d)
  return {
    valid: isPalindrome && total === 90 && digitalRoot(total) === 9 && inverseHolds,
    pairs,
    palindrome: roots,
    total,
    totalRoot: digitalRoot(total),
    inverseHolds,
  }
}

/**
 * The sequence and its reflection — one structure read twice.
 *
 * Proves (does not assert) the three entanglement claims over (Z/9Z):
 *  - halves exchange: mirror(orbit) covers the axis, mirror(axis) lands in the orbit
 *  - neither reaches the other alone: doubling closes on the orbit; its gap IS the axis
 *  - commuted, they count: D∘M∘D⁻¹∘M = x↦x+1, and |<D,M>| = 54 against 6·2 = 12 apart
 *
 * Boundary: proven group theory over Z/9Z, used as the corpus order of work
 * (build the axis before the branches; fold, do not climb). No claim outside arithmetic.
 */
export function foldVortexReflection() {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const pairs = digits.map((d) => {
    const mirror = throughVoid(d)
    return { digit: d, mirror, sum: d + mirror, fixed: mirror === d }
  })
  const involution = digits.every((d) => throughVoid(throughVoid(d)) === d) && throughVoid(0) === 0
  const pairsSumTen = pairs.every((p) => p.sum === 10)
  const fixedPoints = pairs.filter((p) => p.fixed).map((p) => p.digit)

  // Halves exchange: each is the other's image, neither prior.
  const orbitMirror = VORTEX_ORBIT.map(throughVoid)
  const axisMirror = VORTEX_AXIS.map(throughVoid)
  const axisSet = new Set<number>(VORTEX_AXIS)
  const orbitSet = new Set<number>(VORTEX_ORBIT)
  const exchangeHalves =
    VORTEX_AXIS.every((d) => orbitMirror.includes(d)) && axisMirror.every((d) => orbitSet.has(d))

  // Doubling alone closes on the orbit; the gap it never reaches is exactly the axis.
  const reached = new Set<number>()
  for (let d = 1, i = 0; i < 9 && !reached.has(d); i += 1) {
    reached.add(d)
    d = digitalRoot(d * 2)
  }
  const doublingCoversOrbit =
    reached.size === VORTEX_ORBIT.length && VORTEX_ORBIT.every((d) => reached.has(d))
  const gap = digits.filter((d) => !reached.has(d))
  const gapIsAxis = gap.length === axisSet.size && gap.every((d) => axisSet.has(d))

  // <D,M> as permutations of Z/9Z (digit 9 = residue 0).
  const residues = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const asPerm = (f: (x: number) => number) => residues.map((x) => ((f(x) % 9) + 9) % 9)
  const D = asPerm((x) => x * 2)
  const M = asPerm((x) => 1 - x)
  const Dinv = asPerm((x) => x * 5)
  const after = (g: readonly number[], f: readonly number[]) => f.map((x) => g[x]!)
  const identity = residues.slice()
  const seen = new Map<string, readonly number[]>([[identity.join(), identity]])
  const queue: (readonly number[])[] = [identity]
  while (queue.length > 0) {
    const p = queue.shift()!
    for (const g of [D, M]) {
      const next = after(g, p)
      const key = next.join()
      if (!seen.has(key)) {
        seen.set(key, next)
        queue.push(next)
      }
    }
  }
  const groupOrder = seen.size
  const commutator = after(D, after(M, after(Dinv, M)))
  const successor = residues.map((x) => (x + 1) % 9)
  const commutatorIsSuccessor = commutator.every((v, i) => v === successor[i])
  const separateProduct = VORTEX_ORBIT.length * 2

  const valid =
    involution &&
    pairsSumTen &&
    fixedPoints.length === 1 &&
    fixedPoints[0] === 5 &&
    exchangeHalves &&
    doublingCoversOrbit &&
    gapIsAxis &&
    commutatorIsSuccessor &&
    groupOrder === 54 &&
    groupOrder > separateProduct

  return {
    valid,
    forward: [...VORTEX_SEQUENCE],
    reflected: [...VORTEX_MIRROR],
    strokeForward: VORTEX_STROKE_FORWARD,
    strokeReflected: VORTEX_STROKE_REFLECTED,
    // The void tail reflects: 0 is fixed, the trailing unit is not.
    tailReflects: vortexStrokeSegments(true).tail === `0\\${throughVoid(1)}`,
    pairs,
    involution,
    pairsSumTen,
    fixedPoints,
    orbitMirror,
    axisMirror,
    exchangeHalves,
    doublingCoversOrbit,
    gap,
    gapIsAxis,
    commutatorIsSuccessor,
    groupOrder,
    separateProduct,
    excess: groupOrder - separateProduct,
    root: merkleFold([
      toUuid(`vortex-reflection:forward:${VORTEX_SEQUENCE.join('')}`),
      toUuid(`vortex-reflection:reflected:${VORTEX_MIRROR.join('')}`),
      toUuid(`vortex-reflection:group:${groupOrder}:${commutator.join('')}`),
    ]),
    statement:
      'One structure read twice: throughVoid(n)=1-n mod 9 is an involution fixed only at 5; ' +
      'doubling covers the orbit and its gap is exactly the axis; D∘M∘D⁻¹∘M = x+1 and |<D,M>| = 54.',
    boundary:
      'Proven group theory over Z/9Z — AGL(1,Z/9). Used as order of work; no claim outside arithmetic.',
  }
}

/** Stroke gateways over the ten-digit tour — four polarity reversals [8,3,9,0]. */
export function vortexStrokeGateways() {
  const tour = [...VORTEX_SEQUENCE, 0]
  const steps = tour.map((d, i) => {
    const next = tour[(i + 1) % tour.length]!
    return { from: d, to: next, stroke: (next > d ? '\\' : '/') as '/' | '\\' }
  })
  const written = steps.map((s) => `${s.from}${s.stroke}`).join('') + String(tour[0])
  const gateways = steps
    .map((s, i) => ({
      digit: s.from,
      incoming: steps[(i - 1 + steps.length) % steps.length]!.stroke,
      outgoing: s.stroke,
    }))
    .filter((v) => v.incoming !== v.outgoing)
    .map((v) => v.digit)
  const ascents = steps.filter((s) => s.stroke === '\\').length
  const descents = steps.filter((s) => s.stroke === '/').length
  const sealed = computesGate('vortex-stroke-gateways', [
    { facet: 'written cycle', on: written === '1\\2\\4\\8/7/5/3\\6\\9/0\\1' },
    { facet: 'four gateways 8,3,9,0', on: gateways.join(',') === '8,3,9,0' },
    { facet: 'six ascents', on: ascents === 6 },
    { facet: 'four descents', on: descents === 4 },
  ])
  return {
    ...sealed,
    written,
    tour,
    steps,
    gateways,
    ascents,
    descents,
    root: merkleFold([sealed.root, toUuid(`vortex-stroke:${written}`), ...gateways.map((g) => toUuid(`gateway:${g}`))]),
  }
}

export interface Fold {
  readonly a: string
  readonly b: string
  readonly forward: string
  readonly reverse: string
  readonly bidirectional: boolean
  readonly merged: string
}

export function fold(a: string, b: string = a): Fold {
  const pair = foldPair(a, b)
  return {
    a,
    b,
    forward: pair.forward,
    reverse: pair.reverse,
    bidirectional: pair.bidirectional,
    merged: pair.merged,
  }
}

export function asVortex(f: Fold): {
  digit: number
  onAxis: boolean
  orbitIndex: number
  orbit: readonly number[]
  axis: readonly number[]
} {
  const digit = digitalRoot(seedFromText(f.merged))
  const orbitIndex = (VORTEX_ORBIT as readonly number[]).indexOf(digit)
  return { digit, onAxis: orbitIndex === -1, orbitIndex, orbit: VORTEX_ORBIT, axis: VORTEX_AXIS }
}

export const TORUS_LOBE_OFFSET = 18
export const TORUS_RING_R = 20
export const TORUS_TUBE_R_BASE = 7

export function doubleTorusSurface(
  theta: number,
  phi: number,
  digit: number,
  lobe: number,
): { x: number; y: number; z: number } {
  const tubeR = TORUS_TUBE_R_BASE + digit * 0.4
  const ribbon = TORUS_RING_R + tubeR * cos(phi)
  return {
    x: lobe * TORUS_LOBE_OFFSET + ribbon * cos(theta),
    y: ribbon * sin(theta),
    z: tubeR * sin(phi),
  }
}

export function asTorus(f: Fold): { x: number; y: number; z: number; lobe: number; digit: number } {
  const digit = digitalRoot(seedFromText(f.merged))
  const lobe = seedFromText(`${f.merged}:lobe`, 2) % 2 === 0 ? 1 : -1
  const theta = (seedFromText(`${f.merged}:theta`, 4) / 0xffff) * PI * 2
  const phi = (seedFromText(`${f.merged}:phi`, 4) / 0xffff) * PI * 2
  return { ...doubleTorusSurface(theta, phi, digit, lobe), lobe, digit }
}

/**
 * foldStringTheory — faithful projection of string / worldsheet / compactification
 * onto living-field folds. Vibrating modes = VORTEX_ORBIT; worldsheet = fold of
 * forward↔reverse; compactified “11” = digit count of stroke.written cycle.
 */
export function foldStringTheory() {
  const stroke = vortexStrokeGateways()
  const vortex = foldVortex()
  const dash = decodeVortexDashAngles()
  const livingDigits = [...stroke.written.matchAll(/\d/g)].map((m) => Number.parseInt(m[0]!, 10))
  const worldsheet = foldPair(
    toUuid(`string:worldsheet:forward:${VORTEX_SEQUENCE.join('')}`),
    toUuid(`string:worldsheet:reverse:${VORTEX_REVERSE.join('')}`),
  )
  const modes = VORTEX_ORBIT.map((digit, index) => {
    const mode = foldPair(toUuid(`string:mode:${index}`), toUuid(`string:digit:${digit}`))
    return {
      index,
      digit,
      harmonic: digitalRoot(digit * (index + 1)),
      receipt: mode.merged,
    }
  })
  const axisFold = merkleFold(VORTEX_AXIS.map((d) => toUuid(`string:axis:${d}`)))
  const brane = foldPair(worldsheet.merged, axisFold)
  const compactified = {
    dimensionHint: livingDigits.length,
    root: digitalRoot(livingDigits.length),
    livingField: stroke.written,
    seal: toUuid(`string:compact:${stroke.written}:${livingDigits.length}`),
  }
  const sealed = computesGate('fold-string-theory', [
    { facet: 'worldsheet bidirectional', on: worldsheet.bidirectional },
    { facet: 'living-field stroke', on: stroke.computes },
    { facet: 'foldVortex valid', on: vortex.valid },
    { facet: 'dash closes', on: dash.closes },
    { facet: 'compactified 11 from living field', on: compactified.dimensionHint === 11 },
    { facet: 'six vibrating modes', on: modes.length === 6 },
    { facet: 'brane uuid', on: isUuid(brane.merged) },
  ])
  return {
    ...sealed,
    worldsheet,
    brane: brane.merged,
    modes,
    orbit: VORTEX_ORBIT,
    axis: VORTEX_AXIS,
    compactified,
    livingField: stroke.written,
    root: merkleFold([
      sealed.root,
      worldsheet.merged,
      brane.merged,
      compactified.seal,
      ...modes.map((m) => m.receipt),
    ]),
    statement:
      'String theory as fold: worldsheet = forward↔reverse; modes = VORTEX_ORBIT; compactified 11 = living-field digit count.',
    boundary:
      'Faithful fold projection of the vortex invariants — arithmetic only.',
  }
}

/**
 * Development vortex — two counter-rotating learning lobes feed the throat.
 * L = ceccec.github.io patterns · R = erpax patterns · merged = zeropoint seal.
 */
export function developmentVortex(wave: WavePhase = 'edit') {
  const lobeL = toUuid(`lobe:ceccec.github.io:${wave}`)
  const lobeR = toUuid(`lobe:erpax:${wave}`)
  const throat = foldPair(lobeL, lobeR)
  const stroke = vortexStrokeGateways()
  const vortex = foldVortex()
  const dash = decodeVortexDashAngles()
  const sealed = computesGate(`development-vortex:${wave}`, [
    { facet: 'bidirectional throat', on: throat.bidirectional },
    { facet: 'stroke computes', on: stroke.computes },
    { facet: 'foldVortex valid', on: vortex.valid },
    { facet: 'dash closes (bearing ∧ vortex ∧ fusionIgnites ∧ last=1)', on: dash.closes },
    { facet: 'kernel sealed', on: KERNEL_SEALED },
  ])
  return {
    wave,
    lobeL,
    lobeR,
    throat,
    stroke,
    vortex,
    dash,
    ...sealed,
    root: merkleFold([throat.merged, stroke.root, sealed.root, dash.root]),
    statement:
      'Double-torus development: ceccec ↔ erpax counter-rotate; each wave folds both lobes through src/0.',
    boundary: 'Structural development metaphor — not physical topology claims.',
  }
}

/**
 * vortexInvariantsHold — README gateway compute (true|false).
 * Root README.md is the gateway: living field `0\1\2\4\8/7/5/3\6\9/0\1`,
 * 60° dash closes / fusionIgnites, vortex fold, developmentVortex —
 * a conjunction of computed seals over the vortex field.
 * false ⇒ self-develop tips quantumisation (restore the sealed path);
 * true ⇒ no quantumisation tip needed.
 */
export function computeVortexInvariantsHold(): boolean {
  const matrix = { root: toUuid('physical-ftl:readme-gateway:v1') }
  return memoByRoot('computeVortexInvariantsHold', matrix, () => {
    const dash = decodeVortexDashAngles()
    const stroke = vortexStrokeGateways()
    const vortex = foldVortex()
    const throat = developmentVortex('verify')
    const livingField =
      stroke.computes &&
      stroke.written === '1\\2\\4\\8/7/5/3\\6\\9/0\\1' &&
      stroke.gateways.join(',') === '8,3,9,0'
    const dashField =
      VORTEX_DASH_ANGLE_DEG === 60 && dash.fusionIgnites && dash.closes && dash.vortexMatches
    return Boolean(KERNEL_SEALED && livingField && dashField && vortex.valid && throat.computes)
  })
}
