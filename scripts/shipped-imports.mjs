/**
 * Every bare import in shipped source must be declared in the manifest.
 *
 * a432.vbm.animation.ts imported three; three was a devDependency; the file
 * ships in the tarball; the package declared no runtime dependencies. A
 * consumer reaching that module got source importing something they were never
 * given. It was unreachable through `exports`, so nothing failed — it was one
 * entry away from failing, and no gate would have said so.
 *
 * This is the general form. `files` says what ships; every non-relative,
 * non-builtin import in those files must appear under dependencies,
 * peerDependencies or optionalDependencies. devDependencies do NOT count: they
 * are not installed for a consumer, which is the whole defect.
 *
 *   npm run shipped:imports
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { builtinModules } from 'node:module'

const ROOT = join(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const declared = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.optionalDependencies ?? {}),
])
const builtin = new Set(builtinModules)

function walk(d, out = []) {
  for (const n of readdirSync(d)) {
    const f = join(d, n)
    if (statSync(f).isDirectory()) walk(f, out)
    else if (n.endsWith('.ts')) out.push(f)
  }
  return out
}
// `files` ships src/**/*.ts wholesale, tests included.
const shipped = walk(join(ROOT, 'src'))

const problems = []
let bare = 0
for (const f of shipped) {
  const rel = relative(ROOT, f).replace(/\\/g, '/')
  const src = readFileSync(f, 'utf8')
  for (const m of src.matchAll(/^\s*import\s+(?:type\s+)?[^'"]*from\s+['"]([^'"]+)['"]/gm)) {
    const spec = m[1]
    if (spec.startsWith('.') || spec.startsWith('/')) continue
    if (spec.startsWith('node:') || builtin.has(spec.split('/')[0])) continue
    bare++
    const name = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0]
    if (!declared.has(name)) {
      problems.push(`${rel} imports "${name}", which ships and is not declared as a dependency, peer or optional`)
    }
  }
}

console.log(`shipped:imports — ${shipped.length} shipped source file(s); ${bare} bare import(s); ${declared.size} declared package(s)`)
if (problems.length > 0) {
  for (const p of problems) console.error(`  ✗ ${p}`)
  console.error(`shipped:imports FAIL — ${problems.length} shipped file(s) import something a consumer is never given.`)
  console.error('  Declare it, stop shipping the file, or take the dependency out of the surface.')
  process.exit(1)
}
console.log('shipped:imports ok — every bare import in shipped source is a package a consumer actually receives')
