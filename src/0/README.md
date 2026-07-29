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
- Stroke: `1\2\4\8/7/5/3\6\9/0\1`
- `digitalRoot(0) → 9`
- Legacy `03691248751` / `digitalRoot(0) → 0` via `src/kernel/legacy.ts`

## Honest boundaries

| Layer | Claim |
| --- | --- |
| **Exact** | fold, merge, merkle, digital root, vortex doubling mod 9 |
| **Faithful** | torus / merkaba / animation as projections of folds |
| **Refused** | Clay solved, physical FTL, Payload/ERP port, hand-minted ids |

## Status

KERNEL_SEALED = true. Run `npm run check` for the development-vortex census + a432 import/export self-ref fold. Critical a432 bridges are `.ts`-resolvable under strip-types (Wave 9); residual extensionless under `src/` sealed Wave 19–20; browser `a432.algebra.js` export surface sealed Wave 21; HTML→missing `.js` sealed Wave 22 (feed tip on slip).
