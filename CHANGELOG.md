# Changelog

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
