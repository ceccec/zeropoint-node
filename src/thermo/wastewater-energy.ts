/**
 * Polluted water in, electricity and drinkable water out — the real version.
 *
 * The described machine exists. What makes it work is that the fuel is not the
 * water: it is what is dissolved in it. H₂O carries no recoverable energy —
 * `free-energy.ts` settles that, ΔG for splitting is +237 kJ/mol — but organic
 * contamination does, and a litre of strong effluent can carry more chemical
 * energy than it costs to clean the litre.
 *
 * So the architecture is:
 *
 *   polluted water → anaerobic digestion → biogas (mostly CH₄)
 *                 → combustion engine (CHP) → ELECTRICITY
 *   digester effluent → membrane treatment → DRINKABLE WATER
 *
 * The engine burns methane the bacteria made from the pollutants. Its exhaust
 * is CO₂ and water vapour; the drinkable water comes from the membrane train,
 * powered by part of the electricity. Everything you described happens, and
 * nothing runs on the water itself.
 *
 * THE WHOLE QUESTION IS THE LOAD. Weak sewage does not carry enough energy to
 * pay for its own treatment; strong industrial effluent carries several times
 * over. There is therefore a THRESHOLD contamination, and this module computes
 * it rather than asserting it. Below it the plant imports power; above it the
 * plant exports.
 *
 * Distillation is deliberately not the water step. Evaporating a litre costs
 * about 2.26 MJ in latent heat alone — far more than any realistic load carries
 * — so a still cannot be paid for by the pollution. Membranes can.
 *
 * ARITHMETIC. Integers throughout, in decijoules per litre (dJ/L). No float
 * literals; rounding happens once, where a value is rendered.
 */

// ============================================================================
// CONSTANTS — measured quantities, not choices
// ============================================================================

/**
 * Chemical energy per unit of COD (chemical oxygen demand): 13.9 J per mg.
 * COD is the standard measure of oxidisable load, so this converts "how dirty"
 * directly into "how much energy is in it". Held as tenths of a J/mg.
 */
const JOULES_PER_MG_COD_TENTHS = 139

/**
 * Fraction of COD that anaerobic digestion converts to methane, as a
 * percentage. Well-run mesophilic digesters on soluble organics reach the
 * mid-sixties; the rest becomes biomass or leaves undigested.
 */
const DIGESTION_CAPTURE_PERCENT = 65

/**
 * Electrical efficiency of a gas engine in CHP service, as a percentage.
 * Reciprocating engines in the hundreds-of-kW class sit near this. Heat is
 * recovered too, but heat is not what was asked for, so it is not counted.
 */
const ENGINE_ELECTRICAL_PERCENT = 38

/**
 * Electricity to bring digester effluent to drinking standard by membranes:
 * ultrafiltration, reverse osmosis, then polishing. 4 kWh per m³ = 4 Wh/L =
 * 14 400 J/L = 144 000 dJ/L. The conservative end of the RO range, because a
 * dirty feed fouls membranes and costs more than a clean one.
 */
export const TREATMENT_DEMAND_DECIJOULES_PER_LITRE = 144000

// ============================================================================
// THE BALANCE
// ============================================================================

export interface WaterBalance {
  /** Contamination as COD, mg/L — the input. */
  readonly codMilligramsPerLitre: number
  /** Chemical energy present in one litre, dJ/L. */
  readonly energyInLoad: number
  /** Electricity the engine actually delivers, dJ/L. */
  readonly electricityGenerated: number
  /** Electricity the membrane train consumes, dJ/L. */
  readonly treatmentDemand: number
  /** generated − demand. Positive means the plant exports power. */
  readonly netElectricity: number
  /** True when the water pays for its own cleaning and more. */
  readonly selfPowering: boolean
}

/** Integer division rounded to nearest, ties away from zero, no Math.*. */
function round(a: number, b: number): number {
  const neg = a < 0
  const x = neg ? -a : a
  const q = (2 * x + b) / (2 * b)
  const f = q - (q % 1)
  return neg ? -f : f
}

/**
 * Energy balance for one litre at a given contamination.
 *
 * `cod` is chemical oxygen demand in mg/L: roughly 300–800 for municipal
 * sewage, 2 000–6 000 for dairy or brewery effluent, 20 000–80 000 for manure
 * slurry or food-processing waste.
 */
