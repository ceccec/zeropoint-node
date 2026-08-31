/**
 * a432-error-resolvers — the sixteen resolve*Error functions declared by
 * A432_COMPLETE_DOCUMENTATION.md, none of which existed.
 *
 * They could not have existed: every one of them calls a method on
 * A432ColorSystem, and three of those methods were missing too
 * (calculateColor, calculateColorFromConsciousness,
 * calculateColorFromDimensionalState). Those are implemented in a432.color.ts
 * in terms of the colour functions that file already exported.
 *
 * The shape is the same throughout and it is the point: try the direct
 * calculation, and if it throws, fall back to a value that cannot. So the
 * property worth testing is not what colour comes out but that one always
 * does — these are the functions that must not throw.
 *
 * Math.max/Math.min in the doc's bodies are the algebra module's max/min here,
 * because Math.* is banned outside it.
 */
import { max, min } from '../0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts'
import { A432ColorSystem, type A432CMYK } from '../0/3/6/9/1/2/4/8/7/5/1/a432.color.ts'
import {
  A432_CONSTANTS,
  calculateA432Consciousness,
  calculateA432DimensionalState,
} from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { a432StringTheory, compactifiedDimension } from '../0/3/6/9/1/2/4/8/7/5/1/a432.string.theory.ts'

const A432_FREQUENCY = A432_CONSTANTS.BASE_FREQUENCY

/**
 * The doc uses PERFECT_BALANCE, FOUNDATION_DIMENSION and PRESENT_DIMENSION and
 * assigns a value to none of them. PERFECT_BALANCE is recoverable: the doc
 * writes `const consciousness = 4; // Perfect balance` in one resolver, and
 * three modules under a432/ already define PERFECT_BALANCE: 4.
 *
 * The two dimensions are not recoverable, so these are my choice and are
 * marked as such. They appear only as fallback defaults in catch branches,
 * where the single requirement is to be a digit the colour law accepts —
 * 4 for the foundation, matching the balance the doc defaults to elsewhere,
 * and 9 for the present, the completion value the vortex tour ends on.
 */
export const PERFECT_BALANCE = 4
export const FOUNDATION_DIMENSION = 4
export const PRESENT_DIMENSION = 9

/**
 * NOT DEFINED ANYWHERE. resolveVRError calls it in its catch branch. A pure
 * function has no environment to detect, so it returns the perfect balance —
 * the same neutral default the doc's other resolvers fall back to.
 */
export function detectEnvironmentalConsciousness(): number {
  return PERFECT_BALANCE
}

export function resolveConsciousnessError(consciousness: number): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(consciousness)
  } catch {
    return A432ColorSystem.calculateColorFromConsciousness(max(1, min(8, consciousness)))
  }
}

/**
 * DEVIATES FROM THE DOC, because the doc's version does not work.
 *
 * Its fallback is `dimensionalState % 10`, and NaN % 10 is NaN — so on the one
 * input most likely to have caused the error in the first place, the catch
 * branch re-raises the same error the try branch threw. A resolver that
 * rethrows resolves nothing. The fallback sanitises to a digit here, which is
 * what the doc's `% 10` was reaching for.
 */
export function resolveDimensionalError(dimensionalState: number): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromDimensionalState(dimensionalState)
  } catch {
    const safe = Number.isFinite(dimensionalState) ? dimensionalState % 10 : FOUNDATION_DIMENSION
    return A432ColorSystem.calculateColorFromDimensionalState(safe)
  }
}

export function resolveQuantumError(quantumState: { frequency?: number; index?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColor(quantumState.frequency as number)
  } catch {
    const seq = A432_CONSTANTS.RODIN_SEQUENCE
    const rodinIndex = ((quantumState.index ?? 0) % seq.length + seq.length) % seq.length
    return A432ColorSystem.calculateColor(seq[rodinIndex] * A432_FREQUENCY)
  }
}

export function resolveTemporalError(temporalData: { dimension?: number; frequency?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromDimensionalState(temporalData.dimension as number)
  } catch {
    const f = temporalData.frequency
    return A432ColorSystem.calculateColor((Number.isFinite(f) ? (f as number) : 1) * A432_FREQUENCY)
  }
}

export function resolveMusicError(audioFrequency: number): A432CMYK {
  try {
    return A432ColorSystem.calculateColor(audioFrequency)
  } catch {
    // Same hazard as resolveDimensionalError: NaN % anything is NaN.
    const safe = Number.isFinite(audioFrequency) ? audioFrequency % A432_FREQUENCY : A432_FREQUENCY
    return A432ColorSystem.calculateColor(safe)
  }
}

export function resolveTherapyError(therapeuticRequirements: { consciousness?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(therapeuticRequirements.consciousness as number)
  } catch {
    return A432ColorSystem.calculateColor((PERFECT_BALANCE * A432_FREQUENCY) / 8)
  }
}

export function resolveResearchError(subjectData: { consciousness?: number; frequency?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(subjectData.consciousness as number)
  } catch {
    return A432ColorSystem.calculateColorFromDimensionalState(
      calculateA432DimensionalState(subjectData.frequency || A432_FREQUENCY),
    )
  }
}

export function resolvePhysicsError(): unknown {
  const sealed = a432StringTheory()
  if (!sealed.computes) return compactifiedDimension()
  return sealed.compactified
}

export function resolveArtError(artParameters: { consciousness?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(
      max(1, min(8, artParameters.consciousness || PERFECT_BALANCE)),
    )
  } catch {
    return A432ColorSystem.calculateColorFromConsciousness(PERFECT_BALANCE)
  }
}

export function resolveDesignError(designRequirements: { consciousness?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(designRequirements.consciousness as number)
  } catch {
    return A432ColorSystem.calculateColorFromConsciousness(PERFECT_BALANCE)
  }
}

export function resolveHealingError(patientData: { consciousness?: number; environmentalFrequency?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(patientData.consciousness as number)
  } catch {
    return A432ColorSystem.calculateColorFromConsciousness(
      calculateA432Consciousness(patientData.environmentalFrequency || A432_FREQUENCY),
    )
  }
}

export function resolveMedicineError(healthData: { dimensionalState?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromDimensionalState(healthData.dimensionalState as number)
  } catch {
    return A432ColorSystem.calculateColorFromDimensionalState(healthData.dimensionalState || FOUNDATION_DIMENSION)
  }
}

export function resolveVRError(userData: { consciousness?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(userData.consciousness as number)
  } catch {
    return A432ColorSystem.calculateColorFromConsciousness(detectEnvironmentalConsciousness())
  }
}

export function resolveARError(userData: { dimensionalState?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromDimensionalState(userData.dimensionalState as number)
  } catch {
    return A432ColorSystem.calculateColorFromDimensionalState(PRESENT_DIMENSION)
  }
}

export function resolveInternetError(dataConsciousness: { level?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromConsciousness(dataConsciousness.level as number)
  } catch {
    return A432ColorSystem.calculateColorFromConsciousness(PERFECT_BALANCE)
  }
}

export function resolveComputingError(computationalData: { dimension?: number }): A432CMYK {
  try {
    return A432ColorSystem.calculateColorFromDimensionalState(computationalData.dimension as number)
  } catch {
    return A432ColorSystem.calculateColorFromDimensionalState(computationalData.dimension || FOUNDATION_DIMENSION)
  }
}
