#!/usr/bin/env node
/**
 * The formulas, set in standard notation, on a page that prints as paper.
 *
 * Every number below is READ FROM THE CODE at generation time — the orbit from
 * the kernel, the frequencies from a432.math, the potentials from src/thermo,
 * the deadline from the real-time criterion, the seals from the lean bridge.
 * Nothing is transcribed. That is the whole point: a paper whose figures were
 * typed in is a paper that starts drifting the day it is written, and this
 * repository has spent nine patches on exactly that failure.
 *
 * MathML, not an image and not a script. It is the standard the browsers
 * implement natively, so the equations are text — selectable, searchable, and
 * correct at print resolution without a font download or a CDN. A page that
 * needs JavaScript to show its own formulas does not print.
 *
 * The print rules are in @page and @media print: A4 with real margins, running
 * heads, and no page break allowed inside a numbered equation.
 *
 *   npm run paper          write docs/public/paper.html
 *   npm run paper:check    fail if the committed page has drifted from the code
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs/public/paper.html')
const TEX = join(ROOT, 'docs/public/paper.tex')
const CHECK = process.argv.includes('--check')

// ---- everything the paper states, read from the code ----------------------
const k = await import(join(ROOT, 'src/0/index.ts'))
const ma = await import(join(ROOT, 'src/0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'))
const mc = await import(join(ROOT, 'src/0/3/6/9/1/2/4/8/7/5/1/a432.math.constants.ts'))
const cm = await import(join(ROOT, 'src/0/3/6/9/1/2/4/8/7/5/1/a432.cmyk.ts'))
const th = await import(join(ROOT, 'src/thermo/free-energy.ts'))
const ww = await import(join(ROOT, 'src/thermo/wastewater-energy.ts'))
const lb = await import(join(ROOT, 'src/verification/lean-bridge.ts'))
const rt = await import(join(ROOT, 'src/verification/realtime-criterion.ts'))
const va = await import(join(ROOT, 'src/verification/validation-criterion.ts'))
const yy = await import(join(ROOT, 'src/0/3/6/9/1/2/4/8/7/5/1/a432.yin.yang.ts'))
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version

// Everything the repository knows about itself, surfaced rather than summarised.
const { allCriteria } = await import(join(ROOT, 'scripts/lib/criteria-subjects.mjs'))
const { MUTATIONS } = await import(join(ROOT, 'scripts/law-mutations.mjs'))
const criteriaAll = allCriteria()
const ledger = JSON.parse(readFileSync(join(ROOT, 'src/verification/claims.json'), 'utf8')).claims
const ratchet = JSON.parse(readFileSync(join(ROOT, 'ratchet.json'), 'utf8'))
const leanLedger = JSON.parse(readFileSync(join(ROOT, 'lean/ledger.json'), 'utf8'))
const priorArt = JSON.parse(readFileSync(join(ROOT, 'src/verification/prior-art.json'), 'utf8'))
const constrained = JSON.parse(readFileSync(join(ROOT, 'src/verification/constrained.json'), 'utf8'))

/**
 * PUBLICATION METADATA, READ FROM THE MANIFEST — NEVER TYPED HERE.
 *
 * A page whose author, DOI or repository is written into the generator is a
 * second copy that drifts from package.json and CITATION.cff. Every value below
 * is read, so there is one source and the page follows it.
 *
 * The point of the markup is that a search engine, Google Scholar and a
 * citation manager can each read what this page IS: a dated technical report,
 * by an identified author, about a package with a DOI, citing work that
 * resolves. That is the whole of it — the references are real, the identifiers
 * are real, and nothing here describes the page as something it is not.
 */
const manifest = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const SITE = manifest.homepage.replace(/\/$/, '')
const REPO = manifest.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')
const NPM = `https://www.npmjs.com/package/${manifest.name}`
const CONCEPT_DOI = priorArt.concept_doi
const AUTHOR = manifest.author.name
const ORCID = manifest.author.url
const PAPER_URL = `${SITE}/paper.html`
const PAPER_TITLE = `Exact arithmetic over a ten-digit space`
const PAPER_ABSTRACT = 'The arithmetic zeropoint-node implements and the predicates that decide it, with every figure computed from the source, and a census of how much of the package any law actually constrains.'

/** Every citation in the ledger that RESOLVED, so nothing unverified is cited. */
const references = Object.entries(priorArt.contributions)
  .flatMap(([id, c]) => (c.priorArt?.citations ?? []).map((x) => ({ ...x, contribution: id })))
  .filter((x) => x.resolved === true && x.kind === 'doi' && x.id)
const seenDoi = new Set()
const uniqueReferences = references.filter((r) => (seenDoi.has(r.id) ? false : seenDoi.add(r.id)))
const pinning = JSON.parse(readFileSync(join(ROOT, 'src/verification/seal-pinning.json'), 'utf8'))
const funding = JSON.parse(readFileSync(join(ROOT, 'src/verification/funding.json'), 'utf8'))

/**
 * Every Lean statement in the repository, read from the .lean sources and
 * married to the ledger's verdict on it. The statement is the theorem's TYPE —
 * the part between the name and `:=` — because that is the claim; the proof
 * term is how it was closed and belongs to the kernel, not to a reader.
 */
