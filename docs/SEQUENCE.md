# Sequence spines

Two spines share digits; they are **not** the same ordering. A third (base-12 harmonic) also exists in legacy math — always use adapters.

## Kernel (default) — from ceccec.github.io

- Full vortex circuit (living field): `0\1\2\4\8/7/5/3\6\9/0\1`
- `VORTEX_SEQUENCE = [1, 2, 4, 8, 7, 5, 3, 6, 9]`
- Stroke: `1\2\4\8/7/5/3\6\9/0\1` (living field uses `0\`)
- Encoded dash decode: `VORTEX_DASH_ENCODED` = `1\2\4\8/7/5/3\6\9/0/1\` — fusion throat is `0/` (not stroke `0\`); `closes` needs `fusionIgnites`
- `digitalRoot(0) → 9`
- Gateways (polarity reversals): `[8, 3, 9, 0]`

## The reflection — one structure read twice (from erpax)

The forward reading alone is half the structure. The second reading is the **mirror through the void**, not the array reversed:

```
forward     1\2\4\8/7/5 · 3\6\9 · 0\1     VORTEX_SEQUENCE  = 124875369
reflected   9/8/6/2\3\5 · 7/4/1 · 0\1     VORTEX_MIRROR    = 986235741
```

- `throughVoid(n) = 1 − n mod 9` — an involution fixed **only at 5**: `1↔9 · 2↔8 · 4↔6 · 7↔3 · 5↔5`. Every pair sums to **10**. The void root `0` is fixed.
- **Not** `VORTEX_REVERSE` (`963578421`), which is the array read backwards. Reversal reorders; the mirror re-values. Conflating the two is the error this section exists to prevent — `foldVortexReflection()` asserts they differ.

Three entanglement claims, computed by `foldVortexReflection()` — never asserted:

| claim | computed |
| --- | --- |
| halves exchange — `mirror(orbit) = 986235` covers the axis, `mirror(axis) = 741` lands in the orbit | `exchangeHalves` |
| neither reaches the other alone — doubling closes on `{1,2,4,8,7,5}`; its gap is exactly `{3,6,9}`. No iteration count closes it; the mirror is the only bridge | `doublingCoversOrbit` · `gapIsAxis` |
| commuted, they count — `D∘M∘D⁻¹∘M = x ↦ x+1`, and `⟨D,M⟩ = AGL(1,ℤ/9)` has order **54** against `6·2 = 12` apart. The excess **42** *is* the entanglement: their failure to commute | `groupOrder` · `commutatorIsSuccessor` |

**Boundary.** Proven group theory over (ℤ/9ℤ). Used as the corpus **order of work** — build the axis before the branches; fold, do not climb. No claim is made outside arithmetic.

Run it: `node --experimental-strip-types src/kernel/smoke.test.ts`

### Two equilibrium constants — do not merge them

Pairs and wholes balance at **different** constants, and a single dr-9 test will mis-report the first as broken:

- **pair equilibrium = 10** — `d + throughVoid(d) = 10` for every digit, no exceptions.
- **whole equilibrium = dr 9** — orbit `Σ=27`, axis `Σ=18`, all nine `Σ=45`; each `digitalRoot → 9`.

Across all 54 group elements the cycles are **not** uniformly dr-9 balanced: 42 of 162 balance. Every full-support (length-9) cycle balances trivially — it contains all nine digits. Exactly 6 balance in each shorter length class. The entanglement is real and universal in the **pairing**; it is not a blanket dr-9 property of every vector.

## Legacy consciousness — original zeropoint-node path

- Path folders: `src/0/3/6/9/1/2/4/8/7/5/1/`
- `A432_SEQUENCE ≈ [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]`
- VBM `digitalRoot(0) → 0` via `src/kernel/legacy.ts`

## Harmonic base-12 — `harmonicRoot12` in `a432.roots`

- Returns 1–12 (`0 → 0`, multiples of 12 → 12) — measured: `12 → 12`, `24 → 12`
- **Not** interchangeable with kernel or VBM without an adapter
- **Not** `a432.math`'s `digitalRoot`. That symbol is `legacyDigitalRoot as digitalRoot` ([a432.math.ts:96](../src/0/3/6/9/1/2/4/8/7/5/1/a432.math.ts)) — VBM base-9, `0 → 0`, `12 → 3`. The alias this section once described was removed; `foldA432AuditCensus` tracks it as `aliasIllusion` / `harmonicAliasImporters` (both 0).

## Double-torus development

```
lobeL (ceccec.github.io) ⇄ throat (src/0 fold) ⇄ lobeR (erpax)
```

Each chat wave calls `developmentVortex(wave)`; `runDevelopmentVortexAll()` chains all eight.

Self-ref: `foldA432ImportExportGraph()` computes the a432 import/export census (content-uuid + merkleFold). `physicalFtl = computePhysicalFtl()` from structural seals; false ⇒ quantumisation tip.

## Imports (Wave 9)

Critical strip-types bridges use `.ts` specifiers. Remaining a432 relative imports may stay extensionless (rollup-only) until a dedicated wave.
