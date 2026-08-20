#!/usr/bin/env node
/**
 * ML-KEM-768 against the pq-crystals accumulated reference vectors.
 *
 * The gate runs NIST's ACVP vectors — 70 cases, authoritative for FIPS 203.
 * This goes wider: 10 000 keygen/encaps/decaps triples generated from a
 * deterministic SHAKE-128 stream, with every encapsulation key, decapsulation
 * key, ciphertext and shared secret folded into one running digest. The
 * expected value is published by C2SP/CCTV and comes from the pq-crystals
 * reference implementation, so a match means agreeing with the reference on
 * roughly 30 MB of output — including edge cases too rare to hand-pick.
 *
 * It is not in `npm run check` because it takes ~33s against a gate that runs
 * in ~2 min. Run it when the arithmetic changes.
 *
 *   npm run kat:ml-kem            10 000 cases  (~33s)
 *   npm run kat:ml-kem -- 1000    a faster slice
 *
 * ONE DELIBERATE WRINKLE. The published digests predate FIPS 203 final and use
 * the draft's seed expansion, (rho, sigma) = G(d), where final binds the
 * parameter set in as G(d ‖ k). That single line is the ONLY difference between
 * the two, and it is verified separately by the ACVP keygen vectors. So this
 * script expands the seed the draft's way and calls `keyGenFromSeeds`, which is
 * the same code the production path runs one line later. No draft branch exists
 * inside the module.
 *
 * Source: https://github.com/C2SP/CCTV/tree/main/ML-KEM  (CC0 1.0)
 */

import { createHash } from 'node:crypto'
import { keyGenFromSeeds, encapsDerand, decaps, expandSeed } from '../src/crypto/ml-kem.ts'

// Published by C2SP/CCTV for ML-KEM-768.
const EXPECTED = {
  10000: 'f7db260e1137a742e05fe0db9525012812b004d29040a5b606aad3d134b548d3',
  1000000: '70090cc5842aad0ec43d5042c783fae9bc320c047b5dafcb6e134821db02384d',
}
const RNG_PREFIX = '7f9c2ba4e88f827d616045507605853e'
const DRAW = 32 + 32 + 32 + 1088 // d, z, m, and a random ciphertext

const count = Number(process.argv[2] ?? 10000)
if (!Number.isInteger(count) || count < 1) {
  console.error('usage: ml-kem-accumulated-kat.mjs [count]')
  process.exit(1)
}

// The reference RNG is a single SHAKE-128 instance over an empty input.
const rng = createHash('shake128', { outputLength: count * DRAW }).update('').digest()
const prefix = rng.subarray(0, 16).toString('hex')
if (prefix !== RNG_PREFIX) {
  console.error(`RNG stream starts ${prefix}, expected ${RNG_PREFIX} — SHAKE-128 is wrong`)
  process.exit(1)
}

const acc = createHash('shake128', { outputLength: 32 })
let off = 0
let mismatched = 0
const started = process.hrtime.bigint()

for (let i = 0; i < count; i++) {
  const d = rng.subarray(off, off + 32); off += 32
  const z = rng.subarray(off, off + 32); off += 32
  const m = rng.subarray(off, off + 32); off += 32
  const badCiphertext = rng.subarray(off, off + 1088); off += 1088

  const [rho, sigma] = expandSeed(d)
  const { encapsulationKey, decapsulationKey } = keyGenFromSeeds(rho, sigma, z)
  const { ciphertext, sharedSecret } = encapsDerand(encapsulationKey, m)
  if (!decaps(decapsulationKey, ciphertext).equals(sharedSecret)) mismatched++

  acc.update(encapsulationKey)
  acc.update(decapsulationKey)
  acc.update(ciphertext)
  acc.update(sharedSecret)
  acc.update(decaps(decapsulationKey, badCiphertext)) // implicit-rejection path
}

const seconds = Number(process.hrtime.bigint() - started) / 1e9
const digest = acc.digest('hex')
const expected = EXPECTED[count]

console.log(`ml-kem accumulated KAT — ${count} cases in ${seconds.toFixed(1)}s`)
console.log(`  round trips recovered: ${count - mismatched}/${count}`)
console.log(`  digest   ${digest}`)

if (mismatched > 0) {
  console.error(`FAIL — ${mismatched} round trip(s) did not recover the shared secret`)
  process.exit(1)
}
if (expected === undefined) {
  console.log(`  no published digest for ${count} cases — round trips checked, digest not compared`)
  console.log(`  (published counts: ${Object.keys(EXPECTED).join(', ')})`)
  process.exit(0)
}
if (digest !== expected) {
  console.error(`  expected ${expected}`)
  console.error('FAIL — digest differs from the pq-crystals reference')
  process.exit(1)
}
console.log(`  expected ${expected}`)
console.log(`ml-kem accumulated KAT ok — agrees with pq-crystals across ${count} cases`)
