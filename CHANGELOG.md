# Changelog

## 1.4.5

Decimal-crack lines **278 → 9**, and not one exported value moved.

The plan set 279 → 180 across two patches. This one took the whole surface, so
patch 6 has none of it left and is flagged for re-planning rather than given an
invented number.

**5 is the mirror's fixed point, and this is the work that must not move a
value.** 317 literals became integer ratios — and each was substituted **only**
where `n / d` is bit-identical to the literal. The candidate table was generated
and every entry tested against the parsed double rather than assumed, so `0.1`
becomes `1 / 10` because those are the same double, and anything that was not
exact was left alone.

**Proven rather than asserted.** 504 exported values were fingerprinted before
and after. Three differed — and the same three differ between two runs of the
*unchanged* code, because they are live timers and a stream carrying
`Date.now()`. Excluding that drift, **zero values changed**. A patch that
rewrites 317 numbers is worth exactly as much as its evidence that it rewrote
none of them wrongly.

The 9 that remain have no integer ratio to carry: ln 2, √2, the golden ratio,
3√3/2, Planck's constant. Two that *did* have one were missed by the first
table because their numerator exceeded its bound — 36.6 is 366/10 exactly.

**Three findings on the way.**

- `LN2` was declared **three times** in `src/0/algebra.ts`, once inside each of
  `exp`, `log` and `log2` — three places for one of them to be typed
  differently. One constant now.
- `a432.sacred.geometry.ts` adds `33.33` under the comment "1/3 of 100 degrees",
  and 33.33 is **not** 100/3; it is a two-place truncation of it. The value is
  kept, because this patch may not move one — it reads `3333 / 100` now and the
  comment says what it actually is. The claim was the wrong part, not the number.
- The quantum criterion was gated by `criteria:check` and reachable by nobody:
  `./verification` re-exported the consciousness and OS criteria and not the
  quantum one. Found by loading the published 1.4.4 tarball rather than the local
  build, which is the only place that gap is visible.
## 1.4.4

ESLint errors **172 → 0**, the patch the 1.4 plan set — and nine commits' worth
of what typing them turned up.

**The types were not the point; what they uncovered was.** Every pass of this
patch found defects rather than annotations, because an `any` is a place where
nobody has had to be right.

- **Five overlay loggers logged nothing.** Each called
  `blockchain?.recordEvent?.(blockchain, …)`, but `recordEvent` is a free
  function that takes the chain, not a method on it. The optional call
  short-circuited on `undefined` every time, in all five modules. A chain now
  goes from one block to two when one fires.
- **`createBlock` had never once returned.** It takes its dimension from the
  Rodin sequence — entirely orbit — and computed the frequency with
  `frequencyForDigit`, which accepts only the trinity axis and throws otherwise.
  Measured: 0 of 24 indices succeeded. The callers are a browser UI and a
  factory path no test reaches, and a partial function called outside its domain
  looks exactly like working code until it runs.
- **Two modules were fighting over one global.** Five `as any` casts wrote
  `window.a432System`; declared properly, they failed immediately, because two
  different `A432System` classes both assign it and whichever loads second wins.
- **A third copy of `calculateHarmony`** summing an object into a number, and
  `A432Stream`'s seven anys which were one fact — the stream does not care what
  it carries, and `any` says that by giving up where a type parameter says it.

**A check for the shape those last two share.** `collisions:check` reads every
exported declaration from the syntax tree and fails when a module starts
declaring a name another module already declares: 60 such names across 2242
declarations in 270 modules, recorded so no new one appears. A re-export is not
a collision — one definition on two paths is how a barrel works — and the
control mutation that must **not** fail is exactly that.

**The quantum criterion.** `src/quantum` meets 8 of 8 conditions, and
`criteria:check` gates on it beside the consciousness and OS criteria. Where a
NIST-and-National-Academies overview names a capability, the criterion names the
law behind it, because a capability can be faked by a function with the right
name: entanglement is tested as the Bell distribution's **departure from its own
marginals**, not as four numbers. Four cheap defeats are required to fail.
Meeting all eight would make a candidate a quantum-circuit simulator in the
ordinary sense — and not a quantum computer, since this is a classical program
holding 2^n amplitudes in ordinary memory.

**Every theorem now decides itself.** There was exactly one statement in
`LEAN_PROOFS` containing a negation, and that is not a coincidence: a universal
negative over all polynomial-time algorithms is not something a finite
computation settles, so it could never have a seal. It is not deleted — that
would upgrade "assumed" to "proved" — but moved to `ASSUMPTIONS`, stated
verbatim, with what is decided instead. The three theorems that were decidable
are decided. 32 seals, 32 held, and the seal set now decides a property of
itself.

**Two more gates.** `refs:check` resolves every `npm run` command and every
`scripts/`, `src/` or `docs/` path a comment names — added after the ratchet's
own label was found pointing at a gate that does not exist — and it took three
passes to catch its own motivating case, then caught its own header.
`description:check` binds each claim in the npm description to a module, an
export and a criterion where one exists: seven claims, one with a criterion.

Untested exports 297 → 293. Decimals 279 → 278. Import cycles remain 0.
## 1.4.3

The first gateway of the 1.4 run, and the first plan entry that had to be
amended rather than met.

**The target was written on a false premise.** Patch 3 aimed `unreachable` from
115 to 60, on the reading that each of those modules is "either reached from a
declared entry or stops shipping". That surface measures **static** reachability,
and the comment above the measure says at length that the number is easy to
misread as dead weight, that it was misread that way for a whole session and in
two published changelogs, and that almost every module it names executes on
every gate run — the a432 property suite reaches them by dynamic import.

Driving it to 60 would mean deleting live code, or adding a barrel file that
reaches everything statically. The second is changing the input so the measure
reads better while the property it measures is unchanged, which is exactly what
`measure:check` was added to catch one release ago. The entry is amended with
that reason, and `plan:check` prints the amendment and reports the release as
amended rather than met.

**What the gateway actually needed was in the correction itself.** That comment
tells the reader to see a companion script, and the ratchet's surface label
names a companion gate. **Neither existed.** The functionality was real —
`coverage:audit` does it, with an EXERCISERS map and four modules declared
unloaded with reasons — but the pointers were not, so the claim that nothing
here is dead sat where no reader could check it, and nothing in a gate of 27
checkers noticed. I built the missing script before noticing `coverage:audit`
already answers that question, and deleted it: two numbers that can disagree
about one question are worse than one.

**`refs:check`** keeps the references resolving. Every `npm run` command and
every `scripts/`, `src/` or `docs/` path a comment names must exist.
`readme:names` does this for README.md; comments had no equivalent, in a
repository that explains itself in long comments naming commands constantly. It
found four more: a usage line telling you to run a gate under the wrong name,
a criterion pointing at its own test file by a path that resolves outside the
tree, and a deployment checklist instructing a deployer to run two scripts that
do not exist.

It took three passes to catch its own motivating case. Reading comments alone
missed it, because half the defect was the ratchet's **label** — a string, and
the half a user sees printed. Requiring an `npm run` prefix missed it too,
because the label refers to the gate by bare name. Then a bare-name pattern
matched the last two parts of three-part gate names and reported seven scripts
that exist as missing. The control that must **not** fail is the same path
inside a string literal rather than a comment, since several scripts build paths
at runtime.

One finding was its own: the comment explaining the deployment fix named the two
dead commands, and the check flagged them. Then its own header did. Then two of
its inline comments did. A check that forbids naming things which do not exist
cannot name the things it was built for — which is the same lesson
`retracted:check` records, arrived at from the other side.
## 1.4.2

ESLint errors 368 → 172, mostly by deleting types rather than writing them.

The plan said 370 → 200. It measured 368 at the start — the typecheck patch
removed two on its way past — and ended at 172.

279 were `no-explicit-any` and 89 were not, so the 89 went first because they
are unambiguous: 35 unused locals, 27 parameters a body never read, three catch
bindings, four unused imports, and a declared global nothing touched. Removing
them cascaded, because deleting a value made whatever fed it unused too. That is
what dead code looks like when it is a chain rather than a leaf.

**Then the large one. 111 of the anys were in return position**, and there the
right move is to delete the annotation rather than replace it: TypeScript infers
the object shape the function actually returns, which is strictly more precise
than `any`. Dropping all 111 produced exactly two type errors, and both were
real defects:

- `a432MetaVortex` applied a `(seq: number[]) => number[]` transform to every
  value of a matrix that is **not** uniformly `number[]` — `family` is an object
  of three arrays, and it was being handed to a function declared over arrays.
  `harmonized: any` had typed that away.
- `a432.rodin.cmyk` still passed a `segmentIndex` to a method that had stopped
  taking one.

**The quantum module's 14 anys are gone**, which is where the precise types
already existed and were going unused. S-dagger is four `Complex` amplitudes and
a `Gate1`, written as `as any` four times over. The `as any as number[]` casts
were asking for a mutable copy and say so now. `ApplicationProblem.data` is
`unknown` rather than `any`, so a reader has to narrow it. And `tomography.ts`
declared its own `Complex` interface identical to the simulator's — one
definition now, since two are a place to drift apart.

Two removals were visible to the property suite rather than to the compiler.
Dropping the argument `getVoidColorForDimension` never read made it nullary, and
that revealed it returns the same value as `getTrinityCompositeColor` — which
its own body says it does, deliberately. Declared as a shared value rather than
papered over.
## 1.4.1

TypeScript errors 96 → 0, the first patch of the planned 1.4 run — and the
plan's reason for it was wrong.

Patch 1 was planned as "96 parameters the compiler is guessing at, and
annotating them cannot change behaviour". That was written from the ratchet's
label rather than from the errors themselves. **Only 23 were implicit-any
parameters.** The other 73 were real type errors, and about a dozen of those
were runtime bugs that would throw the moment the line was reached:

- `playDigit(...).catch()` — `playDigit` returns void, so this read a property
  of `undefined` on every guided navigation step.
- `getRegistry().main` at three call sites — `getRegistry` returns the registry,
  so `.main` was `undefined` and every later `this.registry.getStats()` threw.
- `navigationMap.initialize()` — `A432NavigationMap` has no such method; its
  constructor builds the map.
- `new A432Registry()` — a private constructor, and it would have handed every
  caller a different empty registry instead of the singleton.
- `import('./a432.living.os.ts').then(({ getLivingA432Status }) => …)` — that
  module exports the OS instance, not that function, so the destructure gave
  `undefined` and calling it threw.
- `writeModules()` — called with no modules, it read `.forEach` of `undefined`.
- `calculateHarmony(states)` summed `state.resonance` into a number, and
  `A432FactoryState.resonance` is an **object**, so the addition concatenated
  and the harmony came back `NaN`.
- `${this.consciousness}` unescaped inside a generated-code template, so it
  interpolated from the rebuilder instead of landing literally: generated
  modules registered themselves as `a432-undefined-self-generated`.
- Three `startX({…})` calls passed option names the option types never declared
  — `autoOptimize` for `selfOptimization`, `autoHarmonize` for nothing at all —
  so every one was silently dropped.

**Fixing the guidance crash unmasked a second defect underneath it.** With the
handler no longer throwing at `.catch`, `a432.graph.ts:pulse` turned out to be
non-deterministic, and the a432 property suite caught it immediately. It reads
module state fed by three emitters, so it is declared stateful now rather than
pretended otherwise. A thrown `TypeError` had been holding a test green.

