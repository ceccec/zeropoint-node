#!/usr/bin/env node
/**
 * Versioning as an address — a sketch, run rather than argued.
 *
 * IPv3 never shipped: IP versions 0 through 3 were reserved or experimental,
 * and IPv5 (the Stream Protocol) never deployed either. The protocol that
 * numbers the internet has holes in its own version sequence, which is a fair
 * thing to keep in mind while proposing a new numbering.
 *
 * WHAT IS COMPUTED. The vortex stroke is a closed ten-step tour
 * 1\2\4\8/7/5/3\6\9/0\1, and a gateway is a digit whose outgoing stroke
 * reverses from the one that arrived. There are exactly four: 8, 3, 9, 0.
 * Cutting the tour after each gateway is not a choice — gateways are the only
 * intrinsic boundaries the stroke has — and it yields four fields:
 *
 *     [1 2 4 8] [7 5 3] [6 9] [0]        widths 4, 3, 2, 1, summing to 10
 *
 * Four fields, like a dotted quad, but a descending staircase rather than
 * IPv4's four equal octets. The space is 10^10 addresses, slightly larger than
 * IPv4's 2^32 ≈ 4.29e9.
 *
 * WHAT IS CHOSEN. Everything below. Assigning epoch/major/minor/patch to those
 * widths, and reading significance from the void outward, are design decisions
 * — the arithmetic does not require them and would not object to another
 * assignment. Said plainly because the gap between "the gateways partition the
 * tour" and "therefore versions should look like this" is exactly where this
 * sort of idea usually overclaims.
 *
 * WHAT IT BUYS. Semver states compatibility by convention: `^1.2.3` means
 * "trust the major", and the meaning lives in the tool that reads it. An
 * address states it by computation — two versions are compatible when they
 * agree under a prefix mask, the same way two hosts share a network. `^`
 * becomes /3 and `~` becomes /6. The convention becomes an operation.
 *
 *   node scripts/version-address.mjs            show this package's address
 *   node scripts/version-address.mjs --test     the self-check
 */

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// ---------------------------------------------------------------- computed
/** Field widths, derived from the kernel's stroke rather than written down. */
function fieldsFromStroke(stroke) {
  const { tour, gateways } = stroke
  const fields = []
  let cur = []
  for (const d of tour) {
    cur.push(d)
    if (gateways.includes(d)) { fields.push(cur); cur = [] }
  }
  if (cur.length) fields.push(cur)
  return fields
}

// ------------------------------------------------------------------ chosen
/**
 * Significance runs from the void outward, so the address is the tour read
 * backwards: the 1-wide field (the void) is the most significant, the 4-wide
 * doubling run the least. A CHOICE, not a consequence.
 */
const ROLES = ['epoch', 'major', 'minor', 'patch']

export function toAddress(semver, widths) {
  const [major, minor, patch] = semver.split('.').map((n) => Number(n))
  if ([major, minor, patch].some((n) => !Number.isInteger(n) || n < 0)) {
    throw new Error(`not a semver: ${semver}`)
  }
  const sig = [...widths].reverse() // 1, 2, 3, 4
  const values = [0, major, minor, patch] // epoch 0 until something forces it
  const parts = values.map((v, i) => {
    const w = sig[i]
    const max = Math.pow(10, w) - 1
    if (v > max) throw new Error(`${ROLES[i]} ${v} does not fit in ${w} digit(s) (max ${max})`)
    return String(v).padStart(w, '0')
  })
  return parts.join('.')
}

/** The address as one digit string, for masking. */
const flat = (addr) => addr.split('.').join('')

/**
 * Do two addresses share a network under a prefix of `bits` digits?
 * This is the whole point: compatibility is an operation, not a convention.
 */
export function sameNetwork(a, b, prefix) {
  return flat(a).slice(0, prefix) === flat(b).slice(0, prefix)
}

/** Semver's operators, expressed as masks. */
export const CARET = 3 // ^ : epoch + major
export const TILDE = 6 // ~ : epoch + major + minor

