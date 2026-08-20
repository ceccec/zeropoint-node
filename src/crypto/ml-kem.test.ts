/**
 * ML-KEM-768 conformance suite.
 *
 * The previous module in this directory passed a round trip and was still not
 * Kyber, so a round trip is the weakest check here, not the headline. What
 * decides conformance is `ml-kem-768-acvp.json`: NIST's own ACVP vectors for
 * FIPS 203, ML-KEM-768 group, covering key generation, encapsulation,
 * decapsulation including the implicit-rejection path, and encapsulation-key
 * validation. Matching them means agreeing with NIST byte for byte.
 *
 * `npm run kat:ml-kem` goes further — 10 000 reference cases from pq-crystals.
 * It is not in the gate because it takes ~33s; this file takes well under one.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import {
  ML_KEM_768,
  keyGen,
  keyGenDerand,
  encaps,
  encapsDerand,
  decaps,
  selfTest,
} from './ml-kem.ts'

const here = dirname(fileURLToPath(import.meta.url))
const vectors = JSON.parse(readFileSync(resolve(here, 'ml-kem-768-acvp.json'), 'utf8'))

let failures = 0
function check(name: string, ok: boolean, detail = ''): void {
  if (ok) {
    console.log('  ✓ ' + name)
  } else {
    failures++
    console.log('  ✗ ' + name + (detail ? ' — ' + detail : ''))
  }
}

console.log('ML-KEM-768 (FIPS 203)\n')

// ---------------------------------------------------------------- structure
console.log('Structural identities (no vectors involved)')
const structural = selfTest()
check('NTT invertible, ring-homomorphic, compression within bound', structural.length === 0, structural.join('; '))

// ------------------------------------------------------------------- sizes
console.log('\nParameter sizes')
check('encapsulation key 1184 bytes', ML_KEM_768.encapsulationKeyBytes === 1184)
check('decapsulation key 2400 bytes', ML_KEM_768.decapsulationKeyBytes === 2400)
check('ciphertext 1088 bytes', ML_KEM_768.ciphertextBytes === 1088)

// ------------------------------------------------------- ACVP: key generation
console.log('\nNIST ACVP — key generation (' + vectors.keyGen.length + ' vectors)')
let bad = 0
for (const t of vectors.keyGen) {
  const kp = keyGenDerand(Buffer.from(t.d, 'hex'), Buffer.from(t.z, 'hex'))
  if (
    kp.encapsulationKey.toString('hex') !== t.ek.toLowerCase() ||
    kp.decapsulationKey.toString('hex') !== t.dk.toLowerCase()
  ) bad++
}
check('every (d, z) reproduces NIST ek and dk', bad === 0, bad + ' mismatched')

// -------------------------------------------------------- ACVP: encapsulation
console.log('\nNIST ACVP — encapsulation (' + vectors.encapsulation.length + ' vectors)')
bad = 0
for (const t of vectors.encapsulation) {
  const r = encapsDerand(Buffer.from(t.ek, 'hex'), Buffer.from(t.m, 'hex'))
  if (r.ciphertext.toString('hex') !== t.c.toLowerCase() || r.sharedSecret.toString('hex') !== t.k.toLowerCase()) bad++
}
check('every (ek, m) reproduces NIST ciphertext and shared secret', bad === 0, bad + ' mismatched')

// -------------------------------------------------------- ACVP: decapsulation
console.log('\nNIST ACVP — decapsulation (' + vectors.decapsulation.length + ' vectors)')
const byReason = new Map<string, { pass: number; total: number }>()
for (const t of vectors.decapsulation) {
  const got = decaps(Buffer.from(t.dk, 'hex'), Buffer.from(t.c, 'hex')).toString('hex')
  const slot = byReason.get(t.reason) ?? { pass: 0, total: 0 }
  slot.total++
  if (got === t.k.toLowerCase()) slot.pass++
  byReason.set(t.reason, slot)
}
for (const [reason, s] of byReason) {
  check(`${reason} (${s.total})`, s.pass === s.total, `${s.total - s.pass} mismatched`)
}

// ------------------------------------------------ ACVP: encapsulation-key check
console.log('\nNIST ACVP — encapsulation key validation (' + vectors.encapsulationKeyCheck.length + ' vectors)')
bad = 0
for (const t of vectors.encapsulationKeyCheck) {
  let accepted = true
  try {
    encapsDerand(Buffer.from(t.ek, 'hex'), Buffer.alloc(32))
  } catch {
    accepted = false
  }
  if (accepted !== t.testPassed) bad++
}
check('accepts valid keys, rejects unreduced coefficients', bad === 0, bad + ' misjudged')

// ------------------------------------------------------------ behavioural
console.log('\nBehaviour')
const kp = keyGen()
const e = encaps(kp.encapsulationKey)
check('shared secret is 32 bytes', e.sharedSecret.length === 32)
check('round trip recovers the shared secret', decaps(kp.decapsulationKey, e.ciphertext).equals(e.sharedSecret))

const other = keyGen()
check(
  'an unrelated decapsulation key yields a different secret',
  !decaps(other.decapsulationKey, e.ciphertext).equals(e.sharedSecret)
)

// Implicit rejection: a corrupted ciphertext must yield a key, not an error,
// and that key must be wrong. Returning an error would leak plaintext validity.
const corrupt = Buffer.from(e.ciphertext)
corrupt[0] = corrupt[0]! ^ 1
const rejected = decaps(kp.decapsulationKey, corrupt)
check('corrupted ciphertext still returns 32 bytes (implicit rejection)', rejected.length === 32)
check('and that value differs from the true secret', !rejected.equals(e.sharedSecret))
check(
  'implicit rejection is deterministic for a given (dk, c)',
  decaps(kp.decapsulationKey, corrupt).equals(rejected)
)

let threw = false
try { decaps(kp.decapsulationKey, Buffer.alloc(10)) } catch { threw = true }
check('wrong-length ciphertext is rejected', threw)
threw = false
try { encapsDerand(Buffer.alloc(10), Buffer.alloc(32)) } catch { threw = true }
check('wrong-length encapsulation key is rejected', threw)

console.log('')
if (failures > 0) {
  console.error(`❌ ML-KEM-768: ${failures} check(s) failed`)
  process.exit(1)
}
console.log('✅ ML-KEM-768 conformant to FIPS 203 against NIST ACVP vectors')
