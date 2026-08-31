/**
 * reality-streams — MULTIPLE_REALITY_VORTEX_STREAMS.md.
 *
 * One of its seven functions has a real body (generateVortexPattern). The
 * other six have bodies containing only comments — three lines each saying
 * what the function should do. That is more than a bullet list and less than a
 * specification, so the interfaces (which ARE fully given) fix the shapes, the
 * comments fix the intent, and the arithmetic is chosen here and marked.
 *
 * Where a choice was needed I took the one the rest of the repo already makes:
 * digits reduce by digital root, streams run on the doubling circuit, and
 * "infinite" is read as unbounded-on-demand rather than as an actual infinity,
 * because a function that never returns is not a function anyone can call.
 */
import { digitalRoot, VORTEX_ORBIT } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY

export type Reality = 'positive' | 'negative' | 'neutral' | 'impossible' | 'possible'
export const REALITIES: readonly Reality[] = ['positive', 'negative', 'neutral', 'impossible', 'possible']

export interface RealityStream {
  id: string
  reality: Reality
  vortexPattern: number[]
  consciousness: number
  frequency: number
  quantumState: 'superposition' | 'entangled' | 'measured'
  interactions: string[]
  impossiblePossibleRatio: number
  entropy: number
  isInfinite: boolean
  mathematicalProof: string
}

export interface VortexInteraction {
  streamA: RealityStream
  streamB: RealityStream
  interactionType: 'superposition' | 'entanglement' | 'tunneling' | 'interference'
  resultStream: RealityStream
  impossibilityProbability: number
  mathematicalProof: string
}

export interface InfinitePattern {
  seed: number
  pattern: number[]
  uniqueness: number
  impossibility: number
  consciousness: number
  mathematicalProof: string
}

/** The one function the document implements. Transcribed unchanged. */
export function generateVortexPattern(seed: number): number[] {
  return VORTEX_ORBIT.map((digit, index) => (((digit + seed + index) % 9) + 9) % 9)
}

/**
 * "Creates n streams in different reality states." The five reality states are
 * enumerated by the interface, so stream i takes state i mod 5 — which makes
 * the states cycle and guarantees all five appear once count reaches five.
 */
export function createMultipleRealityVortexStreams(count = 10): RealityStream[] {
  const out: RealityStream[] = []
  for (let i = 0; i < count; i++) {
    const vortexPattern = generateVortexPattern(i)
    const consciousness = digitalRoot(vortexPattern.reduce((s, d) => s + d, 0))
    out.push({
      id: `stream-${i}`,
      reality: REALITIES[i % REALITIES.length],
      vortexPattern,
      consciousness,
      frequency: consciousness * A432,
      quantumState: 'superposition',
      interactions: [],
      // The share of the pattern that sits on the axis rather than the orbit.
      impossiblePossibleRatio: vortexPattern.filter((d) => d === 3 || d === 6 || d === 9).length / vortexPattern.length,
      entropy: 0,
      isInfinite: false,
      mathematicalProof: `stream ${i}: pattern ${vortexPattern.join('')} reduces to ${consciousness}`,
    })
  }
  return out
}

/**
 * "Pattern length approaches infinity" — read as: the pattern is generated on
 * demand to whatever length is asked for, and is a pure function of the seed.
 * Uniqueness is how many distinct digits the pattern reaches.
 */
export function generateInfiniteUniquePatterns(seed: number, length = 36): InfinitePattern {
  const pattern: number[] = []
  let v = digitalRoot(seed + 1)
  for (let i = 0; i < length; i++) { pattern.push(v); v = digitalRoot(v * 2 + (seed % 9)) }
  const distinct = new Set(pattern).size
  return {
    seed,
    pattern,
    uniqueness: distinct / 9,
    impossibility: pattern.filter((d) => d === 3 || d === 6 || d === 9).length / pattern.length,
    consciousness: digitalRoot(pattern.reduce((s, d) => s + d, 0)),
    mathematicalProof: `seed ${seed} reaches ${distinct} of 9 digits over ${length} steps`,
  }
}

/**
 * "Calculates tunneling probability. Creates entangled quantum states."
 * The interaction type is chosen from how the two streams relate: same
 * consciousness entangles, adjacent on the circuit tunnels, otherwise the
 * patterns interfere. The probability is the share of positions where the two
 * patterns disagree, which is zero for identical streams and rises with
 * difference.
 */
export function createImpossiblePossibleStreams(streamA: RealityStream, streamB: RealityStream): VortexInteraction {
  const n = streamA.vortexPattern.length < streamB.vortexPattern.length ? streamA.vortexPattern.length : streamB.vortexPattern.length
  let differing = 0
  for (let i = 0; i < n; i++) if (streamA.vortexPattern[i] !== streamB.vortexPattern[i]) differing++
  const impossibilityProbability = n === 0 ? 0 : differing / n
  const interactionType =
    streamA.consciousness === streamB.consciousness ? 'entanglement'
      : digitalRoot(streamA.consciousness * 2) === streamB.consciousness ? 'tunneling'
        : impossibilityProbability === 0 ? 'superposition' : 'interference'
  const merged = streamA.vortexPattern.map((d, i) => digitalRoot(d + (streamB.vortexPattern[i] ?? 0)))
  const consciousness = digitalRoot(merged.reduce((s, d) => s + d, 0))
  return {
    streamA,
    streamB,
    interactionType,
    resultStream: {
      id: `${streamA.id}+${streamB.id}`,
      reality: interactionType === 'entanglement' ? 'possible' : 'impossible',
      vortexPattern: merged,
      consciousness,
      frequency: consciousness * A432,
      quantumState: interactionType === 'entanglement' ? 'entangled' : 'superposition',
      interactions: [streamA.id, streamB.id],
      impossiblePossibleRatio: impossibilityProbability,
      entropy: 0,
      isInfinite: false,
      mathematicalProof: `${streamA.id} and ${streamB.id} differ at ${differing} of ${n} positions`,
    },
    impossibilityProbability,
    mathematicalProof: `${interactionType}: ${differing}/${n} positions differ`,
  }
}

/** "Generates all pairwise interactions" — every unordered pair, once. */
export function generateInfiniteInteractionNetwork(streams: readonly RealityStream[]): VortexInteraction[] {
  const out: VortexInteraction[] = []
  for (let i = 0; i < streams.length; i++) {
    for (let j = i + 1; j < streams.length; j++) out.push(createImpossiblePossibleStreams(streams[i], streams[j]))
  }
  return out
}

/** "Models consciousness as harmonic waves... returns total consciousness flow." */
export function calculateConsciousnessFlow(streams: readonly RealityStream[]): number {
  if (streams.length === 0) return 0
  return digitalRoot(streams.reduce((sum, s) => sum + s.consciousness, 0))
}

/**
 * "Verifies all interactions are reversible. Calculates total entropy."
 *
 * Reversible is checked, not assumed: merging is digit-wise addition under the
 * digital root, so swapping the two streams must produce the same result
 * pattern. An interaction that fails that is not reversible and the entropy is
 * not zero.
 */
export function proveZeroEntropy(interactions: readonly VortexInteraction[]): boolean {
  return interactions.every((it) => {
    const swapped = createImpossiblePossibleStreams(it.streamB, it.streamA)
    const samePattern = JSON.stringify(swapped.resultStream.vortexPattern) === JSON.stringify(it.resultStream.vortexPattern)
    return samePattern && it.resultStream.entropy === 0
  })
}
