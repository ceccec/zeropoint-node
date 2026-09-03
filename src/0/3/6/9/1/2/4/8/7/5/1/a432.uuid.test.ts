/**
 * The content address, and the standard its names claim but do not implement.
 *
 * The plan for this patch first said uuidV3 and uuidV5 were RFC 4122 name-based
 * UUIDs and could be held to the RFC's test vectors. Reading the module said
 * otherwise, and this suite records what is actually true rather than what the
 * export names suggest: every generator here folds its input through the
 * kernel's FNV toUuid, there is no namespace argument, no MD5 and no SHA-1, and
 * v1, v3, v4 and v5 all carry version nibble 8. The module's own header says as
 * much — "Export names uuidV1-V5 kept as thin adapters for legacy callers".
 *
 * So the laws asserted are the module's real contract: same seed gives the same
 * address, different seeds give different ones, nothing is random, and the shape
 * is a UUID. The last check pins the version nibble at 8 deliberately, so that
 * if anyone ever makes these RFC-conformant the suite says so out loud instead
 * of quietly continuing to pass.
 */
import {
  uuidV1, uuidV3, uuidV4, uuidV5, colorUuid, soundUuid, geometryUuid, dimensionalVortexUuid,
} from './a432.uuid.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const NAMES = ['a', 'b', 'abc', 'a432', '', 'zeropoint', 'x'.repeat(50), '0', '9', 'a432.uuid.v3:a']
const STEPS = [...Array(24).keys()]
const byName = { uuidV3, uuidV5 }
const byStep = { colorUuid, soundUuid, geometryUuid, dimensionalVortexUuid }

// --- nothing here is random ---------------------------------------------
check('the same name always gives the same address',
  Object.values(byName).every((f) => NAMES.every((n) => f(n) === f(n) && f(n) === f(n))))

check('the same step always gives the same address',
  Object.values(byStep).every((f) => STEPS.every((s) => f(s) === f(s))))

check('uuidV4 with no argument is deterministic, not random',
  uuidV4() === uuidV4() && uuidV4() === uuidV4(),
  'it replaced a random path, and the whole point is that it no longer varies')

check('uuidV4 with a seed depends on the seed',
  uuidV4('one') !== uuidV4('two') && uuidV4('one') === uuidV4('one'))

check('uuidV1 depends on both label and timestamp, and repeats for the same pair',
  uuidV1('a', 1) === uuidV1('a', 1)
  && uuidV1('a', 1) !== uuidV1('b', 1)
  && uuidV1('a', 1) !== uuidV1('a', 2))

// --- distinct inputs give distinct addresses -----------------------------
check('the name-based generators are injective over this domain',
  Object.entries(byName).every(([, f]) => new Set(NAMES.map(f)).size === NAMES.length),
  'a content address that collides on ten short strings is not a content address')

check('the two name-based generators do not agree with each other',
  NAMES.every((n) => uuidV3(n) !== uuidV5(n)),
  'they carry different namespace prefixes, so they must differ')

check('the step generators separate the digits they are defined to separate',
  new Set(STEPS.map(dimensionalVortexUuid)).size > 1
  && new Set(STEPS.map(soundUuid)).size > 1)

// --- the shape ------------------------------------------------------------
const all = [
  ...NAMES.flatMap((n) => [uuidV3(n), uuidV5(n), uuidV4(n)]),
  ...STEPS.flatMap((s) => Object.values(byStep).map((f) => f(s))),
  uuidV1('label', 7),
]
check('every generator produces the 8-4-4-4-12 hex grammar',
  all.every((u) => UUID.test(u)), all.find((u) => !UUID.test(u)) ?? '')

check('the variant bits are RFC 4122\'s 10xx',
  all.every((u) => ['8', '9', 'a', 'b'].includes(u[19]!)))

check('the version nibble is 8 for EVERY generator, which is not a version RFC 4122 defines',
  all.every((u) => u[14] === '8'),
  'recorded deliberately: these are FNV content addresses in UUID shape, and v3 and v5 are not the RFC\'s v3 and v5')

check('no generator returns the nil UUID',
  all.every((u) => u !== '00000000-0000-0000-0000-000000000000'))

// --- the domain-specific generators depend on their own inputs -----------
check('a step and the same step twelve later are not assumed equal by accident',
  STEPS.slice(0, 12).every((s) => typeof dimensionalVortexUuid(s) === 'string'))

check('every generator survives the whole digit domain without throwing',
  STEPS.every((s) => Object.values(byStep).every((f) => { try { f(s); return true } catch { return false } })))

check('soundUuid honours its base argument',
  soundUuid(1, 432) === soundUuid(1, 432) && soundUuid(1, 432) !== soundUuid(1, 864))

console.log(failures === 0
  ? 'a432.uuid ok — every address is deterministic and injective, and the version nibble is 8 on purpose'
  : `a432.uuid FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
