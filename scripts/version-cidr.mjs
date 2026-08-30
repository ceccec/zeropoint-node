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

// ------------------------------------------------------- gateway prefixes
/**
 * The four gateways are the four field boundaries.
 *
 * The vortex tour is 1 2 4 8 7 5 3 6 9 0, and a gateway is a digit where the
 * stroke reverses. There are exactly four — 8, 3, 9, 0 — and they cut the tour
 * into segments of width 4, 3, 2, 1:
 *
 *     1 2 4 8 | 7 5 3 | 6 9 | 0
 *
 * A 48-bit address has exactly four prefixes that complete a field: /0, /16,
 * /32, /48. Four and four, and both are the places where something changes
 * kind rather than merely advances — a gateway reverses polarity, a field
 * boundary finishes determining one number and starts the next.
 *
 * The three segments that end in 8, 3 and 9 close the three fields, in order.
 * The fourth segment is the void alone, and it maps to /0 — the prefix that
 * fixes nothing. That is the part worth pausing on: the void gateway and the
 * empty prefix are both "nothing is determined here", and the tour closes
 * 0 -> 1 exactly as /0 contains every address.
 *
 * WHAT DOES NOT CORRESPOND, said plainly. There are 45 interior prefixes and 6
 * non-gateway digits. Those are both "interior", and they are not in
 * correspondence — 45 is not 6 and no scaling makes it so. The claim here is
 * about the boundaries, which are 4 and 4 exactly; extending it to the
 * interiors would be numerology.
 */
export const TOUR = [1, 2, 4, 8, 7, 5, 3, 6, 9, 0]
export const GATEWAYS = [8, 3, 9, 0]

/** Gateways that close a field, in tour order, paired with the prefix. */
const FIELD_CLOSERS = [
  [8, FIELD_BITS],          // /16 — the major is fixed
  [3, FIELD_BITS * 2],      // /32 — the minor too
  [9, FIELD_BITS * 3],      // /48 — the patch too; one address
]
const VOID_GATEWAY = 0
const VOID_PREFIX = 0

/** The prefix a gateway digit stands for, or null if the digit is not one. */
export function prefixForGateway(digit) {
  if (digit === VOID_GATEWAY) return VOID_PREFIX
  const hit = FIELD_CLOSERS.find(([d]) => d === digit)
  return hit ? hit[1] : null
}

/** The gateway a prefix crosses, or null when the prefix is interior. */
export function gatewayForPrefix(prefix) {
  if (prefix === VOID_PREFIX) return VOID_GATEWAY
  const hit = FIELD_CLOSERS.find(([, p]) => p === prefix)
  return hit ? hit[0] : null
}

/** Every prefix, labelled by the gateway it crosses if it crosses one. */
export function prefixTour() {
  const out = []
  for (let p = 0; p <= TOTAL_BITS; p++) {
    const g = gatewayForPrefix(p)
    out.push({
      prefix: p,
      gateway: g,
      boundary: p % FIELD_BITS === 0,
      field: g === VOID_GATEWAY ? 'nothing fixed' : g === null ? 'interior' : ['major', 'minor', 'patch'][p / FIELD_BITS - 1],
    })
  }
  return out
}

// ------------------------------------------------ what the standard reflects
/**
 * The UUID standard puts its own version marker where versions go.
 *
 * Two rows written as
 *
 *     12 3 4 5 6 7 89
 *     98 7 6 5 4 3 21
 *
 * are the same string twice: the second is the first REVERSED, and it is also
 * the first with every digit sent through the void (n -> 10 - n). Those are
 * different operations and on the ascending run they coincide, because
 * reversing sends position i to 9-i while reflection sends i+1 to 9-i.
 *
 * The columns sum to 10, or to 110 where the column is two digits wide, and the
 * digit sum of each column equals that column's WIDTH. That is not a
 * coincidence of nine digits: n + mirror(n) is always repunit(w) * 10 —
 * 10, 110, 1110, 11110 — whose digit sum is w exactly, checked to w = 12.
 * 5 sits alone in the middle because it is the only digit the void fixes.
 *
 * The shape of that arrangement is a large group, a uniform middle, a large
 * group. A UUID is 8-4-4-4-12: a large group, a uniform middle of three, a
 * large group. And the standard places its VERSION nibble at the head of the
 * third group and its VARIANT nibble at the head of the fourth — both inside
 * the middle three groups, the same 48 bits a version maps onto.
 *
 * WHAT IS NOT CLAIMED. Nobody designed RFC 4122 around a vortex. The layout is
 * a consequence of how the timestamp and clock sequence were originally cut,
 * and the version nibble sits where it does because that field had room. What
 * is true, and checkable, is narrower and still worth saying: the standard's
 * own answer to "which kind of thing is this" lives in the middle three groups,
 * which is where a three-field version fits exactly.
 */
export const UUID_GROUP_WIDTHS = [8, 4, 4, 4, 12]
/** Positions RFC 4122 reserves, as [group index, hex index within it]. */
export const UUID_VERSION_NIBBLE = [2, 0]
export const UUID_VARIANT_NIBBLE = [3, 0]