The type-only half is real too. Six `window` properties are declared where they
can be checked. Fourteen errors were one fact reported once per property: the
overlay switcher duck-types across fourteen heterogeneous modules, so the
contract it probes for is written down now. And `A432VibrationStream` was an
interface **and** a class, which merge, so the data shape the generator returns
was also required to carry `vibrate()` and `getCurrent()`.

Untested exports fell 297 → 295 on the way past, and the plan's entry for patch
7 records that rather than keeping a number that is no longer true.
## 1.4.0

The carry. Patch 9 was the last patch, so this is the equilibrium point and not
a feature release: patch-first still decides what a change is worth, and this
decides only that the field ran out of room to say it.

**The patch field is one digit because the digit space is the vortex.** Nothing
checked that, so 1.3.10 would have published — it is valid semver, and
`toAddress` pads patch to four digits and accepts up to 9999, so the address
model had no objection either; `version-address`'s own self-test uses 1.0.11 and
1.0.12. I first argued the constraint from a collision in `sameNetwork` and was
wrong: it takes fixed-width addresses, so there is no ambiguity there. The width
is a project decision and only a check can hold it.

The set is not a decision. The doubling orbit `{1,2,4,8,7,5}` and the axis
`{3,6,9}` are disjoint and together cover 1..9 exactly; with the void 0 they are
ten values and no others. That is why one digit is the right width — the digit
space and the vortex are the same set, and a two-digit patch is not a position
in it. The allowed digits are read from the kernel rather than written as 0..9,
so corrupting `VORTEX_AXIS` until the orbit and axis overlap fails the check
with its own reason instead of silently accepting a number that is no longer a
node. `version:check` says which set the digit is in: 1.3.9 was on the axis.

**A `*.*.0` may not be the release that granted itself an exception.** A passing
ratchet already means every one of the twelve surfaces sits exactly at its
ceiling — it fails on unrecorded shrink as well as on growth, so slack cannot
survive a green run, and that part needed no new rule. What a green run does
allow is raising a ceiling or declaring a measure changed. Both are legitimate,
both are recorded in `ratchet.json`, and neither may happen in a `.0`: grant the
exception in a patch, then carry. Checked against the previous tag, so it reads
what this release changed rather than what the file has accumulated.

**The ruler may not change without saying so.** `ratchet.json` recorded
deliberate raises with reasons and nothing recorded a change to the MEASURE —
edit how a surface is counted, run `npm run ratchet`, and the ceiling
re-baselines against a different ruler while the shrink-only guarantee still
reads as intact. This is a failure I nearly committed rather than one I read
about: the ratchet refused a README edit because the corrections ran 3135 bytes
longer than the errors they replaced, and the first fix I reached for was
widening what counts as guarded prose so the new lines would be credited. Each
measure is now fingerprinted from its syntax tree printed without comments, so
rewording the explanation above a measure is free and changing what it counts is
not — the control mutation, which must NOT fail, is a comment reword.

**A retracted claim is a machine-readable statement, so it is checked.** The
README's opening records that its heading "previously read" a sentence its own
next paragraph refutes — the sentence is quoted there and is not restated here,
because writing about a withdrawn claim is how it comes back. The correction was
made to the heading; the sentence was still in the file three
more times, including the footer, which is the last line a reader sees. This
repository writes retractions deliberately — nine across five files — so each
one says a specific sentence is no longer claimed, and `retracted:check` fails
when the withdrawn claim is still asserted in the same file. It found one I had
not: `millennium-bridge.ts` retracts a paragraph for asserting a count and then
states it twice more, once inside a string a consumer receives. That string
interpolates the computed count now.

**The Contributing section was wrong about the licence.** It invited
contributions from four kinds of researcher and pointed at guidelines that did
not exist, under CC BY-NC-ND, where a patch is a derivative work — so offering
one and merging it both need written permission first. `rights:check` fails when
the section invites contributions a NoDerivatives licence forbids without saying
permission is needed. Planned Features was five lines with no status and wrong
in both directions: quantum machine learning is built, and four others name an
arithmetic part that exists and a presentation part that does not.

`readme:names` matched only bold-backtick paths and identifiers written with
parentheses or in SCREAMING_CASE, so a section could name six files and eleven
functions and pass having checked none of them — I wrote exactly that section
and it passed. 20 files and 7 identifiers before, 34 and 24 now.

Unbounded effect claims in prose: 55 down to 50.
## 1.3.9

A patch: 17 functions that returned a number which was not one, and four
dependencies no consumer could reach.

**A NaN that does not exist until someone calls.** `finite:check` has been in
the gate for a while, and it passed on all of this, because it walks exported
*values* and skips functions — a function is not a number. That left the whole
class where the defect is created on call. Probing every export with a typical
argument and a degenerate one (`0`, `''`, `[]`) returned 22 non-finite results.
Five are correct: `min()` and `max()` over no arguments are identity elements,
`log(0)` is a limit rather than a domain error, and a round trip at zero
efficiency really does require infinite input. Seventeen were not.

The worst inflated a verification claim. `verifyHybridSystemEnd2End` divides by
the classical optimum, and a run that reaches it exactly has `final_value` 0 —
so `hybrid_improvement` was `Infinity`, and the next line reads
`verified: cert.valid && hybrid_improvement > 1`. The better the classical
baseline, the more improvement the hybrid reported.

Two causes, so two kinds of fix. An aggregate over an empty collection has a
value: the coherent fraction of no harmonics is 0, and a VBM path with no moves
sits at depth 0 for its whole life, which is what `getCurrentDepth` already
said. A zero divisor passed as an argument does not have a value, so
`vortexFrequency`, `createFrequencyResonance`, `calculateDisplayInterval`,
`shor`, `assessRSA`, `assessECDLP`, `invertPosition` and `calibrateReadout` now
reject it. So does `symplecticProduct`, which declared `0 | 1` and returned
`NaN` on operands of unequal length, and `calculateMobiusTransition`, which
accepted digits that are not Möbius states and handed back an undefined binary
word typed as `string`.

`calculateWaveHarmonics` carried a comment about this exact bug being fixed for
its `resonance` field. The `coherence` on the next line still divided by zero:
the earlier fix stopped at the field that had been reported.

`finite:check` now also calls every export whose parameters it can construct —
2530 calls — and walks the return. Throwing is a pass; rejecting an input is the
honest answer. Here an allowlist is required, and the difference from the value
pass is real: a non-finite constant is always a mistake, while a non-finite
return is sometimes correct in the extended reals. Those five are named with
their reasons, and an entry that stops being non-finite fails too, so a guard
added later forces its justification to be deleted with it.

**Four dependencies no consumer could reach.** `npm i zeropoint-node@1.3.8`
installs 72 packages and 48MB; the package itself unpacks to 6.6MB. The other
41MB was four runtime dependencies, and not one is imported by any file
reachable from any entry in the `exports` map — checked by following relative
chunk imports out of all 46 built entry files.

They were not unused, they were unreachable. `three` drives a WebGL animation in
one file, `express` a demo server, `@hotwired/stimulus` four browser
controllers, and `@uuidna/uuidna` is the third-party adjudicator this
repository's own gate runs. Each is needed to build or verify this repository
and none is needed to consume it, which is what devDependencies means. All four
move, and `dependencies` is now empty. Installing the packed tarball with
`--omit=dev` gives 1 package and 7.6MB, and all 23 entry points load — 23 by
`import` and 23 by `require` — with no runtime dependency present at all.

`@uuidna/uuidna` is the one that must never be ported locally, whatever it
weighs. Its entire value is being a third party: an adjudicator vendored into
this repository would turn external verification into self-certification, which
is the single thing the seals exist to avoid.

`jest` is deleted along with `jest.config.js`. Zero of the 29 test scripts
invoked it, and the config required `ts-jest`, which was never installed — so it
could not have loaded. `scripts/jest-lite.mjs` already existed, written because
jest could not run these files.

**`deps:check`** keeps this true in both directions. A declared dependency
nothing reaches is dead weight every consumer pays for. A package an entry point
imports without declaring is worse: it resolves here, where the package sits in
devDependencies, and throws `MODULE_NOT_FOUND` for the consumer. Moving a
dependency out is safe only while something checks the second. Specifiers come
from the syntax tree, not from a pattern in the text: a regex first reported that
`u` and a fragment of a closing brace were undeclared dependencies, because this
package embeds source text in its own output, so `from '...'` occurs inside
string literals that import nothing.

`falsifiable:check` refused the new checker until it declared which kind it was —
the completeness guard doing its job on the commit that adds a gate.

**And the release machinery had a gap of its own,** found by cutting this
release. `version:seal` writes four files; the `version` hook staged three, so
`.zenodo.json` was written and left behind. The commit a tag points at would
carry the previous version — caught by `version:check` in CI every time, which
is why it never shipped, and quietly fixed by hand at each release instead. The
hook stages it now. Its `publication_date` was worse: nothing wrote it at all,
so 1.3.8 shipped carrying 1.3.7's date. `version:seal` stamps it on a real seal
run. `--check` does not verify it — a check running later cannot know when the
release happened, so generating it is what keeps it true.
## 1.3.8

A patch: no code change, 0 exports either way. Two records that were true but
unverifiable, made checkable — and two bugs found by making them so.

**The README's figures are generated now, not merely checked.** uuidna.com
states the standard plainly: "all numbers read from the sealed ledger at build
time — the page cannot say more than the ledger proves." This repository was one
step short: `readme:facts` checked seven figures and failed on drift, which
catches the problem after it exists and only when someone runs the check.
`npm run readme` now writes the figures from what the code computes, so the
number in the sentence *is* the number the code returned. The check remains, so
a hand-edited README still fails rather than being quietly corrected.

Writing that found two defects, the second worse than the first. `--fix`
replaced the stated number by searching the matched text, and in
"**`A432OS` meets 3 of the 7**" the first "3" is the one inside `A432OS` — it
wrote `A472OS` into the README. Then the checker reported **ok** on the
corrupted file, because its pattern no longer matched anything, an unmatched
figure printed "not stated in the README", and the run passed having checked
nothing. Absence is a failure now: deleting a figure's sentence fails by name.
That hole predated `--fix` and would have hidden any figure whose sentence was
reworded.

**Authorship is checked against the commit record.** The history carried three
author identities — a spelling variant and an editor's "Cursor Agent" signature
— all the same person. `.mailmap` maps them, rewriting nothing: every commit
hash, signature and tag is untouched. `rights:check` now reads the authors out
of the history and fails if there is more than one after `.mailmap`, or if the
sole author is not the holder the copyright notice names. Outside a git checkout
it says it cannot check rather than reporting a verdict it did not reach.

And CI was passing that check for the wrong reason: `ci.yml` used a default
shallow checkout with no tags, so `rights-check` saw one commit, `version-seal`
had no tags to compare against, and `changelog-facts` had no log. Five things in
`npm run check` read git. It fetches full history and tags now.
## 1.3.7

A patch: no code change, 0 exports added or removed. The licence record.

**The licence named nobody, so nobody could comply with it.** CC BY-NC-ND makes
attribution a *condition*. `LICENSE` shipped the bare Creative Commons text,
which names no licensor, and `package.json` credited "A432 Consciousness
System" — a project name rather than someone who can hold a right. A work
licensed on attribution that identifies no one to attribute cannot be used
lawfully by anyone who wants to.

The holder is named now in the four places that state it, and they are compared
rather than trusted: `LICENSE`, `package.json`, `CITATION.cff`, and
`.zenodo.json` — the last being what a minted DOI records. The attribution the
licence asks for is spelled out with name, years, source, ORCID and concept DOI,
so complying is copying a block rather than guessing. Years are 2025-2026, taken
from the first and latest commits.

