#!/usr/bin/env node
/**
 * Hold the changelog's NUMBERS answerable to the code.
 *
 * The narrative in CHANGELOG.md is written by hand, and should be: deciding
 * what mattered in a release is judgement, and no generator has it. But the
 * figures inside that narrative are not judgement. Every one of them —
 * 4195 mg/L, +237 kJ/mol, 1228.9 mV, 21 seals — is computed somewhere in this
 * repository, and typing it a second time into prose creates a copy that can
 * drift while nothing notices. That is the same defect as a hardcoded test
 * expectation, wearing prose.
 *
 * So each fact below is RECOMPUTED and the current version's section must
 * contain it. Change the code and the note goes stale; the gate then says so,
 * naming the fact and both values.
 *
 * This deliberately does not generate the prose. A generated changelog says
 * what changed in the tree, which is what `git log` already says. What a reader
 * needs is what it means, and that has to be written.
 *
 *   npm run changelog:check   fail if a stated figure no longer recomputes
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const version = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')).version
const changelog = readFileSync(resolve(ROOT, 'CHANGELOG.md'), 'utf8')

// The section for the version being released, up to the next heading.
const start = changelog.indexOf(`## ${version}`)
if (start < 0) {
  console.error(`changelog:check — no "## ${version}" section`)
  process.exit(1)
}
const rest = changelog.slice(start + 3)
const end = rest.indexOf('\n## ')
const section = end < 0 ? rest : rest.slice(0, end)

const { SEALS } = await import('../src/verification/lean-bridge.ts')
const thermo = await import('../src/thermo/free-energy.ts')
const waste = await import('../src/thermo/wastewater-energy.ts')

/** Render microvolts as millivolts with one decimal, rounding once. */
function millivolts(uv) {
  const tenths = Math.round(uv / 100)
  return `${(tenths - (tenths % 10)) / 10}.${tenths % 10}`
}

// `mentions` scopes the forward check to releases that actually DISCUSS the
// subject. Requiring every figure in every section was wrong: 1.0.7 says
// nothing about cell potentials, and demanding it state them would have forced
// a number into notes it does not belong in — the opposite of the point.
const facts = [
  {
    what: 'seal count',
    value: String(Object.keys(SEALS).length),
    where: 'lean-bridge SEALS',
    mentions: /\bseals?\b/i,
  },
  {
    what: 'Gibbs energy of splitting, kJ/mol',
    value: String(thermo.toKilojoulesPerMole(thermo.GIBBS_SPLITTING)),
    where: 'free-energy GIBBS_SPLITTING',
    mentions: /kJ\/mol/,
  },
  {
    what: 'reversible cell potential, mV',
    value: millivolts(thermo.reversiblePotentialMicrovolts()),
    where: 'free-energy reversiblePotentialMicrovolts',
    mentions: /reversible cell potential/i,
  },
  {
    what: 'thermoneutral potential, mV',
    value: millivolts(thermo.thermoneutralPotentialMicrovolts()),
    where: 'free-energy thermoneutralPotentialMicrovolts',
    mentions: /thermoneutral/i,
  },
  {
    what: 'break-even contamination, mg/L COD',
    value: String(waste.breakEvenCod()),
    where: 'wastewater-energy breakEvenCod',
    mentions: /break-even/i,
  },
]

let missing = 0
for (const f of facts) {
  if (!f.mentions.test(section)) {
    console.log(`  n/a  ${f.what.padEnd(38)} ${f.value.padStart(8)}  (not discussed in this release)`)
    continue
  }
  const present = section.includes(f.value)
  console.log(`  ${present ? 'ok  ' : 'STALE'} ${f.what.padEnd(38)} ${f.value.padStart(8)}  (${f.where})`)
  if (!present) missing++
}

// ---------------------------------------------------------------- and back
//
// The check above is one-directional: it asks whether each computed value
// APPEARS. That passes even if an invented figure sits beside the real ones,
// which is the more likely way a note goes wrong — nobody deletes 4195, they
// add a number that was never computed.
//
// So invert it. Every quantity stated with one of these units must be a value
// the code produces. A figure that is not is either stale or was never
// computed at all, and both are reported.
const UNITS = [
  { unit: 'mg/L', re: /([\d.]+)\s*mg\/L/g },
  { unit: 'kJ/mol', re: /([\d.]+)\s*kJ\/mol/g },
  { unit: 'mV', re: /([\d.]+)\s*mV/g },
  { unit: 'J per mg', re: /([\d.]+)\s*J per mg/g },
  // A count, not a unit — but stating "19 seals" beside the true 22 passed both
  // directions: the right value was still present, and a bare number has no
  // unit for the inverse to catch. Found by mutating the notes, not by reading.
  { unit: 'seals', re: /([\d.]+)\s*seals\b/g },
]
const computed = new Set(facts.map((f) => f.value))
// Values the code produces that are stated but not among the headline facts.
for (const extra of [
  String(thermo.toKilojoulesPerMole(thermo.ENTHALPY_FORMATION)),
  String(thermo.toKilojoulesPerMole(thermo.GIBBS_FORMATION)),
  String(waste.JOULES_PER_MG_COD),
]) computed.add(extra)

let unaccounted = 0
for (const { unit, re } of UNITS) {
  for (const m of section.matchAll(re)) {
    const stated = m[1].replace(/^[+-]/, '')
    if (computed.has(stated)) continue
    console.log(`  UNTRACED ${(stated + ' ' + unit).padEnd(37)} stated but not produced by the code`)
    unaccounted++
  }
}

if (missing > 0 || unaccounted > 0) {
  if (missing > 0) {
    console.error(
      `changelog:check FAIL — ${missing} figure(s) recompute to a value the "## ${version}" section does not state`,
    )
  }
  if (unaccounted > 0) {
    console.error(
      `changelog:check FAIL — ${unaccounted} quantity(ies) stated in "## ${version}" are not produced by any module`,
    )
  }
  process.exit(1)
}
console.log(
  `changelog:check ok — ${facts.length} figures recompute, and every quantity stated in "## ${version}" traces to code`,
)
