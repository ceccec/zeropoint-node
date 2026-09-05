#!/usr/bin/env node
/**
 * Every script under scripts/ must parse.
 *
 * Written because one did not, and shipped anyway. cern-quantum-cases.mjs went
 * out with a duplicate `const ratio` — two edits an hour apart declaring the
 * same name in one block — and the full gate chain passed, because that script
 * is not IN the chain. It is network-dependent, so gating a build on a third
 * party's API would be worse; but "not gated on behaviour" had quietly become
 * "not looked at at all", and a syntax error is the cheapest possible thing to
 * catch.
 *
 * This is deliberately the WEAKEST useful check: it asks only whether node can
 * parse the file, never whether the file is correct. A script whose logic is
 * wrong passes here and should — that is what the scripts' own gates are for.
 * What it forecloses is the case where nothing whatever has read a file since
 * it was written.
 *
 * Falsified by introducing a syntax error into any script under scripts/, which
 * is how it was checked before being trusted.
 *
 *   npm run scripts:parse
 */
import { execFileSync } from 'node:child_process'
import { execSync } from 'node:child_process'

const files = execSync('git ls-files scripts', { encoding: 'utf8' })
  .trim().split('\n').filter((f) => f.endsWith('.mjs'))

// A run that reads no files cannot fail, and would print the same green as a
// run that read every one of them.
if (files.length === 0) {
  console.error('scripts:parse FAIL — found 0 scripts, so this check proves nothing')
  process.exit(1)
}

const broken = []
for (const file of files) {
  try {
    execFileSync('node', ['--experimental-strip-types', '--check', file], { stdio: 'pipe' })
  } catch (err) {
    const line = String(err.stderr ?? '').split('\n').find((l) => /Error/.test(l)) ?? 'unparseable'
    broken.push({ file, line: line.trim() })
  }
}

if (broken.length > 0) {
  console.error(`scripts:parse FAIL — ${broken.length} of ${files.length} script(s) do not parse:`)
  for (const b of broken) console.error(`  ${b.file}\n    ${b.line}`)
  process.exit(1)
}
console.log(`scripts:parse ok — all ${files.length} scripts parse`)