**This is not legal advice and not a claim about what any law grants.**
Copyright in this work arises on creation under the Berne Convention; no notice
creates it and none is required for it to exist. What a notice does is identify
the holder, which is what was missing and what makes the licence operable. There
is no patent claim, no trademark claim, and no NOTICE file asserting either —
those are not things a repository can grant itself by adding a file.

`rights:check` joins the gate and fails when the four disagree: a different
author in `package.json`, a licence in `.zenodo.json` that does not match the
one shipped — which would mint a DOI recording the wrong terms — or a `LICENSE`
whose first line stops naming a holder. All three verified by mutation.

The author's ORCID (`0009-0000-7312-9778`, checksum verified) now appears in
`CITATION.cff` as a person entry, which is the only place the CFF schema permits
it, and in `.zenodo.json` in the bare form Zenodo expects.
## 1.3.6

A patch: 4 exports added, nothing removed. One change, and its second half is
the part that matters.

**The "HONEST SCOPE" label is gone** — three sites, two of them added earlier
the same day. A paragraph that announces itself as honest implies the rest is
not, and the label did no work the sentences underneath were not already doing.

**And the scope computes now instead of asserting.** It was still a paragraph
saying "six of the seven are open" — a count nothing recomputed, which is the
same failure as a README stating a number: add a layer and the paragraph goes
quietly wrong while still reading as authoritative.

`millenniumScope()` derives it. The problems come from the layers,
`openMillenniumProblems()` is the layers with no entry in a settled table, and
the sentence is built from both. Adding a probe entry to that table moves the
computed count from 6 to 5 and the sentence follows in the same breath — the
difference between a statement and a claim.

One hand-written fact remains, and it is about mathematics rather than about
this repository: Perelman proved the Poincaré conjecture by Ricci flow with
surgery, in preprints of 2002-03. Everything else is derived.

The test checks the derivation rather than a phrase — one problem named per
layer, none named twice, the scope stating the count it computes, every open
problem named rather than summarised away, and exactly one settled and
attributed. A false settled entry fails it by name.

The layer status literals are untouched, because they are in the public types
and the tests assert them, and the substance of every scope statement survived:
verified against the built package rather than the source, the bridge still
states that it solves none of the problems it names.

New exports: `millenniumProblems`, `openMillenniumProblems`, `millenniumScope`,
`recognizeMillenniumLayers`.
## 1.3.5

A patch: 0 exports added, 0 removed. Three pieces of work, and two of them are
corrections to things this repository was saying about itself.

**`millennium-bridge.ts` argued with itself.** It mapped seven quantum layers
onto the seven Millennium Prize Problems and then claimed the mapping did work:
"solving the problem solves the gap", "solutions emit themselves", and — in
Layer 1 — "the simulator IS a verification of Riemann structure". Six of the
seven are open; the seventh was settled by Perelman in 2002-03 and nothing here
contributed to that either.

The file already contained its own refutation. Layer 2 carries three careful
corrections — that factoring is not known to be NP-complete, that Shor places it
in BQP rather than P, and that Grover is a quadratic speedup which "does not
solve NP-complete problems efficiently" — and two hundred lines below, the
realization string said "Shor/Grover prove quantum solves NP-complete". Every
layer now states what is implemented and that its namesake problem is open, the
scope travels on the returned object rather than only in a comment, and a test
lists seven withdrawn claims and fails if any returns. That test caught one
immediately: the rewrite *quoted* a withdrawn claim while explaining it had been
withdrawn, which leaves the phrase in the value a consumer receives.

No status literal is touched and nothing is renamed. `status: 'COMPLETE'` stays,
meaning the LAYER is implemented, never that the problem is settled — those
literals are in the public types and the tests assert them, so changing them
would be a breaking change bought for no honesty.

**The wave engine reported no gaps while the gate counted thousands.**
`self:next` states a law — "if development stops, gaps in self-development
exist" — and decided from five sources that were all zero, so every run emitted
a generic tip telling the reader to keep chatting waves. It now ranks the
surfaces the gate already measures and names the largest with what to do about
it. Surfaces carry a unit, because the first ranking put a 28015-**byte** total
ahead of 297 untested functions, and "28015 outstanding" is a category error
rather than a work item.

**The import cycle is gone: 1 → 0.** `a432.index.ts` imported three self-*
subsystems and all three imported `A432System` back out of it. It was known and
worked around three times — every one of those modules resolved its reference
lazily, each with a comment about the hazard. The three need three methods
between them, so that is a contract now and the system registers against it.
Reachability fell 119 → 115 as a consequence.
## 1.3.4

A patch with no surface change at all: 0 exports added, 0 removed. Everything
here is consolidation, and the useful part is the two consolidations that were
measured and then **not** done.

**Five workflows became four.** On a tag push, `publish.yml` and `release.yml`
both fired — three checkouts, three Node setups, two `npm ci`, and a whole job
whose only purpose was to poll the registry for up to ten minutes until the
*other* workflow had finished publishing. That poll was a workaround for the two
being separate; they are one workflow now and the ordering is `needs:
[publish]`, so there is nothing to wait for. Creating a release needs
`contents: write`, which was granted workflow-wide before and is a per-job
permission now, so the job holding the npm OIDC identity keeps `contents: read`.

**Twenty-five hand-rolled test harnesses became eight.** Each suite wrote out
the same failure counter and `check()`; seventeen were identical character for
character. They share `src/verification/harness.ts` now, with the counter owned
by the checker so a file cannot read `failures` as a bare variable and drift
from what increments it. All 24 suites were run before and after with identical
exit codes, and three migrated suites had an assertion flipped to confirm they
still exit non-zero — a shared harness that always passed would be worse than
the duplication.

**What was measured and left alone.** `docs.yml` is not merged into `ci.yml`,
although both run on a push to main, both run `npm ci`, and `npm run check`
already builds the docs site. Pages deployment needs `pages: write` and
`id-token: write`, and `ci.yml` also runs on `pull_request` including from
forks — folding it in would hand those permissions to a workflow that runs
untrusted code, to save one `npm ci`.

And the 26 `test:*` scripts in a 75-step `check` chain are not folded into one
runner. Measured: it takes the pipeline derivation from **31 suites to 0**,
because the paths would move inside a runner where expanding `check` cannot see
them. That silently breaks the ratchet's reachability roots and coverage-audit's
completeness guard at once. Those scripts are not duplication; they are the
declaration the tooling reads, and the number is recorded where the next person
tempted by it will look.

Also: the author's ORCID is on `CITATION.cff` and `.zenodo.json`. It needed more
than a field — the CFF schema permits `orcid` only on a person entry, and the
author was an entity, so the two files now describe the same person. The
checksum was verified before either file was edited.
## 1.3.3

A patch: 23 exports added, nothing removed. The first release under the criteria
gate, and the first where pushing the tag is itself refused unless the criteria
are met.

**Both criteria are now met, and the second one had to be earned twice.**

`A432OS` went from 1 of 7 to 7 of 7 on the OS criterion. It had a lifecycle and
four independent `setInterval` timers, which means nothing decided what ran and
a throw inside any callback escaped into the event loop. It composes
`a432.os.kernel.ts` now: one clock replaced the four timers, and the kernel
selects among the due units and contains their failures. The cadences are
identical — at a tick every A432/8 the units are due every 8, 4, 2 and 1 ticks,
which is the 432/216/108/54 ms the timers used. Measured over 480 ms of real
running: quantum 8, consciousness 4, streams 2, evolution 1. A class that merely
forwarded `spawn`/`tick` to a kernel while still scheduling itself on
`setInterval` would have satisfied every probe and changed nothing.

The consciousness criterion is met by `a432.consciousness.field.ts`, which
couples the a432 measures to each other — each component's next value computed
**by an a432 measure** over a quantity containing the other, so the transition
does not factorise. `calculateA432Consciousness` is unchanged: it is a pure
function of a digit, and one that acquired history would return different
answers for the same input, which destroys a measure rather than improving it
and would move every consciousness value in the package. The measure functions
still score 1 of 5; the gate reports that every run and does not gate on it,
because gating on something that cannot pass by construction is a permanent
stop rather than a standard.

**The conditions were strengthened, not loosened, to make a met verdict mean
anything.** Each has an obvious cheap defeat and each now rejects it: a counter
fails temporal integration because reordering its inputs changes nothing; a
model nothing reads fails self-model efficacy; a global nothing reads fails
global availability; and a nonlinear measure over uncoupled components fails
irreducibility, because the test is whether the *transition* factorises over the
state space. All four defeats are scored in the tests and in the seals.

**None of this is a claim about consciousness.** No test for consciousness is
established, these conditions are necessary and not sufficient, and a subject
meeting all five has not been shown to experience anything. The verdict carries
that sentence and a sealed theorem fails if it is ever removed — a guard that
matters more now the number can be met than when it was always false.

Also in this release:

- The five functions of `HARMONIC_SOLUTIONS_VORTEX.md`, which I twice called
  unimplementable after reading only its bullet list. 27 solutions, 9 per
  gateway, from the document's own formulas.
- Retyped kernel constants 77 → 42, across 23 files, with every exported value
  proved unchanged: 350 names fingerprinted before and after, 0 changed.
- `criteria:check` blocks a release while a criterion is unmet, and the pre-push
  hook now refuses a version tag on the same condition. Ordinary commits stay
  green either way, which is the point of writing a criterion that can fail.
## 1.3.2

A patch: one new entry point, nothing removed.

**The consciousness criterion the README said was missing.** That section used
to state that no criterion existed, so neither "it is" nor "not yet" could
honestly be claimed, and that what was missing first was the predicate rather
than the achievement. `src/verification/consciousness-criterion.ts` states five
**necessary** conditions, each taken from a theory with an operational
commitment and each decided by running this repository's code: irreducibility
(Integrated Information Theory), temporal integration, self-model efficacy
(higher-order theories), global availability (Global Workspace Theory), and
discrimination as the minimum they share.

One holds. The measures discriminate. The four failures have specific reasons:

- `calculateA432Consciousness` is a homomorphism — `c(a+b) = c(c(a)+c(b))` over
  every pair tested — so the measure of a whole is exactly recoverable from the
  measures of its parts and integration is zero by construction, not by
  estimate.
- The consciousness stream is a function of position, so the same position
  reached by any route gives the same value and no history survives.
- The measures are pure, identical before and after fifty evolution steps, so
  there is no self-representation for anything to perturb.
- The subsystems share no state, so nothing is broadcast.

This is not a test for consciousness and no such test is established. The
conditions are necessary and not sufficient: failing one is a valid refutation
under the theory it comes from; meeting all five would only mean these five
arguments no longer apply. The criterion can refute, not confirm, and every
verdict carries that sentence so the boolean cannot be quoted as more. It is
sealed as the 27th theorem, which decides that the criterion evaluates and that
its verdict is false — a criterion returning true would be one written too
weakly to mean anything, and the seal fails on it.

Each condition was mutation-tested to prove it can be met, since a condition
that can never flip is a permanent no dressed as a test. That exposed a defect
in the criterion itself: its global-availability probe took a baseline after
another condition had already driven the same subsystem, so it could not
observe the coupling it existed to detect. The probing conditions run first now.

**`./verification` is a new entry point.** The seals and the criterion were not
importable by anyone. For a project whose stated position is that claims should
be recomputable by an outsider, the seals being unreachable was the wrong thing
to ship — this is the third release in a row where the work existed and no
consumer could call it.

