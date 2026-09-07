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
import { VORTEX_ORBIT, VORTEX_AXIS } from '../../../../../../../../../../../kernel/index.ts'
import { VORTEX_ADDRESSES, VORTEX_HANDLES, loadVortexAddress } from './a432.vortex.addresses.ts'
import { throughVoid } from '../../../../../../../../../../index.ts'
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

/**
 * ── the full vortex, which doubling does not reach ─────────────────────────
 *
 * The orbit closes on 1 by doubling and never touches the axis: 3 and 6
 * exchange under the same map and 9 is fixed, so 3-6-9 is a separate orbit and
 * the full sequence is the two concatenated. These addresses are therefore read
 * from the kernel rather than iterated, and the law is the same — an address
 * loads itself.
 */
checker.check('the vortex family has addresses past the orbit', VORTEX_ADDRESSES.length > 0, true)
checker.check('every vortex address has a handle',
  VORTEX_ADDRESSES.every((a) => typeof VORTEX_HANDLES[a] === 'function'), true)

for (const address of VORTEX_ADDRESSES) {
  const loaded = await loadVortexAddress(address)
  checker.check(`a432.${address} loads exactly ${address}`, loaded.join('.'), address)
}

{
  // The orbit is a prefix of every vortex address, and the tail past it is the
  // axis — checked against the kernel's own arrays, which no digital root
  // computes.
  const longest = await loadVortexAddress(VORTEX_ADDRESSES[VORTEX_ADDRESSES.length - 1]!)
  checker.check('the orbit is a prefix of the full vortex',
    longest.slice(0, VORTEX_ORBIT.length).join('.'), [...VORTEX_ORBIT].join('.'))
  checker.check('the tail past the orbit is the axis',
    longest.slice(VORTEX_ORBIT.length, VORTEX_ORBIT.length + VORTEX_AXIS.length).join('.'), [...VORTEX_AXIS].join('.'))
  checker.check('and the last address closes back onto the seed',
    longest[longest.length - 1], longest[0])

  // THE THING THAT WOULD BE WRONG IF THE DOUBLING TEMPLATE HAD BEEN USED: the
  // seventh digit is 3, and doubling from 1 gives 1 there.
  checker.check('the seventh digit is the axis, not the doubling map\'s return to 1', longest[6], 3)

  /**
   * AND THE AXIS IS DERIVED, which I first wrote up as impossible.
   *
   * I claimed the tail could only be read from the kernel because doubling
   * never reaches it. Doubling does not, and that is not the same as no rule:
   * every digit carries its reflection, and the axis is where the orbit's
   * reflections land. throughVoid is 1<->9, 2<->8, 3<->7, 4<->6 with 5 fixed,
   * so reflecting every second orbit element and reading backwards gives
   * exactly 3, 6, 9 — computed here from VORTEX_ORBIT and throughVoid, with
   * the kernel's VORTEX_AXIS on the other side of the equals sign.
   */
  const reflected = [...VORTEX_ORBIT]
    .map((d, i) => ({ i, r: throughVoid(d) }))
    .filter((x) => x.i % 2 === 0)
    .sort((x, y) => y.i - x.i)
    .map((x) => x.r)
  checker.check('the axis is the reflection of every second orbit element, read backwards',
    reflected.join('.'), [...VORTEX_AXIS].join('.'))
  checker.check('so the full vortex is the orbit followed by its own reflections',
    [...VORTEX_ORBIT, ...reflected].join('.'), longest.slice(0, VORTEX_ORBIT.length + VORTEX_AXIS.length).join('.'))

  // AND THE REFLECTION MUST BE ABLE TO DISAGREE. Reflecting the ODD positions
  // gives 8, 2, 5 — none of which is the axis — so the parity in the rule is
  // doing work rather than being decoration.
  const oddReflected = [...VORTEX_ORBIT]
    .map((d, i) => ({ i, r: throughVoid(d) }))
    .filter((x) => x.i % 2 === 1)
    .sort((x, y) => y.i - x.i)
    .map((x) => x.r)
  checker.check('reflecting the other positions does NOT give the axis',
    oddReflected.join('.') === [...VORTEX_AXIS].join('.'), false)
}

{
  let refused = false
  try { await loadVortexAddress('1.2.4') } catch { refused = true }
  checker.check('an orbit address is refused by the vortex loader', refused, true)
}

checker.report()
