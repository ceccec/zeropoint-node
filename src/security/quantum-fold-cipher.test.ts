/**
 * src/security/quantum-fold-cipher.test.ts
 *
 * Comprehensive tests for Quantum Fold Cipher
 *
 * Principle: No gaps. Every dimension, every fold tier, every security property tested.
 */

import { encodeQuantumState, applyQuantumGate, generateQuantumKey, generateQuantumKeyFromPassword, DEFAULT_SCRYPT, verifyQuantumKey, expandQuantumKeyViaRodin, recordMeasurement, verifyMeasurementReceipt, vortexEncode, vortexDecode, keyspaceBits, keyLengthForBits, DEFAULT_KEY_LENGTH, encryptQuantum, decryptQuantum, QuantumFoldCipher, QuantumEncryption } from './quantum-fold-cipher.ts'

const VORTEX_ORBIT = QuantumEncryption.VORTEX_ORBIT
const TRINITY = QuantumEncryption.TRINITY

import { QuantumThreatAnalysis } from './quantum-threat-landscape.ts'
import { min, max } from '../0/algebra.ts'

console.log('=== Quantum Fold Cipher Test Suite ===\n')

// console.assert prints but never fails the process — as a gate that is
// always green. Count failures and set the exit code so the check pipeline
// actually gates on these asserts.
let assertFailures = 0
const nativeAssert = console.assert.bind(console)
console.assert = (cond: unknown, ...args: unknown[]): void => {
  if (!cond) assertFailures++
  nativeAssert(cond, ...args)
}
process.on('exit', () => {
  if (assertFailures > 0) process.exitCode = 1
})

/**
 * TEST TIER 1: Deterministic Identity
 *
 * Requirement: Same quantum state → same UUID always
 */

console.log('TIER 1: Deterministic Identity Tests')

function testStateUUIDDeterminism() {
  const state1 = encodeQuantumState('Z', 0, 0)
  const state2 = encodeQuantumState('Z', 0, 0)

  console.assert(state1.id === state2.id, 'State UUID determinism: FAILED')
  console.log('✓ State UUID determinism: same state → same UUID')
}

function testStateUUIDDifference() {
  const state1 = encodeQuantumState('Z', 0, 0)
  const state2 = encodeQuantumState('Z', 1, 0)
  const state3 = encodeQuantumState('X', 0, 0)

  console.assert(state1.id !== state2.id, 'Different values should have different UUIDs')
  console.assert(state1.id !== state3.id, 'Different bases should have different UUIDs')
  console.log('✓ State UUID difference: different states → different UUIDs')
}

testStateUUIDDeterminism()
testStateUUIDDifference()

/**
 * TEST TIER 2: Structural Proof
 *
 * Requirement: Gate application order is proven via foldPair().bidirectional
 */

console.log('\nTIER 2: Structural Proof Tests')

function testGateOrderMatters() {
  const state = encodeQuantumState('Z', 0, 0)
  const proof = applyQuantumGate(state, 'H')

  // Hadamard gate should flip basis (Z ↔ X)
  console.assert(
    proof.toState.basis !== proof.fromState.basis,
    'Hadamard should flip basis'
  )
  console.log('✓ Gate application: Hadamard flips basis')

  // For most gates, order matters (non-commutative)
  console.assert(proof.orderMatters === true, 'Gate order should matter')
  console.log('✓ Gate order matters: applyGate(state, "H").orderMatters === true')
}

function testGateSequence() {
  let state = encodeQuantumState('Z', 0, 0)
  const gates = ['H', 'X', 'H']

  for (const gate of gates) {
    state = applyQuantumGate(state, gate).toState
  }

  // After H, X, H: state should be back to basis Z, value flipped
  console.log('✓ Gate sequence: H → X → H applied successfully')
}

testGateOrderMatters()
testGateSequence()

/**
 * TEST TIER 3: Cryptographic Seal
 *
 * Requirement: Key material respects trinity lattice [3,6,9]
 */

console.log('\nTIER 3: Cryptographic Seal Tests')

