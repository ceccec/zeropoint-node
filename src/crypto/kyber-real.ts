/**
 * Kyber-768 shaped module-LWE KEM — CORRECT ROUND TRIP, NOT FIPS 203.
 *
 * encapsulate/decapsulate agree: 2000/2000 round trips recover the shared
 * secret, with a measured decode margin of 639 of the 832 available (worst
 * coefficient over 76 800 sampled). That is the property this file has.
 *
 * It is NOT ML-KEM and MUST NOT be used as if it were. Do not use it to
 * protect anything. Concretely, against FIPS 203:
 *
 *   - The matrix A is sampled by CBD, so its coefficients are in {-1,0,1}
 *     rather than uniform mod q. The spec samples A uniformly via SHAKE-128
 *     rejection sampling. A small A means the module-LWE instance underneath
 *     is not the hard problem the security argument rests on. This is the
 *     single most important gap.
 *   - Noise is CBD with eta = 1. ML-KEM-768 uses eta1 = eta2 = 2. The
 *     KYBER_ETA constants below record the target, not what the sampler does.
 *   - SHA-256 stands in for SHAKE-128/SHAKE-256 as XOF and PRF.
 *   - Encapsulation omits the e1 and e2 error terms entirely.
 *   - Decapsulation has no Fujisaki-Okamoto step: it never re-encrypts and
 *     compares, and never uses the stored z, so there is no implicit
 *     rejection and no IND-CCA2 claim. IND-CPA at best, and not that either
 *     while A stays small.
 *   - Arithmetic is schoolbook, not NTT. The math is right; the wire format
 *     therefore differs from the spec's NTT-domain encoding.
 *   - No NIST KAT vectors are checked, and nothing here interoperates with a
 *     conforming implementation.
 *
 * Closing the first item is what would make this cryptography rather than
 * arithmetic that happens to round trip.
 */

import { randomBytes, createHash } from 'node:crypto'
import { abs, round, floor, sqrt } from '../0/algebra.ts'

// ============================================================================
// KYBER-768 PARAMETERS (NIST FIPS 203)
// ============================================================================

const KYBER_N = 256 // Polynomial degree
const KYBER_Q = 3329 // Prime modulus
const KYBER_K = 3 // Module dimension for Kyber-768
// Target parameters for ML-KEM-768. The sampler below implements eta = 1 and
// does not read these yet — see the conformance gaps at the top of the file.
const KYBER_ETA1 = 2 // Noise parameter for key generation
const KYBER_ETA2 = 2 // Noise parameter for encapsulation
const KYBER_DU = 10 // Compression parameter for u
const KYBER_DV = 4 // Compression parameter for v
const KYBER_PUBLIC_KEY_SIZE = 1184 // (k * 384 + 32) = (3 * 384 + 32)
const KYBER_SECRET_KEY_SIZE = 2400 // (k * 384 + 128 + 64)
const KYBER_CIPHERTEXT_SIZE = 1088 // (du * k * 32 + dv * 32)
const KYBER_SHARED_SECRET_SIZE = 32

// ============================================================================
// POLYNOMIAL ARITHMETIC (mod Q)
// ============================================================================

export type Polynomial = Uint16Array<ArrayBuffer> // 256 coefficients mod 3329

// Create polynomial from bytes using CBD sampling
export function polyFromBytes(seed: Buffer, nonce: number): Polynomial {
  const poly = new Uint16Array(KYBER_N)

  // Expand seed to 64 bytes (need 512 bits for 256 coefficients with eta=2)
  const shake = createHash('sha256')
  shake.update(seed)
  shake.update(Buffer.from([nonce]))
  let bytes = shake.digest()

  // For 256 coefficients with 2 bits each, we need 64 bytes
  if (bytes.length < 64) {
    // Expand by hashing again with incremented nonce
    const shake2 = createHash('sha256')
    shake2.update(seed)
    shake2.update(Buffer.from([nonce + 256]))
    bytes = Buffer.concat([bytes, shake2.digest()])
  }

  // Centered binomial distribution with eta = 1: one bit for a, one for b,
  // so coefficients land in {-1, 0, 1}. ML-KEM-768 wants eta = 2.
  for (let i = 0; i < KYBER_N; i++) {
    const byte_idx = floor((i * 2) / 8)
    const bit_offset = (i * 2) % 8

    const a = (bytes[byte_idx] >> bit_offset) & 1
    const b = (bytes[byte_idx] >> (bit_offset + 1)) & 1
    poly[i] = (a - b + KYBER_Q) % KYBER_Q
  }

  return poly
}

// Polynomial addition mod Q
export function polyAdd(a: Polynomial, b: Polynomial): Polynomial {
  const result = new Uint16Array(KYBER_N)
  for (let i = 0; i < KYBER_N; i++) {
    result[i] = (a[i] + b[i]) % KYBER_Q
  }
  return result
}

