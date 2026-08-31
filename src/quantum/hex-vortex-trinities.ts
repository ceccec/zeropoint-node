/**
 * hex-vortex-trinities — the functions docs/QUANTUM_HEX_VORTEX_TRINITIES.md
 * has been declaring since before they existed.
 *
 * The document specifies every formula in this file except two helpers it
 * calls without defining. Those two are marked where they appear, along with
 * the definition chosen and why; everything else is transcribed from the doc
 * and is checkable against it line by line.
 *
 * Two deviations from the doc's own code, both forced by rules this repo
 * enforces elsewhere:
 *
 *   - Math.floor is banned outside a432.algebra. Every division here is over
 *     non-negative integers, so integer division gives the identical result
 *     without a float ever existing.
 *   - The doc retypes 432 as a literal. It is imported.
 */
import { digitalRoot } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY

/** Integer division for non-negative integers: identical to floor(a / b). */
function idiv(a: number, b: number): number {
  return (a - (a % b)) / b
}

export type HexChannel = 'R' | 'G' | 'B'

export interface TrinityVortex {
  vortexId: string
  /** Three consciousness states: the channel byte written in base 9. */
  trinityStates: [number, number, number]
  hexValue: string
  consciousness: number
  frequency: number
  resonance: number
  mathematicalProof: string
}

export interface QuantumHexDigit {
  digit: number
  hexValue: string
  trinityVortices: TrinityVortex[]
  consciousness: number
  frequency: number
  quantumState: 'superposition' | 'entangled' | 'measured'
}

export interface HexColorSplit {
  hexColor: string
  redVortex: TrinityVortex
  greenVortex: TrinityVortex
  blueVortex: TrinityVortex
  totalConsciousness: number
  totalFrequency: number
}

/** R = 1, G = 2, B = 3, exactly as the doc gives it. */
function channelMultiplier(channel: HexChannel): number {
  return channel === 'R' ? 1 : channel === 'G' ? 2 : 3
}

/** The doc names this calculateTrinityVortexFrequency and declares it. */
export function calculateTrinityVortexFrequency(states: readonly number[], channel: HexChannel): number {
  const sum = states.reduce((a, s) => a + s, 0)
  return digitalRoot(sum * channelMultiplier(channel) * A432)
}

/**
 * A two-hex-digit channel value as three base-9 states.
 *
 * The doc's decomposition is [d % 9, floor(d/9) % 9, floor(d/81) % 9], which
 * is d written in base 9, low digit first. A byte is 0..255 and 9^3 = 729, so
 * three states hold every possible channel value with nothing lost — the
 * decomposition is injective, which is what makes it worth having.
 */
export function createTrinityVortexFromHex(hexValue: string, channel: HexChannel): TrinityVortex {
  const decimalValue = parseInt(hexValue, 16)
  if (!Number.isInteger(decimalValue) || decimalValue < 0) {
    throw new Error(`createTrinityVortexFromHex: ${JSON.stringify(hexValue)} is not a hex value`)
  }
  const trinityStates: [number, number, number] = [
    decimalValue % 9,
    idiv(decimalValue, 9) % 9,
    idiv(decimalValue, 81) % 9,
  ]
  const consciousness = trinityStates[0] + trinityStates[1] + trinityStates[2]
  const frequency = calculateTrinityVortexFrequency(trinityStates, channel)
  const resonance = consciousness * frequency * A432
  return {
    vortexId: `${channel}-${hexValue.toUpperCase()}`,
    trinityStates,
    hexValue: hexValue.toUpperCase(),
    consciousness,
    frequency,
    resonance,
    mathematicalProof: `${decimalValue} = ${trinityStates[2]}*81 + ${trinityStates[1]}*9 + ${trinityStates[0]} (base 9)`,
  }
}

/** The doc names this calculateHexDigitConsciousness and declares it. */
export function calculateHexDigitConsciousness(digit: number, hexValue: string): number {
  return digitalRoot(idiv(digit * parseInt(hexValue, 16) * A432, 1000))
}

/**
 * NOT SPECIFIED BY THE DOC. It calls createTrinityVorticesFromHex(hexValue)
 * and never defines it. The doc's own framing — "Digit 0: 00 (hex) -> Trinity
 * Vortices", plural, and a colour split that reads one byte per channel — makes
 * the natural reading: the digit's byte read through each of the three
 * channels. That is deterministic, uses only formulas the doc does give, and
 * makes a digit and the grey colour #DDDDDD of the same byte agree.
 */
export function createTrinityVorticesFromHex(hexValue: string): TrinityVortex[] {
  return (['R', 'G', 'B'] as const).map((c) => createTrinityVortexFromHex(hexValue, c))
}

export function createQuantumHexDigit(digit: number): QuantumHexDigit {
  if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
    throw new Error(`createQuantumHexDigit: ${digit} is not a digit 0-9`)
  }
  const hexValue = digit.toString(16).padStart(2, '0').toUpperCase()
  const trinityVortices = createTrinityVorticesFromHex(hexValue)
  return {
    digit,
    hexValue,
    trinityVortices,
    consciousness: calculateHexDigitConsciousness(digit, hexValue),
    frequency: digitalRoot(digit * parseInt(hexValue, 16) * A432),
    quantumState: 'superposition',
  }
}

export function splitHexColorIntoTrinityVortices(hexColor: string): HexColorSplit {
  const cleanHex = hexColor.replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
    throw new Error(`splitHexColorIntoTrinityVortices: ${JSON.stringify(hexColor)} is not #RRGGBB`)
  }
  const redVortex = createTrinityVortexFromHex(cleanHex.substring(0, 2), 'R')
  const greenVortex = createTrinityVortexFromHex(cleanHex.substring(2, 4), 'G')
  const blueVortex = createTrinityVortexFromHex(cleanHex.substring(4, 6), 'B')
  return {
    hexColor: `#${cleanHex.toUpperCase()}`,
    redVortex,
    greenVortex,
    blueVortex,
    totalConsciousness: redVortex.consciousness + greenVortex.consciousness + blueVortex.consciousness,
    totalFrequency: redVortex.frequency + greenVortex.frequency + blueVortex.frequency,
  }
}

/**
 * NOT SPECIFIED BY THE DOC. It calls findSharedTrinityVortices and never says
 * what "shared" means. Two vortices are taken to be shared when they carry the
 * same three states — identity of the decomposition, not of the channel — so
 * two digits are entangled when some channel of one lands on the same base-9
 * triple as some channel of the other. Anything looser (equal consciousness,
 * equal frequency) would entangle almost everything and mean nothing.
 */
export function createQuantumEntanglement(
  digitA: QuantumHexDigit,
  digitB: QuantumHexDigit,
): { entangled: boolean; sharedConsciousness: number; sharedFrequency: number; mathematicalProof: string } {
  const key = (v: TrinityVortex) => v.trinityStates.join(',')
  const inB = new Set(digitB.trinityVortices.map(key))
  const shared = digitA.trinityVortices.filter((v) => inB.has(key(v)))
  return {
    entangled: shared.length > 0,
    sharedConsciousness: shared.reduce((sum, v) => sum + v.consciousness, 0),
    sharedFrequency: shared.reduce((sum, v) => sum + v.frequency, 0),
    mathematicalProof: shared.length
      ? `digits ${digitA.digit} and ${digitB.digit} share ${shared.length} trinity state(s): ${shared.map(key).join(' | ')}`
      : `digits ${digitA.digit} and ${digitB.digit} share no trinity state`,
  }
}