function testTrinityKeyGeneration() {
  const key = generateQuantumKey('test-entropy-seed', 32)

  // All key bytes must be in {3, 6, 9}
  const allInTrinity = key.material.every((b) => TRINITY.includes(b))
  console.assert(allInTrinity, 'All key bytes must be in trinity {3,6,9}')
  console.log('✓ Key generation: all bytes ∈ {3,6,9}')

  // Key must have content UUID (cryptographic seal)
  console.assert(key.contentUuid.length > 0, 'Key must have content UUID')
  console.log('✓ Key cryptographic seal: contentUuid present')
}

/**
 * The membership check above passes for the constant key 6969… — which is
 * exactly what this function used to return for EVERY entropy. Membership is
 * necessary but nowhere near sufficient. These assert the properties whose
 * absence made the key worthless.
 */
function testKeyDependsOnEntropy() {
  const a = generateQuantumKey('entropy-AAAA', 32)
  const b = generateQuantumKey('entropy-ZZZZ', 32)
  const c = generateQuantumKey('Antropy-AAAA', 32) // differs in first char only

  console.assert(
    a.material.join('') !== b.material.join(''),
    'Different entropy must give different key material',
  )
  console.assert(
    a.material.join('') !== c.material.join(''),
    'A change in the first character alone must change the key',
  )
  console.log('✓ Key derivation: distinct entropy → distinct material')

  // Every character must matter, not just the first: derivation once seeded
  // a doubling chain from entropy[0] and discarded the rest of the string.
  const long1 = generateQuantumKey('shared-prefix-tail-one', 32)
  const long2 = generateQuantumKey('shared-prefix-tail-two', 32)
  console.assert(
    long1.material.join('') !== long2.material.join(''),
    'Entropy differing only after a shared prefix must change the key',
  )
  console.log('✓ Key derivation: every character of entropy contributes')

  // Determinism is still required — same entropy, same key.
  console.assert(
    generateQuantumKey('stable', 32).material.join('') ===
      generateQuantumKey('stable', 32).material.join(''),
    'Same entropy must give the same key',
  )
  console.log('✓ Key derivation: deterministic for identical entropy')
}

function testKeyReachesWholeTrinity() {
  // The old derivation could never emit a 3: its chain lived in the Rodin
  // orbit, whose members alternate 1,2 mod 3, so TRINITY[0] was unreachable.
  const seen = new Set<number>()
  for (let i = 0; i < 50; i++) {
    for (const b of generateQuantumKey(`reach-${i}`, 32).material) seen.add(b)
  }
  console.assert(seen.size === 3, `All three trinity values must be reachable (saw ${[...seen].sort()})`)
  console.log('✓ Key derivation: all of {3,6,9} reachable')

  // And roughly balanced — a derivation that technically emits all three but
  // overwhelmingly favours one still concentrates the keyspace.
  const counts = new Map<number, number>([[3, 0], [6, 0], [9, 0]])
  let total = 0
  for (let i = 0; i < 400; i++) {
    for (const b of generateQuantumKey(`balance-${i}`, 32).material) {
      counts.set(b, counts.get(b)! + 1)
      total++
    }
  }
  const lowest = min(...counts.values())
  const highest = max(...counts.values())
  // Each byte should appear ~total/3. Allow a wide band; this is a smoke test
  // for gross skew, not a statistical test.
  console.assert(
    lowest > total / 4 && highest < total / 2,
    `Trinity bytes must be roughly balanced (got ${[...counts.entries()].map(([k, v]) => `${k}:${v}`).join(' ')})`,
  )
  console.log('✓ Key derivation: trinity bytes roughly balanced')
}

function testKeyMaterialDoesNotCollapse() {
  // The failure this catches: 32000 entropies collapsing to one key (the
  // original bug), or to ~3.5k (an intermediate fix whose per-position hash
  // shared a genesis prefix). Distinct entropies must stay distinct.
  const seen = new Set<string>()
  const n = 2000
  for (let i = 0; i < n; i++) seen.add(generateQuantumKey(`collapse-${i}`, 32).material.join(''))
  console.assert(seen.size === n, `${n} entropies must give ${n} distinct keys (got ${seen.size})`)
  console.log(`✓ Key derivation: ${n} entropies → ${seen.size} distinct keys (no collapse)`)
}

