#!/usr/bin/env node
/**
 * Run a jest-style test file that nothing else runs.
 *
 * src/multidimensional-vortex-framework.test.ts has 399 lines and 122 expect()
 * calls, uses describe/beforeEach/expect, and jest IS a dependency — but no
 * script in package.json, the gate, or CI ever executed it. It sat outside LEAN,
 * reachable from no entry, which is how it was found.
 *
 * A test file that never runs is worse than no test file: it looks like
 * coverage. This one disagreed with its implementation in 7 places the first
 * time it was ever executed.
 *
 * This is a minimal harness rather than a jest configuration because jest would
 * need a TypeScript transform to handle .ts import specifiers, and the whole
 * repository otherwise runs tests as plain node scripts. The matchers here are
 * only the ones this file uses; an unknown matcher throws rather than silently
 * passing, which is the failure mode that matters — a matcher that does nothing
 * turns a red test green.
 *
 *   node scripts/jest-lite.mjs <file>   run it, exit 1 on any failure
 *   --count                             print "passed failed" and exit 0
 */

import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

let passed = 0
const failures = []
let suite = ''
let befores = []

globalThis.describe = (name, body) => {
  const parent = suite
  const saved = befores.slice()
  suite = parent ? `${parent} > ${name}` : name
  body()
  befores = saved
  suite = parent
}
globalThis.beforeEach = (fn) => befores.push(fn)
globalThis.it = globalThis.test = (name, body) => {
  try {
    for (const b of befores) b()
    body()
    passed++
  } catch (e) {
    failures.push(`${suite} > ${name}: ${String(e.message).split('\n')[0].slice(0, 120)}`)
  }
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const show = (v) => { try { return JSON.stringify(v) } catch { return String(v) } }
const build = (a, negated) => {
  const assert = (ok, msg) => {
    if (negated ? !ok : ok) return
    throw new Error(negated ? `expected NOT ${msg}` : msg)
  }
  const m = {
    toBe: (b) => assert(Object.is(a, b), `expected ${show(b)}, got ${show(a)}`),
    toEqual: (b) => assert(same(a, b), `expected ${show(b)}, got ${show(a)}`),
    toBeCloseTo: (b, p = 2) => assert(Math.abs(a - b) < Math.pow(10, -p) / 2, `expected ~${b}, got ${a}`),
    toBeGreaterThan: (b) => assert(a > b, `expected > ${b}, got ${a}`),
    toBeGreaterThanOrEqual: (b) => assert(a >= b, `expected >= ${b}, got ${a}`),
    toBeLessThan: (b) => assert(a < b, `expected < ${b}, got ${a}`),
    toBeLessThanOrEqual: (b) => assert(a <= b, `expected <= ${b}, got ${a}`),
    toBeDefined: () => assert(a !== undefined, 'expected defined'),
    toBeUndefined: () => assert(a === undefined, `expected undefined, got ${show(a)}`),
    toBeNull: () => assert(a === null, `expected null, got ${show(a)}`),
    toBeTruthy: () => assert(!!a, `expected truthy, got ${show(a)}`),
    toBeFalsy: () => assert(!a, `expected falsy, got ${show(a)}`),
    toContain: (b) => assert(!!a && a.includes?.(b), `expected to contain ${show(b)}`),
    toHaveLength: (b) => assert((a?.length ?? -1) === b, `expected length ${b}, got ${a?.length}`),
    toHaveProperty: (b) => assert(a !== null && typeof a === 'object' && b in a, `expected property ${b}`),
    toBeInstanceOf: (C) => assert(a instanceof C, `expected instance of ${C?.name}`),
    toThrow: () => {
      let threw = false
      try { a() } catch { threw = true }
      assert(threw, 'expected to throw')
    },
  }
  if (!negated) m.not = build(a, true)
  return m
}
globalThis.expect = (a) => {
  const m = build(a, false)
  // An unknown matcher must be loud. A missing matcher that returns undefined
  // is an assertion that cannot fail, which is how a red test goes green.
  return new Proxy(m, {
    get(t, k) {
      if (k in t) return t[k]
      if (typeof k === 'symbol') return undefined
      throw new Error(`jest-lite has no matcher "${String(k)}" — add it rather than skipping the assertion`)
    },
  })
}

const target = process.argv.find((a) => a.endsWith('.ts') || a.endsWith('.js'))
if (!target) {
  console.error('usage: node scripts/jest-lite.mjs <test file> [--count]')
  process.exit(2)
}
await import(pathToFileURL(resolve(target)).href)

if (process.argv.includes('--count')) {
  console.log(`${passed} ${failures.length}`)
  process.exit(0)
}
console.log(`jest-lite ${target.split('/').pop()} — ${passed} passed, ${failures.length} failed`)
for (const f of failures) console.error(`  ✗ ${f}`)
process.exit(failures.length > 0 ? 1 : 0)
