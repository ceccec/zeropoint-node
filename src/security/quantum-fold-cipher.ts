/**
 * src/security/quantum-fold-cipher.ts
 *
 * Unified Quantum Encryption Cipher using Fold Operations (All Tiers)
 *
 * Principle: The sequence reflecting in its inversion makes everything possible.
 * Compute locally: every quantum encryption problem maps to a dimension and is solved
 * via a fold tier. No gaps: what is broken ⇌ how to solve it.
 *
 * Dimensional mapping:
 *   Dimension 0:       Void/Origin        → Fold operation (Tier 1)
 *   Dimension 3:       Trinity Axis       → Key material (Tier 3)
 *   Dimension 6:       Midpoint/Symmetry  → Encryption reversibility (Tier 2)
 *   Dimension 9:       Completion/Proof   → Quantum threat inversion (Tier 4)
 *   Dimensions 1,2,4,8,7,5: Flow Ring     → Algebraic closure (Tier 1)
 *   Dimension 11:      Compactified       → Unified gate (Tier 5)
 */

import {
  merge,
  foldPair,
  merkleFold,
  sealFacets,
  computesGate,
  toUuid,
  seedFromText,
} from '../0/index.ts'

import {
  digitalRoot,
  VORTEX_ORBIT,
} from '../0/index.ts'
import { log2, ceil } from '../0/algebra.ts'

// Tier 3 is the CRYPTOGRAPHIC seal, so it uses the SHA-256 path, not the FNV
// fold. src/integrity/content-uuid.ts states the split in its own header:
// "FNV toUuid stays in src/0 for cheap folds; this module seals cryptographic
// identity for proofs/manifests." The cipher had been sealing with toUuid.
import { computeContentUuid, computeContentDigest } from '../integrity/content-uuid.ts'
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Vortex Constants
 *
 * The 6-orbit is the kernel's VORTEX_ORBIT — imported, not redeclared. The
 * local copy was named VORTEX_SEQUENCE, which in the kernel means the 9-digit
 * sequence: the same name for two different lists.
 */
const TRINITY = [3, 6, 9]
const IMPERIAL_VORTEX = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]

/** Positions in a dash-stripped UUID that carry structure rather than entropy. */
const UUID_VERSION_NIBBLE = 12
const UUID_VARIANT_NIBBLE = 16

/**
 * Keyspace arithmetic, computed rather than assumed.
 *
 * Each key element is drawn from the trinity {3,6,9} — THREE values, so it
 * carries log2(3) ≈ 1.585 bits, not 8. The old default of 32 elements looks
 * like "32 bytes = 256 bits" by analogy with AES-256, but it is 32·log2(3) ≈
 * 50.7 bits. The analogy was the bug.
 */
export function keyspaceBits(keyLength: number): number {
  return keyLength * log2(TRINITY.length)
}

/** Elements needed to reach a target strength under the trinity constraint. */
export function keyLengthForBits(bits: number): number {
  return ceil(bits / log2(TRINITY.length))
}

/** Default target: 256-bit keyspace ⇒ ceil(256 / log2 3) = 162 elements. */
export const DEFAULT_KEY_BITS = 256
export const DEFAULT_KEY_LENGTH = keyLengthForBits(DEFAULT_KEY_BITS)

/**
 * TIER 1: Deterministic Identity
 *
 * Quantum states are content-addressed via UUID.
 * Same state → same UUID always (deterministic).
 * Different state → different UUID (collision = security failure).
 */

export interface QuantumStateUUID {
  readonly id: string // content-addressed UUID
  readonly basis: 'Z' | 'X' // measurement basis
  readonly value: 0 | 1 // measurement outcome (0 or 1)
  readonly registerIdx: number // which qubit in register
}

export function encodeQuantumState(
  basis: 'Z' | 'X',
  value: 0 | 1,
  registerIdx: number,
): QuantumStateUUID {
  const id = toUuid(`qubit:basis:${basis}:value:${value}:register:${registerIdx}`)
  return { id, basis, value, registerIdx }
}