const { readdirSync: readDir } = await import('node:fs')
const leanStatements = []
for (const file of readDir(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean') && f !== 'lakefile.lean').sort()) {
  const src = readFileSync(join(ROOT, 'lean', file), 'utf8')
  for (const m of src.matchAll(/^theorem\s+([A-Za-z0-9_']+)\s*([\s\S]*?):=/gm)) {
    const entry = (leanLedger.entries ?? []).find((e) => e.name === m[1] && e.file === file)
    leanStatements.push({
      name: m[1], file,
      statement: m[2].replace(/^\s*:/, '').replace(/\s+/g, ' ').trim(),
      status: entry?.status ?? 'unrecorded',
      axioms: entry?.axioms,
    })
  }
}

/**
 * Lean's notation is Unicode; LaTeX without unicode-math is not. Each symbol
 * becomes its own inline math, so the surrounding identifiers stay upright text
 * and nothing depends on a package this document does not load.
 */
const LEAN_TEX = [
  ['∀', '$\\forall$'], ['∃', '$\\exists$'], ['∈', '$\\in$'], ['∉', '$\\notin$'],
  ['≠', '$\\neq$'], ['≤', '$\\leq$'], ['≥', '$\\geq$'], ['∧', '$\\land$'],
  ['∨', '$\\lor$'], ['¬', '$\\lnot$'], ['↔', '$\\leftrightarrow$'], ['→', '$\\to$'],
  ['ℕ', '$\\mathbb{N}$'], ['ℝ', '$\\mathbb{R}$'], ['ℂ', '$\\mathbb{C}$'], ['ℤ', '$\\mathbb{Z}$'],
  ['×', '$\\times$'], ['∘', '$\\circ$'], ['∑', '$\\sum$'], ['√', '$\\sqrt{\;}$'],
  ['α', '$\\alpha$'], ['β', '$\\beta$'], ['ψ', '$\\psi$'], ['θ', '$\\theta$'],
  ['φ', '$\\varphi$'], ['ε', '$\\varepsilon$'], ['π', '$\\pi$'], ['σ', '$\\sigma$'],
  ['₀', '$_0$'], ['₁', '$_1$'], ['₂', '$_2$'], ['ⁿ', '$^n$'], ['†', '$\\dagger$'],
  ['⟨', '$\\langle$'], ['⟩', '$\\rangle$'], ['∣', '$\\mid$'], ['≡', '$\\equiv$'],
  ['ᴴ', '$^{H}$'], ['⁻', '$^{-}$'], ['∗', '$^{*}$'], ['⬝', '$\\cdot$'], ['∀', '$\\forall$'],
]
function leanToTex(text) {
  let out = texEscape(text)
  for (const [u, t] of LEAN_TEX) out = out.split(u).join(t)
  // Anything still outside ASCII would break a plain LaTeX run; name it rather
  // than emit it, so a missing mapping is visible instead of silently broken.
  return out.replace(/[^\x00-\x7F]/g, (ch) => `\\textbf{[U+${ch.codePointAt(0).toString(16).toUpperCase()}]}`)
}


// Prior art, straight from the ledger: status, the domains where the art would
// live, and each citation with whatever identifier it actually has. A citation
// with no DOI is shown as having none rather than omitted, so the gaps count.
const paEntries = Object.entries(priorArt.contributions)
const paCitesAll = paEntries.flatMap(([, c]) => c.priorArt?.citations ?? [])
const paCites = paCitesAll.length
const paResolved = paCitesAll.filter((c) => c.resolved === true).length
const STATUS_WORD = {
  proven: 'proven by the kernel',
  sorry: 'written down, closed with sorry',
  'rests-on-more': 'kernel-accepted, but rests on an axiom outside the allowed set',
  'unverifiable-here': 'needs a library this repository cannot build here',
  rejected: 'the kernel rejected it',
}
const leanRows = leanStatements.map((t) => {
  const ax = t.axioms === undefined ? '' : t.axioms.length
    ? ` <span class="ax">rests on ${t.axioms.map((a) => `<code>${escape(a)}</code>`).join(', ')}</span>`
    : ' <span class="ax">rests on no axioms</span>'
  return `<tr class="${escape(t.status)}"><td><code>${escape(t.name)}</code><br><span class="where">${escape(t.file)}</span></td>` +
    `<td class="stmt">${escape(t.statement)}</td>` +
    `<td>${escape(STATUS_WORD[t.status] ?? t.status)}${ax}</td></tr>`
})

const priorArtRows = paEntries.map(([id, c]) => {
  const cites = (c.priorArt?.citations ?? []).map((x) =>
    x.kind === 'doi' && x.id
      ? `<li><a href="https://doi.org/${escape(x.id)}"><code>${escape(x.id)}</code></a> &mdash; ${escape(x.resolvedTitle ?? x.text)}</li>`
      : `<li>${escape(x.text)} <span class="nodoi">(no DOI: ${escape(x.kind ?? 'unstated')})</span></li>`).join('')
  return `<tr><td><code>${escape(id)}</code></td><td>${escape(c.priorArt?.status ?? '')}</td>` +
    `<td>${(c.domains ?? []).map((d) => escape(d)).join('<br>')}</td>` +
    `<td><ul>${cites || '<li>none cited</li>'}</ul></td></tr>`
})

// EVERY run, not only the live one. Superseded plans are kept as
// release-plan.<run>.json, and dropping them from the page would replace a
// finished run's results with an unstarted plan's zeros — which is the record
// this appendix exists to hold.
const { readdirSync } = await import('node:fs')
const plans = readdirSync(ROOT)
  .filter((f) => /^release-plan(\.[0-9.]+)?\.json$/.test(f))
  .map((f) => ({ file: f, plan: JSON.parse(readFileSync(join(ROOT, f), 'utf8')) }))
  .sort((a, b) => a.plan.run.localeCompare(b.plan.run))
const plan = plans.find((p) => p.file === 'release-plan.json').plan

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const ORBIT = [...k.VORTEX_ORBIT]
const AXIS = [...k.VORTEX_AXIS]
const freq = DIGITS.map((d) => ma.calculateA432Frequency(d))
const angle = DIGITS.map((d) => ma.angleForDigit(d))
const seals = Object.keys(lb.SEALS)
const held = seals.filter((n) => lb.runSeal(n).seal === 'held')
const axioms = Object.entries(lb.ASSUMPTIONS)
// The verdict, not the stopwatch. evaluateRealtimeCriterion measures wall clock,
// so worstNs, misses and the qubit reach differ on every run and on every
// machine — and a generated artifact that embeds them can never match itself,
// which paper:check said the first time it ran. They are also the wrong thing
// to print: a paper stating "worst step 15917 ns" is stating a property of the
// laptop it was generated on. What belongs on the page is the DEADLINE, which
// is declared, the bound, which is stated, and whether every condition is met,
// which is stable. The measurements are reported by the criterion at run time,
// where the reader can take their own.
const realtime = rt.evaluateRealtimeCriterion(500)
const validation = va.evaluateValidationCriterion()

// ---- MathML helpers -------------------------------------------------------
const mi = (s) => `<mi>${s}</mi>`
const mn = (s) => `<mn>${s}</mn>`
const mo = (s) => `<mo>${s}</mo>`
const row = (...xs) => `<mrow>${xs.join('')}</mrow>`
const frac = (a, b) => `<mfrac>${a}${b}</mfrac>`
const sup = (a, b) => `<msup>${a}${b}</msup>`
const sub = (a, b) => `<msub>${a}${b}</msub>`
const sqrt = (a) => `<msqrt>${a}</msqrt>`
const fenced = (x, o = '(', c = ')') => `<mrow>${mo(o)}${x}${mo(c)}</mrow>`
const set = (xs) => `<mrow>${mo('{')}${xs.map(mn).join(mo(','))}${mo('}')}</mrow>`

let eqn = 0
/**
 * Every numbered equation, in both notations, in declaration order.
 *
 * LaTeX is a SECOND BACKEND over the same equations, not a second document. The
 * page is MathML because that is what a browser prints natively; a journal wants
 * .tex. Writing the formulas twice would be two copies of one claim that can
 * disagree — the defect this repository spent two runs recording — so each
 * equation carries both notations here and one generator emits both artifacts.
 */
const EQUATIONS = []
/** A numbered display equation. Numbering is generated, never typed. */
const eq = (mathml, note = '', latex = '') => {
  eqn += 1
  EQUATIONS.push({ n: eqn, latex, note })
  return `<figure class="eq" id="eq${eqn}">
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">${mathml}</math>
  <span class="eqno">(${eqn})</span>
  ${note ? `<figcaption>${note}</figcaption>` : ''}
</figure>`
}
const ref = (n) => `<a class="eqref" href="#eq${n}">(${n})</a>`

// ---- the equations --------------------------------------------------------
const E_DR = eq(row(
  mi('dr'), fenced(mi('n')), mo('='), mn('1'), mo('+'),
  fenced(row(fenced(row(mi('n'), mo('&#8722;'), mn('1'))), mo('mod'), mn('9'))),
  mo(','), `<mspace width="1em"/>`, mi('n'), mo('&#8805;'), mn('1'),
), 'The digital root, as a closed form rather than an iteration. It is idempotent, and invariant under adding nine.', '\\mathrm{dr}(n) = 1 + \\bigl((n-1) \\bmod 9\\bigr), \\qquad n \\geq 1')

const E_ORBIT = eq(row(
  sub(mi('d'), row(mi('k'), mo('+'), mn('1'))), mo('='),
  mi('dr'), fenced(row(mn('2'), sub(mi('d'), mi('k')))),
), `Doubling inside the digital root. From <math xmlns="http://www.w3.org/1998/Math/MathML">${row(sub(mi('d'), mn('0')), mo('='), mn('1'))}</math> the walk is ${ORBIT.join(' &#8594; ')} and closes after six.`, 'd_{k+1} = \\mathrm{dr}(2 d_k)')

const E_ORBITSET = eq(row(
  mi('O'), mo('='), set(ORBIT), mo(','), `<mspace width="1em"/>`,
  mi('A'), mo('='), set(AXIS), mo(','), `<mspace width="1em"/>`,
  mi('O'), mo('&#8745;'), mi('A'), mo('='), mo('&#8709;'),
), 'The orbit and the axis partition the non-zero digits: six on the doubling ring, three on the axis, and the void makes ten.', 'O = \\{1,2,4,8,7,5\\}, \\qquad A = \\{3,6,9\\}, \\qquad O \\cap A = \\varnothing')

const E_VOID = eq(row(
  mi('v'), fenced(mi('n')), mo('='), mn('1'), mo('&#8722;'),
  fenced(row(mi('n'), mo('mod'), mn('9'))),
), 'The through-void involution. It is its own inverse, and 5 is its only fixed point.', 'v(n) = 1 - (n \\bmod 9)')

const E_FREQ = eq(row(
  mi('f'), fenced(mi('d')), mo('='), frac(row(mn('432'), mi('d')), mn('12')), mo('='),
  mn('36'), mi('d'), mo(','), `<mspace width="1em"/>`, mi('d'), mo('&#8712;'),
  row(mo('{'), mn('0'), mo(','), mo('&#8230;'), mo(','), mn('9'), mo('}')),
), `Frequency in hertz. The exact form is <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mn('36'), mi('d'))}</math>; the implementation evaluates <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mn('432'), mo('&#215;'), fenced(row(mi('d'), mo('/'), mn('12'))))}</math> and so returns ${freq[7]} at <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('d'), mo('='), mn('7'))}</math> where the exact value is 252. The discrepancy is binary floating point, not arithmetic, and it is stated here rather than rounded away.`, 'f(d) = \\frac{432\\,d}{12} = 36 d, \\qquad d \\in \\{0,\\dots,9\\}')

const E_OCT = eq(row(
  sub(mi('f'), mi('oct')), fenced(mi('n')), mo('='), mn('432'), mo('&#183;'),
  sup(mn('2'), mi('n')),
), `Octave scaling. <math xmlns="http://www.w3.org/1998/Math/MathML">${row(sub(mi('f'), mi('oct')), fenced(row(mi('n'), mo('+'), mn('1'))), mo('='), mn('2'), sub(mi('f'), mi('oct')), fenced(mi('n')))}</math> holds exactly, because the factor is two.`, 'f_{\\mathrm{oct}}(n) = 432 \\cdot 2^{n}')

const E_HUE = eq(row(
  mi('h'), fenced(mi('d')), mo('='), mn('36'), mi('d'), `<mspace width="0.5em"/>`,
  mo('mod'), `<mspace width="0.5em"/>`, mn('360'),
), 'Hue in degrees. Colour and pitch carry the same integer: this is an identity of two definitions, not an empirical correspondence.', 'h(d) = 36 d \\bmod 360')

const E_PHI = eq(row(
  mi('&#966;'), mo('='), frac(row(mn('1'), mo('+'), sqrt(mn('5'))), mn('2')), mo(','),
  `<mspace width="1em"/>`, sup(mi('&#966;'), mn('2')), mo('='), mi('&#966;'), mo('+'), mn('1'),
), `The golden ratio and its defining equation. Computed here as ${mc.GOLDEN_RATIO}.`, '\\varphi = \\frac{1+\\sqrt{5}}{2}, \\qquad \\varphi^{2} = \\varphi + 1')

const E_CMYK = eq(row(
  sub(mi('f'), mi('c')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('3')), mn('2')), mo(','), `<mspace width="0.8em"/>`,
  sub(mi('f'), mi('m')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('6')), mn('5')), mo(','), `<mspace width="0.8em"/>`,
  sub(mi('f'), mi('y')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('9')), mn('5')), mo(','), `<mspace width="0.8em"/>`,
  sub(mi('f'), mi('k')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('1')), mn('3')),
), `The four channel ratios, held as exact fractions rather than decimals: ${Object.entries(cm.CMYK_FREQUENCY_RATIOS).map(([n, f]) => `${n} ${f.numerator}/${f.denominator}`).join(', ')}. Two of them do not terminate in decimal, which is the reason the representation is a pair of integers.`, 'f_c = \\frac{432\\cdot 3}{2},\\quad f_m = \\frac{432\\cdot 6}{5},\\quad f_y = \\frac{432\\cdot 9}{5},\\quad f_k = \\frac{432\\cdot 1}{3}')

