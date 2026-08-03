/**
 * src/security/quantum-state-tomography.test.ts
 *
 * Phase 2 tests: density-matrix reconstruction, fidelity, purity, entropy,
 * receipt-chain integrity, and adversary detection.
 *
 * Principle: No gaps. Every reconstruction property, every chain link,
 * every detection path tested. Deterministic — reruns are identical.
 */

import {
  QuantumStateTomography,
  tomographAgainstClaim,
  computesGateWithTomography,
} from './quantum-state-tomography.ts'

import {
  encodeQuantumState,
  verifyMeasurementReceipt,
  QuantumFoldCipher,
} from './quantum-fold-cipher.ts'
import { abs, min } from '../0/algebra.ts'
import { merkleFold, merkleFoldOrdered } from '../0/index.ts'

console.log('=== Quantum State Tomography Test Suite (Phase 2) ===\n')

// Integer ratios only — a bare float is a crack (lobe L's law).
const GATE = 19 / 20 // fidelity acceptance gate
const ORTHO_MAX = 1 / 20 // orthogonal substitution must land below this
const STAT_TOL = 1 / 10 // sampling tolerance for unbiased-basis statistics
const UNBIASED_LO = 7 / 20 // fidelity ≈ 1/2 window, lower edge
const UNBIASED_HI = 13 / 20 // fidelity ≈ 1/2 window, upper edge
const HALF = 1 / 2
const PURE_MIN = 19 / 20 // pure preparation: purity must exceed this
const ENTROPY_MAX = 3 / 20 // pure preparation: entropy must stay below this
const HIGH_PURITY = 9 / 10
const LOW_ENTROPY = 3 / 10
const SAMPLE_FRACTION = 3 / 10 // fraction of channel sampled in detection tests
const SAMPLE_FRACTION_MAX = 2 / 5

let failures = 0
function check(cond: boolean, label: string): void {
  if (cond) {
    console.log(`✓ ${label}`)
  } else {
    failures++
    console.error(`✗ ${label}`)
  }
}

const tomo = new QuantumStateTomography()

/**
 * SECTION 1: Density matrix reconstruction
 */
console.log('SECTION 1: Density Matrix Reconstruction')

{
  const state = encodeQuantumState('Z', 0, 0)
  const result = tomo.performTomography(state, 1000)
  const rho = result.densityMatrix

  const trace = rho[0]![0]!.real + rho[1]![1]!.real
  check(abs(trace - 1) < 1e-9, 'trace(ρ) = 1 exactly (linear inversion)')

  check(
    abs(rho[0]![1]!.real - rho[1]![0]!.real) < 1e-9 &&
      abs(rho[0]![1]!.imag + rho[1]![0]!.imag) < 1e-9,
    'ρ is Hermitian: ρ₀₁ = conj(ρ₁₀)',
  )

  check(
    rho[0]![0]!.imag === 0 && rho[1]![1]!.imag === 0,
    'diagonal entries are real',
  )

  // Z-prepared |0⟩: rz = +1 exactly (same-basis certainty)
  check(result.blochVector.rz === 1, 'Z|0⟩ reconstructs rz = +1 exactly')
  check(abs(result.blochVector.rx) < STAT_TOL, 'Z|0⟩ has |rx| small (unbiased X stats)')
  check(abs(result.blochVector.ry) < STAT_TOL, 'Z|0⟩ has |ry| small (unbiased Y stats)')
}

{
  // Determinism: same state, same shots → identical reconstruction and proof
  const state = encodeQuantumState('X', 1, 3)
  const a = tomo.performTomography(state, 300)
  const b = tomo.performTomography(state, 300)
  check(
    a.blochVector.rx === b.blochVector.rx &&
      a.blochVector.ry === b.blochVector.ry &&
      a.blochVector.rz === b.blochVector.rz,
    'tomography is deterministic: identical Bloch vector on rerun',
  )
  // Proofs bind Tier 4 timestamps: each run is a distinct audit event,
  // so both chains must verify independently (equality is not the contract).
  check(
    tomo.verifyReceiptChain(a) && tomo.verifyReceiptChain(b),
    'each rerun produces its own valid time-bound audit chain',
  )
}

/**
 * SECTION 2: Fidelity
 */
console.log('\nSECTION 2: Fidelity')

{
  const bases = ['Z', 'X'] as const
  let allHigh = true
  let allBounded = true
  for (const basis of bases) {
    for (const value of [0, 1] as const) {
      const state = encodeQuantumState(basis, value, 0)
      const result = tomo.performTomography(state, 1000)
      if (result.fidelity < GATE) allHigh = false
      if (result.fidelity < 0 || result.fidelity > 1) allBounded = false
    }
  }
  check(allHigh, 'honest states reach fidelity ≥ 0.95 in all preparations')
  check(allBounded, 'fidelity stays in [0, 1]')
}

