# `src/0` — the void / origin

The dependency-free leaf this library rebuilds on. **It imports nothing.** Digit path `3/6/9/1/2/4/8/7/5/1` and later kernel barrels import *from here*; nothing here imports back.

Same input → same output, forever, at zero runtime tokens.

## The one thesis

It is all **one operation — the fold**: `merge(a, b) = toUuid(a ∥ b)`, a content-addressed, order-sensitive pairing. Vortex stroke, merkle seal, and identity are the **same fold** seen from different sides.

## Double-torus development vortex

```
lobeL (ceccec.github.io)  ⇄  throat (foldPair)  ⇄  lobeR (erpax)
```

- **Lobe L** — fold kernel, vortex stroke, MCP, projections
- **Lobe R** — content-uuid, receipts, agent surfaces, fail-closed gates
- **Throat** — `developmentVortex(wave)` / `runDevelopmentVortexAll()`
- Each chat wave seals both lobes; seals feed the next wave

## Wave law

`origin → decode → design → learn → tune → edit → rebuild → verify` — one coherent batch per agent turn.

## Spine (kernel default)

- Full vortex circuit (living field): `0\1\2\4\8/7/5/3\6\9/0\1`
- Vortex: `[1, 2, 4, 8, 7, 5, 3, 6, 9]` with void `0`
- Stroke: `1\2\4\8/7/5/3\6\9/0\1` (`0\`); encoded fusion gate uses `0/` in `VORTEX_DASH_ENCODED`
- `digitalRoot(0) → 9`
- Legacy `03691248751` / `digitalRoot(0) → 0` via `src/kernel/legacy.ts`

## Status

KERNEL_SEALED = true. Run `npm run check` for the development-vortex census + a432 import/export self-ref fold. Critical a432 bridges are `.ts`-resolvable under strip-types (Wave 9); residual extensionless under `src/` sealed Wave 19–20; browser `a432.algebra.js` export surface sealed Wave 21; HTML→missing `.js` sealed Wave 22; TS→missing `.js` sealed Wave 23; orphan A432 `.js` sealed Wave 24; feed scanners count-proven + severity-ordered Wave 25; remote CDN HTML imports dissolved Wave 26; dash `fusionIgnites` / `closes` sealed Wave 27; `computeVortexInvariantsHold` boolean + quantumisation tip Wave 28 (tip on slip only); tip `form · code · proof` + vague refuse Wave 29; linked-receipt verify (prev+contentUuid+ts recompute · walk · genesis) Wave 30; legacy `VORTEX_SEQUENCE` 6-orbit → `VORTEX_ORBIT` Wave 31 (feed tip on slip); string/worldsheet `foldStringTheory` + `a432.string.theory` Wave 32 (compactified 11 = living-field digit count).
