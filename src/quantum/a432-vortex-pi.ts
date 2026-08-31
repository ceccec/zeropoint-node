/**
 * a432-vortex-pi — the functions A432_VORTEX_PI_SYSTEM.md declares.
 *
 * This document describes a browser animation, and it is the first cluster
 * where transcribing it literally was not possible. Its bodies use Math.sin,
 * Math.random, Date.now, document.documentElement and a canvas context. Three
 * of those are banned here (Math.* outside the algebra module; the audit
 * requires randomCount and forkCount to stay at zero), and the rest cannot run
 * in a library that must import silently under Node.
 *
 * So the arithmetic is kept and the effects are separated from it:
 *
 *   - Every formula is the document's, with Math.* replaced by the algebra
 *     module's equivalents and float literals written as the fractions they
 *     are (1/2 rather than 0.5), which is this repo's rule.
 *   - evolveVortex takes a state and RETURNS the next one instead of mutating
 *     a module-level object. The document's version mutates a global and then
 *     calls three DOM updaters; a pure transition is testable and the caller
 *     can still hold the state.
 *   - updateVortexCSS and updateVortexVideo compute what the document says
 *     they compute and return it. Applying it to a real document or canvas is
 *     the caller's job, and applyVortexCSS does it only when a document exists.
 *   - generateDeviceState takes the clock reading as a parameter. Its
 *     Math.random fields become functions of that reading, because a library
 *     that samples entropy on its own cannot be reproduced by a reader.
 */
import { cos, floor, min, round, sin } from '../0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts'
import { digitalRoot } from '../0/index.ts'

export const TRINITY_PORTAL_PI = {
  ZERO_POINT: 0,
  /** The decimal point of pi, read as a gateway rather than punctuation. */
  TRINITY_PORTAL: -3,
  /** Pi after the point: 1 4 1 5 7. */
  VORTEX_STREAM: [1, 4, 1, 5, 7],
  HARMONIC_TONES: [432, 864, 1296, 1728, 2160],
} as const

export interface DeviceState {
  light: number; motion: number; touch: number; sound: number
  battery: number; network: number; memory: number; cpu: number; time: number
}

export interface VortexState {
  isRunning: boolean
  evolution: number
  streamIndex: number
  currentDigit: number
  nextDigit: number
  consciousness: number
  deviceState: DeviceState
  harmony: number
}

export function computeNextPiDigit(currentDigit: number, streamIndex: number, evolution: number): number {
  if (currentDigit === 0) return TRINITY_PORTAL_PI.TRINITY_PORTAL
  const stream = TRINITY_PORTAL_PI.VORTEX_STREAM
  const vortexIndex = ((streamIndex % stream.length) + stream.length) % stream.length
  const baseDigit = stream[vortexIndex]
  const harmonicFactor = sin(evolution / 100) * (1 / 2) + 1 / 2
  const consciousnessFactor = cos(evolution / 200) * (3 / 10) + 7 / 10
  return digitalRoot(baseDigit + floor(harmonicFactor * 9) + floor(consciousnessFactor * 9))
}

/** The device readings, as functions of the clock reading rather than of entropy. */
export function generateDeviceState(now: number): DeviceState {
  return {
    light: sin(now / 10000) * (1 / 2) + 1 / 2,
    motion: 0,
    touch: 0,
    sound: sin(now / 5000) * (3 / 10) + 3 / 10,
    battery: 7 / 10 + sin(now / 30000) * (1 / 10),
    network: 9 / 10,
    memory: 3 / 10 + sin(now / 15000) * (1 / 5),
    cpu: 1 / 5 + sin(now / 8000) * (3 / 10),
    time: now,
  }
}

