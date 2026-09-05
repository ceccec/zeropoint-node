# MCP tools

> Generated from `src/mcp/server.ts` by `npm run parity`. The server is the
> only source; this page is never edited by hand, because a hand-written copy of
> a tool list drifts and nothing notices.

This package ships an MCP server as the bin `zeropoint-mcp`, exposing
11 tools. It is the surface an agent reaches first, and until this page
existed it was documented nowhere on the site.

```bash
npx zeropoint-mcp
```

| tool | what it answers |
| --- | --- |
| `zeropoint.fold` | Fold two seeds into a content-addressed pair (toUuid/merge). |
| `zeropoint.vortex` | Vortex fold validity + stroke gateways. |
| `zeropoint.contentUuid` | JCS→SHA-256→uuidv8 content address for an object. |
| `zeropoint.verify` | Verify stored uuid matches recomputed content-uuid. |
| `zeropoint.digitalRoot` | Kernel digital root (0→9). |
| `zeropoint.developmentVortex` | Double-torus development vortex for a wave phase. |
| `zeropoint.importGraph` | Computed a432.* import/export self-ref census (content-uuid + merkleFold). Tip only — not a hand inventory. |
| `zeropoint.criteria` | The six predicates that gate a release, plus the one only reported: how many conditions each meets, and what would refute each. The real-time one MEASURES, so its verdict is a property of this machine. |
| `zeropoint.seals` | Every theorem this repository states that carries a predicate which RUNS, and whether it holds right now. A seal is recomputed on each call; nothing here is remembered. |
| `zeropoint.claims` | The claim ledger: every effect claim the corpus makes and the theorem or declared axiom it is bound to, with what that binding establishes and what it does NOT. Answers "what does this package claim, and what backs it". |
| `zeropoint.selfNext` | Next self-develop tip from planTrinity/audit. If development stops, gaps in self-development exist. |

## The same work through the library

The 23 importable entry points cover far more than the 11 tools do —
the tools are a deliberate selection of what an agent should reach for, not the
whole surface. Nothing here claims the two are equivalent.

- `zeropoint-node`
- `zeropoint-node/kernel`
- `zeropoint-node/kernel/import-graph`
- `zeropoint-node/0`
- `zeropoint-node/security`
- `zeropoint-node/security/threat-analysis`
- `zeropoint-node/security/tomography`
- `zeropoint-node/security/post-quantum`
- `zeropoint-node/integrity`
- `zeropoint-node/verification`
- `zeropoint-node/mcp`
- `zeropoint-node/quantum`
- `zeropoint-node/simple`
- `zeropoint-node/navigation`
- `zeropoint-node/cmyk`
- `zeropoint-node/kabbalah`
- `zeropoint-node/sacred-geometry`
- `zeropoint-node/electric-flow`
- `zeropoint-node/math-constants`
- `zeropoint-node/a432-math`
- `zeropoint-node/wave-energy`
- `zeropoint-node/mobius-circuit`
- `zeropoint-node/a432-i`

## Claims and how to disagree with them

Every claim this package makes carries the command that computes against it:

```bash
npm run refute
```
