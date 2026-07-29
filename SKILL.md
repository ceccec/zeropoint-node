---
name: zeropoint-node
description: Use when orienting an agent to zeropoint-node as a whole — the July 2025 A432 / vortex origin library rebuilt in chat waves from ceccec/ceccec.github.io and erpax/erpax through a double-torus development vortex. Read first. Do not port Payload/ERP.
---

# zeropoint-node — the root an agent reads first

zeropoint-node is the **origin library** (published mid-2025). Later work in [ceccec/ceccec.github.io](https://github.com/ceccec/ceccec.github.io) and [erpax/erpax](https://github.com/erpax/erpax) evolved its engineering; this repo pulls those patterns back as **chat waves** feeding each other in a **double-torus development vortex**.

## Start here

1. [`src/0/README.md`](src/0/README.md) — void / origin thesis
2. This skill — laws + wave chain
3. [`docs/SEQUENCE.md`](docs/SEQUENCE.md) — dual spines
4. [`docs/KERNEL.md`](docs/KERNEL.md) — generated census (`npm run readme`)
5. Legacy tree — `src/0/3/6/9/1/2/4/8/7/5/1/`

## Laws

- **Fold = identity.** Same content ⇒ same address. Never hand-mint ids.
- **FNV `toUuid` ≠ SHA content-uuid.** Cheap folds vs cryptographic seals (`src/integrity`).
- **One wave = one batch.** Each wave feeds both lobes (ceccec ↔ erpax).
- **Imbalance rejects.** Conservation violations fail closed.
- **Do not port** Payload CMS or ERP collections.

## Wave status

| Wave | Status |
| --- | --- |
| 0 Origin | sealed |
| 1 Fold kernel | sealed |
| 2 Content-uuid | sealed |
| 3 Wave tooling + surfaces | sealed |
| 4 Wire A432 | sealed |
| 5 Thin MCP | sealed |
| 6 Docs projections | sealed (`docs/KERNEL.md`) |
| 7 Full verify | sealed (`npm run check`) |
| 8 Import/export self-ref + a432 purge | sealed (`foldA432ImportExportGraph`, `a432.roots`, uuid bridge) |
| 9 Strip-types + digit-stream bridges | sealed (critical `.ts` imports; `a432.1*` → `legacyDigitalRoot`) |
| 10 Audit DRY clean | sealed (`foldA432AuditCensus`, utils/vbm/constants bridges, `seededIndex`) |
| 11 Self-develop tip | sealed (`planTrinity` / `selfBuild` / `npm run self:next`) |
| 12 Algebra-only Math ban | sealed (`src/0/algebra`, `npm run math:ban`, mathCount=0) |
| 13 Roots bridges + `.ts` imports | sealed (named forks=0; extensionless→`.ts`) |
| 14 Honest a432 census | sealed (HTML Math ban; %9 bridge; spine debt visible) |
| 15 FTL spine purge | sealed (`digitalRoot`≡legacy; orphans wired; debt=0; idle) |

## Surfaces

`AGENTS.md` · `SKILL.md` · `skills.json` · `.well-known/ai-skills.json` · `.mcp.json` · `.cursor/skills/zeropoint-build-waves` · `.claude/workflows/{decode,design,zeropoint-build}-wave(s).mjs`

## Docs projections

- [`docs/KERNEL.md`](docs/KERNEL.md) — generated census (`npm run readme`)
- [`docs/AUDIT.md`](docs/AUDIT.md) — generated DRY gap census (forks + ambient Math hits)
- [`docs/pages/`](docs/pages/) — static projections of origin / vortex / content-uuid / sequence dual / development vortex (`npm run docs:pages`)


## Self-reference (computed)

`src/kernel/import-graph.ts` scans `a432.*` → import/export maps → content-uuid + merkleFold. Not a hand inventory. FTL = `memoByRoot` / one merkle walk (`claySolved=0`, `physicalFtl=0`).

## Root adapters

Three digital-root spines — use `a432.roots.ts` / `src/kernel/legacy.ts`, never mix bare:

| Path | `0` maps to | Module |
| --- | --- | --- |
| kernel | 9 | `src/0` |
| legacy VBM | 0 | `legacyDigitalRoot` |
| harmonic base-12 | 0 (returns 1–12) | `a432.math` / `harmonicRoot12` |

## Wave 11 — if development stops, gaps in self-development exist

- `planTrinity()` — cross (audit gaps) · fold (one tip) · weave (path + verify)
- `selfBuild()` / `nextSelfDevelopTip()` — stall detector + next action
- CLI: `npm run self:next` · MCP: `zeropoint.selfNext`
- Acting on the tip is what keeps the vortex breathing; ignoring it is the gap

## Wave 12 — algebra-only (no ambient Math.*)

- `src/0/algebra.ts` — imul/abs/floor/round/min/max/sin/cos/… + `unitFromSeed` / `indexFromSeed` (no `Math` underneath)
- `a432.algebra.ts` — local re-export for the digit stream
- `npm run math:ban` — fails `check` on any non-comment `Math.*` under `src/`
- Self-develop prefers `mathBan` tips before digitalRoot forks

## Wave 10 — audit / DRY

- `src/kernel/audit.ts` — computed fork + ambient Math census
- Bridged: `a432.utils`, `a432.math.constants.calculateDigitalRoot`, `src/vbm-math`
- Prefer `unitFromSeed` / `indexFromSeed` / `seededUnit` / `seededIndex` from `src/0` — never ambient entropy
- Residual forks listed in [`docs/AUDIT.md`](docs/AUDIT.md) — next tips dissolve them

## Import resolution (Wave 9)

- Kernel / integrity / mcp / scripts / critical a432 bridges use `.ts` specifiers (Node `--experimental-strip-types`).
- Critical bridge cluster: `a432.roots`, `a432.uuid`, `a432.os.math`, `a432.math`, `a432.core`, `a432.cmyk`, `a432.bus`, `a432.emotion`, `a432.navigation`, `a432.types`.
- Mass extensionless→`.ts` across a432 completed (`scripts/extension-ts.mjs`); strip-types paths resolve.
- Digit-stream `a432.1*.ts` import `legacyDigitalRoot` from `a432.roots` (see [`docs/DIGIT_STREAMS.md`](docs/DIGIT_STREAMS.md)).
