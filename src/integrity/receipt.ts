/**
 * Receipt chain — history ⊕ state (erpax uuid-linked pattern, slim).
 * leaf id = merge(merge(prev, contentUuid), ts) — recompute-and-verify; no Durable Objects.
 */

import { merge, toUuid } from '../0/index.ts'
import { computeContentUuid } from './content-uuid.ts'

export const GENESIS_PREV = '00000000-0000-0000-0000-000000000000'

export type Receipt = {
  readonly id: string
  readonly prev: string
  readonly contentUuid: string
  readonly ts: number
  readonly label: string
}

export type ReceiptChainVerify = {
  readonly ok: boolean
  readonly length: number
  readonly brokenAt?: number
  readonly reason?: string
}

/** Map stored prev pointer to fold left — genesis seals as toUuid('genesis'). */
export function receiptPrevId(prev: string): string {
  return prev === GENESIS_PREV ? toUuid('genesis') : prev
}

/**
 * Slim uuid-linked leaf law (Lobe R):
 * id = merge(merge(prevId, contentUuid), toUuid(`ts:${ts}`))
 * Recompute from stored prev + contentUuid + ts — mismatch is tamper.
 */
export function computeReceiptId(prev: string, contentUuid: string, ts: number): string {
  return merge(merge(receiptPrevId(prev), contentUuid), toUuid(`ts:${ts}`))
}

export function appendReceipt(
  prev: string,
  label: string,
  payload: Record<string, unknown>,
  ts: number = Date.now(),
): Receipt {
  const contentUuid = computeContentUuid({ ...payload, label, ts })
  const id = computeReceiptId(prev, contentUuid, ts)
  return { id, prev, contentUuid, ts, label }
}

/** Adjacent link: next.prev matches prior head; next.id recomputes from prev+contentUuid+ts. */
export function verifyReceiptLink(prev: Receipt | typeof GENESIS_PREV, next: Receipt): boolean {
  const expectedPrev = typeof prev === 'string' ? GENESIS_PREV : prev.id
  if (next.prev !== expectedPrev) return false
  return next.id === computeReceiptId(next.prev, next.contentUuid, next.ts)
}

/**
 * Walk-verify an ordered chain. First leaf must be genesis-linked;
 * each id must recompute; prev pointers must stitch. Fail-closed.
 */
export function verifyReceiptChain(receipts: readonly Receipt[]): ReceiptChainVerify {
  if (receipts.length === 0) return { ok: true, length: 0 }
  let expectedPrev = GENESIS_PREV
  for (let i = 0; i < receipts.length; i++) {
    const r = receipts[i]!
    if (i === 0 && r.prev !== GENESIS_PREV) {
      return {
        ok: false,
        length: receipts.length,
        brokenAt: 0,
        reason: 'genesis required: first prev must be GENESIS_PREV',
      }
    }
    if (r.prev !== expectedPrev) {
      return {
        ok: false,
        length: receipts.length,
        brokenAt: i,
        reason: `prev mismatch at ${i}: expected ${expectedPrev}, got ${r.prev}`,
      }
    }
    const recomputed = computeReceiptId(r.prev, r.contentUuid, r.ts)
    if (r.id !== recomputed) {
      return {
        ok: false,
        length: receipts.length,
        brokenAt: i,
        reason: `id recompute mismatch at ${i}: expected ${recomputed}, stored ${r.id}`,
      }
    }
    expectedPrev = r.id
  }
  return { ok: true, length: receipts.length }
}
