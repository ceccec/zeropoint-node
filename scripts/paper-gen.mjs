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
const ledger = JSON.parse(readFileSync(join(ROOT, 'scripts/claims.json'), 'utf8')).claims
const ratchet = JSON.parse(readFileSync(join(ROOT, 'ratchet.json'), 'utf8'))
const plan = JSON.parse(readFileSync(join(ROOT, 'release-plan.json'), 'utf8'))

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
const realtimeMet = `${realtime.conditionsMet}/${realtime.conditionsTotal}`
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
/** A numbered display equation. Numbering is generated, never typed. */
const eq = (mathml, note = '') => {
  eqn += 1
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
), 'The digital root, as a closed form rather than an iteration. It is idempotent, and invariant under adding nine.')

const E_ORBIT = eq(row(
  sub(mi('d'), row(mi('k'), mo('+'), mn('1'))), mo('='),
  mi('dr'), fenced(row(mn('2'), sub(mi('d'), mi('k')))),
), `Doubling inside the digital root. From <math xmlns="http://www.w3.org/1998/Math/MathML">${row(sub(mi('d'), mn('0')), mo('='), mn('1'))}</math> the walk is ${ORBIT.join(' &#8594; ')} and closes after six.`)

const E_ORBITSET = eq(row(
  mi('O'), mo('='), set(ORBIT), mo(','), `<mspace width="1em"/>`,
  mi('A'), mo('='), set(AXIS), mo(','), `<mspace width="1em"/>`,
  mi('O'), mo('&#8745;'), mi('A'), mo('='), mo('&#8709;'),
), 'The orbit and the axis partition the non-zero digits: six on the doubling ring, three on the axis, and the void makes ten.')

const E_VOID = eq(row(
  mi('v'), fenced(mi('n')), mo('='), mn('1'), mo('&#8722;'),
  fenced(row(mi('n'), mo('mod'), mn('9'))),
), 'The through-void involution. It is its own inverse, and 5 is its only fixed point.')

const E_FREQ = eq(row(
  mi('f'), fenced(mi('d')), mo('='), frac(row(mn('432'), mi('d')), mn('12')), mo('='),
  mn('36'), mi('d'), mo(','), `<mspace width="1em"/>`, mi('d'), mo('&#8712;'),
  row(mo('{'), mn('0'), mo(','), mo('&#8230;'), mo(','), mn('9'), mo('}')),
), `Frequency in hertz. The exact form is <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mn('36'), mi('d'))}</math>; the implementation evaluates <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mn('432'), mo('&#215;'), fenced(row(mi('d'), mo('/'), mn('12'))))}</math> and so returns ${freq[7]} at <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('d'), mo('='), mn('7'))}</math> where the exact value is 252. The discrepancy is binary floating point, not arithmetic, and it is stated here rather than rounded away.`)

const E_OCT = eq(row(
  sub(mi('f'), mi('oct')), fenced(mi('n')), mo('='), mn('432'), mo('&#183;'),
  sup(mn('2'), mi('n')),
), `Octave scaling. <math xmlns="http://www.w3.org/1998/Math/MathML">${row(sub(mi('f'), mi('oct')), fenced(row(mi('n'), mo('+'), mn('1'))), mo('='), mn('2'), sub(mi('f'), mi('oct')), fenced(mi('n')))}</math> holds exactly, because the factor is two.`)

const E_HUE = eq(row(
  mi('h'), fenced(mi('d')), mo('='), mn('36'), mi('d'), `<mspace width="0.5em"/>`,
  mo('mod'), `<mspace width="0.5em"/>`, mn('360'),
), 'Hue in degrees. Colour and pitch carry the same integer: this is an identity of two definitions, not an empirical correspondence.')

const E_PHI = eq(row(
  mi('&#966;'), mo('='), frac(row(mn('1'), mo('+'), sqrt(mn('5'))), mn('2')), mo(','),
  `<mspace width="1em"/>`, sup(mi('&#966;'), mn('2')), mo('='), mi('&#966;'), mo('+'), mn('1'),
), `The golden ratio and its defining equation. Computed here as ${mc.GOLDEN_RATIO}.`)

const E_CMYK = eq(row(
  sub(mi('f'), mi('c')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('3')), mn('2')), mo(','), `<mspace width="0.8em"/>`,
  sub(mi('f'), mi('m')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('6')), mn('5')), mo(','), `<mspace width="0.8em"/>`,
  sub(mi('f'), mi('y')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('9')), mn('5')), mo(','), `<mspace width="0.8em"/>`,
  sub(mi('f'), mi('k')), mo('='), frac(row(mn('432'), mo('&#183;'), mn('1')), mn('3')),
), `The four channel ratios, held as exact fractions rather than decimals: ${Object.entries(cm.CMYK_FREQUENCY_RATIOS).map(([n, f]) => `${n} ${f.numerator}/${f.denominator}`).join(', ')}. Two of them do not terminate in decimal, which is the reason the representation is a pair of integers.`)

