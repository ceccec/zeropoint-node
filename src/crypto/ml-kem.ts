/**
 * ML-KEM-768 — FIPS 203, the real thing.
 *
 * This replaces a module that called itself Kyber and was not: it sampled the
 * matrix A from a centred binomial distribution, so its coefficients lived in
 * {-1,0,1} instead of uniform over Z_q, and the module-LWE instance underneath
 * was not the hard problem. A round trip that agrees proves only that a scheme
 * is self-consistent, never that it is the scheme it claims to be.
 *
 * What makes this one real is not this comment. It is that
 * `ml-kem.test.ts` runs the pq-crystals accumulated known-answer test: 10 000
 * keygen/encaps/decaps triples driven by a deterministic SHAKE-128 stream,
 * hashed to a single digest that must equal the value published by C2SP/CCTV
 * for ML-KEM-768. That digest comes from the reference implementation, so
 * matching it means agreeing with pq-crystals on every byte of 10 000 keys,
 * ciphertexts and shared secrets — including the implicit-rejection path.
 *
 * Nothing here is hardcoded from the spec's tables: the NTT twiddle factors are
 * computed from zeta = 17 and a bit-reversal, and `selfTest()` checks the ring
 * identities they must satisfy.
 *
 * Structure follows FIPS 203 directly. K-PKE is the IND-CPA scheme; ML-KEM
 * wraps it in the Fujisaki-Okamoto transform with implicit rejection.
 *
 * Not constant time. JavaScript cannot promise that — array indexing, JIT
 * deoptimisation and GC all leak timing. Do not use this where an attacker can
 * measure decapsulation.
 */

import { createHash, randomBytes } from 'node:crypto'

// ============================================================================
// PARAMETERS (FIPS 203, Table 2 — ML-KEM-768)
// ============================================================================

const N = 256
const Q = 3329
const K = 3
const ETA1 = 2
const ETA2 = 2
const DU = 10
const DV = 4

export const ML_KEM_768 = {
  encapsulationKeyBytes: 384 * K + 32, // 1184
  decapsulationKeyBytes: 768 * K + 96, // 2400
  ciphertextBytes: 32 * (DU * K + DV), // 1088
  sharedSecretBytes: 32,
} as const

// ============================================================================
// SYMMETRIC PRIMITIVES (FIPS 203 §4.1)
// ============================================================================

/** G: SHA3-512, split into two 32-byte halves. */
function G(input: Buffer): [Buffer, Buffer] {
  const h = createHash('sha3-512').update(input).digest()
  return [h.subarray(0, 32), h.subarray(32, 64)]
}

/** H: SHA3-256. */
function H(input: Buffer): Buffer {
  return createHash('sha3-256').update(input).digest()
}

/** J: SHAKE-256 to 32 bytes — the implicit-rejection secret. */
function J(input: Buffer): Buffer {
  return createHash('shake256', { outputLength: 32 }).update(input).digest()
}

/** PRF_eta: SHAKE-256(s ‖ b) to 64·eta bytes. */
function PRF(eta: number, s: Buffer, b: number): Buffer {
  return createHash('shake256', { outputLength: 64 * eta })
    .update(Buffer.concat([s, Buffer.from([b])]))
    .digest()
}

/**
 * XOF: SHAKE-128(rho ‖ i ‖ j).
 *
 * 840 bytes is drawn up front rather than squeezed incrementally: Node's hash
 * API has no incremental squeeze, and SampleNTT needs more than 575 bytes only
 * with probability 2^-38. `sampleNTT` throws rather than silently truncating if
 * that budget is ever exhausted, so the rare case fails loudly instead of
 * producing a wrong polynomial.
 */
const XOF_BYTES = 840
function XOF(rho: Buffer, i: number, j: number): Buffer {
  return createHash('shake128', { outputLength: XOF_BYTES })
    .update(Buffer.concat([rho, Buffer.from([i, j])]))
    .digest()
}

// ============================================================================
// NTT TWIDDLE FACTORS — computed, not tabulated
// ============================================================================

/** Reverse the low 7 bits of i. */
function bitRev7(i: number): number {
  let r = 0
  for (let b = 0; b < 7; b++) r = (r << 1) | ((i >> b) & 1)
  return r
}

/** zetas[i] = 17^BitRev7(i) mod q — FIPS 203 §4.3. */
const ZETAS: Int16Array = (() => {
  const z = new Int16Array(128)
  for (let i = 0; i < 128; i++) {
    let acc = 1
    const e = bitRev7(i)
    for (let b = 0; b < e; b++) acc = (acc * 17) % Q
    z[i] = acc
  }
  return z
})()