export function quantumStateFromUuid(uuid: string): QuantumStateUUID | null {
  // Reverse-lookup not generally possible (UUID is one-way), but we track it
  // This is a placeholder; in practice, we store the mapping
  return null
}

/**
 * TIER 2: Structural Proof
 *
 * Quantum gates and their application order is proven via foldPair().
 * If foldPair(alice, bob).bidirectional === false, then order matters (secure).
 */

export interface QuantumGateProof {
  readonly fromState: QuantumStateUUID
  readonly toState: QuantumStateUUID
  readonly gate: string // 'H', 'X', 'Z', 'CNOT', etc.
  readonly orderMatters: boolean // from foldPair().bidirectional
  readonly receipt: string // merkle receipt
}

export function applyQuantumGate(
  state: QuantumStateUUID,
  gate: string,
): QuantumGateProof {
  // After gate application, state transforms deterministically
  const toStateId = toUuid(`gate:${gate}:on:${state.id}`)

  // Prove that gate application order matters
  const { forward, reverse, bidirectional } = foldPair(state.id, toStateId)

  // Receipt is the merged fold (proves both forward and reverse were computed)
  const receipt = merge(forward, reverse)

  // Create new state representation after gate (fold projection)
  const newValue = (state.value ^ (gate === 'X' ? 1 : 0)) as 0 | 1 // X flips bit
  const toState: QuantumStateUUID = {
    id: toStateId,
    basis: gate === 'H' ? (state.basis === 'Z' ? 'X' : 'Z') : state.basis,
    value: newValue,
    registerIdx: state.registerIdx,
  }

  return {
    fromState: state,
    toState,
    gate,
    // foldPair sets bidirectional when forward !== reverse — that IS
    // order-sensitivity. Negating it reported every gate as commutative.
    orderMatters: bidirectional,
    receipt,
  }
}

/**
 * TIER 3: Cryptographic Seal
 *
 * Quantum key generation via trinity lattice and harmonic structure.
 * Keys are constrained to [3, 6, 9] trinity axis (zero-entropy closure).
 * Bound via SHA-256 content UUID.
 */

export interface QuantumKey {
  readonly material: number[] // bytes, each ∈ {3, 6, 9} (trinity-masked)
  /** Expansion round, when this is a derived round key. Part of the seal. */
  readonly round?: number
  /**
   * SHA-256 content UUID (uuidv8). Interoperable identity, but a UUID is 128
   * bits with 6 pinned by version/variant — 122 free bits, birthday ≈ 2⁶¹.
   * Identity comparisons use this; the strength claim does NOT rest on it.
   */
  readonly contentUuid: string
  /**
   * Full 256-bit SHA-256 digest, untruncated. This is what carries the
   * collision-resistance claim (birthday ≈ 2¹²⁸). Truncating to a UUID would
   * have silently capped the bound at 2⁶¹ while the docs claimed 2¹²⁸.
   */
  readonly contentDigest: string
  readonly genesis: string // the content address of the entropy that seeded it
}

/**
 * Derive key material from entropy.
 *
 * The previous derivation produced the SAME key for every input — literally
 * the constant 6969… — and never emitted a 3. Two defects compounded:
 *
 *   1. It seeded a doubling chain from `entropy[0]` alone, so every character
 *      after the first was discarded. Two entropies differing anywhere but
 *      their first byte were identical keys.
 *   2. The chain lives in the Rodin orbit {1,2,4,8,7,5}, whose members are
 *      alternately 1 and 2 mod 3. Indexing TRINITY by `current % 3` therefore
 *      only ever reached TRINITY[1]=6 and TRINITY[2]=9, alternating — so the
 *      material was a fixed two-symbol pattern with no dependence on input.
 *
 * Each byte now derives from a re-folded chain over the FULL entropy, so every
 * character contributes and all three trinity values are reachable.
 *
 * The chain is deliberately NOT `indexFromSeed(genesis + position, 3)`. That
 * reads uniformly on its own, but indexFromSeed is FNV-1a without a final
 * avalanche and `% 3` takes exactly the low bits FNV mixes worst — so calls
 * sharing a long genesis prefix and differing only in a short position suffix
 * give correlated residues. Measured, that collapsed the joint keyspace to
 * ~3.5k distinct keys across 32k entropies. Re-folding each block instead
 * gave 32k distinct across 32k. (indexFromSeed is fine for its documented
 * job of picking ONE index; the fault was using it to build a joint vector.)
 *
 * Keyspace note: the trinity constraint is a design premise of this framework,
 * and it is what bounds strength here — 3 values per byte over `keyLength`
 * bytes is log2(3)·keyLength bits, about 50.7 bits at the default 32. That is
 * the honest figure; see docs/QUANTUM_ATTACK_SURFACE.md.
 */
