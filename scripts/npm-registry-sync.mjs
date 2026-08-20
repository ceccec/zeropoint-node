#!/usr/bin/env node
/**
 * Reconcile the npm registry to `npm-deprecations.json`.
 *
 * Deprecating a version used to be a sentence in a chat log: someone was told
 * to run `npm deprecate`, and whether they did, and with what wording, was
 * recoverable only from a shell history. Twice in one session a deprecation
 * reported as done had not reached the registry at all. That is not a task for
 * a person or a model to remember — it is a declared state and a diff.
 *
 * The declaration lives in `npm-deprecations.json`. This script reads the
 * registry, computes the difference, and either reports it or applies it. No
 * judgement is exercised at run time; everything it will do is written down
 * and reviewable in the repository.
 *
 *   npm run registry:check     diff only, no credentials, exit 1 on drift
 *   npm run registry:apply     apply the diff (needs a write-capable token)
 *   npm run registry:test      self-test: prove the diff can report drift
 *
 * AUTHENTICATION. `npm deprecate` is a write. This account is 2FA
 * `auth-and-writes`, so an interactive token fails with EOTP and OIDC trusted
 * publishing is publish-scoped and will not authorise it. Applying therefore
 * needs an npm **automation** token (automation tokens are exempt from 2FA) in
 * NODE_AUTH_TOKEN / the NPM_TOKEN repository secret. Without one, `--check`
 * still works and still fails on drift, so the gap stays visible.
 *
 * SAFETY RAILS, enforced here rather than trusted to the caller:
 *   - never deprecate the version on dist-tags.latest
 *   - never deprecate a version that is not published
 *   - refuse a declaration covering every published version
 *   - undeprecate anything deprecated but no longer declared, so the file is
 *     the whole truth rather than an append-only log
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const REGISTRY = 'https://registry.npmjs.org'

const MODE = process.argv.includes('--apply')
  ? 'apply'
  : process.argv.includes('--self-test')
    ? 'self-test'
    : 'check'

/** The declared state. */
function declaration(path = resolve(ROOT, 'npm-deprecations.json')) {
  const d = JSON.parse(readFileSync(path, 'utf8'))
  if (typeof d.package !== 'string' || !Array.isArray(d.deprecate)) {
    throw new Error('npm-deprecations.json needs a "package" string and a "deprecate" array')
  }
  for (const e of d.deprecate) {
    if (typeof e.version !== 'string' || typeof e.reason !== 'string' || e.reason.trim() === '') {
      throw new Error(`each deprecate entry needs a version and a non-empty reason: ${JSON.stringify(e)}`)
    }
  }
  return d
}

/** Live registry state. Read from the document, never from a caching client. */
async function registryState(pkg) {
  const res = await fetch(`${REGISTRY}/${encodeURIComponent(pkg)}`, {
    headers: { accept: 'application/json', 'cache-control': 'no-cache' },
  })
  if (!res.ok) throw new Error(`registry returned ${res.status} for ${pkg}`)
  const doc = await res.json()
  const versions = new Map()
  for (const [v, meta] of Object.entries(doc.versions ?? {})) {
    versions.set(v, typeof meta.deprecated === 'string' ? meta.deprecated : null)
  }
  return { versions, latest: doc['dist-tags']?.latest ?? null, modified: doc.time?.modified ?? null }
}

/**
 * The difference between declared and live. Pure: no network, no side effects,
 * so the self-test can drive it with fabricated states.
 */
export function diff(decl, state) {
  const problems = []
  const toDeprecate = []
  const toUndeprecate = []
  const wanted = new Map(decl.deprecate.map((e) => [e.version, e.reason]))

  if (wanted.size > 0 && wanted.size >= state.versions.size) {
    problems.push(
      `declaration covers ${wanted.size} of ${state.versions.size} published versions — refusing to deprecate everything`,
    )
  }

  for (const [version, reason] of wanted) {
    if (!state.versions.has(version)) {
      problems.push(`${version} is declared but not published`)
      continue
    }
    if (version === state.latest) {
      problems.push(`${version} is dist-tags.latest — refusing to deprecate the current release`)
      continue
    }
    const live = state.versions.get(version)
    if (live !== reason) toDeprecate.push({ version, reason, live })
  }

  for (const [version, live] of state.versions) {
    if (live !== null && !wanted.has(version)) toUndeprecate.push({ version, live })
  }

  return { toDeprecate, toUndeprecate, problems }
}

