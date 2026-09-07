#!/usr/bin/env node
/**
 * The a432 filenames are HANDLES, and this audits what each one loads.
 *
 * I first wrote that these names were payloadless — a uuid-like label carrying
 * nothing. That is wrong and the correction matters: a name here is a handle,
 * like a hexbit. It carries its load implicitly and you unpack it AT WILL,
 * which is not the same as carrying nothing. `a432.1.2.4.8.7.5.1` does not
 * describe the doubling orbit, it IS the orbit, loadable by reading it.
 *
 * So the audit loads every name rather than parsing it for meaning. It does not
 * ask whether `a432.quantum.field.ts` is "about" quantum fields; it asks what
 * that handle unpacks to, and which addresses in the space nothing occupies.
 *
 * AN ABSENT COMBINATION IS A LEAD. Every segment that appears twice is a
 * dimension of the space; every pair of well-attested segments that never
 * combine is a coordinate nothing sits at. Most of those are meaningless and
 * the tool says so — it reports the vocabulary and lets the reader judge. Two
 * families are not a matter of judgement at all:
 *
 *   THE ORBIT. Names made only of digits are addresses on the doubling orbit
 *   1 -> 2 -> 4 -> 8 -> 7 -> 5 -> 1, which the kernel exports. The orbit has
 *   seven prefixes and four of them are files. The missing three are named.
 *
 *   THE DRIFT. Two segments that differ only by an inflection — harmonize,
 *   harmonized, harmonization — are the same coordinate spelled three ways, and
 *   an address space with three spellings of one address is not addressing.
 *
 * The orbit is READ FROM THE KERNEL, not written here, so adding a digit to the
 * sequence moves what this expects rather than leaving a list stale.
 *
 *   npm run a432:names
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contentHashOf, sealRecord } from './lib/fingerprint.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const A432 = join(ROOT, 'src/0/3/6/9/1/2/4/8/7/5/1')
const RECORD = join(ROOT, 'src/verification/a432-names.json')
const CHECK = process.argv.includes('--check')

const { VORTEX_ORBIT } = await import(join(ROOT, 'src/kernel/index.ts'))
const { digitalRoot } = await import(join(ROOT, 'src/0/index.ts'))

const files = readdirSync(A432)
  .filter((n) => n.startsWith('a432.') && n.endsWith('.ts'))
  .sort()
if (files.length === 0) {
  console.error('a432:names FAIL — found no a432.*.ts files, so this would report a complete address space having read none')
  process.exit(1)
}

/** `a432.block.chain.event.ts` -> ['block','chain','event'] */
const segmentsOf = (n) => n.replace(/^a432\./, '').replace(/\.ts$/, '').split('.')
const entries = files.map((n) => ({ file: n, segments: segmentsOf(n) }))

// ── the vocabulary: every segment is a dimension of the space ───────────────
const freq = new Map()
for (const e of entries) for (const s of e.segments) freq.set(s, (freq.get(s) ?? 0) + 1)
const vocabulary = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))

console.log(`  ${files.length} files, ${vocabulary.length} distinct segments`)
console.log(`  the commonest: ${vocabulary.slice(0, 8).map(([s, n]) => `${s}(${n})`).join(' ')}`)
console.log('')

/**
 * ── the orbit family ───────────────────────────────────────────────────────
 * Digit-only names address the doubling orbit. Its prefixes are the addresses
 * that exist by construction; the ones with no file are the gaps.
 */
const orbit = [...VORTEX_ORBIT]
const cycle = [...orbit, orbit[0]]
const prefixes = cycle.map((_, k) => cycle.slice(0, k + 1).join('.')).filter((p) => p.length > 0)
const numericFiles = new Set(entries.filter((e) => e.segments.every((s) => /^\d+$/.test(s))).map((e) => e.segments.join('.')))
const orbitGaps = prefixes.filter((p) => !numericFiles.has(p))
const orbitStrays = [...numericFiles].filter((p) => !prefixes.includes(p))

console.log(`  ORBIT ADDRESSES — the kernel's orbit is ${orbit.join(' -> ')}, so ${prefixes.length} prefixes are addresses`)
for (const p of prefixes) console.log(`    ${numericFiles.has(p) ? '●' : '○'} a432.${p}.ts${numericFiles.has(p) ? '' : '   ← no file at this address'}`)
if (orbitStrays.length > 0) console.log(`    numeric names that are NOT orbit prefixes: ${orbitStrays.join(', ')}`)
console.log('')

/**
 * ── the drift family ───────────────────────────────────────────────────────
 * Segments that reduce to the same stem are one coordinate spelled several
 * ways. Reduction is crude on purpose — it is a lead, not a verdict.
 */