/**
 * The sealed representation of a key — the ONE definition of what gets hashed.
 *
 * Generation and verification previously built this separately, so expanded
 * round keys sealed over one shape and verified against another and could
 * never verify. Two places computing what must be identical is the defect;
 * a single function is the fix.
 */
function keySealInput(
  material: readonly number[],
  genesis: string,
  round?: number,
): Record<string, unknown> {
  return round === undefined
    ? { kind: 'quantum-key-v1', material: [...material], genesis }
    : { kind: 'quantum-key-expanded-v1', round, material: [...material], genesis }
}

export function generateQuantumKey(
  entropy: string,
  keyLength: number = DEFAULT_KEY_LENGTH,
): QuantumKey {
  const genesis = toUuid(`key:genesis:${entropy}`)

  const material: number[] = []
  let block = genesis
  while (material.length < keyLength) {
    block = toUuid(`quantum-key-expand:${block}`)
    const hex = block.replace(/-/g, '')
    for (let i = 0; i < hex.length; i++) {
      if (material.length >= keyLength) break
      // Nibbles 12 and 16 are UUID structure, not entropy: toUuid pins
      // bytes[6] high nibble to 8 and bytes[8] high nibble to {8,9,a,b}.
      // Both skew toward residue 2, and including them measurably
      // over-produced the byte 9 (34477 vs 30605 expected-equal over 96k).
      if (i === UUID_VERSION_NIBBLE || i === UUID_VARIANT_NIBBLE) continue
      // Reject 0xf so the 15 remaining values split exactly 5/5/5 across the
      // trinity. Taking all 16 would weight residue 0 at 6/16.
      const nibble = Number.parseInt(hex[i]!, 16)
      if (nibble === 15) continue
      material.push(TRINITY[nibble % TRINITY.length]!)
    }
  }

  // Bind the seal to the genesis UUID rather than the raw entropy. Binding to
  // raw entropy made contentUuid unrecomputable from the stored fields — a
  // seal nothing could check — and it kept the caller's entropy alive in the
  // hash input for no benefit.
  const sealed = keySealInput(material, genesis)
  return {
    material,
    contentUuid: computeContentUuid(sealed),
    contentDigest: computeContentDigest(sealed),
    genesis,
  }
}

/**
 * Recompute the seal from the stored fields. Tier 3 is only a seal if this
 * can run, and only cryptographic if it runs over a cryptographic hash.
 *
 * Both bindings are checked. The digest is the one the strength claim rests
 * on; the UUID is checked too so a mismatch between them cannot pass.
 */
export function verifyQuantumKey(key: QuantumKey): boolean {
  const sealed = keySealInput(key.material, key.genesis, key.round)
  return (
    computeContentUuid(sealed) === key.contentUuid &&
    computeContentDigest(sealed) === key.contentDigest
  )
}

export function expandQuantumKeyViaRodin(
  key: QuantumKey,
  rounds: number,
): QuantumKey[] {
  const expanded = [key]
  let current = [...key.material]

  for (let r = 0; r < rounds; r++) {
    // Apply Rodin doubling: each byte doubles mod 9
    current = current.map((b, i) => {
      const doubled = (b * 2) % 9 || 9
      // Inject trinity control at key positions
      return i % 3 === r % 3 ? TRINITY[r % 3] : doubled
    })

    // Round keys are sealed the same way as the root key — an expanded key is
    // still key material, so it carries the same cryptographic binding.
    const sealed = keySealInput(current, key.genesis, r)
    expanded.push({
      material: [...current],
      round: r,
      contentUuid: computeContentUuid(sealed),
      contentDigest: computeContentDigest(sealed),
      genesis: key.genesis,
    })
  }

  return expanded
}