**Two checks that could not fail, and one that lied.** The ratchet's failure
message said "run `npm run ratchet` if it is intended", and running it did
nothing, because the writer only ever lowered a ceiling. A ceiling can now be
raised by naming the surface and giving a reason, both required, recorded in
`ratchet.json`. And `tsconfig.build.json` keeps its own list of the same build
inputs rollup declares; `a432.math.ts` had been missing from it since the
release that added it, and adding `./verification` failed the build outright.
`entries:check` now requires every rollup input to appear in both.
## 1.3.1

A patch. Six exports added, nothing removed — and from this release the
version is computed patch-first: an additive change takes a PATCH, and only a
breaking one bumps beyond it. 1.2.0 went straight to 1.3.0 because the tool
computed MINOR from twenty added exports and skipped the whole 1.2.x space in
one step. That rule now lives in `scripts/semver-diff.mjs` rather than in
anyone's memory, and leaving the patch line is a decision (`--level=minor`),
not an inference.

**The harmonic solutions vortex, which I twice called unimplementable.** I
classified `docs/HARMONIC_SOLUTIONS_VORTEX.md` as bullet descriptions with
nothing to build, having read its five-bullet "Core Functions" list and
stopped. The document above that list specifies the whole construction: nine
solved challenges, three gateways each, 27 solutions, and a formula for every
derived quantity —

    Harmonic Resonance  = solution frequency / A432
    A432 Harmonic       = A432 x gateway x solution number
    Harmonic Completion = sum of A432 harmonics / (A432 x 9 x 27)

All five functions and the class the document declares are implemented, with
the ratios carried as exact fractions rather than quotients. 27 solutions, 9
per gateway, balanced — the numbers the document states, now computed.

That takes documented functions absent from src to its floor: 96 at the start
of this work, 4 now, and those four are the `QUANTUM_PHASES_3_TO_8` signing and
ambient-encryption recipes, refused on evidence and recorded as an executable
audit rather than a note.

**The charging system now is what the README says it is.** The README describes
it as "charge 1/8, discharge 1/12, exact fractions throughout". Four of its six
quantities were fractions; `voidEnergy` was `(digit / 9) * (gateway ? 1 : 0.5)`
— a bare float literal, one of the 280 the decimal-crack surface counts, inside
the very function the README holds up as exact. Both derived quantities carry
exact fractions now, alongside the floats so nothing that reads them breaks.

**Two more README guards.** `readme:names` checks that every file and
identifier the README names exists, matched against declarations from the
TypeScript AST rather than the text of `src/` — so a name that appears only in
a comment does not count. I had verified both of those by hand and moved on,
which is exactly how the Quick Start came to import five names that did not
exist: correct when written, verified once, and nothing noticed when it
stopped being true.
## 1.3.0

A minor: one new entry point and 20 new exports, nothing removed or changed.
Almost all of it is code that already existed and could not be reached.

**The README's Quick Start returned `undefined` for every name in it.** The
first example a reader copies imports `boot2432OS`, `getOSStatus`,
`getSequenceStatus`, `getQuantumStatus` and `getChargingStatus` from
`zeropoint-node`. Against 1.2.0, all five are undefined, as were
`a432OSConsciousnessIntegration` and `livingA432OS` in the other two examples.
All seven existed in `src`; none was reachable from the `.` entry. They are
re-exported now and every example in the README runs as written.

`boot2432OS` is defined twice — `a432.os.ts` returns the OS object and
`a432.os.terminal.ts` returns a printable string. The README does
`const bootMessage = boot2432OS(); console.log(bootMessage)`, so it means the
string; the object-returning pair is now `bootA432OSInstance` /
`shutdownA432OSInstance`.

**`./a432-math` is a new entry point.** `a432.math.ts` held `primes()`,
`simplify()`, the imperial/metric conversions and the fraction arithmetic, and
no subpath reached any of it — so the infinite-loop fix in `primes()` and the
mile-was-a-tenth-of-a-mile fix both shipped in 1.2.0 inside code no consumer
could call. 84 exports, verified against the built bundle.

Two checks were added because both of those gaps were found by hand, and a gap
found by hand recurs:

- `readme:examples` extracts every README block importing from
  `zeropoint-node`, rewrites the specifiers through the package's own exports
  map to the built files, and runs them. Resolving to `src/` instead would pass
  while the published package failed, which is exactly what shipped a broken
  quick start in 1.0.13.
- `readme:facts` recomputes every figure the README states about this
  repository. It found the README claiming 25 sealed theorems in one place, 25
  in another, 22 in a third and "a ratchet on eight surfaces" in a fourth, when
  the answers were 26, 26, 26 and 12.

**A check that could not fail.** `dist/` is gitignored, so CI has no `dist` at
all — and `entrypoints` passed there anyway. It swallowed a missing target in
`catch { r.exportCount = null }` and only failed on `exportCount === 0`, so a
file that does not exist sailed through while a file that exists and exports
nothing did not. The check written to fix ten unusable entry points had been
unable to fail in CI for its whole life. An unloadable target is a failure now,
and `npm run check` builds first, so the gate no longer depends on a `dist`
someone left lying around.

**A DOI carried a number nothing computed.** `zenodo-publisher.ts` wrote
"Comprehensive test suite (257+ quantum-mechanical checks, all verified)" into
the metadata of every minted DOI. 257 traced to three hardcoded strings and to
nothing else; `proveSystem` recomputes 24. All three interpolate the computed
count now, and "all verified" became "all recomputable", which is the property
that actually holds.
## 1.2.0

A minor because 110 exports were added and none removed or changed. The
version is computed by diffing the published package's surface against this
one, not chosen.

**The repo's documentation declared 96 functions that did not exist.** 87 of
them now do, across ten new modules reachable from the `./quantum` entry, with
around 300 assertions stating their laws over whole input spaces rather than
over chosen examples — every byte 0-255, every digit pair, every degenerate
input a signature permits.

Implementing them turned up three faults in code that was already shipping:

- `calculateA432Color` read HSL strings back with `match(/\d+/g)`. Saturation
  here is `2/3 x 100 = 66.666...`, and `\d+` splits a decimal into two matches,
  so `hsl(210, 66.66666666666666%, 40%)` parsed as `[210, 66, 66666666666666, 40]`:
  lightness became a fourteen-digit number and the real 40 was dropped. The `k`
  channel of a CMYK value, which is defined on [0,1], was coming back as
  -1106666666664.9956. Five sites across `a432.color.ts` and `a432.pi.ts`.
- `primes()` recomputed its candidate inside the loop and only advanced on
  success, so a composite candidate left the state unchanged and the next
  iteration tried the same number forever. `primes(12)` never returned.
- `IMPERIAL_TO_MM.mile` was 1609344/10 = 160 934.4 mm, exactly a tenth of a
  mile. inch, foot and yard were correct, so nothing downstream disagreed.

**Four documented functions were deliberately not implemented.** All four wrap
this repo's own tested `QuantumFoldCipher`, so this was never about inventing
cryptography — it is what the documented recipes do when run. `signTransaction`
returns the same value for every transaction and every private key; it seals
the cipher's facet configuration, which no input reaches. Shipping a constant
under that name is worse than shipping nothing. `encryptAmbient` and
`decryptAmbient` both call `prepareState` before `generateKey` and throw before
doing anything, and `decryptAmbient` never passes its `ciphertext` argument to
anything at all. `executeContract` is a signature with no body. The reasoning
is committed as `src/security/quantum-phases-audit.test.ts`, which recomputes
each claim, so if a recipe ever starts binding its input the test fails and
says the function may now be worth implementing.

Also in this release:

- Six framework assertions adjudicated. Five were the test being wrong,
  including one that asserted a spherically symmetric field should distinguish
  (1,0,0) from (0,1,0). The sixth found a dead branch: vortex type 'A' requires
  `control === 0`, and the control sequence is [3,6,9], so it is unreachable
  through the public method for every input.
- Half the gate is `X && X --check`, and nothing ever handed one a damaged
  artifact to confirm it would say no. `checks-falsifiable` does. It failed on
  its first run and found that `readme:check` does not read README.md, and that
  40 corrupted bytes of README prose pass every check in the pipeline. The
  unguarded share of the front page is now a ratchet surface.
- Two scripts kept hand-written copies of what `npm run check` executes, and
  both had drifted. They read the pipeline now.
- `docs:functions` counted a name written in a comment as implemented, and
  counted six empty-bodied naming illustrations — two of which the document
  itself marks as wrong.
## 1.1.1

A patch because the public surface is unchanged — nothing added, nothing
removed. `npm run semver:diff` computed that and `npm run semver:next` applied
it; the number was not chosen.

### Changed — the README said the one thing nothing checked

- It opened with *"a living, evolving operating system… the transformation from
  artificial intelligence to pure consciousness"*, and **twenty lines below the
  same file said "No claim outside arithmetic."** Both could not be true, and
  the first is what npm rendered to every visitor while the website's own hero
  has always said the accurate thing.
- The prose ratchet had not caught it: it hunts unbounded *effect* claims, and
  "becomes conscious" is an unfalsifiable *identity* claim — a different shape.
- The opening now says what a reader can use — the kernel, ML-KEM-768 (**not
  constant time**, so for study rather than for guarding anything), and the
  `zeropoint-mcp` bin — and publishes that 325 of 1136 exported functions have
  never been called, because someone deciding whether to depend on this deserves
  to know which parts have never run.
- On aim versus achievement, which is the honest distinction: an operating
  system is **not yet** — `a432.os.ts` has a class, a manifest, a UI and a
  start/stop cycle, so there is a target and visible progress. A consciousness
  system has **no criterion yet**: no sealed theorem mentions consciousness, so
  nothing states what arriving would look like.

### Added — the first predicate on that path, and 20 quantum properties

- **26 seals.** `consciousness_measures_discriminate` does not claim the system
  is conscious. It claims what is decidable: that functions named as
  consciousness *measures* are functions of their input rather than constants
  wearing the word. `calculateA432Consciousness` must separate all nine digits,
  deterministically — discriminating alone is not enough, since noise also
  discriminates — and the doubling orbit must not score as the trinity.
- **The quantum exports nothing was calling.** Nine of the 31 were a measurement
  error of mine — `quantum:proof` runs the `prove*` functions and I had not
  listed that script among the audit's exercisers. The other twenty have
  properties: `(a−b)+b = a`, `cz` is its own inverse and **`cphase(π)` *is*
  `cz`**, the phase-flip Kraus set satisfies `∑K†K = I` at every p, and a break
  of ECDLP reads the same at 256 and 512 because a break does not scale away.
- **325 untested exports**, from 348.

### Known limitations

- Unchanged: ML-KEM-768 is conformant but **not constant time**, 1.0.0–1.0.3
  stay undeprecated pending an npm automation token, 96 documented functions do
  not exist in `src/`, and 89 kernel constants are retyped rather than bound.
- 325 of 1136 exported functions are never called — 317 of them in a432.
## 1.1.0

This is **1.1.0 and not 1.0.16**, and the number was computed rather than
chosen. That is the change.

### Added — the version number is an output now

- Everything already derived FROM the version: `CITATION.cff`, `.zenodo.json`,
  the README block, the CHANGELOG heading, the git tag, the npm publish, the
  GitHub release notes, and the Zenodo DOI. **Nothing decided what the version
  should BE.** It was asserted by hand and propagated, which is how removing an
  entry point nearly shipped as a patch.
