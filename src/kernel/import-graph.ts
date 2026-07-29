/**
 * Computed import/export self-reference fold.
 *
 * Scans `a432.*` under `src/` → builds the import/export edge graph →
 * content-uuid + merkleFold census. Addresses are computed, never hand-inventoried.
 *
 * "FTL" here = trinity speedup / memoByRoot reuse / one merkle walk —
 * not physical faster-than-light. claySolved=0 · physicalFtl=0.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  computesGate,
  foldPair,
  memoByRoot,
  merge,
  merkleFold,
  toUuid,
} from '../0/index.ts'
import { computeContentUuid } from '../integrity/content-uuid.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const SRC_ROOT = resolve(__dirname, '..')

const IMPORT_RE =
  /(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]/g
const EXPORT_NAMED_RE = /export\s+(?:async\s+)?(?:function|const|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/g
const EXPORT_LIST_RE = /export\s*\{([^}]+)\}/g

export type GraphNode = {
  readonly path: string
  readonly contentUuid: string
  readonly softUuid: string
  readonly imports: readonly string[]
  readonly exports: readonly string[]
}

export type GraphEdge = {
  readonly from: string
  readonly to: string
  readonly receipt: string
}

export type ImportExportCensus = {
  readonly computes: boolean
  readonly fileCount: number
  readonly edgeCount: number
  readonly exportCount: number
  readonly nodes: readonly GraphNode[]
  readonly edges: readonly GraphEdge[]
  readonly exportMap: Readonly<Record<string, readonly string[]>>
  readonly importMap: Readonly<Record<string, readonly string[]>>
  readonly root: string
  readonly contentRoot: string
  readonly statement: string
  readonly boundary: string
  readonly claySolved: 0
  readonly physicalFtl: 0
}

function isA432Source(name: string): boolean {
  return /^a432\./i.test(name) && (name.endsWith('.ts') || name.endsWith('.js'))
}

function walkA432Files(dir: string, out: string[] = []): string[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const name of entries) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue
    const full = join(dir, name)
    let st
    try {
      st = statSync(full)
    } catch {
      continue
    }
    if (st.isDirectory()) walkA432Files(full, out)
    else if (st.isFile() && isA432Source(name)) out.push(full)
  }
  return out
}

function resolveImport(fromFile: string, spec: string): string | null {
  if (spec.startsWith('node:') || (!spec.startsWith('.') && !spec.startsWith('/'))) {
    return `ext:${spec}`
  }
  const base = resolve(dirname(fromFile), spec)
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.js`,
    join(base, 'index.ts'),
    join(base, 'index.js'),
  ]
  for (const c of candidates) {
    try {
      if (statSync(c).isFile()) return relative(SRC_ROOT, c).replace(/\\/g, '/')
    } catch {
      /* try next */
    }
  }
  return relative(SRC_ROOT, base).replace(/\\/g, '/')
}

function parseExports(source: string): string[] {
  const names = new Set<string>()
  for (const m of source.matchAll(EXPORT_NAMED_RE)) names.add(m[1]!)
  for (const m of source.matchAll(EXPORT_LIST_RE)) {
    for (const part of m[1]!.split(',')) {
      const cleaned = part.trim()
      if (!cleaned) continue
      const asMatch = cleaned.match(/^(?:type\s+)?(\S+)\s+as\s+(\S+)$/)
      if (asMatch) names.add(asMatch[2]!)
      else names.add(cleaned.replace(/^type\s+/, '').split(/\s+/)[0]!)
    }
  }
  if (/\bexport\s+default\b/.test(source)) names.add('default')
  return [...names].sort()
}

function parseImports(fromFile: string, source: string): string[] {
  const specs = new Set<string>()
  for (const m of source.matchAll(IMPORT_RE)) {
    const resolved = resolveImport(fromFile, m[1]!)
    if (resolved) specs.add(resolved)
  }
  return [...specs].sort()
}

function rel(path: string): string {
  return relative(SRC_ROOT, path).replace(/\\/g, '/')
}

/** Scan a432.* sources and fold the import/export graph into one census. */
export function foldA432ImportExportGraph(srcRoot: string = SRC_ROOT): ImportExportCensus {
  const matrix = { root: toUuid(`import-graph:${srcRoot}`) }
  return memoByRoot('a432-import-export-graph', matrix, () => {
    const files = walkA432Files(srcRoot).sort()
    const nodes: GraphNode[] = files.map((file) => {
      const source = readFileSync(file, 'utf8')
      const path = rel(file)
      const imports = parseImports(file, source)
      const exports = parseExports(source)
      const softUuid = toUuid(`a432-file:${path}`)
      const contentUuid = computeContentUuid({
        kind: 'a432-source',
        path,
        imports,
        exports,
        bytes: source.length,
      })
      return { path, contentUuid, softUuid, imports, exports }
    })

    const byPath = new Map(nodes.map((n) => [n.path, n]))
    const edges: GraphEdge[] = []
    for (const node of nodes) {
      for (const target of node.imports) {
        if (!byPath.has(target) && !target.startsWith('ext:')) continue
        const to = byPath.has(target) ? target : target
        edges.push({
          from: node.path,
          to,
          receipt: merge(node.softUuid, toUuid(`edge:${to}`)),
        })
      }
    }

    const exportMap: Record<string, readonly string[]> = {}
    const importMap: Record<string, readonly string[]> = {}
    for (const n of nodes) {
      exportMap[n.path] = n.exports
      importMap[n.path] = n.imports
    }

    const exportCount = nodes.reduce((a, n) => a + n.exports.length, 0)
    const nodeLeaves = nodes.map((n) => merge(n.softUuid, n.contentUuid))
    const edgeLeaves = edges.map((e) => e.receipt)
    const softRoot = merkleFold([...nodeLeaves, ...edgeLeaves])
    const contentRoot = computeContentUuid({
      kind: 'a432-import-export-census',
      fileCount: nodes.length,
      edgeCount: edges.length,
      exportCount,
      softRoot,
    })
    const throat = foldPair(softRoot, contentRoot)
    const sealed = computesGate('a432-import-export-graph', [
      { facet: 'scanned a432 sources', on: nodes.length > 0 },
      { facet: 'export map keyed by path', on: Object.keys(exportMap).length === nodes.length },
      { facet: 'merkle soft root', on: softRoot.length === 36 },
      { facet: 'content root', on: contentRoot.length === 36 },
      { facet: 'throat bidirectional', on: throat.bidirectional },
    ])

    return {
      computes: sealed.computes,
      fileCount: nodes.length,
      edgeCount: edges.length,
      exportCount,
      nodes,
      edges,
      exportMap,
      importMap,
      root: merkleFold([sealed.root, throat.merged, softRoot, contentRoot]),
      contentRoot,
      statement:
        'a432.* import/export graph is self-referencing by computation: content-uuid + merkleFold, not a hand inventory.',
      boundary:
        'FTL = memoByRoot / one merkle walk. claySolved=0. physicalFtl=0. Not a Payload/ERP port.',
      claySolved: 0 as const,
      physicalFtl: 0 as const,
    }
  })
}

/** Compact tip for gates / MCP — no giant node dump. */
export function importExportGraphTip(srcRoot: string = SRC_ROOT) {
  const g = foldA432ImportExportGraph(srcRoot)
  return {
    computes: g.computes,
    fileCount: g.fileCount,
    edgeCount: g.edgeCount,
    exportCount: g.exportCount,
    root: g.root,
    contentRoot: g.contentRoot,
    claySolved: g.claySolved,
    physicalFtl: g.physicalFtl,
    statement: g.statement,
  }
}