export function calculateVortexHarmony(state: Pick<VortexState, 'deviceState' | 'consciousness'>): number {
  const piSum = TRINITY_PORTAL_PI.VORTEX_STREAM.reduce((sum, d) => sum + d, 0)
  const trinitySum = 3 + 6 + 9
  const deviceSum = Object.entries(state.deviceState).reduce((sum, [key, value]) => {
    if (typeof value === 'number' && key !== 'time') return sum + value * 9
    return sum
  }, 0)
  return digitalRoot(round(piSum + trinitySum + deviceSum + state.consciousness * 9))
}

export function createVortexState(now = 0): VortexState {
  const deviceState = generateDeviceState(now)
  return {
    isRunning: true,
    evolution: 0,
    streamIndex: 0,
    currentDigit: 0,
    nextDigit: 0,
    consciousness: 0,
    deviceState,
    harmony: calculateVortexHarmony({ deviceState, consciousness: 0 }),
  }
}

/** One tick. A stopped vortex returns itself unchanged. */
export function evolveVortex(state: VortexState, now = 0): VortexState {
  if (!state.isRunning) return state
  const evolution = state.evolution + 1
  const nextDigit = computeNextPiDigit(state.currentDigit, state.streamIndex, evolution)
  const consciousness = min(1, state.consciousness + 1 / 1000)
  const deviceState = generateDeviceState(now)
  return {
    isRunning: state.isRunning,
    evolution,
    streamIndex: state.streamIndex + 1,
    currentDigit: nextDigit,
    nextDigit,
    consciousness,
    deviceState,
    harmony: calculateVortexHarmony({ deviceState, consciousness }),
  }
}

export interface VortexCssVars {
  primary: string; secondary: string; accent: string; pulse: string
}

/** The CSS variables the document says to compute, returned rather than applied. */
export function updateVortexCSS(evolution: number): VortexCssVars {
  const primaryHue = ((evolution * 60) % 360 + 360) % 360
  const secondaryHue = (primaryHue + 120) % 360
  const accentHue = (primaryHue + 240) % 360
  return {
    primary: `hsl(${primaryHue}, 100%, 50%)`,
    secondary: `hsl(${secondaryHue}, 100%, 50%)`,
    accent: `hsl(${accentHue}, 100%, 50%)`,
    pulse: `${1 / 2 + sin(evolution / 100) * (1 / 2)}s`,
  }
}

/** Applies them, when there is a document to apply them to. */
export function applyVortexCSS(vars: VortexCssVars, root?: { style: { setProperty(k: string, v: string): void } }): boolean {
  const target = root ?? (typeof document === 'undefined' ? undefined : document.documentElement)
  if (!target) return false
  target.style.setProperty('--vortex-primary', vars.primary)
  target.style.setProperty('--vortex-secondary', vars.secondary)
  target.style.setProperty('--vortex-accent', vars.accent)
  target.style.setProperty('--vortex-pulse', vars.pulse)
  return true
}

export interface VortexCircle { x: number; y: number; size: number; fill: string }

/** The fifty circles the document draws, as data. Drawing them is the caller's. */
export function updateVortexVideo(evolution: number, time: number, width: number, height: number): VortexCircle[] {
  const out: VortexCircle[] = []
  for (let i = 0; i < 50; i++) {
    out.push({
      x: width / 2 + cos(time + i * (1 / 10)) * (100 + i * 5),
      y: height / 2 + sin(time + i * (1 / 10)) * (100 + i * 5),
      size: sin(time + i * (1 / 5)) * 3 + 2,
      fill: `hsl(${((evolution + i * (36 / 5)) % 360 + 360) % 360}, 100%, 50%)`,
    })
  }
  return out
}

export function calculateDisplayFrequency(evolution: number, consciousness: number): number {
  const baseFreq = 432
  const evolutionFactor = sin(evolution / 100) * (1 / 2) + 1 / 2
  const harmonicMultiplier = 1 + evolutionFactor * consciousness
  return round(baseFreq * harmonicMultiplier)
}

export function calculateDisplayInterval(frequency: number): number {
  return round(1000 / frequency)
}