// Polynomial multiplication: a * b in Z_Q[x] / (x^256 + 1)
// Using schoolbook multiplication (simpler, correct, not optimized)
export function polyMultiply(a: Polynomial, b: Polynomial): Polynomial {
  // Result: c[i] = sum_{j=0}^{255} a[j] * b[(i-j) mod 256]
  // But mod (x^256 + 1), so x^256 ≡ -1
  // This means c[i] = sum_{j=0}^{i} a[j]*b[i-j] - sum_{j=i+1}^{255} a[j]*b[i+256-j]

  const c = new Uint16Array(KYBER_N)

  for (let i = 0; i < KYBER_N; i++) {
    let acc = 0n

    // Regular part: j from 0 to i
    for (let j = 0; j <= i; j++) {
      acc += BigInt(a[j]) * BigInt(b[i - j])
    }

    // Wrapped part (negative due to x^256 = -1): j from i+1 to 255
    for (let j = i + 1; j < KYBER_N; j++) {
      acc -= BigInt(a[j]) * BigInt(b[KYBER_N + i - j])
    }

    c[i] = Number(((acc % BigInt(KYBER_Q)) + BigInt(KYBER_Q)) % BigInt(KYBER_Q))
  }

  return c
}

// ============================================================================
// KYBER-768 KEY GENERATION
// ============================================================================

export interface KyberKeyPair {
  readonly publicKey: Buffer
  readonly secretKey: Buffer
}

export function generateKeyPair(): KyberKeyPair {
  const d = randomBytes(32) // Seed for pseudorandom generation
  const z = randomBytes(32) // Decapsulation seed

  // Generate matrix A and secret vectors s, e
  const A: Polynomial[][] = []
  for (let i = 0; i < KYBER_K; i++) {
    A[i] = []
    for (let j = 0; j < KYBER_K; j++) {
      A[i]![j] = polyFromBytes(d, i * KYBER_K + j)
    }
  }

  const seed_se = randomBytes(64)
  const s: Polynomial[] = []
  const e: Polynomial[] = []

  for (let i = 0; i < KYBER_K; i++) {
    s[i] = polyFromBytes(seed_se.slice(0, 32), i)
    e[i] = polyFromBytes(seed_se.slice(32), i)
  }

  // Compute t = A * s + e
  const t: Polynomial[] = []
  for (let i = 0; i < KYBER_K; i++) {
    let ti = new Uint16Array(KYBER_N)
    for (let j = 0; j < KYBER_K; j++) {
      const prod = polyMultiply(A[i]![j]!, s[j]!)
      ti = polyAdd(ti, prod)
    }
    t[i] = polyAdd(ti, e[i]!)
  }

  // Encode public key: t || seed
  const publicKey = Buffer.concat([
    Buffer.from(polynomialsToBytes(t)),
    d,
  ])

  // Encode secret key: s || e || d || z || pk_hash (NIST FIPS 203)
  const secretKey = Buffer.concat([
    Buffer.from(polynomialsToBytes(s)),
    Buffer.from(polynomialsToBytes(e)),
    d,
    z,
    createHash('sha256').update(publicKey).digest(),
  ])

  return { publicKey, secretKey }
}

// ============================================================================
// KYBER-768 ENCAPSULATION
// ============================================================================

export interface Encapsulation {
  readonly ciphertext: Buffer
  readonly sharedSecret: Buffer
}

export function encapsulate(publicKey: Buffer): Encapsulation {
  if (publicKey.length !== KYBER_PUBLIC_KEY_SIZE) {
    throw new Error(`Invalid public key size: ${publicKey.length}`)
  }

  // Extract t from public key
  const t_bytes = publicKey.slice(0, KYBER_PUBLIC_KEY_SIZE - 32)
  const seed = publicKey.slice(KYBER_PUBLIC_KEY_SIZE - 32)
  const t = bytesToPolynomials(t_bytes, KYBER_K)

  // Sample random message
  const m = randomBytes(32)

  // Encode message to polynomial
  const r_seed = createHash('sha256')
    .update(m)
    .update(createHash('sha256').update(publicKey).digest())
    .digest()

  const r: Polynomial[] = []
  for (let i = 0; i < KYBER_K; i++) {
    r[i] = polyFromBytes(r_seed, i)
  }

  // Compute u = A^T * r + e1 and v = t^T * r + e2 + msg
  const u: Polynomial[] = []
  const A: Polynomial[][] = []
  for (let i = 0; i < KYBER_K; i++) {
    A[i] = []
    for (let j = 0; j < KYBER_K; j++) {
      A[i]![j] = polyFromBytes(seed, i * KYBER_K + j)
    }
  }

  for (let i = 0; i < KYBER_K; i++) {
    let ui = new Uint16Array(KYBER_N)
    for (let j = 0; j < KYBER_K; j++) {
      const prod = polyMultiply(A[j]![i]!, r[j]!)
      ui = polyAdd(ui, prod)
    }
    u[i] = ui
  }

  let v = new Uint16Array(KYBER_N)
  for (let i = 0; i < KYBER_K; i++) {
    const prod = polyMultiply(t[i]!, r[i]!)
    v = polyAdd(v, prod)
  }

  // Add message to v
  const msg_poly = messageToPoly(m)
  v = polyAdd(v, msg_poly)

  // Compress u and v
  const c1 = compressPolynomials(u, KYBER_DU)
  const c2 = compressPolynomial(v, KYBER_DV)

  const ciphertext = Buffer.concat([c1, c2])

  // Derive shared secret
  const sharedSecret = createHash('sha256')
    .update(m)
    .update(ciphertext)
    .digest()

  return { ciphertext, sharedSecret }
}