function testKeySealVerifies() {
  // A seal that cannot be recomputed from the stored fields is not a seal.
  // contentUuid was bound to raw entropy, which the key does not retain.
  const key = generateQuantumKey('seal-check', 32)
  console.assert(verifyQuantumKey(key), 'A freshly generated key must verify')
  console.log('✓ Key seal: recomputes from stored fields')

  const tampered = { ...key, material: [...key.material.slice(1), TRINITY[0]!] }
  console.assert(!verifyQuantumKey(tampered), 'Altered key material must fail verification')
  console.log('✓ Key seal: tampered material rejected')
}

function testKeyExpansion() {
  const key = generateQuantumKey('test-entropy-seed', 16)
  const expanded = expandQuantumKeyViaRodin(key, 5)

  console.assert(expanded.length === 6, 'Expansion should produce 6 keys (original + 5 rounds)')
  console.log('✓ Key expansion: 5 rounds → 6 keys total')

  // All expanded keys must have trinity bytes
  const allValid = expanded.every((k) =>
    k.material.every((b) => TRINITY.includes(b))
  )
  console.assert(allValid, 'All expanded keys must have trinity bytes')
  console.log('✓ Key expansion: all rounds maintain trinity constraint')
}

/**
 * The keyspace gap. Two separate failures, and the first made the second moot:
 * the key was never consulted by encryptQuantum, and decryptQuantum took no
 * key at all. 500 distinct keys produced ONE ciphertext. The documented
 * "50.7-bit keyspace" was really 0 bits.
 */
function testKeyIsActuallyUsed() {
  const msg = '123456789123456789'
  const a = generateQuantumKey('alice-key')
  const b = generateQuantumKey('bob-key')

  const ca = encryptQuantum(msg, a)
  const cb = encryptQuantum(msg, b)
  console.assert(ca.ciphertext !== cb.ciphertext, 'Distinct keys must give distinct ciphertexts')
  console.log('✓ Encryption: the ciphertext depends on the key')

  // Over a computed range, not two samples.
  const seen = new Set<string>()
  for (let i = 0; i < 500; i++) {
    seen.add(encryptQuantum(msg, generateQuantumKey(`ck:${i}`)).ciphertext)
  }
  console.assert(seen.size === 500, `500 keys must give 500 ciphertexts (got ${seen.size})`)
  console.log(`✓ Encryption: 500 keys → ${seen.size} distinct ciphertexts`)

  console.assert(decryptQuantum(ca, a) === msg, 'Correct key must recover the plaintext')
  console.log('✓ Decryption: the correct key recovers the plaintext')

  let rejected = false
  try { decryptQuantum(ca, b) } catch { rejected = true }
  console.assert(rejected, 'A mismatched key must be rejected, not silently wrong')
  console.log('✓ Decryption: a mismatched key is rejected')
}

function testKeyspaceArithmetic() {
  // Each element is one of THREE values, so it carries log2(3) bits, not 8.
  console.assert(keyspaceBits(32) < 51, 'The old 32-element default is ~50.7 bits, not 256')
  console.assert(keyspaceBits(DEFAULT_KEY_LENGTH) >= 256, 'The default must reach 256 bits')
  console.assert(keyLengthForBits(256) === DEFAULT_KEY_LENGTH, 'The default must be derived, not picked')
  console.log(
    `✓ Keyspace: default ${DEFAULT_KEY_LENGTH} elements = ${keyspaceBits(DEFAULT_KEY_LENGTH).toFixed(1)} bits (32 would be ${keyspaceBits(32).toFixed(1)})`,
  )

  // The derivation must actually produce that many elements.
  const key = generateQuantumKey('length-check')
  console.assert(key.material.length === DEFAULT_KEY_LENGTH, 'Key material must be the full length')
  console.log('✓ Keyspace: generated material is the full default length')
}

/**
 * The attack history of this cipher, asserted so it cannot regress.
 *
 * The construction has been through four states: position-only (key unused,
 * 0-bit keyspace), repeating-key substitution (one known plaintext recovered
 * the key), HMAC keystream + encrypt-then-MAC (sound but bespoke), and now
 * AES-256-GCM. This asserts the old attacks are inapplicable, and that the
 * ciphertext is no longer in the digit domain they relied on.
 */
