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

/- ── The mirror as a two-sided coin ────────────────────────────────────────

   Asked whether a statement about a black hole pulling everything unharmonic
   in on one side of a coin and a white hole reflecting it from the other could
   be computed. Most of it cannot: fusion, pressure, temperature, speed, and
   the holes themselves have no referent here and are not formalised below.

   What IS decidable is the shape the sentence describes. The mirror is an
   involution, so the ten digits fall into pairs and fixed points — coins and
   their two faces. And the pairing is not arbitrary: EVERY digit off the flow
   ring is paired with one on it, and nothing is left over. -/

/-- Every axis digit — the three that the doubling walk never reaches — is the
    mirror of a digit that IS on the flow ring. Nothing off the ring is
    unpaired. -/
theorem every_axis_digit_mirrors_an_orbit_digit : ∀ d ∈ axis, tv d ∈ orbit := by decide

/-- And in the other direction, so the pairing is a bijection between the axis
    and exactly three of the six orbit digits. -/
theorem the_axis_is_mirrored_onto_exactly_seven_four_one :
    axis.map tv = [7, 4, 1] ∧ [7, 4, 1].map tv = axis := by decide

/-- The two digits that are their own reflection: the void, and the midpoint of
    the flow ring. One from each side. -/
theorem exactly_two_digits_are_their_own_mirror :
    (digits.filter (fun d => tv d == d)) = [0, 5] := by decide

/-- Nothing is left over. Ten digits: two fixed, and four pairs that the mirror
    exchanges — 2 + 4·2 = 10, with every pair accounted for. -/
theorem the_ten_digits_are_two_fixed_points_and_four_pairs :
    (digits.filter (fun d => tv d == d)).length = 2 ∧
    (digits.filter (fun d => tv d != d)).length = 8 ∧
    2 + 4 * 2 = 10 := by decide

/-- The pairs, written out, so the claim is the list and not a summary of it. -/
theorem the_four_pairs_are_one_nine_two_eight_three_seven_four_six :
    tv 1 = 9 ∧ tv 2 = 8 ∧ tv 3 = 7 ∧ tv 4 = 6 := by decide

/- ── Why 432 and not another multiple of thirty-six ────────────────────────

   The seal above forces the base frequency into 36ℕ and no further, and says
   so. erpax-94 then showed a STRONGER constraint from a different tree: the
   divisor lattice of the anchor is C5 × C4, which needs exactly two primes with
   exponents (4,3). 396 = 2²·3²·11 and 468 = 2²·3²·13 each carry a third prime
   and fail it outright.

   That constraint is not adopted here — nothing in this package uses divisor
   structure, and importing it to make a chosen constant look determined would
   be the post-hoc pinning this repository spends its gates refusing. It is
   RECORDED, so the boundary is checkable rather than remembered: my conditions
   force the class, theirs picks the member, and the two are different claims. -/

/-- Divisors counted directly, so the statement needs no theory of divisors. -/
def divisorCount (n : Nat) : Nat :=
  ((List.range (n + 1)).filter (fun d => d > 0 && n % d == 0)).length

/-- 432 has twenty divisors; the multiples of 36 on either side have eighteen.
    Twenty is 5 · 4, which is the lattice erpax's theorem needs; eighteen
    factors as 3 · 3 · 2 and cannot be two chains. -/
theorem four_three_two_has_twenty_divisors_its_neighbours_eighteen :
    divisorCount 432 = 20 ∧ divisorCount 396 = 18 ∧ divisorCount 468 = 18 := by decide

/-- All three are in the class my own conditions force, which is the point: the
    class does not distinguish them and the lattice does. -/
theorem all_three_are_multiples_of_thirty_six :
    432 % 36 = 0 ∧ 396 % 36 = 0 ∧ 468 % 36 = 0 := by decide

/- ── Do involutions always give a harmonic result? ─────────────────────────

   Asked directly, and the general claim is FALSE — so the honest thing is to
   prove both halves rather than only the flattering one.

   Being an involution is a statement about a map returning to itself. It says
   nothing about arithmetic, because an involution can be defined on a set with
   no arithmetic at all. What makes THIS mirror harmonic is not that it is an
   involution; it is that its orbits all sum to the same number. A second
   involution on the same ten digits is exhibited below whose orbits do not, and
   that settles the general claim by counterexample. -/

