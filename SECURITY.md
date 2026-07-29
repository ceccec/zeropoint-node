# Security

## Identity

- **Fold addresses** (`src/0` `toUuid`): deterministic FNV-based UUIDs for cheap content addressing and memoization. Not collision-resistant against a resourced adversary.
- **Content-uuids** (`src/integrity/content-uuid.ts`): RFC 8785 JCS → SHA-256 → UUID version 8. Use for sealed proofs, manifests, and verify-on-read.

Never hand-mint identifiers. Same content ⇒ same id. `a432.uuid` random/`Math.random` paths are purged — they fold through kernel `toUuid`.

## Spines

Do not mix digital-root paths without adapters (`a432.roots.ts`): kernel `0→9`, legacy VBM `0→0`, harmonic base-12 `1–12`.

## Verification

`verifyContentUuid(obj)` recomputes the digest after stripping storage meta (`uuid`, `id`, timestamps). Mismatch ⇒ tamper.

Import/export census (`foldA432ImportExportGraph`) is computed, not hand-inventoried.

## MCP

Local stdio server (`.mcp.json`). Tools are pure math / integrity ops. Do not expose without an allowlist if bound to a network.

## Out of scope

This repository is not an ERP and does not implement Payload access control, multi-tenant D1 isolation, or GDPR crypto-shred. Those patterns live in erpax and are intentionally not ported.
