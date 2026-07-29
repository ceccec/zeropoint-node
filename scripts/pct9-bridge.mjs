#!/usr/bin/env node
/**
 * Bridge inline %9 digital-root patterns + named local digitalRoot bodies → legacyDigitalRoot.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const A432 = join(fileURLToPath(new URL('.', import.meta.url)), '../src/0/3/6/9/1/2/4/8/7/5/1')
const SKIP = new Set(['a432.roots.ts', 'a432.algebra.ts'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(p)
  }
  return out
}

function ensureRootsImport(src) {
  if (/from\s+['"]\.\/a432\.roots\.ts['"]/.test(src)) {
    if (!/legacyDigitalRoot/.test(src.match(/import\s*\{[^}]*\}\s*from\s*['"]\.\/a432\.roots\.ts['"]/)?.[0] ?? '')) {
      return src.replace(
        /import\s*\{([^}]*)\}\s*from\s*['"]\.\/a432\.roots\.ts['"]/,
        (_, names) => {
          const set = new Set(
            names
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          )
          set.add('legacyDigitalRoot')
          return `import { ${[...set].sort().join(', ')} } from './a432.roots.ts'`
        },
      )
    }
    return src
  }
  const m = src.match(/^(\s*\/\*\*[\s\S]*?\*\/\s*)/)
  const line = `import { legacyDigitalRoot } from './a432.roots.ts'\n`
  if (m) return m[1] + line + src.slice(m[1].length)
  return line + src
}

/** Replace classic %9 digital-root expressions with legacyDigitalRoot(expr) */
function rewritePct9(src) {
  let s = src
  // n % 9 || 9
  s = s.replace(/\b([a-zA-Z_][\w.]*)\s*%\s*9\s*\|\|\s*9\b/g, 'legacyDigitalRoot($1)')
  // (n % 9) || 9
  s = s.replace(/\(\s*([a-zA-Z_][\w.]*)\s*%\s*9\s*\)\s*\|\|\s*9\b/g, 'legacyDigitalRoot($1)')
  // n % 9 === 0 ? 9 : n % 9
  s = s.replace(
    /\b([a-zA-Z_][\w.]*)\s*%\s*9\s*===\s*0\s*\?\s*9\s*:\s*\1\s*%\s*9\b/g,
    'legacyDigitalRoot($1)',
  )
  // sum % 9 === 0 ? 9 : sum % 9 (same)
  s = s.replace(
    /\((\s*[a-zA-Z_][\w.]*)\s*%\s*9\s*===\s*0\s*\?\s*9\s*:\s*\1\s*%\s*9\s*\)/g,
    'legacyDigitalRoot($1)',
  )
  return s
}

/** Replace function bodies that hand-roll digital root with return legacyDigitalRoot(n) */
function rewriteNamedBodies(src) {
  return src.replace(
    /((?:(?:public|private|protected|static|async|export)\s+)*function\s+(?:calculate)?[Dd]igitalRoot\s*\(\s*([a-zA-Z_][\w]*)\s*(?::\s*[^=)]+)?\)\s*\{)([\s\S]*?)(\n\s*\})/g,
    (full, head, arg, body, close) => {
      if (/legacyDigitalRoot|harmonicRoot12|kernelDigitalRoot/.test(body) && body.trim().split('\n').length <= 3) {
        return full // already bridge-ish
      }
      if (!/%\s*9|while\s*\(/.test(body)) return full
      return `${head}\n    return legacyDigitalRoot(${arg})\n  ${close.trim()}`
    },
  )
}

/** private/static method forms */
function rewriteMethodBodies(src) {
  return src.replace(
    /((?:(?:public|private|protected|static)\s+)+)((?:calculate)?[Dd]igitalRoot)\s*\(\s*([a-zA-Z_][\w]*)\s*(?::\s*[^=)]+)?\)\s*\{([\s\S]*?)(\n\s*\})/g,
    (full, mods, name, arg, body, close) => {
      if (/legacyDigitalRoot|harmonicRoot12/.test(body) && !/%\s*9|while\s*\(/.test(body)) return full
      if (!/%\s*9|while\s*\(/.test(body)) return full
      return `${mods}${name}(${arg}: number) {\n    return legacyDigitalRoot(${arg})\n  ${close.trim()}`
    },
  )
}

let n = 0
for (const file of walk(A432)) {
  const base = relative(A432, file).replace(/\\/g, '/')
  if (SKIP.has(base)) continue
  let src = readFileSync(file, 'utf8')
  const before = src
  src = rewritePct9(src)
  src = rewriteNamedBodies(src)
  src = rewriteMethodBodies(src)
  if (src !== before) {
    if (/legacyDigitalRoot/.test(src)) src = ensureRootsImport(src)
    writeFileSync(file, src)
    n++
    console.log(base)
  }
}
console.log(`pct9-bridge: ${n} files`)