// ============================================================================
// POLYNOMIAL ARITHMETIC (coefficients held reduced in [0, q))
// ============================================================================

export type Poly = Int16Array // 256 coefficients
type PolyVec = Poly[] // K polynomials

function newPoly(): Poly {
  return new Int16Array(N)
}

/** Reduce into [0, q). Inputs stay within +/- a few multiples of q. */
function mod(x: number): number {
  const r = x % Q
  return r < 0 ? r + Q : r
}

function polyAdd(a: Poly, b: Poly): Poly {
  const r = newPoly()
  for (let i = 0; i < N; i++) r[i] = mod(a[i]! + b[i]!)
  return r
}

function polySub(a: Poly, b: Poly): Poly {
  const r = newPoly()
  for (let i = 0; i < N; i++) r[i] = mod(a[i]! - b[i]!)
  return r
}

/** Forward NTT, in place on a copy — Cooley-Tukey, 7 layers. */
export function ntt(f: Poly): Poly {
  const r = Int16Array.from(f)
  let k = 1
  for (let len = 128; len >= 2; len >>= 1) {
    for (let start = 0; start < N; start += 2 * len) {
      const zeta = ZETAS[k++]!
      for (let j = start; j < start + len; j++) {
        const t = mod(zeta * r[j + len]!)
        r[j + len] = mod(r[j]! - t)
        r[j] = mod(r[j]! + t)
      }
    }
  }
  return r
}

/** Inverse NTT — Gentleman-Sande, then scale by 128^-1 mod q. */
export function nttInverse(f: Poly): Poly {
  const r = Int16Array.from(f)
  let k = 127
  for (let len = 2; len <= 128; len <<= 1) {
    for (let start = 0; start < N; start += 2 * len) {
      const zeta = ZETAS[k--]!
      for (let j = start; j < start + len; j++) {
        const t = r[j]!
        r[j] = mod(t + r[j + len]!)
        r[j + len] = mod(zeta * mod(r[j + len]! - t))
      }
    }
  }
  // 128^-1 mod 3329: 128·3303 = 422784 = 127·3329 + 1.
  for (let i = 0; i < N; i++) r[i] = mod(r[i]! * 3303)
  return r
}

/**
 * Multiplication in the NTT domain — FIPS 203 Algorithm 12.
 *
 * The NTT does not fully split Z_q[X]/(X^256+1): it lands in 128 quadratic
 * quotients, so each pair of coefficients multiplies as a degree-1 polynomial
 * modulo X^2 - zeta^(2·BitRev7(i)+1).
 */
export function multiplyNTTs(a: Poly, b: Poly): Poly {
  const r = newPoly()
  for (let i = 0; i < 64; i++) {
    const z = ZETAS[64 + i]!
    // pair 2i
    let a0 = a[4 * i]!, a1 = a[4 * i + 1]!, b0 = b[4 * i]!, b1 = b[4 * i + 1]!
    r[4 * i] = mod(mod(a1 * b1) * z + a0 * b0)
    r[4 * i + 1] = mod(a0 * b1 + a1 * b0)
    // pair 2i+1 uses -zeta
    a0 = a[4 * i + 2]!; a1 = a[4 * i + 3]!; b0 = b[4 * i + 2]!; b1 = b[4 * i + 3]!
    r[4 * i + 2] = mod(-mod(a1 * b1) * z + a0 * b0)
    r[4 * i + 3] = mod(a0 * b1 + a1 * b0)
  }
  return r
}

/** Inner product of two NTT-domain vectors. */
function vecDot(a: PolyVec, b: PolyVec): Poly {
  let acc = newPoly()
  for (let i = 0; i < K; i++) acc = polyAdd(acc, multiplyNTTs(a[i]!, b[i]!))
  return acc
}

// ============================================================================
// SAMPLING (FIPS 203 §4.2.2)
// ============================================================================

/** Algorithm 7 — rejection sampling of a uniform NTT-domain polynomial. */
export function sampleNTT(rho: Buffer, i: number, j: number): Poly {
  const buf = XOF(rho, i, j)
  const a = newPoly()
  let ctr = 0
  let pos = 0
  while (ctr < N) {
    if (pos + 3 > buf.length) {
      throw new Error(`SampleNTT exhausted ${XOF_BYTES} XOF bytes at ${ctr}/256 coefficients`)
    }
    const d1 = (buf[pos]! | (buf[pos + 1]! << 8)) & 0xfff
    const d2 = ((buf[pos + 1]! >> 4) | (buf[pos + 2]! << 4)) & 0xfff
    pos += 3
    if (d1 < Q) a[ctr++] = d1
    if (ctr < N && d2 < Q) a[ctr++] = d2
  }
  return a
}

