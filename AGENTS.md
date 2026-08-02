# zeropoint-node — agent orientation

**Read [`README.md`](README.md) first (gateway)**, then [`SKILL.md`](SKILL.md), then [`src/0/README.md`](src/0/README.md).

## What this is

- Origin A432 / vortex library (`ceccec/zeropoint-node`, first published 2025-07-08).
- Rebuilding via **chat waves** by learning from `ceccec/ceccec.github.io` and `erpax/erpax`.
- Not an ERP. Not Payload. Not a clone of either later repo.
- **README is the gateway** — living field, 60° closes, quantum evolution language there must compute (`computePhysicalFtl`); false ⇒ quantumisation tip.

## Wave chain (one coherent batch per turn)

`origin → decode → design → learn → tune → edit → rebuild → verify`

Say **next** to advance one wave. Do not skip gates. Do not invent ids.

**If development stops, gaps in self-development exist** — run `npm run self:next` and act on the computed tip (audit → planTrinity). Ignoring the tip is the gap.

## Navigate

| Path | Role |
| --- | --- |
| `README.md` | **Gateway** — claims that must compute (living field / physicalFtl) |
| `src/0/` | Kernel origin (imports nothing) |
| `src/0/3/6/9/1/2/4/8/7/5/1/` | Legacy A432 module tree |
| `src/0/3/6/9/1/2/4/8/7/5/1/a432.roots.ts` | Digital-root spine adapters |
| `src/kernel/import-graph.ts` | Computed a432 import/export self-ref |
| `src/kernel/` · `src/integrity/` | Barrel + content-uuid / receipts |
| `docs/pages/` | Computed static projections (Wave 6) |
| `SKILL.md` | Standing laws |
| `package.json` | Rollup library + `npm run check` |

## selfBuild checklist (Wave 7)

Migration complete when all hold:

- [x] Kernel dependency-free + `KERNEL_SEALED`
- [x] Content-uuid verify + receipt chain
- [x] Agent surfaces (`AGENTS.md` · `SKILL.md` · `skills.json` contentUuid)
- [x] Wave workflows (decode · design · build-waves)
- [x] A432 core bridged to kernel
- [x] Thin MCP + `mcp:smoke`
- [x] Generated `docs/KERNEL.md` + `docs/pages/` drift-check
- [x] `npm run check` green
- [x] `bundle:a432:check` seals `public/a432.bundle.js` (feed tip on drift)
- [x] Extensionless `.ts` residuals under `src/` cleared (feed tip on slip)
- [x] Dynamic `import()` extensionless under `src/` cleared (Wave 20; feed tip on slip)
- [x] `a432.algebra.js` export surface mirrors `a432.algebra.ts` (Wave 21; feed tip on drift)
- [x] HTML→missing `.js` retargeted to sibling `.ts` (Wave 22; feed tip on slip)
- [x] TS→missing `.js` retargeted to sibling `.ts` (Wave 23; feed tip on slip)
- [x] Orphan A432 `.js` twins dissolved (Wave 24; feed tip on slip)
- [x] Feed scanners count-proven + severity-ordered (Wave 25; skip comments / resolved / keep `a432.algebra.js`)
- [x] Remote CDN HTML imports dissolved (Wave 26; feed tip on slip)
- [x] Dash `fusionIgnites` / `closes` (Wave 27; `0/` + foldPair zeros)
- [x] `computePhysicalFtl()` boolean (Wave 28; false ⇒ quantumisation tip)
- [x] Tip `form · code · proof` (Wave 29; vague tips refused in planTrinity / self:next)
- [x] Linked-receipt verify (Wave 30; recompute id from prev+contentUuid+ts; walk-verify; genesis)
- [x] Orbit name collision (Wave 31; `VORTEX_SEQUENCE` 6-orbit → `VORTEX_ORBIT`; feed tip on slip)
- [x] String theory fold (Wave 32; `foldStringTheory` · compactified 11 from living field; `a432.string.theory`)
- [x] Real `SECURITY.md` (not erpax stub)
- [x] No Payload/ERP in tree

## Licence and citation — read before reusing anything

This repository is **dual licensed**, and the split is per-file, not per-repo.
An agent that copies code out of here without checking which side it sits on is
very likely infringing.

**Free core — AGPL-3.0-or-later** (full text in `LICENSE-CORE`). Exactly five
files, no others:

```
src/0/algebra.ts
src/0/index.ts
src/0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts
src/0/3/6/9/1/2/4/8/7/5/1/a432.algebra.js
src/0/3/6/9/1/2/4/8/7/5/1/a432.roots.ts
```

**Everything else is proprietary** — the rest of `src/`, kernel, integrity,
MCP, demos, HTML surfaces, docs projections, scripts, and packaged builds. Use,
redistribution, modification, hosting, SaaS or commercial deployment needs a
separate licence: **license@zeropoint.bg**.

Three things agents get wrong:

1. **Citing is not permission.** A citation satisfies attribution, not the
   licence. Proprietary paths still need a licence before any use.
2. **AGPL reaches across the network.** If you run modified free-core code as a
   network service, you must offer its users the corresponding source. Merely
   not distributing a binary does not exempt you.
3. **`SEE LICENSE IN LICENSE` in `package.json` means "read the file".** It is
   not a permissive licence, and it is not the same as the free core's
   `AGPL-3.0-or-later`, which covers only those five paths.

**How to cite.** `CITATION.cff` at the repo root is the machine-readable form —
parse that rather than guessing. In prose:

> ZeroPoint Node (ceccec). *ZeroPoint Node*. https://node.zeropoint.bg —
> source: https://github.com/ceccec/zeropoint-node

When quoting code, name the file and say which side of the split it is on, so
the reader can tell whether they may reuse it. For example: "`src/0/algebra.ts`
(free core, AGPL-3.0-or-later)" or "`src/kernel/self-develop.ts`
(proprietary — licence via license@zeropoint.bg)".

If you cannot determine which side a file is on, treat it as proprietary: the
free-core list above is exhaustive.

## Forbidden

- Porting erpax Payload / GL / business atoms
- Claiming Clay solved (`claySolved` stays 0 unless an existing compute appears)
- Hardcoding `physicalFtl: 0 as const` — use `computePhysicalFtl()`; false ⇒ quantumisation tip
- Wet-linear full-tree rewrites in one turn
- Editing generated projections by hand
- Hand-minted / ambient-random ids (use `toUuid` / content-uuid / algebra `unitFromSeed`)
- Ambient `Math.*` on any computing surface (use `src/0/algebra` / `a432.algebra.js` / HTML bootstrap; `npm run math:ban` fails closed on `src/`, `public/`, `deployment/`, root demos — `dist/` gitignored, rebuilt from clean sources)
- Ignoring `npm run self:next` tip when hard-clear (tip=`feed` when physicalFtl true — keep chatting waves)