/** Does this hex-group layout read big end, uniform middle, big end? */
export function isBigEndedUniformMiddle(widths) {
  if (widths.length < 3) return false
  const middle = widths.slice(1, -1)
  const uniform = middle.every((w) => w === middle[0])
  return uniform && widths[0] > middle[0] && widths[widths.length - 1] > middle[0]
}

// --------------------------------------------------------------- colour
/**
 * Three fields of sixteen bits is deep colour.
 *
 * 48 bits is exactly 16 bits per channel across three channels — the deepest
 * colour PNG and TIFF carry, and 2^48 = 281474976710656 distinct colours,
 * 16777216 times what 24-bit truecolour holds. That number is not a new one
 * here: it is the size of the /0 network, printed above, because they are the
 * same space counted twice.
 *
 * And the notation agrees. A 48-bit colour is #RRRRGGGGBBBB — twelve hex
 * digits in three groups of four, which is the UUID's middle exactly.
 *
 *     version   1.1.0
 *     hex       0001-0001-0000
 *     colour    #000100010000
 *
 * WHAT THIS SHARPENS. A prefix quantises the space, but a prefix is not a bit
 * depth: /24 fixes all of R and the top byte of G, which is not "8 bits per
 * channel" — it cuts a channel in half. Only four of the forty-nine prefixes
 * fall on a channel boundary, and they are 0, 16, 32, 48 — the same four the
 * gateways map to. So the gateway prefixes are exactly the quantisations that
 * respect a channel, and the other 45 split one.
 *
 * That is the third time the same four appear: four polarity reversals in the
 * tour, four field boundaries in the address, four channel-aligned depths. It
 * is one fact — 48 divides into three 16s — seen from three sides, not three
 * facts.
 */
export function toColour(version) {
  return '#' + toHexGroups(version).split('-').join('')
}

