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
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
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

// The holder, checked against the commit record rather than taken on trust.
//
// The notice names one person. Whether that is true of the work is a question
// about who wrote it, and git knows. Three author identities appear in the
// history — a spelling variant and an editor's "Cursor Agent" signature — and
// .mailmap resolves them to the one author they are, without rewriting a
// single hash. This asserts what that resolution produces, so the copyright
// line is computed against the record instead of being a string someone typed.
//
// Skipped rather than failed outside a git checkout: the published tarball
// contains no history, and a check that cannot run must say so rather than
// invent a verdict.
if (!existsSync(join(ROOT, '.git'))) {
  console.log('  note: no git checkout here, so authorship is not checked against the commit record')
} else {
  let authors = []
  try {
    authors = execFileSync('git', ['log', '--format=%aN'], { cwd: ROOT, encoding: 'utf8' })
      .split('\n').map((x) => x.trim()).filter(Boolean)
  } catch { authors = [] }
  const distinct = [...new Set(authors)]
  if (distinct.length === 0) {
    console.log('  note: no commit history readable here; authorship not checked against it')
  } else if (distinct.length > 1) {
    problems.push(
      `the history has ${distinct.length} distinct authors after .mailmap (${distinct.join(', ')}) `
      + 'but the notice names one holder — map them in .mailmap, or the notice is not the whole story',
    )
  } else if (holder && distinct[0] !== holder) {
    problems.push(`the sole author of ${authors.length} commits is "${distinct[0]}" but the notice names "${holder}"`)
  } else {
    console.log(`  ✓ sole author of ${authors.length} commits, after .mailmap, is the named holder`)
  }
}

// --- what the README offers must be within what the licence grants ----------
//
// The Contributing section invited contributions from four kinds of researcher
// and pointed at contributing guidelines that did not exist. The licence is
// NoDerivatives: a patch is a derivative work, so both contributing one and
// merging it need written permission first. Inviting them anyway put anyone who
// accepted the invitation in the wrong, and it is the section a contributor
// reads before doing the work.
//
// Only checked when the licence actually forbids derivatives. Under a permissive
// licence an unqualified invitation is correct and this says nothing.
const INVITATIONS = [
  /welcomes contributions/i,
  /open[- ]source project/i,
  /\bpull requests?\b/i,
  /contributing guidelines/i,
]
// Naming the constraint anywhere in the section is enough; how it is worded is
// not this check's business.
const QUALIFIERS = [/NoDerivatives/i, /written permission/i, /\bND\b/, /license@/i]

if (/nd/i.test(String(pkg.license).split('-').slice(-2, -1)[0] ?? '') || /-ND-/i.test(pkg.license)) {
  const readme = existsSync(join(ROOT, 'README.md')) ? read('README.md') : ''
  // The section, not the whole file: a qualifier in the LICENSE preamble at the
  // top does not qualify an invitation 600 lines below it.
  const m = /^##+ .*Contributing.*$/mi.exec(readme)
  const section = m ? readme.slice(m.index).split(/^##+ /m).slice(0, 2).join('') : ''
  const invited = INVITATIONS.filter((re) => re.test(section)).map((re) => String(re))
  if (invited.length > 0 && !QUALIFIERS.some((re) => re.test(section))) {
    problems.push(
      `the README's Contributing section invites contributions (${invited.length} phrase(s)) but the licence is `
      + `${pkg.license} — a patch is a derivative work, so the section must say permission is needed first`,
    )
  }
}

console.log(`rights:check — holder "${holder}" (${years}), licence ${pkg.license}, stated in 4 places`)
if (problems.length > 0) {
  for (const p of problems) console.error(`  ✗ ${p}`)
  console.error(`rights:check FAIL — ${problems.length} problem(s) in the rights record`)
  process.exit(1)
}
console.log('rights:check ok — one holder, one licence, and attribution is possible')
process.exit(0)