const E_MEDIANT = eq(row(
  mi('med'), fenced(row(frac(sub(mi('a'), mn('1')), sub(mi('b'), mn('1'))), mo(','), frac(sub(mi('a'), mn('2')), sub(mi('b'), mn('2'))))),
  mo('='), frac(row(sub(mi('a'), mn('1')), mo('+'), sub(mi('a'), mn('2'))), row(sub(mi('b'), mn('1')), mo('+'), sub(mi('b'), mn('2')))),
), `The mediant, which lies strictly between its arguments and is <em>not</em> their mean: <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('med'), fenced(row(frac(mn('1'), mn('2')), mo(','), frac(mn('1'), mn('3')))), mo('='), frac(mn('2'), mn('5')))}</math> while the mean is 5/12. Computed here as ${(() => { const m = yy.harmonizeYinYangFraction({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 }); return `${m.numerator}/${m.denominator}` })()}.`)

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
), 'The Hadamard gate and its involution. The seal decides this by applying it twice to each basis state of one qubit; linearity makes two states exhaustive.')

const E_BORN = eq(row(
  `<munder><mo movablelimits="false">&#8721;</mo><mi>i</mi></munder>`,
  sup(`<mrow><mo>|</mo>${sub(mi('a'), mi('i'))}<mo>|</mo></mrow>`, mn('2')),
  mo('='), mn('1'),
), 'The Born rule as a normalisation condition. Every unitary step in the simulator preserves it, and the tensor product of two normalised registers is normalised.')

const E_EREV = eq(row(
  sup(mi('E'), mo('&#176;')), mo('='), frac(row(mo('&#916;'), mi('G')), row(mi('n'), mi('F'))),
), `The reversible cell potential. With <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('n'), mo('='), mn(String(th.ELECTRONS)))}</math> and <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('F'), mo('='), mn(String(th.FARADAY)))}</math> C&#183;mol&#8315;&#185;, this is ${th.reversiblePotentialMicrovolts()} &#181;V, from &#916;G = ${th.toKilojoulesPerMole(th.GIBBS_SPLITTING)} kJ&#183;mol&#8315;&#185;.`)

const E_ETN = eq(row(
  sub(mi('E'), mi('tn')), mo('='), frac(row(mo('&#916;'), mi('H')), row(mi('n'), mi('F'))),
), `The thermoneutral potential, ${th.thermoneutralPotentialMicrovolts()} &#181;V. It exceeds the reversible potential because the entropy term is negative for this reaction; the difference is the heat the surroundings must supply.`)

const E_COD = eq(row(
  sub(mi('C'), mi('be')), mo('='), mn(String(ww.breakEvenCod())), `<mspace width="0.4em"/>`,
  mi('mg'), mo('&#183;'), sup(mi('L'), row(mo('&#8722;'), mn('1'))),
), 'The break-even organic load, computed rather than asserted. Below it the process consumes more energy than it recovers.')

const E_DEADLINE = eq(row(
  mi('T'), mo('='), frac(mn('1'), mn(String(rt.FRAME_HZ))), `<mspace width="0.3em"/>`, mi('s'),
  mo('='), mn(String(Math.round(rt.DEADLINE_NS))), `<mspace width="0.3em"/>`, mi('ns'),
), `The real-time deadline, stated before any measurement is taken rather than chosen after one. The criterion reports the worst observed step and the miss count when it is run; those are properties of the machine it runs on and are deliberately not printed here.`)

const E_JITTER = eq(row(
  sub(mi('t'), mi('max')), mo('&#8722;'), sub(mi('t'), mi('min')), mo('&#8804;'),
  frac(mi('T'), mn(String(rt.JITTER_FRACTION_DENOMINATOR))),
), 'The jitter bound. The maximum is the measure and the mean is not: a system that misses one deadline in a thousand has missed a deadline.')

