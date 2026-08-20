/**
 * Lean bridge — what is actually checked, and what is only written down.
 *
 * This module used to report "Verified: 2/2", "Confidence: 100.0%" and
 * "Production Grade (Formally Verified)". None of it was measured. The hash
 * covered the theorem's NAME rather than its proof; `verifyProofCertificate`
 * tested that some strings were non-empty and that a hash was 16 characters,
 * which is true of every certificate this file can construct; `lean_version`
 * was asserted although no Lean has ever run here; and seven of the thirteen
 * Lean scripts below end in `sorry`, which is Lean for "not proved".
 *
 * The scripts are kept verbatim — they were never the problem. What changed is
 * that a certificate now carries two independent, separately reported facts:
 *
 *   lean_status  what the Lean source actually is: a script, a `sorry`
 *                placeholder, an axiom, or absent. Derived by reading the
 *                script, not declared.
 *   seal         whether a RECOMPUTABLE predicate for that theorem ran and
 *                held, against the simulator in `src/quantum/`. Not a proof of
 *                the general theorem — a decision on a concrete instance.
 *
 * A theorem counts as verified here only when its seal holds. `sorry` scripts
 * with a passing seal are reported as sealed-but-not-proved, because a checked
 * instance is not a proof, and an unchecked proof script is not evidence.
 * Nothing in this file claims Lean was invoked, because it was not.
 *
 * To make this honest at the Lean level someone must build the Lean
 * development these scripts gesture at and run `lake build` in CI. Until then
 * the seals are the real content and the scripts are documentation.
 */

import { createHash } from 'node:crypto'
import { digitalRoot, throughVoid, bearingForDigit, VORTEX_SEQUENCE, VORTEX_ORBIT, VORTEX_AXIS } from '../0/index.ts'
import { angleForDigit } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import {
  GIBBS_FORMATION,
  GIBBS_SPLITTING,
  ENTHALPY_FORMATION,
  ENTHALPY_SPLITTING,
  reversiblePotentialMicrovolts,
  thermoneutralPotentialMicrovolts,
  roundTrip,
  selfTest as thermoSelfTest,
  SCALE,
  ELECTRONS,
  FARADAY,
  reversiblePotentialExact,
  thermoneutralPotentialExact,
  energyFromPotential,
} from '../thermo/free-energy.ts'
import {
  balanceFor,
  breakEvenCod,
  TYPICAL_LOADS,
  TREATMENT_DEMAND_DECIJOULES_PER_LITRE,
  selfTest as wastewaterSelfTest,
} from '../thermo/wastewater-energy.ts'
import {
  zeroState,
  applyGate1,
  isNormalized,
  qft,
  iqft,
  grover,
  groverIterations,
  shor,
  measureSyndromeRepetition,
  STEANE_CODE,
  symplecticProduct,
  estimateSurfaceCodeThreshold,
  executeInSuperposition,
  computeInterferencePattern,
  describeQuantumExecution,
} from '../quantum/index.ts'
import { ML_KEM_768 } from '../crypto/ml-kem.ts'
import { sqrt } from '../0/algebra.ts'

// ============================================================================
// PROOF CERTIFICATE TYPES
// ============================================================================

/** What the Lean source for a theorem actually is. Read, never declared. */
export type LeanStatus = 'script' | 'sorry' | 'axiom' | 'absent'

/** Whether a recomputable predicate ran and held for this theorem. */
export type SealStatus = 'held' | 'failed' | 'none'

export interface ProofCertificate {
  readonly theorem_name: string
  readonly statement: string
  readonly proof_script: string
  readonly verified_at: string
  /** Derived from proof_script — 'sorry' means Lean would reject it. */
  readonly lean_status: LeanStatus
  /** 'none' when no executable predicate exists for this theorem. */
  readonly seal: SealStatus
  /** What the seal actually computes, so a reader can judge its weight. */
  readonly seal_basis: string
  /** Content address of statement + script. Changing either changes this. */
  readonly hash: string
}

export interface GateCertificate extends ProofCertificate {
  readonly gate_name: 'Hadamard' | 'PauliX' | 'PauliY' | 'PauliZ' | 'CNOT'
  readonly property: 'unitary' | 'hermitian' | 'involutory'
  readonly proof_lines: number
}

export interface AlgorithmCertificate extends ProofCertificate {
  readonly algorithm: 'Grover' | 'Shor' | 'QFT' | 'VQE' | 'QAOA'
  readonly complexity_bound: string
  readonly speedup_factor: number
}

export interface ECCertificate extends ProofCertificate {
  readonly code: 'Repetition[3,1,1]' | 'Steane[7,1,3]' | 'Surface'
  readonly threshold: number
  readonly min_distance: number
}

// ============================================================================
// LEAN THEOREM LIBRARY
// ============================================================================

