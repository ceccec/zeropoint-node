/**
 * The main zeropoint node — every exported function nothing was calling.
 *
 * The coverage audit reports 368 exported functions that nothing in the
 * pipeline ever calls. 321 are in a432 and 31 in quantum; those are the layers
 * around the node. The 20 covered here are src/0, src/kernel, src/crypto,
 * src/security, src/integrity and src/verification — the node itself, and the
 * part a consumer of this package actually gets.
 *
 * Properties, not smoke calls. "It returned without throwing" would pass for a
 * function that returns the wrong answer every time, which is the failure this
 * repository keeps finding. Where a real oracle exists — Math.trunc, Math.tan,
 * the kernel's own constants — it is used, so these check against something
 * other than themselves.
 */

import {
  seededUnit, seededIndex, doubleTorusSurface, asTorus,
  digitalRoot, VORTEX_SEQUENCE, foldPair,
} from '../0/index.ts'
import { trunc, tan, cos, sin, abs, PI } from '../0/algebra.ts'
import {
  kernelVortexSequence, legacyConsciousnessSequence, mapLegacyDigitToKernel,
} from './legacy.ts'
import { readLobe, readDoubleTorus, lobeLearning } from './lobes.ts'
import { contentUuidOf } from '../integrity/content-uuid.ts'
import { expandSeed } from '../crypto/ml-kem.ts'
import { quantumStateFromUuid } from '../security/quantum-fold-cipher.ts'
import { verifyProofChain, generateECCertificate } from '../verification/lean-bridge.ts'
import {
  createInfiniteJourney, generateJourneySteps, generateInfiniteCycles, navigateVortexFlow, VORTEX_FLOW,
} from '../0/3/6/9/1/2/4/8/7/5/1/index.ts'

let failures = 0
function check(name: string, ok: boolean, detail = ''): void {
  if (ok) { console.log('  ✓ ' + name); return }
  failures++
  console.log('  ✗ ' + name + (detail ? ' — ' + detail : ''))
}

console.log('Core exports nothing was calling\n')

// ---------------------------------------------------------------- algebra
// trunc and tan reimplement Math functions the repository bans, so the banned
// originals are exactly the right oracle: they are what the replacements claim
// to be.
console.log('src/0/algebra.ts')
// math:ban caught the first version of this: I used Math.trunc and Math.tan as
// oracles, arguing that the banned originals are the right reference for
// functions claiming to replace them. The ban's own allowlist is only for files
// IMPLEMENTING algebra, and even there bodies must stay Math-free, so an
// exemption would have been a real weakening. Stating the expected values
// directly is stronger anyway — it is the specification rather than "agrees
// with the thing we removed" — and tolerance comparisons use the repository's
// own abs.
{
  // Fractions, not decimals — the same rule the rest of the repository follows,
  // and the reason the decimal ratchet caught the first draft of this file.
  const TRUNC_CASES: [number, number][] = [
    [0, 0], [1, 1], [-1, -1],
    [17 / 10, 1], [-17 / 10, -1],     // toward zero, NOT toward negative infinity
    [1 / 2, 0], [-1 / 2, -0],
    [9999 / 1000, 9], [-9999 / 1000, -9],
  ]
  check('trunc rounds toward zero on both signs',
    TRUNC_CASES.every(([n, want]) => trunc(n) === want),
    TRUNC_CASES.filter(([n, w]) => trunc(n) !== w).map(([n, w]) => `${n}->${trunc(n)} want ${w}`).join(' '))
  check('trunc never increases magnitude', [39 / 10, -39 / 10, 1 / 10, -1 / 10].every((n) => abs(trunc(n)) <= abs(n)))
  check('trunc of an integer is itself', [0, 5, -5, 1000].every((n) => trunc(n) === n))
  check('trunc is idempotent', [17 / 10, -17 / 10, 9999 / 1000].every((n) => trunc(trunc(n)) === trunc(n)))

  // tan checked by identity and by exact reference angles, so no decimal
  // reference constants are needed and nothing is compared against Math.
  check('tan(0) is exactly 0', tan(0) === 0)
  check('tan(PI/4) is 1', abs(tan(PI / 4) - 1) < 1e-9, String(tan(PI / 4)))
  check('tan(-PI/4) is -1', abs(tan(-PI / 4) + 1) < 1e-9)
  check('tan is odd: tan(-x) = -tan(x)', [3 / 10, 1, 2].every((x) => abs(tan(-x) + tan(x)) < 1e-9))
  check('tan is sin/cos', [3 / 10, 1, 2, -5 / 2].every((x) => abs(tan(x) - sin(x) / cos(x)) < 1e-12))
  check('tan has period PI', [3 / 10, 1].every((x) => abs(tan(x) - tan(x + PI)) < 1e-9))
  // The pole. cos(PI/2) is not exactly 0 in floating point, so the sentinel
  // branch is unreachable there; what must hold is that tan stays finite.
  check('tan near a pole is finite, not NaN', Number.isFinite(tan(PI / 2)))
}

