# Phase 2 Kickoff — HISTORICAL

> **Superseded.** Phase 2 is implemented. This file is the plan written
> *before* the work, kept for the record; where it disagrees with the code, the
> code is right. The as-built description is
> `docs/QUANTUM_PHASE_2_STATE_TOMOGRAPHY.md`.
>
> Two things here did not survive contact with the implementation:
>
> - The reconstruction sketch below averages projectors. The code does **linear
>   inversion on the Bloch vector**, which makes `trace(ρ) = 1` and
>   `ρ₀₀ = P(Z=0)` exact equalities rather than approximations.
> - "Detect ... with >99% confidence" describes a statistical bound. What the
>   code computes is the **fraction of the channel sampled** — coverage, not
>   confidence. Reporting one as the other would overstate it, so the criterion
>   was restated rather than ticked.
>
> The Phase 1 status it depends on was also wrong at the time: the "tested
> quantum cipher" it lists as a dependency did not use its key. See
> `STATUS_READY_GO.md`.

## What We Had (as claimed, before verification)

✅ **Tested quantum cipher** — *the suite reported success while failing*
✅ **Fold tier 4** (Chain Verification) — held up
✅ **Merkle receipt chain** — held up, though it needed `merkleFoldOrdered`
   before its root could detect a reordering
✅ **Measurement framework** ready to extend — held up

---

## Phase 2 Goal (8 Weeks)

**Build quantum state tomography:** Verify quantum states via multi-basis measurement without destroying them.

**Why:** Detect if adversary substituted state. Alice sends state A, but Eve intercepts and sends state B. Tomography catches it with >99% confidence.

**Deliverable:** `QuantumStateTomography` class integrated with `QuantumFoldCipher`

---

## Week-by-Week Execution

### Week 1-2: Mathematics Foundation

**Task 1.1:** Density matrix reconstruction
```typescript
// Input: Z-basis outcomes (1000), X-basis (1000), Y-basis (1000)
// Output: Complex[][] density matrix

function reconstructDensityMatrix(
  zOutcomes: number[],
  xOutcomes: number[],
  yOutcomes: number[]
): Complex[][] {
  // ρ = average of all |outcome⟩⟨outcome| projectors
  // Compute eigenvalues λᵢ and eigenvectors
  // Return reconstructed state
}
```

**Task 1.2:** Fidelity calculation
```typescript
// ⟨expected|ρ|expected⟩ = overlap with expected state
function calculateFidelity(
  expected: QuantumStateUUID,
  reconstructed: Complex[][]
): number {
  // return value 0-1 (1 = perfect match)
}
```

**Task 1.3:** Purity & entropy
```typescript
function calculatePurity(rho: Complex[][]): number {
  // Tr(ρ²) = measure of purity
  // Pure states: purity = 1
  // Mixed states: purity < 1
}

function calculateEntropy(rho: Complex[][]): number {
  // von Neumann entropy S = -Σ λᵢ log λᵢ
  // Quantifies mixedness
}
```

**Success criteria:**
- [ ] Fidelity accurate to ±1%
- [ ] Purity calculation verified on 10 test states
- [ ] Entropy computed correctly

---

### Week 3-4: Measurement Integration

**Task 2.1:** Measurement collection
```typescript
function collectMeasurements(
  state: QuantumStateUUID,
  basis: 'Z' | 'X' | 'Y',
  numShots: number = 1000
): number[] {
  // Measure state in given basis
  // Return array of outcomes (0 or 1)
  // Length = numShots
}
```

**Task 2.2:** Receipt chain for measurements
```typescript
function recordMeasurementBatch(
  state: QuantumStateUUID,
  allOutcomes: { z: number[], x: number[], y: number[] }
): {
  zReceipt: string[]   // Chain of Z-basis measurements
  xReceipt: string[]   // Chain of X-basis measurements
  yReceipt: string[]   // Chain of Y-basis measurements
  batchRoot: string    // Merkle root of all measurements
}
```

**Success criteria:**
- [ ] All 3000 measurements (1000 per basis) recorded
- [ ] Receipt chain never breaks (all verifiable)
- [ ] Batch root matches recomputation

---

### Week 5-6: Tomography Verification

**Task 3.1:** Tomography performance
```typescript
export class QuantumStateTomography {
  performTomography(
    state: QuantumStateUUID,
    numShots: number = 1000
  ): TomographyResult {
    // 1. Measure in Z, X, Y bases
    const zOutcomes = collectMeasurements(state, 'Z', numShots)
    const xOutcomes = collectMeasurements(state, 'X', numShots)
    const yOutcomes = collectMeasurements(state, 'Y', numShots)
    
    // 2. Reconstruct density matrix
    const rho = reconstructDensityMatrix(zOutcomes, xOutcomes, yOutcomes)
    
    // 3. Calculate properties
    const fidelity = calculateFidelity(state, rho)
    const purity = calculatePurity(rho)
    const entropy = calculateEntropy(rho)
    
    // 4. Create merkle proof
    const proof = merkleFold([
      toUuid(`z:${zOutcomes.join(',')}`),
      toUuid(`x:${xOutcomes.join(',')}`),
      toUuid(`y:${yOutcomes.join(',')}`)
    ])
    
    return {
      densityMatrix: rho,
      fidelity,
      purity,
      entropy,
      proof,
      measurements: { z: zOutcomes, x: xOutcomes, y: yOutcomes }
    }
  }

  verifyTomography(
    expected: QuantumStateUUID,
    tomography: TomographyResult,
    minFidelity: number = 0.95
  ): boolean {
    return tomography.fidelity >= minFidelity
  }
}
```

