/**
 * Quantum-security bridge: assess classical cryptography against quantum threats.
 *
 * Routes schemes through quantum-attack analysis. Identifies vulnerabilities.
 * Recommends post-quantum alternatives. Integrates with security module.
 *
 * Principle: Classical security must account for quantum adversaries.
 * Quantum heuristics guide cryptanalysis strategy selection.
 */

import { abs, max, min, floor, sqrt } from '../0/algebra.ts'
import { analyzeRSA } from './applications.ts'

// ============================================================================
// CRYPTOGRAPHIC SCHEME ASSESSMENT
// ============================================================================

export interface CryptoSchemeProfile {
  readonly scheme: string
  readonly family: string // 'RSA', 'ECDLP', 'LWE', 'CodeBased', 'IsogenyBased'
  readonly keyLength: number
  readonly classicalBitSecurity: number // log₂ classical effort
  readonly quantumBitSecurity: number // log₂ quantum effort via Shor/Grover
  readonly postQuantumSafe: boolean
}

export interface SecurityAssessment {
  readonly scheme: CryptoSchemeProfile
  readonly quantumRisk: number // 0-1: risk of quantum break
  readonly recommendation: 'immediate-retire' | 'monitor' | 'safe' | 'prepare-migration'
  readonly mitigationSteps: readonly string[]
  readonly timelineYears: number // Years until quantum threat expected
}

// Analyze RSA security profile
export function assessRSA(keyLength: number): CryptoSchemeProfile {
  // Classical: ~O(exp(keyLength^(1/3))) via GNFS
  // RSA-2048: ~2^112 classical operations (exponentially hard)
  const classicalSecurity = floor(keyLength / 18)

  // Quantum: Shor's algorithm runs in O(keyLength³) gate complexity
  // CRITICAL: This is NOT a speedup factor. Shor BREAKS RSA entirely.
  // - RSA-2048 requires ~2048³ ≈ 2^33 gates (polynomial, trivial)
  // - Classical requires ~2^112 operations (exponential, intractable)
  // - Complete break, not relative speedup. Scheme is immediately insecure.
  // Represented as log₂(keyLength³) ≈ 3 * log₂(keyLength)
  const quantumSecurity = floor(3 * Math.log2(keyLength))

  return {
    scheme: `RSA-${keyLength}`,
    family: 'RSA',
    keyLength,
    classicalBitSecurity: classicalSecurity,
    quantumBitSecurity: quantumSecurity,
    postQuantumSafe: false,
  }
}

// Analyze ECDLP (elliptic curve discrete log) security
export function assessECDLP(curveSize: number): CryptoSchemeProfile {
  // Classical: O(sqrt(order)) via Pollard rho
  // P-256: ~2^128 classical operations (exponentially hard)
  const classicalSecurity = curveSize / 2

  // Quantum: Shor's algorithm variant completely breaks ECDLP in polynomial time
  // CRITICAL: Like RSA, this is NOT a "speedup". Shor BREAKS ECDLP entirely.
  // - P-256: ~2048 quantum gates (polynomial, trivial)
  // - Classical: ~2^128 operations (exponential, intractable)
  // - Complete break. Grover provides negligible advantage on this problem.
  // Represented as log₂ of polynomial gate count
  const quantumSecurity = floor(Math.log2(curveSize * curveSize))

  return {
    scheme: `ECDLP-${curveSize}`,
    family: 'ECDLP',
    keyLength: curveSize,
    classicalBitSecurity: classicalSecurity,
    quantumBitSecurity: quantumSecurity,
    postQuantumSafe: false,
  }
}

// Lattice-based cryptography (LWE - Learning With Errors): post-quantum safe
export function assessLWE(dimension: number): CryptoSchemeProfile {
  const classicalSecurity = floor(dimension / 2)
  // Quantum: No known polynomial-time algorithm
  const quantumSecurity = floor(dimension / 2)

  return {
    scheme: `LWE-${dimension}`,
    family: 'LWE',
    keyLength: dimension,
    classicalBitSecurity: classicalSecurity,
    quantumBitSecurity: quantumSecurity,
    postQuantumSafe: true,
  }
}