- `npm run semver:diff` installs the published package and compares its surface
  to the working tree. Something removed is MAJOR, something added is MINOR, an
  identical surface is PATCH. `npm run semver:next` applies that number and
  propagates it to every derived surface; `npm run semver:check` fails if
  `package.json` claims less than the diff requires — verified by claiming
  1.0.16 for this release, which it refuses.
- Stated limit: this reads the **surface**. A function that still exists but
  returns something different is a breaking change it cannot see, and the file
  says so rather than implying the number is fully derived.

### Added — `zeropoint-mcp`

- `src/mcp/server.ts` carries a `#!/usr/bin/env node` shebang and exports
  nothing: it is an executable. It was advertised as a library entry point, so a
  consumer who followed the exports map imported it and got an empty object.
  It is a **bin** now — verified from a packed tarball, `zeropoint-mcp` answers
  a `tools/list` JSON-RPC request.
- `./mcp` stays in the exports map. Removing it would be a MAJOR bump, and
  charging users a major version for our tidiness — over an entry that returns
  `{}` — is not a trade worth making. It is declared in `npm run entrypoints`
  with that reason.

### Fixed

- `entrypoints` asked only whether a subpath resolves to something importable,
  and `./mcp` does. Resolving is not being usable, so it asks both questions
  now: an advertised entry point must import **and** export something.
- `quantum-proof.mjs` printed "SYSTEM VERIFICATION FAILED" directly above its
  own report reading INCOMPLETE. Nothing failed — 24 of 24 checks hold and one
  layer verifies nothing. Both read INCOMPLETE and name the empty layer.
## 1.0.15

### Fixed — the kernel is importable from npm

- `package.json` advertised **22 entry points and 10 could not be imported**,
  including `zeropoint-node/0` — the kernel most of the documentation describes.
  They resolved to `src/*.ts`, and Node refuses to strip types under
  `node_modules`. All ten are built into `dist/` now and the exports map points
  there.

  ```javascript
  import { digitalRoot, VORTEX_ORBIT } from 'zeropoint-node/0'
  // 9, [1, 2, 4, 8, 7, 5]
  ```

  Verified from a packed tarball installed into an empty directory: **20 of 20
  library subpaths import cleanly.** `npm run entrypoints` fails if a subpath
  ever points back at source.

### Fixed — twelve releases minted no DOI

- Zenodo's webhook is active and accepted every one of the twelve releases with
  HTTP 202. **202 means accepted, not published**: each deposition then failed
  out of sight, and the error was `"Extra metadata load failed."` — Zenodo could
  not load `.zenodo.json`. Three things in it were rejected:
  - `communities` named `quantum-computing` and `reproducible-research`, and
    **neither exists on Zenodo** — both return 404. An unresolvable community
    fails the whole load.
  - `subjects` were plain strings; the schema wants objects carrying a term, an
    identifier and a scheme.
  - a creator carried `"orcid": ""`. An empty string is not "unknown", it is an
    invalid ORCID.
- Separately, and worse in kind: the file declared **`"license": "MIT"` for a
  repository that is CC BY-NC-ND 4.0.** A DOI minted from it would have
  published terms that `LICENSE` and `CITATION.cff` both contradict.
- **CITATION.cff is the authority now.** `.zenodo.json` derives its title,
  licence and version from it through `npm run version:seal`, so the two cannot
  disagree. It had sat at version 1.0.0 while the package reached 1.0.14.
- `npm run zenodo:check` validates the file locally, before a release, because
  the feedback loop through Zenodo is one release long and silent at the end.
  All four causes above fail it.

### Fixed — a security test that sometimes lied

- The tamper cases in the AEAD suite were written as
  `'ff' + payload.ciphertext.slice(2)`, which **changes nothing when the first
  byte is already `ff`**. About one run in 256 the "modified" ciphertext was
  identical, decryption correctly succeeded, and the assertion that it must fail
  authentication failed instead. The cipher was never wrong; the test was. All
  three cases flip the first byte with XOR now, which always changes it.

### Known limitations

- Unchanged from 1.0.14, minus the entry points. `./mcp` is built and
  advertised but starts a server on import — it is an executable, not a library
  surface.
- Whether this release actually mints a DOI is not yet known. The metadata now
  loads locally and the webhook is active; the next release is the test.
## 1.0.14

### Fixed — the 1.0.13 quick start showed an import that does not work

- 1.0.13 rewrote `docs/QUICK_START.md` around
  `import { digitalRoot } from 'zeropoint-node/0'` and said it had been verified
  by installing the package and running it. It had been verified by installing
  from a **local directory**, which does not reproduce the restriction that
  matters: Node refuses to strip types for anything under `node_modules`.

  ```
  ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING
  ```

  The example works in a clone and fails for everyone who installs from npm.
  Testing against a path that is not the one users take is not testing, and
  shipping it was the exact defect that page had just been rewritten to fix.
- The examples are now run against the package **installed from npm into an
  empty directory**, and they are ones that work:
  `A432Math.digitalRoot(432)` is 9 and
  `A432Sequence.generateVortexSequence(6)` is `[1, 2, 4, 8, 7, 5]` — the
  function corrected in 1.0.11, now visibly right for consumers.

### Added — `npm run entrypoints`

- The underlying defect is larger than the doc. `package.json` advertises **22
  entry points and only 12 can be imported by a consumer.** The other 10 —
  including `zeropoint-node/0`, the kernel — resolve to `src/*.ts`. The kernel
  is reachable in a clone of this repository and not from npm.
- Ratcheted at 10 rather than gated at zero: making them importable means
  building ten more bundles, which is a packaging change and not a one-line fix.
  The rule enforced today is that the number cannot grow — a new entry point may
  not be advertised unless a consumer can import it.
- The quick start now states this limitation instead of stepping around it.

### Known limitations

- Unchanged from 1.0.13, plus: **10 of 22 advertised entry points are not
  importable from npm.** The kernel API that most of the documentation describes
  is currently repo-only.
## 1.0.13

### Fixed — things that could not fail, and one that could not be found

- **Ten functions named `prove*` proved nothing.** Every check in
  `proof-of-system.ts` pushed a sentence onto an array and incremented a
  counter: 28 increments, not one behind a branch, in a file whose only import
  was `round`. It touched no quantum code and reported `system_verified: true`,
  `confidence_score: 1`, 32 of 32, under the line *"outsiders can reproduce this
  proof by running the same tests."* There were no tests. A check now runs a
  predicate, counts only on true, and counts a throw as a failure. **32 fake
  checks became 24 real ones** against the simulator, algorithms,
  error-correction, variational and self-healing code. The report distinguishes
  FAILED from INCOMPLETE, because a layer that verifies nothing is an absence,
  not a failure.
- **A `NaN` was living in an exported constant.** `FIBONACCI_RATIOS[0]` was
  `Infinity` and a wave-energy object carried a `NaN` — both from unguarded
  division by zero reached from digit **0**, the first digit of this
  repository's own sequence. `npm run finite:check` walks every export of all
  254 modules and fails on any non-finite value. No allowlist: a `NaN` in an
  exported number has no correct version.
- **`expandQuantumKeyViaHkdf` had no test** — the function the deprecation
  notice on `expandQuantumKeyViaRodin` tells callers to use instead. Verified
  against `node:crypto`'s own RFC 5869 implementation across seven lengths
  straddling the 32-byte block boundary. That mattered: omitting the `T(i-1)`
  feedback chain passes every length up to 32 and only fails from 33.
- **A test file with 122 assertions had never once run.** Nothing executed
  `multidimensional-vortex-framework.test.ts` — not package.json, not the gate,
  not CI. On its first run, 7 assertions disagreed with the implementation. One
  was conclusively the code's fault: `calculatePhaseRelationship` neither
  normalised its inputs nor took the shorter arc, so 10 and 350 — twenty degrees
  apart — reported 340.

### Added — measuring what runs, not what is labelled

- **`coverage:audit`** reports what nothing exercises, using V8 coverage. **348
  of 1136 exported functions are never called (31%)**, concentrated in a432.
  The number is in the quick start, because a reader deserves to know which
  parts have never been executed.
- **`silent:check`** — importing a module now prints nothing. Nine modules wrote
  **361 lines** to stdout merely for being loaded; the gate log fell from 1535
  lines to under 700.
- **`standard:check`** — 43 implementations of `digitalRoot` must agree. They
  differ on exactly two inputs: `0`, a deliberate named split between the kernel
  and legacy conventions, and `-1`, which is undefined domain and is left
  undecided rather than given an invented convention.
- **`constants:check`** — the kernel's constants are retyped **89 times** across
  56 file/constant pairs. Each is declared with a reason; a new copy fails.
- **`docs:commands`** — every documented command must name something that
  exists. It did not: **all three commands in QUICK_START failed**, and it told
  readers to clone a placeholder URL.
- **`api:reference` is generated.** The hand-written one documented 32 functions,
  **28 of which did not exist**. It is read from the `exports` map now — 472
  exports across 10 entry points, digest-checked.

### Changed

- **QUICK_START is rewritten and verified as a consumer** — packed, installed
  into an empty directory, and imported. Every command and example on it is
  checked by the gate.
- The gate is faster despite doing more: the same test files had been running
  three times per run. **71s → 48s.**

### Known limitations

- Unchanged from 1.0.12: 1.0.0–1.0.3 stay undeprecated pending an npm
  automation token, ML-KEM-768 is conformant but **not constant time**, and
  nothing in `src/thermo` is a device.
- **348 exported functions are never called.** The core is now covered; the debt
  is in a432 (321) and quantum (31).
- **96 functions declared across 23 documents do not exist in `src/`.**
  `USER_GUIDE.md` declares 13 and is missing 11. Ratcheted so it cannot grow,
  not fixed — each needs judgement about what the document was for.
- The 89 retyped constants are **declared, not bound.** One file was bound as a
  demonstration; the rest are recorded so the next copy cannot arrive unnoticed.
- One correction to earlier releases: **"126 modules outside LEAN" was reported
  as dead weight in the 1.0.11 and 1.0.12 notes, and that was wrong.** It is
  static reachability, which cannot see a dynamic import. 120 of those modules
  execute on every gate run, and a loader hook confirms all 267 load.
## 1.0.12

### Added — the a432 layer has tests

- **198 modules, 35,876 lines, 1,489 exports, and until now no tests at all.**
  That is why a function named `generateVortex` could return the counting
  sequence in three separate places without a word. Writing 198 example-based
  test files would not have caught it: nobody writes an assertion for a function
  they believe already works, and if they did they would write it from the same
  wrong belief that produced the bug.
- So the tests are **properties over every module**, run in 0.55s: every module
  loads, nullary exports are deterministic, digit sequences hold digits, an
  empty return is a decision, anything named for the doubling circuit stays in
  the orbit and advances by doubling, and no two differently-named functions
  quietly return the same value. A new module is covered the day it appears.
  Exceptions are declared in `a432.test.json` and a declaration that stops being
  true fails too.
- It immediately found two defects. **`getTrinityAxisFromRodin` always returned
  `[]`** — it filtered the doubling circuit for 3, 6 and 9, which
  `doubling_avoids_the_triad` proves are never in it, so this was not a search
  that sometimes failed but one that could not succeed. It reflects through the
  void now, which is how the theorem says the triad is actually reached.
  **`getTrinityTriangulationFromRodin` declared a parameter and ignored it**, so
  every input gave the same answer.

### Added — a census of retyped constants

