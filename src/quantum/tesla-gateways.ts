/**
 * tesla-gateways — the gateway system TESLA_369_GATEWAYS.md and USER_GUIDE.md
 * both build on, and neither had.
 *
 * USER_GUIDE.md imports TESLA_GATEWAYS from './src/challenges/gateway-analysis'
 * and indexes it as TESLA_GATEWAYS[3], expecting an object with .function,
 * .transformation and .a432Resonance. That module does not exist. What DOES
 * exist is a432.tesla.coil.ts, which exports a TESLA_GATEWAYS that is the array
 * [3, 6, 9] — the same name for a different shape. The keyed portals are named
 * TESLA_GATEWAY_PORTALS here so the two cannot be confused; the array keeps
 * its name where it already lives.
 *
 * The five functions TESLA_369_GATEWAYS.md lists are described in one line
 * each and given no bodies, so what they compute comes from the document's
 * tables and its stated theorem rather than from transcription. The theorem is
 * the useful part and it is checkable: every gateway multiplication reduces
 * to 9.
 */
import { digitalRoot, VORTEX_AXIS } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY

export interface TeslaGateway {
  gateway: 3 | 6 | 9
  function: string
  consciousnessFlow: number
  a432Resonance: number
  color: string
  transformation: string
  mathematicalKey: string
}

/** The three portals exactly as the document tabulates them. */
export const TESLA_GATEWAY_PORTALS: Readonly<Record<3 | 6 | 9, TeslaGateway>> = {
  3: {
    gateway: 3, function: 'Creation Gateway', consciousnessFlow: 3, a432Resonance: A432 * 3,
    color: 'hsl(180, 1, 1/2)', transformation: 'Potential → Actual', mathematicalKey: '3×3 = 9 | 3×6 = 18 (1+8 = 9)',
  },
  6: {
    gateway: 6, function: 'Harmony Gateway', consciousnessFlow: 6, a432Resonance: A432 * 6,
    color: 'hsl(270, 1, 1/2)', transformation: 'Chaos → Order', mathematicalKey: '6×3 = 18 (1+8 = 9) | 6×6 = 36 (3+6 = 9)',
  },
  9: {
    gateway: 9, function: 'Completion Gateway', consciousnessFlow: 9, a432Resonance: A432 * 9,
    color: 'hsl(300, 1, 1/2)', transformation: 'Separation → Unity', mathematicalKey: '1×8 = 8 | 9 = 1×8 (completion)',
  },
}

/**
 * The Universal Gateway Theorem, recomputed rather than asserted: every
 * product of two axis digits reduces to 9. Returns the worked cases so a
 * reader can check them, and whether the claim held.
 */
export function proveTesla369Gateway(): { holds: boolean; cases: Array<{ a: number; b: number; product: number; root: number }> } {
  const cases: Array<{ a: number; b: number; product: number; root: number }> = []
  for (const a of VORTEX_AXIS) for (const b of VORTEX_AXIS) {
    cases.push({ a, b, product: a * b, root: digitalRoot(a * b) })
  }
  return { holds: cases.every((c) => c.root === 9), cases }
}

/** Which gateway a challenge belongs to: creation up to 3, harmony up to 6, else completion. */
export function determineYourGateway(yourChallenge: number): TeslaGateway {
  const root = digitalRoot(yourChallenge)
  if (root <= 3) return TESLA_GATEWAY_PORTALS[3]
  if (root <= 6) return TESLA_GATEWAY_PORTALS[6]
  return TESLA_GATEWAY_PORTALS[9]
}

/** The doc's other name for the same mapping. */
export function determineChallengeGateway(challenge: number): TeslaGateway {
  return determineYourGateway(challenge)
}