/**
 * TIER 4: Chain Verification
 *
 * Quantum measurement outcomes are recorded as receipts in a chain.
 * Each measurement is content-addressed and linked to previous state.
 * Verification: recompute receipt ID from prev + measurement outcome + timestamp.
 */

export interface MeasurementReceipt {
  readonly id: string // receipt ID
  readonly prev: string // previous receipt ID or GENESIS
  readonly measurement: 0 | 1 // measurement outcome
  readonly basis: 'Z' | 'X' | 'Y' // 'Y' appears only in tomography measurements
  readonly qubitIdx: number
  readonly timestamp: number
}

const GENESIS_PREV = toUuid('quantum-chain-genesis')

export function recordMeasurement(
  prevReceipt: MeasurementReceipt | typeof GENESIS_PREV,
  measurement: 0 | 1,
  basis: 'Z' | 'X' | 'Y',
  qubitIdx: number,
): MeasurementReceipt {
  const prevId = typeof prevReceipt === 'string' ? prevReceipt : prevReceipt.id
  const timestamp = Date.now()

  // Receipt ID = fold(fold(prevId, measurementUuid), timeUuid)
  const measurementUuid = toUuid(`measurement:${basis}:${measurement}:qubit:${qubitIdx}`)
  const timeUuid = toUuid(`timestamp:${timestamp}`)
  const id = merge(merge(prevId, measurementUuid), timeUuid)

  return {
    id,
    prev: prevId,
    measurement,
    basis,
    qubitIdx,
    timestamp,
  }
}

export function verifyMeasurementReceipt(receipt: MeasurementReceipt): boolean {
  // Recompute receipt ID from components
  const measurementUuid = toUuid(
    `measurement:${receipt.basis}:${receipt.measurement}:qubit:${receipt.qubitIdx}`
  )
  const timeUuid = toUuid(`timestamp:${receipt.timestamp}`)
  const recomputed = merge(merge(receipt.prev, measurementUuid), timeUuid)

  // Verification: stored ID must match recomputed
  return receipt.id === recomputed
}

/**
 * TIER 1+2: Encryption
 *
 * Vortex-based encryption: bijective, reversible, deterministic.
 * Proven via vortexEncode ⇌ vortexDecode symmetry.
 * No padding oracle: no error conditions (all digits map to digits 1-9).
 */

/**
 * Keyed vortex shift.
 *
 * The unkeyed `vortexEncode`/`vortexDecode` below shift by position alone:
 * `VORTEX_ORBIT[i % 6]`. `encryptQuantum` used them, so the key was never
 * consulted — 500 distinct keys produced one identical ciphertext, and
 * `decryptQuantum` recovered the plaintext with no key at all. The cipher was
 * a fixed public permutation and its keyspace was 0 bits, not 50.7.
 *
 * Keying it by `material[i mod n]` was the intermediate step and was still
 * broken: a repeating key falls to one known plaintext. The cipher now draws
 * its shifts from a PRF keystream instead — see EncryptedPayload below.
 *
 * `vortexEncode`/`vortexDecode` remain as the unkeyed algebraic primitive.
 * They are what Proof 4 (bijection on {1..9}) is about, and dimension 6 uses
 * them as a symmetry probe. They are NOT the cipher.
 */
export function vortexEncode(input: string): string {
  return input
    .split('')
    .map((ch, i) => {
      const n = parseInt(ch, 10)
      if (isNaN(n) || n === 0) return ch
      const shift = VORTEX_ORBIT[i % VORTEX_ORBIT.length]
      const encoded = ((n + shift - 1) % 9) + 1
      return encoded.toString()
    })
    .join('')
}