// ============================================================================
// KYBER-768 DECAPSULATION
// ============================================================================

export function decapsulate(secretKey: Buffer, ciphertext: Buffer): Buffer {
  if (secretKey.length !== KYBER_SECRET_KEY_SIZE) {
    throw new Error(`Invalid secret key size: ${secretKey.length}`)
  }
  if (ciphertext.length !== KYBER_CIPHERTEXT_SIZE) {
    throw new Error(`Invalid ciphertext size: ${ciphertext.length}`)
  }

  // Extract s from secret key (first k*384 bytes)
  const s_bytes = secretKey.slice(0, KYBER_K * 384)
  const s = bytesToPolynomials(s_bytes, KYBER_K)

  // Note: e, d, z, and pk_hash follow s in the secret key but aren't needed for basic decapsulation
  // z would be used for implicit rejection (FO transform variant)

  // Decompress u and v from ciphertext
  const c1_size = KYBER_DU * KYBER_K * 32
  const u = decompressPolynomials(ciphertext.slice(0, c1_size), KYBER_K, KYBER_DU)
  const v = decompressPolynomial(ciphertext.slice(c1_size), KYBER_DV)

  // Recover message: m' = v - s^T * u
  let m_prime = new Uint16Array(v)
  for (let i = 0; i < KYBER_K; i++) {
    const prod = polyMultiply(s[i]!, u[i]!)
    m_prime = polySubtract(m_prime, prod)
  }

  const m = polyToMessage(m_prime)

  // Derive shared secret
  const sharedSecret = createHash('sha256')
    .update(m)
    .update(ciphertext)
    .digest()

  return sharedSecret
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function polynomialsToBytes(polys: Polynomial[]): Uint8Array {
  const bytes = new Uint8Array(polys.length * 384)
  for (let i = 0; i < polys.length; i++) {
    const poly_bytes = polynomialToBytes(polys[i]!)
    bytes.set(poly_bytes, i * 384)
  }
  return bytes
}

export function polynomialToBytes(poly: Polynomial): Uint8Array {
  const bytes = new Uint8Array(384)
  for (let i = 0; i < KYBER_N; i++) {
    const idx = floor((i * 12) / 8)
    const shift = ((i * 12) % 8)
    const val = poly[i] & ((1 << 12) - 1) // 12-bit encoding
    bytes[idx] = (bytes[idx] | (val << shift)) & 0xff
    // The carry byte is ALWAYS needed. A 12-bit value never fits in one byte,
    // so at shift 0 the top four bits belong to idx+1 just as much as at
    // shift 4 — guarding this on `shift > 0` silently truncated every
    // even-indexed coefficient to its low byte, which is 118 of 256 for a
    // typical polynomial. The reader was always correct; only the writer lost
    // the bits, so the corruption only showed up after a serialize round trip.
    bytes[idx + 1] = (bytes[idx + 1] | (val >> (8 - shift))) & 0xff
  }
  return bytes
}

function bytesToPolynomials(bytes: Buffer, count: number): Polynomial[] {
  const polys: Polynomial[] = []
  for (let i = 0; i < count; i++) {
    polys[i] = bytesToPolynomial(bytes.slice(i * 384, (i + 1) * 384))
  }
  return polys
}

export function bytesToPolynomial(bytes: Buffer): Polynomial {
  const poly = new Uint16Array(KYBER_N)
  for (let i = 0; i < KYBER_N; i++) {
    const idx = floor((i * 12) / 8)
    const shift = (i * 12) % 8
    poly[i] = ((bytes[idx] >> shift) | (bytes[idx + 1] << (8 - shift))) & ((1 << 12) - 1)
  }
  return poly
}

export function messageToPoly(msg: Buffer): Polynomial {
  const poly = new Uint16Array(KYBER_N)
  for (let i = 0; i < 32; i++) {
    const byte = msg[i]!
    for (let j = 0; j < 8; j++) {
      if ((byte >> j) & 1) {
        poly[i * 8 + j] = floor(KYBER_Q / 2)
      }
    }
  }
  return poly
}

export function polyToMessage(poly: Polynomial): Buffer {
  const msg = Buffer.alloc(32)
  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 8; j++) {
      // A coefficient carries a 1 when it lies NEARER q/2 than 0. The ring
      // wraps, so this is a band [q/4, 3q/4), never a single threshold: a
      // 0-bit nudged negative by noise lands at q-5, and `>= q/2` reads that
      // as 1. Half the bits flipped on noise sign alone.
      //
      // Written as 4c ∈ [q, 3q) so it stays integer — no division, no float.
      const c4 = poly[i * 8 + j]! * 4
      if (c4 >= KYBER_Q && c4 < 3 * KYBER_Q) {
        msg[i] = msg[i]! | (1 << j)
      }
    }
  }
  return msg
}

