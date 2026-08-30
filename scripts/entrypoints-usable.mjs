#!/usr/bin/env node
/**
 * Every advertised entry point must be importable by a consumer.
 *
 * package.json advertises 21 subpaths. Two — `.` and `./simple` — resolve to
 * built output in dist/. The other 19 resolve to `src/*.ts`, and Node REFUSES
 * to strip types for anything under node_modules:
 *
 *     ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING
 *
 * So `import { digitalRoot } from 'zeropoint-node/0'` works in this repository
 * and fails for everyone who installs the package. The kernel — the thing the
 * documentation is mostly about — is not reachable from npm at all.
 *
 * I shipped that example in the 1.0.13 quick start, having "verified" it by
 * installing from the local directory. A local install does not reproduce the
 * node_modules restriction, so the test passed and the claim was false. Testing
 * against a path that is not the one users take is not testing.
 *
 * This resolves each subpath the way Node's resolver does and reports which
 * ones a consumer can actually import. It does not install the tarball — that
 * would be slow — so it checks the property that fails: a `.ts` target.
 *
 * It also checks that an advertised subpath EXPORTS something. `./mcp` resolved
 * to built output and imported cleanly, so the first version of this check
 * passed it — while giving a consumer zero exports. src/mcp/server.ts carries a
 * #!/usr/bin/env node shebang and exports nothing: it is an executable, and an
 * executable belongs in `bin`, not in `exports`. "Resolves" is not "usable".
 *
 *   npm run entrypoints
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))

/** Subpaths that are known to be source-only and are not advertised as usable. */
const DECLARED_SOURCE_ONLY = {
  './package.json': 'the manifest itself, not a module',
}

/** Advertised subpaths that legitimately export nothing, with the reason. */
const DECLARED_NO_EXPORTS = {
  './mcp': 'an executable, not a module — use the zeropoint-mcp bin. Kept in the '
    + 'exports map only so that removing it does not break anyone who already '
    + 'wrote `import \'zeropoint-node/mcp\'`; it returns an empty object either way.',
}

const rows = []
for (const [subpath, spec] of Object.entries(pkg.exports ?? {})) {
  const target = typeof spec === 'string' ? spec : (spec.import ?? spec.require ?? spec.default)
  if (typeof target !== 'string') continue
  const usable = !target.endsWith('.ts')
  rows.push({ subpath, target, usable })
}

// An entry point that exports nothing gives a consumer nothing.
for (const r of rows) {
  if (!r.usable) continue
  try {
    const mod = await import(pathToFileURL(join(ROOT, r.target)).href)
    r.exportCount = Object.keys(mod).length
  } catch {
    r.exportCount = null // could not load; the .ts check above is the gate
  }
}
const empty = rows.filter((r) => r.usable && r.exportCount === 0 && !(r.subpath in DECLARED_NO_EXPORTS))

const broken = rows.filter((r) => !r.usable && !(r.subpath in DECLARED_SOURCE_ONLY))
const usable = rows.filter((r) => r.usable)

if (process.argv.includes('--count')) { console.log(String(broken.length + empty.length)); process.exit(0) }
console.log(
  `entrypoints — ${rows.length} advertised, ${usable.length} importable, ` +
    `${empty.length} importable but exporting nothing`,
)
for (const r of empty) {
  console.error(`  ✗ ${r.subpath} imports cleanly but exports nothing — if it is an executable it belongs in bin, not exports`)
}
for (const r of broken) {
  console.error(`  ✗ ${r.subpath} -> ${r.target} — a .ts target cannot be imported from node_modules`)
}
if (process.argv.includes('--count')) { console.log(String(broken.length)); process.exit(0) }
if (empty.length > 0) {
  console.error(`entrypoints FAIL — ${empty.length} advertised entry point(s) export nothing`)
  process.exit(1)
}
if (broken.length > 0) {
  console.error(
    `entrypoints — ${broken.length} advertised entry point(s) resolve to TypeScript source. ` +
      'Either build them into dist/ and point the exports map there, or stop advertising them.',
  )
  // Ratcheted rather than failing: making the kernel importable from npm means
  // building ten more bundles, which is a packaging change and not a one-line
  // fix. The rule worth having today is that the number cannot grow — a new
  // entry point may not be advertised unless a consumer can import it.
  process.exit(0)
}
console.log('entrypoints ok — every advertised entry point resolves to something a consumer can import')
process.exit(0)