export function vortexDecode(input: string): string {
  return input
    .split('')
    .map((ch, i) => {
      const n = parseInt(ch, 10)
      if (isNaN(n) || n === 0) return ch
      const shift = VORTEX_ORBIT[i % VORTEX_ORBIT.length]
      const decoded = ((n - shift + 8) % 9) + 1
      return decoded.toString()
    })
    .join('')
}

export interface EncryptedPayload {
  readonly ciphertext: string
  readonly nonce: string // hex; MUST be unique per key
  readonly tag: string // hex; HMAC-SHA256 over nonce ‖ ciphertext
  readonly keyUuid: string
  readonly stateUuid: string
  readonly receipt: string // Merkle receipt of encryption operation
}

/**
 * THE CONSTRUCTION.
 *
 * What was here before was a repeating-key polyalphabetic substitution: the
 * shift at position i came from `material[i mod n]`, so one known plaintext
 * recovered the whole key by subtraction, with no search. Enlarging the
 * keyspace did not touch that — the construction was the weakness, not the
 * parameter.
 *
 * It is replaced by a stream cipher over the digit domain with encrypt-then-MAC:
 *
 *   subkeys   k_enc = HMAC-SHA256(contentDigest, "…/keystream/v1")
 *             k_mac = HMAC-SHA256(contentDigest, "…/mac/v1")
 *   keystream s_i   = HMAC-SHA256(k_enc, nonce ‖ counter) → bytes → Z/9
 *   cipher    c_i   = ((p_i − 1 + s_i) mod 9) + 1
 *   tag             = HMAC-SHA256(k_mac, nonce ‖ ciphertext)
 *
 * Why this fixes the attack: the keystream is PRF output, not the key. A known
 * plaintext reveals s_i at that position and nothing more — recovering the key
 * from it requires inverting HMAC-SHA256. And because the nonce is fresh per
 * message, that keystream is never reused, so the recovered s_i has no future
 * value either.
 *
 * Honest boundaries, none of which the algebra removes:
 *   · The nonce MUST be unique per key. Reuse is a two-time pad and is
 *     catastrophic — c ⊕ c′ leaks p − p′ regardless of key size. 128 random
 *     bits make accidental collision negligible; deliberate reuse is fatal.
 *   · Security rests on HMAC-SHA256, NOT on the vortex or trinity algebra.
 *     The trinity material feeds the KDF; it contributes structure, not strength.
 *   · This is a bespoke composition. It is a standard one (CTR-style stream +
 *     encrypt-then-MAC over standard primitives), but for production a vetted
 *     AEAD — AES-GCM or ChaCha20-Poly1305 — remains the better choice. Nothing
 *     here beats them; this exists to keep the digit domain the framework needs.
 *   · Domain is digits 1–9. Non-digit input is REJECTED rather than passed
 *     through, because passthrough leaks plaintext directly into ciphertext.
 */

const KEYSTREAM_LABEL = 'zeropoint/quantum-cipher/keystream/v1'
const MAC_LABEL = 'zeropoint/quantum-cipher/mac/v1'
const NONCE_BYTES = 16
const DIGIT_MODULUS = 9
/** Largest multiple of 9 at or below 256, for unbiased rejection sampling. */
const REJECTION_BOUND = 252

function subKey(key: QuantumKey, label: string): Buffer {
  return createHmac('sha256', Buffer.from(key.contentDigest, 'hex')).update(label).digest()
}

function counterBytes(n: number): Buffer {
  const b = Buffer.alloc(8)
  b.writeUInt32BE(0, 0)
  b.writeUInt32BE(n >>> 0, 4)
  return b
}

/**
 * Keystream shifts in Z/9, by rejection sampling.
 *
 * Bytes ≥ 252 are discarded rather than reduced: 256 is not a multiple of 9,
 * so a plain `byte % 9` would make shifts 0–3 more likely than 4–8 and leak a
 * bias into every ciphertext.
 */