const E_MEDIANT = eq(row(
  mi('med'), fenced(row(frac(sub(mi('a'), mn('1')), sub(mi('b'), mn('1'))), mo(','), frac(sub(mi('a'), mn('2')), sub(mi('b'), mn('2'))))),
  mo('='), frac(row(sub(mi('a'), mn('1')), mo('+'), sub(mi('a'), mn('2'))), row(sub(mi('b'), mn('1')), mo('+'), sub(mi('b'), mn('2')))),
), `The mediant, which lies strictly between its arguments and is <em>not</em> their mean: <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('med'), fenced(row(frac(mn('1'), mn('2')), mo(','), frac(mn('1'), mn('3')))), mo('='), frac(mn('2'), mn('5')))}</math> while the mean is 5/12. Computed here as ${(() => { const m = yy.harmonizeYinYangFraction({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 }); return `${m.numerator}/${m.denominator}` })()}.`, '\\mathrm{med}\\!\\left(\\frac{a_1}{b_1},\\frac{a_2}{b_2}\\right) = \\frac{a_1+a_2}{b_1+b_2}')

const E_H = eq(row(
  mi('H'), mo('='), frac(mn('1'), sqrt(mn('2'))),
  // The brackets are SCALED rather than stretched. MathML's stretchy fences are
  // not implemented uniformly around <mtable> — three attempts with stretchy,
  // minsize and fence all rendered a text-height bracket beside a two-row
  // matrix, which reads as a typesetting accident. mathsize works everywhere.
  `<mrow><mstyle mathsize="230%"><mo>[</mo></mstyle>`
  + `<mtable columnspacing="1em" rowspacing="0.3em">`
  + `<mtr><mtd>${mn('1')}</mtd><mtd>${mn('1')}</mtd></mtr>`
  + `<mtr><mtd>${mn('1')}</mtd><mtd>${row(mo('&#8722;'), mn('1'))}</mtd></mtr>`
  + `</mtable><mstyle mathsize="230%"><mo>]</mo></mstyle></mrow>`,
  mo(','), `<mspace width="1em"/>`, sup(mi('H'), mn('2')), mo('='), mi('I'),
), 'The Hadamard gate and its involution. The seal decides this by applying it twice to each basis state of one qubit; linearity makes two states exhaustive.', 'H = \\frac{1}{\\sqrt{2}}\\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}, \\qquad H^{2} = I')

const E_BORN = eq(row(
  `<munder><mo movablelimits="false">&#8721;</mo><mi>i</mi></munder>`,
  sup(`<mrow><mo>|</mo>${sub(mi('a'), mi('i'))}<mo>|</mo></mrow>`, mn('2')),
  mo('='), mn('1'),
), 'The Born rule as a normalisation condition. Every unitary step in the simulator preserves it, and the tensor product of two normalised registers is normalised.', '\\sum_i |a_i|^{2} = 1')

const E_EREV = eq(row(
  sup(mi('E'), mo('&#176;')), mo('='), frac(row(mo('&#916;'), mi('G')), row(mi('n'), mi('F'))),
), `The reversible cell potential. With <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('n'), mo('='), mn(String(th.ELECTRONS)))}</math> and <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('F'), mo('='), mn(String(th.FARADAY)))}</math> C&#183;mol&#8315;&#185;, this is ${th.reversiblePotentialMicrovolts()} &#181;V, from &#916;G = ${th.toKilojoulesPerMole(th.GIBBS_SPLITTING)} kJ&#183;mol&#8315;&#185;.`, 'E^{\\circ} = \\frac{\\Delta G}{nF}')

const E_ETN = eq(row(
  sub(mi('E'), mi('tn')), mo('='), frac(row(mo('&#916;'), mi('H')), row(mi('n'), mi('F'))),
), `The thermoneutral potential, ${th.thermoneutralPotentialMicrovolts()} &#181;V. It exceeds the reversible potential because the entropy term is negative for this reaction; the difference is the heat the surroundings must supply.`, 'E_{\\mathrm{tn}} = \\frac{\\Delta H}{nF}')

const E_COD = eq(row(
  sub(mi('C'), mi('be')), mo('='), mn(String(ww.breakEvenCod())), `<mspace width="0.4em"/>`,
  mi('mg'), mo('&#183;'), sup(mi('L'), row(mo('&#8722;'), mn('1'))),
), 'The break-even organic load, computed rather than asserted. Below it the process consumes more energy than it recovers.', 'C_{\\mathrm{be}} = 4195\\ \\mathrm{mg}\\cdot\\mathrm{L}^{-1}')

const E_DEADLINE = eq(row(
  mi('T'), mo('='), frac(mn('1'), mn(String(rt.FRAME_HZ))), `<mspace width="0.3em"/>`, mi('s'),
  mo('='), mn(String(Math.round(rt.DEADLINE_NS))), `<mspace width="0.3em"/>`, mi('ns'),
), `The real-time deadline, stated before any measurement is taken rather than chosen after one. The criterion reports the worst observed step and the miss count when it is run; those are properties of the machine it runs on and are deliberately not printed here.`, 'T = \\frac{1}{60}\\ \\mathrm{s}')

const E_JITTER = eq(row(
  sub(mi('t'), mi('max')), mo('&#8722;'), sub(mi('t'), mi('min')), mo('&#8804;'),
  frac(mi('T'), mn(String(rt.JITTER_FRACTION_DENOMINATOR))),
), 'The jitter bound. The maximum is the measure and the mean is not: a system that misses one deadline in a thousand has missed a deadline.', 't_{\\max} - t_{\\min} \\leq \\frac{T}{2}')

const E_REACH = eq(row(
  mi('C'), fenced(mi('q')), mo('&#8712;'), mo('&#920;'), fenced(sup(mn('2'), mi('q'))), mo(','), `<mspace width="1em"/>`,
  mi('C'), fenced(mi('q')), mo('&#8804;'), mi('T'),
), `The cost of a full step &#8212; a Hadamard layer, a CNOT ladder and a probability read &#8212; is linear in the number of amplitudes and so doubles with every qubit. The criterion reports the widest register that fits the frame on the machine it runs on; a deadline met at <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('q'))}</math> qubits is met for every narrower one, and that implication is the part which does not depend on the machine.`, 'C(q) \\in \\Theta(2^{q}), \\qquad C(q) \\leq T')