export const LEAN_PROOFS = {
  // Gate Properties
  hadamard_squared: `
    theorem hadamard_squared : hadamard * hadamard = 1 := by decide
  `,

  hadamard_unitary: `
    theorem hadamard_unitary : IsUnitary hadamard := by
      constructor
      · rw [Matrix.transpose_conjTranspose]
        -- H† = H (Hadamard is Hermitian)
      · rw [Matrix.transpose_conjTranspose]
  `,

  pauliX_anticommute_pauliY: `
    theorem pauli_anticomm : pauliX * pauliY = -pauliY * pauliX := by decide
  `,

  // Born Rule
  born_rule_sum: `
    theorem born_rule_sum (ψ : QuantumState n) (h : IsNormalized ψ) :
        ∑ i, measurementProb ψ i = 1 := by
      unfold measurementProb IsNormalized stateNorm at *
      simp [sq_sqrt] at h
      simp [← h]
  `,

  // Grover's Algorithm
  grover_amplification: `
    theorem grover_amplification (n : ℕ) (marked : Fin n → Prop) :
        ∃ ψ_final, IsNormalized ψ_final ∧
        ∀ i, marked i → measurementProb ψ_final i ≥ 1 / n := by
      sorry -- Amplitude amplification lemma
  `,

  grover_speedup: `
    theorem grover_speedup (n : ℕ) :
        let quantum_queries := Nat.ceil (π * sqrt n / 4)
        quantum_queries ≤ n := by
      sorry -- O(√N) vs O(N)
  `,

  // QFT Correctness
  qft_unitary: `
    theorem qft_unitary (n : ℕ) : IsUnitary (qftMatrix n) := by
      sorry -- Fourier matrix is unitary
  `,

  // Phase Estimation
  phase_estimation_accuracy: `
    theorem phase_estimation_accuracy (U : Matrix (Fin n) (Fin n) ℂ)
        (precision : ℕ) (h_prec : precision ≥ 4) :
        ∃ θ, |θ_est - θ| ≤ 1 / (2^precision : ℝ) := by
      sorry -- Exponential precision in bits
  `,

  // Error Correction
  repetition_detects_error: `
    theorem repetition_detects_single_error (ψ : QuantumState 2) :
        ∃ syndrome, syndrome uniquely_identifies_error_location := by
      sorry -- [3,1,1] code syndrome decoding
  `,

  surface_code_threshold: `
    theorem surface_code_correctability (error_rate : ℝ)
        (h : error_rate < 1/100) :
        logical_error_rate ≤ O (error_rate ^ 2) := by
      sorry -- Below threshold = exponential suppression
  `,

  // Composability
  tensor_preserves_norm: `
    theorem tensor_preserves_norm (ψ₁ : QuantumState n) (ψ₂ : QuantumState m)
        (h₁ : IsNormalized ψ₁) (h₂ : IsNormalized ψ₂) :
        IsNormalized (tensorProduct ψ₁ ψ₂) := by
      unfold IsNormalized stateNorm tensorProduct at *
      simp [Complex.abs_mul]
      sorry
  `,

  // Post-Quantum Security
  kyber_security: `
    theorem kyber_security : kyber_security_level = 128 := by
      rfl
  `,

  lwe_hardness: `
    axiom lwe_hardness : ¬ (polynomial_time_solves_lwe 768 3329)
  `,
} as const
// ============================================================================
// SEALS - recomputable predicates, the only thing here that counts as checked
// ============================================================================

// 1/sqrt(2) via the repo's algebra, not ambient Math.
const SQRT1_2 = 1 / sqrt(2)
type C = { re: number; im: number }
const c = (re: number, im = 0): C => ({ re, im })

const H: [C, C, C, C] = [c(SQRT1_2), c(SQRT1_2), c(SQRT1_2), c(-SQRT1_2)]
const X: [C, C, C, C] = [c(0), c(1), c(1), c(0)]
const Y: [C, C, C, C] = [c(0), c(0, -1), c(0, 1), c(0)]

const CLOSE = 1e-9
const near = (a: number, b: number): boolean => a - b < CLOSE && b - a < CLOSE

interface Seal {
  /** One line a reader can check the predicate against. */
  readonly basis: string
  /** Decides a concrete instance. Must be able to return false. */
  readonly decide: () => boolean
}

/**
 * Every seal decides an INSTANCE, never the universally quantified theorem.
 * hadamard_squared checks H^2 = I on both computational basis states of one
 * qubit, which for a linear map is the whole story; grover_speedup checks a
 * success probability at one problem size, which is NOT the asymptotic claim.
 * The basis string says which is which so the distinction cannot be lost.
 */
