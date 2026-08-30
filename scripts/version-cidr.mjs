#!/usr/bin/env node
/**
 * Versioning as a network address: IPv4 folded to three fields.
 *
 * A UUID is 8-4-4-4-12 hex digits. Strip the first group and the last and the
 * MIDDLE is exactly three groups of four hex digits — three fields of sixteen
 * bits, forty-eight bits in all:
 *
 *     3a7da72a - c96f-8533-970e - fbb8bffdfc29
 *                ^^^^^^^^^^^^^^
 *
 * IPv4 is four fields of eight bits. This is three fields of sixteen. Semver
 * is also three fields — major.minor.patch — so a version fits the UUID's
 * middle exactly, with 65536 values per field instead of 256.
 *
 * WHAT IPv4 ACTUALLY DOES, and what carries over. A CIDR prefix /n fixes the
 * top n bits and lets the rest vary. Everything else follows from that one
 * idea: the network address is the version with the host bits zeroed, the last
 * address is those bits set, the size is 2^(48-n), and two addresses are on the
 * same network when their prefixes agree.
 *
 * Semver's operators are exactly two of those prefixes, and nothing else:
 *
 *     ^1.2.3   every version with the same major      = 1.0.0/16
 *     ~1.2.3   same major and minor                   = 1.2.0/32
 *     =1.2.3   one address                            = 1.2.3/48
 *
 * The gain over the convention is not notation. `^` and `~` are two points on a
 * continuum that has 49 of them, and a mask can say things the operators
 * cannot — /24, for instance, is "the same major, and the top half of the
 * minor", which semver has no way to write.
 *
 * WHAT THIS DOES NOT DO. A prefix says two versions are in the same range. It
 * does not say they are compatible — that is what scripts/semver-diff.mjs
 * computes from the actual API surface, and the two answer different questions.
 * A mask is arithmetic; compatibility is a fact about the code.
 *
 *   node scripts/version-cidr.mjs            show this package's address
 *   node scripts/version-cidr.mjs --test     the self-check
 */

const FIELD_BITS = 16
const FIELDS = 3
const TOTAL_BITS = FIELD_BITS * FIELDS // 48 — the UUID's middle
const MAX_FIELD = (1 << FIELD_BITS) - 1

/** A semver string as a single 48-bit integer. BigInt: 48 bits is fine in a
 *  Number, but the shifts are clearer and exact this way. */
export function toBits(version) {
  const parts = version.split('.').map(Number)
  if (parts.length !== FIELDS || parts.some((n) => !Number.isInteger(n) || n < 0)) {
    throw new Error(`not a three-field version: ${version}`)
  }
  for (const [i, n] of parts.entries()) {
    if (n > MAX_FIELD) throw new Error(`field ${i} is ${n}, above ${MAX_FIELD} — it does not fit in ${FIELD_BITS} bits`)
  }
  return (BigInt(parts[0]) << 32n) | (BigInt(parts[1]) << 16n) | BigInt(parts[2])
}

export function fromBits(bits) {
  return [
    Number((bits >> 32n) & 0xffffn),
    Number((bits >> 16n) & 0xffffn),
    Number(bits & 0xffffn),
  ].join('.')
}

/** The UUID-middle form: three groups of four hex digits. */
export function toHexGroups(version) {
  const b = toBits(version)
  return [(b >> 32n) & 0xffffn, (b >> 16n) & 0xffffn, b & 0xffffn]
    .map((g) => g.toString(16).padStart(4, '0'))
    .join('-')
}

const maskFor = (prefix) => {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > TOTAL_BITS) {
    throw new Error(`prefix must be 0..${TOTAL_BITS}, got ${prefix}`)
  }
  // Zero the low (48 - prefix) bits.
  return ((1n << BigInt(TOTAL_BITS)) - 1n) ^ ((1n << BigInt(TOTAL_BITS - prefix)) - 1n)
}

/** The network this version belongs to at a given prefix. */
export function network(version, prefix) {
  return fromBits(toBits(version) & maskFor(prefix))
}

/** The last version inside that network. */
export function lastInNetwork(version, prefix) {
  return fromBits((toBits(version) & maskFor(prefix)) | ((1n << BigInt(TOTAL_BITS - prefix)) - 1n))
}

/** How many versions the network holds. */
export function networkSize(prefix) {
  return 1n << BigInt(TOTAL_BITS - prefix)
}

/** Are two versions on the same network at this prefix? */
export function sameNetwork(a, b, prefix) {
  const m = maskFor(prefix)
  return (toBits(a) & m) === (toBits(b) & m)
}

/** Semver's operators are two specific prefixes. */
export const CARET = FIELD_BITS          // 16 — same major
export const TILDE = FIELD_BITS * 2      // 32 — same major and minor
export const EXACT = TOTAL_BITS          // 48 — one version

/** Does `version` satisfy a range written with a semver operator? */
export function satisfies(version, range) {
  const m = /^([\^~=]?)(\d+\.\d+\.\d+)$/.exec(range.trim())
  if (!m) throw new Error(`unsupported range: ${range}`)
  const prefix = m[1] === '^' ? CARET : m[1] === '~' ? TILDE : EXACT
  // A range also has a floor: ^1.2.3 does not include 1.2.2.
  return sameNetwork(version, m[2], prefix) && toBits(version) >= toBits(m[2])
}

