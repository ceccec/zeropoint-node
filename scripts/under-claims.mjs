#!/usr/bin/env node
/**
 * A DEMARCATION IS A CLAIM, AND CLAIMS CAN BE TOO WEAK.
 *
 * This repository has three instruments hunting OVER-claims — the ratchet's
 * "unbounded effect claims in prose", its "boolean claims that cannot be
 * false", and claims:check binding every effect claim to a criterion that
 * resolves. It had nothing at all for UNDER-claims, and an under-claim is the
 * same defect involuted: a sentence that states less than the code establishes
 * is as false as one that states more, and it is worse in one respect — it
 * reads as rigour, so nobody argues with it.
 *
 * Every "DOES NOT ESTABLISH X" in a seal basis is testable in exactly the way
 * the positive claim is. law-mutations corrupts what a seal DOES constrain and
 * requires it to fall. This corrupts what a seal says it does NOT constrain and
 * requires it to HOLD. A seal that falls here is stronger than its own basis
 * admits, and the basis is the thing to fix.
 *
 * Each entry names the seal, the disclaimed subject, the exact substitution,
 * and the sentence being tested — so a reader can check the pairing rather than
 * trust it. Mutations run against a copy-on-write clone; the working tree is
 * never written.
 *
 *   npm run under:claims
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, rmSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ROOT = new URL('..', import.meta.url).pathname

/**
 * [seal, file, find, replace, the sentence under test]
 *
 * Every one of these was verified by hand before being written down, which is
 * why the table is short: a pairing nobody has run is a claim about a claim.
 */
const DISCLAIMERS = [
  ['probabilities_agree_with_the_amplitudes_they_come_from', 'quantum/simulator.ts',
    'export const cabs2 = (a: Complex): number => a.re * a.re + a.im * a.im',
    'export const cabs2 = (a: Complex): number => a.re * a.re',
    'DOES NOT ESTABLISH THAT cabs2 IS CORRECT — probabilities is defined as amps.map(cabs2), so both sides move together'],

  ['surface_code_rate_follows_the_fitted_form', 'quantum/error-correction.ts',
    'prefactor: 3 / 100,',
    'prefactor: 4 / 100,',
    'deliberately SCALE-FREE and therefore says nothing about the prefactor c'],

  ['pauliX_unitary', 'quantum/simulator.ts',
    'export const X: Gate1 = [cx(0), cx(1), cx(1), cx(0)]',
    'export const X: Gate1 = [cx(1), cx(0), cx(0), cx(1)]',
    'DOES NOT IDENTIFY X — being self-inverse and norm-preserving is a property many matrices have, the identity among them'],
]

const verdictIn = (dir, seal) => {
  const src = `
    const v = await import(${JSON.stringify(join(dir, 'verification/index.ts'))})
    try { console.log(v.runSeal(${JSON.stringify(seal)}).seal) } catch { console.log('threw') }
  `
  return execFileSync('node', ['--experimental-strip-types', '--input-type=module', '--eval', src],
    { encoding: 'utf8' }).trim()
}

const failures = []
const rows = []

for (const [seal, file, find, replace, sentence] of DISCLAIMERS) {
  const dir = mkdtempSync(join(tmpdir(), 'underclaim-'))
  const clone = join(dir, 'src')
  try {
    execFileSync('cp', ['-Rc', join(ROOT, 'src'), clone], { stdio: 'pipe' })
  } catch {
    execFileSync('cp', ['-R', join(ROOT, 'src'), clone], { stdio: 'pipe' })
  }
  try {
    // The control: unmutated, the seal must hold, or the mutation below proves
    // nothing about the disclaimer.
    const control = verdictIn(clone, seal)
    if (control !== 'held') {
      failures.push(`${seal}: does not hold even unmutated (${control}) — the disclaimer cannot be tested`)
      continue
    }

    const path = join(clone, file)
    const before = readFileSync(path, 'utf8')
    if (!before.includes(find)) {
      // A substitution whose anchor is gone silently tests nothing, which is
      // exactly the failure law-mutations caught in its own table today.
      failures.push(`${seal}: anchor not found in ${file} — ${find.slice(0, 60)}`)
      continue
    }
    writeFileSync(path, before.replace(find, replace))

    const after = verdictIn(clone, seal)
    rows.push({ seal, sentence, after })
    if (after !== 'held') {
      failures.push(`${seal}: FELL when its disclaimed subject was corrupted, so the seal is STRONGER than its basis says.\n      basis claims: ${sentence}\n      fix the sentence, not the seal.`)
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

console.log(`under-claims — ${DISCLAIMERS.length} demarcation(s) tested by corrupting what each says it does NOT constrain`)
for (const r of rows) {
  console.log(`  ${r.after === 'held' ? 'ok  ' : 'FAIL'} ${r.seal}`)
  console.log(`       ${r.sentence.slice(0, 96)}`)
}
if (failures.length > 0) {
  console.error(`\nunder-claims FAIL — ${failures.length} problem(s):`)
  for (const f of failures) console.error(`  ${f}`)
  process.exit(1)
}
console.log('under-claims ok — every demarcation holds under the corruption it disclaims')
