#!/usr/bin/env node
/**
 * assert-tautology — an assertion that compares an expression to itself after a
 * mutation is blind to the mutation by construction: both sides evaluate after
 * it, so no value from before survives to be compared.
 *
 * Ported from uuidna's assert-tautology (their lead 235). They shipped
 * `assert.equal(f(committed)[k], f(committed)[k], 'stable')` inside the test
 * that guards a receipt, after a write it meant to be unmoved by. Both sides
 * evaluate after the write, so the line could not fail, and its message claimed
 * a stability it never checked. The SAME TEXT — one expression on both sides
 * — also appears as a load-bearing determinism check (`gridRoot()` against
 * itself, nothing between). The source text does not carry the difference; the
 * claim does. A determinism check has nothing between its two evaluations by
 * design; a dead line has a mutation between the value it meant to capture and
 * the comparison. So the rule is positional: the two arguments are one expression
 * AND the enclosing test body mutates state before the assertion.
 *
 * This repository already had the other tautology shape (`X >= 0` as a claim)
 * in scripts/facet-tautology.mjs. That gate cannot see this one: a
 * same-expression assert is not a `>= 0` conjunct. Twenty same-expression
 * asserts live in the test tree today, all of them determinism, none after a
 * mutation. The first version of a regex that tried to find them was
 * paren-blind and would have reported 0 over the whole tree, which is the
 * instrument that collapses "could not read" into "clean". Arguments are split
 * at depth zero, strings respected.
 *
 * THE BOUNDARY, STATED RATHER THAN GUESSED PAST (uuidna lead 237): a
 * determinism check that follows an unrelated fixture write in the same body
 * is NAMED, falsely. Narrowing to "only a mutation whose target names something
 * the assertion reads" also clears the real dead line, whose write targets a
 * directory while the assertion reads a captured tree. The rule stays wide
 * and says so; the control in selfTest holds the false positive as a
 * documented limit, not a surprise.
 *
 * This repository's tests are mostly a `check(name, ok)` script rather than
 * node:test, so a file with no `test(` is one body. `check` is read in both
 * of its forms: a boolean with `===` inside, and a three-argument
 * got/want pair (this repository's assert.equal).
 *
 *   npm run assert:tautology:check
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const CALL = /assert\.(equal|deepEqual|strictEqual|deepStrictEqual|notEqual|notDeepEqual|notStrictEqual)\(/g
const ASSERT_CALL = /\b(?:console\.assert|assert)\(/g
const CHECK_CALL = /\bcheck\(/g
/** state a test body can change that a later same-expression comparison cannot see */
export const MUTATION = /\b(writeFileSync|appendFileSync|rmSync|unlinkSync|mkdirSync|renameSync|copyFileSync|truncateSync|execSync|execFileSync|spawnSync)\s*\(/
const norm = (s) => s.replace(/\s+/g, '')

/** topLevelArgs(src, openParen) → the call's arguments split at depth zero, quotes respected */
export function topLevelArgs(src, open) {
  const out = []
  let depth = 0, cur = '', quote = null
  for (let i = open + 1; i < src.length; i++) {
    const c = src[i]
    if (quote) {
      cur += c
      if (c === '\\') { cur += src[++i] ?? ''; continue }
      if (c === quote) quote = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; cur += c; continue }
    if ('([{'.includes(c)) depth++
    if (')]}'.includes(c)) { if (depth === 0) { out.push(cur); return out } depth-- }
    if (c === ',' && depth === 0) { out.push(cur); cur = ''; continue }
    cur += c
  }
  return out
}

/** first `===` at depth zero, strings respected; `!==` is skipped */
export function splitEq(expr) {
  let depth = 0, quote = null
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i]
    if (quote) {
      if (c === '\\') { i++; continue }
      if (c === quote) quote = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue }
    if ('([{'.includes(c)) depth++
    else if (')]}'.includes(c)) { if (depth > 0) depth-- }
    else if (depth === 0 && c === '=' && expr[i + 1] === '=' && expr[i + 2] === '=') {
      if (expr[i - 1] === '!') { i += 2; continue }
      return [expr.slice(0, i), expr.slice(i + 3)]
    }
  }
  return null
}