function npmDeprecate(pkg, version, message) {
  execFileSync('npm', ['deprecate', `${pkg}@${version}`, message], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

// ---------------------------------------------------------------- self-test
if (MODE === 'self-test') {
  const decl = { package: 'p', deprecate: [{ version: '1.0.0', reason: 'why' }] }
  const st = (entries, latest) => ({ versions: new Map(entries), latest, modified: null })
  const cases = [
    {
      name: 'missing deprecation is reported',
      d: decl,
      s: st([['1.0.0', null], ['1.0.1', null]], '1.0.1'),
      want: (r) => r.toDeprecate.length === 1 && r.toDeprecate[0].version === '1.0.0',
    },
    {
      name: 'wrong wording is reported',
      d: decl,
      s: st([['1.0.0', 'stale text'], ['1.0.1', null]], '1.0.1'),
      want: (r) => r.toDeprecate.length === 1 && r.toDeprecate[0].live === 'stale text',
    },
    {
      name: 'already correct is silent',
      d: decl,
      s: st([['1.0.0', 'why'], ['1.0.1', null]], '1.0.1'),
      want: (r) => r.toDeprecate.length === 0 && r.toUndeprecate.length === 0 && r.problems.length === 0,
    },
    {
      name: 'undeclared deprecation is undeprecated',
      d: decl,
      s: st([['1.0.0', 'why'], ['1.0.1', 'not declared']], '1.0.2'),
      want: (r) => r.toUndeprecate.length === 1 && r.toUndeprecate[0].version === '1.0.1',
    },
    {
      name: 'refuses to deprecate latest',
      d: decl,
      s: st([['1.0.0', null], ['1.0.1', null]], '1.0.0'),
      want: (r) => r.problems.some((p) => p.includes('dist-tags.latest')),
    },
    {
      name: 'refuses an unpublished version',
      d: decl,
      s: st([['1.0.1', null], ['1.0.2', null]], '1.0.2'),
      want: (r) => r.problems.some((p) => p.includes('not published')),
    },
    {
      name: 'refuses to deprecate everything',
      d: { package: 'p', deprecate: [{ version: '1.0.0', reason: 'a' }, { version: '1.0.1', reason: 'b' }] },
      s: st([['1.0.0', null], ['1.0.1', null]], '1.0.1'),
      want: (r) => r.problems.some((p) => p.includes('refusing to deprecate everything')),
    },
  ]
  let failed = 0
  for (const c of cases) {
    const r = diff(c.d, c.s)
    if (c.want(r)) console.log('  ✓ ' + c.name)
    else { failed++; console.log('  ✗ ' + c.name + ' — ' + JSON.stringify(r)) }
  }
  if (failed > 0) { console.error(`registry:test FAIL — ${failed}/${cases.length}`); process.exit(1) }
  console.log(`registry:test ok — ${cases.length} cases, 6 of them drift the diff must report`)
  process.exit(0)
}

// ------------------------------------------------------------ check / apply
const decl = declaration()
let state
try {
  state = await registryState(decl.package)
} catch (err) {
  // No silent pass on an unmeasurable surface: say so and fail.
  console.error(`registry:${MODE} could not read the registry — ${err.message}`)
  process.exit(1)
}

const { toDeprecate, toUndeprecate, problems } = diff(decl, state)

console.log(`registry:${MODE} ${decl.package} — ${state.versions.size} versions, latest ${state.latest}`)
console.log(`  registry last modified ${state.modified}`)
for (const p of problems) console.error(`  PROBLEM ${p}`)

if (toDeprecate.length === 0 && toUndeprecate.length === 0 && problems.length === 0) {
  console.log('  in sync — every declared deprecation is live, and nothing else is deprecated')
  process.exit(0)
}

for (const d of toDeprecate) {
  console.log(`  deprecate   ${d.version}  ${d.live === null ? '(currently not deprecated)' : '(wording differs)'}`)
}
for (const u of toUndeprecate) console.log(`  undeprecate ${u.version}  (deprecated but not declared)`)

if (MODE === 'check') {
  console.error(`registry:check FAIL — ${toDeprecate.length + toUndeprecate.length} version(s) out of sync with npm-deprecations.json`)
  process.exit(1)
}

if (problems.length > 0) {
  console.error('registry:apply refused — resolve the problems above first')
  process.exit(1)
}

let applied = 0
for (const d of toDeprecate) {
  npmDeprecate(decl.package, d.version, d.reason)
  console.log(`  applied deprecate ${d.version}`)
  applied++
}
for (const u of toUndeprecate) {
  npmDeprecate(decl.package, u.version, '')
  console.log(`  applied undeprecate ${u.version}`)
  applied++
}
console.log(`registry:apply ok — ${applied} change(s)`)
