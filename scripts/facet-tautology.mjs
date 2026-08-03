#!/usr/bin/env node
/**
 * facet-tautology — flag boolean claims that cannot be false.
 *
 * Imported from lobe Heaven's law
 * `theFacetTautologyGatePredicateCatchesGeZeroConjunctsSparesRangeChecks`
 * (ceccec.github.io). The law's predicate: split a claim expression on `&&`
 * and flag each bare `X >= 0` conjunct that has no upper-bound sibling. A
 * genuine range (`X >= 0 && X < N`) is spared, because the upper bound makes
 * `>= 0` refutable. Each conjunct is scanned separately, so a tautology
 * cannot shelter beside a real check.
 *
 * Why this repo needs it: `verifyAllDimensions` reported the Rodin flow ring
 * as a verified dimension on the strength of `registerIdx >= 0` — true of
 * every register that exists. The suite passed. Nothing measured the claim,
 * because a claim that cannot fail reads exactly like one that always holds.
 *
 * Scope — only where the code STATES something, not every comparison:
 *   - `on:` in an object literal that also carries `facet:`  (fold facets)
 *   - arguments to console.assert / assert                    (test claims)
 *   - returns and const initialisers inside functions named
 *     verify* / prove* / check* / computes* / is* / has*      (predicates)
 *
 * A loop guard (`i >= 0`) or an array index is not a claim and is not scanned.
 *
 *   npm run tautology         list every unfalsifiable claim with file:line
 *   npm run tautology:check   exit 1 if the count exceeds the ratchet ceiling
 *
 * Like prose-claims, this flags a SHAPE and a human decides. False positives
 * are expected; the ratchet ceiling is what keeps it useful rather than noisy.
 */

import { ts, walk, readCapped, ROOT } from './lib/scan.mjs'
import { join, relative } from 'node:path'

const CLAIM_FN = /^(verify|prove|check|computes|is|has)[A-Z_]/

/**
 * THE REUSABLE PREDICATE — returns the tautology conjuncts in a claim
 * expression (empty = clean). Ported from the law, same semantics.
 */
export function tautologyConjuncts(onExpr) {
  const conjuncts = onExpr.split('&&').map((s) => s.trim())
  return conjuncts.filter((c) => {
    // a bare `X >= 0` conjunct, X an identifier / call / property chain
    const m = c.match(/^([\w.]+(?:\([^)]*\))?(?:\.\w+)*)\s*>=\s*0$/)
    if (!m) return false
    const lhs = m[1].replace(/[.()]/g, '\\$&')
    // an `X < N` / `X <= N` sibling makes this a range test, which is legit
    const hasUpperBound = conjuncts.some(
      (o) => o !== c && new RegExp('^' + lhs + '\\s*(<|<=)').test(o),
    )
    return !hasUpperBound
  })
}

/** Collect the claim expressions in one file, with their line numbers. */
function claimsIn(file, src) {
  const claims = []
  const add = (node) => {
    const text = node.getText(src).replace(/\s+/g, ' ')
    const line = src.getLineAndCharacterOfPosition(node.getStart(src)).line + 1
    claims.push({ text, line })
  }

  // Is this node inside a function whose NAME declares it a predicate?
  const inClaimFn = (node) => {
    for (let p = node.parent; p; p = p.parent) {
      const name =
        (ts.isFunctionDeclaration(p) || ts.isMethodDeclaration(p)) && p.name
          ? p.name.getText(src)
          : ts.isVariableDeclaration(p) && p.name
            ? p.name.getText(src)
            : null
      if (name && CLAIM_FN.test(name)) return true
    }
    return false
  }

  const visit = (node) => {
    // fold facets: { facet: '...', on: <claim> }
    if (ts.isObjectLiteralExpression(node)) {
      const hasFacet = node.properties.some(
        (p) => p.name && p.name.getText(src).replace(/['"]/g, '') === 'facet',
      )
      if (hasFacet) {
        for (const p of node.properties) {
          if (
            ts.isPropertyAssignment(p) &&
            p.name.getText(src).replace(/['"]/g, '') === 'on'
          ) {
            add(p.initializer)
          }
        }
      }
    }

    // test claims: console.assert(<claim>, ...) / assert(<claim>, ...)
    if (ts.isCallExpression(node)) {
      const callee = node.expression.getText(src)
      if ((callee === 'console.assert' || callee === 'assert') && node.arguments[0]) {
        add(node.arguments[0])
      }
    }

    // predicate bodies: returns and const initialisers inside verify*/is*/...
    if (ts.isReturnStatement(node) && node.expression && inClaimFn(node)) {
      add(node.expression)
    }
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      inClaimFn(node) &&
      /(>=|&&)/.test(node.initializer.getText(src))
    ) {
      add(node.initializer)
    }

    ts.forEachChild(node, visit)
  }
  visit(src)
  return claims
}

export function scanTautologies() {
  const hits = []
  const files = walk(join(ROOT, 'src'), (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))
  for (const file of files) {
    const text = readCapped(file)
    if (text === null) continue
    const src = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
    for (const { text: claim, line } of claimsIn(file, src)) {
      for (const conjunct of tautologyConjuncts(claim)) {
        hits.push({
          file: relative(ROOT, file).replace(/\\/g, '/'),
          line,
          conjunct,
          claim: claim.length > 120 ? claim.slice(0, 117) + '…' : claim,
        })
      }
    }
  }
  return hits
}

/**
 * Self-verification, using the law's own cases. A gate whose predicate is
 * wrong is worse than no gate: it reports clean and nothing checks it.
 */
export function selfTest() {
  const cases = [
    ['circleCloses && inversionIsInvolution && patents >= 0', 1, 'catches a tautology beside real checks'],
    ['streams.count >= 0', 1, 'catches a bare count'],
    ['answer.links.length >= 0', 1, 'catches a property chain'],
    ['bearingToHinge >= 0 && bearingToHinge < 360', 0, 'spares a genuine range'],
    ['circleCloses && inversionIsInvolution && inverseClosure', 0, 'spares real checks'],
    ['distanceToHingeKm >= 0 && bearingToHinge >= 0 && bearingToHinge < 360', 1, 'catches one hiding beside a range'],
    // this repo's own case, as it stood before the fix
    ['!!this.preparedState && this.preparedState.registerIdx >= 0', 1, 'catches the Rodin dimension tautology'],
  ]
  const failures = []
  for (const [expr, expected, label] of cases) {
    const got = tautologyConjuncts(expr).length
    if (got !== expected) failures.push(`${label}: expected ${expected}, got ${got} — ${expr}`)
  }
  return failures
}

const isMain = process.argv[1] && process.argv[1].endsWith('facet-tautology.mjs')
if (isMain) {
  const failures = selfTest()
  if (failures.length > 0) {
    console.error('facet-tautology: PREDICATE SELF-TEST FAILED — the gate cannot be trusted')
    for (const f of failures) console.error('  ' + f)
    process.exit(1)
  }

  const hits = scanTautologies()
  if (hits.length === 0) {
    console.log('facet-tautology ok 0 (predicate self-test passed; no unfalsifiable claims in src)')
    process.exit(0)
  }
  console.log(`facet-tautology: ${hits.length} claim(s) that cannot be false`)
  for (const h of hits.slice(0, 40)) {
    console.log(`  ${h.file}:${h.line}: ${h.conjunct}   in: ${h.claim}`)
  }
  if (hits.length > 40) console.log(`  … ${hits.length - 40} more`)
  process.exit(process.argv.includes('--check') ? 1 : 0)
}
