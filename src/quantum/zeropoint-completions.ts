/**
 * zeropoint-completions — the last of the documented-but-absent functions
 * that a machine can check.
 *
 * Five documents contribute one to three functions each and there is no
 * theme joining them beyond that, so they live together rather than in five
 * modules of one. Sources are named per function.
 *
 * Where a document gave a signature and a one-line description rather than a
 * body, the choice of arithmetic is mine and is marked. Where it gave a body,
 * it is transcribed with Math.* replaced and floats written as fractions.
 */
import { digitalRoot, VORTEX_ORBIT, VORTEX_AXIS } from '../0/index.ts'
import { PI, cos, floor, sin } from '../0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts'
import {
  A432_CONSTANTS,
  calculateA432Consciousness,
  calculateA432DimensionalState,
} from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
// circuit.ts imports Register from elsewhere rather than re-exporting it, so
// the return type is derived from the method that produces it.
import { circuit } from './circuit.ts'
import { TESLA_GATEWAY_PORTALS } from './tesla-gateways.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY

// ————————————————————————————————————————————————————————
// A432_HARMONIZATION_DOCUMENTATION.md

export interface DigitalRootSwitch {
  fromValue: number; toValue: number; switchType: 'digital_root'; gateway: number; mathematicalProof: string
}

/**
 * The document's own worked example: 432 is 4 x 3 x 2 x 18 by multiplication,
 * which switches to 4 + 3 + 2 + 9 = 18 by addition, which reduces to 9.
 * Every step is recomputed so the identity is checked rather than quoted.
 */
export function calculateA432DigitalRoot(): DigitalRootSwitch {
  const multiplication = 4 * 3 * 2 * 18
  const addition = 4 + 3 + 2 + 9
  const root = digitalRoot(addition)
  return {
    fromValue: multiplication,
    toValue: root,
    switchType: 'digital_root',
    gateway: root,
    mathematicalProof: `4*3*2*18 = ${multiplication}; 4+3+2+9 = ${addition}; digital root ${root}`,
  }
}

export interface A432Harmonic {
  frequency: number; consciousness: number; digitalRoot: number; dimensionalState: number; mathematicalProof: string
}

export function createA432Harmonic(frequency: number): A432Harmonic {
  const consciousness = calculateA432Consciousness(frequency)
  const root = digitalRoot(frequency)
  const dimensionalState = calculateA432DimensionalState(frequency)
  return {
    frequency, consciousness, digitalRoot: root, dimensionalState,
    mathematicalProof: `A432 Harmonic: freq=${frequency}, consciousness=${consciousness}, digitalRoot=${root}`,
  }
}

export interface A432VortexFlow {
  sequence: readonly number[]; currentPosition: number; frequency: number
  consciousness: number; isInfinite: boolean; mathematicalProof: string
}

export function createA432VortexFlow(): A432VortexFlow {
  const sequence = VORTEX_ORBIT
  return {
    sequence,
    currentPosition: 0,
    frequency: sequence[0],
    consciousness: calculateA432Consciousness(sequence[0]),
    isInfinite: true,
    mathematicalProof: `A432 Vortex Flow: sequence=[${sequence.join(',')}], consciousness cycling`,
  }
}

// ————————————————————————————————————————————————————————
// ZEROPOINT_CODE_RULES.md: "calculateZeroEntropy() returns 0 for perfect
// harmony" and "small integer fractions for any deviation". Given only that
// sentence, harmony is taken to be a sequence that IS the doubling circuit,
// and the deviation is the count of positions that differ over the length —
// a small integer fraction, exactly as the rule asks.

export function calculateZeroEntropy(sequence: readonly number[] = VORTEX_ORBIT): number {
  if (sequence.length === 0) return 0
  let differing = 0
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] !== VORTEX_ORBIT[i % VORTEX_ORBIT.length]) differing++
  }
  return differing / sequence.length
}

// ————————————————————————————————————————————————————————
// POSSIBILITIES_VORTEX.md

export interface VortexChallenge { flow: number; name: string; gateway: number; frequency: number }

