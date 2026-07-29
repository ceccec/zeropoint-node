#!/usr/bin/env node
/**
 * math-ban — fail if any non-comment Math.* remains on computing surfaces.
 * Scans: src/, public/, deployment/, and repo-root demos (.ts/.js/.html).
 * Skips non-sources: node_modules, .git, coverage, dist (gitignored rollup out),
 * docs (generated projections), scripts (tooling that must name Math in patterns).
 * Committed shipping surfaces (public/, deployment/) must be clean — fail closed.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const PUBLIC = join(ROOT, 'public')
const DEPLOYMENT = join(ROOT, 'deployment')
const MATH_RE = /\bMath\.[A-Za-z]+|\bglobalThis\.Math\b/g
/** Directory names never walked (anywhere in the tree). */
const SKIP_DIR = new Set([
  'node_modules',
  'dist',
  'docs',
  'scripts',
  'coverage',
  '.git',
  '.cursor',
  '.claude',
])

/** Paths that implement algebra itself — comments may name Math.*; bodies must stay free. */
const ALLOW_FILES = new Set([
  'src/0/algebra.ts',
  'src/0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts',
  'src/0/3/6/9/1/2/4/8/7/5/1/a432.algebra.js',
])

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (
      (name.endsWith('.ts') && !name.endsWith('.d.ts')) ||
      name.endsWith('.js') ||
      name.endsWith('.html')
    ) {
      out.push(p)
    }
  }
  return out
}

/** Root demos only — do not recurse into coverage/deployment/etc. */
function walkRootDemos(out = []) {
  for (const name of readdirSync(ROOT)) {
    if (SKIP_DIR.has(name) || name === 'src' || name === 'public' || name === 'deployment') {
      continue
    }
    const p = join(ROOT, name)
    if (!statSync(p).isFile()) continue
    if (
      (name.endsWith('.ts') && !name.endsWith('.d.ts')) ||
      name.endsWith('.js') ||
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
    t.startsWith('<!--') ||
    t.startsWith('#')
  )
}

const uniq = [
  ...new Set([
    ...walk(SRC),
    ...walk(PUBLIC),
    ...walk(DEPLOYMENT),
    ...walkRootDemos(),
  ]),
]

const hits = []
for (const file of uniq) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  if (ALLOW_FILES.has(rel)) continue
  const src = readFileSync(file, 'utf8')
  const lines = src.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (isCommentOnly(line)) continue
    const stripped = line.replace(/A432Math\./g, '')
    MATH_RE.lastIndex = 0
    if (MATH_RE.test(stripped)) {
      hits.push(`${rel}:${i + 1}: ${line.trim()}`)
    }
  }
}

if (hits.length) {
  console.error(`math-ban FAIL: ${hits.length} Math.* hit(s)`)
  for (const h of hits.slice(0, 80)) console.error('  ' + h)
  if (hits.length > 80) console.error(`  … ${hits.length - 80} more`)
  process.exit(1)
}

console.log('math-ban ok 0 (src + public + deployment + root demos; dist gitignored)')
