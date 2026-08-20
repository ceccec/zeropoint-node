/**
 * Free energy of the water reaction — Gibbs, exactly.
 *
 * "Free energy" is not a loose phrase. It is ΔG, the portion of a reaction's
 * enthalpy change that can be taken out as work at constant temperature and
 * pressure, with TΔS the part that cannot because it is owed to entropy:
 *
 *     ΔG = ΔH − TΔS
 *
 * Its sign is the whole answer to whether a process can be run for gain. A
 * reaction with ΔG < 0 releases work and runs on its own; one with ΔG > 0 must
 * be paid for. For splitting water, ΔG is POSITIVE, and the size of it is the
 * bill: 237.14 kJ per mole, or 1.229 V across an electrolysis cell. Nothing in
 * this module is an opinion about that — every figure recomputes from three
 * tabulated standard quantities.
 *
 * ARITHMETIC. All values are exact integers in units of 10⁻⁵ J/mol, so nothing
 * here is a float literal and no rounding happens until a value is rendered.
 * The constants are standard-state (298.15 K, 1 bar) CODATA/NIST values.
 *
 * WHAT THIS SETTLES. The forward and reverse reactions share one bond ledger,
 * so what splitting costs is exactly what burning returns — at best. Real
 * devices take a cut at every step, which `roundTrip` reports. There is no
 * arrangement of the two that yields more out than in, and that is not an
 * engineering limit to be improved on: it is the sign of ΔG.
 */

// ============================================================================
// SCALE — exact integer arithmetic, no float literals
// ============================================================================

/** Every energy below is an integer count of 10⁻⁵ J/mol. */
export const SCALE = 100000

/** Render a scaled energy as kJ/mol, rounding once, at the boundary. */
export function toKilojoulesPerMole(scaled: number): number {
  return round(scaled, SCALE * 1000)
}

/** Round a/b to the nearest integer without Math.*, ties away from zero. */
function round(a: number, b: number): number {
  const neg = a < 0
  const x = neg ? -a : a
  const q = (2 * x + b) / (2 * b)
  const f = q - (q % 1)
  return neg ? -f : f
}

// ============================================================================
// STANDARD STATE (298.15 K, 1 bar) — CODATA / NIST
// ============================================================================

/** 298.15 K, held as hundredths of a kelvin. */
const T_CENTIKELVIN = 29815

/**
 * ΔH° of formation for liquid water, −285.83 kJ/mol.
 * H₂(g) + ½O₂(g) → H₂O(l)
 */
export const ENTHALPY_FORMATION = -285830 * SCALE

/**
 * ΔS° of that formation, −163.305 J/(mol·K), from the absolute entropies
 * S°(H₂O,l) 69.95, S°(H₂) 130.68, S°(O₂) 205.15 J/(mol·K):
 *   69.95 − 130.68 − 205.15/2 = −163.305
 * Held as thousandths of a J/(mol·K).
 */
const ENTROPY_FORMATION_MILLI = -163305

/** Faraday constant, C/mol. */
export const FARADAY = 96485

/** Electrons transferred per water molecule. */
export const ELECTRONS = 2

// ============================================================================
// THE FREE ENERGY
// ============================================================================

/**
 * TΔS for the formation, in units of 10⁻⁵ J/mol.
 *
 * (T_CENTIKELVIN/100) × (ENTROPY_FORMATION_MILLI/1000) J/mol, and the two
 * denominators multiply to exactly SCALE, so the product is already an integer
 * in our units — no rounding enters here.
 */
export const ENTROPY_TERM_FORMATION = T_CENTIKELVIN * ENTROPY_FORMATION_MILLI

/** ΔG° of formation: ΔH − TΔS. Negative — water forms and releases work. */
export const GIBBS_FORMATION = ENTHALPY_FORMATION - ENTROPY_TERM_FORMATION

/** Splitting is the reverse reaction, so every quantity changes sign. */
export const ENTHALPY_SPLITTING = -ENTHALPY_FORMATION
export const GIBBS_SPLITTING = -GIBBS_FORMATION

