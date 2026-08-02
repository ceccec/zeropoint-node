#!/usr/bin/env node
/**
 * Prose claims — the surface every other gate ignores.
 *
 * typecheck, lint, cycles, loadability, decimals and dead code all inspect
 * CODE. None of them read a sentence. So the docs drifted into asserting
 * things no compute supports — zero-point energy harvesting, healing
 * frequencies, "transformation ... to pure consciousness", and an
 * "Experimental Validation" section reporting results of experiments that were
 * never run — while the kernel's own honesty ledger says the opposite:
 * "Refused: that any of this explains consciousness, physics, or biology."
 *
 * This counts sentences that assert a physical, medical or consciousness
 * EFFECT as fact. It is deliberately narrow: metaphor is fine, and so is a
 * claim that is explicitly bounded. A hit is only recorded when the line is
 * NOT inside a boundary context.
 *
 * What counts as bounded: anywhere between the claim and its nearest heading
 * above marks the passage as refused / not-a-claim / metaphor / a boundary
 * statement. A boundary governs its SECTION. That is how the corpus already
 * writes its honest passages, so honest prose scores zero without rewriting.
 *
 *   npm run prose         list every unbounded claim with file:line
 *   npm run prose:check   exit 1 if the count exceeds the ratchet ceiling
 *
 * This cannot judge truth. It flags a SHAPE — an unhedged effect claim — and a
 * human decides. False positives are expected; the ceiling is what makes it
 * useful rather than noisy.
 */

import { config, walk, readCapped, compile, resolveInside } from './lib/scan.mjs'
import { relative } from 'node:path'
import { ROOT } from './lib/scan.mjs'

const CFG = config().prose
const CLAIMS = CFG.claims.map((c) => ({ id: c.id, re: compile(c.pattern) }))
const BOUNDED = compile(CFG.boundedPattern)
const MATCHES = (n) => CFG.extensions.some((e) => n.endsWith(e))

/** Markup must not mask or manufacture a hit — strip tags and scripts first. */
function textOf(file) {
  const raw = readCapped(file)
  if (raw === null) return null
  return file.endsWith('.html')
    ? raw.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ')
    : raw
}

export function scanClaims() {
  const hits = []
  const files = new Set()
  for (const r of CFG.roots) {
    for (const f of walk(resolveInside(r), MATCHES, { skipDirs: CFG.skipDirs })) files.add(f)
  }
  for (const file of [...files].sort()) {
    const text = textOf(file)
    if (text === null) continue
    const lines = text.split('\n')
    // Fence-skipping is only safe when the fences BALANCE. PROOF.md and
    // HARMONIC_MATH_SYSTEM.md have an odd number of markers, so tracking state
    // blindly made the scanner go dark from the last unmatched fence to EOF and
    // silently drop 34 real claims. If a file's fences do not pair, scan all of
    // it: a false positive is visible, a false negative is not.
    const fenceCount = lines.filter((l) => /^\s*(```|~~~)/.test(l)).length
    const fencesBalance = fenceCount % 2 === 0
    let inFence = false
    for (const [i, line] of lines.entries()) {
      // Fenced code is code, not prose. `overUnity: '...'` inside an example
      // block is a variable name, and flagging it says nothing about what the
      // page asserts to a reader.
      if (fencesBalance && /^\s*(```|~~~)/.test(line)) {
        inFence = !inFence
        continue
      }
      if (inFence) continue
      for (const claim of CLAIMS) {
        claim.re.lastIndex = 0
        if (!claim.re.test(line)) continue
        // A boundary governs its SECTION. Look back to the nearest heading:
        // anything between it and this line that frames the passage counts.
        let bounded = BOUNDED.test(`${line}\n${lines[i + 1] ?? ''}`)
        // A HEADING that names a claim is bounded by the paragraph that
        // FOLLOWS it — looking only backwards stopped at the heading itself and
        // never saw its own section's boundary.
        if (!bounded && /^#{1,6}\s/.test(line)) {
          for (let j = i + 1; j < lines.length; j += 1) {
            if (/^#{1,6}\s/.test(lines[j])) break
            if (BOUNDED.test(lines[j])) {
              bounded = true
              break
            }
          }
        }
        for (let j = i - 1; j >= 0 && !bounded; j -= 1) {
          if (/^#{1,6}\s/.test(lines[j])) break
          if (BOUNDED.test(lines[j])) bounded = true
        }
        if (bounded) continue
        hits.push({ file: relative(ROOT, file), line: i + 1, id: claim.id, text: line.trim().slice(0, 96) })
        break
      }
    }
  }
  return hits
}

if (process.argv[1] && process.argv[1].endsWith('prose-claims.mjs')) {
  const hits = scanClaims()
  const byId = new Map()
  for (const h of hits) byId.set(h.id, (byId.get(h.id) ?? 0) + 1)
  console.log(`unbounded effect claims: ${hits.length}`)
  for (const [id, n] of [...byId.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${id}`)
  }
  if (process.argv.includes('--list')) {
    console.log()
    for (const h of hits) console.log(`  ${h.file}:${h.line}  [${h.id}]  ${h.text}`)
  }
}
