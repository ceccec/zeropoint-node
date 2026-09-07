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
  const doubles = full.every((d, i) => i === 0 || d === legacyDigitalRoot(full[i - 1]! * 2))
  checker.check('each digit is the double of the one before it, mod 9', doubles, true)
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
