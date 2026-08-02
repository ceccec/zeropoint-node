# Phase 2: Quantum State Tomography — As Built

**Status:** implemented and gated in `npm run check`.

**Goal:** verify a quantum state's properties from measurement statistics, and
detect an adversary who substituted a different state.

This document describes what exists in
[`src/security/quantum-state-tomography.ts`](../src/security/quantum-state-tomography.ts).
An earlier revision was a forward-looking specification; where the two differ,
the code is authoritative and this file has been updated to match it.

---

## What it does

Measure copies of a state in the Z, X and Y bases, invert those statistics to
recover the density matrix, and compare against what the preparation claims.

```typescript
const tomo = new QuantumStateTomography()
const result = tomo.performTomography(state, 1000)

result.fidelity   // ⟨ψ|ρ|ψ⟩ against the expected state
result.purity     // Tr(ρ²)
result.entropy    // von Neumann entropy, in bits
result.proof      // merkle root over every measurement receipt
```

---

## Reconstruction

Reconstruction is **linear inversion on the Bloch vector**, not an averaging of
projectors. For each basis k the expectation is `r_k = P(k=0) − P(k=1)`, and

```
ρ = ½ (I + r·σ) = ½ [[1 + r_z,  r_x − i·r_y],
                     [r_x + i·r_y,  1 − r_z]]
```

Two properties follow by construction rather than by luck, and both are tested
as exact equalities rather than tolerances:

- `trace(ρ) = 1` exactly — the two diagonal entries are `(1±r_z)/2`.
- `ρ` is Hermitian exactly — the off-diagonals are written as a conjugate pair.
- `ρ₀₀` equals the empirical `P(Z=0)` exactly.

Derived quantities are the closed forms for a qubit:

| Quantity | Formula | Range |
|---|---|---|
| Fidelity | `(1 + r·n)/2`, `n` = expected Bloch vector | `[0, 1]` |
| Purity | `(1 + \|r\|²)/2` | `[1/2, 1]` |
| Entropy | `−λ₊log₂λ₊ − λ₋log₂λ₋`, `λ± = (1±\|r\|)/2` | `[0, 1]` bits |

---

## Fold integration

**Tier 4 — chain verification.** Every shot is recorded through the cipher's
`recordMeasurement`, so a run of N shots produces 3N linked receipts. Each
receipt recomputes from its predecessor, and `verifyReceiptChain()` checks both
the links and the merkle root. Reordering any two receipts is detected.

**Tier 5 — composition.** `computesGateWithTomography(cipher)` adds a seventh
facet, `state-tomography`, to the cipher's six and seals all seven under one
root. The facet is on only when measured fidelity clears the gate *and* the
receipt chain verifies.

The dependency runs one way — the tomography module imports the cipher, never
the reverse — so composing here adds no import cycle. `computesGate(extraFacets)`
is the seam that makes that possible.

Two failure modes are tested explicitly, because both would otherwise pass
quietly: a cipher with no prepared state emits the facet **present and off**
rather than omitting it (an absent facet would leave a clean-looking six-facet
root), and an unreachable fidelity threshold turns the root off even though the
run itself succeeded.

---

## Adversary detection

`detectStateSubstitution(states, fraction)` tomographs a sample and flags any
fidelity below the gate. Selection is derived from the merkle root of the state
list, so sampling is reproducible and carries no ambient entropy.

Measured behaviour, from the test suite:

| Scenario | Fidelity | Outcome |
|---|---|---|
| State matches its claim | ≥ 0.95 | accepted |
| Orthogonal substitution (`Z\|0⟩` sent as `Z\|1⟩`) | 0.000 | detected |
| Mutually unbiased substitution (`Z\|0⟩` sent as `X\|0⟩`) | 0.469 | detected |

The middle row is the meaningful one: an orthogonal swap is the easiest case,
and the unbiased swap sitting at ≈ ½ is what the algebra predicts.

---

## Honesty ledger

**Exact** — the reconstruction algebra and all three derived quantities are
closed-form 2×2 linear algebra, verified as exact equalities in the tests.

**Faithful** — the measurement model is simulated: a measurement in the
preparation basis returns the prepared value with certainty, and a mutually
unbiased basis returns a deterministic pseudo-uniform bit derived by folding
`(state, basis, shot)`. This mirrors ideal qubit statistics. It uses no ambient
entropy, so runs are reproducible.

**Refused** — no claim is made about physical quantum hardware. Nothing here
measures a real qubit, models decoherence, or accounts for detector noise.
The adversary detection numbers describe this simulation, not a deployed
channel.

---

## Tests

`src/security/quantum-state-tomography.test.ts` — 40 checks, non-zero exit on
failure, run by `npm run test:security` inside `npm run check`.

Coverage: reconstruction invariants (trace, Hermiticity, determinism),
fidelity across all preparations and both substitution classes, purity and
entropy bounds and their mutual consistency, receipt-chain continuity and
tamper detection, the verification gate in both directions, compositional
integration including its two silent-failure modes, and statistics
preservation.

---

## Not yet done

- Multi-qubit tomography — everything here is single-qubit.
- A real measurement backend. The simulation seam is `measureShot()`.
- Confidence intervals on fidelity. Detection currently reports the sampled
  fraction as `confidenceLevel`, which is a coverage figure, not a statistical
  confidence bound. Treating it as the latter would overstate what was shown.
