# zeropoint-node — agent orientation

**Read [`SKILL.md`](SKILL.md) first**, then [`src/0/README.md`](src/0/README.md).

## What this is

- Origin A432 / vortex library (`ceccec/zeropoint-node`, first published 2025-07-08).
- Rebuilding via **chat waves** by learning from `ceccec/ceccec.github.io` and `erpax/erpax`.
- Not an ERP. Not Payload. Not a clone of either later repo.

## Wave chain (one coherent batch per turn)

`origin → decode → design → learn → tune → edit → rebuild → verify`

Say **next** to advance one wave. Do not skip gates. Do not invent ids.

**If development stops, gaps in self-development exist** — run `npm run self:next` and act on the computed tip (audit → planTrinity). Ignoring the tip is the gap.

## Navigate

| Path | Role |
| --- | --- |
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
- [x] Real `SECURITY.md` (not erpax stub)
- [x] No Payload/ERP in tree

## Forbidden

- Porting erpax Payload / GL / business atoms
- Claiming Clay solved or physical FTL
- Wet-linear full-tree rewrites in one turn
- Editing generated projections by hand
- Hand-minted / ambient-random ids (use `toUuid` / content-uuid / algebra `unitFromSeed`)
- Ambient `Math.*` on any computing surface (use `src/0/algebra` / `a432.algebra.js` / HTML bootstrap; `npm run math:ban` fails closed on `src/`, `public/`, `deployment/`, root demos — `dist/` gitignored, rebuilt from clean sources)
- Ignoring `npm run self:next` tip when hard-clear (tip=`feed` — keep chatting waves)
