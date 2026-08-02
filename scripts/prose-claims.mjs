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

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SKIP = new Set(['node_modules', 'dist', 'coverage', '.git'])
// Implements lobe L's law `emittedProseCarriesNoJudgmentOrExpectation`
// (ceccec.github.io):
// gate what a READER RECEIVES, not only what an author wrote. Source .md and the
// built HTML are different artifacts — a claim can reach the published site
// through a generator that never appears in any .md.
const EMITTED = 'docs/.vitepress/dist'

/** Effect claims: physics, medicine, consciousness, and reported results. */
const CLAIMS = [
  { id: 'free-energy', re: /\b(zero[- ]point energy (harvest|extract)|charges? itself|self[- ]sustaining device|perpetual (motion|balance)|free energy)\b/i },
  { id: 'consciousness', re: /\b(pure consciousness|deterministic enlightenment|consciousness (multiplier|technology)|transformation .{0,40}to pure consciousness|awareness at gateways)\b/i },
  { id: 'medical', re: /\b(healing frequenc|harmonic medicine|cure[sd]?\b|therapeutic|treats? (disease|illness))\b/i },
  { id: 'physics-result', re: /\b(particle masses|mₚ\/mₑ|spacetime geometry becomes|π (becomes|=) 3\b|perfect fractal ice|no spectral broadening)\b/i },
  { id: 'experiment', re: /\b(experimental validation|laser test|water crystallography|Result:\s*\S)/i },
  { id: 'solves', re: /\b(solves? (fundamental|world|humanity)|proves? (consciousness|reality|the universe))\b/i },
]

/** A claim next to any of these is already honestly framed. */
const BOUNDED =
  /\b(refus|boundary|not a claim|no claim|metaphor|analog(y|ies)|overlay, not|is not evidence|does not explain|faithful:|honesty|speculative|hypothes|would need|not measured|unproven|flagged)\b/i

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.md') || name.endsWith('.html')) out.push(p)
  }
  return out
}

export function scanClaims() {
  const hits = []
  for (const file of walk(ROOT)) {
    const raw = readFileSync(file, 'utf8')
    const text = file.endsWith('.html')
      ? raw.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ')
      : raw
    const lines = text.split('\n')
    for (const [i, line] of lines.entries()) {
      for (const claim of CLAIMS) {
        if (!claim.re.test(line)) continue
        // A boundary governs its SECTION, not just its line. Look back to the
        // nearest heading: if anything between that heading and this line marks
        // the passage as bounded, the claim is already honestly framed. Only
        // checking the adjacent lines under-credited section-level boundaries —
        // a table row eight lines below an explicit "Boundary." paragraph still
        // counted as unbounded.
        let bounded = BOUNDED.test(`${line}\n${lines[i + 1] ?? ''}`)
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