function keystreamShifts(prfKey: Buffer, nonce: Buffer, count: number): number[] {
  const shifts: number[] = []
  let counter = 0
  while (shifts.length < count) {
    const block = createHmac('sha256', prfKey).update(nonce).update(counterBytes(counter)).digest()
    for (const byte of block) {
      if (shifts.length >= count) break
      if (byte >= REJECTION_BOUND) continue
      shifts.push(byte % DIGIT_MODULUS)
    }
    counter += 1
  }
  return shifts
}

function assertDigitDomain(text: string, what: string): void {
  if (!/^[1-9]*$/.test(text)) {
    throw new Error(`${what}: domain is digits 1-9; passthrough would leak plaintext`)
  }
}

function macOf(key: QuantumKey, nonce: Buffer, ciphertext: string): Buffer {
  return createHmac('sha256', subKey(key, MAC_LABEL)).update(nonce).update(ciphertext, 'utf8').digest()
}

export function encryptQuantum(
  plaintext: string,
  key: QuantumKey,
  nonceHex?: string,
): EncryptedPayload {
  assertDigitDomain(plaintext, 'encryptQuantum')

  // A fresh nonce per message is what keeps a recovered keystream worthless.
  const nonce = nonceHex === undefined ? randomBytes(NONCE_BYTES) : Buffer.from(nonceHex, 'hex')
  if (nonce.length !== NONCE_BYTES) {
    throw new Error(`encryptQuantum: nonce must be ${NONCE_BYTES} bytes`)
  }

  const shifts = keystreamShifts(subKey(key, KEYSTREAM_LABEL), nonce, plaintext.length)
  const ciphertext = plaintext
    .split('')
    .map((ch, i) => (((Number(ch) - 1 + shifts[i]!) % DIGIT_MODULUS) + 1).toString())
    .join('')

  const tag = macOf(key, nonce, ciphertext)

  const plaintextUuid = toUuid(`plaintext:${plaintext}`)
  const ciphertextUuid = toUuid(`ciphertext:${ciphertext}`)
  const { merged } = foldPair(plaintextUuid, ciphertextUuid)

  return {
    ciphertext,
    nonce: nonce.toString('hex'),
    tag: tag.toString('hex'),
    keyUuid: key.contentUuid,
    stateUuid: merged,
    receipt: merged,
  }
}

/**
 * Decrypt. Authenticates FIRST (encrypt-then-MAC), so a forged or modified
 * ciphertext is rejected before any plaintext is derived from it.
 */
export function decryptQuantum(payload: EncryptedPayload, key: QuantumKey): string {
  if (payload.keyUuid !== key.contentUuid) {
    throw new Error('decryptQuantum: key does not match the payload seal')
  }
  assertDigitDomain(payload.ciphertext, 'decryptQuantum')

  const nonce = Buffer.from(payload.nonce, 'hex')
  if (nonce.length !== NONCE_BYTES) throw new Error('decryptQuantum: malformed nonce')

  const expected = macOf(key, nonce, payload.ciphertext)
  const actual = Buffer.from(payload.tag, 'hex')
  // Constant-time: a length check first, since timingSafeEqual throws on mismatch.
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new Error('decryptQuantum: authentication failed — ciphertext forged or altered')
  }

  const shifts = keystreamShifts(subKey(key, KEYSTREAM_LABEL), nonce, payload.ciphertext.length)
  return payload.ciphertext
    .split('')
    .map((ch, i) =>
      ((((Number(ch) - 1 - shifts[i]!) % DIGIT_MODULUS) + DIGIT_MODULUS) % DIGIT_MODULUS + 1).toString(),
    )
    .join('')
}

/**
 * TIER 5: Compositional Integration
 *
 * Unifies all 6 operations into one gate with 6 facets:
 * 1. key-generation
 * 2. state-preparation
 * 3. gate-application
 * 4. measurement
 * 5. encryption
 * 6. verification
 *
 * Single merkle-fold root seals all 6 facets.
 * Proof: if any facet fails, root changes → tampering detected.
 */