// ============================================================================
// CELL POTENTIALS — the same numbers, in volts
// ============================================================================

/** An exact rational, so no precision is lost before it is rendered. */
export interface ExactPotential {
  /** Microvolts, as numerator/denominator. */
  readonly numerator: number
  readonly denominator: number
}

/**
 * Reversible cell potential E° = ΔG/(nF) as an EXACT fraction of a microvolt.
 *
 * The rounded form below cannot be inverted exactly — quantising to whole
 * microvolts throws away what the inverse would need. Returning the fraction
 * keeps ΔG recoverable with no drift at all, which is what lets
 * `every_model_inverts` demand equality rather than a tolerance.
 */
export function reversiblePotentialExact(): ExactPotential {
  return { numerator: GIBBS_SPLITTING * 10, denominator: ELECTRONS * FARADAY }
}

/** Thermoneutral potential ΔH/(nF), likewise exact. */
export function thermoneutralPotentialExact(): ExactPotential {
  return { numerator: ENTHALPY_SPLITTING * 10, denominator: ELECTRONS * FARADAY }
}

/**
 * Recover the energy an exact potential came from, in 10⁻⁵ J/mol.
 *
 * E is `numerator/denominator` microvolts and energy = E·nF/10, where the
 * denominator IS nF — so it cancels. The cancellation is done here rather than
 * by multiplying it out: `numerator × denominator` is about 4.6e16, past the
 * 2^53 where doubles stop counting exactly, and multiplying it out reintroduced
 * the very drift these exact potentials exist to remove.
 */
export function energyFromPotential(p: ExactPotential): number {
  if (p.denominator !== ELECTRONS * FARADAY) {
    throw new RangeError(`potential denominator must be nF = ${ELECTRONS * FARADAY}, got ${p.denominator}`)
  }
  return p.numerator / 10
}

/**
 * Reversible cell potential, E° = ΔG/(nF), in whole microvolts.
 *
 * The least voltage that can split water at all. Below it the reaction does not
 * run, however the cell is built. Rounded for display; use
 * `reversiblePotentialExact` when the value will be computed with further.
 */
export function reversiblePotentialMicrovolts(): number {
  const { numerator, denominator } = reversiblePotentialExact()
  return round(numerator, denominator)
}

/**
 * Thermoneutral potential, ΔH/(nF), in microvolts.
 *
 * At this voltage the cell neither warms nor cools: the entropy term is being
 * supplied electrically instead of drawn from the surroundings. It is strictly
 * above the reversible potential, and the gap is TΔS.
 */
export function thermoneutralPotentialMicrovolts(): number {
  const { numerator, denominator } = thermoneutralPotentialExact()
  return round(numerator, denominator)
}

// ============================================================================
// THE CYCLE
// ============================================================================

export interface RoundTrip {
  /** Energy that must be supplied to split, 10⁻⁵ J/mol. */
  readonly inputRequired: number
  /** Energy recoverable by burning the hydrogen back, 10⁻⁵ J/mol. */
  readonly outputRecovered: number
  /** outputRecovered − inputRequired. Never positive. */
  readonly net: number
  /** Efficiency as a percentage, rounded once. */
  readonly percent: number
  /** True only if the cycle returns more than it took. */
  readonly gainsEnergy: boolean
}

/**
 * A split-then-burn cycle, at whatever efficiencies you give it.
 *
 * Each efficiency is a percentage, 0..100, as an integer. Passing 100 for all
 * three describes the thermodynamic ideal — the case most favourable to a
 * closed loop, and the one that matters, because if it fails there it fails
 * everywhere.
 */