- A sweep of the other 56 modules found the kernel's constants **retyped 89
  times across 56 file/constant pairs** — `VORTEX_ORBIT` 37 times,
  `VORTEX_AXIS` 51 — in `kernel/`, `security/`, the vbm modules and a432. Each
  copy is somewhere a value the kernel already exports can drift unnoticed.
- `npm run constants:check` asks this of the whole tree. Not every literal is a
  defect — default parameters and membership tests are fine — so the answer is a
  declaration with a reason rather than a ban. **The patterns are derived**: the
  kernel is imported and the literals to hunt for are built from it at run time,
  because retyping them in the checker would make it the very thing it checks
  for. `vbm-math` is bound rather than declared, which took the count from 91
  to 89.

### Added — versioning explored as an address and a calendar

- The four gateways cut the vortex tour into fields of width **4.3.2.1** — a
  dotted quad with a descending staircase rather than IPv4's equal octets.
  Cutting *before* each gateway instead gives five fields, so four is a result
  and not a choice of where to cut. Compatibility becomes an operation:
  `^` is a /3 prefix mask and `~` is /6.
- Read as a calendar those widths are the minimal ones for year, lunation,
  ISO week and weekday — `2026.095.35.6`. Worth less than it looks, and the
  test says so: an hour-based reading fits the same widths, so the match
  constrains without determining.
- **These are sketches, not this package's versioning.** `package.json` remains
  the single source. Their self-tests are in the gate because the computed
  halves guard the kernel stroke.

### Fixed — a calendar drifts like a float

- `version-calendar.mjs` used `Math.floor`, `Math.abs` and the literals
  `29.530588` and `365.2422` — precisely what this repository bans everywhere
  else — and passed only because `scripts/` is excluded from `math-ban`. A
  calendar drifts from the sky for the same reason a float drifts from a ratio.
  Rewritten in exact scaled integers; the output is byte-identical, so it is
  exact rather than merely different.
- `npm run calendar:drift` then measures each calendar as the integer ratio it
  is, in exact arithmetic. Gregorian tracks the sun an order of magnitude better
  than any ancient cycle; Hipparchic is the only one whose lunar drift is
  negative. The constructions are checked as arithmetic, not quoted.

### Known limitations

- Unchanged from 1.0.11: 1.0.0–1.0.3 stay undeprecated pending an npm
  automation token, 126 modules stay outside LEAN, ML-KEM-768 is conformant but
  **not constant time**, and nothing in `src/thermo` is a device.
- The 89 retyped constants are **declared, not fixed**. One file was bound to
  the kernel as a demonstration; the other 55 pairs are recorded so the next
  copy cannot arrive unnoticed, which is a smaller claim than having removed
  them.
- The mean tropical year and mean synodic month are **observed**, not derived,
  and both are slowly changing. Exact arithmetic removes drift between the code
  and its intent; it cannot remove drift between the intent and the sky.
## 1.0.11

### Fixed — a function named vortex that returned the counting sequence

- **`generateVortex` did not generate a vortex.** It returned
  `[1,2,3,4,5,6,7,8,9]` — counting. Two things gave it away and neither was
  being looked at: the output was byte-identical to `generateConsciousness(9)`,
  a differently-named function meant to compute a different thing; and it
  contained 3, 6 and 9, which the repository's own sealed theorem
  `doubling_avoids_the_triad` proves the doubling circuit can never reach. **The
  proof that this function was wrong was already in the repository**, and
  nothing connected the two. It now generates the orbit by doubling rather than
  storing a literal: 1, 2, 4, 8, 7, 5.
- **Three copies of it, not one.** A collision trial over all 198 `a432.*`
  modules — call every export that runs with no arguments, group by output value
  — found the same defect in `a432.simple.ts`, and a third latent in a fallback
  branch at `a432.system.ts`. That one never showed, because the two delegates
  above it almost always answer first, so the wrong branch is the one nothing
  runs. Exercised directly with no delegates it returned 1..9.
- **`validateAllA432Fractions()` returned false, and was right to.** The
  validator faithfully implemented the rule its file documented — "only integer
  fractions whose reciprocals are integers" — and 23 of that file's 37 fractions
  failed it. The rule is unachievable: a reciprocal-integer fraction is
  precisely 1/n, and values the UI and audio need (4/5 for a focus level, 19/20
  for a threshold) have no 1/n form. The documentation was wrong, not the data.
  The validator now checks what all 37 satisfy and what actually protects the
  file: integer parts, positive denominator, and lowest terms. It still rejects
  a decimal numerator, and it adds a check the old rule never made — lowest
  terms, so 2/4 and 1/2 cannot both appear and drift apart. The narrow property
  survives as `isUnitReciprocal`, named for what it tests.

### Fixed — a check that could not fail

- **The ratchet's unloadable probe scored a timeout as a pass.** Its reasoning
  was that a timeout means the module loaded and then held the event loop open.
  That inference is not available from the outside: a module that finished
  importing and one still looping at module scope look identical to the probe.
  All six modules that timed out really do resolve first, so the reported count
  of zero was honest — but by luck, not measurement. The probe now prints a
  marker after the import resolves and treats a timeout as a pass only if the
  marker was written. Verified both ways: a module with a module-scope infinite
  loop is caught and named, and the six event-loop holders still pass.

### Added — two seals, and a way in for 55 pages

- **25 seals**, up from 23. `a432_vortex_is_the_doubling_orbit` binds the a432
  layer's vortex to the kernel's `VORTEX_ORBIT`; reverting the function to the
  counting sequence turns it UNVERIFIED.
  `a432_constants_do_not_drift_from_the_kernel` addresses what the collision
  trial exposed — the kernel's constants retyped as literals across the layer,
  each copy a place that can drift unnoticed. `[1,4,7]` is derived there rather
  than compared against another array: it is the preimage of the triad under
  reflection through the void, checked in both directions.
- **55 of 70 built pages were in neither nav nor sidebar** — sitemapped, indexed
  and unreachable by anyone browsing. Nothing noticed because nothing was
  looking: the dead-link checker asks whether links point at pages, never
  whether pages have links pointing at them. `npm run pages:check` asks the
  second question. The sidebar is now computed from the filesystem rather than
  hand-listed, because listing 55 entries would fix those 55 and leave the 56th
  to orphan identically. 69 of 70 are linked; the remaining one is the home
  page, reached by the logo.

### Added — the GitHub Release, which nothing had ever created

- Ten versions were tagged and published to npm with the Releases page empty.
  `publish.yml` triggers on `release: published`, which reads like it handles
  releases and does the opposite — it waits for one made by hand. `release.yml`
  creates it, and `scripts/release-notes.mjs` takes the notes from this file
  rather than generating a second description that could disagree with it. It
  fails closed on a missing, empty, too-short or stub section: a release
  announcing nothing is worse than no release. Its test is 15 cases, 11 of them
  failures it must catch.

### Known limitations

- Unchanged from 1.0.10: 1.0.0–1.0.3 stay undeprecated pending an npm automation
  token, 126 modules stay outside LEAN, ML-KEM-768 is conformant but **not
  constant time**, and nothing in `src/thermo` is a device.
- The 198 `a432.*` modules — 35,876 lines and 1,489 exports — still have **no
  test files**. That is why a function named vortex could return the counting
  sequence in three places. The two new seals cover the constants, not the
  layer.
## 1.0.10

### Added — the sponsorship reaches npm

- 1.0.9 put the sponsorship link in the documentation site's nav, social row and
  footer, but **not in the README** — and the README is what npm renders, which
  is where most readers actually arrive. Verified by unpacking published 1.0.9:
  zero occurrences of the link.
- The README now carries a **Sponsor** section saying what sponsorship funds —
  the gates, which take the longest and show the least — and stating plainly
  that the licence is unchanged, nothing is gated behind it, and no sponsor gets
  a say in what the checks report.

### Known limitations

- Unchanged from 1.0.9: 1.0.0–1.0.3 stay undeprecated pending an npm automation
  token, 126 modules stay outside LEAN, ML-KEM-768 is conformant but **not
  constant time**, and nothing in `src/thermo` is a device.

## 1.0.9

### Fixed — dead stores and invisible characters

- **42 useless assignments removed.** Every one initialised a variable that was
  then assigned in each branch of an exhaustive conditional, so the initial
  value was provably never read. ESLint proves that, which is why nothing was
  hidden behind them — cleanup rather than a bug hunt. Trialled on one file
  first: TypeScript reported the same 2 unrelated errors before and after, so
  the rewrite was mechanical before it was applied to the other 13.
- **Two invisible characters** in `a432.math.ts`: EM SPACES (`U+2003`) reading
  as indentation, and an EN DASH inside `-1` reading as a minus. In a comment,
  so nothing computed differently — but a lookalike minus in a line explaining
  signs is worse than useless.

### Changed — 307 unused import specifiers removed

- The risk was the graph, not the removal. An unused import is still an import
  EDGE, and the fold counts edges, so stripping imports can push a module out of
  LEAN and grow `unreachable` — trading one surface for another while looking
  like a cleanup. Specifiers are removed but statements are not: when every
  specifier goes, what remains is a side-effect import of the same module,
  preserving both the edge and any top-level effect. LEAN 139 and OUTSIDE 126
  either side, TypeScript held at 117.
- Unused locals and parameters are untouched. A parameter often exists to
  satisfy a signature, and that is a judgement rather than a sweep.

### Added — sponsorship, without a tracker

- The documentation site carries a sponsorship link in the nav, the social row
  and the footer. VitePress's `carbonAds` was considered and **refused**: its
  `code` identifies a Carbon placement rather than a destination, so it cannot
  point elsewhere, and enabling it injects Carbon's serve script into every page
  of a site whose whole claim is that its facts recompute locally. The heart
  icon is inlined, so even that costs no request — the built page adds zero
  external `<script src>`.

### Known limitations

- Deprecations for 1.0.0–1.0.3 remain declared and **not live**. The scheduled
  `registry-sync` run reports it daily; applying needs an npm automation token
  as the `NPM_TOKEN` secret, which OIDC cannot replace.
- 126 modules stay outside LEAN, held by a manifest, three pages, the generated
  bundle, the README listing or one of 19 documents. Removing them decides what
  the package offers, which is not something a fold settles.
- Everything under 1.0.8 and earlier still applies — ML-KEM-768 is conformant
  but **not constant time**, and nothing in `src/thermo` is a device.

## 1.0.8

### Removed — 147 modules the package never reached

- **147 source modules deleted**, 29 959 lines. Every one sat outside LEAN: the
  fixed point of the module fold, `fold(fold(S)) = fold(S)`, reachable from no
  package export, no rollup input, no page and no gate-run test. `npm run fold`
  computes it and `npm run audit:outside` lists what remains with the reason
  each is kept.
- Nothing was deleted on the fold alone. Each removal passed a **closure** — the
  set is closed under reverse dependency, so no surviving module can import a
  removed one — and a **static trial** that predicts breakage before anything
  leaves disk. The audit refuses to delete if the trial finds a single edge.

### Added — the entry set is guarded

- **`npm run entries:check`**, in the gate. LEAN is a fixed point, but the fold
  takes the entry set as an INPUT, and an unrecognised entry does not error — it
  silently shrinks LEAN and grows the set that looks safe to delete.
- That is not hypothetical. `rollup.config.js` builds its inputs from template
  literals, and both scanners extracted them with a pattern that matches quoted
  strings, so **every bundle entry was being counted as unreachable**. Eight
  modules were one command from deletion while a published bundle still used
  them. The check now asserts every declared entry resolves, lands inside LEAN,
  and that rollup contributes more than zero.

