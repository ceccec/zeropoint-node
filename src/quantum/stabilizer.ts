/**
 * stabilizer.ts — the same circuits, in polynomial time, with no amplitudes.
 *
 * WHY THIS FILE EXISTS. This package measured ONE axis of quantum cost — oracle
 * calls — on two functions, found 0 of 7 with any advantage, and I generalised
 * it to "the more quantum the work is, the slower it runs". That generalisation
 * is false, and the counterexample is Gottesman–Knill: a circuit of Clifford
 * gates (H, S, CNOT) is classically simulable in POLYNOMIAL time. The
 * exponential cost this repository pays is a property of the STATE-VECTOR
 * REPRESENTATION it chose, not of the work being quantum.
 *
 * exact.ts and clifford-t.ts hold 2^n amplitudes. This holds a 2n × (2n+1)
 * tableau of bits — Aaronson and Gottesman's — and applies each gate in O(n).
 * Same circuits, same answers, and the cost goes from 2^n to n². `npm run
 * capacity` measures both and puts the numbers beside each other.
 *
 * WHERE THE HARDNESS ACTUALLY LIVES. Not in qubit count and not in "quantum".
 * It is the T gate: Clifford is free, and adding T makes classical simulation
 * expensive in the number of T gates. That is why clifford-t.ts is the file
 * next to this one, and why its boundary — Clifford exact and cheap, T exact
 * and costly, arbitrary rotations absent — is the real shape of the thing.
 *
 * WHAT THIS CANNOT DO, stated because the point of the file is that a partial
 * measurement should not be read as a general one: no T gate, no arbitrary
 * amplitudes, and no amplitude readout at all. A stabilizer state has no
 * amplitudes to give you. It answers measurement outcomes and whether they are
 * determined, which is exactly the fragment Gottesman–Knill covers.
 */

/**
 * Rows 0..n-1 are destabilizers, n..2n-1 stabilizers, and row 2n is scratch.
 * x[i][j] and z[i][j] are the Pauli exponents; r[i] is the sign bit.
 */
export interface Stabilizer {
  readonly n: number
  readonly x: Uint8Array[]
  readonly z: Uint8Array[]
  readonly r: Uint8Array
}

export function stabilizerZeroState(n: number): Stabilizer {
  const x: Uint8Array[] = []
  const z: Uint8Array[] = []
  for (let i = 0; i < 2 * n + 1; i += 1) {
    x.push(new Uint8Array(n))
    z.push(new Uint8Array(n))
  }
  for (let i = 0; i < n; i += 1) {
    x[i]![i] = 1 // destabilizers start as X_i
    z[i + n]![i] = 1 // stabilizers start as Z_i
  }
  return { n, x, z, r: new Uint8Array(2 * n + 1) }
}

/** Every gate touches 2n rows and a constant amount per row. That is the claim. */
export function stabilizerH(s: Stabilizer, a: number): Stabilizer {
  for (let i = 0; i < 2 * s.n; i += 1) {
    s.r[i] = (s.r[i]! ^ (s.x[i]![a]! & s.z[i]![a]!)) as number
    const t = s.x[i]![a]!
    s.x[i]![a] = s.z[i]![a]!
    s.z[i]![a] = t
  }
  return s
}

export function stabilizerS(s: Stabilizer, a: number): Stabilizer {
  for (let i = 0; i < 2 * s.n; i += 1) {
    s.r[i] = (s.r[i]! ^ (s.x[i]![a]! & s.z[i]![a]!)) as number
    s.z[i]![a] = (s.z[i]![a]! ^ s.x[i]![a]!) as number
  }
  return s
}

export function stabilizerCnot(s: Stabilizer, a: number, b: number): Stabilizer {
  for (let i = 0; i < 2 * s.n; i += 1) {
    s.r[i] = (s.r[i]! ^ (s.x[i]![a]! & s.z[i]![b]! & (s.x[i]![b]! ^ s.z[i]![a]! ^ 1))) as number
    s.x[i]![b] = (s.x[i]![b]! ^ s.x[i]![a]!) as number
    s.z[i]![a] = (s.z[i]![a]! ^ s.z[i]![b]!) as number
  }
  return s
}

/** X = HZH, and Z = S², so both are Clifford and cost the same O(n). */
export const stabilizerZ = (s: Stabilizer, a: number): Stabilizer => stabilizerS(stabilizerS(s, a), a)
export const stabilizerX = (s: Stabilizer, a: number): Stabilizer =>
  stabilizerH(stabilizerZ(stabilizerH(s, a), a), a)

/** The phase bookkeeping for multiplying two Pauli rows together. */
function g(x1: number, z1: number, x2: number, z2: number): number {
  if (x1 === 0 && z1 === 0) return 0
  if (x1 === 1 && z1 === 1) return z2 - x2
  if (x1 === 1 && z1 === 0) return z2 * (2 * x2 - 1)
  return x2 * (1 - 2 * z2)
}

function rowsum(s: Stabilizer, h: number, i: number): void {
  let sum = 2 * s.r[h]! + 2 * s.r[i]!
  for (let j = 0; j < s.n; j += 1) sum += g(s.x[i]![j]!, s.z[i]![j]!, s.x[h]![j]!, s.z[h]![j]!)
  const m = ((sum % 4) + 4) % 4
  s.r[h] = (m === 0 ? 0 : 1) as number
  for (let j = 0; j < s.n; j += 1) {
    s.x[h]![j] = (s.x[h]![j]! ^ s.x[i]![j]!) as number
    s.z[h]![j] = (s.z[h]![j]! ^ s.z[i]![j]!) as number
  }
}

/**
 * Measure qubit a in the computational basis. `deterministic` is the part a
 * state vector would make you infer from probabilities: here it is read off the
 * tableau directly. `coin` supplies the outcome when the result is genuinely
 * random, so nothing in this file calls a random source of its own.
 */
export function stabilizerMeasure(s: Stabilizer, a: number, coin: 0 | 1 = 0): { outcome: 0 | 1; deterministic: boolean } {
  let p = -1
  for (let i = s.n; i < 2 * s.n; i += 1) if (s.x[i]![a] === 1) { p = i; break }

  if (p >= 0) {
    for (let i = 0; i < 2 * s.n; i += 1) if (i !== p && s.x[i]![a] === 1) rowsum(s, i, p)
    s.x[p - s.n]!.set(s.x[p]!)
    s.z[p - s.n]!.set(s.z[p]!)
    s.r[p - s.n] = s.r[p]!
    s.x[p]!.fill(0)
    s.z[p]!.fill(0)
    s.z[p]![a] = 1
    s.r[p] = coin
    return { outcome: coin, deterministic: false }
  }

  const scratch = 2 * s.n
  s.x[scratch]!.fill(0)
  s.z[scratch]!.fill(0)
  s.r[scratch] = 0
  for (let i = 0; i < s.n; i += 1) if (s.x[i]![a] === 1) rowsum(s, scratch, i + s.n)
  return { outcome: s.r[scratch]! as 0 | 1, deterministic: true }
}

/**
 * The cost of one gate, counted rather than timed: every gate walks 2n rows.
 * A circuit of g gates on n qubits costs O(g·n) here and O(g·2^n) in a state
 * vector, and `npm run capacity` puts the two side by side.
 */
export const stabilizerGateCost = (n: number): number => 2 * n

/** How many bits the tableau occupies: 2n(2n+1) + 2n, against 2^n amplitudes. */
export const stabilizerBits = (n: number): number => 2 * n * (2 * n + 1) + 2 * n