// ------------------------------------------------------------ seeded values
// These exist to replace Math.random, so determinism IS the contract.
console.log('\nsrc/0/index.ts — seeded values')
{
  check('seededUnit is in [0, 1)', ['a', 'b', 'zeropoint', ''].every((s) => { const u = seededUnit(s); return u >= 0 && u < 1 }))
  check('seededUnit is deterministic', seededUnit('zeropoint') === seededUnit('zeropoint'))
  check('seededUnit separates different seeds', seededUnit('a') !== seededUnit('b'))
  check('seededIndex stays in range', [1, 2, 9, 100].every((n) => { const i = seededIndex('seed', n); return Number.isInteger(i) && i >= 0 && i < n }))
  check('seededIndex is deterministic', seededIndex('seed', 9) === seededIndex('seed', 9))
  check('seededIndex of length 1 is always 0', ['a', 'b', 'c'].every((s) => seededIndex(s, 1) === 0))
}

// ------------------------------------------------------------------- torus
console.log('\nsrc/0/index.ts — torus')
{
  const p = doubleTorusSurface(0, 0, 3, 1)
  check('doubleTorusSurface returns three finite coordinates',
    [p.x, p.y, p.z].every(Number.isFinite), JSON.stringify(p))
  check('doubleTorusSurface is deterministic',
    JSON.stringify(doubleTorusSurface(1, 2, 4, -1)) === JSON.stringify(doubleTorusSurface(1, 2, 4, -1)))
  check('a full turn in theta returns to the same point',
    [0, 1, 2].every((phi) => {
      const a = doubleTorusSurface(0, phi, 3, 1)
      const b = doubleTorusSurface(PI * 2, phi, 3, 1)
      return abs(a.x - b.x) < 1e-9 && abs(a.y - b.y) < 1e-9 && abs(a.z - b.z) < 1e-9
    }))
  // I first asserted the lobes differ in z, and they do not. lobe enters only
  // as `lobe * TORUS_LOBE_OFFSET` on x, so the two lobes sit side by side and
  // share y and z — which is what a double torus is. The code was right; the
  // assertion was wrong. Corrected to the stronger property: displaced on x,
  // identical on y and z, and symmetric about the origin.
  {
    const left = doubleTorusSurface(1, 1, 3, 1)
    const right = doubleTorusSurface(1, 1, 3, -1)
    check('the lobes are displaced along x only',
      left.x !== right.x && left.y === right.y && left.z === right.z)
    check('the lobe offset is symmetric about the origin',
      abs((left.x + right.x) / 2 - doubleTorusSurface(1, 1, 3, 0).x) < 1e-9)
  }

  const f = foldPair('alpha', 'beta')
  const t = asTorus(f)
  check('asTorus places a fold at finite coordinates', [t.x, t.y, t.z].every(Number.isFinite))
  check('asTorus digit is a digital root', t.digit >= 1 && t.digit <= 9)
  check('asTorus lobe is exactly +1 or -1', t.lobe === 1 || t.lobe === -1)
  check('asTorus is deterministic', JSON.stringify(asTorus(f)) === JSON.stringify(asTorus(f)))
}

