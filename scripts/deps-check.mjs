#!/usr/bin/env node
/**
 * A runtime dependency must be reachable from something a consumer can import.
 *
 * This package declared four: @hotwired/stimulus, @uuidna/uuidna, express and
 * three. Not one of them was imported by any file reachable from any entry in
 * the `exports` map. `npm i zeropoint-node` therefore downloaded 38MB of
 * packages — six times the 6.6MB the package itself unpacks to — plus express's
 * 28 transitive dependencies, to reach code no consumer could load.
 *
 * They were not unused; they were unreachable. three drives a WebGL animation,
 * express a demo server, stimulus four browser controllers, and @uuidna/uuidna
 * is the third-party adjudicator this repository's own gate runs. All four are
 * needed to build or verify the repository, and none is needed to consume it.
 * That is exactly what devDependencies means.
 *
 * So this check runs in both directions, and the second is the one that keeps
 * the move honest:
 *
 *   DECLARED BUT UNREACHABLE — a dependency no entry point imports. Every
 *   consumer pays to install it and none can reach it.
 *
 *   REACHED BUT UNDECLARED — a bundle imports a package that is not a runtime
 *   dependency. This is the dangerous direction: it works here, where the
 *   package is installed as a devDependency, and throws MODULE_NOT_FOUND for
 *   the consumer. Moving a dependency to devDependencies is safe only while
 *   something checks this.
 *
 * Reachability follows relative imports out of each entry point, because rollup
 * splits shared code into chunks and an entry may import its dependency two
 * files away. Node built-ins and self-references are not dependencies.
 *
 * Import specifiers are read from the syntax tree, not matched in the text. A
 * regex over these bundles reported that `u` and a fragment of a closing brace
 * were undeclared dependencies: this package embeds source text in its own
 * output, so `from '...'` occurs inside string literals that import nothing.
 *
 *   npm run deps:check
 */

import ts from 'typescript'
import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { builtinModules } from 'node:module'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const declared = Object.keys(pkg.dependencies ?? {})
const BUILTIN = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)])

/** The bare package name of an import specifier, or null if it is not one. */
function packageOf(spec) {
  if (spec.startsWith('.') || spec.startsWith('/')) return null
  if (BUILTIN.has(spec) || spec.startsWith('node:')) return null
  const parts = spec.split('/')
  const name = spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
  return name === pkg.name ? null : name
}

/** Every module specifier this file actually imports, per the syntax tree. */
function specifiersOf(file, src) {
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const out = []
  sf.forEachChild(function visit(n) {
    if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) &&
        n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
      out.push(n.moduleSpecifier.text)
    } else if (ts.isCallExpression(n) &&
        (n.expression.kind === ts.SyntaxKind.ImportKeyword ||
         (ts.isIdentifier(n.expression) && n.expression.text === 'require')) &&
        n.arguments.length > 0 && ts.isStringLiteral(n.arguments[0])) {
      out.push(n.arguments[0].text)
    }
    ts.forEachChild(n, visit)
  })
  return out
}

/** Every external package an entry point reaches, following relative chunks. */
function packagesReachedFrom(file, seen = new Set(), found = new Set()) {
  const abs = resolve(ROOT, file)
  if (seen.has(abs)) return found
  seen.add(abs)
  let src
  try { src = readFileSync(abs, 'utf8') } catch { return found }
  for (const spec of specifiersOf(abs, src)) {
    const name = packageOf(spec)
    if (name) { found.add(name); continue }
    if (spec.startsWith('.')) packagesReachedFrom(join(dirname(abs), spec), seen, found)
  }
  return found
}

const entryFiles = []
for (const [name, e] of Object.entries(pkg.exports ?? {})) {
  const targets = typeof e === 'string' ? [e] : [e.import, e.require].filter(Boolean)
  for (const t of targets) if (/\.(js|cjs|mjs)$/.test(t)) entryFiles.push([name, t])
}

const reached = new Map() // package -> entry points that reach it
for (const [name, file] of entryFiles) {
  for (const p of packagesReachedFrom(file)) {
    if (!reached.has(p)) reached.set(p, [])
    reached.get(p).push(name)
  }
}

const problems = []
for (const d of declared) {
  if (!reached.has(d)) {
    problems.push(
      `${d} is a runtime dependency that no entry point imports — every consumer installs it and none can reach it; move it to devDependencies`
    )
  }
}
for (const [p, entries] of reached) {
  if (!declared.includes(p)) {
    problems.push(
      `${p} is imported by ${entries.slice(0, 3).join(', ')} but is not a runtime dependency — it resolves here and throws MODULE_NOT_FOUND for a consumer`
    )
  }
}

console.log(
  `deps:check — ${entryFiles.length} published entry file(s), ` +
  `${declared.length} runtime dependency(ies), ${reached.size} package(s) reached`
)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`deps:check FAIL — ${problems.length} dependency(ies) declared and reachable disagree`)
  process.exit(1)
}
console.log('deps:check ok — every runtime dependency is reachable, and every reached package is declared')