export const SEALS: Record<string, Seal> = {
  hadamard_squared: {
    basis: 'H applied twice to each basis state of one qubit returns the input amplitudes (linearity makes 2 states exhaustive)',
    decide: () => {
      for (const start of [0, 1]) {
        let reg = zeroState(1)
        if (start === 1) reg = applyGate1(reg, 0, X)
        const twice = applyGate1(applyGate1(reg, 0, H), 0, H)
        for (let i = 0; i < 2; i++) {
          if (!near(twice.amps[i]!.re, reg.amps[i]!.re)) return false
          if (!near(twice.amps[i]!.im, reg.amps[i]!.im)) return false
        }
      }
      return true
    },
  },

  hadamard_unitary: {
    basis: 'H preserves the norm of a 3-qubit register (unitary maps are exactly the norm-preserving ones)',
    decide: () => {
      let reg = zeroState(3)
      for (const q of [0, 1, 2]) reg = applyGate1(reg, q, H)
      return isNormalized(reg)
    },
  },

  pauliX_unitary: {
    basis: 'X applied twice is the identity, and X preserves the norm',
    decide: () => {
      const reg = zeroState(2)
      const twice = applyGate1(applyGate1(reg, 0, X), 0, X)
      return isNormalized(twice) && near(twice.amps[0]!.re, 1)
    },
  },

  pauli_anticomm: {
    basis: 'XY and YX differ by an overall sign on both basis states of one qubit',
    decide: () => {
      for (const start of [0, 1]) {
        let reg = zeroState(1)
        if (start === 1) reg = applyGate1(reg, 0, X)
        const xy = applyGate1(applyGate1(reg, 0, Y), 0, X)
        const yx = applyGate1(applyGate1(reg, 0, X), 0, Y)
        for (let i = 0; i < 2; i++) {
          if (!near(xy.amps[i]!.re, -yx.amps[i]!.re)) return false
          if (!near(xy.amps[i]!.im, -yx.amps[i]!.im)) return false
        }
      }
      return true
    },
  },

  born_rule_sum: {
    basis: 'squared amplitudes sum to 1 after a Hadamard layer on 4 qubits',
    decide: () => {
      let reg = zeroState(4)
      for (const q of [0, 1, 2, 3]) reg = applyGate1(reg, q, H)
      const total = reg.amps.reduce((s, a) => s + a.re * a.re + a.im * a.im, 0)
      return near(total, 1)
    },
  },

  qft_unitary: {
    basis: 'inverse QFT undoes QFT on a 3-qubit register, amplitude by amplitude',
    decide: () => {
      let reg = zeroState(3)
      reg = applyGate1(reg, 0, H)
      reg = applyGate1(reg, 2, X)
      const back = iqft(qft(reg))
      for (let i = 0; i < back.amps.length; i++) {
        if (!near(back.amps[i]!.re, reg.amps[i]!.re)) return false
        if (!near(back.amps[i]!.im, reg.amps[i]!.im)) return false
      }
      return true
    },
  },

  grover_amplification: {
    basis: 'Grover leaves the marked state with probability above the 1/N a random guess gets (n=4, N=16)',
    decide: () => {
      const n = 4
      const target = 11
      const out = grover(n, target, groverIterations(1 << n))
      const p = out.amps[target]!.re ** 2 + out.amps[target]!.im ** 2
      return p > 1 / (1 << n)
    },
  },

  grover_speedup: {
    basis: 'INSTANCE ONLY, not the asymptotic bound: round((pi/4)*sqrt(N)) iterations reach probability above 0.9 at N=16',
    decide: () => {
      const n = 4
      const target = 6
      const out = grover(n, target, groverIterations(1 << n))
      const p = out.amps[target]!.re ** 2 + out.amps[target]!.im ** 2
      return p > 9 / 10
    },
  },

  shor_period_finding: {
    basis: 'INSTANCE ONLY: shor(15, 7) returns non-trivial factors whose product is 15',
    decide: () => {
      const factors = shor(15, 7)
      if (!Array.isArray(factors) || factors.length !== 2) return false
      const [p, q] = factors as [number, number]
      if (p <= 1 || q <= 1 || p >= 15 || q >= 15) return false
      return p * q === 15
    },
  },

  repetition_detects_error: {
    basis: 'a clean 3-qubit codeword gives the zero syndrome and a single X error gives a non-zero one, so the syndrome distinguishes them',
    decide: () => {
      // |000> is the logical zero of the repetition code: no error, so the
      // syndrome must be all zero. One X on qubit 0 must show up.
      const clean = measureSyndromeRepetition(zeroState(3))
      if (clean.detected || clean.syndrome.some((b) => b !== 0)) return false
      const flipped = measureSyndromeRepetition(applyGate1(zeroState(3), 0, X))
      return flipped.detected && flipped.syndrome.some((b) => b !== 0)
    },
  },

  steane_corrects_error: {
    basis: 'Steane [[7,1,3]] is a stabiliser group: exactly n-k = 6 generators, symplectically independent (rank 6), pairwise commuting, and distance 3 corrects floor((d-1)/2) = 1 arbitrary error',
    decide: () => {
      const code = STEANE_CODE
      const n = code.physicalQubits
      const k = code.logicalQubits
      if (n !== 7 || k !== 1 || code.distance !== 3) return false
      if ((code.distance - 1) / 2 < 1) return false

      const g = code.generators
      // A stabiliser group for [[n,k,d]] needs exactly n - k generators.
      if (g.length !== n - k) return false
      // Every pair must commute, i.e. have symplectic product zero.
      for (let i = 0; i < g.length; i++) {
        for (let j = i + 1; j < g.length; j++) {
          if (symplecticProduct(g[i]!, g[j]!) !== 0) return false
        }
      }
      // And they must be independent over GF(2), or they fix fewer qubits than
      // claimed. Gaussian elimination on the 2n-bit rows.
      const M = g.map((r) => [...r])
      let rank = 0
      for (let col = 0; col < 2 * n && rank < M.length; col++) {
        let pivot = -1
        for (let r = rank; r < M.length; r++) if (M[r]![col] === 1) { pivot = r; break }
        if (pivot < 0) continue
        const tmp = M[rank]!; M[rank] = M[pivot]!; M[pivot] = tmp
        for (let r = 0; r < M.length; r++) {
          if (r !== rank && M[r]![col] === 1) {
            for (let b = 0; b < 2 * n; b++) M[r]![b] = M[r]![b]! ^ M[rank]![b]!
          }
        }
        rank++
      }
      return rank === n - k
    },
  },

  surface_code_threshold: {
    basis: 'estimateSurfaceCodeThreshold separates the two sides of the 1% threshold: below it reports below, above it does not',
    decide: () => {
      const below = estimateSurfaceCodeThreshold(3, 1 / 1000)
      const above = estimateSurfaceCodeThreshold(3, 1 / 10)
      return below.isBelowThreshold === true && above.isBelowThreshold === false
    },
  },

  kyber_security: {
    basis: 'the shipped ML-KEM parameters are ML-KEM-768 (ek 1184, dk 2400, ct 1088). NIST puts that at category 3, NOT the 128 the Lean script states.',
    decide: () =>
      ML_KEM_768.encapsulationKeyBytes === 1184 &&
      ML_KEM_768.decapsulationKeyBytes === 2400 &&
      ML_KEM_768.ciphertextBytes === 1088,
  },
  doubling_avoids_the_triad: {
    basis: 'VORTEX_ORBIT and VORTEX_AXIS are pinned to computation, not trusted. gcd(2,9) = 1, so every power of 2 is a unit mod 9 and can never be a multiple of 3; 2 is a primitive root, so its orbit is all six units {1,2,4,5,7,8}; 2^6 = 64 = 1 mod 9 gives period 6, which makes six cases exhaustive rather than sampled. Reflection through the void carries {1,4,7} onto {9,6,3}, so the triad is reachable only by reflecting.',
    decide: () => {
      // Bound to the kernel's own constants, not retyped here. VORTEX_AXIS had
      // no reader anywhere in the repository before this seal, so nothing
      // checked it was the triad at all.
      const TRIAD: readonly number[] = VORTEX_AXIS

      // Period 6, from 2^6 = 64 = 1 (mod 9). Without this the six cases below
      // would be a sample; with it they are the whole sequence.
      if (digitalRoot(64) !== digitalRoot(1)) return false

      // The orbit of 2, generated by doubling and folded each step.
      const orbit: number[] = []
      let d = 1
      for (let i = 0; i < 6; i++) {
        orbit.push(d)
        if (TRIAD.includes(d)) return false // a power of two landed on 3, 6 or 9
        d = digitalRoot(d * 2)
      }
      // Six distinct values, and doubling returns to the start: a full cycle.
      if (new Set(orbit).size !== 6 || d !== 1) return false

      // Those six are exactly the units mod 9 — the residues coprime to 9.
      // Everything else mod 9 is a multiple of 3, which is the triad.
      const units = [1, 2, 4, 5, 7, 8]
      if (orbit.slice().sort((a, b) => a - b).join() !== units.join()) return false

      // VORTEX_ORBIT must BE the computed orbit, in doubling order — the
      // constant is pinned to the computation rather than trusted.
      if (VORTEX_ORBIT.join() !== orbit.join()) return false

      // And VORTEX_AXIS must be exactly what the orbit cannot reach: the
      // complement of the orbit in 1..9, in ascending order.
      const complement = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !orbit.includes(n))
      if (TRIAD.join() !== complement.join()) return false

      // VORTEX_SEQUENCE reads orbit then axis, so it is not an arbitrary order.
      if (VORTEX_SEQUENCE.slice(0, orbit.length).join() !== orbit.join()) return false
      if (VORTEX_SEQUENCE.slice(orbit.length).join() !== TRIAD.join()) return false

      // Reflection is where the triad enters: 1 -> 9, 4 -> 6, 7 -> 3.
      if (throughVoid(1) !== 9 || throughVoid(4) !== 6 || throughVoid(7) !== 3) return false

      // And it is an involution, so the reading is reversible, not a relabel.
      for (let n = 0; n <= 9; n++) if (throughVoid(throughVoid(n)) !== n) return false

      // Reflecting the orbit reaches every member of the triad.
      const reflected = orbit.map(throughVoid)
      return TRIAD.every((t) => reflected.includes(t))
    },
  },
  superposition_reports_its_own_state: {
    basis: "the superposition model's prose must follow its measurement, not assert simultaneity regardless. Collapse is decided by one comparison — interference against the threshold — and the description must claim 'all at once' exactly when that comparison says so. While anything is still open the sequence has not computed all at once, and the text must say that.",
    decide: () => {
      const execution = executeInSuperposition()
      const interference = computeInterferencePattern()
      const text = describeQuantumExecution()

      // The reported verdict must be the comparison, not a stored string.
      const collapsedByNumbers = interference.working_solution_probability > 85 / 100
      const collapsedByReport = execution.system_correctness === 'collapsed_to_valid'
      if (collapsedByReport !== collapsedByNumbers) return false

      // The prose takes exactly one of the two branches — never both, never
      // neither, which is what an unconditional closing slogan would do.
      const claimsCollapse = text.includes('COLLAPSED.')
      const admitsOpen = text.includes('STILL SUPERPOSED')
      if (claimsCollapse === admitsOpen) return false

      // And the branch it takes is the one the measurement licenses.
      if (claimsCollapse !== collapsedByNumbers) return false

      // When open, it must publish the shortfall rather than only naming it.
      if (admitsOpen && !text.includes('NOT ALL AT ONCE')) return false
      return true
    },
  },
  merkaba_is_two_mirrored_tetrahedra: {
    basis: "the residues mod 3 cut 1..9 into three triangles, each equilateral on the enneagram (120 degrees apart). Reflection through the void SWAPS {1,4,7} with {3,6,9} and fixes {2,5,8} setwise, with the void root 0 fixed throughout. So {3,6,9,0} and {1,4,7,0} are two tetrahedra sharing exactly the void and carried onto each other by the mirror — a merkaba, of which one tetrahedron is half. From 3 the four vertices are 3 with its two triangle partners and the void.",
    decide: () => {
      const RING = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      const cls = (r: number) => RING.filter((d) => d % 3 === r)
      const up = cls(1)     // 1,4,7
      const equator = cls(2) // 2,5,8
      const down = cls(0)   // 3,6,9
      const key = (a: readonly number[]) => [...a].sort((x, y) => x - y).join(',')

      // Three classes of three, partitioning the ring.
      if (up.length !== 3 || equator.length !== 3 || down.length !== 3) return false
      if (key([...up, ...equator, ...down]) !== key(RING)) return false

      // Each is equilateral on the enneagram: three gaps of 120 degrees.
      for (const t of [up, equator, down]) {
        const b = t.map(bearingForDigit).sort((x, y) => x - y)
        const gaps = [b[1]! - b[0]!, b[2]! - b[1]!, 360 - (b[2]! - b[0]!)]
        if (!gaps.every((g) => g === 120)) return false
      }

      // The mirror swaps the two tetrahedral bases and fixes the equator.
      if (key(up.map(throughVoid)) !== key(down)) return false
      if (key(down.map(throughVoid)) !== key(up)) return false
      if (key(equator.map(throughVoid)) !== key(equator)) return false

      // The void is the shared apex, and it is the mirror's fixed point.
      if (throughVoid(0) !== 0) return false
      const tetraDown = [...down, 0]
      const tetraUp = [...up, 0]
      if (tetraDown.length !== 4 || tetraUp.length !== 4) return false
      const shared = tetraDown.filter((v) => tetraUp.includes(v))
      if (key(shared) !== '0') return false

      // The gateway triangle is the axis the kernel already declares, so this
      // is the same structure the vortex constants describe, not a new one.
      if (key(down) !== key(VORTEX_AXIS)) return false

      // From 3: itself, its two triangle partners, and the void. Four keys.
      const fromThree = [3, ...down.filter((d) => d !== 3), 0]
      return fromThree.length === 4 && key(fromThree) === key(tetraDown)
    },
  },
  agl_acts_on_the_three_triangles: {
    basis: "AGL(1,Z/9) has order 54 and acts on the three triangles — the cosets of {0,3,6} in Z/9, which are the residue classes the merkaba seal uses. The action is transitive with stabiliser 18 and kernel 9, and the induced permutation group is AGL(1,Z/3) of order 6. So the count three is the index of {0,3,6}, derived from the group rather than assumed: orbit x stabiliser = 3 x 18 = 54.",
    decide: () => {
      const units = [1, 2, 4, 5, 7, 8] // the residues coprime to 9
      const maps: ((x: number) => number)[] = []
      for (const a of units) for (let b = 0; b < 9; b++) maps.push((x) => ((a * x + b) % 9 + 9) % 9)
      if (maps.length !== 54) return false

      // The three cosets of {0,3,6}. Written as residues, so 9 appears as 0.
      const T = [[1, 4, 7], [2, 5, 8], [3, 6, 0]]
      const key = (xs: readonly number[]) => [...new Set(xs)].sort((x, y) => x - y).join(',')
      if (key([...T[0]!, ...T[1]!, ...T[2]!]) !== '0,1,2,3,4,5,6,7,8') return false

      // The gateway triangle must be the axis the kernel declares, reduced mod 9.
      if (key(T[2]!) !== key(VORTEX_AXIS.map((d) => d % 9))) return false

      const index = new Map(T.map((t, i) => [key(t), i]))
      const induced = new Set<string>()
      let fixesAll = 0
      let stabilisesFirst = 0
      for (const f of maps) {
        const image = T.map((t) => index.get(key(t.map(f))))
        // Closure: an affine map must send a coset to a coset.
        if (image.some((v) => v === undefined)) return false
        const word = image.join('')
        induced.add(word)
        if (word === '012') fixesAll++
        if (image[0] === 0) stabilisesFirst++
      }

      // Induced group is AGL(1,Z/3); kernel and stabiliser follow from it.
      if (induced.size !== 6) return false
      if (fixesAll !== 9) return false
      if (stabilisesFirst !== 18) return false
      // Transitive on three, so orbit x stabiliser recovers the whole group.
      return 3 * stabilisesFirst === maps.length
    },
  },
  digit_geometry_is_single_valued: {
    basis: "the two independent digit geometries agree and are injective. a432.math.ts angleForDigit and the kernel's bearingForDigit are written separately — the a432 tree does not import the kernel — so this checks they place all nine digits identically and never put two digits at one bearing. angleForDigit used to map nine digits onto six angles, colliding 3 with 5, 2 with 6 and 8 with 9.",
    decide: () => {
      const RING = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      // Injective: nine digits, nine distinct bearings, all whole degrees.
      const kernel = RING.map(bearingForDigit)
      if (new Set(kernel).size !== RING.length) return false
      if (!kernel.every((b) => Number.isInteger(b) && b >= 0 && b < 360)) return false

      // The two definitions must agree digit for digit.
      if (!RING.every((d) => angleForDigit(d) === bearingForDigit(d))) return false

      // Evenly spaced: consecutive bearings differ by one ninth of a turn.
      const sorted = [...kernel].sort((a, b) => a - b)
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i]! - sorted[i - 1]! !== 40) return false
      }

      // 9 at the top is what fixes the ring's phase; without it any rotation
      // would satisfy the spacing check above.
      return bearingForDigit(9) === 270 && bearingForDigit(3) === 30
    },
  },
  free_energy_of_splitting_is_positive: {
    basis: "ΔG = ΔH − TΔS for water, from tabulated standard-state values. Formation is −237 kJ/mol and splitting is +237, so splitting must be paid for; the reversible cell potential ΔG/(nF) is 1229 mV and the thermoneutral ΔH/(nF) is 1481 mV, the gap being TΔS. A split-then-burn cycle breaks even at perfect efficiency and loses otherwise — checked exhaustively over the efficiency grid, not sampled. This is the sign of ΔG, not an engineering limit.",
    decide: () => {
      if (thermoSelfTest().length > 0) return false

      // The sign is the claim. Formation releases work; splitting costs it.
      if (!(GIBBS_FORMATION < 0)) return false
      if (!(GIBBS_SPLITTING > 0)) return false

      // One ledger, read in two directions — so what splitting costs is
      // exactly what burning returns, before any device takes its cut.
      if (ENTHALPY_SPLITTING !== -ENTHALPY_FORMATION) return false
      if (GIBBS_SPLITTING !== -GIBBS_FORMATION) return false

      // Free energy is strictly less than enthalpy: TΔS is real and is owed.
      if (!(GIBBS_SPLITTING < ENTHALPY_SPLITTING)) return false
      const rev = reversiblePotentialMicrovolts()
      const thermo = thermoneutralPotentialMicrovolts()
      if (!(thermo > rev)) return false

      // The perfect cycle breaks even EXACTLY — the boundary case, and the one
      // most favourable to a closed loop.
      const ideal = roundTrip(100, 100, 100)
      if (ideal.net !== 0) return false

      // And no cycle anywhere on the grid gains. Exhaustive over 5% steps in
      // all three efficiencies: 8000 combinations, none of them sampled.
      //
      // The verdict is recomputed from the two energies rather than read off
      // `gainsEnergy`. Trusting that flag let a mutant hardcode it to false and
      // still pass — a seal must not accept the answer from the thing it is
      // judging. `net` is cross-checked against its own definition for the same
      // reason.
      let checked = 0
      for (let e = 5; e <= 100; e += 5) {
        for (let m = 5; m <= 100; m += 5) {
          for (let g = 5; g <= 100; g += 5) {
            checked++
            const r = roundTrip(e, m, g)
            if (r.net !== r.outputRecovered - r.inputRequired) return false
            if (r.outputRecovered > r.inputRequired) return false
            if (r.gainsEnergy !== r.net > 0) return false
          }
        }
      }
      return checked === 8000
    },
  },
  polluted_water_powers_its_own_cleaning_above_a_threshold: {
    basis: "the described machine works, and the fuel is the pollution rather than the water. Clean water carries zero recoverable energy, so it can only owe the treatment demand; organic load carries 13.9 J per mg COD, and above a threshold of about 4200 mg/L the electricity generated exceeds what membrane treatment consumes. Municipal sewage sits below that line and dairy or manure effluent well above it. The threshold is found by scanning, so it is the same quantity the balance reports.",
    decide: () => {
      if (wastewaterSelfTest().length > 0) return false

      // The water itself is not the fuel. At zero load there is nothing to
      // burn, and the plant owes exactly the cost of cleaning.
      const clean = balanceFor(0)
      if (clean.energyInLoad !== 0) return false
      if (clean.electricityGenerated !== 0) return false
      if (clean.netElectricity !== -TREATMENT_DEMAND_DECIJOULES_PER_LITRE) return false

      // A threshold exists and is a genuine boundary: it exports, and one
      // milligram less does not.
      const t = breakEvenCod()
      if (!(t > 0)) return false
      if (!(balanceFor(t).netElectricity > 0)) return false
      if (balanceFor(t - 1).netElectricity > 0) return false

      // Monotone in the load — more pollution never yields less electricity.
      let previous = -1
      for (let cod = 0; cod <= 20000; cod += 100) {
        const e = balanceFor(cod).electricityGenerated
        if (e < previous) return false
        previous = e
      }

      // Conservation still binds: recovery is strictly below the energy the
      // load contains, because capture and engine efficiency are each < 100%.
      for (const { cod } of TYPICAL_LOADS) {
        if (cod === 0) continue
        const b = balanceFor(cod)
        if (b.electricityGenerated >= b.energyInLoad) return false
      }

      // And the model must still place real streams where they actually fall.
      const strongSewage = TYPICAL_LOADS.find((l) => l.name === 'municipal sewage, strong')
      const dairy = TYPICAL_LOADS.find((l) => l.name === 'dairy processing')
      if (!strongSewage || !dairy) return false
      if (balanceFor(strongSewage.cod).selfPowering) return false
      return balanceFor(dairy.cod).selfPowering
    },
  },
  every_model_inverts: {
    basis: "each quantitative result recomputes a second, independent way and the two agree. Entropy recovered from (ΔH − ΔG)/T must equal the tabulated ΔS exactly; ΔG recovered from the EXACT rational potential must return with zero drift, while the rounded microvolt form is separately held to half a microvolt's worth of energy; and the break-even COD found by SCANNING must equal the one obtained by INVERTING the arithmetic, which is a different computation reaching the same integer. Reflection through the void inverts too, being its own inverse.",
    decide: () => {
      // --- free energy: invert ΔG = ΔH − TΔS to recover the entropy --------
      // The forward pass multiplied T by ΔS; dividing it back out must land on
      // the tabulated figure exactly, with no rounding introduced anywhere.
      const T_CENTIKELVIN = 29815
      const TABULATED_ENTROPY_MILLI = -163305
      const recovered =
        ((ENTHALPY_FORMATION - GIBBS_FORMATION) * 1000 * 100) / (T_CENTIKELVIN * SCALE)
      if (recovered !== TABULATED_ENTROPY_MILLI) return false

      // --- cell potential: invert E = ΔG/(nF) to recover ΔG ----------------
      // Exactly, from the rational form. This used to be a bounded check
      // because the microvolt rounding made an exact inverse impossible; the
      // exact potentials exist so that the demand can be equality.
      if (energyFromPotential(reversiblePotentialExact()) !== GIBBS_SPLITTING) return false
      if (energyFromPotential(thermoneutralPotentialExact()) !== ENTHALPY_SPLITTING) return false

      // The ROUNDED form still cannot invert exactly, and must not pretend to.
      // Its drift is held to half a microvolt's worth of energy — nF/20 in
      // these units, a derived bound rather than an eyeballed tolerance.
      const microvolts = reversiblePotentialMicrovolts()
      const backToGibbs = (microvolts * ELECTRONS * FARADAY) / 10
      const drift = backToGibbs - GIBBS_SPLITTING
      const magnitude = drift < 0 ? -drift : drift
      if (!(2 * magnitude <= (ELECTRONS * FARADAY) / 10)) return false
      if (!(magnitude * 1000000 < GIBBS_SPLITTING)) return false

      // --- break-even COD: scanning versus inverting ------------------------
      // balanceFor rounds twice on the way up, so a closed form agreeing with
      // the scan is a real check on both, not a restatement of one.
      const scanned = breakEvenCod()
      const numerator = TREATMENT_DEMAND_DECIJOULES_PER_LITRE * 10000
      const denominator = 139 * 65 * 38
      const exact = numerator / denominator
      const inverted = exact % 1 === 0 ? exact + 1 : exact - (exact % 1) + 1
      if (scanned !== inverted) return false

      // --- reflection is its own inverse ------------------------------------
      for (let d = 0; d <= 9; d++) if (throughVoid(throughVoid(d)) !== d) return false

      return true
    },
  },
}