// ------------------------------------------------------------------ legacy
console.log('\nsrc/kernel/legacy.ts')
{
  check('kernelVortexSequence IS the kernel constant', kernelVortexSequence().join() === VORTEX_SEQUENCE.join())
  const c = legacyConsciousnessSequence()
  check('legacyConsciousnessSequence returns digits', c.length > 0 && c.every((d) => d >= 0 && d <= 9))
  // The one interesting case: the two conventions differ only at zero, and
  // this function is the bridge between them.
  check('mapLegacyDigitToKernel sends 0 to 9', mapLegacyDigitToKernel(0) === 9)
  // kernelDigitalRoot is legacy.ts's own alias for the kernel's digitalRoot,
  // so the kernel export is the oracle.
  check('mapLegacyDigitToKernel agrees with the kernel elsewhere',
    [1, 2, 5, 9, 18, 432].every((n) => mapLegacyDigitToKernel(n) === digitalRoot(n)))
  check('mapLegacyDigitToKernel never returns 0', [0, 9, 18, 27, 90].every((n) => mapLegacyDigitToKernel(n) !== 0))
}

// ------------------------------------------------------------------- lobes
console.log('\nsrc/kernel/lobes.ts')
{
  const l = readLobe('erpax')
  check('readLobe reports the lobe it was asked for', l.lobe === 'erpax')
  check('readLobe returns a path when present, null when not', l.present ? typeof l.path === 'string' : l.path === null)
  check('readLobe laws are strings', Array.isArray(l.laws) && l.laws.every((x) => typeof x === 'string'))

  const t = readDoubleTorus()
  check('readDoubleTorus reads exactly two lobes', t.lobes.length === 2, String(t.lobes.length))
  check('shared laws are shared by both lobes',
    t.shared.every((law: string) => t.lobes.every((lo: { laws: string[] }) => lo.laws.includes(law))))
  check('unique laws are in exactly one lobe',
    t.unique.every((u: { lobe: string; law: string }) => t.lobes.filter((lo: { laws: string[] }) => lo.laws.includes(u.law)).length === 1))
  check('shared and unique do not overlap',
    t.unique.every((u: { law: string }) => !t.shared.includes(u.law)))

  const learn = lobeLearning()
  check('lobeLearning returns adopted and candidate lists',
    Array.isArray(learn.adopted) && Array.isArray(learn.candidates))
  check('lobeLearning is content-addressed', typeof learn.root === 'string' && learn.root.length > 0)
}

// ------------------------------------------------------------------- uuids
console.log('\nsrc/integrity/content-uuid.ts')
{
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  check('contentUuidOf returns a UUID', UUID.test(contentUuidOf('hello')))
  check('contentUuidOf is deterministic', contentUuidOf('hello') === contentUuidOf('hello'))
  check('different content gives different uuids', contentUuidOf('hello') !== contentUuidOf('world'))
  // The point of canonicalisation: key order must not change the address.
  check('object key order does not change the uuid',
    contentUuidOf({ a: 1, b: 2 }) === contentUuidOf({ b: 2, a: 1 }))
  check('a different project namespace gives a different uuid',
    contentUuidOf('x', 'zeropoint-node') !== contentUuidOf('x', 'other-project'))
}

// ------------------------------------------------------------------ ml-kem
console.log('\nsrc/crypto/ml-kem.ts')
{
  const d = Buffer.alloc(32, 7)
  const [rho, sigma] = expandSeed(d)
  check('expandSeed returns two 32-byte halves', rho.length === 32 && sigma.length === 32, `${rho.length}/${sigma.length}`)
  check('the two halves differ', !rho.equals(sigma))
  check('expandSeed is deterministic', expandSeed(d)[0].equals(rho))
  check('a different seed gives different output', !expandSeed(Buffer.alloc(32, 8))[0].equals(rho))
}

