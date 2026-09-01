/**
 * pipeline — what `npm run check` actually executes.
 *
 * Two scripts needed to know this and both answered it with a hand-written
 * list. Both lists drifted. The ratchet's roots list was missing three of the
 * four suites test:security runs, so post-quantum-crypto.test.ts counted as
 * dead weight while executing on every gate run; its own comment records the
 * repair, and then coverage-audit repeated the mistake in its own copy.
 *
 * A list that restates package.json will drift again, so package.json is read
 * instead. `check` is expanded through its `npm run` references and the file
 * arguments of every `node` invocation are collected.
 *
 * DO NOT FOLD THE test:* SCRIPTS INTO ONE RUNNER. There are 26 of them and the
 * `check` chain is 75 steps, so collapsing them into `npm run test:suites`
 * looks like obvious tidying. Measured: it takes this derivation from 31 suites
 * to 0, because the paths would move inside a runner script where the expansion
 * cannot see them. That silently breaks two things at once — the ratchet's
 * reachability roots, so 31 test files become "reachable from no entry", and
 * coverage-audit's completeness guard, which has nothing left to compare its
 * EXERCISERS against. The scripts are not duplication; they are the
 * declaration this file reads.
 *
 * This does NOT claim to be everything that runs: a script may import or spawn
 * further modules of its own (the ratchet runs the framework suite internally,
 * the a432 property suite reaches its modules by directory walk). It is the
 * set the pipeline NAMES, which is exactly the set a hand-written copy of the
 * pipeline was trying and failing to track.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/** Every `npm run` body reachable from `name`, inlined into one string. */
export function expandScript(pkg, name, seen = new Set()) {
  if (seen.has(name)) return ''
  seen.add(name)
  const body = pkg.scripts?.[name]
  if (!body) return ''
  return body.replace(/npm run ([A-Za-z0-9:._-]+)/g, (_, n) => ' ' + expandScript(pkg, n, seen) + ' ')
}

/**
 * File arguments of every `node` invocation in the expanded script, in order.
 * Each entry is one invocation's files, so a harness run — `node harness.mjs
 * suite.ts` — arrives as a pair rather than two unrelated paths.
 */
export function pipelineInvocations(root, script = 'check') {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  const text = expandScript(pkg, script)
  const out = []
  for (const m of text.matchAll(/node((?:\s+--[A-Za-z0-9-]+)*)((?:\s+[A-Za-z0-9._/-]+)*)/g)) {
    const files = (m[2] || '').trim().split(/\s+/).filter((a) => /\.(ts|mjs)$/.test(a))
    if (files.length) out.push(files)
  }
  return out
}

/** Flat, de-duplicated set of paths the pipeline names. */
export function pipelineFiles(root, script = 'check') {
  return new Set(pipelineInvocations(root, script).flat())
}

/** Just the TypeScript test suites under src/ that the pipeline runs. */
export function pipelineSrcSuites(root, script = 'check') {
  return [...pipelineFiles(root, script)].filter((f) => f.startsWith('src/') && f.endsWith('.test.ts')).sort()
}