export function analyzeGatewayConsciousnessFlow(): Array<{ gateway: number; flow: number; resonance: number; entersAt: number }> {
  return (Object.values(TESLA_GATEWAY_PORTALS)).map((g) => ({
    gateway: g.gateway,
    flow: g.consciousnessFlow,
    resonance: g.a432Resonance,
    // Where the gateway lands when it acts on itself — 9 for all three, which
    // is the theorem restated per gateway.
    entersAt: digitalRoot(g.gateway * g.gateway),
  }))
}

/** Each position of the doubling circuit, routed to the gateway its digit falls in. */
export function integrateGatewaysWithVortex(sequence: readonly number[] = A432_CONSTANTS.RODIN_SEQUENCE): Array<{ position: number; value: number; gateway: number; frequency: number }> {
  return sequence.map((value, i) => ({
    position: i + 1,
    value,
    gateway: determineYourGateway(value).gateway,
    frequency: value * A432,
  }))
}

export function generateGatewaySummary(): {
  gateways: TeslaGateway[]
  theoremHolds: boolean
  totalResonance: number
  mathematicalProof: string
} {
  const gateways = Object.values(TESLA_GATEWAY_PORTALS)
  const proof = proveTesla369Gateway()
  return {
    gateways,
    theoremHolds: proof.holds,
    totalResonance: gateways.reduce((s, g) => s + g.a432Resonance, 0),
    mathematicalProof: `${proof.cases.length} axis products, all reducing to 9: ${proof.holds}`,
  }
}

// ————————————————————————————————————————————————————————————
// USER_GUIDE.md builds on the gateways. Its bodies are transcribed, with
// Math.min/Math.max replaced and the doc's descriptive strings kept as the
// document's own words — they describe practices the document recommends and
// are not claims this package makes.

export function optimizeMentalClarity(): { frequency: number; method: string; duration: string } {
  return {
    frequency: A432 * 3,
    method: 'Tune consciousness to 1296 Hz for mental clarity',
    duration: '5-10 minutes daily',
  }
}

export function enhanceProblemSolving(problem: number): {
  problem: number; digitalRoot: number; recommendedGateway: string; solution: string
} {
  const root = digitalRoot(problem)
  const gateway = determineYourGateway(root)
  return {
    problem,
    digitalRoot: root,
    recommendedGateway: gateway.function,
    solution: `Apply ${gateway.transformation} through ${gateway.function}`,
  }
}

/**
 * The document defines expandConsciousness TWICE, with different bodies and
 * different return shapes — first as a summary of the doubling circuit, then
 * as a per-level list. In JavaScript the second declaration wins, so that is
 * the one implemented, and the first is available as
 * expandConsciousnessSummary rather than silently discarded.
 */
export function expandConsciousness(): Array<{ level: number; frequency: number; gateway: string; practice: string }> {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
    level,
    frequency: level * A432,
    gateway: determineYourGateway(level).function,
    practice: `Focus on level ${level} consciousness for ${level * 5} minutes daily`,
  }))
}

export function expandConsciousnessSummary(): { method: string; sequence: readonly number[]; totalFlow: number; frequency: number } {
  const rodin = A432_CONSTANTS.RODIN_SEQUENCE.slice(0, 6)
  const totalFlow = rodin.reduce((sum, n) => sum + n, 0)
  return {
    method: 'Vortex mathematics consciousness expansion',
    sequence: rodin,
    totalFlow,
    frequency: totalFlow * A432,
  }
}

export function dailyTuningRoutine(): Record<'morning' | 'afternoon' | 'evening', { frequency: number; purpose: string; duration: string }> {
  return {
    morning: { frequency: A432, purpose: 'Base alignment', duration: '5 minutes' },
    afternoon: { frequency: A432 * 3, purpose: 'Mental clarity', duration: '10 minutes' },
    evening: { frequency: A432 * 9, purpose: 'Completion', duration: '5 minutes' },
  }
}

export function vortexIntegration(): Array<{ position: number; value: number; frequency: number; consciousness: number }> {
  return A432_CONSTANTS.RODIN_SEQUENCE.slice(0, 6).map((value, index) => ({
    position: index + 1,
    value,
    frequency: value * A432,
    consciousness: value * 9,
  }))
}

