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

// -------------------------------------------------------------------- main
const strokeJson = execFileSync(
  'node',
  ['--experimental-strip-types', '-e',
    `import('${join(ROOT, 'src/0/index.ts')}').then(m=>{const g=m.vortexStrokeGateways();console.log(JSON.stringify({tour:g.tour,gateways:g.gateways}));process.exit(0)})`],
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

  if (fail > 0) { console.error(`version-address self-test FAIL — ${fail}`); process.exit(1) }
  console.log('version-address self-test ok — 15 checks, 6 on the computed half and 9 on the chosen half')
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
console.log('compatibility as a mask, not a convention:')
for (const [op, prefix] of [['^ (caret)', CARET], ['~ (tilde)', TILDE], ['exact', 10]]) {
  const row = ['1.0.12', '1.4.0', '2.0.0']
    .map((v) => `${v}:${sameNetwork(addr, toAddress(v, widths), prefix) ? 'yes' : 'no '}`)
    .join('  ')
  console.log(`  /${String(prefix).padEnd(2)} ${op.padEnd(10)} ${row}`)
}
