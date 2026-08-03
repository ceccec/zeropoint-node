# Quantum Encryption Framework — Status

**Last verified:** August 2026, against `npm run check` (exit 0).

> **This file previously read "STATUS: READY GO 🟢 — Phase 1 COMPLETE,
> Production-ready, 100% coverage, No gaps."** None of that was measured. A
> verification pass found defects in every tier, six of the eleven proofs, and
> the cipher itself. Phase 1 was not complete when it was declared complete.
> The record below is what survived checking.

---

## What is actually true

**The cipher is AES-256-GCM.** Confidentiality, integrity and authenticity come
from a standard AEAD, not from the fold algebra. Keys derived from human input
are stretched with scrypt (N=2¹⁷, r=8, p=1).

**The fold algebra is real and verified — as algebra.** Closure, the trinity
subgroup, the vortex bijection, digital-root identities, the merkle folds and
the σ reduction all hold, and are now checked over exhaustive computed ranges
rather than hand-picked examples.

**These are two separate claims.** The algebra gives the framework its
structure. AES-GCM gives the cipher its strength. Every serious defect below
came from conflating them.

---

## What the verification pass found

Each of these was live, in code, while the docs said "production-ready" and the
test suite reported success.

| Component | Defect |
|---|---|
| Test harness | `console.assert` prints but exits 0 — the suite was green by construction |
| Cipher | **The key was never used.** 500 distinct keys → 1 ciphertext; `decryptQuantum` took no key at all. Keyspace: **0 bits** |
| Key generation | Returned the constant `6969…` for *every* input. 5000 entropies → 1 key; the byte `3` unreachable |
| Tier 3 seal | Bound to raw entropy the key did not retain — could never be recomputed |
| Tier 2 | `orderMatters` was inverted, reporting every gate as commutative |
| Tier 5 | `computesGate()` had a self-referential deadlock; could never return `ok` |
| Tier 5 | 4 of 6 facets set `= true` by the method that ran them — recording execution, not validity |
| Dimension 6 | Compared decoded plaintext against the string `'1'` — could never hold |
| Dimension "Rodin" | Read `registerIdx >= 0` — true of every register that exists |
| Proofs | 6 of 11 did not survive checking (see below) |

**Why the tests passed anyway:** every one of these was masked by an assertion
too weak to fail — membership checks that a constant satisfies, facets that
record execution, claims that cannot be false. The lesson is in
`scripts/facet-tautology.mjs`, which now catches one shape of it mechanically.

---

## The proofs

All eleven now hold as stated, verified over computed ranges by
`src/security/quantum-proofs.test.ts` (gated in `npm run check`).

| # | Claim | Status |
|---|---|---|
| 1 | Rodin closure mod 9 | EXACT — and a single 6-cycle, stronger than stated |
| 2 | Trinity subgroup | EXACT — all 27 associativity triples |
| 3 | Rodin involution | EXACT, **restated** — a sequence has no multiplicative inverse; the *generator* inverts |
| 4 | Vortex bijection | EXACT — every shift × every digit |
| 5 | Merkle cascade | EXACT, **split** — `merkleFold` is a set fold; `merkleFoldOrdered` added for sequences |
| 6 | Determinism | EXACT — though the pseudocode shown was never the algorithm |
| 7 | Digital root | EXACT for n ≥ 1 — n = 0 is a convention, not the digital root |
| 8 | Content-UUID uniqueness | **Was FNV, not SHA-256.** Tier 3 now seals with SHA-256 + full 256-bit digest |
| 9 | Receipt verification | EXACT, bounded — per-receipt only |
| 10 | Inversion security | **Was circular.** Replaced by a tight σ reduction |
| 11 | Composition gate | EXACT **after fix** — 4 of 6 facets were unconditional |

Two are assumptions rather than results, and should be read that way: Proof 8
rests on SHA-256 collision resistance, and Proof 10 is an *equivalence* between
instantiations, not a statement that either is secure.

---

## The cipher's four constructions

| | Construction | Outcome |
|---|---|---|
| 1 | position-only vortex shift | key never consulted — 0-bit keyspace |
| 2 | repeating key `material[i mod n]` | one known plaintext recovered the key |
| 3 | HMAC-SHA256 keystream + encrypt-then-MAC | sound, but bespoke |
| 4 | **AES-256-GCM** | standard AEAD — current |

Only the fourth is sound. The first three are recorded because the docs
described each of them as secure at the time.

---

## What it provides now

| Property | Mechanism |
|---|---|
| Confidentiality | AES-256-GCM |
| Integrity / authenticity | GCM tag, verified before plaintext is returned |
| Semantic security | fresh 96-bit IV (verified: 500/500 distinct) |
| Key/payload binding | `keyUuid` as AAD (verified load-bearing) |
| Password hardening | scrypt N=2¹⁷, r=8, p=1 — KDF params sealed against downgrade |
| Tamper-evident measurement | receipt chain + `merkleFoldOrdered` |

## What it does not provide

- **Nonce/IV reuse is catastrophic.** GCM leaks the authentication subkey, so
  forgery becomes possible. Random 96-bit IVs bound safe use to ~2³² messages
  per key; rotate before that.
- **scrypt creates no entropy.** A weak password stays weak.
- **No side-channel, traffic-analysis or key-management analysis.** Ciphertext
  length reveals plaintext length.
- **Nothing here is quantum-hardware anything.** The tomography module is a
  simulation; no claim is made about physical qubits.

---

## Phase status

| Phase | State |
|---|---|
| 1 — Cipher | **Implemented and verified.** Not "complete" in the sense first claimed; it was rebuilt |
| 2 — State tomography | **Implemented** (simulated measurement model), 40 checks gated |
| 3–8 | **Specifications only.** No implementation, no schedule commitment |

**On phases 3–8:** the specs in `docs/QUANTUM_PHASES_3_TO_8.md` are design
sketches. The budget, headcount and quarter-by-quarter dates that appeared here
($10M, 60+ FTE, fixed quarters) were never estimates derived from anything —
they are removed rather than restated. Phases 6–8 in particular (blockchain,
ambient network, "consciousness integration") are speculative and should not be
read as planned work.

---

## Running the checks

```bash
npm run check
```

Fifteen stages, including the three security suites. The ratchet holds eight
surfaces at their ceilings; note that 124 TypeScript errors and 932 ESLint
errors are **pre-existing repo-wide debt**, held rather than fixed by this work.

```bash
npm run tautology
```

Flags boolean claims that cannot be false — the defect shape behind several
findings above.

---

## How to read this framework

The fold algebra is a genuine, verified mathematical structure, and it is the
framework's identity. It is **not** a cryptographic primitive, and every
attempt here to use it as one produced a broken cipher.

Use `encryptQuantum`/`decryptQuantum` for encryption: they are AES-256-GCM. Use
the algebra for what it is — content addressing, structural proofs, tamper-
evident chains. Keep the two claims apart, and the framework is sound. Merge
them, and it is not.
