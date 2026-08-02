/**
 * scan — the one filesystem/AST layer every tool shares.
 *
 * Before this, `walk`, the skip-set and `ts.createSourceFile` were duplicated
 * across ratchet.mjs, prose-claims.mjs and src/kernel/lobes.ts, and the ratchet
 * alone walked src/ five times and parsed it three times per run. Same tree,
 * same bytes, three parses.
 *
 * DRY — one walk, one skip-set, one parse.
 * AGNOSTIC — nothing here knows what a "claim" or a "lobe" is; callers supply
 *   predicates and patterns. Every constant lives in zeropoint.config.json.
 * SPEED — parseTs() memoises by path+mtime+size, so N surfaces over the same
 *   tree cost one parse, not N.
 * SECURITY — config paths are confined to the repository (resolveInside), files
 *   are size-capped before reading, and patterns are compiled once from config
 *   rather than built from interpolated input.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

let cachedConfig = null

/** Load and validate zeropoint.config.json once. Missing file is fatal. */
export function config() {
  if (cachedConfig) return cachedConfig
  const p = join(ROOT, 'zeropoint.config.json')
  if (!existsSync(p)) throw new Error(`scan: missing ${relative(ROOT, p)}`)
  const raw = JSON.parse(readFileSync(p, 'utf8'))
  for (const key of ['skipDirs', 'source', 'prose', 'lobes', 'limits']) {
    if (!raw[key]) throw new Error(`scan: config is missing "${key}"`)
  }
  cachedConfig = raw
  return raw
}

/**
 * Confine a configured path to the repository.
 *
 * Config is trusted-ish, but a scanner that follows `../../..` out of the tree
 * is a traversal primitive. Callers that legitimately read siblings (the lobe
 * reader) pass their own base explicitly rather than going through this.
 */
export function resolveInside(relPath, base = ROOT) {
  const abs = resolve(base, relPath)
  if (abs !== base && !abs.startsWith(base + sep)) {
    throw new Error(`scan: "${relPath}" escapes ${base}`)
  }
  return abs
}

/** One walk. `pred` receives the basename; skip-set comes from config. */
export function walk(dir, pred, { skipDirs = config().skipDirs, out = [] } = {}) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (skipDirs.includes(name)) continue
    const p = join(dir, name)
    let st
    try {
      st = statSync(p)
    } catch {
      continue // vanished mid-walk; not our problem to report
    }
    if (st.isDirectory()) walk(p, pred, { skipDirs, out })
    else if (pred(name)) out.push(p)
  }
  return out
}

/** Every source file the config designates, deduped. */
export function sourceFiles(cfg = config()) {
  const { roots, extensions, excludeSuffixes } = cfg.source
  const pred = (n) =>
    extensions.some((e) => n.endsWith(e)) && !excludeSuffixes.some((s) => n.endsWith(s))
  const seen = new Set()
  for (const r of roots) for (const f of walk(resolveInside(r), pred)) seen.add(f)
  return [...seen].sort()
}

/** Read with a size cap — a scanner must not be a memory-exhaustion vector. */
export function readCapped(file, maxBytes = config().limits.maxFileBytes) {
  const st = statSync(file)
  if (st.size > maxBytes) return null
  return readFileSync(file, 'utf8')
}

const astCache = new Map()

/**
 * Parse a .ts file once per (path, mtime, size). Returns null if the file is
 * over the size cap, so callers must handle a skip rather than assume a tree.
 */
export function parseTs(file) {
  const st = statSync(file)
  const key = `${file}:${st.mtimeMs}:${st.size}`
  const hit = astCache.get(key)
  if (hit !== undefined) return hit
  const text = readCapped(file)
  const parsed = text === null ? null : ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  astCache.set(key, parsed)
  return parsed
}

/** Relative-import targets of a source file, resolved to real .ts paths. */
export function importTargets(file, source = parseTs(file)) {
  if (!source) return []
  const out = []
  const add = (spec) => {
    if (!spec?.startsWith('.')) return
    let target = resolve(dirname(file), spec)
    if (!existsSync(target)) target = target.replace(/\.js$/, '.ts')
    if (existsSync(target) && target.endsWith('.ts')) out.push(target)
  }
  const visit = (n) => {
    if (ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier)) add(n.moduleSpecifier.text)
    if (ts.isExportDeclaration(n) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
      add(n.moduleSpecifier.text)
    }
    if (
      ts.isCallExpression(n) &&
      n.expression.kind === ts.SyntaxKind.ImportKeyword &&
      n.arguments[0] &&
      ts.isStringLiteral(n.arguments[0])
    ) {
      add(n.arguments[0].text)
    }
    ts.forEachChild(n, visit)
  }
  visit(source)
  return out
}

/** Compile a config-supplied pattern once, with a clear error if it is bad. */
export function compile(pattern, flags = 'i') {
  try {
    return new RegExp(pattern, flags)
  } catch (err) {
    throw new Error(`scan: bad pattern ${JSON.stringify(pattern)} — ${err.message}`)
  }
}

export { ts }