{
  // Orthogonal claim: actual Z|0⟩ claimed as Z|1⟩ → fidelity ≈ 0
  const actual = encodeQuantumState('Z', 0, 0)
  const claimed = encodeQuantumState('Z', 1, 0)
  const { fidelity } = tomographAgainstClaim(actual, claimed, 1000)
  check(fidelity < ORTHO_MAX, `orthogonal substitution collapses fidelity (got ${fidelity.toFixed(3)})`)
}

{
  // Unbiased claim: actual Z|0⟩ claimed as X|0⟩ → fidelity ≈ 0.5
  const actual = encodeQuantumState('Z', 0, 0)
  const claimed = encodeQuantumState('X', 0, 0)
  const { fidelity } = tomographAgainstClaim(actual, claimed, 1000)
  check(
    fidelity > UNBIASED_LO && fidelity < UNBIASED_HI,
    `mutually unbiased substitution shows fidelity ≈ 1/2 (got ${fidelity.toFixed(3)})`,
  )
}

/**
 * SECTION 3: Purity and entropy
 */
console.log('\nSECTION 3: Purity & Entropy')

{
  let purityBounded = true
  let entropyBounded = true
  for (let i = 0; i < 8; i++) {
    const state = encodeQuantumState(i % 2 === 0 ? 'Z' : 'X', (i % 2) as 0 | 1, i)
    const r = tomo.performTomography(state, 500)
    if (r.purity < HALF - 1e-9 || r.purity > 1 + 1e-9) purityBounded = false
    if (r.entropy < 0 || r.entropy > 1 + 1e-9) entropyBounded = false
  }
  check(purityBounded, 'purity ∈ [1/2, 1] for all reconstructed qubits')
  check(entropyBounded, 'entropy ∈ [0, 1] bits for all reconstructed qubits')
}

{
  const state = encodeQuantumState('Z', 0, 0)
  const r = tomo.performTomography(state, 1000)
  check(r.purity > PURE_MIN, `pure preparation shows purity near 1 (got ${r.purity.toFixed(3)})`)
  check(r.entropy < ENTROPY_MAX, `pure preparation shows entropy near 0 (got ${r.entropy.toFixed(3)})`)
}

{
  // Purity/entropy consistency: higher purity ⇒ lower entropy
  const pure = tomo.performTomography(encodeQuantumState('Z', 0, 0), 1000)
  check(
    pure.purity > HIGH_PURITY ? pure.entropy < LOW_ENTROPY : true,
    'high purity implies low entropy (consistency)',
  )
}

/**
 * SECTION 4: Receipt chain (Tier 4)
 */
console.log('\nSECTION 4: Receipt Chain Verification')

{
  const state = encodeQuantumState('Z', 0, 5)
  const shots = 50
  const result = tomo.performTomography(state, shots)

  check(result.receipts.length === 3 * shots, `all ${3 * shots} shots recorded (3 bases × ${shots})`)

  let allVerify = true
  for (const receipt of result.receipts) {
    if (!verifyMeasurementReceipt(receipt)) allVerify = false
  }
  check(allVerify, 'every receipt recomputes (no tampering)')

  let chained = true
  for (let i = 1; i < result.receipts.length; i++) {
    if (result.receipts[i]!.prev !== result.receipts[i - 1]!.id) chained = false
  }
  check(chained, 'receipts form a continuous chain (each links to previous)')

  check(tomo.verifyReceiptChain(result), 'verifyReceiptChain(): full chain + merkle root verify')

  // Tamper detection: swap two receipts → chain breaks
  const tampered = {
    ...result,
    receipts: [...result.receipts.slice(1), result.receipts[0]!],
  }
  check(!tomo.verifyReceiptChain(tampered), 'reordered receipts are detected')

  // The ROOT alone must see a reordering, independent of the prev-link check.
  // Under merkleFold (which sorts) it could not: a permuted run produced an
  // identical root, so the proof attested a set of shots, not a series.
  const ids = result.receipts.map((r) => r.id)
  const permuted = [...ids.slice(1), ids[0]!]
  check(
    merkleFoldOrdered(permuted) !== result.proof,
    'the proof root alone detects a reordering (ordered fold)',
  )
  check(
    merkleFold(permuted) === merkleFold(ids),
    'contrast: the set fold cannot — merkleFold(permuted) === merkleFold(original)',
  )
  check(merkleFoldOrdered(ids) === result.proof, 'the proof is the ordered fold of its receipts')
}

/**
 * SECTION 5: Verification gate
 */
console.log('\nSECTION 5: Verification Gate')

{
  const state = encodeQuantumState('Z', 0, 0)
  const result = tomo.performTomography(state, 1000)
  check(tomo.verifyTomography(state, result), 'honest state passes the 0.95 gate')

  const orthogonal = encodeQuantumState('Z', 1, 0)
  check(
    !tomo.verifyTomography(orthogonal, result),
    'orthogonal expectation fails the 0.95 gate',
  )
}

