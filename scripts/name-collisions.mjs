#!/usr/bin/env node
/**
 * Two modules may not start declaring the same exported name.
 *
 * This exists because the same defect turned up twice in two days, both times
 * under an `as any` cast that had been keeping the compiler quiet:
 *
 *   a432.system.ts and a432.index.ts each declare a class A432System and export
 *   an instance called a432System, and BOTH assign window.a432System. Whichever
 *   module loads second wins, and a consumer gets that one.
 *
 *   a432.block.chain.ts and a432.block.chain.event.ts each declare an interface
 *   A432Block, with different fields. Reading the wrong one's documentation
 *   while looking at the other one's value is how I spent twenty minutes
 *   convinced a UI was rendering undefined when it was not.
 *
 * A collision is two modules DECLARING the same exported name. A re-export is
 * not a collision — `export { X } from './y.ts'` is one definition reached by
 * two paths, which is the normal way a barrel works — so only declarations are
 * counted, read from the syntax tree rather than matched in the text.
 *
 * Sixty exist. Demanding sixty essays today would be a way of never starting,
 * so the file records them all with the modules that declare them, and the
 * check's job is that NO NEW ONE APPEARS and none of the recorded ones changes
 * shape underneath. A recorded collision with a reason is reviewed; one without
 * is merely known, and the report says how many of each — the same distinction
 * description:check makes about the npm description's claims.
 *
 *   npm run collisions:check
 *   npm run collisions:seed    record the current set
 */

import ts from 'typescript'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DECL = join(ROOT, 'scripts', 'name-collisions.json')
const SEED = process.argv.includes('--seed')

const files = execSync('git ls-files "src/**/*.ts"', { cwd: ROOT, encoding: 'utf8' })
  .trim().split('\n')
  .filter((f) => f && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'))

/** The names a file DECLARES and exports. Re-exports are not declarations. */
function declaredExports(file) {
  let src
  try { src = readFileSync(join(ROOT, file), 'utf8') } catch { return [] }
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true)
  const out = []
  const exported = (n) => n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  sf.forEachChild((n) => {
    if (!exported(n)) return
    if (ts.isClassDeclaration(n) && n.name) out.push(n.name.text)
    else if (ts.isInterfaceDeclaration(n)) out.push(n.name.text)
    else if (ts.isTypeAliasDeclaration(n)) out.push(n.name.text)
    else if (ts.isEnumDeclaration(n)) out.push(n.name.text)
    else if (ts.isFunctionDeclaration(n) && n.name) out.push(n.name.text)
    else if (ts.isVariableStatement(n)) {
      for (const d of n.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) out.push(d.name.text)
      }
    }
  })
  return out
}

const byName = new Map()
let declaredCount = 0
for (const f of files) {
  for (const name of declaredExports(f)) {
    declaredCount += 1
    if (!byName.has(name)) byName.set(name, [])
    byName.get(name).push(f)
  }
}
const live = new Map()
for (const [name, where] of byName) {
  if (where.length > 1) live.set(name, [...where].sort())
}

const recorded = existsSync(DECL) ? JSON.parse(readFileSync(DECL, 'utf8')) : { collisions: {} }

if (SEED) {
  const next = {}
  for (const [name, where] of [...live].sort(([a], [b]) => a.localeCompare(b))) {
    const before = recorded.collisions?.[name]
    next[name] = { files: where, ...(before?.reason ? { reason: before.reason } : {}) }
  }
  writeFileSync(DECL, JSON.stringify({ collisions: next }, null, 2) + '\n')
  console.log(`collisions:seed recorded ${Object.keys(next).length} name(s) to scripts/name-collisions.json`)
  process.exit(0)
}

const problems = []
const known = recorded.collisions ?? {}
for (const [name, where] of live) {
  const entry = known[name]
  if (!entry) {
    problems.push(`${name} is declared by ${where.length} modules and is not recorded: ${where.join(', ')}`)
    continue
  }
  const same = entry.files.length === where.length && entry.files.every((f, i) => f === where[i])
  if (!same) {
    problems.push(`${name} is recorded in [${entry.files.join(', ')}] but is now declared in [${where.join(', ')}]`)
  }
}
// A recorded collision that no longer exists is a stale entry, not a pass.
for (const name of Object.keys(known)) {
  if (!live.has(name)) problems.push(`${name} is recorded as a collision but is now declared in one module — delete the entry`)
}

const reviewed = Object.values(known).filter((e) => e.reason).length
console.log(
  `collisions:check — ${declaredCount} declared exports across ${files.length} modules; `
  + `${live.size} name(s) declared by more than one, ${reviewed} of them with a recorded reason`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`collisions:check FAIL — ${problems.length} problem(s); if the new name is deliberate, npm run collisions:seed and give it a reason`)
  process.exit(1)
}
console.log('collisions:check ok — no module started declaring a name another module already declares')
