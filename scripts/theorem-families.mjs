#!/usr/bin/env node
/**
 * The corpus grouped into families, by what each theorem REASONS ABOUT.
 *
 * 83 theorems in one flat ledger is a list, not a structure. The obvious
 * grouping is by name prefix and it is worthless — the commonest first word is
 * "the", 14 times. So a theorem's family is the set of DEFINED OBJECTS its
 * statement mentions, and the defined objects are read from the `def` lines of
 * the Lean sources rather than listed here. Add a definition and its family
 * appears; rename one and the theorems follow it.
 *
 * That was learned the expensive way in this repository: a hardcoded list of
 * defined names silently demoted a theorem about `swap12` to "literal
 * arithmetic" and withheld its deposit, because the author added the definition
 * and forgot the list. The sources know their own definitions.
 *
 * A THEOREM MENTIONING NO DEFINED OBJECT IS NOT HOMELESS. Those are the closed
 * arithmetic — c², the light year, 2^53 — statements about numerals rather than
 * about this theory's constructions. They were once withheld from deposit for
 * exactly that reason, on a syntactic test standing in for significance, and
 * six of the nine were the speed-of-light group including the one justifying
 * this package's float ban. They are a family, named as one.
 *
 * AXIOMS ARE SEPARATED THE WAY axiom-index SEPARATES THEM: what a proof assumes
 * about its SUBJECT is not what it assumes about its PROOF SYSTEM. propext and
 * Quot.sound are the latter and say nothing about digits.
 *
 *   npm run families
 *   npm run families:check
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const PAGE = join(ROOT, 'docs/theorem-families.md')
const CHECK = process.argv.includes('--check')

const ledger = JSON.parse(readFileSync(join(ROOT, 'lean/ledger.json'), 'utf8'))
const axiomIndex = existsSync(join(ROOT, 'src/verification/axiom-index.json'))
  ? JSON.parse(readFileSync(join(ROOT, 'src/verification/axiom-index.json'), 'utf8'))
  : null

// Every .lean source, and the statements/definitions in it.
const leanFiles = readdirSync(join(ROOT, 'lean')).filter((n) => n.endsWith('.lean'))
const sources = leanFiles.map((n) => readFileSync(join(ROOT, 'lean', n), 'utf8')).join('\n')

const defined = [...new Set([...sources.matchAll(/^def\s+(\w+)/gm)].map((m) => m[1]))]
if (defined.length === 0) {
  console.error('families FAIL — read 0 definitions from lean/, so every theorem would look homeless')
  process.exit(1)
}

// Which file each theorem lives in — the fallback family.
const fileOf = new Map()
for (const n of leanFiles) {
  const text = readFileSync(join(ROOT, 'lean', n), 'utf8')
  for (const m of text.matchAll(/^(?:theorem|lemma)\s+(\w+)/gm)) fileOf.set(m[1], n)
}

const statements = new Map()
for (const m of sources.matchAll(/^(?:theorem|lemma)\s+(\w+)\s*:([\s\S]*?):=/gm)) {
  statements.set(m[1], m[2].replace(/\s+/g, ' ').trim())
}

// A theorem belongs to every family whose object it mentions. Multi-family is
// the honest answer where a statement relates two constructions.
const families = new Map()
const closed = []
const unparsed = []
for (const entry of ledger.entries) {
  const st = statements.get(entry.name)
  // AN UNREAD STATEMENT IS NOT A NUMERAL-ONLY ONE. The statement regex does not
  // match every declaration form in these files, so `st` came back undefined for
  // eleven quantum theorems — and undefined has no letters in it, so the test
  // below filed qft_unitary and grover_speedup as CLOSED ARITHMETIC. Absence
  // read as a value, in the file whose subject is families.
  if (st === undefined) { unparsed.push(entry); continue }
  const mentions = defined.filter((d) => new RegExp(`\\b${d}\\b`).test(st))
  if (mentions.length === 0) {
    // NOT EVERY THEOREM WITHOUT A LOCAL DEFINITION IS ARITHMETIC. The first
    // version binned anything mentioning no `def` as closed arithmetic, which
    // swept born_rule_sum, grover_amplification and shor_period_finding — all
    // plainly about quantum mechanics — in beside c². They reference Mathlib
    // names, not this theory's constructions.
    //
    // True closed arithmetic mentions NO identifier at all: numerals and
    // operators only. Everything else falls back to the file it lives in, which
    // is structural and always available.
    if (/[A-Za-z]/.test(st.replace(/\b(mod|div)\b/g, ''))) {
      const file = fileOf.get(entry.name) ?? 'unfiled'
      const key = `file: ${file}`
      if (!families.has(key)) families.set(key, [])
      families.get(key).push(entry)
    } else {
      closed.push(entry)
    }
    continue
  }
  for (const d of new Set(mentions)) {
    if (!families.has(d)) families.set(d, [])
    families.get(d).push(entry)
  }
}

const status = (es) => {
  const proven = es.filter((e) => e.status === 'proven').length
  const sorry = es.filter((e) => e.status === 'sorry').length
  const other = es.length - proven - sorry
  return { proven, sorry, other }
}

const ordered = [...families.entries()].sort((a, b) => b[1].length - a[1].length)
const totals = status(ledger.entries)

const lines = []
lines.push('# Theorem families')
lines.push('')
lines.push('> Generated by `npm run families` from the `def` lines of `lean/*.lean` and')
lines.push('> `lean/ledger.json`. A theorem\'s family is the set of defined objects its')
lines.push('> statement mentions — never a taxonomy typed here, because a hardcoded list of')
lines.push('> definitions once demoted a theorem to "literal arithmetic" for being newer')
lines.push('> than the list.')
lines.push('')
lines.push(`${ledger.entries.length} theorems across ${leanFiles.length} files: **${totals.proven} kernel-proven**, `
  + `${totals.sorry} closed with \`sorry\`, ${totals.other} unverifiable here. `
  + `${defined.length} defined objects give ${ordered.length} families, and a theorem may belong to more than one.`)
lines.push('')
lines.push('| family | theorems | proven | with `sorry` |')
lines.push('| --- | --- | --- | --- |')
for (const [name, es] of ordered) {
  const s = status(es)
  lines.push(`| \`${name}\` | ${es.length} | ${s.proven} | ${s.sorry} |`)
}
const cs = status(closed)
lines.push(`| *closed arithmetic* | ${closed.length} | ${cs.proven} | ${cs.sorry} |`)
if (unparsed.length > 0) {
  const us = status(unparsed)
  lines.push(`| *statement not parsed* | ${unparsed.length} | ${us.proven} | ${us.sorry} |`)
}
lines.push('')
lines.push('## Closed arithmetic')
lines.push('')
lines.push('Statements about numerals rather than about this theory\'s constructions —')
lines.push('`c²`, the light year, the exact integer range of a double. They mention no')
lines.push('defined object and are a family for that reason, not a residue. These were')
lines.push('once withheld from deposit on a syntactic test standing in for significance;')
lines.push('six of them are the speed-of-light group, including the theorem that justifies')
lines.push('this package\'s ban on decimal literals.')
lines.push('')
for (const e of closed) lines.push(`- \`${e.name}\` — ${e.status}`)
lines.push('')

if (axiomIndex?.totals) {
  lines.push('## Axioms')
  lines.push('')
  lines.push('What a proof assumes about its SUBJECT is not what it assumes about its PROOF')
  lines.push('SYSTEM, and `axiom-index` keeps them apart. `propext` and `Quot.sound` are')
  lines.push('facts about Lean and say nothing about digits.')
  lines.push('')
  for (const [k, v] of Object.entries(axiomIndex.totals)) {
    lines.push(`- **${k}**: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
  }
  lines.push('')
}

if (unparsed.length > 0) {
  lines.push('## Statement not parsed')
  lines.push('')
  lines.push(`The statement reader did not match ${unparsed.length} declarations, so their families are`)
  lines.push('UNKNOWN rather than empty. An earlier version filed these as closed arithmetic,')
  lines.push('because an unread statement contains no letters and the test for "numerals')
  lines.push('only" could not tell absence from evidence. They are listed here so the gap is')
  lines.push('visible rather than absorbed into a family that reads as an answer.')
  lines.push('')
  for (const e of unparsed) lines.push(`- \`${e.name}\` — ${e.status}`)
  lines.push('')
}

lines.push('Every family above is recomputed on each run. To disagree with any of it:')
lines.push('')
lines.push('```bash')
lines.push('npm run families && npm run lean:check && npm run refute')
lines.push('```')

const page = lines.join('\n') + '\n'

if (CHECK) {
  if (!existsSync(PAGE) || readFileSync(PAGE, 'utf8') !== page) {
    console.error('families:check FAIL — docs/theorem-families.md has drifted from lean/; run npm run families')
    process.exit(1)
  }
  console.log(`families:check ok — ${ordered.length} families over ${ledger.entries.length} theorems; the page matches the sources`)
  process.exit(0)
}

writeFileSync(PAGE, page)
console.log(`families — ${ledger.entries.length} theorems, ${defined.length} defined objects, ${ordered.length} families`)
console.log(`           largest: ${ordered.slice(0, 4).map(([n, e]) => `${n} (${e.length})`).join(', ')}`)
console.log(`           ${closed.length} mention no defined object and are the closed-arithmetic family`)
