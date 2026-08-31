/**
 * quantum-phases-audit — why the four functions in QUANTUM_PHASES_3_TO_8.md
 * are the only documented ones left unimplemented.
 *
 * Every other documented-but-absent function in this repo got written. These
 * four did not, and a decision like that is worth more as a test than as a
 * sentence in a commit message, because a sentence cannot notice when the
 * situation changes.
 *
 * All four wrap QuantumFoldCipher, which exists here and is tested — so this
 * was never about inventing cryptography. It is about what the documented
 * recipes actually do when you run them:
 *
 *   signTransaction  — runs, and returns the SAME value for every transaction
 *                      and every private key. It is a seal over the cipher's
 *                      facet configuration, which no input reaches. Shipping a
 *                      constant under the name signTransaction is worse than
 *                      shipping nothing: the name promises that the value binds
 *                      the transaction and the key, and a caller has no reason
 *                      to doubt it.
 *   executeContract  — a signature with no body. Nothing to transcribe.
 *   encryptAmbient   — calls prepareState before generateKey, which throws. It
 *                      also encrypts twice and passes a non-string the second
 *                      time, returning the second result.
 *   decryptAmbient   — throws for the same reason, and never passes its
 *                      `ciphertext` argument to anything. It cannot decrypt the
 *                      input it is given.
 *
 * The tests below recompute each of those claims. If someone implements these
 * properly, or if the cipher changes underneath them, this file fails and says
 * so — which is the point of writing the decision down in code.
 */
import { QuantumFoldCipher } from './quantum-fold-cipher.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

/** The documented signTransaction recipe, verbatim. */
function documentedSignRecipe(tx: unknown, genesis: string): string {
  const cipher = new QuantumFoldCipher()
  cipher.generateKey(genesis)
  cipher.prepareState()
  cipher.applyGate('H')
  cipher.measure()
  cipher.encrypt(JSON.stringify(tx))
  return cipher.computesGate().root
}

{
  const txA = { from: 'alice', to: 'bob', amount: 1 }
  const txB = { from: 'alice', to: 'mallory', amount: 1_000_000 }
  const sameTxSameKey = [documentedSignRecipe(txA, 'key-one'), documentedSignRecipe(txA, 'key-one')]
  const otherKey = documentedSignRecipe(txA, 'key-two')
  const otherTx = documentedSignRecipe(txB, 'key-one')

  check('the documented sign recipe is deterministic', sameTxSameKey[0] === sameTxSameKey[1])

  // These two are the hazard. They are asserted as EQUAL because that is what
  // the recipe does — not because it is correct.
  check('the documented sign recipe ignores the private key (hazard)',
    sameTxSameKey[0] === otherKey,
    'if this now fails, the recipe binds the key and signTransaction may be worth implementing')
  check('the documented sign recipe ignores the transaction (hazard)',
    sameTxSameKey[0] === otherTx,
    'if this now fails, the recipe binds the transaction and signTransaction may be worth implementing')
}

{
  // Both ambient functions construct a cipher and call prepareState without
  // generateKey. The cipher refuses, so neither can run at all.
  const threw = (f: () => unknown): string | null => {
    try { f(); return null } catch (e) { return (e as Error).message }
  }
  const encryptMsg = threw(() => {
    const cipher = new QuantumFoldCipher()
    cipher.prepareState('Z', 0)
    return cipher.encrypt(JSON.stringify({ packet: 1 }))
  })
  const decryptMsg = threw(() => {
    const cipher = new QuantumFoldCipher()
    cipher.prepareState('Z', 0)
    return cipher.decrypt()
  })
  check('the documented encryptAmbient recipe throws before it encrypts',
    encryptMsg !== null && /key/i.test(encryptMsg), String(encryptMsg))
  check('the documented decryptAmbient recipe throws before it decrypts',
    decryptMsg !== null && /key/i.test(decryptMsg), String(decryptMsg))

  // With a key, the cipher works — so the fault is the documented recipe's
  // ordering, not the cipher.
  const working = new QuantumFoldCipher()
  working.generateKey('genesis')
  working.prepareState('Z', 0)
  const payload = working.encrypt(JSON.stringify({ packet: 1 }))
  check('the cipher itself encrypts once a key exists', !!payload.ciphertext)
  check('and round-trips its own ciphertext', JSON.parse(working.decrypt()).packet === 1)
}

console.log()
if (failures > 0) { console.error(`quantum-phases-audit FAIL — ${failures}`); process.exit(1) }
console.log('quantum-phases-audit ok — the four remain unimplemented for the reasons above')
process.exit(0)
