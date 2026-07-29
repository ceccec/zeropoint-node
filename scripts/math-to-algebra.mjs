#!/usr/bin/env node
/**
 * One-shot codemod: replace Math.* under src/ with src/0 algebra.
 * Run: node scripts/math-to-algebra.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const ALGEBRA_FILE = join(SRC, '0', 'algebra.ts')
const A432_ALGEBRA = join(SRC, '0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts')
const INDEX_0 = join(SRC, '0', 'index.ts')

const MEMBERS = [
  'imul',
  'abs',
  'sign',
  'floor',
  'ceil',
  'round',
  'min',
  'max',
  'sin',
  'cos',
  'tan',
  'sqrt',
  'hypot',
  'pow',
  'log',
  'exp',
  'PI',
  'E',
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(p)
  }
  return out
}

function relImport(fromFile, toFile) {
  let rel = relative(dirname(fromFile), toFile).replace(/\\/g, '/')
  if (!rel.startsWith('.')) rel = './' + rel
  return rel
}

function stripCommentLinesForDetect(src) {
  return src
    .split('\n')
    .map((l) => {
      const t = l.trimStart()
      if (t.startsWith('//')) return ''
      return l
    })
    .join('\n')
}

function rewriteFile(file) {
  if (file === ALGEBRA_FILE || file === A432_ALGEBRA) return false
  let src = readFileSync(file, 'utf8')
  const detect = stripCommentLinesForDetect(src)
  if (!/\bMath\./.test(detect) && !/\bglobalThis\.Math\b/.test(detect)) return false

  const relPath = relative(SRC, file).replace(/\\/g, '/')
  let randI = 0
  const used = new Set()

  // floor(random()*N) / round(random()*N) patterns → indexFromSeed
  src = src.replace(
    /\bMath\.floor\s*\(\s*Math\.random\s*\(\s*\)\s*\*\s*([^)]+?)\)/g,
    (_, len) => {
      used.add('indexFromSeed')
      const seed = `${relPath}:fri:${randI++}`
      return `indexFromSeed(${JSON.stringify(seed)}, (${len})|0 || 1)`
    },
  )
  src = src.replace(
    /\bMath\.round\s*\(\s*Math\.random\s*\(\s*\)\s*\*\s*([^)]+?)\)/g,
    (_, len) => {
      used.add('indexFromSeed')
      const seed = `${relPath}:rri:${randI++}`
      return `indexFromSeed(${JSON.stringify(seed)}, (${len})|0 || 1)`
    },
  )

  src = src.replace(/\bMath\.random\s*\(\s*\)/g, () => {
    used.add('unitFromSeed')
    const seed = `${relPath}:rnd:${randI++}`
    return `unitFromSeed(${JSON.stringify(seed)})`
  })

  for (const m of MEMBERS) {
    const re = new RegExp(`\\bMath\\.${m}\\b`, 'g')
    if (re.test(src)) {
      used.add(m)
      src = src.replace(re, m)
    }
  }

  src = src.replace(/\bglobalThis\.Math\b/g, () => {
    used.add('PI') // force import surface
    return '({ PI, sin, cos, abs, floor, round, min, max, sqrt, pow, imul, unitFromSeed, indexFromSeed })'
  })

  if (used.size === 0) return false

  // Choose import target
  let importPath
  if (file === INDEX_0) {
    // index already imports algebra — only ensure names
    importPath = null
  } else if (file.includes(`${join('0', '3', '6', '9', '1', '2', '4', '8', '7', '5', '1')}`) || file.includes('0/3/6/9/1/2/4/8/7/5/1')) {
    importPath = './a432.algebra.ts'
  } else if (file.startsWith(join(SRC, '0'))) {
    importPath = relImport(file, ALGEBRA_FILE)
  } else {
    importPath = relImport(file, ALGEBRA_FILE)
  }

  if (importPath) {
    const names = [...used].sort().join(', ')
    const importLine = `import { ${names} } from '${importPath}'\n`
    // merge with existing a432.algebra / algebra import
    const existing = src.match(
      /import\s*\{([^}]*)\}\s*from\s*['"](\.\/a432\.algebra\.ts|\.\.\/.*algebra\.ts)['"]\s*/m,
    )
    if (existing) {
      const prev = existing[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      const merged = [...new Set([...prev, ...used])].sort().join(', ')
      src = src.replace(existing[0], `import { ${merged} } from '${existing[2]}'\n`)
    } else {
      // after first block comment or at top
      const m = src.match(/^(\s*\/\*\*[\s\S]*?\*\/\s*)/)
      if (m) src = m[1] + importLine + src.slice(m[1].length)
      else src = importLine + src
    }
  }

  writeFileSync(file, src)
  return true
}

let n = 0
for (const f of walk(SRC)) {
  if (rewriteFile(f)) {
    n++
    console.log('rewrote', relative(ROOT, f))
  }
}
console.log(`math-to-algebra: ${n} files`)