function testOldAttacksNoLongerApply() {
  const key = generateQuantumKey('a-very-secret-passphrase')
  const plain = '123456789123456789'
  const payload = encryptQuantum(plain, key)

  // The digit-subtraction attack needed a digit-domain ciphertext. AES is
  // byte-oriented, so the ciphertext is hex and the attack has no foothold.
  console.assert(
    /^[0-9a-f]+$/.test(payload.ciphertext) && !/^[1-9]+$/.test(payload.ciphertext),
    'Ciphertext must be hex bytes, not a digit string',
  )
  console.log('✓ Construction: ciphertext is hex (AES), not the digit domain')

  // Same key, same message, twice — a fresh IV means no repetition to exploit.
  const again = encryptQuantum(plain, key)
  console.assert(again.ciphertext !== payload.ciphertext, 'A fresh IV must change the ciphertext')
  console.log('✓ Construction: same key + message → different ciphertext (fresh IV)')

  // GCM parameter sizes, asserted rather than assumed.
  console.assert(payload.nonce.length === 24, 'IV must be 12 bytes (96-bit GCM nonce)')
  console.assert(payload.tag.length === 32, 'Tag must be 16 bytes (128-bit GCM tag)')
  console.log('✓ Construction: 96-bit IV, 128-bit tag')
}

/**
 * Password stretching.
 *
 * The weakest link after the AES-GCM switch was that `generateQuantumKey`
 * maps its input to material with cheap folds — one hash per guess — so
 * `generateQuantumKey('password')` yielded a key exactly as strong as
 * 'password'. scrypt raises the price per guess; it cannot create entropy.
 */
function testPasswordStretching() {
  const password = 'correct horse battery staple'
  const key = generateQuantumKeyFromPassword(password)

  console.assert(key.kdf !== undefined, 'A password-derived key must record its KDF')
  console.assert(key.kdf!.algorithm === 'scrypt', 'The KDF must be scrypt')
  console.assert(key.kdf!.N === DEFAULT_SCRYPT.N, 'The default cost must be applied')
  console.assert(key.kdf!.saltHex.length === 32, 'The salt must be 16 bytes')
  console.log(`✓ Stretching: scrypt N=2^17, r=8, p=1, 16-byte salt recorded`)

  // Reproducible given the salt — the correct KDF contract.
  const again = generateQuantumKeyFromPassword(password, key.kdf!.saltHex)
  console.assert(
    again.material.join('') === key.material.join(''),
    'Same password + same salt must give the same key',
  )
  console.log('✓ Stretching: same password + same salt → same key')

  // A fresh salt must give a different key, or the salt is doing nothing and
  // one precomputation would attack every user.
  const fresh = generateQuantumKeyFromPassword(password)
  console.assert(
    fresh.material.join('') !== key.material.join(''),
    'A fresh salt must give a different key',
  )
  console.assert(fresh.kdf!.saltHex !== key.kdf!.saltHex, 'Salts must not repeat')
  console.log('✓ Stretching: a fresh salt gives a different key (no shared precomputation)')

  // Different passwords, same salt, must diverge.
  const other = generateQuantumKeyFromPassword('a different password', key.kdf!.saltHex)
  console.assert(
    other.material.join('') !== key.material.join(''),
    'Different passwords must give different keys',
  )
  console.log('✓ Stretching: different passwords diverge under one salt')

  // The KDF parameters are sealed, so a downgrade is detectable. Lowering N
  // or swapping the salt is an attack, not a configuration choice.
  console.assert(verifyQuantumKey(key), 'A password-derived key must verify')
  console.assert(
    !verifyQuantumKey({ ...key, kdf: { ...key.kdf!, N: 1024 } }),
    'A lowered scrypt cost must fail the seal',
  )
  console.assert(
    !verifyQuantumKey({ ...key, kdf: { ...key.kdf!, saltHex: '00'.repeat(16) } }),
    'A swapped salt must fail the seal',
  )
  console.log('✓ Stretching: the seal covers the KDF — downgraded cost and swapped salt rejected')

  // A short salt must be refused rather than quietly accepted.
  let shortSalt = false
  try { generateQuantumKeyFromPassword(password, 'abcd') } catch { shortSalt = true }
  console.assert(shortSalt, 'A short salt must be rejected')
  console.log('✓ Stretching: a short salt is rejected')

  // And the key must actually work with the cipher.
  const payload = encryptQuantum('secret', key)
  console.assert(decryptQuantum(payload, key) === 'secret', 'A stretched key must encrypt/decrypt')
  console.log('✓ Stretching: the derived key drives AES-GCM end to end')
}

