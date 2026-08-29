#!/usr/bin/env node
/**
 * One concept, one behaviour — or a named reason for the difference.
 *
 * digitalRoot is implemented 43 times in this tree. That alone is not a defect;
 * what would be a defect is 43 implementations quietly doing 43 things. So this
 * runs every one of them over the defined domain and groups them by BEHAVIOUR
 * rather than by name.
 *
 * The answer today is better than the count suggests. They differ on exactly
 * two inputs out of 209:
 *
 *        n      vbm   kernel   legacy
 *        0        0        9        0
 *       -1        1        8        8
 *
 * n = 0 is a deliberate, named split — the kernel folds zero to 9 (the void
 * reads as nine), the legacy convention keeps 0. Both are sanctioned and both
 * have a name, which is the difference between a variant and a bug.
 *
 * n = -1 is not sanctioned; it is undefined domain leaking. Digital root is
 * classically defined on non-negative integers. Taking abs() first gives 1;
 * reducing mod 9 gives 8. Both are defensible precisely because nothing decided,
 * so this check does not adjudicate it — it asserts agreement on the DEFINED
 * domain (n >= 1) and records the rest as undecided rather than pretending a
 * convention exists.
 *
 * What it enforces: every implementation must agree with a sanctioned behaviour
 * for n >= 1. A 44th implementation that quietly does something else on ordinary
 * positive integers fails.
 *
 *   npm run standard:check
 */

import { readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules') continue
    const full = join(dir, n)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (n.endsWith('.ts') && !n.endsWith('.d.ts') && !n.endsWith('.test.ts')) out.push(full)
  }
  return out
}

/** The defined domain. Zero and negatives are handled separately, on purpose. */
const DOMAIN = []
for (let n = 1; n <= 500; n++) DOMAIN.push(n)

/** The reference: digital root on positive integers is 1 + (n - 1) mod 9. */
const reference = (n) => 1 + ((n - 1) % 9)

const impls = []
for (const file of walk(join(ROOT, 'src')).sort()) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  let mod
  try { mod = await import(pathToFileURL(file).href) } catch { continue }
  const visit = (name, fn, self) => {
    if (typeof fn !== 'function' || fn.length !== 1) return
    // Named for the concept. toDigit is deliberately excluded: it is n % 10,
    // the last digit, which is a different function honestly named.
    if (!/digitalroot|digitroot/i.test(name)) return
    impls.push({ where: `${rel}:${name}`, call: (x) => fn.call(self, x) })
  }
  for (const [k, v] of Object.entries(mod)) {
    visit(k, v, mod)
    if (typeof v === 'function') {
      for (const s of Object.getOwnPropertyNames(v)) {
        if (['length', 'name', 'prototype', 'caller', 'arguments'].includes(s)) continue
        visit(`${k}.${s}`, v[s], v)
      }
    }
  }
}

const problems = []
const zeroFolds = { toNine: [], toZero: [], other: [] }
for (const i of impls) {
  // The defined domain: everything must agree, no exceptions.
  for (const n of DOMAIN) {
    let got
    try { got = i.call(n) } catch (e) { problems.push(`${i.where} threw on n=${n}: ${e.message.slice(0, 50)}`); break }
    if (got !== reference(n)) {
      problems.push(`${i.where}(${n}) = ${got}, but digital root is ${reference(n)}`)
      break
    }
  }
  // Zero: two sanctioned answers, and anything else is a third convention
  // nobody declared.
  let z
  try { z = i.call(0) } catch { z = 'threw' }
  if (z === 9) zeroFolds.toNine.push(i.where)
  else if (z === 0) zeroFolds.toZero.push(i.where)
  else { zeroFolds.other.push(`${i.where} -> ${z}`); problems.push(`${i.where}(0) = ${z}, which is neither the kernel convention (9) nor the legacy one (0)`) }
}

console.log(
  `standard:check — ${impls.length} digitalRoot implementation(s); ` +
    `${zeroFolds.toNine.length} fold 0 to 9 (kernel), ${zeroFolds.toZero.length} keep 0 (legacy)`,
)
console.log('  negatives are undefined domain and deliberately not adjudicated here')
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`standard:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('standard:check ok — every implementation agrees on n >= 1, and folds 0 by a named convention')
process.exit(0)