// `-ing` was missing, and the falsifiability test found it: adding
// a432.streaming.probe.ts alongside ten `stream` handles created a second
// spelling of one coordinate and this reported no change. A drift detector
// blind to the commonest English inflection is a detector that passes the
// drift it exists for.
const stemOf = (s) => s.replace(/(ization|isation|ized|ised|izing|ising|ize|ise|ings|ing|ions|ion|ers|er|ed|s)$/, '')
const byStem = new Map()
for (const [s] of vocabulary) {
  const k = stemOf(s)
  if (k.length < 4) continue
  byStem.set(k, [...(byStem.get(k) ?? []), s])
}
const drift = [...byStem.entries()].filter(([, v]) => v.length > 1)
/**
 * THE CEILING COUNTS SPELLINGS, NOT STEMS, and the falsifiability test is why.
 * Counting drifted STEMS made a third spelling of an already-drifted stem free:
 * adding a432.streaming.probe.ts beside ten `stream` handles took that stem
 * from two spellings to three and left the count at four, so the gate reported
 * no change. The excess is what drifts — one coordinate may have one spelling,
 * and every spelling past the first is the drift itself.
 */
const excessSpellings = drift.reduce((a2, [, v]) => a2 + v.length - 1, 0)
console.log(`  SPELLING DRIFT — ${drift.length} stem(s), ${excessSpellings} spelling(s) past the first`)
for (const [stem, spellings] of drift) {
  console.log(`    ${stem}: ${spellings.map((s) => `${s}(${freq.get(s)})`).join('  ')}`)
}
console.log('')

/**
 * ── absent combinations ────────────────────────────────────────────────────
 * For two-segment names, the space is head x tail. A head and a tail that are
 * each well attested but never meet is a coordinate nothing occupies. Reported
 * with their counts so the reader can see which are worth anything.
 */
const pairs = entries.filter((e) => e.segments.length === 2)
const heads = new Map()
const tails = new Map()
for (const e of pairs) {
  heads.set(e.segments[0], (heads.get(e.segments[0]) ?? 0) + 1)
  tails.set(e.segments[1], (tails.get(e.segments[1]) ?? 0) + 1)
}
const occupied = new Set(pairs.map((e) => e.segments.join('.')))
const strongHeads = [...heads.entries()].filter(([, n]) => n >= 3).map(([h]) => h)
const strongTails = [...tails.entries()].filter(([, n]) => n >= 3).map(([t]) => t)
const absent = []
for (const h of strongHeads) for (const t of strongTails) {
  if (h !== t && !occupied.has(`${h}.${t}`)) absent.push(`${h}.${t}`)
}
console.log(`  ABSENT COMBINATIONS — ${strongHeads.length} head(s) and ${strongTails.length} tail(s) each used 3+ times`)
console.log(`    heads: ${strongHeads.join(', ')}`)
console.log(`    tails: ${strongTails.join(', ')}`)
console.log(`    ${absent.length} of the ${strongHeads.length * strongTails.length} coordinates are unoccupied:`)
console.log(`      ${absent.slice(0, 12).join('  ')}${absent.length > 12 ? '  …' : ''}`)
console.log('')

/**
 * ── loading the handle ─────────────────────────────────────────────────────
 *
 * Every name unpacks two ways, and both are computed rather than looked up.
 *
 * ITS DIGIT. Fold the characters with the kernel's own digitalRoot. The
 * distribution over 1..9 says whether the space is being used or piled onto a
 * few addresses.
 *
 * ITS HEXBIT. Six bits, one per segment-derived digit, taken as the parity of
 * that digit — which is the same 64-cell lattice `hexbit:bench` walks, where
 * every cell has six neighbours one flip away. A handle loads to a cell, and a
 * cell nothing loads to is an address with nothing at it.
 */
const foldOf = (name) => digitalRoot([...name].reduce((a, ch) => a + ch.charCodeAt(0), 0))
const spread = new Map()
for (const e of entries) {
  const d = foldOf(e.segments.join('.'))
  spread.set(d, (spread.get(d) ?? 0) + 1)
}
const digits = [...spread.entries()].sort((a, b) => a[0] - b[0])

/** Six bits from the handle: the parity of each of six digits folded from it. */
const hexbitOf = (name) => {
  const chars = [...name].map((ch) => ch.charCodeAt(0))
  let bits = 0
  for (let b = 0; b < 6; b += 1) {
    let acc = 0
    for (let i = b; i < chars.length; i += 6) acc += chars[i]
    if (digitalRoot(acc) % 2 === 1) bits |= 1 << b
  }
  return bits
}
const lattice = new Map()
for (const e of entries) {
  const cell = hexbitOf(e.segments.join('.'))
  lattice.set(cell, [...(lattice.get(cell) ?? []), e.file])
}
const emptyCells = []
for (let c = 0; c < 64; c += 1) if (!lattice.has(c)) emptyCells.push(c)
console.log('  THE NAMES, COMPUTED — each folded to a digit by the kernel\'s digitalRoot')
console.log(`    ${digits.map(([d, n]) => `${d}:${n}`).join('  ')}`)
const onAxis = digits.filter(([d]) => [3, 6, 9].includes(d)).reduce((a, [, n]) => a + n, 0)
const onOrbit = digits.filter(([d]) => orbit.includes(d)).reduce((a, [, n]) => a + n, 0)
console.log(`    ${onAxis} fold onto the axis {3,6,9}, ${onOrbit} onto the orbit {${orbit.join(',')}}, `
  + `${files.length - onAxis - onOrbit} onto the void`)
