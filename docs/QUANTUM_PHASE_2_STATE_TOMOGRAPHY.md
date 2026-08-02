# Phase 2: Quantum State Tomography (Q3 2026)

**Goal:** Verify quantum state properties via measurement without destroying the state.

**Problem:** How do you know a quantum state is correct without measuring it (which destroys it)?

**Solution:** Measure in multiple bases (Z, X, Y), reconstruct density matrix, verify against expected state.

---

## Implementation Specification

### Core Interface

```typescript
// Quantum state tomography
export interface TomographyResult {
  densityMatrix: Complex[][]  // Reconstructed state
  fidelity: number            // 0-1: how close to expected
  purity: number              // 0-1: how pure (not mixed)
  entropy: number             // 0+: von Neumann entropy
  proof: string              // Merkle root of measurements
  measurements: {
    z_basis: number[]        // Z-basis measurement outcomes
    x_basis: number[]        // X-basis measurement outcomes
    y_basis: number[]        // Y-basis measurement outcomes
  }
}

export class QuantumStateTomography {
  // Perform tomography on a quantum state
  performTomography(
    state: QuantumStateUUID,
    numShots: number = 1000,
  ): TomographyResult

  // Verify tomography matches expected state
  verifyTomography(
    expected: QuantumStateUUID,
    tomography: TomographyResult,
    minFidelity: number = 0.95,
  ): boolean

  // Reconstruct state from raw measurements
  reconstructDensityMatrix(
    z_outcomes: number[],
    x_outcomes: number[],
    y_outcomes: number[],
  ): Complex[][]
}
```

### Measurement Strategy

```
For each basis (Z, X, Y):
  ├─ Prepare state
  ├─ Rotate to measurement basis (if X or Y)
  ├─ Measure N times (typically 1000 shots)
  ├─ Record outcomes (0 or 1)
  └─ Create receipt for measurement set

Reconstruct density matrix ρ from outcomes:
  ρ = average of all |outcome⟩⟨outcome| projectors
  
Calculate properties:
  Fidelity = ⟨expected|ρ|expected⟩ (overlap with expected)
  Purity = Tr(ρ²) (how pure vs mixed)
  Entropy = -Σ λᵢ log λᵢ (von Neumann entropy)
```

### Fold Integration (Tier 4)

Receipt chain tracks all tomography measurements:
```typescript
for each basis in [Z, X, Y]:
  for each shot in 1..numShots:
    receipt = recordMeasurement(
      prevReceipt,
      outcome,
      basis,
      qubitIdx
    )

// All receipts folded into single tomography root
tomographyRoot = merkleFold(allReceipts)
```

---

## Attack Detection via Tomography

**What is broken:**
- Adversary could substitute different state
- Alice prepares state A, but adversary intercepts and sends state B
- No way to verify without tomography

**Mirror solution:**
- Perform tomography on subset of states
- Compare fidelity to expected
- Low fidelity → adversary substituted state (detected)

**Implementation:**

```typescript
// Verify Alice's states via tomography
function verifyQuantumChannel(
  aliceStates: QuantumStateUUID[],
  numToVerify: number = aliceStates.length / 10,
): {
  channelValid: boolean
  adversaryDetected: boolean
  confidenceLevel: number // 0-1
} {
  // Randomly select states to tomograph
  const toVerify = selectRandom(aliceStates, numToVerify)
  
  // Perform tomography on each
  const fidelities = toVerify.map(state => {
    const tomo = performTomography(state)
    return tomo.fidelity
  })
  
  // If any fidelity < threshold, adversary detected
  const minFidelity = Math.min(...fidelities)
  const channelValid = minFidelity >= 0.95
  
  // Confidence = fraction of verified states
  const confidenceLevel = numToVerify / aliceStates.length
  
  return {
    channelValid,
    adversaryDetected: !channelValid,
    confidenceLevel,
  }
}
```

---

## Timeline

**Week 1-2:** Density matrix reconstruction math
**Week 3-4:** Measurement outcome processing
**Week 5-6:** Tomography state verification
**Week 7-8:** Integration with fold cipher + tests
**Week 9:** Documentation + examples

**Deliverables:**
- `src/security/quantum-state-tomography.ts` (500 LOC)
- `src/security/quantum-state-tomography.test.ts` (400 LOC)
- `docs/QUANTUM_STATE_VERIFICATION.md`

---

## Success Metrics

- [ ] Fidelity measurement accurate to ±1%
- [ ] Tomography detects state substitution with >99% confidence
- [ ] Measurement receipt chain never breaks
- [ ] Performance: <100ms for 1000-shot tomography
- [ ] All security properties preserve under tomography