// ------------------------------------------------------------- proof chains
console.log('\nsrc/verification/lean-bridge.ts')
{
  check('an empty chain does NOT verify', verifyProofChain([]) === false)
  const good = generateECCertificate('Steane[7,1,3]')
  check('a certificate whose seal held verifies', verifyProofChain([good]) === true, `seal=${good.seal}`)
  // A certificate is verified when its seal HELD, so that is what to corrupt.
  // Deleting a conjunct could not make this fail; changing what it reads can.
  const broken = { ...good, seal: 'broke' as typeof good.seal }
  check('a certificate whose seal broke does NOT verify', verifyProofChain([broken]) === false)
  check('one broken certificate fails the whole chain', verifyProofChain([good, broken]) === false)
}

// ------------------------------------------------------- an honest non-test
console.log('\nsrc/security/quantum-fold-cipher.ts')
{
  // quantumStateFromUuid is a STUB. Its body is `return null` under a comment
  // saying "this is a placeholder". Asserting that it returns null would dress
  // an unimplemented function up as a tested one, so what is asserted instead
  // is that it is still a stub — and this check FAILS the day someone
  // implements it, which is when the real test has to be written.
  check('quantumStateFromUuid is still an unimplemented stub',
    quantumStateFromUuid('00000000-0000-0000-0000-000000000000') === null &&
    quantumStateFromUuid('any-string-at-all') === null,
    'it returns something now — implement its real test')
}

// -------------------------------------------------------------- the journey
// The a432 barrel, whose four exported journey functions nothing called. The
// flow they walk is 0,3,6,9,1,2,4,8,7,5,1 — this repository's own directory
// path — so the properties are about that sequence, not about the shape of the
// objects returned.
console.log('\nsrc/0/3/6/9/1/2/4/8/7/5/1/index.ts — the journey')
{
  const j = createInfiniteJourney()
  check('the journey path is the vortex flow', j.path === VORTEX_FLOW.join('/'), j.path)
  check('the journey starts at the void', j.currentDigit === VORTEX_FLOW[0] && j.currentDigit === 0)
  check('the journey declares itself infinite', j.isInfinite === true)
  check('createInfiniteJourney is deterministic', JSON.stringify(createInfiniteJourney()) === JSON.stringify(j))

  const steps = generateJourneySteps()
  check('one step per digit of the flow', steps.length === VORTEX_FLOW.length, `${steps.length} vs ${VORTEX_FLOW.length}`)
  check('the steps walk the flow in order', steps.map((s) => s.digit).join() === VORTEX_FLOW.join())
  check('positions are 0-based and contiguous', steps.every((s, i) => s.position === i))

  for (const n of [1, 3, 7]) {
    check(`${n} cycles is ${n} x the flow length`,
      generateInfiniteCycles(n).length === n * VORTEX_FLOW.length)
  }
  check('zero cycles is empty', generateInfiniteCycles(0).length === 0)
  check('cycles repeat the same digits each time', (() => {
    const c = generateInfiniteCycles(2).map((s) => s.digit)
    return c.slice(0, VORTEX_FLOW.length).join() === c.slice(VORTEX_FLOW.length).join()
  })())

  // Navigation must follow the flow and close it, since the flow is a cycle.
  check('navigation follows the flow at every position',
    VORTEX_FLOW.every((d, i) => {
      const nav = navigateVortexFlow(i)
      return nav.currentDigit === d && nav.nextDigit === VORTEX_FLOW[(i + 1) % VORTEX_FLOW.length]
    }))
  check('navigation wraps at the end rather than running off',
    navigateVortexFlow(VORTEX_FLOW.length - 1).nextDigit === VORTEX_FLOW[0])
}

console.log()
if (failures > 0) {
  console.error(`core-exports FAIL — ${failures}`)
  process.exit(1)
}
console.log('core-exports ok — every previously uncalled core export is checked against a property')
process.exit(0)