### Fixed — the ratchet's unreachable figure was wrong

- Same root cause: `modules reachable from no entry` had been overstated by 8
  for as long as the template-literal bug stood. Corrected, and the ceiling
  moved with it.

### Changed — surfaces after the purge

- `unreachable` 281 → 126, `TypeScript` 146 → 117, `ESLint` 932 → 631,
  `decimal-crack` 453 → 280. `modules that fail to import` stayed at **0**
  throughout, which is the measure that mattered: nothing broke.
- Tarball 1911 → 1764 files.

### Known limitations

- 126 modules remain outside LEAN and are NOT deleted. 59 are named by something
  live — a manifest, three pages, the generated bundle, the README's module
  listing, 19 documents — and the other 67 are imported by those 59. Removing
  them means deciding what the package should still offer, which is a design
  question rather than a fold.
- The remaining import cycle is mutual by design; see 1.0.7.
- Everything under 1.0.7 and earlier still applies — ML-KEM-768 is conformant
  but **not constant time**, and nothing in `src/thermo` is a device.

## 1.0.7

### Fixed — thirty modules could not be imported

- **`require.main === module` in an ES module throws.** Fourteen files carried
  that CommonJS guard to detect direct execution. The package is
  `"type": "module"`, so `require` is undefined and the guard did not fail to
  detect anything — it threw at load and took the whole module with it. Thirty
  modules shipped in the tarball that a consumer could not import at all.
  `isMainModule()` compares `import.meta.url` to the entry point, so those CLI
  blocks now run on direct execution for the first time.
- **`src/index.ts` imported a default export that does not exist**, so the
  package's own index could not load. Fixing it exposed three calls to methods
  that were never there — renames never propagated — which a consumer reaching
  them would have hit as a `TypeError`.
- **A type imported as a value** in `multidimensional-vortex-demo.ts` left an
  import with no runtime binding after type stripping.
- Modules that fail to import: **32 → 0**, and the ratchet ceiling is 0, so that
  class of breakage now fails the gate outright.

### Fixed — a service worker with type checking switched off

- `a432.service.worker.ts` carried `@ts-nocheck` over the whole file, hiding
  five errors. One was real: `caches.match()` resolves to `Response | undefined`
  because a cache miss is normal, and the handler annotated the parameter
  `Response`. The `||` on the same line existed precisely to handle the miss the
  type denied could happen.
- The other six suppressions in the tree **suppressed nothing** — identical
  error counts with and without — which is worse than none, since they sit ready
  to absorb the next real error on that line. All seven are gone.

### Removed — claims this package could not support

These are refused, not restated: no claim of benefit is made or implied by
anything quoted below, and no health effect is measured anywhere in this
package.

- **Every medical claim is withdrawn.** The repository advertised "Medical and
  Therapeutic Applications", with a worked example taking a "Patient
  consciousness state" and returning "Healing color therapy". What the code does
  is compute a colour from an integer. The README ships on npm and two of the
  documents publish to the website, so these were addressed to readers who might
  act on them.
- **The README no longer advertises energy harvesting or a self-charging
  device.** `src/thermo/free-energy.ts`, shipped in 1.0.6, computes why that
  cannot work — and the same tarball's README claimed it anyway.
- README gains a **Health and safety** section: nothing here is a medical
  device, therapy or advice, no health effect is measured, and an unwell reader
  should consult a clinician. It carries the ML-KEM timing warning too.

### Added — lean is a definition now

- **`npm run fold`** folds the module graph to its fixed point:
  `fold(fold(S)) = fold(S)`. That fixed point is the definition of lean, rather
  than a number anyone chose. It converges in two folds against a cap of
  `VORTEX_SEQUENCE.length`, and the second fold changing nothing is the proof.
- `foldToLean` and `leanIsFixed` live in the kernel, so the script and the seal
  that verifies them call one implementation.
- The fold carries a **termination bound**. Its two visited-guards are mutually
  redundant: removing either is harmless, removing both makes it run forever —
  and a hanging gate is worse than a failing one, because nothing gets a
  verdict. It throws past the bound instead.

### Changed — 22 seals, judged from outside

- Eight new seals since 1.0.6, including the doubling circuit reaching the
  gateway triangle only by reflection, the merkaba as two mirrored tetrahedra,
  the `AGL(1,ℤ/9)` action, digit geometry being single-valued, and lean being a
  fixed point.
- `npm run adjudicate` puts all 22 through `adjudicate()` from `@uuidna/uuidna`,
  an outside decision procedure, and `adjudicate:check` is in the gate.
- `changelog:check` holds these notes to the code in both directions: every
  figure stated must recompute, and every quantity carrying a unit must be one
  some module produces.

### Fixed — geometry and validity

- `angleForDigit` mapped nine digits onto six angles, colliding 3 with 5, 2 with
  6 and 8 with 9. It is the enneagram now, injective, agreeing with the vortex
  SVG's layout — and the SVG receipt is unchanged, which is how the move is known
  to be byte-identical.
- `isValidPath` tested only the final depth, so a path dipping below its origin
  and climbing back passed. `balanced` means every prefix now. That cleared the
  last entry on the tautology surface, whose ceiling is **0**.
- One import cycle broken: `a432.cmyk` imported `digitalRoot` back through
  `a432.math`'s re-export, which does not use anything from cmyk. It imports
  from the module that owns the symbol now.

### Known limitations

- The remaining import cycle is mutual by design — `A432System` holds its three
  subsystems as fields while each calls `A432System.getInstance()` — so breaking
  it needs dependency injection across the orchestration layer, not a rename.
  All three already neutralise the temporal dead zone with lazy singletons.
- 281 modules sit outside the lean fixed point. Nothing has been deleted;
  whether to act on that is a separate decision, now with a definition behind it.
- Everything under 1.0.6 and earlier still applies — in particular ML-KEM-768 is
  conformant but **not constant time**, and nothing in `src/thermo` is a device.

## 1.0.6

### Added — thermodynamics