// ============================================================================
// PROOF GENERATION
// ============================================================================

/** Read what the Lean source is. A sorry anywhere means Lean would reject it. */
export function readLeanStatus(script: string): LeanStatus {
  const s = script.trim()
  if (s.length === 0) return 'absent'
  if (/\bsorry\b/.test(s)) return 'sorry'
  if (/^axiom\b/m.test(s)) return 'axiom'
  return 'script'
}

/**
 * Content address of the claim. Covers the statement and the proof script, so
 * editing either changes the hash. The previous version hashed the theorem's
 * NAME, which stayed constant no matter what the proof said.
 */
export function computeProofHash(statement: string, proof_script: string): string {
  return createHash('sha256').update(statement).update(' ').update(proof_script).digest('hex').slice(0, 16)
}

/** Run the seal for a theorem, if one exists. */
export function runSeal(theorem_name: string): { seal: SealStatus; basis: string } {
  const s = SEALS[theorem_name]
  if (s === undefined) return { seal: 'none', basis: 'no executable predicate for this theorem' }
  // A predicate that throws has not held. Letting it escape would turn a failed
  // seal into a crashed process, which reads like an infrastructure problem
  // rather than the negative result it is.
  try {
    return { seal: s.decide() ? 'held' : 'failed', basis: s.basis }
  } catch {
    return { seal: 'failed', basis: s.basis }
  }
}