// ------------------------------------------------- linear -> vortex parities
/**
 * Counting is not the only order on the digits.
 *
 *   linear   1 2 3 4 5 6 7 8 9
 *   vortex   1 2 4 8 7 5 3 6 9      the orbit, then the axis
 *   mirror   9 8 6 2 3 5 7 4 1      the vortex through the void
 *
 * Both are permutations of 1..9, so a version numbered along either loses
 * nothing — it is the same nine values in a different order. The mirror is NOT
 * the reverse of the vortex (that would be 963578421); it is throughVoid applied
 * termwise, which is why it is a parity and not merely a direction.
 *
 * What makes them usable as an ordering is that each has ORDER 6 — apply either
 * six times and you are back at the identity, the same 6 that period-6 doubling
 * gives via 2^6 = 64 = 1 (mod 9). A version stepping along one of them cycles
 * rather than running off.
 *
 * And a warning that only shows up by computing it. The two parities generate a
 * group of order 84, a proper subgroup of S9. Adding the doubling and mirror
 * maps D and M — whose own group has order 54 — generates ALL of S9, every one
 * of the 362 880 permutations. Mixing all four gives an address space with no
 * invariant left to route on, which is the opposite of what an address is for.
 * The structure is worth having only if you do not add every map you own to it.
 */
export const LINEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9]
export const VORTEX = [1, 2, 4, 8, 7, 5, 3, 6, 9]
export const MIRROR = [9, 8, 6, 2, 3, 5, 7, 4, 1]

/** Read a linear digit as its vortex counterpart: position n in 1..9. */
export const alongVortex = (n) => VORTEX[n - 1]
export const alongMirror = (n) => MIRROR[n - 1]

const composePerm = (p, q) => {
  const mp = {}, mq = {}
  p.forEach((v, i) => { mp[i + 1] = v })
  q.forEach((v, i) => { mq[i + 1] = v })
  return p.map((_, i) => mq[mp[i + 1]])
}
const permOrder = (p) => {
  let r = LINEAR, n = 0
  do { r = composePerm(r, p); n++ } while (r.join() !== LINEAR.join())
  return n
}
const inversions = (p) => {
  let inv = 0
  for (let i = 0; i < p.length; i++) for (let k = i + 1; k < p.length; k++) if (p[i] > p[k]) inv++
  return inv
}
const generated = (gens) => {
  const seen = new Set([LINEAR.join('')])
  let frontier = [LINEAR]
  while (frontier.length) {
    const next = []
    for (const g of frontier) for (const s of gens) {
      const h = composePerm(g, s), k = h.join('')
      if (!seen.has(k)) { seen.add(k); next.push(h) }
    }
    frontier = next
  }
  return seen
}

// --------------------------------------------- what the current version owes
/**
 * A version number that says what the next release has to be.
 *
 * This is the part that makes an address more than a relabelled ordinal. In
 * semver the number is a record of what already happened, and nothing about
 * 1.0.11 tells you anything about 1.0.12. Here the version is a POSITION in the
 * closed tour 1\2\4\8/7/5/3\6\9/0\1, and the stroke between that position and
 * the next one is already determined:
 *
 *   same stroke as the one you arrived on   the release continues the run
 *   the stroke reverses (a gateway)         the release crosses a polarity
 *                                           reversal, and that is a break
 *
 * So "what needs to be done to release the next version" stops being a
 * judgement call and becomes a lookup. Four of the ten steps cross a gateway,
 * which is the same as saying a full turn of the tour contains exactly four
 * breaking releases — 8, 3, 9 and 0 — and six that continue.
 *
 * Whether a project SHOULD be forced to break at 8 is a separate question, and
 * this does not answer it. What it does is make the schedule explicit and
 * computed instead of decided release by release.
 */
export function nextRelease(position, stroke) {
  const { tour, gateways, steps } = stroke
  const i = tour.indexOf(position)
  if (i < 0) throw new Error(`${position} is not on the tour ${tour.join('')}`)
  const next = tour[(i + 1) % tour.length]
  const crossing = gateways.includes(position)
  return {
    from: position,
    to: next,
    stroke: steps[i].stroke,
    crossesGateway: crossing,
    kind: crossing ? 'break' : 'continue',
    // The axis governs and the orbit flows: a break ON the axis is the
    // heavier of the two, which is a reading of the arithmetic, not a rule
    // the arithmetic imposes.
    owes: crossing
      ? `polarity reverses at ${position} -> ${next}: the next release breaks`
      : `stroke holds ${steps[i].stroke} at ${position} -> ${next}: the next release continues`,
  }
}