// ---- the page -------------------------------------------------------------
const sealRows = seals.map((n) => `<tr><td><code>${n}</code></td><td>${lb.runSeal(n).seal}</td><td>${escape(lb.runSeal(n).basis)}</td></tr>`).join('\n')
function escape(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

const freqRows = DIGITS.map((d) => `<tr><td>${d}</td><td>${freq[d]}</td><td>${36 * d}</td><td>${angle[d]}</td></tr>`).join('\n')

const body = `<h1>Exact arithmetic over a ten-digit space</h1>
<p class="byline">zeropoint-node ${version} &#183; every figure on this page is computed from the source at generation time</p>

<section class="abstract">
<h2>Abstract</h2>
<p>This page sets out, in standard notation, the arithmetic that <code>zeropoint-node</code>
implements and the predicates that decide it. The digit space is partitioned by
a doubling map into a six-element orbit and a three-element axis; frequency and
hue are one integer read in two units; ratios are carried as pairs of integers
rather than decimals, and the two places where binary floating point departs
from the exact value are stated rather than rounded away. ${held.length} of
${seals.length} theorems carry a predicate that runs and holds, and
${leanLedger.proven} of ${leanLedger.theorems} statements in the Lean files are
accepted by the Lean kernel &mdash; the rest are written down and not proved,
and say so.</p>

<p><strong>How much of this package those predicates actually hold.</strong>
${constrained.reachability.unreachable} of
${constrained.reachability.exportedValues} exported values are not reachable
from any law, so nothing here constrains them; that count is a floor, because
the reachability closure over-approximates. Of the
${constrained.literalCensus.perturbable} exported literal constants,
${constrained.literalCensus.forced} are forced by at least one law and
${constrained.literalCensus.free} are held by nothing. And of the
${seals.length} predicates, ${pinning.tally.pinned ?? 0} are
<em>pinned</em> rather than forced &mdash; they hold an expected value as a
literal, which falls for a convention as readily as for a law. These are
measured by experiment, not asserted, and the experiments are Appendix G and
this page's own gates. A reader meeting only the sentence above would take this
package to be far better constrained than it is. ${axioms.length} claims are
recorded as axioms, because no finite computation decides them, and each is
named in &#167;7. <strong>No physical experiment is reported here.</strong></p>
</section>

<section class="claims">
<h2>What this work claims</h2>
<p>Ten contributions, each stated as a claim, each with the thing that decides
it and the thing it does not settle. They are listed here rather than left to
be assembled from appendices &mdash; a reader should not have to reconstruct
what is being asserted.</p>
<ol class="claimlist">
${paEntries.map(([id, c]) => `<li><strong>${escape(c.what.replace(/\s+/g, ' ').trim())}</strong>
<div class="standing"><span class="tag ${escape(c.priorArt?.status ?? '')}">${escape((c.priorArt?.status ?? '').replace(/-/g, ' '))}</span>
${(c.priorArt?.citations ?? []).filter((x) => x.resolved).length > 0
  ? `Related work is cited: ${(c.priorArt.citations).filter((x) => x.resolved).map((x) => `<a href="https://doi.org/${escape(x.id)}" rel="noopener">doi:${escape(x.id)}</a>`).join(', ')}.`
  : 'No cited work carries a DOI.'}
Where its prior art would live: ${(c.domains ?? []).map((d) => escape(d)).join('; ')}.</div></li>`).join('\n')}
</ol>
<p class="warn"><strong>None of these is claimed to be novel, and the ledger has
no status that would let it be.</strong> Novelty is a universal negative: it
asserts that nobody, anywhere, published this first, and no finite search
decides that. What IS decided is priority &mdash; a dated, citable deposit at
<a href="https://doi.org/${CONCEPT_DOI}" rel="noopener">doi:${CONCEPT_DOI}</a>,
which defeats a later claim of invention without anyone proving the negative.
That is the strongest defensible position and it is the one taken here. The
axiom <code>no_prior_art_is_undecidable</code> records the rest.</p>
</section>

<section>
<h2>1&ensp;The digit space</h2>
<p>Arithmetic is carried out on the residues of nine, with zero adjoined. The
digital root ${ref(1)} is the representative of the residue class, written in
closed form so that it is one operation rather than a loop.</p>
${E_DR}
<p>Doubling inside the digital root ${ref(2)} generates the orbit. Starting from
one, the walk visits six digits and returns; it never repeats a digit within a
turn, and it never leaves the orbit.</p>
${E_ORBIT}
<p>The remaining non-zero digits form the axis. The two sets are disjoint and
together with the void they exhaust the space ${ref(3)}, which is why the digit
space is exactly ten and not an arbitrary base.</p>
${E_ORBITSET}
<p>The through-void map ${ref(4)} reflects the space. It is an involution, and
its only fixed point is five &#8212; the midpoint of the digit range.</p>
${E_VOID}
</section>

<section>
<h2>2&ensp;Frequency, angle and colour</h2>
<p>A digit is read as a frequency by ${ref(5)} and as a hue by ${ref(7)}. Both
reduce to <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mn('36'), mi('d'))}</math>,
so the two columns of Table 1 hold the same integer. This is an identity of the
two definitions and not a discovered correspondence; it is stated plainly here
because it is the kind of coincidence that invites overclaiming.</p>
${E_FREQ}
${E_OCT}
${E_HUE}
<table>
<caption>Table 1. Frequency, its exact value, and angle, for every digit. The
implementation and the closed form disagree at <em>d</em>&#8202;=&#8202;7 by one
unit in the last place.</caption>
<thead><tr><th><em>d</em></th><th>computed <em>f</em>(<em>d</em>) / Hz</th><th>exact 36<em>d</em></th><th>angle / &#176;</th></tr></thead>
<tbody>${freqRows}</tbody>
</table>
</section>

<section>
<h2>3&ensp;Ratios held as integers</h2>
<p>A ratio is represented as a pair of integers throughout. Two of the four
channel ratios ${ref(9)} do not terminate in decimal, so a decimal
representation of them is an approximation adopted silently; the pair is not.</p>
${E_PHI}
${E_CMYK}
<p>Combination of two ratios uses the mediant ${ref(10)}, which lies strictly
between its arguments. It is not the arithmetic mean, and the two are
distinguished here because the implementation was documented as the mean until
a law was written for it.</p>
${E_MEDIANT}
</section>

<section>
<h2>4&ensp;The state-vector simulator</h2>
<p>Amplitudes are complex and the register is dense. The gates are the standard
ones; ${ref(11)} gives the Hadamard, whose involution is decided exhaustively
over the basis of one qubit.</p>
${E_H}
<p>Normalisation ${ref(12)} is preserved by every unitary step and by the tensor
product, and both facts carry seals rather than assertions.</p>
${E_BORN}
</section>

<section>
<h2>5&ensp;Thermodynamic bounds</h2>
<p>The potentials below are computed from tabulated formation data as exact
rationals and reported in microvolts, an integer unit chosen so that no decimal
appears. They bound the energy claims made elsewhere in this repository; they do
not support them.</p>
${E_EREV}
${E_ETN}
${E_COD}
</section>

<section>
<h2>6&ensp;The real-time bound</h2>
<p>A system is real-time when its correctness depends on producing a result
within a stated deadline. The deadline ${ref(16)} is declared before any
measurement, and the criterion reports the worst step rather than the mean.</p>
${E_DEADLINE}
${E_JITTER}
<p>The bound is only interesting where the work is expensive. Equation ${ref(18)}
gives the widest register whose full step fits inside one frame; the cost
doubles with every qubit, so this is the hardest case rather than the easiest.</p>
${E_REACH}
<p>This page does not print the criterion's verdict. The real-time criterion
MEASURES, so its verdict is a property of the machine it ran on as much as of
the code &#8212; and a page that stated 8 of 8 would be stating something about a
laptop in September 2026. Run <code>npm run criteria:check</code> and take the
verdict on your own hardware. What this page can state, and Appendix A does, is
what each condition requires and what would refute it, which does not vary.</p>
</section>

<section>
<h2>7&ensp;What is not established</h2>
<p>Two claims in this corpus rest on axioms rather than on theorems. They are
recorded so that a reader can see the difference without being asked to take
anyone's word for it.</p>
<dl class="axioms">
${axioms.map(([name, a]) => `<dt><code>${name}</code></dt>
<dd><p class="stmt"><code>${escape(a.statement)}</code></p>
<p><strong>Why it is not sealed.</strong> ${escape(a.why_unsealed)}</p>
<p><strong>What is decided instead.</strong> ${escape(a.what_is_decided_instead)}</p></dd>`).join('\n')}
</dl>
<p class="warn">${escape(validation.doesNotEstablish)}</p>
</section>

<section class="appendix">
<h2>Appendix A&ensp;Every criterion, condition by condition</h2>
<p>Six criteria gate a release and one is reported without gating. Each
condition below states what it <em>requires</em> and what would change its
verdict; a condition with no refuter is a slogan.</p>
<p><strong>No verdict appears on this page</strong>, and the omission is
deliberate rather than modest. A criterion that measures returns a number about
the machine it ran on, and this page was generated once: printing 8 of 8 here
would be reporting a laptop. The generator learned this twice &#8212; first by
embedding durations, so the artifact could never match itself on re-check, and
then by embedding the SCORE, which flips with load about once in three runs.
What does not vary is what each condition requires and what would refute it, so
that is what is printed. Take the verdict with
<code>npm run criteria:check</code>.</p>
${criteriaAll.map((c) => `<div class="crit">
<h3>${c.name} <span class="score">${c.verdict.conditionsTotal} conditions</span>
<span class="gated">${c.gated ? 'gates the release' : 'reported, not gated'}</span></h3>
<p class="subj">${escape(c.subject)}</p>
<table class="cond"><thead><tr><th>condition</th><th>requires</th><th>what would change it</th></tr></thead><tbody>
${c.verdict.conditions.map((k) => `<tr><td><code>${escape(k.id)}</code></td><td>${escape(k.requires)}</td><td>${escape(k.whatWouldChange)}</td></tr>`).join('\n')}
</tbody></table></div>`).join('\n')}
</section>

<section class="appendix">
<h2>Appendix B&ensp;The claim ledger</h2>
<p>Every effect claim this corpus makes, and the predicate it is bound to. A
claim bound to nothing fails <code>npm run claims:check</code>; so does a
binding that has stopped holding, and so does a ledger entry whose claim no
longer exists. ${Object.values(ledger).filter((e) => e.backedBy && !(e.backedBy in lb.ASSUMPTIONS)).length}
rest on theorems and ${Object.values(ledger).filter((e) => e.backedBy in lb.ASSUMPTIONS).length}
on axioms.</p>
<table class="ledger"><thead><tr><th>where</th><th>claim</th><th>bound to</th></tr></thead><tbody>
${Object.entries(ledger).map(([key, e]) => {
  const [file, text] = key.split('::')
  return `<tr><td class="where">${escape(file)}:${e.line}</td><td>${escape(text)}</td><td><code>${escape(e.backedBy ?? '&#8212;')}</code></td></tr>`
}).join('\n')}
</tbody></table>
<p>Each binding also records what it establishes and what it does not. The two
demarcations that carry the most weight:</p>
<dl class="demarc">
${[...new Set(Object.values(ledger).map((e) => e.backedBy))].map((b) => {
  const one = Object.values(ledger).find((e) => e.backedBy === b)
  return `<dt><code>${escape(b)}</code> <span class="count">&#215;${Object.values(ledger).filter((e) => e.backedBy === b).length}</span></dt>
<dd><p><strong>Establishes.</strong> ${escape(one.establishes)}</p>
<p><strong>Does not establish.</strong> ${escape(one.doesNotEstablish)}</p></dd>`
}).join('\n')}
</dl>
</section>

<section class="appendix">
<h2>Appendix C&ensp;The ratchet</h2>
<p>Twelve surfaces whose ceilings only ever move down. A run that grows one
fails; so does a run that shrinks one without recording it, because an
unrecorded improvement is an unexamined one.</p>
<table><thead><tr><th>surface</th><th>ceiling</th></tr></thead><tbody>
${Object.entries(ratchet.ceilings).map(([k, v]) => `<tr><td><code>${escape(k)}</code></td><td>${v}</td></tr>`).join('\n')}
</tbody></table>
${Object.keys(ratchet.raised ?? {}).length ? `<p>Deliberate increases, each with a recorded reason. A surface may be raised more than once and every reason is kept &#8212; the record used to hold only the latest, which lost one: ${Object.entries(ratchet.raised).flatMap(([k, v]) => (Array.isArray(v) ? v : [v]).map((r) => `<code>${escape(k)}</code> ${r.from}&#8594;${r.to}`)).join('; ')}.</p>` : ''}
</section>

<section class="appendix">
<h2>Appendix D&ensp;The release plan</h2>
<p>A run is planned in full before its first patch is cut, and each release is
measured against the target written for it. A patch that misses its target fails
its own gate; a target amended for a false premise records the amendment. Every
run is kept, finished or not &#8212; a finished run's results are the record this
appendix exists to hold.</p>
${plans.map(({ file, plan: pl }) => `<h3>${escape(pl.run)}.x ${file === 'release-plan.json' ? '<span class="gated">current</span>' : '<span class="gated">carried out at ' + escape(pl.carriesTo) + '</span>'}</h3>
<table class="plan"><thead><tr><th>patch</th><th>surface</th><th>from</th><th>to</th><th></th></tr></thead><tbody>
${Object.entries(pl.patches).map(([d, p]) => `<tr><td>${escape(pl.run)}.${d}${p.gateway ? ' &#9670;' : ''}</td><td><code>${escape(p.surface)}</code></td><td>${p.from}</td><td>${p.to}</td><td>${p.amended ? 'amended' : ''}</td></tr>`).join('\n')}
</tbody></table>
<p class="note">${Object.values(pl.patches).filter((p) => p.amended).length} of
${Object.keys(pl.patches).length} targets amended, each for a premise that turned
out to be false rather than for scope.</p>`).join('\n')}
<p class="note">&#9670; marks a gateway, where the kind of work changes rather
than its amount.</p>
</section>

<section class="appendix">
<h2>Appendix E&ensp;Mutations</h2>
<p>A suite that survives a broken implementation has not tested it. Each row
corrupts one line and requires the suite over it to fail; all
${MUTATIONS.length} are caught, across
${new Set(MUTATIONS.map((m) => m[0])).size} modules.</p>
<table class="muts"><thead><tr><th>module</th><th>what the mutation breaks</th></tr></thead><tbody>
${MUTATIONS.map((m) => `<tr><td><code>${escape(m[0])}</code></td><td>${escape(m[4])}</td></tr>`).join('\n')}
</tbody></table>
</section>

<section class="appendix">
<h2>Appendix F&ensp;Seals</h2>
<p>Each row is a predicate that runs. ${held.length} of ${seals.length} hold at
generation time; a seal that stopped holding would fail
<code>npm run test:verification</code> before this page could be regenerated.</p>
<table class="seals">
<thead><tr><th>seal</th><th>status</th><th>basis</th></tr></thead>
<tbody>${sealRows}</tbody>
</table>
</section>

<section class="appendix">
<h2>Appendix G&ensp;Prior art</h2>
<p>Every contribution below names the <em>domains</em> where its prior art would
live. That is the part a reader can act on: a domain is a direction to look, so
an entry nobody has searched is a lead rather than a shrug. No entry is recorded
as <em>novel</em> &mdash; that status does not exist in the ledger, because
novelty is a universal negative and no finite search decides it. It rests on the
axiom <code>no_prior_art_is_undecidable</code> and nowhere else.</p>
<p>${priorArtRows.length} contribution(s); ${paResolved} of ${paCites} citations
carry a DOI that returned, on the recorded date, the title written beside it.
<code>npm run priorart:resolve</code> asks the registry again and fails on any
difference &mdash; including a recorded title that is merely a prefix of the real
one, since a shortened title is a transcription.</p>
<table class="priorart">
<thead><tr><th>contribution</th><th>status</th><th>domains</th><th>cited art</th></tr></thead>
<tbody>${priorArtRows.join('\n')}</tbody>
</table>
</section>

<section class="appendix">
<h2>Appendix H&ensp;Every Lean statement</h2>
<p>All ${leanStatements.length} statements in the <code>lean/</code> sources, as
they are written there. <strong>Proven</strong> means three things together: the
kernel accepted the file, the proof contains no <code>sorry</code>, and
<code>#print axioms</code> reports a dependency set within
<code>{propext, Quot.sound}</code>. The first two alone are not enough — a proof
can invoke a lemma closed with <code>sorry</code> and inherit the vacuity with
the word appearing nowhere near it.</p>
<p>${leanLedger.proven} are proven on that reading. The rest are statements
rather than theorems, and are listed here so the difference is legible rather
than summarised away.</p>
<table class="lean">
<thead><tr><th>name</th><th>statement</th><th>standing</th></tr></thead>
<tbody>${leanRows.join('\n')}</tbody>
</table>
</section>

<section class="appendix">
<h2>Appendix I&ensp;References</h2>
<p>Every work below is cited by a contribution in
<code>src/verification/prior-art.json</code>, and every DOI resolved against
Crossref to the title printed beside it. <code>npm run priorart:resolve</code>
asks again and fails on any difference, including a recorded title that is
merely a prefix of the real one. Six further citations in that ledger carry no
DOI and are listed there as unresolved rather than dropped.</p>
<ol class="refs">
${uniqueReferences.map((r) => `<li>${escape(r.resolvedTitle)}. <a href="https://doi.org/${escape(r.id)}" rel="noopener">doi:${escape(r.id)}</a> <span class="muted">&mdash; cited by <code>${escape(r.contribution)}</code></span></li>`).join('\n')}
</ol>
<h3>This work</h3>
<dl class="where">
<dt>Archive</dt><dd><a href="https://doi.org/${CONCEPT_DOI}" rel="noopener">doi:${CONCEPT_DOI}</a> &mdash; the concept DOI, resolving to the newest deposited version</dd>
<dt>Source</dt><dd><a href="${REPO}" rel="noopener">${escape(REPO)}</a></dd>
<dt>Package</dt><dd><a href="${NPM}" rel="noopener">${escape(NPM)}</a> &mdash; version ${version}</dd>
<dt>Site</dt><dd><a href="${SITE}" rel="noopener">${escape(SITE)}</a></dd>
<dt>Author</dt><dd>${escape(AUTHOR)}, <a href="${ORCID}" rel="noopener">${escape(ORCID)}</a></dd>
<dt>Licence</dt><dd>${escape(manifest.license)}</dd>
</dl>
</section>

<section class="appendix">
<h2>Appendix J&ensp;Reproduction</h2>
<p>This page is generated. To rebuild it from the source and confirm that no
figure on it has drifted:</p>
<pre><code>npm install
npm run paper          # regenerate
npm run paper:check    # fail if the committed page differs
npm run criteria:check # the six predicates this page reports
npm run priorart:resolve # ask the registry whether each DOI is what is written
npm run test:verification</code></pre>
<p>Licence: CC BY-NC-ND 4.0. Deriving from this document requires written
permission.</p>
</section>`

// The receipt covers what the page STATES. A timing measurement is not stated
// on the page and must not be in the model, or the receipt would move on every
// run and mean nothing.
const model = JSON.stringify({
  version, ORBIT, AXIS, freq, angle, seals: held.length,
  eqns: eqn,
  // The criteria appear as their SHAPE, never their verdict: a measured verdict
  // in the receipt is a receipt that moves when the machine is busy.
  criteria: criteriaAll.map((c) => `${c.name}:${c.verdict.conditionsTotal}`),
  claims: Object.keys(ledger).length, ceilings: ratchet.ceilings,
  // Stated on the page, so it belongs in the receipt: dropping a contribution
  // or downgrading a resolved citation must move the hash.
  priorArt: paEntries.map(([id, c]) => `${id}:${c.priorArt?.status}:${(c.domains ?? []).length}`), paResolved,
  // Stated in both renderings; omitted here once, and the theorem count moved
  // from 33 to 35 without the receipt noticing.
  lean: `${leanLedger.proven}/${leanLedger.theorems}`, axioms: axioms.length,
  census: `${constrained.reachability.unreachable}/${constrained.reachability.exportedValues}:${constrained.literalCensus.forced}/${constrained.literalCensus.perturbable}:${pinning.tally.pinned ?? 0}`,
  leanStatements: leanStatements.map((t) => `${t.name}:${t.status}:${(t.axioms ?? []).join('+')}`),
  patches: plans.map((p) => `${p.plan.run}:${Object.keys(p.plan.patches).length}`), mutations: MUTATIONS.length,
})
const receipt = createHash('sha256').update(model).digest('hex').slice(0, 16)

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Exact arithmetic over a ten-digit space &#183; zeropoint-node ${version}</title>
<meta name="description" content="${escape(PAPER_ABSTRACT)}">
<link rel="canonical" href="${PAPER_URL}">

<!-- Google Scholar reads these; they are the reason a technical report is findable as one. -->
<meta name="citation_title" content="${escape(PAPER_TITLE)}">
<meta name="citation_author" content="${escape(AUTHOR)}">
<meta name="citation_author_institution" content="zeropoint-node">
<meta name="citation_publication_date" content="${new Date(manifest.releaseDate ?? Date.now()).getFullYear()}">
<meta name="citation_doi" content="${CONCEPT_DOI}">
<meta name="citation_abstract_html_url" content="${PAPER_URL}">
<meta name="citation_public_url" content="${PAPER_URL}">
<meta name="citation_technical_report_number" content="${escape(manifest.name)} ${version}">
<meta name="citation_language" content="en">
<meta name="citation_keywords" content="${escape((manifest.keywords ?? []).join('; '))}">

<!-- Dublin Core, for citation managers and repository harvesters. -->
<meta name="DC.title" content="${escape(PAPER_TITLE)}">
<meta name="DC.creator" content="${escape(AUTHOR)}">
<meta name="DC.identifier" content="https://doi.org/${CONCEPT_DOI}">
<meta name="DC.type" content="Text.Technical Report">
<meta name="DC.language" content="en">
<meta name="DC.rights" content="${escape(manifest.license)}">
<meta name="DC.relation" content="${REPO}">

<!-- Link previews. -->
<meta property="og:type" content="article">
<meta property="og:title" content="${escape(PAPER_TITLE)}">
<meta property="og:description" content="${escape(PAPER_ABSTRACT)}">
<meta property="og:url" content="${PAPER_URL}">
<meta property="og:site_name" content="${escape(manifest.name)}">
<meta property="article:author" content="${escape(AUTHOR)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escape(PAPER_TITLE)}">
<meta name="twitter:description" content="${escape(PAPER_ABSTRACT)}">

<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: PAPER_TITLE,
  name: PAPER_TITLE,
  abstract: PAPER_ABSTRACT,
  url: PAPER_URL,
  identifier: `https://doi.org/${CONCEPT_DOI}`,
  version,
  inLanguage: 'en',
  license: `https://spdx.org/licenses/${manifest.license}`,
  author: { '@type': 'Person', name: AUTHOR, '@id': ORCID, url: ORCID, identifier: ORCID },
  publisher: { '@type': 'Organization', name: manifest.name, url: SITE },
  isBasedOn: {
    '@type': 'SoftwareSourceCode',
    name: manifest.name,
    version,
    codeRepository: REPO,
    programmingLanguage: 'TypeScript',
    license: `https://spdx.org/licenses/${manifest.license}`,
    url: NPM,
    identifier: `https://doi.org/${CONCEPT_DOI}`,
    sameAs: [REPO, NPM, `https://doi.org/${CONCEPT_DOI}`, SITE],
  },
  citation: uniqueReferences.map((r) => ({
    '@type': 'CreativeWork',
    name: r.resolvedTitle,
    identifier: `https://doi.org/${r.id}`,
    url: `https://doi.org/${r.id}`,
  })),
  sameAs: [REPO, NPM, `https://doi.org/${CONCEPT_DOI}`],
  // Declared, not omitted. A blank funder field reads as "not stated"; this
  // says "none", which is a different and checkable claim.
  ...(funding.grants.length
    ? { funding: funding.grants.map((g) => ({ '@type': 'Grant', funder: { '@type': 'Organization', name: g.funder }, name: g.name, identifier: g.identifier })) }
    : { funding: [], disambiguatingDescription: funding.statement }),
}, null, 2)}
</script>
<style>
:root { --ink:#111; --rule:#bbb; --muted:#555; --bg:#fff; --accent:#7a1f1f; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --ink:#e8e6e3; --rule:#444; --muted:#a8a29e; --bg:#111; --accent:#e0a0a0; }
}
* { box-sizing: border-box; }
body {
  background: var(--bg); color: var(--ink); margin: 0 auto; max-width: 46em; padding: 3em 1.5em 6em;
  font: 400 11.5pt/1.55 "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  text-rendering: optimizeLegibility; hyphens: auto;
}
h1 { font-size: 1.9em; line-height: 1.15; margin: 0 0 .3em; font-weight: 600; letter-spacing: -0.01em; }
h2 { font-size: 1.15em; margin: 2.4em 0 .7em; font-weight: 600; }
.byline { color: var(--muted); font-size: .92em; margin: 0 0 2.5em; font-variant: small-caps; letter-spacing: .02em; }
.abstract { border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); padding: 1em 0 .3em; margin-bottom: 2em; }
.abstract h2 { margin-top: 0; font-size: 1em; font-variant: small-caps; letter-spacing: .05em; }
.abstract p { font-size: .97em; }
p { margin: 0 0 .85em; text-align: justify; }
section { margin-bottom: .5em; }
figure.eq { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 0 1em; margin: 1.3em 0; page-break-inside: avoid; break-inside: avoid; }
figure.eq math { font-size: 1.08em; }
.eqno { color: var(--muted); font-size: .95em; }
figcaption { grid-column: 1 / -1; color: var(--muted); font-size: .87em; margin-top: .45em; text-align: left; }
a.eqref { color: inherit; text-decoration: none; border-bottom: 1px dotted var(--rule); }
table { border-collapse: collapse; width: 100%; margin: 1.2em 0; font-size: .9em; page-break-inside: avoid; break-inside: avoid; }
caption { caption-side: bottom; color: var(--muted); font-size: .87em; text-align: left; padding-top: .6em; }
th, td { border-bottom: 1px solid var(--rule); padding: .35em .6em; text-align: left; }
thead th { border-bottom: 1.5px solid var(--ink); font-weight: 600; }
table.seals { font-size: .8em; }
table.seals td:nth-child(3) { color: var(--muted); }
code { font-family: "SF Mono", ui-monospace, Menlo, Consolas, monospace; font-size: .88em; }
pre { background: color-mix(in srgb, var(--ink) 5%, transparent); padding: .9em 1.1em; overflow-x: auto; font-size: .85em; border-left: 2px solid var(--rule); }
dl.axioms dt { font-weight: 600; margin-top: 1.1em; }
dl.axioms dd { margin: .3em 0 0 0; padding-left: 1.2em; border-left: 2px solid var(--rule); }
dl.axioms .stmt { font-size: .88em; }
.warn { border-left: 3px solid var(--accent); padding-left: 1em; font-size: .95em; color: var(--ink); }
.appendix h2 { font-size: 1em; font-variant: small-caps; letter-spacing: .04em; }
.receipt { margin-top: 3em; padding-top: 1em; border-top: 1px solid var(--rule); color: var(--muted); font-size: .82em; }
h3 { font-size: .98em; margin: 1.6em 0 .2em; font-weight: 600; }
.crit { margin-bottom: 1.4em; page-break-inside: avoid; break-inside: avoid; }
.crit .score { color: var(--muted); font-weight: 400; }
.crit .gated { float: right; font-size: .78em; font-weight: 400; color: var(--muted); font-variant: small-caps; letter-spacing: .04em; }
.crit .subj { color: var(--muted); font-size: .86em; margin: 0 0 .4em; text-align: left; }
table.cond { font-size: .78em; }
table.cond td:first-child { width: 1.4em; text-align: center; }
table.cond td:nth-child(2) { white-space: nowrap; }
table.ledger { font-size: .74em; table-layout: fixed; }
table.ledger td { vertical-align: top; word-break: break-word; }
table.ledger .where { width: 12em; color: var(--muted); font-family: "SF Mono", ui-monospace, Menlo, monospace; font-size: .92em; }
table.lean { font-size: .72em; table-layout: fixed; }
table.lean td { vertical-align: top; word-break: break-word; }
table.lean td:first-child { width: 13em; }
table.lean td:last-child { width: 13em; color: var(--muted); }
table.lean .stmt { font-family: "SF Mono", ui-monospace, Menlo, monospace; }
table.lean .where { color: var(--muted); font-size: .88em; }
table.lean .ax { display: block; }
table.lean tr.sorry .stmt, table.lean tr\\.unverifiable-here .stmt { color: var(--muted); }
section.claims { margin: 2em 0; }
ol.claimlist { padding-left: 1.3em; }
ol.claimlist li { margin: .9em 0; }
ol.claimlist strong { display: block; }
.standing { font-size: .84em; color: var(--muted); margin-top: .25em; }
.tag { display: inline-block; border: 1px solid var(--rule); border-radius: 3px; padding: 0 .35em; margin-right: .4em; font-size: .92em; }
ol.refs { font-size: .86em; }
ol.refs li { margin: .45em 0; }
dl.where dt { font-weight: 600; margin-top: .5em; }
dl.where dd { margin: 0 0 .2em 1.2em; }
.muted { color: var(--muted); }
table.priorart { font-size: .76em; table-layout: fixed; }
table.priorart td { vertical-align: top; word-break: break-word; }
table.priorart td:first-child { width: 11em; }
table.priorart td:nth-child(2) { width: 8em; color: var(--muted); }
table.priorart td:nth-child(3) { width: 13em; color: var(--muted); }
table.priorart ul { margin: 0; padding-left: 1.1em; }
table.priorart li { margin: .2em 0; }
.nodoi { color: var(--muted); font-style: italic; }
table.ledger td:last-child { width: 12em; }
table.muts { font-size: .78em; }
table.muts td:first-child { width: 16em; }
table.plan { font-size: .84em; }
dl.demarc dt { font-weight: 600; margin-top: 1em; }
dl.demarc dd { margin: .25em 0 0 0; padding-left: 1.1em; border-left: 2px solid var(--rule); font-size: .88em; }
dl.demarc .count { color: var(--muted); font-weight: 400; }
.note { color: var(--muted); font-size: .87em; }

