---
title: ZeroPoint Quantum Module — Usage Guide
---

# ZeroPoint Quantum Module — Usage Guide

Practical patterns for building, simulating, and verifying quantum circuits.

---

## Quick Start

Import and build the Bell state:

```typescript
import { circuit } from 'zeropoint-node/quantum'

const bell = circuit(2)
  .h(0)           // Hadamard on qubit 0
  .cnot(0, 1)     // CNOT: control=0, target=1
  .run()          // Execute on |00⟩

const probs = circuit(2).h(0).cnot(0, 1).probabilities()
// probs = [0.5, 0, 0, 0.5]  →  50% |00⟩, 50% |11⟩
```

---

## Building Circuits with the DSL

### Fluent Builder Pattern

The DSL records gates as thunks and applies them sequentially to an initial state:

```typescript
const c = circuit(3)
  .h(0)
  .h(1)
  .x(2)           // Start: |110⟩ after gates
  .cnot(0, 2)     // Entangle 0 and 2
  .cz(1, 2)       // Phase correlation on 1,2
  .run()          // Returns the final Register

const probs = c.probabilities()
```

### With Angles

```typescript
const c = circuit(1)
  .ry(0, Math.PI / 4)  // Rotation about Y
  .rz(0, Math.PI / 2)  // Rotation about Z
  .run()
```

### Measurement

```typescript
const seeded = 0.7  // Reproducible "random" seed (LCG)

const { outcome, collapsed } = circuit(2)
  .h(0)
  .cnot(0, 1)
  .measure(seeded)

console.log(outcome)  // 0 or 3 (|00⟩ or |11⟩)
```

---

## Statevector Programming (Direct API)

For finer control, work directly with registers:

```typescript
import {
  zeroState,
  applyGate1,
  cnot,
  probabilities,
  H,
  X,
} from 'zeropoint-node/quantum'

// Prepare |01⟩
let s = zeroState(2)
s = applyGate1(s, 1, X)  // Flip qubit 1

// Hadamard on qubit 0
s = applyGate1(s, 0, H)

// Entangle 0 → 1
s = cnot(s, 0, 1)

const p = probabilities(s)
// p[0] ≈ 0.5 (|00⟩)
// p[3] ≈ 0.5 (|11⟩)
```

---

## Algorithms

### Grover's Search

Find a marked item in an unstructured search space:

```typescript
import { groverSearch, mostProbable, cutValue } from 'zeropoint-node/quantum'

// Search for 7 in [0, 15]
const marked = (x: number) => x === 7
const result = groverSearch(4, marked)

const topBit = mostProbable(result)
console.log(topBit)  // 7 (with probability > 0.9)
```

### Shor's Factorization

```typescript
import { shor } from 'zeropoint-node/quantum'

// Factor 15
for (const base of [2, 7, 8]) {
  const factors = shor(15, base)
  if (factors) {
    console.log(`15 = ${factors[0]} × ${factors[1]}`)  // 15 = 3 × 5
    break
  }
}
```

### Deutsch–Jozsa (Constant vs. Balanced)

```typescript
import { deutschJozsa } from 'zeropoint-node/quantum'

// Test if f is constant or balanced
const f = (x: number) => (x & 1) ? 1 : 0  // Balanced: odd ↦ 1, even ↦ 0
const result = deutschJozsa(4, f)

console.log(result)  // 'balanced'
```

### Variational Quantum Eigensolver (VQE)

Find the ground-state energy of H = a·Z + b·X:

```typescript
import { vqe1 } from 'zeropoint-node/quantum'

const a = 3, b = 4
const result = vqe1(a, b, steps=500)

console.log(`Energy: ${result.energy.toFixed(4)}`)
console.log(`Exact:  ${result.exact.toFixed(4)}`)
// Both converge to −√(3²+4²) = −5
```

---

## Noise & Decoherence

### Density-Matrix Simulation

Mixed states for noisy evolution:

```typescript
import {
  pure,
  applyGate,
  applyChannel,
  measureProbs,
  purity,
  bitFlip,
  depolarizing,
} from 'zeropoint-node/quantum'

// Start with a pure state |0⟩
let d = pure(zeroState(1))

// Apply bit-flip noise with probability 0.5
d = applyChannel(d, 0, bitFlip(0.5))

// Check the results
const probs = measureProbs(d)
console.log(`P(0) = ${probs[0]}, P(1) = ${probs[1]}`)  // ≈ 0.5, 0.5

const p = purity(d)
console.log(`Purity = ${p}`)  // ≈ 0.5 (maximally mixed)
```

### Named Noise Channels

| Channel | Use | Effect |
|---|---|---|
| `bitFlip(p)` | Bit-flip error rate | |X error with probability p |
| `phaseFlip(p)` | Dephasing | Z error with probability p |
| `depolarizing(p)` | General noise | Random Pauli with probability p |
| `amplitudeDamping(γ)` | Relaxation / T₁ | Excitation loss with rate γ |

```typescript
// Amplitude damping: |1⟩ relaxes to |0⟩
let d = pure(applyGate1(zeroState(1), 0, X))  // |1⟩
d = applyChannel(d, 0, amplitudeDamping(1))    // Fully relax

const probs = measureProbs(d)
console.log(probs[0])  // 1 (|1⟩ → |0⟩)
```

---

## Quantum Phase Estimation

Estimate the phase of an eigenvalue:

```typescript
import { phaseEstimation } from 'zeropoint-node/quantum'

// U = phase(2π·φ) with eigenvalue e^{2πiφ}
const phi = 3 / 8
const t = 3  // 3 counting qubits

const result = phaseEstimation(t, phi)
console.log(result)  // 3 (since 3/2³ = 3/8)
```

---

## QAOA for MaxCut

