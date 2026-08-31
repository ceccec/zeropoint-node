#!/usr/bin/env node
/**
 * readme-names — every file and identifier the README names must exist.
 *
 * I verified both of these by hand while working through the README as a
 * specification: the 20 modules its Core Modules section lists, and the
 * functions and constants it names in backticks. Both passed. Checking
 * something by hand and then not encoding it is how the Quick Start came to
 * import five names that did not exist — that was verified by hand too, once,
 * before it drifted.
 *
 * Identifiers are matched against DECLARATIONS from the TypeScript AST, not
 * against the text of src/, so a name that appears only in a comment does not
 * count as existing. docs:functions learned that the hard way.
 *
 *   npm run readme:names
 */
import ts from 'typescript'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (['node_modules', '.git', 'dist', 'coverage'].includes(n)) continue
    const f = join(dir, n)
    statSync(f).isDirectory() ? walk(f, out) : out.push(f)
  }
  return out
}

const allFiles = walk(ROOT)
const byBasename = new Set(allFiles.map((f) => basename(f)))

const declared = new Set()
const collect = (n) => {
  if ((ts.isFunctionDeclaration(n) || ts.isClassDeclaration(n) || ts.isInterfaceDeclaration(n)
    || ts.isTypeAliasDeclaration(n) || ts.isEnumDeclaration(n)) && n.name) declared.add(n.name.text)
  if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) declared.add(n.name.text)
  if ((ts.isMethodDeclaration(n) || ts.isMethodSignature(n)) && n.name && ts.isIdentifier(n.name)) declared.add(n.name.text)
  if (ts.isPropertyDeclaration(n) && ts.isIdentifier(n.name)) declared.add(n.name.text)
  if (ts.isPropertyAssignment(n) && ts.isIdentifier(n.name)) declared.add(n.name.text)
  ts.forEachChild(n, collect)
}
for (const f of allFiles) {
  if (!f.endsWith('.ts') || f.endsWith('.d.ts') || !f.includes(`${join(ROOT, 'src')}`)) continue
  collect(ts.createSourceFile(f, readFileSync(f, 'utf8'), ts.ScriptTarget.Latest, true))
}

/**
 * Names that are not repository identifiers: CI secrets, environment
 * variables, and anything the README quotes from another system.
 */
const NOT_OURS = new Set(['NPM_TOKEN', 'GITHUB_TOKEN', 'ZENODO_TOKEN', 'NODE_V8_COVERAGE'])

const problems = []

// Files: **`a432.os.ts`** style, and bare `src/...` paths.
const files = new Set()
for (const m of readme.matchAll(/\*\*`([A-Za-z0-9._/-]+\.(?:ts|md|json|js|mjs))`\*\*/g)) files.add(m[1])
for (const f of files) {
  if (existsSync(join(ROOT, f)) || byBasename.has(basename(f))) continue
  problems.push(`names the file ${f}, which does not exist`)
}

// Identifiers: `someFunction()` and `SOME_CONSTANT`.
const names = new Set()
for (const m of readme.matchAll(/`([A-Za-z_$][A-Za-z0-9_$]*)\(\)`/g)) names.add(m[1])
for (const m of readme.matchAll(/`([A-Z][A-Z0-9_]{3,})`/g)) names.add(m[1])
for (const n of names) {
  if (NOT_OURS.has(n) || declared.has(n)) continue
  problems.push(`names ${n}, which src/ does not declare`)
}

console.log(`readme:names — ${files.size} file(s) and ${names.size} identifier(s) named by the README`)
if (problems.length > 0) {
  for (const p of problems) console.error(`  ✗ README ${p}`)
  console.error(`readme:names FAIL — ${problems.length} name(s) the README uses do not exist`)
  process.exit(1)
}
console.log('readme:names ok — every file and identifier the README names exists')
process.exit(0)