/** Algorithm 8 — centred binomial distribution with parameter eta. */
export function samplePolyCBD(bytes: Buffer, eta: number): Poly {
  const f = newPoly()
  // Bit i of the stream, little-endian within each byte.
  const bit = (n: number): number => (bytes[n >> 3]! >> (n & 7)) & 1
  for (let i = 0; i < N; i++) {
    let x = 0
    let y = 0
    for (let k = 0; k < eta; k++) {
      x += bit(2 * i * eta + k)
      y += bit(2 * i * eta + eta + k)
    }
    f[i] = mod(x - y)
  }
  return f
}

// ============================================================================
// ENCODING AND COMPRESSION (FIPS 203 §4.2.1)
// ============================================================================

/** Algorithm 5 — pack 256 d-bit integers little-endian. */
export function byteEncode(f: Poly, d: number): Buffer {
  const out = Buffer.alloc(32 * d)
  let bit = 0
  for (let i = 0; i < N; i++) {
    const v = f[i]!
    for (let b = 0; b < d; b++) {
      if ((v >> b) & 1) out[bit >> 3] = out[bit >> 3]! | (1 << (bit & 7))
      bit++
    }
  }
  return out
}

/** Algorithm 6 — inverse of byteEncode. */
export function byteDecode(bytes: Buffer, d: number): Poly {
  const f = newPoly()
  let bit = 0
  for (let i = 0; i < N; i++) {
    let v = 0
    for (let b = 0; b < d; b++) {
      v |= ((bytes[bit >> 3]! >> (bit & 7)) & 1) << b
      bit++
    }
    // d = 12 carries values mod q; the spec reduces on decode.
    f[i] = d === 12 ? v % Q : v
  }
  return f
}

/** Compress_d: round(x·2^d / q) mod 2^d. */
function compress(f: Poly, d: number): Poly {
  const r = newPoly()
  const mask = (1 << d) - 1
  for (let i = 0; i < N; i++) {
    const t = (f[i]! << d) + (Q >> 1)
    r[i] = ((t - (t % Q)) / Q) & mask
  }
  return r
}

/** Decompress_d: round(y·q / 2^d). */
function decompress(f: Poly, d: number): Poly {
  const r = newPoly()
  for (let i = 0; i < N; i++) {
    const t = f[i]! * Q + (1 << (d - 1))
    r[i] = t >> d
  }
  return r
}

// ============================================================================
// K-PKE — the IND-CPA scheme (FIPS 203 §5)
// ============================================================================

function encodeVec(v: PolyVec, d: number): Buffer {
  return Buffer.concat(v.map((p) => byteEncode(p, d)))
}

function decodeVec(b: Buffer, d: number): PolyVec {
  const out: PolyVec = []
  for (let i = 0; i < K; i++) out.push(byteDecode(b.subarray(i * 32 * d, (i + 1) * 32 * d), d))
  return out
}

/**
 * Matrix A-hat. FIPS 203 keygen reads SampleNTT(rho ‖ j ‖ i) and encrypt reads
 * SampleNTT(rho ‖ i ‖ j) — the transpose, expressed by swapping the two index
 * bytes rather than by transposing the matrix afterwards.
 */
function sampleMatrix(rho: Buffer, transposed: boolean): PolyVec[] {
  const A: PolyVec[] = []
  for (let i = 0; i < K; i++) {
    const row: PolyVec = []
    for (let j = 0; j < K; j++) {
      row.push(transposed ? sampleNTT(rho, i, j) : sampleNTT(rho, j, i))
    }
    A.push(row)
  }
  return A
}

/** Algorithm 13 — K-PKE.KeyGen, from the expanded seeds. */
function pkeKeyGen(rho: Buffer, sigma: Buffer): { ekPKE: Buffer; dkPKE: Buffer } {
  const A = sampleMatrix(rho, false)

  let nonce = 0
  const s: PolyVec = []
  for (let i = 0; i < K; i++) s.push(samplePolyCBD(PRF(ETA1, sigma, nonce++), ETA1))
  const e: PolyVec = []
  for (let i = 0; i < K; i++) e.push(samplePolyCBD(PRF(ETA1, sigma, nonce++), ETA1))

  const sHat = s.map(ntt)
  const eHat = e.map(ntt)

  const tHat: PolyVec = []
  for (let i = 0; i < K; i++) tHat.push(polyAdd(vecDot(A[i]!, sHat), eHat[i]!))

  return {
    ekPKE: Buffer.concat([encodeVec(tHat, 12), rho]),
    dkPKE: encodeVec(sHat, 12),
  }
}

