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
| 5 | "if any leaf changes, the root changes" | true for values, **false for order** — `merkleFold` sorts |
| 6 | pseudocode shown as plain FNV-1a | the real `hash32` differs, and `toUuid` folds four seeded words |
| 7 | "n mod 9 = 0 ⟹ dr = 9" | omits n = 0, whose true digital root is 0 |
| 8 | "Content-UUID uniqueness (SHA-256)" | the cipher uses the **FNV fold**, not SHA-256 |
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

> **Correction — this holds for VALUES, not for ORDER.** `merkleFold` begins
> with `[...leaves].sort()`. The root is therefore **permutation-invariant**:
> reordering the leaves yields an identical root. What is built is a merkle
> **set**, not a merkle list.
>
> The induction above is also stated for a binary tree; the implementation
> promotes an odd trailing node unchanged (`b === undefined ? a : merge(a,b)`),
> which the proof does not model.

**Consequence:** a change to any leaf VALUE cascades to the root. **No ordering
claim may rest on this root.**

**Application:** receipt-chain verification does not rely on merkle ordering —
it verifies the `prev` links, which is what actually detects a reordering. The
tamper test in `quantum-state-tomography.test.ts` passes because of the link
check, not the root.

**Verified:** value-change detection and permutation-invariance both asserted.

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

## Proof 8: Content-UUID Uniqueness — **the cipher does not use SHA-256**

**Theorem:** For distinct inputs x ≠ y, SHA-256(x) ≠ SHA-256(y) with overwhelming probability (collision resistance).

**Proof:**

By design of SHA-256 (cryptographic hash function):
- Output space: 2^256 possible values
- Given adversary cannot feasibly find collision in time < 2^128 operations (birthday bound)

> **Correction — this proof describes a function the cipher never calls.**
> `QuantumFoldCipher` addresses content with `toUuid()`, the **FNV fold**.
> SHA-256 does exist in this repo (`src/integrity/content-uuid.ts`), but the
> cipher does not use it. Verified: `contentUuid` recomputes exactly from
> `toUuid(...)`.
>
> The stated bound does not transfer. `toUuid` yields 128 bits with 6 pinned
> by the UUID version/variant, so **122 free bits** — a birthday bound near
> 2⁶¹, not 2¹²⁸. And FNV belongs to a hash family designed for speed, not
> collision resistance; no collision-resistance analysis backs it.
>
> **Not claimed:** that collisions are practically findable. A birthday search
> over 2,000,000 seeds found none, which is consistent with the structure. The
> honest position is that the 2²⁵⁶ figure was unsupported — not that the fold
> is broken.

**Consequence:** distinct serializations map to distinct UUIDs in every range
tested, on a 122-bit non-cryptographic digest.

**Status:** ASSUMPTION (weaker than the doc originally stated), not a proof.

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

> **Correction — this is an analogy, not a proof.** The argument posits
> "H′ = H but in reversed order … by symmetry", which assumes precisely what
> is to be shown. Nothing establishes that a security reduction is invariant
> under reversing a generator orbit. That R and R′ share a period is a fact
> about ℤ/9*; it is not a statement about any cipher's hardness, and no step
> connects the two.

**What is verified:** R and R′ have the same period (6) and the same element
set. Nothing beyond that.

**Status:** NOT PROVEN. The summary table previously marked this ALGEBRAIC.

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
| 5 | Merkle cascade | **PARTIAL** | holds for values; **fails for order** (merkleFold sorts) |
| 6 | Determinism | **EXACT** | holds; the pseudocode shown was not the algorithm |
| 7 | Digital root mod 9 | **EXACT for n ≥ 1** | n = 0 is a convention, not the digital root |
| 8 | Content-UUID uniqueness | **ASSUMPTION** | FNV fold, 122 free bits — **not SHA-256** |
| 9 | Receipt verification | **EXACT, bounded** | per-receipt only; an unkeyed chain can be rebuilt wholesale |
| 10 | Quantum inversion security | **NOT PROVEN** | an analogy; only the shared period is verified |
| 11 | Composition gate | **EXACT after fix** | 4 of 6 facets were unconditional; all now compute |

---

## Proof Scope Boundaries

**Proven algebraically, over exhaustive ranges (no assumptions):**
- Rodin closure and the single 6-cycle; Trinity subgroup (closure, identity,
  inverses, associativity over all 27 triples); Vortex bijection over every
  shift × digit; digital root for n = 1..20000; determinism of `toUuid`.

**Holds only in part:**
- Merkle cascade — values yes, ordering no.

**Assumption, and weaker than previously stated:**
- Content-UUID uniqueness rests on a 122-bit **non-cryptographic** fold. The
  earlier "2²⁵⁶ / 2¹²⁸ birthday" figure described SHA-256, which the cipher
  does not call.

**Not proven:**
- That inversion preserves a security margin. Only the shared period and
  element set are verified; the step from those to cipher hardness is absent.

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

**Gaps are recorded above rather than closed.** Proofs 5, 8 and 10 remain
weaker than the cipher's surrounding documentation once implied.
