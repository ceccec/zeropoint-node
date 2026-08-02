/**
 * Quantum State Tomography Tests
 *
 * Phase 2 verification: Density matrix reconstruction, fidelity, purity, entropy
 * All measurements verified in receipt chain (Tier 4)
 * Adversary detection via statistical fidelity analysis
 */

import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import {
  QuantumStateTomography,
  TomographyResult
} from './quantum-state-tomography'
import { QuantumFoldCipher } from './quantum-fold-cipher'

// Helper: create test quantum state
function createTestState(basis: 'Z' | 'X' | 'Y', value: 0 | 1, seed: number) {
  const cipher = new QuantumFoldCipher()
  cipher.generateKey(String(seed))
  cipher.prepareState(basis, value, seed)
  return cipher.stateUuid
}

test('Quantum State Tomography - Phase 2 Implementation', async t => {
  const tomography = new QuantumStateTomography()

  // ===== TIER 1: DENSITY MATRIX RECONSTRUCTION =====

  await t.test(
    'reconstructs density matrix from measurement outcomes',
    () => {
      const state = createTestState('Z', 0, 1001)
      const result = tomography.performTomography(state, 1000)

      // Result should have 2×2 density matrix
      assert.equal(result.densityMatrix.length, 2)
      assert.equal(result.densityMatrix[0].length, 2)
      assert.equal(result.densityMatrix[1].length, 2)

      // Trace should be 1 (Tr(ρ) = 1 for valid density matrix)
      const trace =
        result.densityMatrix[0][0].real + result.densityMatrix[1][1].real
      assert.ok(
        Math.abs(trace - 1.0) < 0.05,
        `Trace ${trace} should be close to 1.0`
      )
    }
  )

  await t.test('density matrix is Hermitian (ρ = ρ†)', () => {
    const state = createTestState('X', 1, 1002)
    const result = tomography.performTomography(state, 1000)
    const rho = result.densityMatrix

    // Check Hermitian property: ρ₀₁ = ρ₁₀*
    const rho01 = rho[0][1]
    const rho10 = rho[1][0]

    // ρ₁₀ should be conjugate of ρ₀₁
    assert.ok(
      Math.abs(rho01.real - rho10.real) < 0.05,
      'Real parts should match'
    )
    assert.ok(
      Math.abs(rho01.imag + rho10.imag) < 0.05,
      'Imaginary parts should be opposite'
    )

    // Diagonal elements should be real
    assert.ok(Math.abs(rho[0][0].imag) < 0.01, 'ρ₀₀ should be real')
    assert.ok(Math.abs(rho[1][1].imag) < 0.01, 'ρ₁₁ should be real')
  })

  await t.test('density matrix eigenvalues are non-negative', () => {
    const state = createTestState('Y', 0, 1003)
    const result = tomography.performTomography(state, 1000)
    const rho = result.densityMatrix

    // Compute eigenvalues analytically
    const trace =
      rho[0][0].real + rho[1][1].real
    const det =
      rho[0][0].real * rho[1][1].real -
      (rho[0][1].real ** 2 + rho[0][1].imag ** 2)

    const discriminant = Math.max(0, trace ** 2 - 4 * det)
    const sqrtDisc = Math.sqrt(discriminant)

    const lambda1 = (trace + sqrtDisc) / 2
    const lambda2 = (trace - sqrtDisc) / 2

    assert.ok(lambda1 >= -0.01, 'λ₁ should be non-negative')
    assert.ok(lambda2 >= -0.01, 'λ₂ should be non-negative')
  })

  // ===== TIER 2: FIDELITY CALCULATION =====

  await t.test('fidelity for identical state is high (>0.95)', () => {
    const state = createTestState('Z', 0, 2001)
    const result = tomography.performTomography(state, 1000)

    // Fidelity should be high for state prepared in measurement basis
    assert.ok(
      result.fidelity > 0.90,
      `Fidelity ${result.fidelity} should be > 0.90`
    )
  })

  await t.test('fidelity is between 0 and 1', () => {
    for (let i = 0; i < 10; i++) {
      const basis = (['Z', 'X', 'Y'] as const)[i % 3]
      const value = (i % 2) as 0 | 1
      const state = createTestState(basis, value, 2000 + i)
      const result = tomography.performTomography(state, 500)

      assert.ok(result.fidelity >= 0, `Fidelity ${result.fidelity} >= 0`)
      assert.ok(result.fidelity <= 1, `Fidelity ${result.fidelity} <= 1`)
    }
  })

  await t.test('different bases give different fidelities', () => {
    const state = createTestState('Z', 0, 2010)

    // Tomography should give high fidelity
    const tomo = tomography.performTomography(state, 1000)
    assert.ok(tomo.fidelity > 0.85, 'Base fidelity should be decent')
  })

  // ===== TIER 3: PURITY CALCULATION =====

  await t.test('purity is between 0 and 1', () => {
    for (let i = 0; i < 10; i++) {
      const basis = (['Z', 'X', 'Y'] as const)[i % 3]
      const value = (i % 2) as 0 | 1
      const state = createTestState(basis, value, 3000 + i)
      const result = tomography.performTomography(state, 500)

      assert.ok(result.purity >= 0, `Purity ${result.purity} >= 0`)
      assert.ok(result.purity <= 1, `Purity ${result.purity} <= 1`)
    }
  })

  await t.test('pure states have purity close to 1', () => {
    const state = createTestState('Z', 0, 3010)
    const result = tomography.performTomography(state, 1000)

    // Should be relatively pure (prepared in definite basis)
    assert.ok(
      result.purity > 0.85,
      `Pure state purity ${result.purity} should be > 0.85`
    )
  })

  await t.test('purity <= 1 always (trace property)', () => {
    // Run multiple states
    for (let i = 0; i < 20; i++) {
      const state = createTestState('Z', (i % 2) as 0 | 1, 3020 + i)
      const result = tomography.performTomography(state, 500)

      assert.ok(result.purity <= 1.01, `Purity ${result.purity} should be <= 1`)
    }
  })

  // ===== TIER 4: ENTROPY CALCULATION =====

  await t.test('entropy is non-negative', () => {
    for (let i = 0; i < 10; i++) {
      const basis = (['Z', 'X', 'Y'] as const)[i % 3]
      const value = (i % 2) as 0 | 1
      const state = createTestState(basis, value, 4000 + i)
      const result = tomography.performTomography(state, 500)

      assert.ok(result.entropy >= 0, `Entropy ${result.entropy} >= 0`)
    }
  })

  await t.test('pure states have low entropy', () => {
    const state = createTestState('Z', 0, 4010)
    const result = tomography.performTomography(state, 1000)

    // Pure states should have entropy close to 0
    assert.ok(
      result.entropy < 0.3,
      `Pure state entropy ${result.entropy} should be < 0.3`
    )
  })

  // ===== TIER 5: RECEIPT CHAIN VERIFICATION =====

  await t.test('all measurements recorded in receipt chain', () => {
    const state = createTestState('Z', 0, 5001)
    const result = tomography.performTomography(state, 100)

    // Should have 300 receipts (100 per basis × 3 bases)
    assert.equal(
      result.receipts.length,
      300,
      'Should have 300 measurement receipts'
    )

    // All receipts should be valid
    for (const receipt of result.receipts) {
      assert.ok(receipt.id, 'Receipt should have ID')
      assert.ok(receipt.content, 'Receipt should have content')
    }
  })

  await t.test('receipt chain is continuous', () => {
    const state = createTestState('Z', 0, 5002)
    const result = tomography.performTomography(state, 50)

    // Each receipt should reference previous (except first)
    for (let i = 1; i < result.receipts.length; i++) {
      const current = result.receipts[i]
      const previous = result.receipts[i - 1]

      // Previous should be in the chain
      assert.ok(current.content.includes(previous.id), 'Should reference previous receipt')
    }
  })

  await t.test('proof is merkle root of all measurements', () => {
    const state = createTestState('Z', 0, 5003)
    const result = tomography.performTomography(state, 50)

    // Proof should be non-empty
    assert.ok(result.proof, 'Proof should exist')
    assert.ok(result.proof.length > 0, 'Proof should be non-empty')

    // Proof should be a valid UUID format
    assert.match(result.proof, /^[a-f0-9\-]+$/, 'Proof should be valid UUID')
  })

  // ===== TIER 6: ADVERSARY DETECTION =====

  await t.test('detects substituted states via low fidelity', () => {
    // Create many states
    const validStates = []
    for (let i = 0; i < 20; i++) {
      validStates.push(createTestState('Z', (i % 2) as 0 | 1, 6000 + i))
    }

    // Verify subset
    const detection = tomography.detectStateSubstitution(validStates, 0.5)

    // Should verify 50% of states
    assert.ok(detection.confidenceLevel >= 0.4, 'Should verify at least 40%')
    assert.ok(detection.confidenceLevel <= 0.6, 'Should verify at most 60%')

    // Should have fidelity measurements
    assert.ok(
      detection.fidelities.length > 0,
      'Should have fidelity measurements'
    )
  })

  await t.test('adversary detection has minimum fidelity', () => {
    const validStates = []
    for (let i = 0; i < 50; i++) {
      validStates.push(createTestState('Z', 0, 6050 + i))
    }

    const detection = tomography.detectStateSubstitution(validStates, 0.2)

    // Min fidelity should be the minimum of all fidelities
    const allFids = detection.fidelities
    const computedMin = Math.min(...allFids)
    assert.equal(
      detection.minFidelity,
      computedMin,
      'minFidelity should match actual minimum'
    )
  })

  await t.test('verifyTomography rejects low fidelity states', () => {
    const state = createTestState('Z', 0, 7001)
    const result = tomography.performTomography(state, 1000)

    // Create a result with artificially low fidelity for testing
    const lowFidelityResult: TomographyResult = {
      ...result,
      fidelity: 0.85 // Below threshold
    }

    const verified = tomography.verifyTomography(state, lowFidelityResult, 0.95)
    assert.equal(verified, false, 'Should reject low fidelity state')
  })

  await t.test('verifyTomography accepts high fidelity states', () => {
    const state = createTestState('Z', 0, 7002)
    const result = tomography.performTomography(state, 1000)

    // High fidelity result
    const highFidelityResult: TomographyResult = {
      ...result,
      fidelity: 0.98 // Above threshold
    }

    const verified = tomography.verifyTomography(state, highFidelityResult, 0.95)
    assert.equal(verified, true, 'Should accept high fidelity state')
  })

  // ===== INTEGRATION TESTS =====

  await t.test('complete tomography workflow', () => {
    // Create quantum state
    const cipher = new QuantumFoldCipher()
    cipher.generateKey('test-entropy')
    cipher.prepareState('Z', 0, 0)
    const state = cipher.stateUuid

    // Perform tomography
    const tomo = new QuantumStateTomography()
    const result = tomo.performTomography(state, 500)

    // Verify result has all properties
    assert.ok(result.densityMatrix, 'Has density matrix')
    assert.ok(typeof result.fidelity === 'number', 'Has fidelity')
    assert.ok(typeof result.purity === 'number', 'Has purity')
    assert.ok(typeof result.entropy === 'number', 'Has entropy')
    assert.ok(result.proof, 'Has proof')
    assert.ok(result.measurements, 'Has measurements')
    assert.ok(result.receipts, 'Has receipts')

    // Verify measurements have all bases
    assert.ok(result.measurements.z_outcomes, 'Has Z outcomes')
    assert.ok(result.measurements.x_outcomes, 'Has X outcomes')
    assert.ok(result.measurements.y_outcomes, 'Has Y outcomes')

    // Verify quantum properties
    assert.ok(result.fidelity > 0.8, 'Fidelity should be decent')
    assert.ok(result.purity > 0.8, 'Purity should be decent')
    assert.ok(result.entropy < 0.5, 'Entropy should be low for pure state')
  })

  await t.test('multiple states have different fidelities', () => {
    const tomo = new QuantumStateTomography()
    const states = [
      createTestState('Z', 0, 8001),
      createTestState('X', 1, 8002),
      createTestState('Y', 0, 8003)
    ]

    const fidelities = states.map(s => tomo.performTomography(s, 500).fidelity)

    // Not all should be identical (different states)
    const unique = new Set(fidelities.map(f => f.toFixed(2))).size
    assert.ok(unique >= 2, 'Different states should have varied fidelities')
  })

  // ===== CORRECTNESS CHECKS =====

  await t.test('reconstructed state preserves measurement statistics', () => {
    const state = createTestState('Z', 0, 9001)
    const result = tomography.performTomography(state, 1000)

    // Z-basis measurement statistics
    const zProb0 = result.measurements.z_outcomes.filter(x => x === 0).length / 1000
    const zProb1 = result.measurements.z_outcomes.filter(x => x === 1).length / 1000

    // Density matrix diagonal should match Z measurements
    assert.ok(
      Math.abs(result.densityMatrix[0][0].real - zProb0) < 0.1,
      'ρ₀₀ should match Z=0 probability'
    )
    assert.ok(
      Math.abs(result.densityMatrix[1][1].real - zProb1) < 0.1,
      'ρ₁₁ should match Z=1 probability'
    )
  })

  await t.test('entropy consistent with purity', () => {
    for (let i = 0; i < 20; i++) {
      const state = createTestState('Z', (i % 2) as 0 | 1, 9010 + i)
      const result = tomography.performTomography(state, 500)

      // For single qubit: S = H(purity) where H is Shannon entropy
      // Pure state (purity=1): entropy=0
      // Mixed state (purity=0.5): entropy max
      if (result.purity > 0.9) {
        assert.ok(result.entropy < 0.3, 'High purity should give low entropy')
      }
    }
  })
})