function objectIsArgs(expr) {
  const m = expr.match(/^\s*Object\.is\s*\(/)
  if (!m) return null
  const a = topLevelArgs(expr, expr.indexOf('('))
  return a.length >= 2 ? [a[0], a[1]] : null
}

function sidesOf(callee, args) {
  const sides = []
  if (callee === 'check(') {
    if (args[1]) {
      const eq = splitEq(args[1])
      if (eq) sides.push(eq)
      const oi = objectIsArgs(args[1])
      if (oi) sides.push(oi)
    }
    if (args.length >= 3) sides.push([args[1], args[2]])
  } else if (callee === 'assert(' || callee === 'console.assert(') {
    if (args[0]) {
      const eq = splitEq(args[0])
      if (eq) sides.push(eq)
      const oi = objectIsArgs(args[0])
      if (oi) sides.push(oi)
    }
  } else if (args.length >= 2) {
    sides.push([args[0], args[1]])
  }
  return sides
}

function eachCall(source, re, onMatch) {
  re.lastIndex = 0
  for (const m of source.matchAll(re)) {
    onMatch(m)
  }
}

function enclosingBodyStart(source, at) {
  const prefix = source.slice(0, at)
  let best = 0
  const re = /(?:^|\n)\s*test\s*\(/g
  let m
  while ((m = re.exec(prefix))) best = m.index
  return best
}

function hitsFrom(source, predicate) {
  const out = []
  const consider = (m, callee) => {
    const a = topLevelArgs(source, m.index + m[0].length - 1)
    for (const [left, right] of sidesOf(callee, a)) {
      if (norm(left) !== norm(right)) continue
      const line = source.slice(0, m.index).split('\n').length
      const at = source.split('\n').slice(0, line - 1).join('\n').length
      const rec = {
        line,
        text: (m[0] + left.trim()).replace(/\s+/g, ' ').slice(0, 120),
      }
      if (predicate(source, rec, at)) out.push(rec)
    }
  }
  eachCall(source, CALL, (m) => consider(m, m[0]))
  eachCall(source, ASSERT_CALL, (m) => consider(m, m[0]))
  eachCall(source, CHECK_CALL, (m) => consider(m, m[0]))
  return out
}

/** sameExpressionAsserts(source) → every two-sided assert whose arguments are one expression (the survey) */
export function sameExpressionAsserts(source) {
  return hitsFrom(source, () => true)
}

/** tautologicalAsserts(source) → the same-expression asserts that follow a mutation in their own test body */
export function tautologicalAsserts(source) {
  return hitsFrom(source, (src, rec, at) => MUTATION.test(src.slice(enclosingBodyStart(src, at), at)))
}

/**
 * Self-verification. A gate whose predicate is wrong is worse than no gate: it
 * reports clean and nothing checks it. The control is the committed dead line
 * from uuidna, by shape; the known-limit case is held so a change to it is a
 * decision rather than a surprise.
 */
export function selfTest() {
  const failures = []
  const args = topLevelArgs("f(g(a, b)['k'], g(a, b)['k'], 'msg')", 1).map((s) => s.trim())
  if (JSON.stringify(args) !== JSON.stringify(["g(a, b)['k']", "g(a, b)['k']", "'msg'"])) {
    failures.push("arguments are split at depth zero — a call inside an argument does not end it")
  }

  const determinism = "test('d', () => {\n  assert.equal(gridRoot(), gridRoot(), 'deterministic')\n})\n"
  if (sameExpressionAsserts(determinism).length !== 1) {
    failures.push('a determinism check is a survey row')
  }
  if (tautologicalAsserts(determinism).length !== 0) {
    failures.push('nothing happens between the two calls, so a determinism check is not a tautology')
  }

  const dead = "test('x', () => {\n  const c = committedTree()\n  writeFileSync(join(root, 'moved.ts'), 'v2')\n  assert.equal(fileManifest(c)['k'], fileManifest(c)['k'], 'stable')\n})\n"
  if (JSON.stringify(tautologicalAsserts(dead).map((t) => t.line)) !== JSON.stringify([4])) {
    failures.push('CONTROL — the committed dead line, by shape')
  }

  const different = "test('y', () => {\n  const before = f(a)\n  writeFileSync(p, 'v2')\n  assert.equal(f(a), before, 'moved')\n  assert.notEqual(f(a), f(b))\n})\n"
  if (tautologicalAsserts(different).length !== 0 || sameExpressionAsserts(different).length !== 0) {
    failures.push('a comparison of two different expressions is never named, mutation or not')
  }

  const limit = "test('z', () => {\n  writeFileSync(f, 'seed')\n  assert.equal(gridRoot(), gridRoot(), 'deterministic')\n})\n"
  if (JSON.stringify(tautologicalAsserts(limit).map((t) => t.line)) !== JSON.stringify([3])) {
    failures.push('KNOWN LIMIT — a determinism check after an unrelated fixture write is named, and the file says so')
  }

  const checkDet = "check('d', gridRoot() === gridRoot())\n"
  if (sameExpressionAsserts(checkDet).length !== 1 || tautologicalAsserts(checkDet).length !== 0) {
    failures.push("this repository's check(name, expr === expr) is a survey row when nothing mutates")
  }

  const checkDead = "writeFileSync(p, 'v2')\ncheck('d', gridRoot() === gridRoot())\n"
  if (JSON.stringify(tautologicalAsserts(checkDead).map((t) => t.line)) !== JSON.stringify([2])) {
    failures.push("this repository's check(name, expr === expr) after a mutation is the gap")
  }

  const checkWant = "writeFileSync(p, 'v2')\ncheck('d', gridRoot(), gridRoot())\n"
  if (JSON.stringify(tautologicalAsserts(checkWant).map((t) => t.line)) !== JSON.stringify([2])) {
    failures.push("this repository's check(name, got, want) after a mutation is the gap")
  }

  const nested = "check('d', JSON.stringify(f(g(a, b))) === JSON.stringify(f(g(a, b))))\n"
  if (sameExpressionAsserts(nested).length !== 1) {
    failures.push('=== is split at depth zero, not at the first equals inside a nested call')
  }

  return failures
}

function walkTests(dir, out = [], unreadable = []) {
  let names
  try { names = readdirSync(dir) }
  catch {
    unreadable.push(relative(ROOT, dir).replace(/\\/g, '/') || 'src')
    return out
  }
  for (const n of names) {
    if (n === 'node_modules') continue
    const full = join(dir, n)
    let st
    try { st = statSync(full) }
    catch { unreadable.push(relative(ROOT, full).replace(/\\/g, '/')); continue }
    if (st.isDirectory()) walkTests(full, out, unreadable)
    else if (n.endsWith('.test.ts')) out.push(full)
  }
  return out
}

export function scanTautologicalAsserts() {
  const unreadable = []
  const abs = walkTests(join(ROOT, 'src'), [], unreadable).sort()
  const files = abs.map((f) => relative(ROOT, f).replace(/\\/g, '/'))
  const hits = []
  const survey = []
  for (let i = 0; i < abs.length; i++) {
    const f = files[i]
    let text
    try { text = readFileSync(abs[i], 'utf8') }
    catch { unreadable.push(f); continue }
    for (const t of sameExpressionAsserts(text)) survey.push({ file: f, ...t })
    for (const t of tautologicalAsserts(text)) hits.push({ file: f, ...t })
  }
  return { files, unreadable, hits, survey }
}

const isMain = process.argv[1] && process.argv[1].endsWith('assert-tautology.mjs')
if (isMain) {
  const failures = selfTest()
  if (failures.length > 0) {
    console.error('assert:tautology:check FAIL — PREDICATE SELF-TEST FAILED — the gate cannot be trusted')
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
  }

  const { files, unreadable, hits, survey } = scanTautologicalAsserts()
  const problems = []
  if (files.length === 0) {
    problems.push('found 0 test files, so this check proves nothing')
  }
  for (const f of unreadable) {
    problems.push(`${f}: could not be read — UNMEASURED, not clean; a file the check cannot open makes no claims and must not count as clean`)
  }
  for (const h of hits) {
    problems.push(`${h.file}:${h.line}: ${h.text}  — same expression after a mutation in the same body`)
  }

  console.log(`assert:tautology:check — ${files.length} test file(s), ${survey.length} same-expression assert(s), ${hits.length} after a mutation`)
  for (const p of problems) console.error(`  ✗ ${p}`)
  if (problems.length > 0) {
    console.error(`assert:tautology:check FAIL — ${problems.length} problem(s)`)
    process.exit(1)
  }
  console.log(`assert:tautology:check ok — ${survey.length} same-expression assert(s), 0 after a mutation (predicate self-test passed)`)
}
