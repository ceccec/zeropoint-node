/**
 * Kyber-768 shaped KEM: round-trip and structural tests.
 * This does NOT test FIPS 203 conformance — see the gaps listed in
 * kyber-real.ts. It tests that what is implemented is self-consistent.
 *
 * Two of these pin defects that shipped silently: 12-bit serialization dropped
 * the carry byte for every even coefficient, and message decode used a single
 * threshold where the ring requires a centred band. Both survived a passing
 * suite because nothing exercised them directly.
 */

import {
  generateKeyPair,
  encapsulate,
  decapsulate,
  polynomialToBytes,
  bytesToPolynomial,
  messageToPoly,
  polyToMessage,
  type Polynomial,
} from './kyber-real.ts'
import { randomBytes } from 'node:crypto'
import { floor } from '../0/algebra.ts'

const KYBER_Q = 3329
const KYBER_N = 256

function testSerializationRoundTrip(): void {
  console.log('Test: 12-bit coefficient serialization round trip...')

  // Every coefficient must survive at every position. The carry bug hit only
  // EVEN indices and only values above 255, so a sparse probe walked past it.
  const poly = new Uint16Array(KYBER_N) as Polynomial
  for (let i = 0; i < KYBER_N; i++) poly[i] = (i * 13 + 1000) % KYBER_Q
  const back = bytesToPolynomial(Buffer.from(polynomialToBytes(poly)))
  for (let i = 0; i < KYBER_N; i++) {
    if (poly[i] !== back[i]) {
      throw new Error('coefficient ' + i + ' corrupted: wrote ' + poly[i] + ', read ' + back[i])
    }
  }

  // And the extremes, which is where twelve bits actually matters.
  const edge = new Uint16Array(KYBER_N) as Polynomial
  for (let i = 0; i < KYBER_N; i++) edge[i] = i % 2 === 0 ? KYBER_Q - 1 : 0
  const edgeBack = bytesToPolynomial(Buffer.from(polynomialToBytes(edge)))
  for (let i = 0; i < KYBER_N; i++) {
    if (edge[i] !== edgeBack[i]) {
      throw new Error('edge coefficient ' + i + ' corrupted: wrote ' + edge[i] + ', read ' + edgeBack[i])
    }
  }

  console.log('  ✓ 256 coefficients exact, both parities, including q-1')
}

function testMessageDecodeBand(): void {
  console.log('Test: message decode survives noise of either sign...')

  const msg = randomBytes(32)
  if (!polyToMessage(messageToPoly(msg)).equals(msg)) {
    throw new Error('message does not survive a noiseless round trip')
  }

  // The decode boundary sits q/4 from each ideal point, so anything strictly
  // inside must decode correctly — including NEGATIVE noise on a 0 bit, which
  // wraps to just under q. That wrap is what a single mid-point threshold
  // misreads as a 1.
  const limit = floor(KYBER_Q / 4) - 1
  for (const noise of [-limit, -100, -1, 0, 1, 100, limit]) {
    const poly = messageToPoly(msg)
    for (let i = 0; i < KYBER_N; i++) {
      poly[i] = (((poly[i]! + noise) % KYBER_Q) + KYBER_Q) % KYBER_Q
    }
    if (!polyToMessage(poly).equals(msg)) {
      throw new Error('decode failed at noise offset ' + noise)
    }
  }

  console.log('  ✓ recovered at every offset in ±' + limit + ' (boundary is q/4)')
}

function testKeyGeneration(): void {
  console.log('Test: Kyber-768 key pair generation...')

  const { publicKey, secretKey } = generateKeyPair()

  if (publicKey.length !== 1184) {
    throw new Error('Public key size mismatch: expected 1184, got ' + publicKey.length)
  }
  if (secretKey.length !== 2400) {
    throw new Error('Secret key size mismatch: expected 2400, got ' + secretKey.length)
  }

  console.log('  ✓ Public key: ' + publicKey.length + ' bytes')
  console.log('  ✓ Secret key: ' + secretKey.length + ' bytes')
}