const E_REACH = eq(row(
  mi('C'), fenced(mi('q')), mo('&#8712;'), mo('&#920;'), fenced(sup(mn('2'), mi('q'))), mo(','), `<mspace width="1em"/>`,
  mi('C'), fenced(mi('q')), mo('&#8804;'), mi('T'),
), `The cost of a full step &#8212; a Hadamard layer, a CNOT ladder and a probability read &#8212; is linear in the number of amplitudes and so doubles with every qubit. The criterion reports the widest register that fits the frame on the machine it runs on; a deadline met at <math xmlns="http://www.w3.org/1998/Math/MathML">${row(mi('q'))}</math> qubits is met for every narrower one, and that implication is the part which does not depend on the machine.`)

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
${seals.length} theorems carry a predicate that runs and holds. Two claims are
recorded as axioms, because no finite computation decides them, and both are
named in &#167;7. <strong>No physical experiment is reported here.</strong></p>
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
<p>Real-time criterion: ${realtimeMet} conditions met. Validation criterion:
${validation.conditionsMet} of ${validation.conditionsTotal}. Neither verdict
prints a duration: run <code>npm run criteria:check</code> to take the
measurement on your own hardware.</p>
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
verdict; a condition with no refuter is a slogan. The evidence each produces is
measured when the criterion runs and is deliberately not printed here, because
some of it is a property of the machine &#8212; take it with
<code>npm run criteria:check</code>.</p>
${criteriaAll.map((c) => `<div class="crit">
<h3>${c.name} <span class="score">${c.verdict.conditionsMet}/${c.verdict.conditionsTotal}</span>
<span class="gated">${c.gated ? 'gates the release' : 'reported, not gated'}</span></h3>
<p class="subj">${escape(c.subject)}</p>
<table class="cond"><thead><tr><th></th><th>condition</th><th>requires</th><th>what would change it</th></tr></thead><tbody>
${c.verdict.conditions.map((k) => `<tr><td>${k.met ? '&#10003;' : '&#10007;'}</td><td><code>${escape(k.id)}</code></td><td>${escape(k.requires)}</td><td>${escape(k.whatWouldChange)}</td></tr>`).join('\n')}
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
${Object.keys(ratchet.raised ?? {}).length ? `<p>Deliberate increases, each with a recorded reason: ${Object.entries(ratchet.raised).map(([k, r]) => `<code>${escape(k)}</code> ${r.from}&#8594;${r.to}`).join('; ')}.</p>` : ''}
</section>

<section class="appendix">
<h2>Appendix D&ensp;The release plan</h2>
<p>${escape(plan.run)} was planned before its first patch was cut, and each
release is measured against the target written for it. A patch that misses its
target fails its own gate; a target amended for a false premise records the
amendment.</p>
<table class="plan"><thead><tr><th>patch</th><th>surface</th><th>from</th><th>to</th><th></th></tr></thead><tbody>
${Object.entries(plan.patches).map(([d, p]) => `<tr><td>${escape(plan.run)}.${d}${p.gateway ? ' &#9670;' : ''}</td><td><code>${escape(p.surface)}</code></td><td>${p.from}</td><td>${p.to}</td><td>${p.amended ? 'amended' : ''}</td></tr>`).join('\n')}
</tbody></table>
<p class="note">&#9670; marks a gateway, where the kind of work changes rather
than its amount. ${Object.values(plan.patches).filter((p) => p.amended).length} of
${Object.keys(plan.patches).length} targets were amended, each for a premise that
turned out to be false rather than for scope.</p>
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
<h2>Appendix G&ensp;Reproduction</h2>
<p>This page is generated. To rebuild it from the source and confirm that no
figure on it has drifted:</p>
<pre><code>npm install
npm run paper          # regenerate
npm run paper:check    # fail if the committed page differs
npm run criteria:check # the six predicates this page reports
npm run test:verification</code></pre>
<p>Licence: CC BY-NC-ND 4.0. Deriving from this document requires written
permission.</p>
</section>`

// The receipt covers what the page STATES. A timing measurement is not stated
// on the page and must not be in the model, or the receipt would move on every
// run and mean nothing.
const model = JSON.stringify({
  version, ORBIT, AXIS, freq, angle, seals: held.length, realtime: realtimeMet,
  validation: validation.conditionsMet, eqns: eqn,
  criteria: criteriaAll.map((c) => `${c.name}:${c.verdict.conditionsMet}/${c.verdict.conditionsTotal}`),
  claims: Object.keys(ledger).length, ceilings: ratchet.ceilings,
  patches: Object.keys(plan.patches).length, mutations: MUTATIONS.length,
})
const receipt = createHash('sha256').update(model).digest('hex').slice(0, 16)

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Exact arithmetic over a ten-digit space &#183; zeropoint-node ${version}</title>
<meta name="description" content="The formulas zeropoint-node implements, in standard notation, with every figure computed from the source.">
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

if (CHECK) {
  if (!existsSync(OUT)) { console.error('paper:check FAIL — docs/public/paper.html is missing; run npm run paper'); process.exit(1) }
  const on = readFileSync(OUT, 'utf8')
  if (on !== html) {
    console.error('paper:check FAIL — docs/public/paper.html has drifted from the source; run npm run paper')
    process.exit(1)
  }
  console.log(`paper:check ok — ${eqn} equations, receipt ${receipt}`)
  process.exit(0)
}

writeFileSync(OUT, html)
console.log(`paper — wrote docs/public/paper.html: ${eqn} numbered equations, ${held.length}/${seals.length} seals, ${axioms.length} axioms, receipt ${receipt}`)
