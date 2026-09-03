/-!
  # The digit space, machine-checked

  Every theorem in this file is closed by `decide`, so Lean's kernel evaluates
  it exhaustively over a finite domain.  There is **no `sorry` here and no
  `import`** — not even mathlib — which is the point: this file checks in under
  half a second with plain `lean`, on any machine, with no cache to fetch.

  That matters because `lean/Quantum.lean` opens with `import Mathlib` and
  contains nineteen sorries under a header claiming all its theorems are
  formally proven.  Statements about ten digits do not need analysis, and
  separating them is what makes them checkable today rather than after a build.

  Written before the 1.6 run was planned, to test the plan's central assumption
  rather than assume it.  While it was being written `decide` refuted three
  statements of the author's: the through-void involution as first stated, and
  `dr n = dr (n + 9)` at n = 0 — where ℕ's truncating subtraction makes `dr 0`
  equal 1, while the TypeScript's digitalRoot(0) is 9 and the paper's equation
  (1) guards itself with n ≥ 1.  Three representations, three values at zero,
  and nobody had written that down.
-/

/-- Digital root as a closed form.  This agrees with the TypeScript
    `digitalRoot` from ONE upward and differs at zero: ℕ subtraction truncates,
    so `0 - 1 = 0` and `dr 0 = 1`, while the TypeScript returns `9`.  That
    difference used to live only in a comment claiming the two were the same
    function.  It is now `drTS` below and a theorem, so the claim is checked
    rather than asserted.
    agrees-with: digitalRoot on 1..60 -/
def dr (n : Nat) : Nat := ((n - 1) % 9) + 1

/-- What `src/0/index.ts` actually computes, zero included. -/
def drTS (n : Nat) : Nat := if n = 0 then 9 else dr n

/-- Doubling inside the digital root: the Rodin step. -/
def dbl (d : Nat) : Nat := dr (2 * d)

/-- The through-void reflection, as src/0/index.ts defines it.
    agrees-with: throughVoid on 0..9 -/
def tv (d : Nat) : Nat := if d = 0 then 0 else dr (10 - d)

/-- agrees-with: VORTEX_ORBIT -/
def orbit : List Nat := [1, 2, 4, 8, 7, 5]

/-- agrees-with: VORTEX_AXIS -/
def axis : List Nat := [3, 6, 9]

def digits : List Nat := [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/-- Where the closed form and the shipped function agree, and the single point
    where they do not.  Stating the exception as a theorem is the whole point:
    a reader who ports `dr` into a new theorem unguarded gets the wrong answer
    at zero, and this is the line that tells them so. -/
theorem dr_is_drTS_above_zero : ∀ n ∈ List.range 60, n ≠ 0 → dr n = drTS n := by decide

theorem dr_and_drTS_differ_at_zero : dr 0 = 1 ∧ drTS 0 = 9 := by decide

theorem dr_idempotent : ∀ n ∈ List.range 60, dr (dr n) = dr n := by decide

/-- Adding nine does not move the digital root — FOR n ≥ 1.  In ℕ subtraction
    truncates, so `dr 0 = 1` and the closed form is only the digital root from
    one upward.  `decide` refused the unguarded statement, which is the guard
    equation (1) of the paper already carries. -/
theorem dr_invariant_under_nine : ∀ n ∈ List.range 50, dr (n + 1) = dr (n + 10) := by decide

theorem doubling_stays_in_orbit : ∀ d ∈ orbit, dbl d ∈ orbit := by decide

theorem orbit_closes_after_six : ∀ d ∈ orbit, dbl (dbl (dbl (dbl (dbl (dbl d))))) = d := by decide

theorem orbit_never_repeats_a_step : ∀ d ∈ orbit, dbl d ≠ d := by decide

theorem through_void_is_an_involution : ∀ d ∈ digits, tv (tv d) = d := by decide

theorem through_void_fixes_only_zero_and_five :
    ∀ d ∈ digits, tv d = d ↔ (d = 0 ∨ d = 5) := by decide

theorem orbit_and_axis_are_disjoint : ∀ d ∈ orbit, d ∉ axis := by decide

theorem orbit_and_axis_and_void_exhaust_the_digits :
    ∀ d ∈ digits, d = 0 ∨ d ∈ orbit ∨ d ∈ axis := by decide
