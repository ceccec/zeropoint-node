/**
 * Receipt chain — history ⊕ state (erpax pattern, slim).
 * leaf = merge(prev, contentUuid) with timestamp folded into content.
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

export function appendReceipt(
  prev: string,
  label: string,
  payload: Record<string, unknown>,
  ts: number = Date.now(),
): Receipt {
  const contentUuid = computeContentUuid({ ...payload, label, ts })
  const id = merge(prev === GENESIS_PREV ? toUuid('genesis') : prev, contentUuid)
  return { id, prev, contentUuid, ts, label }
}

export function verifyReceiptLink(prev: Receipt | typeof GENESIS_PREV, next: Receipt): boolean {
  const prevId = typeof prev === 'string' ? (prev === GENESIS_PREV ? toUuid('genesis') : prev) : prev.id
  return next.id === merge(prevId, next.contentUuid)
}