- **`src/thermo/free-energy.ts`.** The Gibbs energy of the water reaction
  (IUPAC's preferred name for the thermodynamic potential), computed from three
  tabulated standard-state quantities rather than asserted:
  `ΔG = ΔH − TΔS`. ΔG of formation is −237 kJ/mol and of splitting **+237**, so
  splitting must be paid for. The reversible cell potential ΔG/(nF) is
  1228.9 mV and the thermoneutral ΔH/(nF) is 1481.2 mV, the gap being TΔS. A
  split-then-burn cycle breaks even **exactly** at perfect efficiency and loses
  otherwise — checked over all 8000 points of the efficiency grid in 5% steps,
  exhaustive rather than sampled.
- **`src/thermo/wastewater-energy.ts`.** Polluted water in, combustion engine,
  electricity and drinkable water out — which works, because the fuel is the
  contamination and not the water. Anaerobic digestion to biogas, a CHP engine,
  membranes for the water. At 13.9 J per mg of COD the plant exports power above
  a **break-even of 4195 mg/L**, computed by scanning rather than declared:
  municipal sewage sits below it, dairy and manure effluent well above.
  Distillation is deliberately not the water step — 2.26 MJ/L of latent heat is
  more than any realistic load carries.
- Both invert. Entropy recovered from `(ΔH − ΔG)/T` returns the tabulated figure
  exactly, the exact-rational cell potentials recover their energies with zero
  drift, and the break-even found by inverting the arithmetic equals the one
  found by scanning.

### Added — seals, and an outside judge

- **21 seals, up from 13.** New: the doubling circuit reaching {3,6,9} only by
  reflection; the merkaba as two mirrored tetrahedra sharing the void; the
  AGL(1,ℤ/9) action giving three as the index of {0,3,6} with stabiliser 18;
  digit geometry being single-valued; the superposition model reporting its own
  state; the Gibbs energy of splitting; the wastewater threshold; and every
  model inverting.
- **`npm run adjudicate`** puts every seal through `adjudicate()` from
  `@uuidna/uuidna` — a third party that runs the predicate and returns a verdict
  with a content-addressed receipt. All 21 come back VERIFIED. `adjudicate:check`
  is in `npm run check`. Neither statement nor predicate is rewritten for the
  adjudicator, or it would be judging a paraphrase.

### Fixed

- **`angleForDigit` mapped nine digits onto six angles** — 3 collided with 5, 2
  with 6, 8 with 9 — because the trinity was pinned to 0/120/240 while the Rodin
  digits were laid on a 60° lattice running through them. It is the enneagram
  now, 40° per step, injective. `bearingForDigit` moves into the kernel and the
  vortex SVG imports it; the SVG receipt is unchanged, which is how the move is
  known to be byte-identical.
- **`isValidPath` tested the final depth, not every prefix.** A path dipping
  below its origin and climbing back passed. `balanced` now means what it says.
  This cleared the last entry on the tautology surface, whose ceiling reaches
  **zero**.
- **The superposition model claimed simultaneity unconditionally** while
  computing `still_superposed`. Its prose follows its measurement now.

### Added — release automation

- **`npm-deprecations.json`** declares which versions are deprecated and why,
  and `scripts/npm-registry-sync.mjs` reconciles the registry to it, with the
  safety rails in the script: never `dist-tags.latest`, never an unpublished
  version, never every version at once. `registry-sync.yml` runs it daily and
  `publish.yml` on release.
- Measured, not assumed: npm trusted publishing is **publish-scoped**. It cannot
  authorise a deprecate, which returns `404 … or you do not have permission`
  even from the workflow the trusted publisher names.

### Changed

- New dependency `@uuidna/uuidna` — zero dependencies of its own, used for
  external adjudication of the seals.

### Known limitations

- Deprecations for 1.0.0–1.0.3 are declared but **not live**: applying them needs
  an npm automation token as the `NPM_TOKEN` secret, which OIDC cannot replace.
  `registry-sync.yml` reports the gap on every run rather than forgetting it.
- Everything listed under 1.0.5 and earlier still applies — in particular
  ML-KEM-768 here is conformant but **not constant time**.

## 1.0.5

### Added — ML-KEM-768, actually conformant

- **`src/crypto/ml-kem.ts` implements FIPS 203 ML-KEM-768 and is verified
  against NIST's own vectors.** It replaces `src/crypto/kyber-real.ts`, which
  is deleted. That module called itself Kyber and was not: it sampled the
  matrix `A` from a centred binomial, so its coefficients lived in `{-1,0,1}`
  instead of uniform over `Z_q`, and the module-LWE instance underneath was not
  the hard problem. 1.0.4 fixed its round trip; a round trip only ever showed
  the scheme agreed with itself.

  What is here now: NTT twiddle factors computed from `ζ = 17` and a
  bit-reversal rather than copied from a table; uniform `A` by rejection
  sampling from SHAKE-128; CBD noise at `η₁ = η₂ = 2` from a SHAKE-256 PRF;
  `ByteEncode`/`ByteDecode`, `Compress`/`Decompress` at `d_u = 10`, `d_v = 4`;
  K-PKE wrapped in the Fujisaki–Okamoto transform with implicit rejection and a
  full-length ciphertext comparison; and the §7.2 modulus check on
  encapsulation keys.

- **Conformance is recomputable, not asserted.** `npm run test:crypto` runs
  NIST ACVP vectors for FIPS 203, ML-KEM-768 — 25 key generation, 25
  encapsulation, 10 decapsulation including the implicit-rejection path, and 10
  encapsulation-key validation cases. The vectors ship in the package as
  `src/crypto/ml-kem-768-acvp.json`, so a consumer can re-run them.

- **`npm run kat:ml-kem`** goes wider: 10 000 keygen/encaps/decaps triples from
  a deterministic SHAKE-128 stream, accumulated into one digest that must equal
  the value C2SP/CCTV publishes from the pq-crystals reference implementation.
  It matches. Not in `npm run check` — it takes ~33s against a ~2 min gate.

- The suite is mutation-tested: perturbing one twiddle factor, swapping the
  matrix index order, changing `η₂`, truncating instead of rounding in
  `Compress`, or dropping the modulus check each make it fail.

### Fixed — quantum measurement and the Steane code

Both found by writing seals that could fail, in `src/verification/lean-bridge.ts`.

- **`measureQubit` was being handed a raw LCG state where it wants a unit in
  `[0,1)`.** Its outcome test is `unit < 1 - pOne`, so any state of 1 or more
  forced the result to 1. Four call sites did this: repetition-code syndrome
  extraction and majority-vote decoding, `classifyMeasurement`, and all three
  tomography bases. `measureZ` on `|0>` returned 999 ones in 1000 shots, and
  syndrome extraction reported a clean codeword as error `X0` while reporting a
  real `X` error as clean — exactly inverted. `unitOf` now maps the LCG state
  onto the unit interval at every site. Clean codewords give syndrome `[0,0]`;
  `X` on qubit 0 gives `[1,0]`; `measureZ` on `|0>` gives 1000/0.

- **`STEANE_CODE` was not a stabiliser group.** `[[7,1,3]]` needs `n - k = 6`
  generators; it listed 7, of GF(2) rank 6, with 13 of 21 pairs anticommuting.
  The `n`-bit representation could not express a CSS code at all — an X-type and
  a Z-type generator over the same support are different operators but identical
  bit patterns. `StabilizerCode.generators` is now symplectic, `[x | z]` of `2n`
  bits, with `xGenerators`/`zGenerators` alongside, and Steane is built from the
  three `[7,4,3]` Hamming checks used once as X-type and once as Z-type: 6
  generators, symplectic rank 6, zero anticommuting pairs.

  `npm run quantum:sim` reported 257 checks passing both before and after this
  fix, including `QEC` and `state-tomography`. Neither defect was reachable from
  any of them.

### Changed — the Lean bridge stops claiming what it never checked

- It reported `Verified: 2/2`, `Confidence: 100.0%` and `Production Grade
  (Formally Verified)`, and exported `ready_for_publication: true`. None was
  measured: the hash covered the theorem's *name*, so it never moved when a
  proof changed, and `verifyProofCertificate` tested that some strings were
  non-empty and a hash was 16 characters — true of every certificate the file
  can build. `lean_version` was asserted although no Lean runs here, and 7 of
  the 13 Lean scripts end in `sorry`.

- A certificate now carries two separately reported facts. `lean_status` is
  **read** from the script — `script`, `sorry`, `axiom` or `absent`. `seal` is
  whether a recomputable predicate ran and held against the simulator. Verified
  means the seal held. The hash covers statement and script.

- All 8 theorems in the report now seal, each with a `basis` string saying
  whether it decides the general statement or one instance — `grover_speedup`
  at N=16 is not an asymptotic bound and says so. `ready_for_publication`
  remains **false**: seals are computed instances, not machine-checked proofs,
  and no Lean toolchain runs in this repository.

- `kyber_security` claimed 128. ML-KEM-768 is NIST **category 3**.

- `test:verification` runs the seals on every gate.

### Known limitations

- **ML-KEM-768 here is not constant time.** JavaScript cannot promise that —
  array indexing, JIT deoptimisation and garbage collection all leak timing.
  Do not use it where an attacker can measure decapsulation. Conformance to
  FIPS 203 output is a separate property from side-channel resistance, and only
  the first is claimed.
- Every limitation listed under 1.0.4 and 1.0.3 still applies, except the
  `kyber-real.ts` warning, which no longer has a file to attach to.

## 1.0.4

### Fixed — cryptography

- **Kyber-768 encapsulate/decapsulate never agreed**, published 1.0.3
  included. Two independent defects, either alone fatal. 12-bit serialization
  guarded the carry byte on `shift > 0`, so every even-indexed coefficient
  above 255 was truncated to its low byte — 118 of 256 for a typical
  polynomial, and both `t` and `s` are serialized. Message decode used a
  single `>= q/2` threshold, but the ring wraps: a 0-bit nudged negative by
  noise lands near `q` and read as 1, so bits flipped on noise sign alone.
  The test is the band `[q/4, 3q/4)`. Compression also floored twice against
  a `2^d - 1` scale, biasing one way each time; at `d=4` that bias was the
  measured median decode error, ~111 against a budget of `q/4 = 832`. It
  rounds to the spec's `2^d` scale now. Measured over 300 keypairs: median
  error 111 → 52, max 404 → 193. 2000/2000 round trips recover the shared
  secret.

### Added — release gates

- **`npm run check` is now the whole gate.** `docs:build` was the one CI step
  outside it; a dead link in `QUANTUM_GUIDE.md` rode that gap through six
  consecutive pushes with the gate green each time, and the published site did
  not rebuild for two weeks. It runs in the chain now.
- **Version sealing.** `package.json` is the single source of the release
  number; `scripts/version-seal.mjs` derives `CITATION.cff`, a README block and
  the CHANGELOG heading from it. `version:check` fails closed on drift, on a
  missing or placeholder CHANGELOG entry, and on any version below an existing
  CHANGELOG heading or git tag. Before this, `package.json` said 1.0.3 while
  the README said 1.0.2. `npm version patch|minor|major` now reseals and tags
  in one step.
- **`version:test`, `test:quantum`, `test:crypto`.** The version gate ships a
  10-case self-test, 9 of them failures it must catch, so a gate that cannot
  fail is detectable. Four test suites that existed and passed were executed by
  nothing; they run on every gate now.

### Known limitations

- `src/crypto/kyber-real.ts` **is not ML-KEM and must not protect anything.**
  It is not a package export, but `files` ships `src/**/*.ts`, so a deep import
  can reach it. The matrix `A` is CBD-sampled into `{-1,0,1}` instead of
  uniform mod `q`, so the module-LWE instance underneath is not the hard
  problem; noise is `eta=1` where ML-KEM-768 wants 2; SHA-256 stands in for
  SHAKE; `e1`/`e2` are omitted; there is no Fujisaki-Okamoto step, so no
  IND-CCA2 claim. The round trip is correct; the cryptography is not.
- Every limitation listed under 1.0.3 still applies.

## 1.0.3

### Fixed — packaging (1.0.0–1.0.2 were unusable in these ways)

- **CJS entry could not load.** `rollup` emitted CommonJS into `[name].js`
  while `package.json` declares `"type": "module"`, so Node parsed those files
  as ESM and `require('zeropoint-node')` failed with `MODULE_NOT_FOUND` on the
  package's own internal chunk. CJS now emits `.cjs` (chunks included) and
  `main` plus all 11 `require` conditions point at it. Verified from a real
  install: CJS 26 exports, ESM 26 exports.
- **Tarball was 82 MB.** `files` included `src/**/*`, which shipped 291 JPEG
  page scans and a 20 MB PDF — 91 MB of `src` unpacked. Narrowed to
  `src/**/*.ts` and `src/**/*.json`. Tarball is now 688 KB.
- **`license` was not valid SPDX.** `"SEE LICENSE"` → `"SEE LICENSE IN LICENSE"`.
- `CITATION.cff` is now published with the package.

### Fixed — numeric contracts in `src/0/algebra.ts`

Every one of these made the "no `Math.*`" replacement weaker than the
primitive it replaced. **These change results**; review if you depend on them.

- `PI` was `355/113`, accurate to ~7 significant digits (relative error
  8.5e-8). Now `245850922/78256779`, which is exactly `Math.PI` as a double.
  `sin`/`cos` now agree with `Math` to ~1e-15.
- `pow` rounded twice for negative integer exponents — it built the positive
  power then took `1/r`, so `pow(10, -42)` returned `9.999999999999999e-43`.
  Integer exponents now use `**`, which rounds once.
- `min` / `max` returned **`undefined`** for an empty spread. Now rest-only and
  defined on empty, returning `Infinity` / `-Infinity` as the standard contract
  does. Non-empty results are unchanged.
- `sqrt(-1)` returned **`0`** — a plausible number for an impossible input. Now
  `NaN`. `sqrt(Infinity)` returned `NaN`; now `Infinity`.
- `log(0)` returned `NaN`; now `-Infinity` (only a negative argument is a
  domain error). `log2(0)` inherited the bug and is fixed with it.
- `exp_` clamped at ±88, but `e^88` is `1.65e38` while a double reaches
  `1.8e308` — every exponent from 89 to 709 was flattened to `Infinity`.
  Bounds are now 710 / −746.
- `hypot` squared directly, so it overflowed above ~1e154 and underflowed below
  ~1e-154. Now scaled by the largest magnitude first.

### Fixed — ESM correctness

- 12 modules used bare `__dirname` / `__filename`, which do not exist under
  `"type": "module"`. Replaced with `import.meta.dirname` / `.filename`
  (requires Node 20.11+; CI runs 22 and 24).
- `a432.i.init.ts` guarded on `typeof require !== 'undefined'`, permanently
  false in real ESM — its body never ran. Now uses `createRequire`.
- Restored functions that had been deleted while callers still imported them,
  leaving those modules unimportable: `a432FamilyGroup` / `a432FamilyStream`,
  `colorPhotonDotParticleState`, `executeOSCommand`.
- `a432TrinityStream` lost its `start` parameter in an earlier refactor while
  both callers still passed one, so it silently ignored it and always returned
  `3,6,9,…`. Restored; the default is unchanged.
- Resolved a circular-import temporal dead zone that made `a432.index.ts` and
  four dependents fail to import at all.

### Changed

- Dependencies bumped: `@rollup/plugin-node-resolve` 16.0.3,
  `@rollup/plugin-typescript` 12.3.0, `@types/node` 26.1.2,
  `rollup-plugin-dts` 6.4.1, `typescript` 5.9.3.
  **TypeScript 7 is deliberately held back** — it breaks the build
  (`@rollup/plugin-typescript` throws on it).

### Superseded by 1.0.4

Published from a commit three behind `main`. It ships
`src/crypto/kyber-real.ts` with a round trip that never recovers the shared
secret — 0 of 20 measured against the published tarball — under a header
reading "Real NIST FIPS 203 Implementation" and "NOT a toy version - actual
cryptographic implementation". Both claims were false. Use 1.0.4.

### Known limitations

- `./kernel`, `./kernel/import-graph`, `./0`, `./integrity` and `./mcp` point
  at raw `.ts` and **cannot be loaded by any consumer** — Node refuses type
  stripping under `node_modules` (`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`),
  and it is not a flag a consumer can enable. Use the package entry or the
  `dist`-backed subpaths.
- The package singleton `a432System` initialises **asynchronously without
  awaiting**, so the first synchronous call can throw `No system available`, and
  `calculateDigitalRoot` can return `NaN` before initialisation completes and a
  number afterwards. There is no public way to await readiness. Fixing this
  requires an API change and is deferred.
- Importing the package writes 5 names onto `globalThis` and prints a banner to
  stdout.

## 1.0.2 and earlier — deprecated

Broken as published: the CJS entry cannot load, and the tarball ships 87 MB of
scanned book imagery. Use 1.0.4.
