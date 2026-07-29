/**
 * Content-addressable UUID — learned from erpax Law 8.
 * JCS → SHA-256 → uuidv8. FNV toUuid stays in src/0 for cheap folds;
 * this module seals cryptographic identity for proofs/manifests.
 */

import { createHash } from 'node:crypto'
import { merge, toUuid } from '../0/index.ts'

export type ContentUuid<T> = string & { readonly __contentUuidOf: T }

export const NON_CONTENT_FIELDS: ReadonlySet<string> = new Set([
  'uuid',
  'id',
  'createdAt',
  'updatedAt',
  '_status',
  '_version',
  'autosave',
])

export const ZEROPOINT_NAMESPACE_ROOT = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'

export function jcsCanonicalize(value: unknown): string {
  if (value === null) return 'null'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('jcsCanonicalize: non-finite number')
    return JSON.stringify(value)
  }
  if (typeof value === 'string') return JSON.stringify(value)
  if (Array.isArray(value)) {
    return '[' + value.map(jcsCanonicalize).join(',') + ']'
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    const keys = Object.keys(obj)
      .filter((k) => obj[k] !== undefined)
      .sort()
    return '{' + keys.map((k) => JSON.stringify(k) + ':' + jcsCanonicalize(obj[k])).join(',') + '}'
  }
  throw new Error(`jcsCanonicalize: unsupported value type ${typeof value}`)
}

export function stripNonContentFields<T extends Record<string, unknown>>(
  obj: T,
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (NON_CONTENT_FIELDS.has(k)) continue
    out[k] = v
  }
  return out
}

function bytesToUuidString(bytes: Buffer): string {
  const hex = bytes.toString('hex')
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-')
}

function nameHashBytes(namespaceUuid: string, name: string): Buffer {
  const nsBytes = Buffer.from(namespaceUuid.replace(/-/g, ''), 'hex')
  if (nsBytes.length !== 16) throw new Error(`invalid namespace UUID: ${namespaceUuid}`)
  return createHash('sha256').update(nsBytes).update(Buffer.from(name, 'utf8')).digest()
}

export function nameUuid(namespaceUuid: string, name: string): string {
  const bytes = Buffer.from(nameHashBytes(namespaceUuid, name).subarray(0, 16))
  bytes[6] = (bytes[6]! & 0x0f) | 0x80
  bytes[8] = (bytes[8]! & 0x3f) | 0x80
  return bytesToUuidString(bytes)
}

export function nameDigest(namespaceUuid: string, name: string): string {
  return nameHashBytes(namespaceUuid, name).toString('hex')
}

export function projectNamespace(projectId: string): string {
  return nameUuid(ZEROPOINT_NAMESPACE_ROOT, `project:${projectId}`)
}

export function contentUuidOf(value: unknown, projectId = 'zeropoint-node'): string {
  const name = typeof value === 'string' ? value : jcsCanonicalize(value)
  return nameUuid(projectNamespace(projectId), name)
}

export function computeContentUuid<T extends Record<string, unknown>>(
  obj: T,
  projectId = 'zeropoint-node',
): ContentUuid<T> {
  const canonical = jcsCanonicalize(stripNonContentFields(obj))
  return nameUuid(projectNamespace(projectId), canonical) as ContentUuid<T>
}

export function computeContentDigest<T extends Record<string, unknown>>(
  obj: T,
  projectId = 'zeropoint-node',
): string {
  return nameDigest(projectNamespace(projectId), jcsCanonicalize(stripNonContentFields(obj)))
}

export function verifyContentUuid<T extends Record<string, unknown>>(
  obj: T & { uuid?: string },
  projectId = 'zeropoint-node',
): { ok: true } | { ok: false; expected: string; actual: string | undefined } {
  const expected = computeContentUuid(obj, projectId)
  const actual = obj.uuid
  if (typeof actual === 'string' && actual === expected) return { ok: true }
  return { ok: false, expected, actual: typeof actual === 'string' ? actual : undefined }
}

/** Bridge: fold FNV address with SHA content-uuid into one development receipt. */
export function foldIntegrityReceipt(label: string, content: Record<string, unknown>): string {
  const soft = toUuid(`fold:${label}`)
  const hard = computeContentUuid(content)
  return merge(soft, hard)
}