// -------------------------------------------------------------------- main
const strokeJson = execFileSync(
  'node',
  ['--experimental-strip-types', '-e',
    `import('${join(ROOT, 'src/0/index.ts')}').then(m=>{const g=m.vortexStrokeGateways();console.log(JSON.stringify({tour:g.tour,gateways:g.gateways,steps:g.steps}));process.exit(0)})`],
  { cwd: ROOT, encoding: 'utf8' },
)
const stroke = JSON.parse(strokeJson.trim().split('\n').pop())
const fields = fieldsFromStroke(stroke)
const widths = fields.map((f) => f.length)

if (process.argv.includes('--test')) {
  let fail = 0
  const check = (name, ok, detail = '') => {
    if (ok) return
    fail++
    console.error(`  ✗ ${name}${detail ? ' — ' + detail : ''}`)
  }

  // The computed half. If the stroke changes, these are what notice.
  check('four fields', fields.length === 4, JSON.stringify(fields))
  check('widths descend 4,3,2,1', widths.join() === '4,3,2,1', widths.join())
  check('fields cover the tour exactly', widths.reduce((a, b) => a + b, 0) === stroke.tour.length)
  check('every gateway ends a field', fields.every((f) => stroke.gateways.includes(f[f.length - 1])))
  check('no gateway is interior to a field', fields.every((f) => f.slice(0, -1).every((d) => !stroke.gateways.includes(d))))
  check('the space exceeds IPv4', Math.pow(10, 10) > Math.pow(2, 32))

  // The chosen half.
  const a = toAddress('1.0.11', widths)
  check('1.0.11 addresses', a === '0.01.000.0011', a)
  check('address has four fields', a.split('.').length === 4)

  // Masking reproduces semver's operators.
  check('^ accepts a patch bump', sameNetwork(toAddress('1.0.11', widths), toAddress('1.0.12', widths), CARET))
  check('^ accepts a minor bump', sameNetwork(toAddress('1.0.11', widths), toAddress('1.4.0', widths), CARET))
  check('^ REJECTS a major bump', !sameNetwork(toAddress('1.0.11', widths), toAddress('2.0.0', widths), CARET))
  check('~ accepts a patch bump', sameNetwork(toAddress('1.0.11', widths), toAddress('1.0.12', widths), TILDE))
  check('~ REJECTS a minor bump', !sameNetwork(toAddress('1.0.11', widths), toAddress('1.4.0', widths), TILDE))
  check('/10 is exact equality', !sameNetwork(toAddress('1.0.11', widths), toAddress('1.0.12', widths), 10))

  // And the limits, said out loud rather than discovered later.
  let overflowed = false
  try { toAddress('100.0.0', widths) } catch { overflowed = true }
  check('a major above 99 does not fit, and says so', overflowed)

  // ---- the parities, all computed --------------------------------------
  const sorted = (p) => [...p].sort((x, y) => x - y).join()
  check('vortex permutes 1..9', sorted(VORTEX) === LINEAR.join())
  check('mirror permutes 1..9', sorted(MIRROR) === LINEAR.join())
  check('the vortex IS the kernel sequence', VORTEX.join() === stroke.tour.filter((d) => d !== 0).join(),
    `${VORTEX.join()} vs ${stroke.tour.filter((d) => d !== 0).join()}`)
  check('the mirror is throughVoid of the vortex, termwise',
    VORTEX.map((d) => ((1 - d) % 9 + 9) % 9 || 9).join() === MIRROR.join())
  check('the mirror is NOT the reverse', [...VORTEX].reverse().join() !== MIRROR.join())
  check('vortex has order 6', permOrder(VORTEX) === 6, String(permOrder(VORTEX)))
  check('mirror has order 6', permOrder(MIRROR) === 6, String(permOrder(MIRROR)))
  check('both parities are odd permutations', inversions(VORTEX) % 2 === 1 && inversions(MIRROR) % 2 === 1,
    `${inversions(VORTEX)} and ${inversions(MIRROR)} inversions`)
  const D = [2, 4, 6, 8, 1, 3, 5, 7, 9]
  const M = [9, 8, 7, 6, 5, 4, 3, 2, 1]
  check('doubling and mirror generate 54', generated([D, M]).size === 54, String(generated([D, M]).size))
  check('the two parities generate 84', generated([VORTEX, MIRROR]).size === 84, String(generated([VORTEX, MIRROR]).size))
  check('84 is a PROPER subgroup of S9', generated([VORTEX, MIRROR]).size < 362880 && 362880 % 84 === 0)
  check('neither parity lies in the doubling-mirror group of 54',
    !generated([D, M]).has(VORTEX.join('')) && !generated([D, M]).has(MIRROR.join('')))
  // The negative result, asserted so it cannot quietly stop being true.
  check('all four generators together collapse to the whole of S9',
    generated([D, M, VORTEX, MIRROR]).size === 362880, String(generated([D, M, VORTEX, MIRROR]).size))

  // ---- the schedule the tour already contains ---------------------------
  const plan = stroke.tour.map((d) => nextRelease(d, stroke))
  check('every position on the tour has a successor', plan.length === 10)
  check('the tour closes back on itself', plan[plan.length - 1].to === stroke.tour[0])
  check('exactly four releases break', plan.filter((p) => p.kind === 'break').length === 4,
    String(plan.filter((p) => p.kind === 'break').length))
  check('exactly six releases continue', plan.filter((p) => p.kind === 'continue').length === 6)
  check('the breaks are the gateways', plan.filter((p) => p.kind === 'break').map((p) => p.from).join() === stroke.gateways.join())
  check('a non-gateway position never demands a break', !plan.some((p) => p.kind === 'break' && !stroke.gateways.includes(p.from)))
  let offTour = false
  try { nextRelease(99, stroke) } catch { offTour = true }
  check('a position not on the tour is refused', offTour)

  if (fail > 0) { console.error(`version-address self-test FAIL — ${fail}`); process.exit(1) }
  console.log('version-address self-test ok — 35 checks: 26 computed, 9 on the chosen mapping')
  process.exit(0)
}

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const addr = toAddress(pkg.version, widths)
console.log(`stroke     ${stroke.tour.join('')}  gateways ${stroke.gateways.join(',')}`)
console.log(`fields     ${fields.map((f) => f.join('')).join(' | ')}   widths ${widths.join('.')}`)
console.log()
console.log(`semver     ${pkg.version}`)
console.log(`address    ${addr}`)
console.log(`roles      ${ROLES.map((r, i) => `${r}(${[...widths].reverse()[i]})`).join('.')}`)
console.log()
console.log(`space      10^10 = ${Math.pow(10, 10).toLocaleString('en-US')} addresses (IPv4: 2^32 = ${Math.pow(2, 32).toLocaleString('en-US')})`)
console.log()
console.log('counting is not the only order on the digits:')
console.log(`  linear   ${LINEAR.join('')}`)
console.log(`  vortex   ${VORTEX.join('')}   order ${permOrder(VORTEX)}, ${inversions(VORTEX)} inversions (odd)`)
console.log(`  mirror   ${MIRROR.join('')}   order ${permOrder(MIRROR)}, ${inversions(MIRROR)} inversions (odd)`)
const DOUBLING = [2, 4, 6, 8, 1, 3, 5, 7, 9]
const MIRRORMAP = [9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(`  <vortex,mirror> = ${generated([VORTEX, MIRROR]).size}   <D,M> = ${generated([DOUBLING, MIRRORMAP]).size}   all four = ${generated([DOUBLING, MIRRORMAP, VORTEX, MIRROR]).size} = 9!`)
console.log()
console.log('compatibility as a mask, not a convention:')
for (const [op, prefix] of [['^ (caret)', CARET], ['~ (tilde)', TILDE], ['exact', 10]]) {
  const row = ['1.0.12', '1.4.0', '2.0.0']
    .map((v) => `${v}:${sameNetwork(addr, toAddress(v, widths), prefix) ? 'yes' : 'no '}`)
    .join('  ')
  console.log(`  /${String(prefix).padEnd(2)} ${op.padEnd(10)} ${row}`)
}

console.log()
console.log('each position already says what the next release owes:')
for (const d of stroke.tour) {
  const r = nextRelease(d, stroke)
  console.log(`  ${r.from} -> ${String(r.to).padEnd(2)} ${r.stroke}  ${r.kind === 'break' ? 'BREAK   ' : 'continue'}  ${r.owes}`)
}