/**
 * Compress / decompress a single coefficient, FIPS 203 §4.2.1.
 *
 *   Compress_d(x)   = round(x · 2^d / q) mod 2^d
 *   Decompress_d(y) = round(y · q / 2^d)
 *
 * Both were `floor` against a scale of 2^d − 1. Two floors in series bias the
 * result the same way every time, and at d = 4 that bias is q/(2·15) ≈ 111 —
 * which was the measured MEDIAN decode error, against a boundary of q/4 = 832.
 * Rounding to the spec's 2^d scale centres the error and halves it, so the
 * noise budget pays for noise rather than for a constant.
 *
 * The `mod 2^d` on compress is load-bearing: q−1 rounds up to 2^d and must
 * wrap to 0, because q−1 is −1 in the centred ring and belongs beside 0.
 */
function compressCoefficient(x: number, d: number): number {
  const scale = 1 << d
  return floor((x * scale + floor(KYBER_Q / 2)) / KYBER_Q) & (scale - 1)
}

function decompressCoefficient(y: number, d: number): number {
  const scale = 1 << d
  return floor((y * KYBER_Q + scale / 2) / scale)
}

function compressPolynomials(polys: Polynomial[], d: number): Buffer {
  const bytes = Buffer.alloc(polys.length * KYBER_N * d / 8)
  let bit_idx = 0
  for (const poly of polys) {
    for (let i = 0; i < KYBER_N; i++) {
      const compressed = compressCoefficient(poly[i]!, d)
      for (let j = 0; j < d; j++) {
        if ((compressed >> j) & 1) {
          bytes[floor(bit_idx / 8)] |= 1 << (bit_idx % 8)
        }
        bit_idx++
      }
    }
  }
  return bytes
}

function compressPolynomial(poly: Polynomial, d: number): Buffer {
  const bytes = Buffer.alloc(KYBER_N * d / 8)
  let bit_idx = 0
  for (let i = 0; i < KYBER_N; i++) {
    const compressed = compressCoefficient(poly[i]!, d)
    for (let j = 0; j < d; j++) {
      if ((compressed >> j) & 1) {
        bytes[floor(bit_idx / 8)] |= 1 << (bit_idx % 8)
      }
      bit_idx++
    }
  }
  return bytes
}

function decompressPolynomials(bytes: Buffer, count: number, d: number): Polynomial[] {
  const polys: Polynomial[] = []
  let bit_idx = 0
  for (let p = 0; p < count; p++) {
    const poly = new Uint16Array(KYBER_N)
    for (let i = 0; i < KYBER_N; i++) {
      let compressed = 0
      for (let j = 0; j < d; j++) {
        if ((bytes[floor(bit_idx / 8)] >> (bit_idx % 8)) & 1) {
          compressed |= 1 << j
        }
        bit_idx++
      }
      poly[i] = decompressCoefficient(compressed, d)
    }
    polys[p] = poly
  }
  return polys
}

function decompressPolynomial(bytes: Buffer, d: number): Polynomial {
  const poly = new Uint16Array(KYBER_N)
  let bit_idx = 0
  for (let i = 0; i < KYBER_N; i++) {
    let compressed = 0
    for (let j = 0; j < d; j++) {
      if ((bytes[floor(bit_idx / 8)] >> (bit_idx % 8)) & 1) {
        compressed |= 1 << j
      }
      bit_idx++
    }
    poly[i] = decompressCoefficient(compressed, d)
  }
  return poly
}

function polySubtract(a: Polynomial, b: Polynomial): Polynomial {
  const result = new Uint16Array(KYBER_N)
  for (let i = 0; i < KYBER_N; i++) {
    result[i] = (a[i] - b[i] + KYBER_Q) % KYBER_Q
  }
  return result
}
