# Changelog

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