function baseCertificate(theorem_name: string, statement: string): ProofCertificate {
  const proof_script = LEAN_PROOFS[theorem_name as keyof typeof LEAN_PROOFS] ?? ''
  const { seal, basis } = runSeal(theorem_name)
  return {
    theorem_name,
    statement,
    proof_script,
    verified_at: new Date().toISOString(),
    lean_status: readLeanStatus(proof_script),
    seal,
    seal_basis: basis,
    hash: computeProofHash(statement, proof_script),
  }
}

export function generateGateCertificate(gate: 'Hadamard' | 'PauliX'): GateCertificate {
  const info = {
    Hadamard: { theorem_name: 'hadamard_unitary', statement: 'IsUnitary hadamard', property: 'unitary' as const },
    PauliX: { theorem_name: 'pauliX_unitary', statement: 'IsUnitary pauliX', property: 'unitary' as const },
  }[gate]
  const base = baseCertificate(info.theorem_name, info.statement)
  return {
    ...base,
    gate_name: gate,
    property: info.property,
    proof_lines: base.proof_script.split('\n').filter((l) => l.trim().length > 0).length,
  }
}

export function generateAlgorithmCertificate(algo: 'Grover' | 'Shor' | 'QFT'): AlgorithmCertificate {
  const info = {
    Grover: { theorem_name: 'grover_speedup', statement: 'Grover search runs in O(sqrt N) time', complexity_bound: 'O(sqrt N)', speedup_factor: 4 },
    // Unsealed: no predicate exists, so no speedup factor is claimed.
    Shor: { theorem_name: 'shor_period_finding', statement: 'Shor finds period r in O(log^3 N) gates', complexity_bound: 'O(log^3 N)', speedup_factor: 0 },
    QFT: { theorem_name: 'qft_unitary', statement: 'QFT is unitary and computable in O(n^2) gates', complexity_bound: 'O(n^2)', speedup_factor: 1 },
  }[algo]
  return {
    ...baseCertificate(info.theorem_name, info.statement),
    algorithm: algo,
    complexity_bound: info.complexity_bound,
    speedup_factor: info.speedup_factor,
  }
}

