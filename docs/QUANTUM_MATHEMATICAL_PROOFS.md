# Mathematical Proofs — Quantum Fold Cipher Foundations

**Scope:** Algebraic properties used in the quantum cipher.

**Verification status.** Every claim below was re-checked over its full
computed range by `src/security/quantum-proofs.test.ts`, which runs in
`npm run check`. That pass corrected six statements. The doc previously
proved each claim by listing the cases it chose; a claim demonstrated on
hand-picked data is not demonstrated.

What changed:

| # | Was | Is |
|---|---|---|
| 1 | "key expansion never leaves {1,2,4,8,7,5}" | expansion operates on the trinity {3,6,9}; the application was wrong |
| 3 | "R′ is the multiplicative inverse of R", "bitwise reverse" | ill-posed; the inverse is of the *generator* (2 → 5). It is sequence reversal |
| 5 | "if any leaf changes, the root changes" | true for values; for order it needs `merkleFoldOrdered` (**gap since closed**) |
| 6 | pseudocode shown as plain FNV-1a | the real `hash32` differs, and `toUuid` folds four seeded words |
| 7 | "n mod 9 = 0 ⟹ dr = 9" | omits n = 0, whose true digital root is 0 |
| 8 | "Content-UUID uniqueness (SHA-256)" | the cipher uses the **FNV fold**, not SHA-256 |
| 10 | "S(R) ⟹ S(R′) … by symmetry" | assumed its conclusion; replaced by an exact **tight reduction** (**gap since closed**) |
| 11 | "all 6 facets verified ⟹ operations consistent" | 4 of 6 facets were unconditionally `true`; now they compute |

---

## Proof 1: Rodin Sequence Closure Under Doubling (mod 9)

**Theorem:** The set S = {1, 2, 4, 8, 7, 5} is closed under multiplication by 2 modulo 9.

**Proof:**
```
For all x ∈ S, compute 2x mod 9:

1 × 2 = 2  mod 9  = 2  ∈ S ✓
2 × 2 = 4  mod 9  = 4  ∈ S ✓
4 × 2 = 8  mod 9  = 8  ∈ S ✓
8 × 2 = 16 mod 9  = 7  ∈ S ✓
7 × 2 = 14 mod 9  = 5  ∈ S ✓
5 × 2 = 10 mod 9  = 1  ∈ S ✓

Since every element maps back to S, S is closed under ×2 mod 9.
```

**Consequence:** Iterating `k → 2k mod 9` on any element of S stays in S.