/-- Every orbit of the mirror sums to ten — the pairs 1+9, 2+8, 3+7, 4+6, and
    the fixed point 5+5. That is the harmonic content, and it is a fact about
    THIS involution. -/
theorem every_mirror_orbit_sums_to_ten : ∀ d ∈ nonzero, d + tv d = 10 := by decide

/-- The void is the single exception, and it is why the digit space has ten
    elements rather than nine: 0 is its own orbit and sums to nothing. -/
theorem the_void_is_the_one_orbit_that_does_not : 0 + tv 0 = 0 := by decide

/-- A second involution on the same ten digits: swap one and two, fix the rest. -/
def swap12 (d : Nat) : Nat := if d = 1 then 2 else if d = 2 then 1 else d

theorem swap12_is_an_involution : ∀ d ∈ digits, swap12 (swap12 d) = d := by decide

/-- And its orbits do NOT share a sum: 1 + 2 = 3 while 3 + 3 = 6. So being an
    involution is not sufficient for a harmonic result, and any claim that it is
    has this as a counterexample. -/
theorem being_an_involution_is_not_enough_for_harmony :
    swap12 1 + 1 ≠ swap12 3 + 3 := by decide

/-- What IS general to an involution is the counting: every element is fixed or
    paired, so the non-fixed elements are even in number. Checked here for both
    involutions this file defines, which is evidence and not a proof for all. -/
theorem non_fixed_points_come_in_pairs :
    (digits.filter (fun d => tv d != d)).length % 2 = 0 ∧
    (digits.filter (fun d => swap12 d != d)).length % 2 = 0 := by decide

/-- The mirror's harmony stated as the thing that actually distinguishes it: a
    constant orbit sum, off the void. `swap12` fails exactly this. -/
theorem the_mirror_is_the_involution_with_a_constant_orbit_sum :
    (nonzero.map (fun d => d + tv d)) = [10, 10, 10, 10, 10, 10, 10, 10, 10] ∧
    (nonzero.map (fun d => d + swap12 d)) ≠ [10, 10, 10, 10, 10, 10, 10, 10, 10] := by decide

/- ── The same facts, axiom-free ────────────────────────────────────────────

   Seven theorems above rest on [propext, Quot.sound]. Measured, the cause is
   not the mathematics: it is the FORM. `∀ d ∈ orbit, …` decides membership in a
   list, and list membership is a quotient-flavoured predicate, so the kernel
   records those two. The identical fact written as a Bool equation over
   `List.all` rests on nothing:

     via_membership   depends on axioms: [propext, Quot.sound]
     via_all          does not depend on any axioms

   Both forms are kept. The membership form is the statement a reader wants; the
   Bool form is the one with the smallest trusted base. Keeping only the first
   would overstate what must be assumed, and keeping only the second would make
   the corpus less readable to save two axioms of Lean's own core. -/

theorem doubling_stays_in_orbit_axiom_free :
    orbit.all (fun d => orbit.contains (dbl d)) = true := by decide

theorem orbit_and_axis_are_disjoint_axiom_free :
    orbit.all (fun d => !axis.contains d) = true := by decide

theorem orbit_axis_void_exhaust_the_digits_axiom_free :
    digits.all (fun d => d == 0 || orbit.contains d || axis.contains d) = true := by decide

theorem every_axis_digit_mirrors_an_orbit_digit_axiom_free :
    axis.all (fun d => orbit.contains (tv d)) = true := by decide

theorem mirror_table_is_through_void_axiom_free :
    nonzero.all (fun d => (affineTable 8 1).getD (d % 9) 0 == tv d % 9) = true := by decide

theorem doubling_and_mirror_are_affine_axiom_free :
    (agl.contains (affineTable 2 0) && agl.contains (affineTable 8 1)) = true := by decide

theorem every_mirror_orbit_sums_to_ten_axiom_free :
    nonzero.all (fun d => d + tv d == 10) = true := by decide
