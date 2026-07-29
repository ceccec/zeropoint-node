#!/usr/bin/env node
/**
 * FTL dry-clean: wire numeric orphans to a432.roots / a432.algebra.
 * Illusion: modules that call digitalRoot/abs/… without a spine import.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const A432 = join(fileURLToPath(new URL('.', import.meta.url)), '../src/0/3/6/9/1/2/4/8/7/5/1')
const SKIP = new Set([
  'a432.roots.ts',
  'a432.algebra.ts',
  'a432.math.ts',
  'a432.core.ts',
])
const SPINE_OK = /a432\.(roots|algebra|math|core|utils|os\.math)\.ts/
const NEEDS_ROOT =
  /\bdigitalRoot\b|\bharmonicRoot12\b|\blegacyDigitalRoot\b|%\s*9/
const NEEDS_ALG = /\b(abs|floor|ceil|round|min|max|sin|cos|tan|sqrt|pow|log|hypot|imul|unitFromSeed|indexFromSeed|PI|TAU)\b/

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(p)
  }
  return out
}

function inject(src, line) {
  if (src.includes(line.trim())) return src
  const m = src.match(/^(\s*\/\*\*[\s\S]*?\*\/\s*)/)
  if (m) return m[1] + line + src.slice(m[1].length)
  return line + src
}

let n = 0
for (const file of walk(A432)) {
  const base = relative(A432, file).replace(/\\/g, '/')
  if (SKIP.has(base)) continue
  let src = readFileSync(file, 'utf8')
  if (SPINE_OK.test(src)) continue
  const needRoot = NEEDS_ROOT.test(src)
  const needAlg = NEEDS_ALG.test(src)
  if (!needRoot && !needAlg) continue

  if (needRoot) {
    src = inject(src, `import { legacyDigitalRoot as digitalRoot, harmonicRoot12 } from './a432.roots.ts'\n`)
    // if file already had unbound digitalRoot calls, binding is now correct
  }
  if (needAlg) {
    // collect which names appear
    const names = []
    for (const name of [
      'PI',
      'TAU',
      'abs',
      'floor',
      'ceil',
      'round',
      'min',
      'max',
      'sin',
      'cos',
      'tan',
      'sqrt',
      'pow',
      'log',
      'hypot',
      'imul',
      'unitFromSeed',
      'indexFromSeed',
    ]) {
      if (new RegExp(`\\b${name}\\b`).test(src)) names.push(name)
    }
    if (names.length) {
      src = inject(src, `import { ${names.sort().join(', ')} } from './a432.algebra.ts'\n`)
    }
  }
  writeFileSync(file, src)
  n++
  console.log(base)
}
console.log(`orphan-wire: ${n} files`)