/** Bits per channel a prefix leaves free, or null when it splits a channel. */
export function channelDepth(prefix) {
  if (prefix % FIELD_BITS !== 0) return null
  return { fixedChannels: prefix / FIELD_BITS, freeChannels: FIELDS - prefix / FIELD_BITS }
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

  // ---- gateway prefixes -------------------------------------------------
  check('the tour has four gateways', GATEWAYS.length === 4)
  const boundaries = prefixTour().filter((x) => x.boundary)
  check('the address has four field boundaries', boundaries.length === 4, String(boundaries.length))
  check('every gateway maps to a prefix', GATEWAYS.every((g) => prefixForGateway(g) !== null))
  check('every boundary prefix maps to a gateway', boundaries.every((b) => gatewayForPrefix(b.prefix) !== null))
  check('the void gateway is the empty prefix', prefixForGateway(0) === 0 && gatewayForPrefix(0) === 0)
  check('gateways closing fields ascend with the tour',
    [8, 3, 9].map(prefixForGateway).join() === '16,32,48',
    [8, 3, 9].map(prefixForGateway).join())
  check('the mapping round-trips', GATEWAYS.every((g) => gatewayForPrefix(prefixForGateway(g)) === g))
  check('a non-gateway digit has no prefix',
    TOUR.filter((d) => !GATEWAYS.includes(d)).every((d) => prefixForGateway(d) === null))
  check('an interior prefix crosses no gateway',
    [1, 15, 17, 31, 33, 47].every((p) => gatewayForPrefix(p) === null))
  check('caret and tilde land on gateways', gatewayForPrefix(CARET) === 8 && gatewayForPrefix(TILDE) === 3)
  check('exact lands on the last field-closing gateway', gatewayForPrefix(EXACT) === 9)
  // The honest non-correspondence.
  check('interiors are NOT in correspondence: 45 prefixes, 6 digits',
    prefixTour().filter((x) => !x.boundary).length === 45 && TOUR.filter((d) => !GATEWAYS.includes(d)).length === 6)

  // ---- the arrangement, and what the standard reflects ------------------
  const ROW = '12 3 4 5 6 7 89'
  const MIRROR = '98 7 6 5 4 3 21'
  const tv = (n) => 10 - n
  check('the second row is the first reversed', [...ROW].reverse().join('') === MIRROR)
  check('the second row is also the first through the void',
    [...ROW].map((c) => (/[0-9]/.test(c) ? String(tv(Number(c))) : c)).join('') === MIRROR)
  const cols = ROW.split(' ').map((x, i) => [x, MIRROR.split(' ')[i]])
  check('every column sums to 10 or 110',
    cols.every(([a, b]) => Number(a) + Number(b) === (a.length === 1 ? 10 : 110)))
  const digitSum = (n) => [...String(n)].reduce((t, c) => t + Number(c), 0)
  check('the digit sum of each column equals its width',
    cols.every(([a, b]) => digitSum(Number(a) + Number(b)) === a.length))
  // and it is a law, not a fact about nine digits
  let lawHolds = true
  for (let w = 1; w <= 12; w++) {
    const n = Array.from({ length: w }, (_, i) => (i % 9) + 1).join('')
    const mir = [...n].map((c) => String(tv(Number(c)))).join('')
    if (digitSum(BigInt(n) + BigInt(mir)) !== w) lawHolds = false
  }
  check('n + mirror(n) has digit sum w, for every width to 12', lawHolds)
  check('5 is the only digit the void fixes', tv(5) === 5 && [1, 2, 3, 4, 6, 7, 8, 9].every((d) => tv(d) !== d))

  check('a uuid is 8-4-4-4-12', UUID_GROUP_WIDTHS.join('-') === '8-4-4-4-12')
  check('the uuid layout is big-ended with a uniform middle', isBigEndedUniformMiddle(UUID_GROUP_WIDTHS))
  check('so is the arrangement', isBigEndedUniformMiddle([2, 1, 1, 1, 1, 1, 2]))
  check('the uuid middle is three groups', UUID_GROUP_WIDTHS.slice(1, -1).length === FIELDS)
  check('the uuid middle is the 48 bits a version occupies',
    UUID_GROUP_WIDTHS.slice(1, -1).reduce((t, w) => t + w, 0) * 4 === TOTAL_BITS)
  check('the standard puts its version nibble in the middle three',
    UUID_VERSION_NIBBLE[0] >= 1 && UUID_VERSION_NIBBLE[0] <= 3)
  check('and its variant nibble too',
    UUID_VARIANT_NIBBLE[0] >= 1 && UUID_VARIANT_NIBBLE[0] <= 3)

  // ---- colour ------------------------------------------------------------
  check('48 bits is three 16-bit channels', FIELDS * FIELD_BITS === 48)
  check('the space is 2^48 colours', (1n << 48n) === 281474976710656n)
  check('that is the /0 network size', networkSize(0) === (1n << 48n))
  check('it is 2^24 times truecolour', (1n << 48n) / (1n << 24n) === (1n << 24n))
  check('a colour is twelve hex digits', toColour('1.1.0').length === 13, toColour('1.1.0'))
  check('1.1.0 is #000100010000', toColour('1.1.0') === '#000100010000', toColour('1.1.0'))
  check('the colour is the uuid middle without the dashes',
    toColour('1.1.0').slice(1) === toHexGroups('1.1.0').split('-').join(''))
  // the sharpening: gateway prefixes are the channel-aligned ones
  const alignedPrefixes = []
  for (let p = 0; p <= TOTAL_BITS; p++) if (channelDepth(p) !== null) alignedPrefixes.push(p)
  check('exactly four prefixes fall on a channel boundary', alignedPrefixes.length === 4, String(alignedPrefixes.length))
  check('they are the gateway prefixes',
    alignedPrefixes.every((p) => gatewayForPrefix(p) !== null) &&
    GATEWAYS.every((g) => alignedPrefixes.includes(prefixForGateway(g))))
  check('the other 45 split a channel', TOTAL_BITS + 1 - alignedPrefixes.length === 45)
  check('/24 splits a channel rather than halving the depth', channelDepth(24) === null)
  check('/16 fixes one channel and frees two',
    channelDepth(16).fixedChannels === 1 && channelDepth(16).freeChannels === 2)

  if (fail > 0) { console.error(`version-cidr self-test FAIL — ${fail}`); process.exit(1) }
  console.log('version-cidr self-test ok — 65 checks over the 48-bit address space')
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
console.log('')
console.log('the four gateways are the four field boundaries\n')
console.log(`  tour      ${TOUR.join(' ')}`)
console.log(`  segments  1 2 4 8 | 7 5 3 | 6 9 | 0     widths 4,3,2,1`)
console.log('')
console.log('  gateway  prefix  fixes')
console.log('  ' + '-'.repeat(46))
for (const g of GATEWAYS) {
  const p = prefixForGateway(g)
  const label = prefixTour()[p].field
  console.log(`  ${String(g).padEnd(9)}/${String(p).padEnd(7)}${label}`)
}
console.log('')
console.log('  The void gateway and the empty prefix are the same statement:')
console.log('  nothing is determined. The tour closes 0 -> 1 as /0 contains every address.')
console.log('  45 interior prefixes against 6 non-gateway digits — those do NOT correspond,')
console.log('  and pretending they did would be numerology.')
console.log('')
console.log('the same 48 bits are a colour\n')
console.log(`  version   ${version}`)
console.log(`  colour    ${toColour(version)}   (16 bits per channel — deep colour)`)
console.log(`  space     ${(1n << 48n).toLocaleString('en-US')} colours, ${((1n << 48n) / (1n << 24n)).toLocaleString('en-US')}x truecolour`)
console.log('')
console.log('  Only four of the 49 prefixes fall on a channel boundary — 0, 16, 32, 48 —')
console.log('  and they are the gateway prefixes. The other 45 cut a channel in half, so a')
console.log('  prefix is a quantisation but not a bit depth. Four reversals, four field')
console.log('  boundaries, four channel-aligned depths: one fact seen from three sides.')