Approximate a maximum cut on a graph:

```typescript
import {
  qaoaOptimize,
  mostProbable,
  cutValue,
  maxCut,
} from 'zeropoint-node/quantum'

const edges = [[0, 1], [1, 2], [2, 3], [3, 0]]  // 4-cycle
const n = 4

const best = qaoaOptimize(n, edges, steps=24)
const solution = mostProbable(best.reg)

console.log(`MaxCut (brute force): ${maxCut(n, edges)}`)      // 4
console.log(`QAOA cut value:       ${cutValue(solution, edges)}`) // 4
console.log(`Expected energy:      ${best.expected.toFixed(3)}`)  // ≈ 3.0
```

---

## Teleportation & Superdense Coding

### Teleport an Arbitrary Qubit

```typescript
import { teleport, cx } from 'zeropoint-node/quantum'

// Teleport the state α|0⟩ + β|1⟩
const alpha = cx(3, 4)  // Real part 3/5
const beta = cx(4)      // Real part 4/5 (=0.8); i·0 (imaginary)

const { a0, a1 } = teleport(alpha, beta)

console.log(`Original:   α = ${alpha}, β = ${beta}`)
console.log(`Recovered:  α = ${a0}, β = ${a1}`)
```

### Superdense Coding (Two Classical Bits via One Qubit)

```typescript
import { superdenseCoding } from 'zeropoint-node/quantum'

// Alice sends 2 bits: b0=1, b1=0
const [d0, d1] = superdenseCoding(1, 0)

console.log(`Sent: (${1}, ${0}), Decoded: (${d0}, ${d1})`)
```

---

## Testing & Verification

### Manually Verify a Fact

All algorithms are externally verifiable. To check Grover:

```typescript
import {
  grover,
  probabilities,
  mostProbable,
} from 'zeropoint-node/quantum'

const target = 5
const s = grover(3, target)  // n=3, so 8 basis states
const p = probabilities(s)

// Fact 1: marked state has high probability
console.assert(p[target] > 0.9, 'Grover amplifies the marked state')

// Fact 2: it's the most probable
const top = mostProbable(s)
console.assert(top === target, 'Most probable outcome is the marked item')
```

### Run the Full Test Suite

```bash
npm run quantum:sim
```

This runs 90 self-checks:
- Superposition and interference
- Entanglement
- Algorithm correctness (Grover, Shor, BV, DJ, Simon, etc.)
- Error correction
- Noise channels
- VQE & QAOA

---

## Best Practices

### 1. Use Integer Fractions for Decimals

Respect the float-literal ban:

```typescript
// ✓ Good
const half = 1 / 2
const quarter = 1 / 4

// ✗ Avoid
const half = 0.5
const quarter = 0.25
```

### 2. Seed Randomness for Tests

Never use `Math.random()` in critical code:

```typescript
// ✓ Good (reproducible)
const { outcome } = circuit(2).h(0).cnot(0, 1).measure(0.7)

// ✗ Avoid
const { outcome } = circuit(2).h(0).cnot(0, 1).measure(Math.random())
```

### 3. Export Computed Results

If you build a derived circuit or parameterized ansatz, content-address and export it (see SKILL.md, Wave 6):

```typescript
// In a script:
const bestCircuit = qaoaOptimize(4, edges)
const receipt = computeContentUuid({
  kind: 'qaoa-maxcut',
  edges: JSON.stringify(edges),
  result: bestCircuit.expected,
})
console.log(receipt)  // Stable ID for this result
```

### 4. Verify Before Publishing

Run the full gate before shipping any extension:

```bash
npm run check
```

This wires `quantum:sim` into the pipeline and ensures 90 checks + ratchet gates pass.

---

## Common Patterns

### Parameterized Circuit Ansatz

```typescript
export function parameterizedAnsatz(
  n: number,
  angles: number[],
): Register {
  let c = circuit(n)
  for (let i = 0; i < n; i++) {
    c = c.ry(i, angles[i] || 0)
  }
  for (let i = 0; i < n - 1; i++) {
    c = c.cnot(i, i + 1)
  }
  return c.run()
}
```

### Expectation Value Measurement

```typescript
import { expectationZ, expectationX } from 'zeropoint-node/quantum'

const s = circuit(1).ry(0, Math.PI / 4).run()
const ez = expectationZ(s, 0)  // ⟨Z⟩
const ex = expectationX(s, 0)  // ⟨X⟩
```

### Batch Sampling

```typescript
const shots = 1000
const counts = sample(bell, shots, seed=42)

const freq0 = counts[0] / shots
const freq3 = counts[3] / shots

console.log(`|00⟩: ${(freq0 * 100).toFixed(1)}%`)
console.log(`|11⟩: ${(freq3 * 100).toFixed(1)}%`)
// Should both be ≈50%
```

---

## Limitations & Honest Scope

- **Memory:** exponential in qubit count (statevector scales as 2^n, density matrix as 4^n). Safe for n ≤ 20 on typical hardware.
- **No noise at scale:** density-matrix simulation is correct but dense; practical noise research uses tensor-network / Monte-Carlo variants.
- **No hardware compilation:** this is simulation only, not a targeting framework for real quantum processors.
- **No automatic differentiation:** VQE uses finite-difference gradients, not backprop. Suitable for demos, not large-scale optimization.

---

## Further Reading

- **Technical Specification:** [docs/QUANTUM_SPECIFICATION.md](QUANTUM_SPECIFICATION.md)
- **Self-Checks:** `npm run quantum:sim` (90 externally-recomputable facts)
- **Source Code:** [src/quantum/](https://github.com/ceccec/zeropoint-node/tree/main/src/quantum)

---

**License:** CC BY-NC-ND 4.0. For commercial use or modifications, contact license@zeropoint.bg.