export function generateECCertificate(code: 'Repetition[3,1,1]' | 'Steane[7,1,3]' | 'Surface'): ECCertificate {
  const info = {
    'Repetition[3,1,1]': { theorem_name: 'repetition_detects_error', statement: 'Repetition code detects single-qubit errors', threshold: 5 / 100, min_distance: 3 },
    'Steane[7,1,3]': { theorem_name: 'steane_corrects_error', statement: 'Steane code corrects arbitrary single-qubit errors', threshold: 1 / 100, min_distance: 3 },
    Surface: { theorem_name: 'surface_code_threshold', statement: 'Surface code corrects arbitrary errors below 1% threshold', threshold: 1 / 100, min_distance: 3 },
  }[code]
  return { ...baseCertificate(info.theorem_name, info.statement), code, threshold: info.threshold, min_distance: info.min_distance }
}

// ============================================================================
// VERIFICATION
// ============================================================================

/**
 * A certificate is verified when its seal HELD - a predicate ran and could
 * have said no. Structural well-formedness is not verification; the previous
 * implementation returned true for every certificate this file can build.
 */
export function verifyProofCertificate(cert: ProofCertificate): boolean {
  return cert.seal === 'held'
}

export function verifyProofChain(certs: ProofCertificate[]): boolean {
  return certs.length > 0 && certs.every(verifyProofCertificate)
}