export function roundTrip(
  electrolysisPercent: number,
  enginePercent: number,
  generatorPercent: number,
): RoundTrip {
  for (const p of [electrolysisPercent, enginePercent, generatorPercent]) {
    if (!Number.isInteger(p) || p < 0 || p > 100) {
      throw new RangeError(`efficiency must be an integer percentage in 0..100, got ${p}`)
    }
  }

  // Splitting must supply the full enthalpy, not merely ΔG: a real cell run at
  // the reversible potential draws the entropy term from its surroundings and
  // goes cold, which no engine cycle recovers.
  const inputRequired = electrolysisPercent === 0
    ? Number.POSITIVE_INFINITY
    : round(ENTHALPY_SPLITTING * 100, electrolysisPercent)

  // Burning returns the same enthalpy — the identical bond ledger, reversed —
  // and then the engine and generator each take their cut.
  const outputRecovered = round(
    round(ENTHALPY_FORMATION * -1 * enginePercent, 100) * generatorPercent,
    100,
  )

  const net = outputRecovered - inputRequired
  const percent = inputRequired === Number.POSITIVE_INFINITY
    ? 0
    : round(outputRecovered * 100, inputRequired)

  return { inputRequired, outputRecovered, net, percent, gainsEnergy: net > 0 }
}

// ============================================================================
// SELF-CHECK
// ============================================================================

/** Facts this module must satisfy. Returns failures. */
export function selfTest(): string[] {
  const fail: string[] = []

  // ΔG = ΔH − TΔS must reproduce the tabulated ΔG°f of −237.14 kJ/mol.
  const kj = toKilojoulesPerMole(GIBBS_FORMATION)
  if (kj !== -237) fail.push(`ΔG°f rounds to ${kj} kJ/mol, expected -237`)

  // Formation releases work; splitting costs it. This is the sign that decides
  // whether a reaction can be run for gain, and it is the whole answer.
  if (!(GIBBS_FORMATION < 0)) fail.push('ΔG of formation is not negative')
  if (!(GIBBS_SPLITTING > 0)) fail.push('ΔG of splitting is not positive')

  // The forward and reverse reactions are one ledger read in two directions.
  if (ENTHALPY_SPLITTING !== -ENTHALPY_FORMATION) fail.push('enthalpy is not antisymmetric')
  if (GIBBS_SPLITTING !== -GIBBS_FORMATION) fail.push('Gibbs is not antisymmetric')

  // Cell potentials, to the millivolt.
  const rev = round(reversiblePotentialMicrovolts(), 1000)
  const thermo = round(thermoneutralPotentialMicrovolts(), 1000)
  if (rev !== 1229) fail.push(`reversible potential ${rev} mV, expected 1229`)
  if (thermo !== 1481) fail.push(`thermoneutral potential ${thermo} mV, expected 1481`)
  if (!(thermo > rev)) fail.push('thermoneutral potential is not above the reversible one')

  // The exact potentials must invert with NO drift — that is their purpose.
  if (energyFromPotential(reversiblePotentialExact()) !== GIBBS_SPLITTING) {
    fail.push('reversible potential does not invert exactly')
  }
  if (energyFromPotential(thermoneutralPotentialExact()) !== ENTHALPY_SPLITTING) {
    fail.push('thermoneutral potential does not invert exactly')
  }

  // The ideal cycle breaks even and never better.
  const ideal = roundTrip(100, 100, 100)
  if (ideal.net !== 0) fail.push(`ideal cycle net ${ideal.net}, expected 0`)
  if (ideal.gainsEnergy) fail.push('ideal cycle reports a gain')

  // Every real cycle loses. Exhaustive over the efficiency grid in 5% steps,
  // excluding only the ideal corner above.
  for (let e = 5; e <= 100; e += 5) {
    for (let m = 5; m <= 100; m += 5) {
      for (let g = 5; g <= 100; g += 5) {
        if (e === 100 && m === 100 && g === 100) continue
        const r = roundTrip(e, m, g)
        if (r.gainsEnergy) {
          fail.push(`cycle at ${e}/${m}/${g}% reports a gain of ${r.net}`)
          return fail
        }
      }
    }
  }

  return fail
}