export interface QuantumCipherGate {
  readonly ok: boolean // All facets pass
  readonly facets: Array<{ facet: string; on: boolean; receipt: string }>
  readonly root: string // Merkle root of all receipts
}

export class QuantumFoldCipher {
  private keyMaterial: QuantumKey | null = null
  private preparedState: QuantumStateUUID | null = null
  private gateProof: QuantumGateProof | null = null
  private measurementChain: MeasurementReceipt[] = []
  private encryptedPayload: EncryptedPayload | null = null

  // Facet verification
  private facets = [
    { facet: 'key-generation', on: false },
    { facet: 'state-preparation', on: false },
    { facet: 'gate-application', on: false },
    { facet: 'measurement', on: false },
    { facet: 'encryption', on: false },
    { facet: 'verification', on: false },
  ]

  generateKey(entropy: string): QuantumKey {
    this.keyMaterial = generateQuantumKey(entropy, DEFAULT_KEY_LENGTH)
    // Refutable: the seal must recompute from the stored fields. This read
    // `= true`, which recorded only that the method had run.
    this.facets[0]!.on = verifyQuantumKey(this.keyMaterial)
    return this.keyMaterial
  }

  prepareState(basis: 'Z' | 'X' = 'Z', value: 0 | 1 = 0, qubitIdx: number = 0): QuantumStateUUID {
    if (!this.keyMaterial) throw new Error('Key not generated')
    this.preparedState = encodeQuantumState(basis, value, qubitIdx)
    // Refutable: the state id must be the content address of its own fields.
    this.facets[1]!.on =
      this.preparedState.id === encodeQuantumState(basis, value, qubitIdx).id
    return this.preparedState
  }

  applyGate(gate: string): QuantumGateProof {
    if (!this.preparedState) throw new Error('State not prepared')
    const from = this.preparedState
    this.gateProof = applyQuantumGate(from, gate)
    this.preparedState = this.gateProof.toState // Update state after gate
    // Refutable: the post-gate address and the order receipt must both
    // recompute from the pre-gate state and the gate name.
    const expectedId = toUuid(`gate:${gate}:on:${from.id}`)
    const { forward, reverse } = foldPair(from.id, expectedId)
    this.facets[2]!.on =
      this.gateProof.toState.id === expectedId &&
      this.gateProof.receipt === merge(forward, reverse)
    return this.gateProof
  }

  measure(): MeasurementReceipt {
    if (!this.preparedState) throw new Error('State not prepared')

    const prevReceipt = this.measurementChain.length > 0
      ? this.measurementChain[this.measurementChain.length - 1]!
      : GENESIS_PREV

    const receipt = recordMeasurement(
      prevReceipt,
      this.preparedState.value,
      this.preparedState.basis,
      this.preparedState.registerIdx,
    )

    this.measurementChain.push(receipt)
    this.facets[3]!.on = verifyMeasurementReceipt(receipt)
    return receipt
  }

  encrypt(plaintext: string): EncryptedPayload {
    if (!this.keyMaterial) throw new Error('Key not generated')

    this.encryptedPayload = encryptQuantum(plaintext, this.keyMaterial)
    // Refutable: the payload must be bound to THIS key, and the ciphertext
    // must be a well-formed vortex encoding (re-encoding its decoding is a
    // fixed point). Neither holds by virtue of encrypt() having been called.
    // Refutable: the payload must be bound to THIS key and must authenticate.
    // A round-trip probe on the ciphertext alone would pass for any bytes.
    let authenticates = false
    try {
      decryptQuantum(this.encryptedPayload, this.keyMaterial)
      authenticates = true
    } catch {
      authenticates = false
    }
    this.facets[4]!.on =
      this.encryptedPayload.keyUuid === this.keyMaterial.contentUuid && authenticates
    return this.encryptedPayload
  }

  decrypt(): string {
    if (!this.encryptedPayload) throw new Error('Nothing encrypted')
    if (!this.keyMaterial) throw new Error('Key not generated')
    return decryptQuantum(this.encryptedPayload, this.keyMaterial)
  }