// ============================================================================
// TRANSCRIPT
// ============================================================================

export interface ProofTranscript {
  readonly title: string
  readonly theorems: readonly string[]
  readonly total_lines: number
  readonly sealed_count: number
  readonly unsealed: readonly string[]
  readonly lean_sorry: readonly string[]
  readonly confidence: number
  readonly timestamp: string
  readonly certificates: ProofCertificate[]
}

export function generateProofTranscript(certs: ProofCertificate[]): ProofTranscript {
  const sealed = certs.filter(verifyProofCertificate)
  return {
    title: 'Quantum system: computational seals (Lean scripts NOT machine-checked)',
    theorems: certs.map((c) => c.theorem_name),
    total_lines: certs.reduce((sum, c) => sum + c.proof_script.split('\n').length, 0),
    sealed_count: sealed.length,
    unsealed: certs.filter((c) => c.seal !== 'held').map((c) => c.theorem_name),
    lean_sorry: certs.filter((c) => c.lean_status === 'sorry').map((c) => c.theorem_name),
    confidence: certs.length === 0 ? 0 : sealed.length / certs.length,
    timestamp: new Date().toISOString(),
    certificates: certs,
  }
}

// ============================================================================
// SYSTEM REPORT
// ============================================================================

export interface VerificationReport {
  readonly gates_sealed: readonly string[]
  readonly algorithms_sealed: readonly string[]
  readonly error_correction_sealed: readonly string[]
  readonly unsealed: readonly string[]
  readonly security_assumptions_stated: readonly string[]
  readonly total_theorems: number
  readonly total_lines_of_proof: number
  readonly sealed_fraction: number
  readonly lean_machine_checked: false
}

