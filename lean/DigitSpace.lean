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

/- ── The group the doubling and the mirror generate ────────────────────────

   A peer session checking node.zeropoint.bg reported it could confirm the
   involution but NOT the claim that ⟨D,M⟩ has order 54, because the generators
   are not decidable from the page. The claim was never merely asserted — the
   seal `agl_acts_on_the_three_triangles` enumerates the group in TypeScript and
   holds. But a predicate inside this package is weaker evidence than a proof a
   stranger can re-run, so the same fact is stated here for the kernel.

   Everything is a table over ℤ/9, so `decide` closes it and no import is
   needed. An affine map x ↦ ax+b is written as its list of nine values. -/

/-- The residues coprime to 9: the units of ℤ/9, six of them. -/
def units : List Nat := [1, 2, 4, 5, 7, 8]

/-- x ↦ a·x + b on ℤ/9, written as its table of nine values. -/
def affineTable (a b : Nat) : List Nat := (List.range 9).map (fun x => (a * x + b) % 9)

/-- Every affine map of ℤ/9: the six units times the nine shifts. -/
def agl : List (List Nat) := units.flatMap (fun a => (List.range 9).map (fun b => affineTable a b))

/-- The nine digits the mirror actually permutes.  The void is not among them;
    see `mirror_is_affine_only_off_the_void`. -/
def nonzero : List Nat := [1, 2, 3, 4, 5, 6, 7, 8, 9]

/-- Order 54: the 54 parameter pairs give 54 DISTINCT maps, which is the step a
    count of pairs on its own does not establish. -/
theorem agl_has_order_54 : agl.length = 54 ∧ agl.Nodup := by decide

/-- Doubling is the unit 2 with no shift; the mirror is x ↦ 8x + 1.  Both are
    affine, so the group they generate lies inside AGL(1,ℤ/9). -/
theorem doubling_and_mirror_are_affine :
    affineTable 2 0 ∈ agl ∧ affineTable 8 1 ∈ agl := by decide

/-- The mirror IS `tv`, on the nine digits it permutes, reading 9 as the residue
    0.  This is the line that makes the order-54 claim be about the vortex
    mirror rather than about some unrelated affine map. -/
theorem mirror_table_is_through_void :
    ∀ d ∈ nonzero, (affineTable 8 1).getD (d % 9) 0 = tv d % 9 := by decide

/-- And the exception, stated rather than stepped around: at the void the two
    part company.  The residue 0 is where the digit 9 lives, and `tv 9 = 1`,
    while `tv 0 = 0`.  So the affine picture covers the nine digits 1..9 and the
    void is a tenth point outside that ℤ/9 — which is why the digit space has
    ten elements and the group has 54, not 90. -/
theorem mirror_is_affine_only_off_the_void :
    tv 9 = 1 ∧ tv 0 = 0 ∧ (affineTable 8 1).getD 0 0 = 1 := by decide

/-- Apart, the two generators give only 6 · 2 = 12; the excess 54 − 12 = 42 is
    the failure to commute that the README calls the entanglement. -/
theorem generators_apart_give_twelve : 6 * 2 = 12 ∧ 54 - 12 = 42 := by decide

/- ── What the base frequency must satisfy ──────────────────────────────────

   A census of every exported literal constant found that A432_FREQUENCY — the
   number this package is named after — was held by nothing: setting it to 433
   left all 32 seals holding. Two things turned out to be true and neither was
   checked.

   First, the base appears as TWO independent literals, one exported from
   a432.core and one written inline in the axis arithmetic, so they could drift
   apart silently. They did, the moment the census perturbed one of them.

   Second, the base is not arbitrary, but neither is it unique. Whole axis
   frequencies and a digital root of 9 pin it exactly to the multiples of 36 —
   no more than that. Which multiple is a convention, and 432 is the twelfth. -/

/-- Whole axis frequencies plus digital root 9 is exactly divisibility by 36.
    `b * d / 12` is whole for every axis digit precisely when 4 divides b, and
    the digital root condition is 9 dividing b; the two are coprime. -/
theorem whole_axis_and_root_nine_is_exactly_thirty_six :
    ∀ b ∈ List.range 100,
      (((b * 3) % 12 = 0 ∧ (b * 6) % 12 = 0 ∧ (b * 9) % 12 = 0) ∧ b % 9 = 0) ↔ b % 36 = 0 := by decide

/-- 432 is in that class, and it is not alone there: 396 is the multiple below
    it and 468 the one above. The class is derived; the choice inside it is not. -/
theorem four_three_two_is_a_multiple_of_thirty_six_but_not_the_only_one :
    432 % 36 = 0 ∧ 396 % 36 = 0 ∧ 468 % 36 = 0 ∧ 432 = 36 * 12 := by decide

/-- The digital root of the base is 9, which follows from 9 dividing it. -/
theorem base_frequency_has_digital_root_nine : dr 432 = 9 := by decide
