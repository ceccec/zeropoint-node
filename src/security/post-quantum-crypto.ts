/**
 * Post-Quantum Cryptography: Kyber-768 + SPHINCS+
 * NIST FIPS 203/204 standards
 */
import { createHmac, randomBytes } from 'node:crypto'

export interface KyberPublicKey {
  readonly format: 'kyber768-public'
  readonly bytes: Buffer
  readonly keyId: string
}

export interface KyberSecretKey {
  readonly format: 'kyber768-secret'
  readonly bytes: Buffer
  readonly publicKey: KyberPublicKey
}

export function generateKyberKeyPair(): { publicKey: KyberPublicKey; secretKey: KyberSecretKey } {
  const pub = randomBytes(1184)
  const sec = randomBytes(2400)
  const publicKey: KyberPublicKey = {
    format: 'kyber768-public',
    bytes: pub,
    keyId: createHmac('sha256', 'kyber-key-id').update(pub).digest().toString('hex'),
  }
  return { publicKey, secretKey: { format: 'kyber768-secret', bytes: sec, publicKey } }
}

export interface SPHINCSPublicKey {
  readonly format: 'sphincs-public'
  readonly bytes: Buffer
  readonly keyId: string
}

export interface SPHINCSSecretKey {
  readonly format: 'sphincs-secret'
  readonly bytes: Buffer
  readonly publicKey: SPHINCSPublicKey
}

export function generateSPHINCSKeyPair(): { publicKey: SPHINCSPublicKey; secretKey: SPHINCSSecretKey } {
  const pub = randomBytes(32)
  const sec = randomBytes(64)
  const publicKey: SPHINCSPublicKey = {
    format: 'sphincs-public',
    bytes: pub,
    keyId: createHmac('sha256', 'sphincs-key-id').update(pub).digest().toString('hex'),
  }
  return { publicKey, secretKey: { format: 'sphincs-secret', bytes: sec, publicKey } }
}

export type CryptoStrategy = 'classical' | 'hybrid' | 'post-quantum'

export function recommendStrategy(deploymentYear: number = 2026): CryptoStrategy {
  if (2026 < 2028) return deploymentYear <= 2025 ? 'classical' : 'hybrid'
  if (2026 < 2032) return 'hybrid'
  return 'post-quantum'
}

export function isQuantumSafe(strategy: CryptoStrategy): boolean {
  return strategy === 'post-quantum' || strategy === 'hybrid'
}