**Task 3.2:** Adversary detection
```typescript
function detectStateSubstitution(
  aliceStates: QuantumStateUUID[],
  numToVerify: number = aliceStates.length / 10
): {
  adversaryDetected: boolean
  confidenceLevel: number // 0-1
  minFidelity: number
} {
  // Randomly select subset of states to tomograph
  const toVerify = selectRandom(aliceStates, numToVerify)
  
  // Perform tomography on each
  const fidelities = toVerify.map(state => {
    const tomo = performTomography(state)
    return tomo.fidelity
  })
  
  // If any fidelity < 0.95, adversary detected
  const minFidelity = Math.min(...fidelities)
  const adversaryDetected = minFidelity < 0.95
  
  // Confidence = fraction of verified states
  const confidenceLevel = numToVerify / aliceStates.length
  
  return { adversaryDetected, confidenceLevel, minFidelity }
}
```

**Success criteria:**
- [ ] Fidelity > 0.95 for known states
- [ ] Detects state substitution >99% confidence
- [ ] Performance: <100ms per tomography

---

### Week 7-8: Fold Integration & Release

**Task 4.1:** Integrate with QuantumFoldCipher
```typescript
// Extend QuantumFoldCipher to include tomography
class QuantumFoldCipherWithTomography extends QuantumFoldCipher {
  private tomography: QuantumStateTomography
  
  // Add tomography facet to computesGate()
  computesGate(): QuantumCipherGate {
    const baseFacets = super.computesGate()
    
    // Add tomography verification
    const tomo = this.tomography.performTomography(this.preparedState)
    const tomoFacet = {
      facet: 'state-tomography',
      on: tomo.fidelity > 0.95,
      receipt: tomo.proof
    }
    
    // Merge all facets (now 7 instead of 6)
    return computesGate('quantum-cipher-with-tomography', [
      ...baseFacets.facets,
      tomoFacet
    ])
  }
}
```

**Task 4.2:** Testing
```typescript
// Test 1: Fidelity accuracy
testFidelityAccuracy() {
  for (let i = 0; i < 100; i++) {
    const state = encodeQuantumState('Z', 0, i)
    const tomo = performTomography(state)
    assert(tomo.fidelity > 0.99, `State ${i}: fidelity too low`)
  }
}

// Test 2: Adversary detection
testAdversaryDetection() {
  const validStates = [...] // 1000 valid states
  const substituted = validStates.slice(0, 10) // 10 swapped
  
  const result = detectStateSubstitution(validStates, 100)
  assert(result.adversaryDetected, "Should detect substitution")
  assert(result.confidenceLevel > 0.99, "Confidence > 99%")
}

// Test 3: Receipt chain integrity
testReceiptChain() {
  // All measurement receipts must verify
  const results = performTomography(state, 1000)
  for (const receipt of results.receipts) {
    assert(verifyMeasurementReceipt(receipt), "Receipt tampered")
  }
}
```

**Success criteria:**
- [ ] 900+ LOC code
- [ ] 20+ unit tests
- [ ] >90% code coverage
- [ ] All tests passing

**Task 4.3:** Documentation
- [ ] API reference
- [ ] Integration guide
- [ ] Usage examples
- [ ] Mathematical foundations

---

## Execution Checklist (Start Today)

### Immediate (Today)
```
□ Create src/security/quantum-state-tomography.ts
□ Create src/security/quantum-state-tomography.test.ts
□ Write density matrix reconstruction algorithm
□ Verify fidelity calculation formula
```

### This Week
```
□ Implement all 3 math functions (reconstruction, fidelity, purity)
□ Test on 10 reference states
□ Start measurement collection
□ Get CI/CD green (all imports working)
```

### Next Week
```
□ Complete measurement receipt integration
□ Implement adversary detection logic
□ Begin comprehensive testing
□ Start documentation
```

### Weeks 3-4
```
□ Finish all code implementation
□ 20+ tests passing
□ Integration with QuantumFoldCipher working
□ Code coverage >90%
```

### Weeks 5-8
```
□ Final testing & hardening
□ Documentation complete
□ Public API ready
□ Release Phase 2
```

---

## Go/No-Go Gate

**Ready to proceed to Phase 3 when:**
- [ ] Fidelity measurements accurate to ±1%
- [ ] Adversary substitution detected >99% confidence
- [ ] All measurements in tamper-proof receipt chain
- [ ] 900+ LOC production code
- [ ] Tests: >90% code coverage
- [ ] Documentation: Complete

---

## Resource Requirements

**Team:**
- 1 Quantum mathematician (fidelity/purity/entropy formulas)
- 1 Software engineer (implementation)
- 1 QA engineer (testing)

**Timeline:** 8 weeks
**Budget:** $1.5M
**Expected delivery:** Week of Q3 2026

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Fidelity accuracy | ±1% | — (to measure) |
| Adversary detection | >99% | — (to verify) |
| Code coverage | >90% | — (to achieve) |
| LOC | 900+ | 0 (starting now) |
| Tests passing | 20+ | 0 (starting now) |
| Time to delivery | 8 weeks | On track |

---

## Start Coding Now

**First file to create:** `src/security/quantum-state-tomography.ts`

**First function:** `reconstructDensityMatrix(zOutcomes, xOutcomes, yOutcomes)`

**First test:** Verify fidelity on 10 reference states

**Timeline to first working prototype:** 1 week

---

**Status: READY TO GO 🟢**

**Starting Phase 2 implementation immediately.**

No blockers. All dependencies from Phase 1 ready.

**Push green. Ship fast. Continue momentum. 🚀**