// ---------------------------------------------------------------------- test
if (process.argv.includes('--test')) {
  let fail = 0
  const check = (name, ok, detail = '') => {
    if (ok) return
    fail++
    console.error(`  ✗ ${name}${detail ? ' — ' + detail : ''}`)
  }

  // The shape claim, which is what the whole thing rests on.
  check('three fields of sixteen bits is forty-eight', FIELDS * FIELD_BITS === 48)
  check('a UUID middle is three groups of four hex digits',
    toHexGroups('1.1.0').split('-').length === 3 && toHexGroups('1.1.0').split('-').every((g) => g.length === 4),
    toHexGroups('1.1.0'))
  check('1.1.0 is 0001-0001-0000', toHexGroups('1.1.0') === '0001-0001-0000', toHexGroups('1.1.0'))
  check('the space is larger than IPv4', (1n << 48n) > (1n << 32n))

  // Round trip.
  for (const v of ['0.0.0', '1.1.0', '1.0.15', '65535.65535.65535']) {
    check(`${v} round-trips`, fromBits(toBits(v)) === v, fromBits(toBits(v)))
  }
  let overflowed = false
  try { toBits('65536.0.0') } catch { overflowed = true }
  check('a field above 65535 is refused, not truncated', overflowed)

  // CIDR arithmetic — the part borrowed from IPv4.
  check('/16 network of 1.2.3 is 1.0.0', network('1.2.3', 16) === '1.0.0', network('1.2.3', 16))
  check('/32 network of 1.2.3 is 1.2.0', network('1.2.3', 32) === '1.2.0', network('1.2.3', 32))
  check('/48 network of 1.2.3 is itself', network('1.2.3', 48) === '1.2.3')
  check('/0 network is 0.0.0', network('1.2.3', 0) === '0.0.0')
  check('last address in 1.0.0/16 is 1.65535.65535', lastInNetwork('1.2.3', 16) === '1.65535.65535', lastInNetwork('1.2.3', 16))
  check('a /16 holds 2^32 versions', networkSize(16) === (1n << 32n))
  check('a /48 holds exactly one', networkSize(48) === 1n)
  check('a /16 is 65536 times a /32', networkSize(16) / networkSize(32) === 65536n)

  // The operators, as prefixes.
  check('^ is /16', CARET === 16)
  check('~ is /32', TILDE === 32)
  check('^1.2.3 accepts 1.9.9', satisfies('1.9.9', '^1.2.3'))
  check('^1.2.3 REJECTS 2.0.0', !satisfies('2.0.0', '^1.2.3'))
  check('^1.2.3 REJECTS 1.2.2 — a range has a floor', !satisfies('1.2.2', '^1.2.3'))
  check('~1.2.3 accepts 1.2.9', satisfies('1.2.9', '~1.2.3'))
  check('~1.2.3 REJECTS 1.3.0', !satisfies('1.3.0', '~1.2.3'))
  check('=1.2.3 accepts only itself', satisfies('1.2.3', '=1.2.3') && !satisfies('1.2.4', '=1.2.3'))

  // What a mask can say that the operators cannot.
  // /24 fixes all 16 major bits plus the TOP EIGHT of the minor, so two minors
  // share a /24 exactly when minor >> 8 agrees. I first asserted 100 and 200
  // differ; they do not — both have a top byte of zero, as does everything
  // under 256. 300 is the first minor that leaves the first /24.
  check('/24 fixes the major and the top byte of the minor',
    sameNetwork('1.100.0', '1.200.0', 24) && !sameNetwork('1.100.0', '1.300.0', 24),
    `100~200: ${sameNetwork('1.100.0', '1.200.0', 24)}, 100~300: ${sameNetwork('1.100.0', '1.300.0', 24)}`)
  check('/24 still separates majors', !sameNetwork('1.100.0', '2.100.0', 24))
  check('there are 49 prefixes and semver names 3 of them', TOTAL_BITS + 1 === 49)

  if (fail > 0) { console.error(`version-cidr self-test FAIL — ${fail}`); process.exit(1) }
  console.log('version-cidr self-test ok — 28 checks over the 48-bit address space')
  process.exit(0)
}

const version = JSON.parse(
  await import('node:fs').then((fs) => fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')),
).version

console.log('a version is three fields of sixteen bits — the middle of a UUID\n')
console.log(`  version        ${version}`)
console.log(`  hex groups     ${toHexGroups(version)}`)
console.log(`  bits           ${toBits(version)} of ${1n << 48n}`)
console.log('')
console.log('  prefix  operator  network            holds')
console.log('  ' + '-'.repeat(58))
for (const [p, op] of [[0, ''], [16, '^'], [24, ''], [32, '~'], [40, ''], [48, '=']]) {
  console.log(
    `  /${String(p).padEnd(6)}${op.padEnd(10)}${(network(version, p) + '/' + p).padEnd(19)}${networkSize(p).toString().padStart(12)}`,
  )
}
console.log('')
console.log('  ^ and ~ are two of forty-nine prefixes. /24 is "same major, top half of')
console.log('  the minor" — a range semver has no notation for.')
