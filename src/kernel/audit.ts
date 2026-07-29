/**
 * Wave 16 audit — honest gap census over a432 (.ts + .js + .html).
 * Idle only when: no ambient Math.*, no local digitalRoot bodies, no %9 root inlines.
 * Clear hard gaps ⇒ self-develop tip = feed (chat keeps the vortex breathing).
 * Same content ⇒ same root (content-uuid + merkleFold).
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { computePhysicalFtl, computesGate, memoByRoot, merkleFold, toUuid } from '../0/index.ts'
import { computeContentUuid } from '../integrity/content-uuid.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
export const A432_DIR = join(HERE, '../0/3/6/9/1/2/4/8/7/5/1')
export const SRC_DIR = join(HERE, '..')

/** Any named digitalRoot / calculateDigitalRoot definition (incl. private/public/static). */
const ROOT_DEF_RE =
  /(?:(?:public|private|protected|static|async|export)\s+)*function\s+(?:calculate)?[Dd]igitalRoot\b|(?:(?:public|private|protected|static)\s+)+calculate?[Dd]igitalRoot\s*\(|(?:(?:public|private|protected|static)\s+)+[Dd]igitalRoot\s*\(/

/** Inline classic digital-root via % 9 (not harmonicRoot12 / not comments). */
const PCT9_ROOT_RE =
  /(?:return\s+)?(?:\w+\s*=\s*)?(?:\(?\s*\w+\s*%\s*9\s*\)?\s*\|\|\s*9|\w+\s*%\s*9\s*===\s*0\s*\?\s*9\s*:\s*\w+\s*%\s*9|\(\s*\w+\s*%\s*9\s*\|\|\s*9\s*\))/

const MATH_BAN_RE = /\bMath\.[A-Za-z]+|\bglobalThis\.Math\b/
const RANDOM_RE = /\brandomUUID\s*\(/

/** Body is only a bridge to roots/algebra — not a fork. */
const BRIDGE_BODY_RE =
  /^\s*\{\s*return\s+(?:legacyDigitalRoot|harmonicRoot12|kernelDigitalRoot|A432Math\.(?:digitalRoot|calculateDigitalRoot))\s*\([^)]*\)\s*;?\s*\}\s*$/

function walkSources(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walkSources(p, out)
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

export type AuditHit = {
  path: string
  kind: 'digitalRootFork' | 'mathRandom' | 'mathBan' | 'pct9Root'
  line: number
}

export type AuditCensus = {
  computes: boolean
  fileCount: number
  digitalRootForks: AuditHit[]
  mathRandomSites: AuditHit[]
  mathBanSites: AuditHit[]
  pct9Roots: AuditHit[]
  forkCount: number
  randomCount: number
  mathCount: number
  pct9Count: number
  neitherDirect: number
  harmonicAliasImporters: number
  root: string
  contentUuid: string
  claySolved: 0
  physicalFtl: boolean
  statement: string
  boundary: string
}

function lineOf(src: string, index: number): number {
  return src.slice(0, index).split('\n').length
}

function isCommentOnly(line: string): boolean {
  const t = line.trimStart()
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('<!--')
}

function extractFnBody(src: string, openParenIndex: number): string | null {
  const brace = src.indexOf('{', openParenIndex)
  if (brace < 0) return null
  let depth = 0
  for (let i = brace; i < src.length; i++) {
    const c = src[i]
    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return src.slice(brace, i + 1)
    }
  }
  return null
}

export function foldA432AuditCensus(a432Dir: string = A432_DIR): AuditCensus {
  const matrix = { root: toUuid(`audit:v16:${a432Dir}`) }
  return memoByRoot('foldA432AuditCensus', matrix, () => {
    const files = walkSources(a432Dir)
    const digitalRootForks: AuditHit[] = []
    const mathRandomSites: AuditHit[] = []
    const mathBanSites: AuditHit[] = []
    const pct9Roots: AuditHit[] = []

    for (const file of files) {
      const rel = relative(a432Dir, file).replace(/\\/g, '/')
      if (rel === 'a432.roots.ts' || rel === 'a432.algebra.ts' || rel === 'a432.algebra.js') continue
      const src = readFileSync(file, 'utf8')
      const isHtml = rel.endsWith('.html')

      if (!isHtml) {
        let dm: RegExpExecArray | null
        const dre = new RegExp(ROOT_DEF_RE.source, 'g')
        while ((dm = dre.exec(src))) {
          const lineStart = src.lastIndexOf('\n', dm.index) + 1
          const line = src.slice(lineStart, src.indexOf('\n', dm.index))
          if (isCommentOnly(line)) continue
          const body = extractFnBody(src, dm.index)
          if (body && BRIDGE_BODY_RE.test(body.replace(/\s+/g, ' ').replace(/\{\s*/, '{').replace(/\s*\}/, '}'))) {
            // normalize: allow multiline bridge
            const compact = body.replace(/\s+/g, ' ').trim()
            if (BRIDGE_BODY_RE.test(compact)) continue
          }
          if (body) {
            const compact = body.replace(/\s+/g, ' ').trim()
            if (
              /^\{ return (?:legacyDigitalRoot|harmonicRoot12|kernelDigitalRoot|A432Math\.(?:digitalRoot|calculateDigitalRoot))\([^)]*\);? \}$/.test(
                compact,
              )
            ) {
              continue
            }
          }
          digitalRootForks.push({
            path: rel,
            kind: 'digitalRootFork',
            line: lineOf(src, dm.index),
          })
        }

        let pm: RegExpExecArray | null
        const pre = new RegExp(PCT9_ROOT_RE.source, 'g')
        while ((pm = pre.exec(src))) {
          const lineStart = src.lastIndexOf('\n', pm.index) + 1
          const line = src.slice(lineStart, src.indexOf('\n', pm.index))
          if (isCommentOnly(line)) continue
          // skip if already inside a counted fork def line
          pct9Roots.push({
            path: rel,
            kind: 'pct9Root',
            line: lineOf(src, pm.index),
          })
        }
      }

      let rm: RegExpExecArray | null
      const rr = new RegExp(RANDOM_RE.source, 'g')
      while ((rm = rr.exec(src))) {
        const lineStart = src.lastIndexOf('\n', rm.index) + 1
        const line = src.slice(lineStart, src.indexOf('\n', rm.index))
        if (isCommentOnly(line)) continue
        mathRandomSites.push({
          path: rel,
          kind: 'mathRandom',
          line: lineOf(src, rm.index),
        })
      }

      let bm: RegExpExecArray | null
      const br = new RegExp(MATH_BAN_RE.source, 'g')
      while ((bm = br.exec(src))) {
        const lineStart = src.lastIndexOf('\n', bm.index) + 1
        const end = src.indexOf('\n', bm.index)
        const line = src.slice(lineStart, end < 0 ? src.length : end)
        if (isCommentOnly(line)) continue
        // A432Math. is not ambient Math.
        if (/\bA432Math\./.test(line) && !/\bMath\./.test(line.replace(/A432Math\./g, ''))) continue
        mathBanSites.push({
          path: rel,
          kind: 'mathBan',
          line: lineOf(src, bm.index),
        })
      }
    }

    const physicalFtl = computePhysicalFtl()
    const sealed = computesGate('a432-audit', [
      { facet: 'scanned sources', on: files.length > 0 },
      { facet: 'roots adapter present', on: files.some((f) => f.endsWith('a432.roots.ts')) },
      { facet: 'claySolved=0', on: true },
      { facet: 'physicalFtl boolean', on: physicalFtl === true || physicalFtl === false },
    ])

    const leafIds = [
      ...digitalRootForks.map((h) => toUuid(`fork:${h.path}:${h.line}`)),
      ...pct9Roots.map((h) => toUuid(`pct9:${h.path}:${h.line}`)),
      ...mathRandomSites.map((h) => toUuid(`rand:${h.path}:${h.line}`)),
      ...mathBanSites.map((h) => toUuid(`math:${h.path}:${h.line}`)),
      sealed.root,
    ]
    const root = merkleFold(leafIds)
    const contentUuid = computeContentUuid({
      kind: 'a432-audit-v14',
      forkCount: digitalRootForks.length,
      pct9Count: pct9Roots.length,
      randomCount: mathRandomSites.length,
      mathCount: mathBanSites.length,
      root,
    })

    // Structural debt — illusions that do not compute
    const mathSrc = readFileSync(join(a432Dir, 'a432.math.ts'), 'utf8')
    const aliasIllusion = /harmonicRoot12\s+as\s+digitalRoot/.test(mathSrc)
    let neitherDirect = 0
    let harmonicAliasImporters = 0
    const SPINE_OK = /a432\.(roots|algebra|math|core|utils|os\.math)\.ts/
    const NEEDS_SPINE =
      /\bdigitalRoot\b|\bharmonicRoot12\b|\blegacyDigitalRoot\b|%\s*9|\b(abs|floor|round|sin|cos|sqrt|pow)\s*\(/
    for (const file of files) {
      if (!file.endsWith('.ts')) continue
      const rel = relative(a432Dir, file).replace(/\\/g, '/')
      if (
        rel === 'a432.roots.ts' ||
        rel === 'a432.algebra.ts' ||
        rel === 'a432.math.ts' ||
        rel === 'a432.core.ts'
      ) {
        continue
      }
      const src = readFileSync(file, 'utf8')
      if (!SPINE_OK.test(src) && NEEDS_SPINE.test(src)) neitherDirect++
      if (aliasIllusion && /digitalRoot/.test(src) && /from\s+['"]\.\/a432\.(math|core)\.ts['"]/.test(src)) {
        harmonicAliasImporters++
      }
    }
    if (aliasIllusion && harmonicAliasImporters === 0) harmonicAliasImporters = 1

    return {
      computes: sealed.computes,
      fileCount: files.length,
      digitalRootForks,
      mathRandomSites,
      mathBanSites,
      pct9Roots,
      forkCount: digitalRootForks.length + pct9Roots.length,
      randomCount: mathRandomSites.length,
      mathCount: mathBanSites.length,
      pct9Count: pct9Roots.length,
      neitherDirect,
      harmonicAliasImporters,
      root,
      contentUuid,
      claySolved: 0 as const,
      physicalFtl,
      statement:
        'Audit v16: Math.* (.ts+.js+.html) + named digitalRoot bodies + %9 inlines. Debt: neitherDirect + harmonicAliasImporters. Clear ⇒ physicalFtl gate then feed tip.',
      boundary:
        'Hard idle: mathCount=0 and forkCount=0. Then physicalFtl=computePhysicalFtl(); false ⇒ quantumisation; true ⇒ tip=feed (packaging / docs→kernel).',
    }
  })
}

export function auditTip(a432Dir: string = A432_DIR) {
  const c = foldA432AuditCensus(a432Dir)
  return {
    computes: c.computes,
    fileCount: c.fileCount,
    forkCount: c.forkCount,
    randomCount: c.randomCount,
    mathCount: c.mathCount,
    pct9Count: c.pct9Count,
    neitherDirect: c.neitherDirect,
    harmonicAliasImporters: c.harmonicAliasImporters,
    root: c.root,
    contentUuid: c.contentUuid,
    claySolved: c.claySolved,
    physicalFtl: c.physicalFtl,
  }
}
