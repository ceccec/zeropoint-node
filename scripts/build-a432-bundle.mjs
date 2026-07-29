#!/usr/bin/env node
/**
 * Rebuild public/a432.bundle.js from algebra-clean a432.main.ts, then strip
 * any vendor Math.* (Stimulus) that appears before algebra is defined in the IIFE.
 * dist/ remains gitignored rollup output — sources under src/ stay the gate.
 *
 * --check: rebuild to a temp file; fail if public/a432.bundle.js would drift.
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const ENTRY = join(ROOT, 'src/0/3/6/9/1/2/4/8/7/5/1/a432.main.ts')
const PUBLIC_OUT = join(ROOT, 'public/a432.bundle.js')
const CHECK = process.argv.includes('--check')
const OUT = CHECK
  ? join(tmpdir(), `a432.bundle.check.${process.pid}.js`)
  : PUBLIC_OUT

const build = spawnSync(
  'npx',
  [
    'esbuild',
    ENTRY,
    '--bundle',
    `--outfile=${OUT}`,
    '--format=iife',
    '--platform=browser',
    '--target=es2020',
    '--log-limit=0',
  ],
  { cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32' },
)
if (build.status !== 0) {
  console.error(build.stderr || build.stdout)
  process.exit(build.status || 1)
}

let src = readFileSync(OUT, 'utf8')
// Vendor (Stimulus) may emit Math.max before algebra is in scope — inline, no Math.
src = src.replace(
  /\bMath\.max\s*\(([^,]+),\s*([^)]+)\)/g,
  '((a,b)=>a>b?a:b)($1,$2)',
)
src = src.replace(
  /\bMath\.min\s*\(([^,]+),\s*([^)]+)\)/g,
  '((a,b)=>a<b?a:b)($1,$2)',
)
src = src.replace(/\bMath\.abs\s*\(/g, '((n)=>n<0?-n:n)(')
src = src.replace(/\bMath\.round\s*\(/g, '((n)=>((m)=>m-m%1-(m<0&&m%1?1:0))(n+0.5))(')
src = src.replace(/\bMath\.PI\b/g, '(355/113)')
src = src.replace(/\bMath\.sin\b/g, 'sin')
src = src.replace(/\bMath\.cos\b/g, 'cos')
src = src.replace(/\bMath\.floor\b/g, 'floor')
src = src.replace(/\bMath\.ceil\b/g, 'ceil')
src = src.replace(/\bMath\.sqrt\b/g, 'sqrt')
src = src.replace(/\bMath\.pow\b/g, 'pow')
src = src.replace(/\bMath\.log\b/g, 'log')
src = src.replace(/\bMath\.exp\b/g, 'exp')
src = src.replace(/\bMath\.E\b/g, 'E')
src = src.replace(/\bglobalThis\.Math\b/g, 'void 0 /* Math banned */')

if (/\bMath\.[A-Za-z]+|\bglobalThis\.Math\b/.test(src)) {
  const lines = src.split('\n')
  const hits = []
  for (let i = 0; i < lines.length; i++) {
    if (/\bMath\.[A-Za-z]+|\bglobalThis\.Math\b/.test(lines[i])) {
      hits.push(`${i + 1}: ${lines[i].trim()}`)
    }
  }
  console.error('build-a432-bundle: residual Math.* after strip:')
  for (const h of hits.slice(0, 20)) console.error('  ' + h)
  if (CHECK && existsSync(OUT)) unlinkSync(OUT)
  process.exit(1)
}

if (CHECK) {
  if (!existsSync(PUBLIC_OUT)) {
    console.error('bundle:a432 check: public/a432.bundle.js missing — run npm run bundle:a432')
    unlinkSync(OUT)
    process.exit(1)
  }
  const current = readFileSync(PUBLIC_OUT, 'utf8')
  unlinkSync(OUT)
  if (current !== src) {
    console.error('bundle:a432 check: public/a432.bundle.js drifted from a432.main.ts — run npm run bundle:a432')
    process.exit(1)
  }
  console.log('bundle:a432 check ok')
  process.exit(0)
}

writeFileSync(OUT, src)
console.log('build-a432-bundle ok → public/a432.bundle.js')