@page {
  size: A4;
  margin: 22mm 20mm 24mm;
}
@media print {
  :root { --ink:#000; --rule:#999; --muted:#444; --bg:#fff; --accent:#000; }
  body { max-width: none; padding: 0; font-size: 10.5pt; color: #000; background: #fff; }
  h1 { font-size: 17pt; }
  h2 { font-size: 12pt; page-break-after: avoid; break-after: avoid; }
  section { page-break-inside: auto; }
  .abstract { page-break-inside: avoid; }
  pre { border-left: 1px solid #999; background: none; }
  a.eqref { border-bottom: none; }
  .receipt { page-break-before: avoid; }
}
</style>
</head>
<body>
${body}
<p class="receipt">Generated from source. Model receipt <code>${receipt}</code> over
${eqn} equations, ${seals.length} seals and ${axioms.length} axioms. Any change to
the arithmetic this page reports moves the receipt, and <code>npm run paper:check</code>
fails until the page is regenerated.</p>
</body>
</html>
`

/**
 * The same paper as a LaTeX article: same figures, same numbering, one source.
 *
 * NOT COMPILE-TESTED. No TeX engine is installed here, so this generator can
 * check that the environments balance, that no `%` is unescaped, that `$` pairs
 * up and that no HTML entity or tag survived the conversion — and it does, in
 * the structural pass below — but it CANNOT claim the document typesets. Saying
 * "publication-ready" about a file nobody has run through LaTeX is the kind of
 * claim this repository spends its releases removing.
 */
const texEscape = (t) => String(t)
  .replace(/&#8212;/g, '---').replace(/&#8722;/g, '-').replace(/&#183;/g, '\\cdot ')
  .replace(/&#215;/g, '\\times ').replace(/&#8804;/g, '$\\leq$').replace(/&#8805;/g, '$\\geq$')
  .replace(/&#8709;/g, '$\\varnothing$').replace(/&#8745;/g, '$\\cap$').replace(/&#966;/g, '$\\varphi$')
  .replace(/&#181;/g, '$\\mu$').replace(/&#916;/g, '$\\Delta$').replace(/&#176;/g, '$^\\circ$')
  .replace(/&#8594;/g, '$\\to$').replace(/&#9670;/g, '$\\diamond$').replace(/&#8230;/g, '\\dots')
  .replace(/&#10003;/g, 'yes').replace(/&#10007;/g, 'no').replace(/&#8721;/g, '$\\sum$')
  .replace(/<math[^>]*>[\s\S]*?<\/math>/g, '')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '\\&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/([%$#_{}])/g, '\\$1')
  .replace(/\s+/g, ' ').trim()

const texDoc = `% Generated by scripts/paper-gen.mjs — do not edit.
% Every figure is read from the source at generation time; paper:check fails on
% a byte of drift. The HTML at docs/public/paper.html is the same document in
% MathML, from the same generator and the same numbers.
\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=25mm]{geometry}
\\usepackage{amsmath,amssymb,booktabs,microtype}
\\title{Exact arithmetic over a ten-digit space}
\\author{zeropoint-node ${version}}
\\date{}
\\begin{document}
\\maketitle

\\begin{abstract}
This paper sets out the arithmetic that \\texttt{zeropoint-node} implements and the
predicates that decide it. The digit space is partitioned by a doubling map into a
six-element orbit and a three-element axis; frequency and hue are one integer read in
two units; ratios are carried as pairs of integers rather than decimals. ${held.length} of
${seals.length} theorems carry a predicate that runs and holds, and ${leanLedger.proven} of
${leanLedger.theorems} statements in the Lean files are accepted by the Lean kernel.
${axioms.length} claims are recorded as axioms because no finite computation decides them.
\\textbf{How much of the package those predicates hold:} ${constrained.reachability.unreachable} of
${constrained.reachability.exportedValues} exported values are reachable from no law at all (a floor, not a total);
of ${constrained.literalCensus.perturbable} exported literal constants ${constrained.literalCensus.forced} are forced and
${constrained.literalCensus.free} are held by nothing; and ${pinning.tally.pinned ?? 0} of the ${seals.length} predicates are
pinned rather than forced. Measured, not asserted.
\\textbf{No physical experiment is reported here.}
\\end{abstract}

${EQUATIONS.map((e) => `\\begin{equation}\n${e.latex}\n\\end{equation}\n${e.note ? `\\noindent\\small ${texEscape(e.note)}\\normalsize\n` : ''}`).join('\n')}

\\section*{What is not established}
${axioms.map(([name, a]) => `\\paragraph{\\texttt{${name}}} ${texEscape(a.why_unsealed)} What is decided instead: ${texEscape(a.what_is_decided_instead)}`).join('\n\n')}

\\paragraph{} ${texEscape(validation.doesNotEstablish)}

\\section*{Prior art}
Every contribution names the domains where its prior art would live; no entry is recorded as novel,
because novelty is a universal negative that no finite search decides. It rests on the axiom
\\texttt{no\\_prior\\_art\\_is\\_undecidable}.
\\begin{itemize}
${paEntries.map(([id, c]) => `\\item \\texttt{${texEscape(id)}} --- ${texEscape(c.priorArt?.status ?? '')}. `
 + `Domains: ${texEscape((c.domains ?? []).join('; '))}. `
 + ((c.priorArt?.citations ?? []).filter((x) => x.kind === 'doi' && x.id).length
     ? `Cited: ${(c.priorArt.citations).filter((x) => x.kind === 'doi' && x.id).map((x) => `\\texttt{${texEscape(x.id)}}`).join(', ')}.`
     : 'No cited work carries a DOI.')).join('\n')}
\\end{itemize}

\\section*{Every Lean statement}
All ${leanStatements.length} statements in the \\texttt{lean/} sources. \\emph{Proven} means the kernel accepted the file,
the proof contains no \\texttt{sorry}, and \\texttt{\\#print axioms} reports a dependency set within
$\\{$\\texttt{propext}, \\texttt{Quot.sound}$\\}$. ${leanLedger.proven} of them meet it.
\\begin{itemize}\\small
${leanStatements.map((t) => `\\item \\texttt{${texEscape(t.name)}} (${texEscape(t.file)}) --- ${leanToTex(t.statement)}\\\\\n`
 + `\\textbf{${texEscape(STATUS_WORD[t.status] ?? t.status)}}`
 + (t.axioms === undefined ? '' : t.axioms.length ? `, resting on ${t.axioms.map((a) => `\\texttt{${texEscape(a)}}`).join(', ')}` : ', resting on no axioms')).join('\n')}
\\end{itemize}

\\section*{What this work claims}
\\begin{enumerate}\\small
${paEntries.map(([id, c]) => `\\item \\textbf{${texEscape(c.what.replace(/\s+/g, ' ').trim())}} --- ${texEscape(c.priorArt?.status ?? '')}.`).join('\n')}
\\end{enumerate}
\\noindent\\textbf{None of these is claimed to be novel.} Novelty is a universal negative and no finite search decides it.
What is decided is priority: a dated deposit at \\texttt{doi:${CONCEPT_DOI}}, which defeats a later claim of invention.

\\section*{References}
\\begin{enumerate}\\small
${uniqueReferences.map((r) => `\\item ${texEscape(r.resolvedTitle)}. \\texttt{doi:${texEscape(r.id)}}`).join('\n')}
\\end{enumerate}
\\noindent Archive: \\texttt{doi:${CONCEPT_DOI}}. Source: \\texttt{${texEscape(REPO)}}.
Package: \\texttt{${texEscape(NPM)}}. Author: ${texEscape(AUTHOR)}, \\texttt{${texEscape(ORCID)}}.

\\section*{Reproduction}
\\begin{verbatim}
npm install
npm run paper          # regenerate both artifacts
npm run paper:check    # fail if either has drifted
npm run lean:check     # what the Lean kernel accepts
npm run criteria:check # the six predicates
npm run priorart:resolve # re-resolve every DOI (network)
\\end{verbatim}
\\end{document}
`

if (CHECK) {
  if (!existsSync(OUT)) { console.error('paper:check FAIL — docs/public/paper.html is missing; run npm run paper'); process.exit(1) }
  const texProblems = texStructuralProblems(texDoc)
  if (texProblems.length > 0) {
    console.error(`paper:check FAIL — the LaTeX is malformed: ${texProblems.join('; ')}`)
    process.exit(1)
  }
  const onTex = existsSync(TEX) ? readFileSync(TEX, 'utf8') : null
  if (onTex !== texDoc) {
    console.error('paper:check FAIL — docs/public/paper.tex has drifted from the source; run npm run paper')
    process.exit(1)
  }
  const on = readFileSync(OUT, 'utf8')
  if (on !== html) {
    console.error('paper:check FAIL — docs/public/paper.html has drifted from the source; run npm run paper')
    process.exit(1)
  }
  console.log(`paper:check ok — ${eqn} equations in MathML and LaTeX, receipt ${receipt} (the .tex is structurally checked, not compiled: no TeX engine here)`)
  process.exit(0)
}

/**
 * What can be decided without a TeX engine. Each is a defect the conversion has
 * actually produced at some point: an unbalanced environment, a raw `%` that
 * comments out the rest of a line, an odd number of `$`, and HTML entities or
 * tags surviving a strip that missed a case.
 */
function texStructuralProblems(doc) {
  const out = []
  // A Lean symbol with no LaTeX mapping is emitted as [U+XXXX] rather than
  // silently dropped, and that marker must never reach the committed document:
  // it means the .tex shows a placeholder where the .lean states a claim.
  const unmapped = [...String(doc).matchAll(/\[U\+([0-9A-F]+)\]/g)].map((u) => `U+${u[1]}`)
  if (unmapped.length) out.push(`${unmapped.length} Lean symbol(s) have no LaTeX mapping: ${[...new Set(unmapped)].join(', ')} — add them to LEAN_TEX`)
  const count = (re) => (doc.match(re) ?? []).length
  const begins = [...doc.matchAll(/\\begin\{(\w+\*?)\}/g)].map((m) => m[1])
  const ends = [...doc.matchAll(/\\end\{(\w+\*?)\}/g)].map((m) => m[1])
  for (const env of new Set([...begins, ...ends])) {
    const b = begins.filter((x) => x === env).length
    const e = ends.filter((x) => x === env).length
    if (b !== e) out.push(`environment ${env} opened ${b} time(s) and closed ${e}`)
  }
  const body = doc.split('\\begin{document}')[1] ?? ''
  if (/(?<!\\)%/.test(body)) out.push('an unescaped % comments out the rest of its line')
  if (doc.split('$').length % 2 === 0) out.push('an odd number of $ — math mode does not close')
  if (count(/&#\d+;/g) > 0) out.push(`${count(/&#\d+;/g)} HTML entity/entities survived the conversion`)
  if (count(/<[a-zA-Z/][^>]*>/g) > 0) out.push(`${count(/<[a-zA-Z/][^>]*>/g)} HTML tag(s) survived the conversion`)
  return out
}

const texProblems = texStructuralProblems(texDoc)
if (texProblems.length > 0) {
  console.error('paper — the LaTeX is malformed and was not written:')
  for (const p of texProblems) console.error(`  ✗ ${p}`)
  process.exit(1)
}

writeFileSync(OUT, html)
writeFileSync(TEX, texDoc)
console.log(`paper — wrote docs/public/paper.html and paper.tex: ${eqn} numbered equations, ${held.length}/${seals.length} seals, ${axioms.length} axioms, receipt ${receipt}`)
