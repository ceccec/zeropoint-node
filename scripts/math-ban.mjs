#!/usr/bin/env node
/**
 * math-ban — fail if any non-comment Math.* remains under src/ (.ts + .html).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const MATH_RE = /\bMath\.[A-Za-z]+|\bglobalThis\.Math\b/g

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (
      (name.endsWith('.ts') && !name.endsWith('.d.ts')) ||
      name.endsWith('.html')
    ) {
      out.push(p)
    }
  }
  return out
}

function isCommentOnly(line) {
  const t = line.trimStart()
  return (
    t.startsWith('//') ||
    t.startsWith('*') ||
    t.startsWith('/*') ||
    t.startsWith('<!--')
  )
}

const hits = []
for (const file of walk(SRC)) {
  const src = readFileSync(file, 'utf8')
  const lines = src.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (isCommentOnly(line)) continue
    // A432Math. is not ambient Math
    const stripped = line.replace(/A432Math\./g, '')
    MATH_RE.lastIndex = 0
    if (MATH_RE.test(stripped)) {
      hits.push(`${relative(ROOT, file)}:${i + 1}: ${line.trim()}`)
    }
  }
}

if (hits.length) {
  console.error(`math-ban FAIL: ${hits.length} Math.* hit(s) under src/ (.ts+.html)`)
  for (const h of hits.slice(0, 80)) console.error('  ' + h)
  if (hits.length > 80) console.error(`  … ${hits.length - 80} more`)
  process.exit(1)
}

console.log('math-ban ok 0')