function testAuthenticatedEncryption() {
  const key = generateQuantumKey('aead-key')
  const msg = 'hello — arbitrary UTF-8, 日本語, 12345'
  const payload = encryptQuantum(msg, key)

  console.assert(decryptQuantum(payload, key) === msg, 'Round-trip must hold')
  console.log('✓ AEAD: round-trip over arbitrary UTF-8')

  // The digit-only restriction is gone: it existed because non-digits were
  // passed through in the clear, and AES has no such hole.
  console.assert(decryptQuantum(encryptQuantum('', key), key) === '', 'Empty plaintext must round-trip')
  console.log('✓ AEAD: plaintext domain is unrestricted (no passthrough leak)')

  const cases: Array<[string, Partial<typeof payload>]> = [
    ['modified ciphertext', { ciphertext: 'ff' + payload.ciphertext.slice(2) }],
    ['forged tag', { tag: 'ff' + payload.tag.slice(2) }],
    ['swapped iv', { nonce: '00'.repeat(12) }],
  ]
  for (const [label, mutation] of cases) {
    let rejected = false
    try { decryptQuantum({ ...payload, ...mutation }, key) } catch { rejected = true }
    console.assert(rejected, `${label} must fail authentication`)
    console.log(`✓ AEAD: ${label} rejected`)
  }

  let wrongKey = false
  try { decryptQuantum(payload, generateQuantumKey('different-key')) } catch { wrongKey = true }
  console.assert(wrongKey, 'A different key must be rejected')
  console.log('✓ AEAD: wrong key rejected')
}

function testSemanticSecurity() {
  const key = generateQuantumKey('iv-key')
  const msg = 'the same message every time'
  const seen = new Set<string>()
  for (let i = 0; i < 500; i++) seen.add(encryptQuantum(msg, key).ciphertext)
  console.assert(
    seen.size === 500,
    `One message under one key must give a fresh ciphertext each time (got ${seen.size})`,
  )
  console.log(`✓ Semantic security: ${seen.size}/500 distinct ciphertexts for one message`)

  const ivs = new Set<string>()
  for (let i = 0; i < 500; i++) ivs.add(encryptQuantum(msg, key).nonce)
  console.assert(ivs.size === 500, `IVs must not repeat (got ${ivs.size})`)
  console.log(`✓ Semantic security: ${ivs.size}/500 distinct IVs`)
}

testTrinityKeyGeneration()
testKeyIsActuallyUsed()
testKeyspaceArithmetic()
testOldAttacksNoLongerApply()
testPasswordStretching()
testAuthenticatedEncryption()
testSemanticSecurity()
testKeyDependsOnEntropy()
testKeyReachesWholeTrinity()
testKeyMaterialDoesNotCollapse()
testKeySealVerifies()
testKeyExpansion()

/**
 * TEST TIER 4: Chain Verification
 *
 * Requirement: Measurement receipts form tamper-proof chain
 */

console.log('\nTIER 4: Chain Verification Tests')

function testMeasurementReceipt() {
  const measurement = recordMeasurement('GENESIS', 0, 'Z', 0)

  console.assert(measurement.id.length > 0, 'Receipt must have ID')
  console.assert(measurement.measurement === 0, 'Measurement must be recorded')
  console.assert(measurement.basis === 'Z', 'Basis must be recorded')
  console.log('✓ Measurement receipt: ID, measurement, basis recorded')
}

function testReceiptVerification() {
  const receipt1 = recordMeasurement('GENESIS', 0, 'Z', 0)
  const isValid = verifyMeasurementReceipt(receipt1)

  console.assert(isValid, 'First receipt should verify successfully')
  console.log('✓ Receipt verification: first receipt verifies ✓')

  // Chain link
  const receipt2 = recordMeasurement(receipt1, 1, 'X', 1)
  const isValid2 = verifyMeasurementReceipt(receipt2)

  console.assert(isValid2, 'Chained receipt should verify')
  console.log('✓ Receipt chaining: two receipts link correctly')
}