export function balanceFor(cod: number): WaterBalance {
  if (!Number.isInteger(cod) || cod < 0) {
    throw new RangeError(`COD must be a non-negative integer in mg/L, got ${cod}`)
  }

  const energyInLoad = cod * JOULES_PER_MG_COD_TENTHS
  const captured = round(energyInLoad * DIGESTION_CAPTURE_PERCENT, 100)
  const electricityGenerated = round(captured * ENGINE_ELECTRICAL_PERCENT, 100)
  const netElectricity = electricityGenerated - TREATMENT_DEMAND_DECIJOULES_PER_LITRE

  return {
    codMilligramsPerLitre: cod,
    energyInLoad,
    electricityGenerated,
    treatmentDemand: TREATMENT_DEMAND_DECIJOULES_PER_LITRE,
    netElectricity,
    selfPowering: netElectricity > 0,
  }
}

/**
 * The lowest whole mg/L of COD at which the plant exports power.
 *
 * Found by scanning upward rather than by inverting the arithmetic, so the
 * answer is the same quantity `balanceFor` reports and cannot drift from it.
 */
export function breakEvenCod(): number {
  for (let cod = 0; cod <= 100000; cod++) {
    if (balanceFor(cod).selfPowering) return cod
  }
  throw new Error('no break-even COD below 100 000 mg/L')
}

/** Typical loads, for locating a real stream against the threshold. */
export const TYPICAL_LOADS: readonly { readonly name: string; readonly cod: number }[] = [
  { name: 'municipal sewage, dilute', cod: 300 },
  { name: 'municipal sewage, strong', cod: 800 },
  { name: 'brewery effluent', cod: 3000 },
  { name: 'dairy processing', cod: 5000 },
  { name: 'manure slurry', cod: 40000 },
]

// ============================================================================
// SELF-CHECK
// ============================================================================

/** Facts this module must satisfy. Returns failures. */
export function selfTest(): string[] {
  const fail: string[] = []

  // Clean water carries nothing. This is the point: H2O is not the fuel.
  const clean = balanceFor(0)
  if (clean.energyInLoad !== 0) fail.push('clean water reports non-zero energy')
  if (clean.electricityGenerated !== 0) fail.push('clean water generates electricity')
  if (clean.selfPowering) fail.push('clean water reports as self-powering')
  if (clean.netElectricity !== -TREATMENT_DEMAND_DECIJOULES_PER_LITRE) {
    fail.push('clean water does not owe exactly the treatment demand')
  }

  // A threshold exists, is positive, and is unique — monotone in the load.
  const t = breakEvenCod()
  if (!(t > 0)) fail.push(`break-even COD is ${t}, expected positive`)
  if (balanceFor(t).netElectricity <= 0) fail.push('break-even point does not export')
  if (balanceFor(t - 1).netElectricity > 0) fail.push('a lower COD also exports — not a threshold')

  // Monotone: more load never yields less electricity.
  let previous = -1
  for (let cod = 0; cod <= 20000; cod += 100) {
    const e = balanceFor(cod).electricityGenerated
    if (e < previous) { fail.push(`electricity fell between loads at COD ${cod}`); break }
    previous = e
  }

  // Municipal sewage must sit below the threshold and strong effluent above,
  // or the model has lost contact with the streams it claims to describe.
  const municipal = TYPICAL_LOADS.find((l) => l.name === 'municipal sewage, strong')
  const dairy = TYPICAL_LOADS.find((l) => l.name === 'dairy processing')
  if (municipal && balanceFor(municipal.cod).selfPowering) {
    fail.push('strong municipal sewage reports as self-powering')
  }
  if (dairy && !balanceFor(dairy.cod).selfPowering) {
    fail.push('dairy effluent does not report as self-powering')
  }

  // No arrangement recovers more than the load contains: capture and engine
  // efficiency are both below 100%, so electricity < energy present, always.
  for (const { cod } of TYPICAL_LOADS) {
    const b = balanceFor(cod)
    if (cod > 0 && b.electricityGenerated >= b.energyInLoad) {
      fail.push(`COD ${cod} yields electricity at or above the energy present`)
    }
  }

  return fail
}