// Code-based cryptography (McEliece): post-quantum safe
export function assessCodeBased(codeLength: number): CryptoSchemeProfile {
  const classicalSecurity = floor(codeLength / 4)
  // Quantum: No known polynomial attack
  const quantumSecurity = floor(codeLength / 4)

  return {
    scheme: `McEliece-${codeLength}`,
    family: 'CodeBased',
    keyLength: codeLength,
    classicalBitSecurity: classicalSecurity,
    quantumBitSecurity: quantumSecurity,
    postQuantumSafe: true,
  }
}

// ============================================================================
// QUANTUM RISK ASSESSMENT
// ============================================================================

export function assessQuantumRisk(scheme: CryptoSchemeProfile, yearsSinceDeployment: number = 0): SecurityAssessment {
  let quantumRisk = 0
  let recommendation: 'immediate-retire' | 'monitor' | 'safe' | 'prepare-migration' = 'safe'
  const mitigationSteps: string[] = []
  let timelineYears = 0

  if (scheme.postQuantumSafe) {
    // Post-quantum safe by design
    quantumRisk = 0.01
    recommendation = 'safe'
    mitigationSteps.push('Continue current deployment')
    timelineYears = 100
  } else {
    // Pre-quantum vulnerable schemes

    // RSA and ECDLP are COMPLETELY broken by Shor's algorithm in polynomial time
    // Not a "speedup"—a total break. Always immediate-retire regardless of timeline.
    if (scheme.family === 'RSA' || scheme.family === 'ECDLP') {
      quantumRisk = 0.99
      recommendation = 'immediate-retire'
      mitigationSteps.push('Shor\'s algorithm breaks this scheme entirely in polynomial time')
      mitigationSteps.push('Discontinue ALL deployments immediately (not in 10 years)')
      mitigationSteps.push('Migrate existing systems to post-quantum alternatives NOW')
      mitigationSteps.push('Assess harvest-now-decrypt-later exposure for historical ciphertexts')
      timelineYears = 0
    } else {
      // Other pre-quantum schemes: conventional risk model
      const bitSecurityGap = scheme.classicalBitSecurity - scheme.quantumBitSecurity
      const riskFactor = abs(bitSecurityGap) / max(scheme.classicalBitSecurity, 1)

      // Risk model: scales with deployment age
      // Assumes quantum computer progress roughly follows Moore's Law analog
      const yearsToQuantumThreat = floor(
        (2030 - yearsSinceDeployment) / 20, // Timeline estimate
      )

      quantumRisk = min(0.99, riskFactor + yearsSinceDeployment / 100)
      timelineYears = max(0, yearsToQuantumThreat)

      if (quantumRisk > 0.8) {
        recommendation = 'immediate-retire'
        mitigationSteps.push('Discontinue new deployments immediately')
        mitigationSteps.push('Migrate existing systems to post-quantum alternatives')
        mitigationSteps.push('Assess harvest-now-decrypt-later exposure')
      } else if (quantumRisk > 0.5) {
        recommendation = 'prepare-migration'
        mitigationSteps.push('Begin post-quantum migration planning')
        mitigationSteps.push('Inventory all systems using this scheme')
        mitigationSteps.push('Establish timeline for transition')
      } else {
        recommendation = 'monitor'
        mitigationSteps.push('Monitor quantum computing advances')
        mitigationSteps.push('Prepare contingency plans')
        mitigationSteps.push('Consider hybrid classical-post-quantum deployment')
      }
    }
  }

  return {
    scheme,
    quantumRisk,
    recommendation,
    mitigationSteps,
    timelineYears,
  }
}

// ============================================================================
// CRYPTANALYSIS STRATEGY ROUTING
// ============================================================================

export interface AnalysisStrategy {
  readonly name: string
  readonly techniques: readonly string[]
  readonly effort: number // log₂ operations
  readonly success_probability: number
}

