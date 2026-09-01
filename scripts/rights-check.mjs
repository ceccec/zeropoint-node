#!/usr/bin/env node
/**
 * rights-check — the rights record must name one holder and one licence, and
 * the four places that state them must agree.
 *
 * What this is NOT: legal advice, and not an assertion about what any law
 * grants. Copyright in this work arises on creation under the Berne
 * Convention; no notice creates it and none is required for it to exist. What a
 * notice does is IDENTIFY the holder, and that is not decorative here —
 * CC BY-NC-ND makes attribution a condition of the licence, so a work that
 * names nobody cannot be complied with. The licence text shipped with this
 * repository named no licensor at all until it was added, and package.json
 * credited "A432 Consciousness System", which is a project name rather than a
 * person who can hold anything.
 *
 * Four files state the holder or the licence. Four copies drift, so they are
 * compared:
 *
 *   LICENSE        the notice and the attribution form
 *   package.json   author, license
 *   CITATION.cff   copyright, license, authors
 *   .zenodo.json   creators, license  (what a minted DOI records)
 *
 *   npm run rights:check
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f) => readFileSync(join(ROOT, f), 'utf8')

const license = read('LICENSE')
const pkg = JSON.parse(read('package.json'))
const cff = read('CITATION.cff')
const zenodo = JSON.parse(read('.zenodo.json'))

const problems = []

// The holder, as each file states it.
const noticeLine = license.split('\n')[0]
const noticeMatch = /^Copyright \(c\) (\d{4}(?:-\d{4})?) (.+?)(?: <(.+)>)?$/.exec(noticeLine)
if (!noticeMatch) {
  problems.push('LICENSE does not open with a copyright notice naming a holder — the licence requires attribution, so nobody can comply')
}
const [, years, holder] = noticeMatch ?? [, '', '']

const cffFamily = /^\s*- family-names:\s*(.+)$/m.exec(cff)?.[1]?.trim()
const cffGiven = /^\s*given-names:\s*(.+)$/m.exec(cff)?.[1]?.trim()
const cffHolder = cffFamily && cffGiven ? `${cffGiven} ${cffFamily}` : null
const zenodoName = zenodo.creators?.[0]?.name // "Family, Given"
const zenodoHolder = zenodoName ? zenodoName.split(',').map((x) => x.trim()).reverse().join(' ') : null
const pkgHolder = typeof pkg.author === 'string' ? pkg.author : pkg.author?.name

for (const [where, value] of [['package.json author', pkgHolder], ['CITATION.cff authors', cffHolder], ['.zenodo.json creators', zenodoHolder]]) {
  if (!value) { problems.push(`${where} names no holder`); continue }
  if (holder && value !== holder) {
    problems.push(`${where} says "${value}" but the LICENSE notice says "${holder}" — one work, one holder`)
  }
}

// The licence, as each file states it. Zenodo lowercases; that is its format.
const cffLicense = /^license:\s*(.+)$/m.exec(cff)?.[1]?.trim()
if (pkg.license !== cffLicense) problems.push(`package.json license "${pkg.license}" != CITATION.cff "${cffLicense}"`)
if ((zenodo.license ?? '').toLowerCase() !== (pkg.license ?? '').toLowerCase()) {
  problems.push(`.zenodo.json license "${zenodo.license}" != package.json "${pkg.license}" — a DOI would record the wrong terms`)
}
if (!license.includes(String(pkg.license).replace(/-/g, ' ').replace('CC BY NC ND 4.0', 'CC BY-NC-ND 4.0'))
  && !license.includes('CC BY-NC-ND 4.0')) {
  problems.push('LICENSE does not name the licence package.json claims')
}

// Attribution has to be possible: the notice must lead somewhere.
if (!license.includes('ORCID')) problems.push('the attribution form names no ORCID, so the holder is not identifiable beyond a name')
if (!license.includes('github.com/ceccec/zeropoint-node')) problems.push('the attribution form gives no source to cite')
if (!/copyright:/.test(cff)) problems.push('CITATION.cff records no copyright line beside the licence it conditions')

console.log(`rights:check — holder "${holder}" (${years}), licence ${pkg.license}, stated in 4 places`)
if (problems.length > 0) {
  for (const p of problems) console.error(`  ✗ ${p}`)
  console.error(`rights:check FAIL — ${problems.length} problem(s) in the rights record`)
  process.exit(1)
}
console.log('rights:check ok — one holder, one licence, and attribution is possible')
process.exit(0)