/** Algorithm 14 — K-PKE.Encrypt. */
function pkeEncrypt(ekPKE: Buffer, m: Buffer, coins: Buffer): Buffer {
  const tHat = decodeVec(ekPKE.subarray(0, 384 * K), 12)
  const rho = ekPKE.subarray(384 * K, 384 * K + 32)
  const A = sampleMatrix(rho, true)

  let nonce = 0
  const r: PolyVec = []
  for (let i = 0; i < K; i++) r.push(samplePolyCBD(PRF(ETA1, coins, nonce++), ETA1))
  const e1: PolyVec = []
  for (let i = 0; i < K; i++) e1.push(samplePolyCBD(PRF(ETA2, coins, nonce++), ETA2))
  const e2 = samplePolyCBD(PRF(ETA2, coins, nonce++), ETA2)

  const rHat = r.map(ntt)

  const u: PolyVec = []
  for (let i = 0; i < K; i++) u.push(polyAdd(nttInverse(vecDot(A[i]!, rHat)), e1[i]!))

  const mu = decompress(byteDecode(m, 1), 1)
  const v = polyAdd(polyAdd(nttInverse(vecDot(tHat, rHat)), e2), mu)

  const c1 = Buffer.concat(u.map((p) => byteEncode(compress(p, DU), DU)))
  const c2 = byteEncode(compress(v, DV), DV)
  return Buffer.concat([c1, c2])
}

/** Algorithm 15 — K-PKE.Decrypt. */
function pkeDecrypt(dkPKE: Buffer, c: Buffer): Buffer {
  const c1 = c.subarray(0, 32 * DU * K)
  const c2 = c.subarray(32 * DU * K)

  const u: PolyVec = []
  for (let i = 0; i < K; i++) {
    u.push(decompress(byteDecode(c1.subarray(i * 32 * DU, (i + 1) * 32 * DU), DU), DU))
  }
  const v = decompress(byteDecode(c2, DV), DV)
  const sHat = decodeVec(dkPKE, 12)

  const w = polySub(v, nttInverse(vecDot(sHat, u.map(ntt))))
  return byteEncode(compress(w, 1), 1)
}

// ============================================================================
// ML-KEM — the IND-CCA2 KEM (FIPS 203 §6)
// ============================================================================

export interface KeyPair {
  readonly encapsulationKey: Buffer
  readonly decapsulationKey: Buffer
}

export interface Encapsulation {
  readonly ciphertext: Buffer
  readonly sharedSecret: Buffer
}

/**
 * Key generation from already-expanded seeds.
 *
 * Split out because the ONLY difference between FIPS 203 final and the initial
 * public draft is how (rho, sigma) come from d — final binds the parameter set
 * in, ipd did not. Everything below this line is identical in both, which is
 * what lets `scripts/ml-kem-accumulated-kat.mjs` drive the 10 000-case
 * pq-crystals reference KAT (published for ipd) against this exact code without
 * an ipd branch existing in the production path.
 */
export function keyGenFromSeeds(rho: Buffer, sigma: Buffer, z: Buffer): KeyPair {
  const { ekPKE, dkPKE } = pkeKeyGen(rho, sigma)
  return {
    encapsulationKey: ekPKE,
    decapsulationKey: Buffer.concat([dkPKE, ekPKE, H(ekPKE), z]),
  }
}

/** Algorithm 16 — ML-KEM.KeyGen_internal, deterministic in (d, z). */
export function keyGenDerand(d: Buffer, z: Buffer): KeyPair {
  const [rho, sigma] = G(Buffer.concat([d, Buffer.from([K])]))
  return keyGenFromSeeds(rho, sigma, z)
}

/** SHA3-512 seed expansion, exposed so the reference KAT can supply its own. */
export function expandSeed(d: Buffer): [Buffer, Buffer] {
  return G(d)
}

/** Algorithm 17 — ML-KEM.Encaps_internal, deterministic in m. */
export function encapsDerand(ek: Buffer, m: Buffer): Encapsulation {
  if (ek.length !== ML_KEM_768.encapsulationKeyBytes) {
    throw new Error(`encapsulation key must be ${ML_KEM_768.encapsulationKeyBytes} bytes, got ${ek.length}`)
  }
  // Modulus check (FIPS 203 §7.2): the encoded coefficients must be reduced,
  // i.e. re-encoding what we decoded must reproduce the input byte for byte.
  const tHat = decodeVec(ek.subarray(0, 384 * K), 12)
  if (!encodeVec(tHat, 12).equals(ek.subarray(0, 384 * K))) {
    throw new Error('encapsulation key failed the modulus check')
  }

  const [sharedSecret, coins] = G(Buffer.concat([m, H(ek)]))
  return { ciphertext: pkeEncrypt(ek, m, coins), sharedSecret }
}