// Route scheme to appropriate cryptanalysis strategy
export function recommendAnalysisStrategy(scheme: CryptoSchemeProfile): AnalysisStrategy {
  if (scheme.family === 'RSA') {
    return {
      name: 'Shor + Factoring',
      techniques: ['Shor-algorithm', 'Period-finding', 'Modular-exponentiation'],
      effort: scheme.quantumBitSecurity,
      success_probability: 0.95,
    }
  }

  if (scheme.family === 'ECDLP') {
    return {
      name: 'Shor-variant + Elliptic-Curve',
      techniques: ['Order-finding', 'Point-addition', 'Fourier-on-group'],
      effort: scheme.quantumBitSecurity,
      success_probability: 0.9,
    }
  }

  if (scheme.family === 'LWE' || scheme.family === 'CodeBased') {
    return {
      name: 'Classical-only (No quantum advantage)',
      techniques: ['Gaussian-elimination', 'BKZ-reduction', 'Decoding-hardness'],
      effort: scheme.classicalBitSecurity,
      success_probability: 0.0001, // Conjectured hard
    }
  }

  return {
    name: 'Generic-search',
    techniques: ['Grover-search', 'Random-oracle'],
    effort: floor(scheme.quantumBitSecurity / 2),
    success_probability: 0.5,
  }
}

// ============================================================================
// MIGRATION PLANNING
// ============================================================================

export interface MigrationPlan {
  readonly from: CryptoSchemeProfile
  readonly to: CryptoSchemeProfile
  readonly phaseCount: number
  readonly phases: readonly {
    readonly phase: number
    readonly description: string
    readonly durationMonths: number
  }[]
  readonly risks: readonly string[]
}

// Plan cryptographic migration from pre-quantum to post-quantum
export function planMigration(from: CryptoSchemeProfile, to: CryptoSchemeProfile): MigrationPlan {
  const phaseCount = 4

  return {
    from,
    to,
    phaseCount,
    phases: [
      {
        phase: 1,
        description: 'Preparation: inventory systems, audit dependencies',
        durationMonths: 3,
      },
      {
        phase: 2,
        description: `Pilot: deploy ${to.scheme} in staging environment, test interop`,
        durationMonths: 6,
      },
      {
        phase: 3,
        description: `Gradual rollout: migrate high-risk systems to ${to.scheme}`,
        durationMonths: 12,
      },
      {
        phase: 4,
        description: `Completion: retire ${from.scheme}, monitor for issues`,
        durationMonths: 6,
      },
    ],
    risks: [
      'Performance impact (LWE/CodeBased slower than classical schemes)',
      'Interoperability issues with legacy systems',
      'Incomplete cryptanalysis of newer post-quantum schemes',
      'Supply chain attacks during transition period',
    ],
  }
}

// ============================================================================
// INTEGRATED SECURITY ASSESSMENT
// ============================================================================

export interface ComprehensiveSecurityReport {
  readonly schemes: readonly SecurityAssessment[]
  readonly vulnerableCount: number
  readonly safeCount: number
  readonly riskScore: number // 0-1: overall portfolio risk
  readonly recommendations: readonly string[]
}

// Comprehensive assessment of cryptographic portfolio
export function assessCryptographicPortfolio(
  schemes: readonly CryptoSchemeProfile[],
  deploymentYear: number = 2024,
): ComprehensiveSecurityReport {
  const assessments = schemes.map((s) => assessQuantumRisk(s, deploymentYear))

  const vulnerableCount = assessments.filter(
    (a) => a.recommendation === 'immediate-retire' || a.recommendation === 'prepare-migration',
  ).length
  const safeCount = assessments.filter((a) => a.recommendation === 'safe').length

  // Portfolio risk: weighted by vulnerability
  const riskScore = assessments.reduce((sum, a) => sum + a.quantumRisk, 0) / assessments.length

  const recommendations: string[] = []
  if (riskScore > 0.7) {
    recommendations.push('CRITICAL: Immediate migration to post-quantum cryptography required')
  } else if (riskScore > 0.4) {
    recommendations.push('WARNING: Begin post-quantum migration planning within 6 months')
  } else {
    recommendations.push('INFO: Monitor quantum developments; prepare contingency plans')
  }

  if (vulnerableCount > 0) {
    recommendations.push(`${vulnerableCount} scheme(s) require immediate retirement or migration`)
  }

  if (safeCount === assessments.length) {
    recommendations.push('All assessed schemes are post-quantum safe')
  }

  return {
    schemes: assessments,
    vulnerableCount,
    safeCount,
    riskScore,
    recommendations,
  }
}
