/**
 * zenodo:verify — harvest the deposited record and compare it with what this
 * repository claims about itself.
 *
 * The concept DOI appears in CITATION.cff, package metadata, the paper's
 * JSON-LD, 59 deposit records and every citation this project emits. Until now
 * its only warrant was that someone had written it in a file. A DOI written in
 * a file is a string; a DOI that resolves to a record whose creator, licence and
 * relations match is evidence.
 *
 * OAI-PMH is the right instrument for this — https://developers.zenodo.org/#oai-pmh
 * — because it is a READ protocol with no authentication. Nothing here writes,
 * deposits or publishes. Minting belongs to whoever owns the account.
 *
 * The concept DOI resolves to the NEWEST version's record, so the harvest is
 * two steps: follow the concept DOI to a record id, then ask OAI-PMH for that
 * record. Asking OAI-PMH for the concept id directly returns idDoesNotExist,
 * which reads as "the DOI is wrong" when it means "that is not a record id".
 *
 *   npm run zenodo:verify
 */
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const art = JSON.parse(readFileSync(join(ROOT, 'src/verification/prior-art.json'), 'utf8'))
const cff = readFileSync(join(ROOT, 'CITATION.cff'), 'utf8')
const CONCEPT = art.concept_doi

const problems = []
const say = (label, claimed, found, ok) =>
  console.log(`  ${ok ? 'ok  ' : 'MISMATCH'}  ${label.padEnd(16)} claimed ${JSON.stringify(claimed)} · record ${JSON.stringify(found)}`)

// 1. the concept DOI must resolve to a record
let url = ''
try {
  url = execFileSync('curl', ['-sL', '--max-time', '30', '-o', '/dev/null', '-w', '%{url_effective}',
    `https://doi.org/${CONCEPT}`], { encoding: 'utf8' }).trim()
} catch (e) { problems.push(`the concept DOI could not be resolved: ${e.message.slice(0, 80)}`) }
const id = (url.match(/records\/(\d+)/) ?? [])[1]
if (!id) problems.push(`https://doi.org/${CONCEPT} did not land on a Zenodo record (ended at ${url || 'nowhere'})`)
else console.log(`  ok      concept DOI      ${CONCEPT} resolves to record ${id}`)

// 2. harvest it, and compare what it says with what we say
if (id) {
  const xml = execFileSync('curl', ['-s', '--max-time', '30',
    `https://zenodo.org/oai2d?verb=GetRecord&metadataPrefix=oai_dc&identifier=oai:zenodo.org:${id}`],
    { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  const err = /<error code="([^"]+)"/.exec(xml)
  if (err) {
    problems.push(`OAI-PMH refused record ${id}: ${err[1]} — INCONCLUSIVE, not a mismatch`)
  } else {
    const dc = (tag) => [...xml.matchAll(new RegExp(`<dc:${tag}>([\\s\\S]*?)</dc:${tag}>`, 'g'))]
      .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())

    const [given, ...family] = pkg.author.name.split(' ')
    const expectCreator = `${family.join(' ')}, ${given}`
    const creators = dc('creator')
    const okCreator = creators.includes(expectCreator)
    say('creator', expectCreator, creators[0] ?? null, okCreator)
    if (!okCreator) problems.push(`the deposited creator is ${JSON.stringify(creators[0] ?? null)}, this repository says ${JSON.stringify(expectCreator)}`)

    const title = (cff.match(/^title:\s*(.+)$/m) ?? [, ''])[1].trim()
    const titles = dc('title')
    const okTitle = titles.some((t) => t === title)
    say('title', title, titles[0] ?? null, okTitle)
    if (!okTitle) problems.push(`the deposited title is ${JSON.stringify(titles[0] ?? null)}, CITATION.cff says ${JSON.stringify(title)}`)

    const rights = dc('rights').join(' | ')
    const okRights = /Non ?Commercial/i.test(rights) && /No ?Deriv/i.test(rights)
    say('licence', pkg.license, rights.slice(0, 52), okRights)
    if (!okRights) problems.push(`the deposited rights do not read as ${pkg.license}: ${rights.slice(0, 90)}`)

    const rel = dc('relation')
    const repo = pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')
    for (const [what, want] of [['repository', repo], ['homepage', pkg.homepage]]) {
      const ok = rel.some((r) => r.replace(/\/$/, '') === want.replace(/\/$/, ''))
      say(what, want, rel.find((r) => r.includes(want.split('//')[1]?.split('/')[0] ?? '')) ?? null, ok)
      if (!ok) problems.push(`the deposited record does not relate to ${want}`)
    }
  }
}

console.log(`zenodo:verify — the deposited record checked against this repository's own claims`)
if (problems.length) {
  for (const p of problems) console.error(`  ✗ ${p}`)
  console.error(`zenodo:verify FAIL — ${problems.length} disagreement(s) between the archive and the source`)
  process.exit(1)
}
console.log('zenodo:verify ok — the DOI resolves, and the archived creator, title, licence and relations are the ones this repository states')