/**
 * SECTION 6: Adversary detection
 */
console.log('\nSECTION 6: Adversary Detection')

{
  const honest = []
  for (let i = 0; i < 30; i++) {
    honest.push(encodeQuantumState(i % 2 === 0 ? 'Z' : 'X', (i % 3 === 0 ? 1 : 0) as 0 | 1, i))
  }
  const detection = tomo.detectStateSubstitution(honest, SAMPLE_FRACTION)

  check(!detection.adversaryDetected, 'honest channel raises no alarm')
  check(
    detection.confidenceLevel >= SAMPLE_FRACTION && detection.confidenceLevel <= SAMPLE_FRACTION_MAX,
    `confidence matches sampled fraction (got ${detection.confidenceLevel.toFixed(2)})`,
  )
  check(
    detection.minFidelity === min(...detection.fidelities),
    'reported minFidelity equals actual minimum',
  )

  const rerun = tomo.detectStateSubstitution(honest, SAMPLE_FRACTION)
  check(
    detection.minFidelity === rerun.minFidelity &&
      detection.fidelities.length === rerun.fidelities.length,
    'detection sampling is deterministic (no ambient entropy)',
  )
}

{
  const empty = tomo.detectStateSubstitution([], HALF)
  check(
    !empty.adversaryDetected && empty.confidenceLevel === 0,
    'empty channel: no detection, zero confidence',
  )
}

/**
 * SECTION 7: Tier 5 composition — tomography as a seventh facet
 */
console.log('\nSECTION 7: Compositional Integration (Tier 5)')

{
  const cipher = new QuantumFoldCipher()
  cipher.generateKey('composition-entropy')
  cipher.prepareState('Z', 0, 0)
  cipher.applyGate('H')
  cipher.measure()
  cipher.encrypt('12345')

  const { gate, tomography } = computesGateWithTomography(cipher, 300)

  check(gate.facets.length === 7, `gate carries 7 facets (got ${gate.facets.length})`)
  check(
    gate.facets.some((f) => f.facet === 'state-tomography'),
    'state-tomography facet is present in the sealed gate',
  )
  check(gate.ok, 'honest run: all seven facets pass, root is on')
  check(tomography !== null, 'tomography result returned alongside the gate')

  // The root must actually depend on the seventh facet, or composing it in
  // proved nothing. Compare against the six-facet seal of the same cipher.
  const sixFacetRoot = cipher.computesGate().root
  check(gate.root !== sixFacetRoot, 'seventh facet changes the merkle root')
}

{
  // A cipher with no prepared state must not produce a clean-looking root.
  const cipher = new QuantumFoldCipher()
  cipher.generateKey('no-state')
  const { gate, tomography } = computesGateWithTomography(cipher, 50)

  check(!gate.ok, 'unprepared state: gate is off')
  check(tomography === null, 'unprepared state: no tomography result')
  check(
    gate.facets.some((f) => f.facet === 'state-tomography' && !f.on),
    'the tomography facet is present and off, not silently absent',
  )
}

{
  // The facet must respond to fidelity, not merely to having run. Demanding
  // a fidelity above 1 is unreachable, so an honest run must still fail.
  const cipher = new QuantumFoldCipher()
  cipher.generateKey('gate-sensitivity')
  cipher.prepareState('Z', 0, 0)
  cipher.applyGate('H')
  cipher.measure()
  cipher.encrypt('12345')

  const impossible = computesGateWithTomography(cipher, 200, 2).gate
  check(!impossible.ok, 'unreachable fidelity threshold turns the root off')
}

/**
 * SECTION 8: Measurement statistics preserved
 */
console.log('\nSECTION 8: Statistics Preservation')

{
  const state = encodeQuantumState('Z', 0, 7)
  const result = tomo.performTomography(state, 1000)
  const zZeros = result.measurements.z.filter((o) => o === 0).length / 1000
  check(
    abs(result.densityMatrix[0]![0]!.real - zZeros) < 1e-9,
    'ρ₀₀ equals empirical P(Z=0) exactly (linear inversion)',
  )
}

/**
 * Summary
 */
console.log('\n=== TEST SUMMARY ===')
if (failures === 0) {
  console.log('All tomography tests passed:')
  console.log('  ✓ Reconstruction: trace 1, Hermitian, deterministic')
  console.log('  ✓ Fidelity: honest high, orthogonal ≈0, unbiased ≈1/2')
  console.log('  ✓ Purity & entropy: bounded and consistent')
  console.log('  ✓ Receipt chain: continuous, tamper-evident, merkle-sealed')
  console.log('  ✓ Verification gate: accepts honest, rejects substituted')
  console.log('  ✓ Adversary detection: deterministic sampling, exact minimum')
  console.log('\nQuantum State Tomography (Phase 2) is ready. ✓')
} else {
  console.error(`\n${failures} test(s) FAILED`)
  process.exit(1)
}