function testEncapsulationDecapsulation(): void {
  console.log('Test: Kyber-768 encapsulation & decapsulation...')

  const { publicKey, secretKey } = generateKeyPair()
  const { ciphertext, sharedSecret: ss1 } = encapsulate(publicKey)
  const ss2 = decapsulate(secretKey, ciphertext)

  if (ciphertext.length !== 1088) {
    throw new Error('Ciphertext size mismatch: expected 1088, got ' + ciphertext.length)
  }
  if (ss1.length !== 32) throw new Error('Shared secret size mismatch: got ' + ss1.length)
  if (ss2.length !== 32) throw new Error('Decapsulated secret size mismatch: got ' + ss2.length)

  if (!ss1.equals(ss2)) {
    console.log('  ✗ Encapsulated SS: ' + ss1.toString('hex').slice(0, 32) + '...')
    console.log('  ✗ Decapsulated SS: ' + ss2.toString('hex').slice(0, 32) + '...')
    throw new Error('Encapsulation/decapsulation mismatch: shared secrets do not match')
  }

  console.log('  ✓ Ciphertext: ' + ciphertext.length + ' bytes')
  console.log('  ✓ Shared secrets match: ' + ss1.toString('hex').slice(0, 16) + '...')
}

function testMultipleRounds(): void {
  console.log('Test: Multiple encapsulation/decapsulation rounds...')

  const { publicKey, secretKey } = generateKeyPair()
  const secrets: Buffer[] = []

  // Decode failure is probabilistic, so a handful of rounds proves little.
  // 25 keeps the gate under a third of a second while actually sampling noise.
  for (let i = 0; i < 25; i++) {
    const { ciphertext, sharedSecret } = encapsulate(publicKey)
    const recovered = decapsulate(secretKey, ciphertext)

    if (!sharedSecret.equals(recovered)) {
      throw new Error('Round ' + (i + 1) + ': shared secrets do not match')
    }

    secrets.push(sharedSecret)
  }

  const ciphertexts = new Set<string>()
  for (let i = 0; i < 5; i++) {
    ciphertexts.add(encapsulate(publicKey).ciphertext.toString('hex'))
  }
  if (ciphertexts.size < 5) {
    throw new Error('encapsulation is not randomised: ' + ciphertexts.size + '/5 unique')
  }

  console.log('  ✓ Randomness: ' + ciphertexts.size + '/5 unique ciphertexts')
  console.log('  ✓ ' + secrets.length + ' rounds: all shared secrets recovered')
}

function testWrongKeyDoesNotRecover(): void {
  console.log('Test: an unrelated secret key does not recover the secret...')

  const alice = generateKeyPair()
  const mallory = generateKeyPair()
  const { ciphertext, sharedSecret } = encapsulate(alice.publicKey)

  if (decapsulate(mallory.secretKey, ciphertext).equals(sharedSecret)) {
    throw new Error('an unrelated secret key recovered the shared secret')
  }

  console.log('  ✓ unrelated key yields a different secret')
}

function testErrorHandling(): void {
  console.log('Test: Error handling...')

  let caught = false
  try {
    encapsulate(Buffer.alloc(100))
  } catch {
    caught = true
  }
  if (!caught) throw new Error('Should reject invalid public key size')

  console.log('  ✓ Invalid public key size rejected')
}

function runTests(): void {
  console.log('🔐 Kyber-768 KEM round-trip tests\n')

  try {
    testSerializationRoundTrip()
    testMessageDecodeBand()
    testKeyGeneration()
    testEncapsulationDecapsulation()
    testMultipleRounds()
    testWrongKeyDoesNotRecover()
    testErrorHandling()

    console.log('\n✅ Round trip and structure verified — NOT FIPS 203 conformant')
  } catch (error) {
    console.error('\n❌ Test failed: ' + (error instanceof Error ? error.message : String(error)))
    process.exit(1)
  }
}

runTests()