function allCertificates(): ProofCertificate[] {
  return [
    ...(['Hadamard', 'PauliX'] as const).map(generateGateCertificate),
    ...(['Grover', 'Shor', 'QFT'] as const).map(generateAlgorithmCertificate),
    ...(['Repetition[3,1,1]', 'Steane[7,1,3]', 'Surface'] as const).map(generateECCertificate),
  ]
}

export function verifyQuantumSystem(): VerificationReport {
  const gates = (['Hadamard', 'PauliX'] as const).map(generateGateCertificate)
  const algos = (['Grover', 'Shor', 'QFT'] as const).map(generateAlgorithmCertificate)
  const ecs = (['Repetition[3,1,1]', 'Steane[7,1,3]', 'Surface'] as const).map(generateECCertificate)
  const all = [...gates, ...algos, ...ecs]
  const held = (x: ProofCertificate): boolean => x.seal === 'held'

  return {
    gates_sealed: gates.filter(held).map((x) => x.gate_name),
    algorithms_sealed: algos.filter(held).map((x) => x.algorithm),
    error_correction_sealed: ecs.filter(held).map((x) => x.code),
    unsealed: all.filter((x) => !held(x)).map((x) => x.theorem_name),
    // "stated", not "formalized": lwe_hardness is an axiom, and Kyber's level
    // is a NIST categorisation (ML-KEM-768 is category 3), not a result proved
    // anywhere in this repository.
    security_assumptions_stated: [
      'LWE_hardness (axiom, assumed)',
      'ML-KEM-768 = NIST category 3',
      'SPHINCS_EUF_CMA (not implemented)',
    ],
    total_theorems: all.length,
    total_lines_of_proof: all.reduce((s, x) => s + x.proof_script.split('\n').length, 0),
    sealed_fraction: all.filter(held).length / all.length,
    lean_machine_checked: false,
  }
}

// ============================================================================
// EXPORT FOR PUBLICATION
// ============================================================================

export function exportProofsForZenodo(): object {
  const report = verifyQuantumSystem()
  const transcript = generateProofTranscript(allCertificates())
  const sealed = report.total_theorems - report.unsealed.length

  return {
    system: 'Quantum Computing System',
    verification_framework:
      'Computational seals in TypeScript. Lean scripts are included as documentation and are NOT machine-checked.',
    seal_report: report,
    proof_transcript: transcript,
    // This previously read 'Production Grade (Formally Verified)' with
    // ready_for_publication: true, regardless of what had been checked.
    confidence_level: sealed + '/' + report.total_theorems + ' theorems carry a passing computational seal; 0/' + report.total_theorems + ' are machine-checked in Lean',
    ready_for_publication: report.unsealed.length === 0 && report.lean_machine_checked,
    caveats: [
      'Seals decide concrete instances, not universally quantified statements.',
      'No Lean toolchain runs in this repository; lean_status is read from the script text.',
      report.unsealed.length + ' of ' + report.total_theorems + ' theorems have no executable predicate.',
    ],
    timestamp: new Date().toISOString(),
  }
}
