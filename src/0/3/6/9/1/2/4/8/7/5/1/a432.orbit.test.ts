/**
 * Every address on the orbit loads its own sequence, and the loader can say no.
 *
 * This is the law the whole family exists for: a name here is a handle, so
 * `a432.1.2.4` is not a module named after 1-2-4, it IS that sequence and
 * asking it returns it. A module sitting at the right address holding the wrong
 * sequence is a broken handle that nothing else would notice.
 */
import { ORBIT_ADDRESSES, ORBIT_HANDLES, loadOrbitAddress } from './a432.orbit.ts'
import { createChecker } from '../../../../../../../../../../../verification/harness.ts'
import { VORTEX_ORBIT } from '../../../../../../../../../../../kernel/index.ts'
import { legacyDigitalRoot } from './a432.roots.ts'

const checker = createChecker('a432.orbit')

checker.check('the orbit has addresses at all', ORBIT_ADDRESSES.length > 0, true)
checker.check('every address has a handle', ORBIT_ADDRESSES.every((a) => typeof ORBIT_HANDLES[a] === 'function'), true)
checker.check('and every handle has an address', Object.keys(ORBIT_HANDLES).length, ORBIT_ADDRESSES.length)

// ── the law ────────────────────────────────────────────────────────────────
for (const address of ORBIT_ADDRESSES) {
  const loaded = await loadOrbitAddress(address)
  checker.check(`a432.${address} loads exactly ${address}`, loaded.join('.'), address)
}

// ── the addresses are prefixes of one another, shortest first ──────────────
for (let i = 1; i < ORBIT_ADDRESSES.length; i += 1) {
  const shorter = await loadOrbitAddress(ORBIT_ADDRESSES[i - 1]!)
  const longer = await loadOrbitAddress(ORBIT_ADDRESSES[i]!)
  checker.check(`${ORBIT_ADDRESSES[i - 1]} is a prefix of ${ORBIT_ADDRESSES[i]}`,
    longer.slice(0, shorter.length).join('.'), shorter.join('.'))
  checker.check(`and one digit longer`, longer.length, shorter.length + 1)
}

// ── the doubling that generates them ───────────────────────────────────────
{
  const full = await loadOrbitAddress(ORBIT_ADDRESSES[ORBIT_ADDRESSES.length - 1]!)

  /**
   * THIS LINE ALONE IS CIRCULAR, AND THE ONE BELOW IT IS NOT.
   *
   * The orbit modules GENERATE their sequence with legacyDigitalRoot, so
   * checking the doubling with the same function cannot detect an error in it —
   * both sides move together. (It read `(x * 2) % 9 || 9` until the spine audit
   * counted an inline % 9 in an a432 file as debt; the substitution is right and
   * the reason given for it, that the semantics are identical on the orbit, is
   * not the reason it stays honest.)
   *
   * What keeps the suite falsifiable is the ADDRESS: `1.2.4.8.7` is a literal in
   * a filename and owes nothing to a432.roots, so corrupting legacyDigitalRoot
   * changes what loads and the address checks above fail — verified by making
   * legacyDigitalRoot(16) return 8, which fails two of them. The same edit made
   * to an address check rather than to this one would have been fatal.
   *
   * So the doubling gets an independent anchor too: the kernel's own orbit is a
   * literal array, computed by nothing.
   */
  const doubles = full.every((d, i) => i === 0 || d === legacyDigitalRoot(full[i - 1]! * 2))
  checker.check('each digit is the double of the one before it, mod 9', doubles, true)
  checker.check('and the whole sequence is the kernel\'s own VORTEX_ORBIT, which no digital root computes',
    full.join('.'), [...VORTEX_ORBIT].join('.'))
}

/**
 * THE NEGATIVE ARM. Without it every check above passes for a loader that
 * returns the address it was handed. An address off the orbit must be refused,
 * not answered.
 */
{
  let refused = false
  try { await loadOrbitAddress('1.2.3') } catch { refused = true }
  checker.check('an address that is not on the orbit is refused', refused, true)
  let refusedEmpty = false
  try { await loadOrbitAddress('') } catch { refusedEmpty = true }
  checker.check('and so is an empty address', refusedEmpty, true)
}

checker.report()