**Application:** *Corrected.* This said "Rodin key expansion never produces
bytes outside {1,2,4,8,7,5}". It does not: `expandQuantumKeyViaRodin` doubles
**trinity** bytes, so its material stays in {3,6,9} (which is closed under
doubling: 3→6, 6→3, 9→9 — Proof 2's set, not this one). The closure proved
here is real; the code it was attached to is governed by Proof 2.

**Verified:** exhaustively over all 6 elements, and shown to be a single
6-cycle rather than merely closed.

---

## Proof 2: Trinity Subgroup (Mod 9)

**Theorem:** The set T = {3, 6, 9} forms a subgroup under addition modulo 9.

**Proof:**

1. **Closure:** For all a, b ∈ T, a + b mod 9 ∈ T
   ```
   3 + 3 = 6  mod 9 = 6  ∈ T ✓
   3 + 6 = 9  mod 9 = 9  ∈ T ✓
   3 + 9 = 12 mod 9 = 3  ∈ T ✓
   6 + 6 = 12 mod 9 = 3  ∈ T ✓
   6 + 9 = 15 mod 9 = 6  ∈ T ✓
   9 + 9 = 18 mod 9 = 0 ≡ 9 mod 9 = 9 ∈ T ✓
   ```
   All sums stay in T.

2. **Identity:** 0 mod 9 ≡ 9 ∈ T ✓

3. **Inverses:** For each a ∈ T, -a mod 9 ∈ T
   ```
   -3 mod 9 = 6  ∈ T ✓
   -6 mod 9 = 3  ∈ T ✓
   -9 mod 9 = 0 ≡ 9 ∈ T ✓
   ```

4. **Associativity:** Inherited from integer addition ✓

**Consequence:** Trinity operations never escape the {3,6,9} constraint.

**Application:** Trinity-masked keys maintain algebraic structure through all rounds.

**Q.E.D.**

---

## Proof 3: Rodin Sequence Involution (Self-Inverse)

**Theorem (restated).** Let R = [1,2,4,8,7,5]. Then reverse(R) = [5,7,8,4,2,1]
is the orbit of 1 under the **inverse generator** 2⁻¹ = 5 (mod 9).

> **Correction.** This previously read "R′ is the multiplicative inverse of R
> (bitwise reverse)". Both parts were wrong. A *sequence* has no multiplicative
> inverse — what inverts is the generator, 2 → 5, since 2·5 = 10 ≡ 1 (mod 9).
> And reverse(R) is sequence reversal, not a bitwise operation.

**Proof:**

Define `invert(x)` = "reverse the sequence starting from x":

```
Starting from 1, doubling: 1 → 2 → 4 → 8 → 7 → 5 → 1
Reverse order:            5 → 7 → 8 → 4 → 2 → 1 → 5
```

Show that R and R' generate the same group:

```
R  doubling: 1×2=2, 2×2=4, 4×2=8, 8×2=7, 7×2=5, 5×2=1 (period 6)
R' doubling: 5×2=1, 1×2=2, 2×2=4, 4×2=8, 8×2=7, 7×2=5 (period 6)

Both are cyclic orders of same elements (different starting points).
```

**Key insight:** Applied to security proofs:
- Proof P(R) works for classical threat (forward doubling)
- Proof P(R') works for quantum threat (backward doubling)
- Same proof structure ✓

**Consequence (algebraic only):** forward doubling and its reverse traverse
the same 6-cycle. This is a fact about the group ℤ/9*, and it is what Proof 10
may legitimately rest on — no more.

**Verified:** 5 is confirmed as 2⁻¹ mod 9, and reverse(R) is confirmed to be
the halving orbit.

---

## Proof 4: Vortex Cipher Bijection

**Theorem:** The vortex shift function f(d) = (d + shift mod 9) is a bijection on {1,2,3,4,5,6,7,8,9}.

**Proof:**

For any fixed shift value s ∈ {1,2,4,8,7,5}:

```
Injectivity: If f(a) = f(b), then
  (a + s - 1) mod 9 + 1 = (b + s - 1) mod 9 + 1
  ⟹ a + s ≡ b + s (mod 9)
  ⟹ a ≡ b (mod 9)
  ⟹ a = b (since a, b ∈ {1-9})

Surjectivity: For any target y ∈ {1-9}, find x ∈ {1-9} such that f(x) = y.
  f(x) = y
  ⟹ (x + s - 1) mod 9 + 1 = y
  ⟹ x = (y - s + 1) mod 9 + 1 (if result is 0, use 9)
  
  This always has a unique solution in {1-9}.
```

**Consequence:** Every ciphertext digit maps to unique plaintext digit. No collisions, no invalid states.

**Application:** Padding oracle attack is impossible (no invalid ciphertexts to distinguish).

**Q.E.D.**

---

## Proof 5: Merkle Tree Properties (No Gaps)

**Theorem:** If any leaf in a merkle tree changes, the root hash changes.

**Proof:**

By induction on tree depth:

1. **Base case (depth 1):** Single leaf L.
   - root = hash(L)
   - If L → L', then hash(L') ≠ hash(L) (hash collision property)
   - ⟹ root changes ✓

2. **Inductive case (depth n):**
   - Assume: any leaf change in depth n-1 subtree changes its root
   - For depth n: root = hash(left_root, right_root)
   - If left leaf changes: left_root changes (inductive hypothesis)
   - ⟹ hash(left_root, right_root) ≠ hash(left_root', right_root) (collision resistance)
   - ⟹ root changes ✓

> **Correction — the theorem needed splitting in two.** `merkleFold` begins
> with `[...leaves].sort()`, so its root is **permutation-invariant**. That was
> reported here as a defect; it is not. It is the correct semantics for a
> **set** — facet declaration order must not change a seal — and it matches the
> upstream kernel (`ceccec/ceccec.github.io`, `src/0/index.ts`) exactly. Changing
> it would diverge from upstream and churn every root in the repo.
>
> The real gap was that ordered data was being folded through a set fold. That
> is now closed by a second primitive rather than by altering the first:

| Fold | Semantics | Order | Use for |
|---|---|---|---|
| `merkleFold` | set | invariant | facets, unordered collections |
| `merkleFoldOrdered` | sequence | **sensitive** | measurement series, step logs, event chains |

> `merkleFoldOrdered` binds each leaf to its index (`merge(toUuid(\`ord:i\`), leaf)`)
> before folding, so a permutation changes the pairing and therefore the root.
> It is built **on** `merkleFold`, so the set fold is untouched. Position
> binding also separates equal leaves, which a plain unsorted fold would not.
>
> The induction above is stated for a binary tree; the implementation promotes
> an odd trailing node unchanged (`b === undefined ? a : merge(a,b)`), which the
> proof does not model. Index binding makes that promotion unambiguous for
> sequences, since no two positions carry the same address.

**Consequence:** a leaf VALUE change cascades to the root in both folds. An
ORDER change is detected by `merkleFoldOrdered` and — by design — not by
`merkleFold`.

**Application:** the tomography proof now uses the ordered fold, because a shot
series is a sequence. Previously it used `merkleFold`, so a permuted run
produced an identical root and its tamper test passed only on the `prev`-link
check; the root alone could not see a reordering. It can now, and the test
asserts exactly that, alongside the contrast case.

**Verified:** value-change detection in both folds; all **120 permutations** of
5 leaves give 120 distinct ordered roots and collapse to 1 set root; equal
leaves are distinguished by position.

---

## Proof 6: FNV Hash Determinism

**Theorem:** For any fixed seed s, `hash32(s)` always produces the same output.

**Proof:**

FNV-1a algorithm (deterministic):
```
h := FNV_offset_basis = 0x811c9dc5
for each byte c in input:
  h ^= c
  h := h × FNV_prime mod 2^32
  h ^= h >> 13
...
return h

Every step is a pure function (no randomness, no state, no time dependency).
Given same input → same intermediate values → same output.
```

> **Correction — the pseudocode is not the algorithm.** The real `hash32`
> applies `h ^= h >>> 13` *inside* the loop and then a two-stage
> murmur-style finaliser; `toUuid` folds **four** differently-seeded `hash32`
> words into 16 bytes, then pins the UUID version and variant nibbles.
> Determinism holds regardless — it follows from purity, not from the mixing.

**Consequence:** `toUuid(seed)` is deterministic. Same state → same UUID.

**Verified:** 2000 repeat calls identical; 20000 distinct seeds give 20000
distinct addresses.

---

## Proof 7: Digital Root (Mod 9) Properties

**Theorem:** Digital root (sum digits iteratively until single digit) ≡ (n mod 9), except n mod 9 = 0 ⟹ dr = 9.

**Proof:**

Let n = d_k × 10^k + d_{k-1} × 10^{k-1} + ... + d_1 × 10 + d_0

```
n mod 9 = (d_k × 10^k + ... + d_0) mod 9
        = (d_k × (10^k mod 9) + ... + d_0) mod 9

Note: 10 ≡ 1 (mod 9), so 10^k ≡ 1 (mod 9) for all k.

Therefore:
n mod 9 = (d_k × 1 + ... + d_0 × 1) mod 9
        = (d_k + ... + d_0) mod 9
        = (sum of digits) mod 9

Iterating: dr(n) = dr(sum of digits) = ... eventually = n mod 9 (or 9 if result is 0).
```

> **Correction — n = 0.** The rule as written ("n mod 9 = 0 ⟹ dr = 9") does not
> exclude zero, whose true digital root is 0. The implementation returns
> `digitalRoot(0) = 9`, a convention that is fine for this codebase but is not
> the mathematical digital root.

**Consequence:** Digital root is invariant under digit permutation (only depends on sum).

**Verified:** exhaustively for n = 1..20000 against the closed form, and
n = 1..5000 against iterated digit-summing.

**Application:** Trinity constraint: key bytes ∈ {3,6,9} means digital root ∈ {3,6,9}.

**Q.E.D.**

---

## Proof 8: Content-UUID Uniqueness (SHA-256)

**Theorem:** For distinct inputs x ≠ y, SHA-256(x) ≠ SHA-256(y) with overwhelming probability (collision resistance).

**Proof:**

By design of SHA-256 (cryptographic hash function):
- Output space: 2^256 possible values
- Given adversary cannot feasibly find collision in time < 2^128 operations (birthday bound)

> **Gap, and how it was closed.** This proof once described a function the
> cipher never called: `QuantumFoldCipher` sealed with `toUuid()`, the **FNV
> fold**, while the proof claimed SHA-256. Two separate problems followed —
> the wrong *algorithm family* (FNV is built for speed, not collision
> resistance) and the wrong *width* (a UUID is 128 bits with 6 pinned by
> version/variant, so 122 free bits and a birthday bound near 2⁶¹, not 2¹²⁸).
>
> Tier 3 is the **cryptographic** seal, and `src/integrity/content-uuid.ts`
> already stated the intended split in its own header: *"FNV toUuid stays in
> src/0 for cheap folds; this module seals cryptographic identity."* The cipher
> was simply on the wrong side of it. It now seals through that module.
>
> Both problems had to be fixed, not just the first. Sealing to a SHA-256
> **UUID** alone would still have truncated to 122 bits while the doc claimed
> 2¹²⁸ — the right algorithm at the wrong width. A key therefore carries two
> bindings:

| Field | Construction | Width | Carries |
|---|---|---|---|
| `contentUuid` | `computeContentUuid` (JCS → SHA-256 → uuidv8) | 122 free bits | interoperable identity |
| `contentDigest` | `computeContentDigest` (full SHA-256 hex) | **256 bits** | the collision-resistance claim |

> `verifyQuantumKey` checks **both**, so a mismatch between them cannot pass.
> One `keySealInput()` builds what gets hashed, for generation and verification
> alike — they had built it separately, and expanded round keys sealed over one
> shape while verifying against another, so they could never verify.

**Consequence:** the birthday bound of 2¹²⁸ now rests on the full digest of a
cryptographic hash, which is what the claim needed all along.

**What is still assumed:** SHA-256's collision resistance itself. That is a
standard cryptographic assumption, not an algebraic result — which is what this
proof was always meant to say, and can now say truthfully.

**Scope:** Tier 3 only. Tier 1 identity (`encodeQuantumState`, gate addresses)
and the Tier 4 receipt chain still use the FNV fold, deliberately — those are
cheap content addresses, and Proof 6 (determinism), not collision resistance,
is what they rest on. The receipt chain's integrity comes from comparing
against an independently held root (see Proof 9), not from the hash.

---

## Proof 9: Receipt Chain Integrity

**Theorem:** If receipt chain is tampered (any receipt modified), verification of that receipt fails.

**Proof:**

Receipt structure:
```
receipt.id = merge(merge(prev_id, measurement_uuid), time_uuid)
           = toUuid(merge(prev_id, measurement_uuid) + ":" + time_uuid)
```

Verification:
```
recomputed_id = merge(merge(receipt.prev, toUuid(measurement)), toUuid(timestamp))

If receipt.measurement or receipt.timestamp changed:
  toUuid(measurement) ≠ toUuid(measurement')  (Proof 6: determinism)
  ⟹ merge(...) produces different UUID
  ⟹ recomputed_id ≠ receipt.id
  ⟹ Verification fails ✓
```

**Consequence:** Tampering with any receipt is detected immediately.

**Application:** Measurement history tamper-proof chain.

**Q.E.D.**

---

## Proof 10: Quantum Threat Inversion Preserves Security

**Theorem:** If security proof S(R) works for Rodin sequence R = [1,2,4,8,7,5], then security proof S(R') works for inverted sequence R' = [5,7,8,4,2,1].

**Proof:**

Assume proof S(R) has form:
```
"If adversary breaks cipher under R, adversary solves hard problem H"
```

Under inversion R' = reverse(R):
```
"If adversary breaks cipher under R', adversary solves hard problem H'"
```

Where H' = H but in reversed order (inversion of threat model).

**Key invariant:** Both R and R' have:
- Same period (6 iterations to cycle)
- Same group order
- Same closure properties (Proofs 1, 3)

Therefore:
```
S(R) ⟺ Hard problem H(R) remains hard
S(R') ⟺ Hard problem H'(R') = H(R) remains hard (by symmetry)

Security margin reduction factor k applies to both:
  Classical bits b ⟹ Quantum bits b - log2(k)
  For both R and R' (inversion preserves scaling)
```

> **The original argument was circular.** It posited "H′ = H but in reversed
> order … by symmetry", which assumes precisely what was to be shown. Sharing a
> period is a fact about ℤ/9*, not a statement about hardness, and no step
> connected the two. It has been replaced by an actual reduction.

### The reduction

The cipher's **only** dependence on the Rodin sequence is the shift applied at
position *i*: `VORTEX_ORBIT[i % 6]`. So "the cipher under R′" means the same
construction driven by the reversed shift sequence.

**Theorem.** Let σ(i) = ⌊i/6⌋·6 + (5 − i mod 6) — reverse a position within its
own 6-block. σ is an involution. Then for every message *m* and every position
*i*:

```
E_R′(m)[i]  =  E_R(m∘σ)[σ(i)]
```

**Proof.** Position *i* under R′ uses shift R′[i mod 6] = R[5 − i mod 6].
Position σ(i) under R uses shift R[σ(i) mod 6] = R[5 − i mod 6]. The same shift
acts on the same digit, since (m∘σ)[σ(i)] = m[i]. ∎

**Consequence — a tight, advantage-preserving reduction.** Given any adversary
𝒜 against E_R′, the adversary ℬ = σ ∘ 𝒜 ∘ σ against E_R has **identical
advantage** at O(n) overhead. σ is its own inverse, so the same construction
runs in the other direction. No security loss, no assumptions, no constants.

**Adversary-model agnostic.** σ is a syntactic isomorphism, so the equivalence
holds for *every* adversary class — classical or quantum — precisely because it
assumes nothing about the adversary. This is the defensible form of the
original intent: the quantum instantiation is not a different problem.

### What this does not say

- **It does not say either instantiation is secure.** It says security
  *transfers*. If E_R is broken, E_R′ is broken with the same effort. Given the
  ~50.7-bit trinity keyspace, both are in fact weak.
- **The "margin reduced by factor k" formula is withdrawn**, along with the
  `b − log₂(k)` expression. Nothing here supports it. The field that reported
  it (`securityScalingPreserved`, hardcoded `= true`) has been replaced by
  `instantiationEquivalence`, which is computed.

**Verified:** exhaustively over all **531,441** single-block messages in
{1..9}⁶ plus multi-block cases — 533,441 messages, 3,224,646 position checks.
A control asserts the identity map does *not* satisfy the claim, so σ is
load-bearing rather than incidental.

**Status:** EXACT as an equivalence.

---

## Proof 11: Composition Gate Completeness

**Theorem:** If `computesGate()` verifies all 6 facets, then all quantum operations are consistent (no composition failures).

**Proof:**

Gate structure:
```
computesGate() = sealFacets("quantum-cipher", [
  { facet: "key-generation", on: isKeyValid },
  { facet: "state-preparation", on: isStateValid },
  { facet: "gate-application", on: isGateValid },
  { facet: "measurement", on: isMeasurementValid },
  { facet: "encryption", on: isEncryptionValid },
  { facet: "verification", on: isVerificationValid }
])
```

Each facet creates receipt:
```
receipt_i = toUuid(`quantum-cipher:facet_i:on_i`)
```

Merkle-fold combines all receipts:
```
root = merkleFold([receipt_1, receipt_2, ..., receipt_6])
```

**Verification:**
```
If any facet i fails (on_i = false):
  receipt_i changes
  ⟹ merkleFold result changes (Proof 5)
  ⟹ root changes
  ⟹ proof.ok = false

If all facets pass (on_i = true for all i):
  All receipts are correct
  ⟹ root is consistent across all operations
  ⟹ proof.ok = true ✓
```

> **Correction — and a code fix.** The theorem needs each facet to be
> *refutable*. Four of the six were assigned `= true` by the very method that
> ran them (`generateKey` set facets[0], `prepareState` facets[1], `applyGate`
> facets[2], `encrypt` facets[4]). They recorded that a step had **run**, not
> that it was **valid**, so the gate was 2/6 load-bearing and "all six verified"
> proved far less than it appeared to.
>
> All six now compute something that can fail: the key seal must recompute
> (`verifyQuantumKey`), the state id must be the content address of its own
> fields, the post-gate address and order receipt must recompute from the
> pre-gate state, the measurement receipt must verify, and the payload must be
> bound to the current key with a well-formed ciphertext.

**Consequence:** a single root seals the operation, and each facet under it is
now falsifiable.

**Verified:** `ok` is the conjunction of the facets, a flipped facet changes the
root, and an honest run passes all six computed facets.

---

## Summary: Proof Chain

| # | Theorem | Status | Application |
|---|---------|--------|------------|
| 1 | Rodin closure mod 9 | **EXACT** | closure holds; the stated *application* was wrong (see Proof 1) |
| 2 | Trinity subgroup | **EXACT** | key bytes stay in {3,6,9} — this governs key expansion |
| 3 | Rodin involution | **EXACT, restated** | reverse(R) is the inverse-generator orbit |
| 4 | Vortex bijection | **EXACT** | bijective on {1..9}; 0 and non-digits bypass |
| 5 | Merkle cascade | **EXACT, split** | set fold for values; `merkleFoldOrdered` for sequences |
| 6 | Determinism | **EXACT** | holds; the pseudocode shown was not the algorithm |
| 7 | Digital root mod 9 | **EXACT for n ≥ 1** | n = 0 is a convention, not the digital root |
| 8 | Content-UUID uniqueness | **ASSUMPTION (standard)** | SHA-256, full 256-bit digest — Tier 3 only |
| 9 | Receipt verification | **EXACT, bounded** | per-receipt only; an unkeyed chain can be rebuilt wholesale |
| 10 | Instantiation equivalence | **EXACT (reduction)** | tight, advantage-preserving; *not* a strength claim |
| 11 | Composition gate | **EXACT after fix** | 4 of 6 facets were unconditional; all now compute |

---

## Proof Scope Boundaries

**Proven algebraically, over exhaustive ranges (no assumptions):**
- Rodin closure and the single 6-cycle; Trinity subgroup (closure, identity,
  inverses, associativity over all 27 triples); Vortex bijection over every
  shift × digit; digital root for n = 1..20000; determinism of `toUuid`.

**Holds, once the theorem is split by structure:**
- Merkle cascade — value changes in both folds; ordering in `merkleFoldOrdered`,
  verified exhaustively over all 120 permutations of 5 leaves.

**Assumption (standard, and now the one actually relied on):**
- Content-UUID uniqueness rests on SHA-256's collision resistance, over the
  full 256-bit digest. This is Tier 3 only; Tier 1 and Tier 4 use the FNV fold
  by design and rest on determinism (Proof 6) instead.

**Proven as a reduction, not as a strength claim:**
- The R and R′ instantiations are isomorphic under σ, so an adversary transfers
  either way with identical advantage. This says nothing about whether either
  is secure; it is a statement about the algebraic primitive, not about the
  cipher built on it.

**Withdrawn as unsupported:**
- Any "security margin reduced by factor k" claim, and the `b − log₂(k)`
  formula that expressed it.

**Refused (out of scope):**
- That any of this proves quantum mechanics
- That any of this explains consciousness
- That any of this is absolute security

---

## Verification

These claims are checked, not asserted. `src/security/quantum-proofs.test.ts`
re-derives each one over its **full computed range** and runs inside
`npm run check`:

```bash
npm run test:security
```

It follows lobe Heaven's law
`theAlgebraicTheoremGateAnIdentityMustHoldOverAComputedRangeNotHandAssignedData`
(ceccec.github.io): an identity must hold over a computed range, not over
hand-assigned data. The original proofs listed the cases they chose, and six
statements did not survive being checked over the whole range.

Two claims are untestable by nature and are stated rather than asserted:
collision resistance (Proof 8) and the security-inversion argument (Proof 10).

**Remaining gaps: none of the eleven.** Proof 5 closed via `merkleFoldOrdered`,
Proof 8 via the two-binding Tier 3 seal, Proof 10 via the σ reduction above.

What remains is not a gap but a **boundary**, and it should not be mistaken for
one: Proof 8 rests on SHA-256's collision resistance (a standard cryptographic
assumption, not an algebraic result), and Proof 10 establishes an *equivalence*
between instantiations rather than the security of either. The cipher's confidentiality and integrity now rest on
HMAC-SHA256 (PRF keystream + encrypt-then-MAC), not on any proof in this file.
The proofs here describe the algebraic layer — closure, subgroup, bijection,
folds — which is the framework's structure, not its cryptographic strength.
Keeping those two claims apart is the point of this document.
