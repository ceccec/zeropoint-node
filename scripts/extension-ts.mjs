#!/usr/bin/env node
/**
 * Mass-refactor: add .ts to extensionless relative imports/exports under src/.
 * Related to algebra/strip-types spine — Node --experimental-strip-types needs .ts.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC = join(ROOT, 'src')

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(p)
  }
  return out
}

function resolveSpec(fromFile, spec) {
  if (!spec.startsWith('.')) return null
  if (/\.(ts|tsx|js|mjs|cjs|json|css|svg|wasm|node)$/i.test(spec)) return null
  const base = join(dirname(fromFile), spec)
  if (existsSync(base + '.ts')) return spec + '.ts'
  if (existsSync(join(base, 'index.ts'))) return spec.replace(/\/?$/, '') + '/index.ts'
  // missing target — leave alone (broken or external)
  return null
}

const SPEC_RE =
  /((?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+|))(['"])(\.[^'"]+)\2/g

let files = 0
let specs = 0
for (const file of walk(SRC)) {
  let src = readFileSync(file, 'utf8')
  let changed = false
  const next = src.replace(SPEC_RE, (full, prefix, quote, spec) => {
    const resolved = resolveSpec(file, spec)
    if (!resolved) return full
    changed = true
    specs++
    return `${prefix}${quote}${resolved}${quote}`
  })
  // also: export * from '...'; side-effect import '...'
  const next2 = next.replace(
    /((?:import|export)\s*\*\s*from\s+)(['"])(\.[^'"]+)\2/g,
    (full, prefix, quote, spec) => {
      const resolved = resolveSpec(file, spec)
      if (!resolved) return full
      changed = true
      specs++
      return `${prefix}${quote}${resolved}${quote}`
    },
  )
  const next3 = next2.replace(/(import\s+)(['"])(\.[^'"]+)\2/g, (full, prefix, quote, spec) => {
    // side-effect only if no { or * already handled — skip if looks like import x from
    if (/from\s+$/.test(prefix)) return full
    const resolved = resolveSpec(file, spec)
    if (!resolved) return full
    // only pure side-effect: import './x'
    if (prefix.trim() !== 'import') return full
    changed = true
    specs++
    return `${prefix}${quote}${resolved}${quote}`
  })
  if (changed) {
    writeFileSync(file, next3)
    files++
    console.log(relative(ROOT, file))
  }
}
console.log(`extensionless→.ts: ${files} files, ${specs} specs`)
