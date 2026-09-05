/**
 * The Clifford fragment with no floats in it at all.
 *
 * Every amplitude a Clifford circuit can produce from |0…0⟩ has the form
 * (x + yi) / √2^k with x and y INTEGERS and k a single shared exponent. So the
 * state is integers and one scale, the gates are integer operations, and the
 * probabilities are exact rationals (x² + y²) / 2^k. Nothing rounds because
 * nothing irrational is ever materialised: the √2 that H introduces is carried
 * in k and cancels when the amplitude is squared.
 *
 * WHY THIS EXISTS. The float simulator beside it returns 5.00000000000000111e-1
 * for a GHZ outcome whose exact value is one half, and sums its distribution to
 * 1 + 2.2e-16 — because it stores 1/√2, which is irrational and has no exact
 * binary float. The error is far inside every tolerance this package uses and
 * it is not zero, and "tiny" is the argument this repository refuses everywhere
 * else: math:ban forbids ambient Math, the ratchet counts decimal-crack lines,
 * PI is 245850922/78256779 and the surface-code constants are 57/10000 and
 * 3/100. uuidna's simulator already carries Gaussian integers over a symbolic
 * √2 and returns exact rationals; this is the same idea in this tree.
 *
 * WHAT IT DOES NOT COVER, stated because a partial simulator that looks total
 * is worse than none. rx, ry, rz and T leave the Clifford group: their
 * amplitudes are not of this form and no integer representation holds them.
 * They are ABSENT here rather than approximated, and asking for one throws.
 * For those, the float simulator is the right tool and its drift is the price.
 */

/** One amplitude: (re + im·i) / √2^scale, with the scale held by the state. */
export interface ExactAmp { readonly re: bigint; readonly im: bigint }

export interface ExactRegister {
  readonly n: number
  readonly amps: readonly ExactAmp[]
  /** Every amplitude is divided by √2 to this power. Integer, never a float. */
  readonly scale: number
}

const ZERO: ExactAmp = { re: 0n, im: 0n }

export function exactZeroState(n: number): ExactRegister {
  if (n < 1) throw new Error(`exactZeroState: ${n} qubits`)
  const amps: ExactAmp[] = new Array(1 << n).fill(ZERO)
  amps[0] = { re: 1n, im: 0n }
  return { n, amps, scale: 0 }
}

const pairs = (reg: ExactRegister, q: number): [number, number][] => {
  if (q < 0 || q >= reg.n) throw new Error(`qubit ${q} out of range 0..${reg.n - 1}`)
  const bit = 1 << q
  const out: [number, number][] = []
  for (let i = 0; i < reg.amps.length; i += 1) if ((i & bit) === 0) out.push([i, i | bit])
  return out
}

/**
 * Hadamard. (a, b) becomes (a+b, a−b) and the scale rises by one.
 *
 * That IS the 1/√2: instead of multiplying two amplitudes by an irrational, the
 * factor is recorded once in the exponent. Integer addition only.
 */
export function exactH(reg: ExactRegister, q: number): ExactRegister {
  const amps = reg.amps.slice()
  for (const [i, j] of pairs(reg, q)) {
    const a = reg.amps[i]!
    const b = reg.amps[j]!
    amps[i] = { re: a.re + b.re, im: a.im + b.im }
    amps[j] = { re: a.re - b.re, im: a.im - b.im }
  }
  return { n: reg.n, amps, scale: reg.scale + 1 }
}

/** Pauli X: swap the pair. */
export function exactX(reg: ExactRegister, q: number): ExactRegister {
  const amps = reg.amps.slice()
  for (const [i, j] of pairs(reg, q)) { amps[i] = reg.amps[j]!; amps[j] = reg.amps[i]! }
  return { ...reg, amps }
}

/** Pauli Z: negate the |1⟩ half. */
export function exactZ(reg: ExactRegister, q: number): ExactRegister {
  const amps = reg.amps.slice()
  for (const [, j] of pairs(reg, q)) { const b = reg.amps[j]!; amps[j] = { re: -b.re, im: -b.im } }
  return { ...reg, amps }
}

/** Pauli Y = iXZ: swap, negate one branch, multiply by i. All integer. */
export function exactY(reg: ExactRegister, q: number): ExactRegister {
  const amps = reg.amps.slice()
  for (const [i, j] of pairs(reg, q)) {
    const a = reg.amps[i]!
    const b = reg.amps[j]!
    amps[i] = { re: b.im, im: -b.re }      // −i·b
    amps[j] = { re: -a.im, im: a.re }      // +i·a
  }
  return { ...reg, amps }
}

/** Phase S: multiply the |1⟩ half by i. */
export function exactS(reg: ExactRegister, q: number): ExactRegister {
  const amps = reg.amps.slice()
  for (const [, j] of pairs(reg, q)) { const b = reg.amps[j]!; amps[j] = { re: -b.im, im: b.re } }
  return { ...reg, amps }
}

/** CNOT: swap target amplitudes wherever the control is 1. */
export function exactCnot(reg: ExactRegister, control: number, target: number): ExactRegister {
  if (control === target) throw new Error('exactCnot: control and target must differ')
  const c = 1 << control
  const t = 1 << target
  const amps = reg.amps.slice()
  for (let i = 0; i < reg.amps.length; i += 1) {
    if ((i & c) !== 0 && (i & t) === 0) { const j = i | t; amps[i] = reg.amps[j]!; amps[j] = reg.amps[i]! }
  }
  return { ...reg, amps }
}

/** CZ: negate the amplitude where both qubits are 1. Symmetric in its arguments. */
export function exactCz(reg: ExactRegister, a: number, b: number): ExactRegister {
  if (a === b) throw new Error('exactCz: qubits must differ')
  const mask = (1 << a) | (1 << b)
  const amps = reg.amps.slice()
  for (let i = 0; i < reg.amps.length; i += 1) {
    if ((i & mask) === mask) { const z = reg.amps[i]!; amps[i] = { re: -z.re, im: -z.im } }
  }
  return { ...reg, amps }
}

/** A probability as an exact fraction in lowest terms. Never a float. */
export interface ExactProbability { readonly numerator: bigint; readonly denominator: bigint }

const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b))

/**
 * |amplitude|² / 2^scale, reduced. The √2 in the scale squares to 2, which is
 * why the exponent is halved here and why nothing irrational survives.
 */
export function exactProbability(reg: ExactRegister, index: number): ExactProbability {
  const a = reg.amps[index]
  if (!a) throw new Error(`exactProbability: index ${index} outside ${reg.amps.length} amplitudes`)
  const num = a.re * a.re + a.im * a.im
  const den = 1n << BigInt(reg.scale)
  const g = gcd(num, den) || 1n
  return { numerator: num / g, denominator: den / g }
}

/** Every probability, exact. */
export function exactProbabilities(reg: ExactRegister): ExactProbability[] {
  return reg.amps.map((_, i) => exactProbability(reg, i))
}

/**
 * The distribution sums to exactly one, or this returns false.
 *
 * The float simulator sums to 1 + 2.2e-16 and passes its own check because the
 * check has a tolerance. There is no tolerance here: the sum is a rational and
 * it either is one or it is not.
 */
export function exactlyNormalised(reg: ExactRegister): boolean {
  let num = 0n
  for (const a of reg.amps) num += a.re * a.re + a.im * a.im
  return num === (1n << BigInt(reg.scale))
}

/** For comparing against the float simulator, and for nothing else. */
export function asFloat(p: ExactProbability): number {
  return Number(p.numerator) / Number(p.denominator)
}