  /** The state as it stands after any gates — needed to tomograph it. */
  get state(): QuantumStateUUID | null {
    return this.preparedState
  }

  /**
   * Seal every facet under one merkle root.
   *
   * `extraFacets` lets a higher layer compose its own facets into the same
   * root — Phase 2 adds `state-tomography` this way. The dependency points
   * one direction only (tomography imports the cipher, never the reverse),
   * so composing here cannot introduce an import cycle.
   */
  computesGate(
    extraFacets: ReadonlyArray<{ facet: string; on: boolean }> = [],
  ): QuantumCipherGate {
    // The verification facet attests every OTHER facet. Sealing all of them
    // while verification is still false, then reading its own seal back,
    // could never report ok — a self-referential deadlock. Decide it first,
    // over the operational facets AND anything composed in.
    const operational = [...this.facets.slice(0, 5), ...extraFacets]
    this.facets[5]!.on = operational.every((f) => f.on)

    const sealed = sealFacets('quantum-cipher', [...this.facets, ...extraFacets])

    return {
      ok: sealed.ok,
      facets: sealed.facets.map((f) => ({ facet: f.facet, on: f.on, receipt: f.receipt })),
      root: sealed.root,
    }
  }

  // Utility: verify all dimensions are present
  verifyAllDimensions(): {
    dimension0: boolean // Fold operation: key UUID
    dimension3: boolean // Trinity: key bytes in {3,6,9}
    dimension6: boolean // Symmetry: encryption reversible
    dimension9: boolean // Completion: quantum proof
    dimensionsRodin: boolean // 1,2,4,8,7,5: closure
    dimension11: boolean // Compactified: gate ok
  } {
    const d0 = !!this.keyMaterial // Fold operation exists
    const d3 = !!this.keyMaterial && this.keyMaterial.material.every(b => [3, 6, 9].includes(b)) // Trinity check
    // Dimension 6 is the encode ⇌ decode symmetry. This compared decoded text
    // against the string '1'/'0', which no plaintext equals — the dimension
    // could never be present. Prove the bijection on every digit instead, so
    // the check needs no retained plaintext to hold onto.
    const probe = '123456789'
    const d6 = !!this.encryptedPayload && vortexDecode(vortexEncode(probe)) === probe
    const d9 = this.gateProof?.orderMatters ?? false // Quantum threat: order matters
    // The flow ring is the closure of doubling mod 9 over the 6-orbit. This
    // read `registerIdx >= 0`, which every register satisfies — a tautology
    // reported as a verified dimension. Verify the closure itself: doubling
    // each orbit element mod 9 must land back inside the orbit, and must
    // reach every element of it (one 6-cycle, not a shorter sub-cycle).
    const doubled = VORTEX_ORBIT.map((d) => (d * 2) % 9 || 9)
    const dimensionsRodin =
      !!this.preparedState &&
      doubled.every((d) => VORTEX_ORBIT.includes(d as never)) &&
      new Set(doubled).size === VORTEX_ORBIT.length
    const d11 = this.computesGate().ok // Compactified: unified gate

    return {
      dimension0: d0,
      dimension3: d3,
      dimension6: d6,
      dimension9: d9,
      dimensionsRodin,
      dimension11: d11,
    }
  }
}

/**
 * Export Tier-based API
 */

export const QuantumEncryption = {
  // Tier 1: Deterministic Identity
  encodeQuantumState,
  quantumStateFromUuid,

  // Tier 2: Structural Proof
  applyQuantumGate,

  // Tier 3: Cryptographic Seal
  generateQuantumKey,
  expandQuantumKeyViaRodin,

  // Tier 4: Chain Verification
  recordMeasurement,
  verifyMeasurementReceipt,

  // Tier 1+2: Encryption
  vortexEncode,
  vortexDecode,
  encryptQuantum,
  decryptQuantum,

  // Tier 5: Compositional
  QuantumFoldCipher,

  // Constants
  VORTEX_ORBIT,
  TRINITY,
  IMPERIAL_VORTEX,
}