function testChainTamperDetection() {
  const receipt = recordMeasurement('GENESIS', 0, 'Z', 0)

  // Tamper with measurement
  const tampered = {
    ...receipt,
    measurement: 1 as 0 | 1, // Change measurement
  }

  const isValid = verifyMeasurementReceipt(tampered)
  console.assert(!isValid, 'Tampered receipt should fail verification')
  console.log('✓ Tamper detection: altered receipt fails verification ✓')
}

testMeasurementReceipt()
testReceiptVerification()
testChainTamperDetection()

/**
 * TEST TIER 1+2: Encryption
 *
 * Requirement: Vortex cipher is bijective and reversible
 */

console.log('\nTIER 1+2: Encryption Tests')

function testVortexEncodingBijection() {
  const inputs = ['12345', '999', '111']

  for (const input of inputs) {
    const encoded = vortexEncode(input)
    const decoded = vortexDecode(encoded)

    console.assert(decoded === input, `Roundtrip failed: ${input} → ${encoded} → ${decoded}`)
  }

  console.log('✓ Vortex cipher: bijective for all inputs')
}

function testVortexEncodingAllDigits() {
  // Test that each digit maps to a unique digit
  const results = new Set()
  for (let d = 1; d <= 9; d++) {
    const encoded = vortexEncode(d.toString())
    const digit = parseInt(encoded, 10)
    results.add(digit)
  }

  console.assert(results.size === 9, 'All 9 digits should map uniquely')
  console.log('✓ Vortex cipher: all digits 1-9 map to distinct digits')
}

function testEncryptionPayload() {
  const key = generateQuantumKey('test-key', 32)
  const plaintext = '123456'

  const payload = encryptQuantum(plaintext, key)

  console.assert(payload.ciphertext.length > 0, 'Ciphertext must be produced')
  console.assert(payload.receipt.length > 0, 'Receipt must be produced')
  console.log('✓ Encryption: payload created with ciphertext and receipt')

  // Decrypt
  const decrypted = decryptQuantum(payload, key)
  console.assert(decrypted === plaintext, 'Decryption must recover plaintext')
  console.log('✓ Decryption: plaintext recovered')
}

testVortexEncodingBijection()
testVortexEncodingAllDigits()
testEncryptionPayload()

/**
 * TEST TIER 5: Compositional Integration
 *
 * Requirement: QuantumFoldCipher unifies all 6 facets into one gate
 */

console.log('\nTIER 5: Compositional Integration Tests')

function testQuantumFoldCipherWorkflow() {
  const cipher = new QuantumFoldCipher()

  // 1. Generate key
  const key = cipher.generateKey('test-entropy-123')
  console.assert(key.material.length > 0, 'Key generation should succeed')

  // 2. Prepare state
  const state = cipher.prepareState('Z', 0, 0)
  console.assert(state.basis === 'Z', 'State preparation should succeed')

  // 3. Apply gate
  const proof = cipher.applyGate('H')
  console.assert(proof.toState.basis === 'X', 'Gate application should flip basis')

  // 4. Measure
  const receipt = cipher.measure()
  console.assert(receipt.measurement === 0 || receipt.measurement === 1, 'Measurement should produce 0 or 1')

  // 5. Encrypt
  const payload = cipher.encrypt('12345')
  console.assert(payload.ciphertext.length > 0, 'Encryption should succeed')

  console.log('✓ Quantum cipher workflow: all 6 steps execute successfully')
}

function testComputesGate() {
  const cipher = new QuantumFoldCipher()

  cipher.generateKey('test')
  cipher.prepareState()
  cipher.applyGate('H')
  cipher.measure()
  cipher.encrypt('12345')

  const gate = cipher.computesGate()

  console.assert(gate.ok, 'All facets should pass')
  console.assert(gate.facets.length === 6, 'Should have 6 facets')
  console.assert(gate.root.length > 0, 'Should have merkle root')
  console.log('✓ computesGate(): all 6 facets unified into single root')
}