/** Algorithm 18 — ML-KEM.Decaps_internal, with implicit rejection. */
export function decaps(dk: Buffer, c: Buffer): Buffer {
  if (dk.length !== ML_KEM_768.decapsulationKeyBytes) {
    throw new Error(`decapsulation key must be ${ML_KEM_768.decapsulationKeyBytes} bytes, got ${dk.length}`)
  }
  if (c.length !== ML_KEM_768.ciphertextBytes) {
    throw new Error(`ciphertext must be ${ML_KEM_768.ciphertextBytes} bytes, got ${c.length}`)
  }

  const dkPKE = dk.subarray(0, 384 * K)
  const ek = dk.subarray(384 * K, 768 * K + 32)
  const h = dk.subarray(768 * K + 32, 768 * K + 64)
  const z = dk.subarray(768 * K + 64, 768 * K + 96)

  const mPrime = pkeDecrypt(dkPKE, c)
  const [kPrime, coins] = G(Buffer.concat([mPrime, h]))
  const kBar = J(Buffer.concat([z, c]))
  const cPrime = pkeEncrypt(ek, mPrime, coins)

  // Full-length comparison. A length-terminated compare (strcmp) would accept
  // some wrong ciphertexts once a zero byte appears — CCTV ships vectors for it.
  return cPrime.equals(c) ? kPrime : kBar
}

/** ML-KEM.KeyGen — draws its own randomness. */
export function keyGen(): KeyPair {
  return keyGenDerand(randomBytes(32), randomBytes(32))
}

/** ML-KEM.Encaps — draws its own randomness. */
export function encaps(ek: Buffer): Encapsulation {
  return encapsDerand(ek, randomBytes(32))
}

// ============================================================================
// SELF-CHECK — ring identities the twiddle factors must satisfy
// ============================================================================

/** Structural facts that hold for any correct NTT. Returns failures. */
export function selfTest(): string[] {
  const fail: string[] = []

  // zeta = 17 has order 256 in Z_q^*, so zeta^128 = -1.
  let z128 = 1
  for (let i = 0; i < 128; i++) z128 = (z128 * 17) % Q
  if (z128 !== Q - 1) fail.push(`17^128 = ${z128}, expected ${Q - 1}`)

  // NTT is invertible.
  const f = newPoly()
  for (let i = 0; i < N; i++) f[i] = (i * 7 + 3) % Q
  const back = nttInverse(ntt(f))
  for (let i = 0; i < N; i++) {
    if (back[i] !== f[i]) { fail.push(`NTT round trip differs at ${i}: ${f[i]} -> ${back[i]}`); break }
  }

  // NTT is a ring homomorphism: it carries negacyclic convolution to pointwise
  // multiplication. Checked against a schoolbook product in X^256 + 1.
  const a = newPoly()
  const b = newPoly()
  for (let i = 0; i < N; i++) { a[i] = (i * 13 + 5) % Q; b[i] = (i * 29 + 11) % Q }
  const school = newPoly()
  for (let i = 0; i < N; i++) {
    let acc = 0
    for (let j = 0; j <= i; j++) acc = (acc + a[j]! * b[i - j]!) % Q
    for (let j = i + 1; j < N; j++) acc = (acc - a[j]! * b[N + i - j]!) % Q
    school[i] = mod(acc)
  }
  const viaNTT = nttInverse(multiplyNTTs(ntt(a), ntt(b)))
  for (let i = 0; i < N; i++) {
    if (viaNTT[i] !== school[i]) {
      fail.push(`NTT product differs from schoolbook at ${i}: ${viaNTT[i]} vs ${school[i]}`)
      break
    }
  }

  // Compress/Decompress must stay inside the spec's error bound q/2^(d+1).
  for (const d of [DU, DV, 1]) {
    let worst = 0
    const p = newPoly()
    for (let i = 0; i < N; i++) p[i] = (i * 13) % Q
    const back2 = decompress(compress(p, d), d)
    for (let i = 0; i < N; i++) {
      let e = back2[i]! - p[i]!
      if (e > Q / 2) e -= Q
      if (e < -Q / 2) e += Q
      const ae = e < 0 ? -e : e
      if (ae > worst) worst = ae
    }
    const bound = Q / (1 << (d + 1)) + 1
    if (worst > bound) fail.push(`compress d=${d} error ${worst} exceeds bound ${bound}`)
  }

  return fail
}