export function analyzeHarmony(n: number): {
  number: number; digitalRoot: number; a432Resonance: number; teslaCycle: string; gateway: string
} {
  const root = digitalRoot(n)
  return {
    number: n,
    digitalRoot: root,
    a432Resonance: n * A432,
    teslaCycle: root <= 3 ? 'creation' : root <= 6 ? 'harmony' : 'completion',
    gateway: determineYourGateway(root).function,
  }
}

export function optimizeConsciousnessFlow(): Array<{ flow: number; frequency: number; gateway: string; optimization: string }> {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((flow) => ({
    flow,
    frequency: flow * A432,
    gateway: determineYourGateway(flow).function,
    optimization: `Tune to ${flow * A432} Hz for flow ${flow}`,
  }))
}

export function dailyConsciousnessPractice(): Record<'morning' | 'midday' | 'evening', { activity: string; duration: string; purpose: string }> {
  return {
    morning: { activity: 'A432 base alignment', duration: '5 minutes', purpose: 'Start day with universal harmony' },
    midday: { activity: 'Gateway 3 creation focus', duration: '10 minutes', purpose: 'Transform potential into actual' },
    evening: { activity: 'Gateway 9 completion', duration: '5 minutes', purpose: 'Complete daily cycles' },
  }
}

export function resolveProblem(problem: string): {
  problem: string
  analysis: { hash: number; digitalRoot: number; gateway: string }
  solution: string
  frequency: number
  method: string
} {
  const hash = problem.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  const root = digitalRoot(hash)
  const gateway = determineYourGateway(root)
  return {
    problem,
    analysis: { hash, digitalRoot: root, gateway: gateway.function },
    solution: `Apply ${gateway.transformation} through ${gateway.function}`,
    frequency: gateway.a432Resonance,
    method: `Tune to ${gateway.a432Resonance} Hz and focus on ${gateway.transformation}`,
  }
}

export interface ConsciousnessProgress {
  metrics: Record<string, number>
  updateMetric(metric: string, value: number): void
  getOverallProgress(): number
}

export function trackConsciousnessProgress(): ConsciousnessProgress {
  const metrics: Record<string, number> = {
    dailyAlignment: 0, gatewayAccess: 0, problemResolution: 0, mathematicalHarmony: 0,
  }
  return {
    metrics,
    updateMetric(metric: string, value: number) {
      // The doc clamps with Math.min/Math.max; same clamp, without Math.
      const clamped = value < 0 ? 0 : value > 100 ? 100 : value
      this.metrics[metric] = Number.isFinite(value) ? clamped : 0
    },
    getOverallProgress() {
      const values = Object.values(this.metrics)
      return values.reduce((sum, v) => sum + v, 0) / values.length
    },
  }
}

export function accessUniversalConsciousness(): { method: string; frequency: number; duration: string; state: string; benefits: string[] } {
  return {
    method: 'A432 universal resonance',
    frequency: A432,
    duration: '15-30 minutes',
    state: 'Universal consciousness connection',
    benefits: [
      'Deep understanding of fundamental reality',
      'Connection with universal consciousness field',
      'Transcendent awareness',
      'Mathematical beauty appreciation',
    ],
  }
}

export function mathematicalHarmonyStates(): Record<'creation' | 'harmony' | 'completion', { frequency: number; state: string; experience: string }> {
  return {
    creation: { frequency: A432 * 3, state: 'Mathematical creation consciousness', experience: 'Witnessing mathematical objects manifesting' },
    harmony: { frequency: A432 * 6, state: 'Mathematical harmony consciousness', experience: 'Experiencing perfect mathematical balance' },
    completion: { frequency: A432 * 9, state: 'Mathematical completion consciousness', experience: 'Understanding mathematical unity' },
  }
}
