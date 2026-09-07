/**
 * stabilizer-rank.ts — why the T gate is the expensive one, counted exactly.
 *
 * `capacity` names six axes it does not measure, and one of them was asserted
 * from the literature rather than computed: that classical simulation cost
 * grows with the NUMBER OF T GATES rather than with the qubit count. This
 * measures it, and states precisely how far the measurement goes.
 *
 * THE DECOMPOSITION IS EXACT AND IT IS THE WHOLE ARGUMENT. T = diag(1, ζ) is
 * not Clifford, but it is an exact linear combination of two gates that are:
 *
 *     T = a·I + b·S,   2a = 1 + ζ − ζ² + ζ³,   2b = 1 − ζ + ζ² − ζ³
 *
 * Both coefficients live in ℤ[ζ₈] over a denominator of 2, so nothing is
 * approximated — `verifyTDecomposition()` checks a + b = 1 and a + b·i = ζ as
 * integer identities, and the suite runs it. A circuit with t T-gates is
 * therefore an exact sum of 2^t CLIFFORD circuits, and that 2^t is where the
 * hardness lives: qubit count enters each branch polynomially, T count
 * multiplies the number of branches.
 *
 * WHAT IS MEASURED HERE: the decomposition's exactness, and the branch count as
 * a function of t. The branch sum is checked against `clifford-t.ts` running
 * the same circuit directly, so the claim is not "this identity should hold"
 * but "these two computations agree, exactly, on these circuits".
 *
 * WHAT IS NOT, stated because a partial measurement read as a general one is
 * the error the capacity ledger exists to prevent. This does not make anything
 * FASTER. Realising the gain needs each branch carried as a stabilizer tableau
 * with amplitudes extracted from it, and it needs the better decompositions —
 * the literature reaches roughly 2^{0.23t}, not 2^t, by decomposing several T
 * gates together. Neither is implemented. Branches here are run on the exact
 * state vector, so the cost is 2^t · 2^n and strictly worse than running the
 * circuit directly. What this buys is the SCALING LAW as a counted fact rather
 * than a cited one.
 */
import {
  type Zeta8, type CliffordTRegister,
  zeta8, Z8_ZERO, Z8_ONE, Z8_I,
  z8Add, z8Mul, z8Equals,
  ctZeroState, ctH, ctS, ctT, ctX, ctZ, ctCnot, ctCz,
} from './clifford-t.ts'

/** 2a, where T = a·I + b·S. The denominator 2 is carried separately. */
export const T_BRANCH_I: Zeta8 = zeta8(1, 1, -1, 1)
/** 2b. */
export const T_BRANCH_S: Zeta8 = zeta8(1, -1, 1, -1)
/** Every T doubles the branch count, and each branch carries a denominator 2. */
export const T_BRANCH_DENOMINATOR = 2n

/**
 * a + b = 1 and a + b·i = ζ, as integer identities over the shared denominator.
 * If either fails the decomposition is not this decomposition, and every branch
 * count below would be counting the wrong thing.
 */
export function verifyTDecomposition(): { sumsToOne: boolean; reproducesT: boolean } {
  const sum = z8Add(T_BRANCH_I, T_BRANCH_S)
  const onT = z8Add(T_BRANCH_I, z8Mul(T_BRANCH_S, Z8_I))
  return {
    sumsToOne: z8Equals(sum, zeta8(T_BRANCH_DENOMINATOR, 0, 0, 0)),
    reproducesT: z8Equals(onT, zeta8(0, T_BRANCH_DENOMINATOR, 0, 0)),
  }
}

export type Gate = { gate: 'h' | 's' | 't' | 'x' | 'z' | 'cnot' | 'cz'; a: number; b?: number }

export const tCountOf = (gates: readonly Gate[]): number => gates.filter((g) => g.gate === 't').length

/** 2^t branches, which is the claim this file exists to count. */
export const branchCount = (tCount: number): bigint => 2n ** BigInt(tCount)

/**
 * Run one branch: every T is replaced by I (bit clear) or S (bit set), so the
 * circuit is Clifford. The coefficient is the product of the corresponding
 * numerators, over 2^t.
 */
