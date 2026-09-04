/**
 * The evidence pack an application needs, assembled — and bounded by what the
 * repository actually establishes.
 *
 * Funding applications, and prize submissions especially, ask for claims and
 * their support. Assembling that by hand is where overstatement enters: a
 * sentence written for a form is not gated by anything, and the form is read by
 * someone who cannot check it.
 *
 * So the dossier is GENERATED from the ledgers. Every claim it lists is one the
 * repository already makes, with the gate that decides it and the boundary it
 * carries. Nothing can be added by writing it here.
 *
 * WHAT THIS REFUSES TO DO. It does not assert a solution to any open problem.
 * No claim in this repository names one — no Millennium Problem, no prize, no
 * conjecture resolved — and the validation criterion states in data that no
 * physical experiment has been run. An application claiming otherwise would be
 * submitting to a third party something the source denies, and the dossier
 * carries that denial rather than omitting it.
 *
 *   npm run dossier
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = join(import.meta.dirname, '..')
const J = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const pkg = J('package.json'), art = J('src/verification/prior-art.json')
const led = J('lean/ledger.json'), ax = J('src/verification/axiom-index.json')
const con = J('src/verification/constrained.json'), fund = J('src/verification/funding.json')
// allCriteria lives in subjects.ts, not the barrel. The first version reached
// for it on the barrel with `?? []` behind it and printed "0 of 0 criteria met"
// — a fabricated zero that read exactly like a finding. A default that hides a
// missing import is worse than a crash.
const subjects = await import(pathToFileURL(join(ROOT, 'src/verification/subjects.ts')).href)
if (typeof subjects.allCriteria !== 'function') {
  console.error('dossier FAIL — subjects.allCriteria is not a function; refusing to report a criteria count of zero')
  process.exit(1)
}

const criteria = subjects.allCriteria(64).map((c) => ({
  name: c.name, gated: c.gated !== false,
  met: c.verdict?.met ?? null,
  conditions: c.verdict?.conditionsTotal ?? null,
  doesNotEstablish: c.verdict?.doesNotEstablish ?? null,
}))

const dossier = {
  work: { title: 'ZeroPoint Node', version: pkg.version, doi: art.concept_doi, repository: pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, ''), author: pkg.author.name, orcid: pkg.author.url, licence: pkg.license },
  funding: { status: fund.status, statement: fund.statement, grants: fund.grants },
  contributions: Object.entries(art.contributions).map(([id, c]) => ({
    id, what: c.what.replace(/\s+/g, ' ').trim(),
    priorArtStatus: c.priorArt?.status,
    citedWorkWithDoi: (c.priorArt?.citations ?? []).filter((x) => x.resolved).map((x) => x.id),
    domainsWhereItsPriorArtWouldLive: c.domains ?? [],
  })),
  formalResults: { statements: led.theorems, acceptedByTheKernel: led.proven, restingOnNoAxiomsAtAll: ax.totals.restingOnNothingAtAll, declaredAssumptions: ax.declaredAssumptions.map((a) => a.name) },
  criteria,
  howMuchAnyLawHolds: { exportedValues: con.reachability.exportedValues, reachableFromNoLaw: con.reachability.unreachable, note: con.reachability.note, constantsForced: con.literalCensus.forced, constantsHeldByNothing: con.literalCensus.free },
  boundaries: {
    novelty: 'NOT CLAIMED. Novelty is a universal negative that no finite search decides; the ledger has no status permitting it. A dated deposit establishes PRIORITY, which is the defensible claim.',
    openProblems: 'NONE CLAIMED. No contribution names a Millennium Problem, a prize question, or a resolved conjecture. An application asserting one would state something this source denies.',
    physicalExperiment: criteria.find((c) => c.name?.includes('validation'))?.doesNotEstablish ?? 'no physical experiment has been run',
    constraint: `${con.reachability.unreachable} of ${con.reachability.exportedValues} exported values are reachable from no law at all — a floor, not a total.`,
  },
}
writeFileSync(join(ROOT, 'src/verification/dossier.json'), JSON.stringify(dossier, null, 2) + '\n')
console.log(`dossier — ${dossier.contributions.length} contributions, ${dossier.formalResults.acceptedByTheKernel} of ${dossier.formalResults.statements} statements kernel-accepted, ${criteria.filter((c) => c.met).length} of ${criteria.length} criteria met`)
console.log(`          funding: ${fund.status} · novelty: not claimed · open problems: none claimed`)
console.log('          every line is read from a ledger; nothing can be added by writing it into an application')