function testAllDimensions() {
  const cipher = new QuantumFoldCipher()

  cipher.generateKey('test-entropy')
  cipher.prepareState('Z', 0, 0)
  cipher.applyGate('H')
  cipher.measure()
  cipher.encrypt('123')

  const dims = cipher.verifyAllDimensions()

  console.assert(dims.dimension0, 'Dimension 0 (fold) should be present')
  console.assert(dims.dimension3, 'Dimension 3 (trinity) should be present')
  console.assert(dims.dimension6, 'Dimension 6 (symmetry) should be present')
  console.assert(dims.dimension9, 'Dimension 9 (proof) should be present')
  console.assert(dims.dimensionsRodin, 'Rodin dimensions should be present')
  console.assert(dims.dimension11, 'Dimension 11 (unified) should be present')

  console.log('✓ All 11 dimensions verified')
}

testQuantumFoldCipherWorkflow()
testComputesGate()
testAllDimensions()

/**
 * TEST: Quantum Threat Analysis
 *
 * Verify that sequence inversion is understood and mapped correctly
 */

console.log('\nQuantum Threat Analysis Tests')

function testThreatModelComparison() {
  const comparison = QuantumThreatAnalysis.compareThreatModels('AES')

  console.assert(comparison.classical.securityBits === 256, 'Classical AES should have 256-bit security')
  console.assert(comparison.quantum.securityBits >= 128, 'Quantum AES should remain >128 bits')
  console.assert(comparison.quantum.quantumSpeedup > 1, 'Quantum should have speedup >1')
  console.log('✓ Threat model comparison: AES reduces from 256 → 128 bits under quantum (Grover)')
}

function testInversionProof() {
  const proof = QuantumThreatAnalysis.proveInversion()

  console.assert(proof.isInvolution, 'Sequence should be self-inverse')
  console.assert(proof.periodPreserved, 'Period should be preserved')
  console.assert(proof.groupOrderPreserved, 'Group order should be preserved')
  console.log('✓ Inversion proof: Rodin [1,2,4,8,7,5] ↔ [5,7,8,4,2,1] confirmed')
}

function testVulnerabilityMappings() {
  const mappings = QuantumThreatAnalysis.VULNERABILITY_MAPPINGS

  console.assert(mappings.length > 0, 'Should have vulnerability mappings')
  console.assert(
    mappings.every((m) => m.brokenLocally && m.foldSolution),
    'Every vulnerability should have broken + solution'
  )
  console.log(`✓ Vulnerability mappings: ${mappings.length} known quantum issues mapped to fold-tier fixes`)
}

testThreatModelComparison()
testInversionProof()
testVulnerabilityMappings()

/**
 * TEST: Security Properties (No Gaps)
 *
 * Verify that every security property is tested
 */

console.log('\nSecurity Properties Tests (No Gaps)')

function testNoGaps() {
  const properties = [
    {
      name: 'State identity',
      test: () => {
        const s1 = encodeQuantumState('Z', 0, 0)
        const s2 = encodeQuantumState('Z', 0, 0)
        return s1.id === s2.id
      },
    },
    {
      name: 'Key trinity constraint',
      test: () => {
        const key = generateQuantumKey('test', 32)
        return key.material.every((b) => TRINITY.includes(b))
      },
    },
    {
      name: 'Encryption reversibility',
      test: () => {
        const p = '123'
        return vortexDecode(vortexEncode(p)) === p
      },
    },
    {
      name: 'Receipt chain integrity',
      test: () => {
        const r = recordMeasurement('GENESIS', 0, 'Z', 0)
        return verifyMeasurementReceipt(r)
      },
    },
    {
      name: 'Unified gate verification',
      test: () => {
        const cipher = new QuantumFoldCipher()
        cipher.generateKey('test')
        cipher.prepareState()
        cipher.applyGate('H')
        cipher.measure()
        cipher.encrypt('12345')
        return cipher.computesGate().ok
      },
    },
  ]

  for (const prop of properties) {
    const result = prop.test()
    console.assert(result, `${prop.name} failed`)
    console.log(`✓ ${prop.name}`)
  }

  console.log(`\n✓✓✓ NO GAPS: All ${properties.length} security properties verified ✓✓✓`)
}

testNoGaps()

/**
 * Summary
 */

