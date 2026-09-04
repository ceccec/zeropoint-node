/**
 * A gate that remembers what it read.
 *
 * Recompute-always and no-memory-of-inputs are the same choice, and it cost
 * this repository twice: a 16-minute chain, and four generated records that
 * lagged their sources in a single day because the only reliable way to get a
 * consistent tree was to run all 124 steps.
 *
 * A fingerprinted gate answers from its record when nothing it reads has moved,
 * and recomputes in full the moment anything has. Two rules keep that honest:
 *
 *   FINGERPRINT MORE THAN YOU READ, NEVER LESS. Too wide only costs a recompute
 *   nobody needed. Too narrow is a stale pass, which is a gate lying.
 *
 *   THE FAST PATH MUST STILL CATCH A CORRUPTED RECORD. checks-falsifiable
 *   corrupts artifacts to prove their checkers notice; a fast path that skips
 *   that check would pass a damaged file and quietly disarm the probe.
 *
 * The first version checked only that the record round-trips through JSON. That
 * catches formatting damage and nothing else: forty corrupting bytes landing
 * INSIDE a string value leave the file valid JSON which re-serialises to itself,
 * byte for byte. It passed. So each record carries a hash of its own content,
 * and the fast path recomputes it — corruption anywhere is then a mismatch
 * rather than a coincidence of where the bytes fell.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

/** Every file under the given roots, hashed with its path. */
export function fingerprintOf(roots, filter = () => true) {
  const h = createHash('sha256')
  const walk = (dir) => {
    if (!existsSync(dir)) return
    for (const name of readdirSync(dir).sort()) {
      if (name === 'node_modules' || name === '.git' || name.startsWith('.')) continue
      const full = join(dir, name)
      const st = statSync(full)
      if (st.isDirectory()) walk(full)
      else if (filter(full)) h.update(full).update(readFileSync(full))
    }
  }
  for (const r of roots) {
    if (existsSync(r) && statSync(r).isFile()) h.update(r).update(readFileSync(r))
    else walk(r)
  }
  return h.digest('hex').slice(0, 32)
}

/** A record's content hash, computed over everything except the hash itself. */
export function contentHashOf(record) {
  const { contentHash: _omit, ...rest } = record
  return createHash('sha256').update(JSON.stringify(rest)).digest('hex').slice(0, 32)
}

/** Stamp a record so it can verify itself later. */
export function sealRecord(record) {
  return { ...record, contentHash: contentHashOf(record) }
}

/**
 * Decide whether a gate may answer from its record.
 *
 * Returns null when the caller must recompute — no record, unreadable, the
 * bytes altered, or the inputs moved. Returns the parsed record otherwise, and
 * the caller may report from it.
 */
export function answerFromRecord(recordPath, currentFingerprint, { onCorrupt } = {}) {
  if (!existsSync(recordPath)) return null
  const raw = readFileSync(recordPath, 'utf8')
  let parsed
  try { parsed = JSON.parse(raw) } catch {
    // Not "recompute" — a record that will not parse is damaged, and the
    // falsifiability probe corrupts exactly this way.
    onCorrupt?.(`${recordPath} is not readable JSON`)
    return null
  }
  if (JSON.stringify(parsed, null, 2) + '\n' !== raw) {
    onCorrupt?.(`${recordPath} does not round-trip: its bytes have been altered since it was written`)
    return null
  }
  if (typeof parsed.contentHash !== 'string') {
    onCorrupt?.(`${recordPath} carries no contentHash — it cannot vouch for itself`)
    return null
  }
  if (contentHashOf(parsed) !== parsed.contentHash) {
    onCorrupt?.(`${recordPath} does not match its own contentHash: its content has been altered`)
    return null
  }
  if (parsed.inputsFingerprint !== currentFingerprint) return null
  return parsed
}
