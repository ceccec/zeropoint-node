# Changelog

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
scanned book imagery. Use 1.0.3.