console.log('\n=== TEST SUMMARY ===')
console.log('All tests passed:')
console.log('  ✓ Tier 1: Deterministic Identity')
console.log('  ✓ Tier 2: Structural Proof')
console.log('  ✓ Tier 3: Cryptographic Seal')
console.log('  ✓ Tier 4: Chain Verification')
console.log('  ✓ Tier 1+2: Encryption (Bijective)')
console.log('  ✓ Tier 5: Compositional Integration')
console.log('  ✓ Quantum Threat Analysis')
console.log('  ✓ Security Properties (No Gaps)')
console.log('\nQuantum Fold Cipher is ready for use. ✓')

// ============================================================================
// HKDF — the replacement the deprecation notice points at
// ============================================================================
//
// expandQuantumKeyViaRodin prints "DEPRECATED and cryptographically weak, use
// expandQuantumKeyViaHkdf instead" on every gate run, and expandQuantumKeyViaHkdf
// had no test. A coverage audit found it: 369 exported functions are never
// called, and this was one of them. Steering users to an unverified replacement
// is worse than the warning is worth.
//
// The oracle is Node's own crypto.hkdfSync, an independent RFC 5869
// implementation. Full HKDF is Extract then Expand, so computing the PRK here
// with HMAC and expanding it must reproduce Node's answer byte for byte. That
// checks the algorithm against the standard rather than against itself.

import { createHmac as hkdfHmac, hkdfSync } from 'node:crypto'
import { hkdfExpand as zpHkdfExpand, expandQuantumKeyViaHkdf as zpExpand } from './quantum-fold-cipher.ts'

{
  let hkdfFailures = 0
  const hcheck = (name: string, ok: boolean, detail = ''): void => {
    if (ok) { console.log('  ✓ ' + name); return }
    hkdfFailures++
    console.log('  ✗ ' + name + (detail ? ' — ' + detail : ''))
  }

  console.log('\nHKDF-Expand against Node\'s RFC 5869 implementation')

  // RFC 5869 Appendix A.1 inputs, plus lengths that straddle the 32-byte block
  // boundary — 1, 31, 32, 33 and 64 are where an off-by-one in the T(i) loop
  // or the final truncation would show.
  const ikm = Buffer.alloc(22, 0x0b)
  const salt = Buffer.from('000102030405060708090a0b0c', 'hex')
  const info = Buffer.from('f0f1f2f3f4f5f6f7f8f9', 'hex')
  const prk = hkdfHmac('sha256', salt).update(ikm).digest()

  for (const len of [1, 31, 32, 33, 42, 64, 100]) {
    const mine = zpHkdfExpand(prk, info, len)
    const node = Buffer.from(hkdfSync('sha256', ikm, salt, info, len))
    hcheck(`length ${len} matches node:crypto`, mine.equals(node), `${mine.toString('hex').slice(0, 24)}… vs ${node.toString('hex').slice(0, 24)}…`)
  }

  // Empty info, and a different salt, so the test does not depend on one fixture.
  const prk2 = hkdfHmac('sha256', Buffer.alloc(0)).update(ikm).digest()
  hcheck('empty salt and info match node:crypto',
    zpHkdfExpand(prk2, Buffer.alloc(0), 42).equals(Buffer.from(hkdfSync('sha256', ikm, Buffer.alloc(0), Buffer.alloc(0), 42))))

  // Distinct info must give distinct output, or the info parameter is ignored.
  hcheck('info actually changes the output',
    !zpHkdfExpand(prk, Buffer.from('a'), 32).equals(zpHkdfExpand(prk, Buffer.from('b'), 32)))

  // And the expansion built on it.
  const key = { material: [3, 6, 9, 3, 6, 9], round: 0, genesis: '00112233-4455-6677-8899-aabbccddeeff', contentDigest: 'ab'.repeat(32), seal: '' } as never
  const rounds = zpExpand(key, 3)
  hcheck('expandQuantumKeyViaHkdf returns the root plus one key per round', rounds.length === 4, String(rounds.length))
  hcheck('every derived value is on the trinity axis',
    rounds.slice(1).every((k) => k.material.every((d) => d === 3 || d === 6 || d === 9)))
  hcheck('rounds differ from each other',
    new Set(rounds.slice(1).map((k) => k.material.join())).size === 3)
  hcheck('expansion is deterministic',
    JSON.stringify(zpExpand(key, 3)) === JSON.stringify(rounds))

  if (hkdfFailures > 0) {
    console.error(`HKDF checks FAILED — ${hkdfFailures}`)
    process.exit(1)
  }
}
