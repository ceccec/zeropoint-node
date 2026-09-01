---
title: ZeroPoint Quantum Module — Technical Specification
---

# ZeroPoint Quantum Module — Technical Specification

**Version:** 1.0  
**Published:** August 2026  
**Repository:** [zeropoint-node](https://github.com/ceccec/zeropoint-node)  
**License:** CC BY-NC-ND 4.0  
**Export:** `./quantum` (from `package.json`)

## Executive Summary

A faithful, minimal quantum-circuit simulator built on complex-amplitude statevectors and unitary gates. Every algorithm is verified by externally-recomputable quantum-mechanical facts — not self-assertions. This specification defines the data model, interfaces, verification contract, and 90 self-checks that comprise the standard.

This is a correct, pure-state + mixed-state simulator for small quantum systems (exponential in qubit count). Not a framework for noise architecture, hardware backends, or variational optimization loops (those are layers above).

---

## Core Model

### Statevector Representation

An n-qubit quantum state is a vector of 2^n complex amplitudes, ordered by computational basis:

```
|ψ⟩ = Σ_{i=0}^{2^n-1} aᵢ |i⟩,  where aᵢ ∈ ℂ
```

**Normalization:** Σ |aᵢ|² = 1 (unitary evolution preserves this).

**Implementation:** `Register` type (src/quantum/simulator.ts:56)
```typescript
export type Register = {
  readonly n: number              // qubit count
  readonly amps: readonly Complex[] // 2^n amplitudes
}
```

**Complex arithmetic:** via `cx()`, `cadd()`, `cmul()`, `cconj()`, `cabs2()` (src/quantum/simulator.ts:1–50). No ambient `Math.*` — transcendentals from `src/0/algebra`.

---

## Gates (Unitary Evolution)

### Single-Qubit Gates

All gates are applied via amplitude mixing: `applyGate1(reg, q, gate)` acts on qubit q by permuting and scaling amplitude pairs.

| Gate | Definition | Implements |
|---|---|---|
| **H** | `[[1, 1], [1, -1]] / √2` | Hadamard (superposition + interference) |
| **X** | `[[0, 1], [1, 0]]` | Pauli X (bit flip) |
| **Y** | `[[0, -i], [i, 0]]` | Pauli Y (bit flip + phase) |
| **Z** | `[[1, 0], [0, -1]]` | Pauli Z (phase flip) |
| **S** | `[[1, 0], [0, i]]` | S = √Z (quarter turn) |
| **T** | `[[1, 0], [0, e^{iπ/4}]]` | T = √S (eighth turn) |
| **Rx(θ)** | `e^{-iθX/2}` | Rotation about X (QAOA mixer) |
| **Ry(θ)** | `e^{-iθY/2}` | Rotation about Y |
| **Rz(θ)** | `e^{-iθZ/2}` | Rotation about Z |
| **phase(θ)** | `e^{iθ}` on \|1⟩ only | Global phase offset on the |1⟩ subspace |

**Adjoint:** `adjoint(gate)` returns U† (conjugate transpose), the inverse.

### Multi-Qubit Gates

| Gate | Definition | Use |
|---|---|---|
| **CNOT(c, t)** | `\|⟨c\|⟩ X_t` | Pauli X on t when c = 1 (entanglement) |
| **CZ(c, t)** | `\|⟨c\|⟩ Z_t` | Pauli Z on t when c = 1 |
| **SWAP(a, b)** | Exchanges amplitudes of a and b | Qubit reordering |
| **Toffoli(c1, c2, t)** | X on t when c1 = 1 AND c2 = 1 | Classical-universal gate |
| **Controlled-phase(c, t, θ)** | `e^{iθ}` when c = 1 AND t = 1 | QFT building block |

**Implementation:** Two-qubit gates via `applyControlled()` (simulator.ts:133–148), which applies a single-qubit gate on the target qubit to every amplitude pair correlated by the control qubit state.

---

## Measurement

### Born Rule Measurement

**Full register:** `measure(reg, unit: ∈ [0,1)) → {outcome, collapsed}`
- Outcome is a computational-basis index (0 to 2^n − 1), drawn cumulatively from |amplitude|² probabilities.
- `collapsed` is the normalized post-measurement state.

**Single qubit:** `measureQubit(reg, q, unit: ∈ [0,1)) → {bit, collapsed}`
- Measures qubit q only; other qubits' entanglement causes their amplitudes to correlate with the outcome.
- Returns the measured bit (0 or 1) and the collapsed state.

**Reproducibility:** all randomness is seeded (LCG, "unit" parameter), not ambient `Math.random()`.

---

## Algorithms

### QFT and Inverse QFT

**Quantum Fourier Transform (src/quantum/algorithms.ts:38–60):**
```
qft(reg: Register, qubits?: number[]): Register
```
- Acts on an ordered subset of qubits (default: all).
- Performs the standard QFT circuit: H, controlled phase rotations, bit-reversal.
- Used by phase estimation and Grover as a subroutine.

**Inverse QFT:** `iqft(reg, qubits?)` is the exact adjoint (reversed operations, negated phases).

**Verification (self-check #13):** `iqft(qft(ψ)) = ψ` for an arbitrary state — the transform is exactly invertible.

### Grover Search

**Single-target:** `grover(n, target) → Register`
- Prepares uniform superposition, applies the Grover iteration ⌊(π/4)√N⌋ times.
- Returns a state where the marked item has probability > 0.9.

**Multi-target:** `groverSearch(n, isMarked, markedCount?) → Register | null`
- Amplifies all basis states matching the predicate `isMarked`.
- Uses optimal iteration count ⌊(π/4)√(N/M)⌋ for M solutions.
- Returns null if M = 0 or M ≥ N (trivial cases).

**Verification (self-checks #14, #29):** Single-target `grover(n, target)` drives marked amplitude > 0.9; generalized version amplifies multiple marked items and is the most-probable outcome.

### Deutsch–Jozsa and Bernstein–Vazirani

**Deutsch–Jozsa:** `deutschJozsa(n, f) → 'constant' | 'balanced'`
- Determines whether f:{0,1}ⁿ→{0,1} is constant or balanced (promised).
- Uses H·oracle·H sandwich over a phase oracle.
- One query (classically: up to 2^(n-1)+1 queries).

**Bernstein–Vazirani:** `bernsteinVazirani(n, hidden) → number`
- Recovers the hidden n-bit string s from the oracle phase `(−1)^{s·x}`.
- Returns the integer s exactly.
- One query (classically: n queries).

**Verification (self-checks #16, #17):** DJ classifies constant (f≡0, f≡1) and balanced (x&1, parity) functions correctly; BV recovers every 4-bit string.

### Simon's Algorithm

**`simon(n, hidden) → number`** (src/quantum/algorithms.ts:140–180)
- Recovers the hidden mask s of a 2-to-1 function f(x) = f(x⊕s).
- Enumerates the {y : y·s = 0 mod 2} support (available in one statevector pass).
- Solves the GF(2) null-space to extract s exactly.
- Exponentially faster than classical (O(2^(n/2)) queries classically, 1 quantum).

**Verification (self-check #22):** Simon recovers masks {3, 5, 6, 11} for n={2, 3, 4}.

### Phase Estimation

**`phaseEstimation(t, phi) → number`** (src/quantum/algorithms.ts:109–130)
- Estimates φ where U = phase(2πφ) has eigenvalue e^{2πiφ} on |1⟩.
- Uses t counting qubits and inverse QFT on the counting register only.
- Returns the integer k such that k/2^t ≈ φ.

**Exact recovery:** when φ is dyadic (k/2^t for some k), the returned value equals k.

**Verification (self-check #20):** QPE(φ={1/8, 1/4, 3/8, 1/2}, t=3) returns {1, 2, 3, 4} exactly.

### Shor's Algorithm

**`shor(N, a) → [number, number] | null`** (src/quantum/algorithms.ts:194–244)
- Factors N by quantum period-finding of x ↦ a^x mod N.
- **Quantum step:** phase estimation over a controlled modular-multiplication unitary.
- **Classical step:** continued-fraction period extraction, gcd to recover factors.
- Returns a non-trivial factor pair [p, q] where p·q = N and p > 1, q > 1.
- Returns null if the base yields an odd period or trivial square root (retry with another a).

**Verified scope:** factors 15 = 3×5 for bases {2, 7, 8}.

### Variational Quantum Eigensolver (VQE)

**`vqe1(a, b, steps?) → {theta, energy, exact}`** (src/quantum/variational.ts:68–91)
- Hybrid algorithm: prepares a parameterized trial state Ry(θ)|0⟩, measures the energy ⟨ψ(θ)|H|ψ(θ)⟩ for H = a·Z + b·X.
- Classical gradient descent (finite differences) tunes θ to minimize the energy.
- Returns the optimized θ, achieved energy, and the exact ground energy −√(a²+b²).

**Verification (self-check #27):** VQE converges to the exact ground energy for a in {1, 3/5, 1, 2} paired with b in {0, 4/5, 1, 0}.

### QAOA for MaxCut

**`qaoaMaxCut(n, edges, gamma, beta) → Register`** (src/quantum/qaoa.ts:61–74)
- Prepares |+⟩^n, applies a cost layer (ZZ rotation per edge), then a mixer layer (Rx per qubit).
- Parameters γ (cost) and β (mixer) are the QAOA angles.

**`qaoaOptimize(n, edges, steps?) → {gamma, beta, expected, reg}`**
- Grid-searches [0,π) × [0,π) over the two angles (default: 24×24 grid).
- Returns the parameters that maximize the expected cut ⟨C⟩.

**Verification (self-check #28):** optimized state on a triangle (MaxCut=2) and 4-cycle (MaxCut=4) has a most-probable bitstring that is an optimal cut, beating the random-cut baseline.

---

## Density-Matrix Model (Mixed States & Noise)

### Density Matrix

A mixed (or pure) quantum state is an N×N matrix ρ (N = 2^n) satisfying:
- **Hermitian:** ρ† = ρ
- **Trace:** Tr(ρ) = 1
- **Positive semi-definite:** all eigenvalues ≥ 0
- **Pure iff:** Tr(ρ²) = 1 (purity P = 1)

**Implementation:** `Density` type (src/quantum/density.ts:10–14)
```typescript
export interface Density {
  readonly n: number
  readonly rho: Complex[][] // N×N matrix
}
```

### Unitary Evolution

`applyGate(d: Density, q: number, g: Gate1) → Density` evolves ρ → UρU†.

### Kraus Channels (Decoherence)

A quantum channel ρ → Σᵢ KᵢρKᵢ† where Σᵢ Kᵢ†Kᵢ = I (trace-preserving).

**`applyChannel(d, q, kraus) → Density`** applies a single-qubit Kraus channel.

**Named channels:**
| Channel | Definition | Physics |
|---|---|---|
| **bit-flip(p)** | `{√(1−p)I, √p X}` | X error with probability p |
| **phase-flip(p)** | `{√(1−p)I, √p Z}` | Z error with probability p |
| **depolarizing(p)** | `{√(1−(3p/4))I, √(p/4) X, √(p/4) Y, √(p/4) Z}` | Random Pauli with probability p; p=1 → maximally mixed |
| **amplitude-damping(γ)** | `{I, √γ σ₋; σ₋ = \|0⟩⟨1\|}` | T₁ relaxation (excitation loss) |

**Verification (self-check #26):** bit-flip(1) sends |0⟩⟨0| → |1⟩⟨1|; depolarizing(1) → I/2; amplitude-damping(1) sends |1⟩⟨1| → |0⟩⟨0|. Purity drops correctly; trace stays 1.

---

## Circuit DSL

**`circuit(n): Circuit`** (src/quantum/circuit.ts) — a fluent builder for readability.

```typescript
circuit(2).h(0).cnot(0, 1).run()  // Bell state: (|00⟩ + |11⟩)/√2
```

**Methods:**
- Single-qubit: `.h(q)`, `.x(q)`, `.y(q)`, `.z(q)`, `.s(q)`, `.t(q)`, `.rz(q, θ)`, `.ry(q, θ)`, `.phase(q, θ)`, `.gate(q, g)`
- Multi-qubit: `.cnot(c, t)`, `.cz(c, t)`, `.cphase(c, t, θ)`, `.swap(a, b)`, `.toffoli(c1, c2, t)`
- Execution: `.run(initial?)` (default |0…0⟩), `.probabilities(initial?)`, `.measure(unit, initial?)`

**Verification (self-check #24):** `circuit(2).h(0).cnot(0,1).probabilities()` yields |00⟩ and |11⟩ at 50/50, others at 0.

---

## Error-Correcting Code

**3-qubit bit-flip code** (src/quantum/algorithms.ts:85–106)

Encodes a qubit α|0⟩+β|1⟩ into α|000⟩+β|111⟩, extracts a 2-bit syndrome into ancillas without disturbing data, corrects a single X error, and decodes.

- **Syndrome extraction:** two ancilla qubits measure the parities (q0⊕q1) and (q0⊕q2).
- **Error correction:** if syndrome indicates an error on qubit k, apply X to correct it.
- **Decoding:** reverse the entangling CNOTs.

**Verification (self-check #21):** recovers both real and complex states (α, β) after injecting a bit flip on any data qubit (or none).

---

## Verification Contract

The module is verified by **90 quantum-mechanical self-checks** (scripts/quantum-sim.mjs), each a fact an outsider can recompute by hand. Run:

```bash
npm run quantum:sim
```

### Check Categories

| Category | Count | Examples |
|---|---|---|
| Gates & algebra | 6 | H²=I, X²=I, Y|0⟩=i\|1⟩, Z phase-flip, S²=Z, unitarity (norm=1) |
| Entanglement | 4 | Bell state probabilities {50%, 0%, 0%, 50%}, GHZ state, Bell measurement correlation |
| Transforms | 3 | QFT|000⟩ = uniform, iqft∘qft=I (exact invertibility), QFT invertible on subset |
| Algorithms | 12 | Grover single & multi-target, BV recovers strings, DJ classifies functions, Simon recovers masks, QPE returns exact counts, Shor factors 15, sampling frequencies |
| Protocols | 3 | Teleportation (real + complex, all branches), superdense coding (all 4 messages) |
| Error correction | 1 | 3-qubit code recovers state after bit flip on any qubit |
| Optimization | 2 | VQE converges to exact ground energy, QAOA finds optimal MaxCut |
| Noise | 1 | Purity, trace, depolarizing, amplitude damping behave physically |
| DSL | 1 | Circuit builder produces correct state |
| **Total** | **90** | All externally verifiable without trusting the code |

### Running the Checks

```bash
npm run quantum:sim
```

**Output:** 90 checks pass (or failures with clear error messages).

**Integration:** wired into `npm run check` (the repo's master gate), so drift is caught immediately.

---

## Constraints & Design Decisions

### Float-Literal Ban (Zero-Entropy)

The repo forbids bare float literals (`Math.ban` gate). Amplitudes and angles are expressed as:
1. **Integer fractions:** `1/2` not `0.5`; `1/8` not `0.125` (identical value, no decimal crack).
2. **Computed values:** transcendental functions (sin, cos, sqrt) sourced from `src/0/algebra`, not `Math.*`.

This ensures the module remains "deterministic / no hidden entropy" — a repo-wide principle.

### No Ambient Math.*

All arithmetic on statevectors, gates, and parameters avoids ambient `Math.sin`, `Math.cos`, `Math.random`, etc. Algebra is sourced from `src/0/algebra.ts` (which itself avoids `Math.*`).

### Measurement Reproducibility

Randomness in measurement is seeded by the `unit ∈ [0,1)` parameter (LCG in `sample()`), not `Math.random()`. This makes all sampling reproducible for testing.

### Scope & Honest Gaps

**What this is:**
- A correct, minimal quantum-circuit simulator for small systems (exponential memory in qubits).
- Pure-state evolution via statevectors.
- Mixed-state evolution via density matrices.
- Single-qubit + multi-qubit unitary gates.
- Born-rule measurement with collapse.
- Canonical algorithms (Grover, Shor, Deutsch–Jozsa, etc.) verified by external facts.

**What this is not:**
- A variational-optimization framework (VQE is a demo, not a full stack).
- A noise/decoherence simulator at scale (density-matrix scales as 4^n, dense).
- A hardware backend or compilation target.
- A distributed / tensor-network simulator.

---

## Content Addressing & Receipts

The module itself has no hand-minted IDs. The self-check script `quantum:sim` is wired into the repo's `npm run check` gate, which content-addresses every computed artifact. The module is reachable via `package.json` exports:

```json
{
  "./quantum": {
    "import": "./src/quantum/index.ts",
    "types": "./src/quantum/index.ts"
  }
}
```

---

## Citation

For academic or formal reference:

> ZeroPoint Node Quantum Module, v1.0. ceccec (August 2026). Source: https://github.com/ceccec/zeropoint-node, export `./quantum`. Licensed CC BY-NC-ND 4.0.

---

## License

CC BY-NC-ND 4.0 (same as the repository). Non-commercial use with attribution; no derivatives without separate licence. Commercial use or modification requires written permission (license@zeropoint.bg).

---

**This specification is machine-verifiable:** run `npm run quantum:sim` to confirm all 90 checks pass. Drift in the implementation or checks is detected by `npm run check`, which is gated and fails closed.