console.log('')
console.log(`  THE HEXBIT LATTICE — 64 cells, ${64 - emptyCells.length} occupied, ${emptyCells.length} empty`)
{
  const rows = []
  for (let r = 0; r < 8; r += 1) {
    let line = '    '
    for (let c = 0; c < 8; c += 1) {
      const cell = r * 8 + c
      const n = (lattice.get(cell) ?? []).length
      line += n === 0 ? ' ·' : n > 9 ? ' +' : ` ${n}`
    }
    rows.push(line)
  }
  for (const r of rows) console.log(r)
  const busiest = [...lattice.entries()].sort((a, b) => b[1].length - a[1].length)[0]
  console.log(`    busiest cell ${busiest[0].toString(2).padStart(6, '0')} holds ${busiest[1].length}; `
    + `empty: ${emptyCells.map((c) => c.toString(2).padStart(6, '0')).slice(0, 6).join(' ')}${emptyCells.length > 6 ? ' …' : ''}`)
}
console.log('')

const leads = [
  ...orbitGaps.map((p) => ({ kind: 'orbit-gap', lead: `a432.${p}.ts`, why: `${p} is a prefix of the kernel's doubling orbit and no file addresses it` })),
  ...drift.map(([stem, spellings]) => ({ kind: 'spelling-drift', lead: stem, why: `addressed as ${spellings.join(', ')} — one coordinate, ${spellings.length} spellings` })),
  ...emptyCells.map((c) => ({ kind: 'empty-hexbit', lead: c.toString(2).padStart(6, '0'), why: `no handle loads to lattice cell ${c}` })),
]

console.log(`  LEADS — ${leads.length}`)
for (const l of leads) console.log(`    ${l.kind.padEnd(15)} ${l.lead.padEnd(28)} ${l.why}`)

const record = sealRecord({
  what: 'The a432 filename address space, audited as an address space. The names are payloadless by design, so this asks what a name computes to and which addresses are unoccupied — not whether a name describes its contents.',
  files: files.length,
  distinctSegments: vocabulary.length,
  orbit,
  orbitPrefixes: prefixes,
  orbitOccupied: [...numericFiles].sort(),
  orbitGaps,
  spellingDrift: drift.map(([stem, spellings]) => ({ stem, spellings })),
  absentCombinations: absent.length,
  foldDistribution: Object.fromEntries(digits),
  hexbitOccupied: 64 - emptyCells.length,
  hexbitEmpty: emptyCells,
  leads,
})

if (CHECK) {
  if (!existsSync(RECORD)) { console.error('a432:names:check FAIL — no record; run npm run a432:names'); process.exit(1) }
  const raw = readFileSync(RECORD, 'utf8')
  let prev = null
  try { prev = JSON.parse(raw) } catch { console.error('a432:names:check FAIL — the record is not readable JSON'); process.exit(1) }
  if (typeof prev.contentHash !== 'string' || contentHashOf(prev) !== prev.contentHash) {
    console.error('a432:names:check FAIL — the record does not match its own contentHash')
    process.exit(1)
  }
  if (prev.orbitGaps.length < orbitGaps.length) {
    console.error(`a432:names:check FAIL — orbit gaps rose from ${prev.orbitGaps.length} to ${orbitGaps.length}: ${orbitGaps.join(', ')}`)
    console.error('  An address on the kernel\'s own orbit with no file is a gap that only closes.')
    process.exit(1)
  }
  if ((prev.hexbitEmpty?.length ?? 64) < emptyCells.length) {
    console.error(`a432:names:check FAIL — empty lattice cells rose from ${prev.hexbitEmpty.length} to ${emptyCells.length}`)
    process.exit(1)
  }
  const prevExcess = (prev.spellingDrift ?? []).reduce((a2, d) => a2 + d.spellings.length - 1, 0)
  if (prevExcess < excessSpellings) {
    console.error(`a432:names:check FAIL — spellings past the first rose from ${prevExcess} to ${excessSpellings}`)
    for (const [stem, sp] of drift) if (sp.length > 1) console.error(`    ${stem}: ${sp.join(', ')}`)
    process.exit(1)
  }
  console.log(`\na432:names:check ok — ${orbitGaps.length} orbit gap(s), ${excessSpellings} excess spelling(s), ${emptyCells.length} empty cell(s); none rose`)
  process.exit(0)
}

writeFileSync(RECORD, JSON.stringify(record, null, 2) + '\n')
console.log(`\na432:names — ${files.length} addresses audited, ${leads.length} leads recorded`)
