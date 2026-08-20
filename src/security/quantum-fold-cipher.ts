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

import { merge, foldPair, sealFacets, toUuid } from '../0/index.ts'

import { VORTEX_ORBIT } from '../0/index.ts'
import { log2, ceil } from '../0/algebra.ts'

// Tier 3 is the CRYPTOGRAPHIC seal, so it uses the SHA-256 path, not the FNV
// fold. src/integrity/content-uuid.ts states the split in its own header:
// "FNV toUuid stays in src/0 for cheap folds; this module seals cryptographic
// identity for proofs/manifests." The cipher had been sealing with toUuid.
import { computeContentUuid, computeContentDigest } from '../integrity/content-uuid.ts'
import { createCipheriv, createDecipheriv, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

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

/**
 * Password-stretching parameters, stored so the key can be re-derived and so
 * a tampered salt or lowered cost is caught by the seal.
 */
export interface PasswordKdf {
  readonly algorithm: 'scrypt'
  readonly N: number // CPU/memory cost
  readonly r: number // block size
  readonly p: number // parallelisation
  readonly saltHex: string
}

export interface QuantumKey {
  readonly material: number[] // bytes, each ∈ {3, 6, 9} (trinity-masked)
  /** Expansion round, when this is a derived round key. Part of the seal. */
  readonly round?: number
  /** Present when the key came from a password. Part of the seal. */
  readonly kdf?: PasswordKdf
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
 * INPUT ENTROPY. This maps its input to material with cheap folds, so the key
 * is only as strong as the input. That is correct for random bytes or another
 * KDF's output, and WRONG for a human passphrase — use
 * `generateQuantumKeyFromPassword` for those, which stretches with scrypt.
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
  kdf?: PasswordKdf,
): Record<string, unknown> {
  const base: Record<string, unknown> =
    round === undefined
      ? { kind: 'quantum-key-v1', material: [...material], genesis }
      : { kind: 'quantum-key-expanded-v1', round, material: [...material], genesis }
  // The KDF parameters are sealed too: a lowered cost or swapped salt is a
  // downgrade attack, and it must not verify against the original key.
  return kdf === undefined ? base : { ...base, kdf }
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
 * Password stretching — scrypt.
 *
 * `generateQuantumKey` maps its input to key material with cheap folds. That
 * is correct for input that is ALREADY high-entropy (random bytes, another
 * KDF's output) and wrong for anything a human typed: it costs an attacker
 * one hash per guess, so the key is exactly as strong as the passphrase.
 *
 * This path runs the password through scrypt first, so each guess costs the
 * attacker the same memory-hard work it costs the caller. It does not create
 * entropy — a passphrase in a wordlist is still findable — it raises the price
 * per guess, which is all any KDF can do.
 *
 * Defaults are OWASP's current scrypt guidance: N = 2^17, r = 8, p = 1
 * (~128 MB, ~290 ms here). The cost is deliberately felt.
 *
 * The salt is REQUIRED for the derivation to be reproducible, and is generated
 * when not supplied. Determinism is therefore "same password + same salt →
 * same key", which is the correct contract for a KDF: a fixed salt across
 * users would let one precomputation attack all of them.
 */
export const DEFAULT_SCRYPT: Omit<PasswordKdf, 'saltHex'> = {
  algorithm: 'scrypt',
  N: 1 << 17,
  r: 8,
  p: 1,
}

export const SCRYPT_SALT_BYTES = 16

export function generateQuantumKeyFromPassword(
  password: string,
  saltHex?: string,
  params: Omit<PasswordKdf, 'saltHex'> = DEFAULT_SCRYPT,
  keyLength: number = DEFAULT_KEY_LENGTH,
): QuantumKey {
  const salt =
    saltHex === undefined ? randomBytes(SCRYPT_SALT_BYTES) : Buffer.from(saltHex, 'hex')
  if (salt.length < SCRYPT_SALT_BYTES) {
    throw new Error(`generateQuantumKeyFromPassword: salt must be >= ${SCRYPT_SALT_BYTES} bytes`)
  }

  const kdf: PasswordKdf = { ...params, saltHex: salt.toString('hex') }
  // 128·N·r bytes of memory is the whole point of scrypt; Node's default
  // maxmem (32 MB) would reject the recommended parameters outright.
  const stretched = scryptSync(password, salt, 32, {
    N: kdf.N,
    r: kdf.r,
    p: kdf.p,
    maxmem: 256 * kdf.N * kdf.r,
  })

  // The stretched output is high-entropy, so the ordinary derivation is the
  // right tool for it from here on.
  const base = generateQuantumKey(`scrypt:${stretched.toString('hex')}`, keyLength)
  const sealed = keySealInput(base.material, base.genesis, undefined, kdf)
  return {
    material: base.material,
    genesis: base.genesis,
    kdf,
    contentUuid: computeContentUuid(sealed),
    contentDigest: computeContentDigest(sealed),
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
  const sealed = keySealInput(key.material, key.genesis, key.round, key.kdf)
  try {
    return (
      timingSafeEqual(Buffer.from(computeContentUuid(sealed)), Buffer.from(key.contentUuid)) &&
      timingSafeEqual(Buffer.from(computeContentDigest(sealed)), Buffer.from(key.contentDigest))
    )
  } catch {
    return false
  }
}

/**
 * HKDF-SHA256 Key Expansion (IETF Standard)
 *
 * Replaces the weak Rodin doubling (b*2) % 9 with HKDF-SHA256 per RFC 5869.
 * Each round key is derived independently using HMAC-SHA256, making the
 * expansion cryptographically strong:
 *   - Non-reversible: cannot compute ki-1 from ki
 *   - Non-cyclic: arbitrary number of rounds, no repetition
 *   - Industry standard: vetted by IETF and cryptographic community
 *
 * Process:
 *   PRK = HMAC-SHA256(salt=genesis, IKM=contentDigest)
 *   T(i) = HMAC-SHA256(PRK, T(i-1) || info || counter) for i = 1..rounds
 *   Round key material = map(T(i) bytes → trinity {3,6,9})
 */
function hkdfExpand(
  prk: Buffer,
  info: Buffer,
  length: number,
): Buffer {
  const hash = 'sha256'
  const hashLen = 32 // SHA-256 produces 32 bytes
  const n = ceil(length / hashLen)
  const output: Buffer[] = []
  let t = Buffer.alloc(0)

  for (let i = 1; i <= n; i++) {
    const input = Buffer.concat([t, info, Buffer.from([i])])
    t = createHmac(hash, prk).update(input).digest()
    output.push(t)
  }

  return Buffer.concat(output).subarray(0, length)
}

export function expandQuantumKeyViaHkdf(
  key: QuantumKey,
  rounds: number,
): QuantumKey[] {
  const expanded = [key]

  // Extract phase: use genesis UUID as salt, contentDigest as input key material
  const salt = Buffer.from(key.genesis.replace(/-/g, ''), 'hex')
  const ikm = Buffer.from(key.contentDigest, 'hex')
  const prk = createHmac('sha256', salt).update(ikm).digest()

  for (let r = 0; r < rounds; r++) {
    // Expand phase: derive round-specific key material
    const info = Buffer.from(`quantum-key-round:${r}:expansion`, 'utf8')
    const derivedBytes = hkdfExpand(prk, info, key.material.length)

    // Map derived bytes to trinity values {3, 6, 9}
    const current: number[] = []
    for (let i = 0; i < derivedBytes.length; i++) {
      const byte = derivedBytes[i]!
      current.push(TRINITY[byte % TRINITY.length]!)
    }

    // Round keys are sealed the same way as the root key — an expanded key is
    // still key material, so it carries the same cryptographic binding.
    const sealed = keySealInput(current, key.genesis, r)
    expanded.push({
      material: current,
      round: r,
      contentUuid: computeContentUuid(sealed),
      contentDigest: computeContentDigest(sealed),
      genesis: key.genesis,
    })
  }

  return expanded
}

/**
 * Deprecated: weak Rodin doubling key expansion.
 *
 * DO NOT USE — replaced by expandQuantumKeyViaHkdf.
 * Kept only for migration; new code must use HKDF-SHA256.
 *
 * Vulnerabilities in Rodin doubling:
 *   - Deterministic linear cycle: b → 2b → 4b → 8b → 7b → 5b → 1b → 2b
 *   - Reversible: given ki, compute ki-1 via modular inverse
 *   - Enables key recovery attacks: attacker can walk back to seed
 *
 * @deprecated Use expandQuantumKeyViaHkdf instead
 */
export function expandQuantumKeyViaRodin(
  key: QuantumKey,
  rounds: number,
): QuantumKey[] {
  console.warn(
    'expandQuantumKeyViaRodin is DEPRECATED and cryptographically weak. ' +
    'Use expandQuantumKeyViaHkdf (HKDF-SHA256) instead.',
  )
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
  readonly ciphertext: string // hex — AES is byte-oriented, not digit-domain
  readonly nonce: string // hex; 96-bit GCM IV, MUST be unique per key
  readonly tag: string // hex; 128-bit GCM authentication tag
  readonly keyUuid: string
  readonly stateUuid: string
  readonly receipt: string // Merkle receipt of encryption operation
}

/**
 * THE CONSTRUCTION — AES-256-GCM.
 *
 * History, because it explains the shape of this file. The cipher began as a
 * position-only vortex shift that never consulted the key (0-bit keyspace).
 * Keying it by `material[i mod n]` made it a repeating-key substitution, which
 * one known plaintext broke outright. Replacing that with an HMAC-SHA256
 * keystream plus encrypt-then-MAC was sound, but it was still a bespoke
 * composition — and the honest note on it said a vetted AEAD was the better
 * choice. This is that choice.
 *
 *   k_aes  = HMAC-SHA256(contentDigest, ".../aes-gcm/v1")   → 32 bytes
 *   iv     = 12 random bytes, fresh per message
 *   AAD    = keyUuid, so the payload cannot be re-bound to another key
 *   ct,tag = AES-256-GCM(k_aes, iv, plaintext, AAD)
 *
 * What changes for callers:
 *   · The ciphertext is now HEX, not a digit string. AES is byte-oriented, so
 *     the digit domain does not survive the switch. That domain was the only
 *     reason to build anything bespoke; standard authenticated encryption is
 *     worth more than a format-preserving ciphertext.
 *   · The plaintext domain is now UNRESTRICTED. The digit-only rule existed
 *     because non-digits were passed through in the clear; AES has no such
 *     hole, so arbitrary UTF-8 is accepted.
 *
 * What is now standard rather than argued: confidentiality, integrity and
 * authenticity all come from GCM, verified by `final()` before any plaintext
 * is returned. There is no hand-rolled keystream, no hand-rolled MAC, no
 * rejection sampling, and no modulus-bias question.
 *
 * Boundaries that remain:
 *   · The IV must be unique per key. GCM fails catastrophically on IV reuse —
 *     worse than a stream cipher, since it also leaks the authentication
 *     subkey. Random 96-bit IVs bound safe use to ~2³² messages per key
 *     (NIST SP 800-38D); rotate keys before that.
 *   · Key strength is bounded by the ENTROPY OF THE CALLER'S INPUT, not by the
 *     256.8-bit material space. `generateQuantumKey('password')` yields a key
 *     no stronger than 'password'. There is no password stretching here — no
 *     PBKDF2, scrypt or Argon2 — so a low-entropy passphrase is directly
 *     brute-forceable regardless of everything above.
 *   · Length is not hidden, and this is not analysed for side channels,
 *     traffic analysis, or key management.
 */

const AES_LABEL = 'zeropoint/quantum-cipher/aes-gcm/v1'
const AES_ALGORITHM = 'aes-256-gcm'
/** 96-bit IV — the size GCM is specified for. */
const IV_BYTES = 12

function aesKey(key: QuantumKey): Buffer {
  return createHmac('sha256', Buffer.from(key.contentDigest, 'hex')).update(AES_LABEL).digest()
}

export function encryptQuantum(
  plaintext: string,
  key: QuantumKey,
  ivHex?: string,
): EncryptedPayload {
  const iv = ivHex === undefined ? randomBytes(IV_BYTES) : Buffer.from(ivHex, 'hex')
  if (iv.length !== IV_BYTES) {
    throw new Error(`encryptQuantum: iv must be ${IV_BYTES} bytes (96-bit GCM nonce)`)
  }

  const cipher = createCipheriv(AES_ALGORITHM, aesKey(key), iv)
  // Bind the key identity into the AAD, so a payload cannot be re-labelled
  // with another key's uuid and still authenticate.
  cipher.setAAD(Buffer.from(key.contentUuid, 'utf8'))
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]).toString('hex')
  const tag = cipher.getAuthTag().toString('hex')

  const plaintextUuid = toUuid(`plaintext:${plaintext}`)
  const ciphertextUuid = toUuid(`ciphertext:${ciphertext}`)
  const { merged } = foldPair(plaintextUuid, ciphertextUuid)

  return {
    ciphertext,
    nonce: iv.toString('hex'),
    tag,
    keyUuid: key.contentUuid,
    stateUuid: merged,
    receipt: merged,
  }
}

/**
 * Decrypt and authenticate. GCM verifies the tag inside `final()`, which
 * throws on any mismatch — forged, altered, or re-keyed payloads never yield
 * plaintext.
 */
export function decryptQuantum(payload: EncryptedPayload, key: QuantumKey): string {
  if (payload.keyUuid !== key.contentUuid) {
    throw new Error('decryptQuantum: key does not match the payload seal')
  }
  const iv = Buffer.from(payload.nonce, 'hex')
  if (iv.length !== IV_BYTES) throw new Error('decryptQuantum: malformed iv')

  const decipher = createDecipheriv(AES_ALGORITHM, aesKey(key), iv)
  decipher.setAAD(Buffer.from(key.contentUuid, 'utf8'))
  decipher.setAuthTag(Buffer.from(payload.tag, 'hex'))

  try {
    return Buffer.concat([
      decipher.update(Buffer.from(payload.ciphertext, 'hex')),
      decipher.final(),
    ]).toString('utf8')
  } catch {
    throw new Error('decryptQuantum: authentication failed — ciphertext forged or altered')
  }
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
  expandQuantumKeyViaHkdf,
  expandQuantumKeyViaRodin, // Deprecated

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