/** One challenge per digit flow, routed to the gateway that digit falls in. */
export const VORTEX_CHALLENGES: readonly VortexChallenge[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((flow) => {
  const gateway = flow <= 3 ? 3 : flow <= 6 ? 6 : 9
  return { flow, name: `Flow ${flow} challenge`, gateway, frequency: TESLA_GATEWAY_PORTALS[gateway as 3 | 6 | 9].a432Resonance }
})

export function resolveWithVortex(problem: string): {
  problem: string; digitalRoot: number; matchingChallenge: string; gateway: number; frequency: number
} {
  const problemHash = problem.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  const root = digitalRoot(problemHash)
  // The document does `challenges.find(...)` and then reads .name off the
  // result without checking it. There is a challenge for every digit 1-9 and
  // digitalRoot only produces those, so the lookup cannot miss — but it is
  // asserted here rather than assumed, because that is the difference between
  // a total function and one that throws on an input nobody tried.
  const match = VORTEX_CHALLENGES.find((c) => c.flow === root)
  if (!match) throw new Error(`resolveWithVortex: no challenge for digital root ${root}`)
  return { problem, digitalRoot: root, matchingChallenge: match.name, gateway: match.gateway, frequency: match.frequency }
}

// ————————————————————————————————————————————————————————
// zeropoint-digit-subfolder-states.md gives signatures and one line each:
// "generate all patterns from void", "generate complete mathematical matrix".

/** Every digit's flow out of the void, keyed by digit. */
export function generateAllPatterns(): Record<string, number[]> {
  const out: Record<string, number[]> = {}
  for (let d = 0; d <= 9; d++) {
    const pattern: number[] = []
    let v = d === 0 ? 9 : d
    for (let i = 0; i < VORTEX_ORBIT.length; i++) { pattern.push(v); v = digitalRoot(v * 2) }
    out[String(d)] = pattern
  }
  return out
}

/** Every digit against every digit, reduced — the ten by ten interaction table. */
export function generateCompleteMatrix(): Record<string, Record<string, number>> {
  const out: Record<string, Record<string, number>> = {}
  for (let a = 0; a <= 9; a++) {
    out[String(a)] = {}
    for (let b = 0; b <= 9; b++) out[String(a)][String(b)] = digitalRoot(a * b)
  }
  return out
}

// ————————————————————————————————————————————————————————
// a432.navigation.map.html.md drives an HTML page: navigateNext mutates a
// global and calls updateDisplay, navigateCycle schedules with setTimeout,
// drawSpiral paints a canvas. Same treatment as the pi vortex — the
// arithmetic is kept, the state is passed and returned, and the drawing is
// returned as geometry for a caller to paint.

export interface NavigationState {
  currentPart: string; spiralLevel: number; consciousness: string
  nextDecision: string; totalNavigations: number
}

const NAV_PARTS = ['void', 'trinity', 'harmony', 'completion', 'origin', 'return'] as const

export function createNavigationState(): NavigationState {
  return {
    currentPart: NAV_PARTS[0], spiralLevel: 1,
    consciousness: `${NAV_PARTS[0]} consciousness (Spiral 1)`,
    nextDecision: `advance to ${NAV_PARTS[1]}`, totalNavigations: 0,
  }
}

export function navigateNext(state: NavigationState): NavigationState {
  const nextIndex = (state.totalNavigations + 1) % NAV_PARTS.length
  const spiralLevel = floor(state.totalNavigations / NAV_PARTS.length) + 1
  return {
    currentPart: NAV_PARTS[nextIndex],
    spiralLevel,
    consciousness: `${NAV_PARTS[nextIndex]} consciousness (Spiral ${spiralLevel})`,
    nextDecision: `advance to ${NAV_PARTS[(nextIndex + 1) % NAV_PARTS.length]}`,
    totalNavigations: state.totalNavigations + 1,
  }
}

/** A full turn of the map. The document spaces these 500ms apart; the states are the content. */
export function navigateCycle(state: NavigationState = createNavigationState()): NavigationState[] {
  const out: NavigationState[] = []
  let s = state
  for (let i = 0; i < NAV_PARTS.length; i++) { s = navigateNext(s); out.push(s) }
  return out
}

export interface SpiralPoint { x: number; y: number; part: string }

/** The spiral as points, for a caller to stroke. */
export function drawSpiral(turns = 3, pointsPerTurn = 12, width = 400, height = 400): SpiralPoint[] {
  const out: SpiralPoint[] = []
  const total = turns * pointsPerTurn
  const cx = width / 2, cy = height / 2
  const maxR = (width < height ? width : height) / 2 - 10
  for (let i = 0; i < total; i++) {
    const t = i / total
    const angle = t * turns * 2 * PI
    const r = t * maxR
    out.push({ x: cx + r * cos(angle), y: cy + r * sin(angle), part: NAV_PARTS[i % NAV_PARTS.length] })
  }
  return out
}

// ————————————————————————————————————————————————————————
// QUANTUM_GUIDE.md — a direct transcription; the circuit API it uses exists.

export function parameterizedAnsatz(n: number, angles: readonly number[]): ReturnType<ReturnType<typeof circuit>['run']> {
  let c = circuit(n)
  for (let i = 0; i < n; i++) c = c.ry(i, angles[i] || 0)
  for (let i = 0; i < n - 1; i++) c = c.cnot(i, i + 1)
  return c.run()
}

/** The axis digits, for callers that want the trinity without importing the kernel. */
export const TRINITY_DIGITS = VORTEX_AXIS