function runBranch(n: number, gates: readonly Gate[], mask: bigint): { reg: CliffordTRegister; coefficient: Zeta8 } {
  let reg = ctZeroState(n)
  let coefficient = Z8_ONE
  let tSeen = 0n
  for (const g of gates) {
    switch (g.gate) {
      case 'h': reg = ctH(reg, g.a); break
      case 's': reg = ctS(reg, g.a); break
      case 'x': reg = ctX(reg, g.a); break
      case 'z': reg = ctZ(reg, g.a); break
      case 'cnot': reg = ctCnot(reg, g.a, g.b ?? 0); break
      case 'cz': reg = ctCz(reg, g.a, g.b ?? 0); break
      case 't': {
        const takesS = ((mask >> tSeen) & 1n) === 1n
        reg = takesS ? ctS(reg, g.a) : reg
        coefficient = z8Mul(coefficient, takesS ? T_BRANCH_S : T_BRANCH_I)
        tSeen += 1n
        break
      }
    }
  }
  return { reg, coefficient }
}

/**
 * The exact amplitudes of a Clifford+T circuit, obtained by summing 2^t Clifford
 * branches. Returns numerators over `2^t · √2^scale`, so it can be compared
 * against the direct simulation without any division.
 */
export function amplitudesByBranching(n: number, gates: readonly Gate[]): {
  amps: Zeta8[]
  scale: number
  branches: bigint
  tCount: number
} {
  const t = tCountOf(gates)
  const branches = branchCount(t)
  const size = 1 << n
  const amps = new Array<Zeta8>(size).fill(Z8_ZERO)
  let scale = 0
  for (let mask = 0n; mask < branches; mask += 1n) {
    const { reg, coefficient } = runBranch(n, gates, mask)
    scale = reg.scale
    for (let i = 0; i < size; i += 1) amps[i] = z8Add(amps[i]!, z8Mul(coefficient, reg.amps[i]!))
  }
  return { amps, scale, branches, tCount: t }
}

/** The same circuit run directly, for comparison. */
export function amplitudesDirect(n: number, gates: readonly Gate[]): CliffordTRegister {
  let reg = ctZeroState(n)
  for (const g of gates) {
    switch (g.gate) {
      case 'h': reg = ctH(reg, g.a); break
      case 's': reg = ctS(reg, g.a); break
      case 't': reg = ctT(reg, g.a); break
      case 'x': reg = ctX(reg, g.a); break
      case 'z': reg = ctZ(reg, g.a); break
      case 'cnot': reg = ctCnot(reg, g.a, g.b ?? 0); break
      case 'cz': reg = ctCz(reg, g.a, g.b ?? 0); break
    }
  }
  return reg
}

/**
 * Do the two agree? The branch sum carries an extra factor of 2^t, so the
 * comparison multiplies the direct amplitudes by it rather than dividing —
 * exact integers on both sides, no tolerance.
 */
export function branchingAgreesWithDirect(n: number, gates: readonly Gate[]): boolean {
  const byBranch = amplitudesByBranching(n, gates)
  const direct = amplitudesDirect(n, gates)
  if (direct.scale !== byBranch.scale) return false
  const factor = zeta8(T_BRANCH_DENOMINATOR ** BigInt(byBranch.tCount), 0, 0, 0)
  for (let i = 0; i < (1 << n); i += 1) {
    if (!z8Equals(byBranch.amps[i]!, z8Mul(direct.amps[i]!, factor))) return false
  }
  return true
}

/**
 * Circuit DEPTH — another axis the capacity ledger listed as unmeasured. Gates
 * on disjoint qubits share a layer; a gate waits for the deepest qubit it
 * touches. Depth is what hardware pays and gate count is not, so counting them
 * separately is the point.
 */
export function circuitDepth(gates: readonly Gate[]): number {
  const readyAt = new Map<number, number>()
  let depth = 0
  for (const g of gates) {
    const qubits = g.gate === 'cnot' || g.gate === 'cz' ? [g.a, g.b ?? 0] : [g.a]
    // Comparisons, not Math.max: math:ban forbids Math.* under src/, and this
    // file's subject is arithmetic that does not need a float helper.
    let layer = 0
    for (const q of qubits) {
      const ready = readyAt.get(q) ?? 0
      if (ready > layer) layer = ready
    }
    for (const q of qubits) readyAt.set(q, layer + 1)
    if (layer + 1 > depth) depth = layer + 1
  }
  return depth
}
