#!/usr/bin/env node
/**
 * Quantum System Proof: run the entire system and generate verifiable evidence.
 *
 * Usage: npm run quantum:proof
 *
 * Output: proof report showing each layer passes independent verification.
 * This is NOT self-certification — any outsider can run this and verify.
 */

import {
  proveQuantumSimulator,
  proveQuantumAlgorithms,
  proveHybridComputing,
  proveDiscoveryAndEC,
  proveMetaVerification,
  proveComposability,
  proveSelfHealing,
  proveSystem,
  exportProofJSON,
} from '../src/quantum/proof-of-system.ts'

console.log('\n🎯 QUANTUM SYSTEM PROOF OF CORRECTNESS\n')
console.log('Running each layer independently and collecting evidence...\n')
console.log('═'.repeat(70))

// Run the full proof
const report = proveSystem()

// Display layer-by-layer results
for (const layer of report.layers_verified) {
  const status = layer.passed ? '✅' : '❌'
  const checks = `${layer.checks_passed}/${layer.checks_total}`
  console.log(`\n${status} ${layer.layer_name.padEnd(35)} [${checks}]`)

  for (const evidence of layer.evidence) {
    console.log(`   • ${evidence}`)
  }
}

// Display summary
console.log('\n' + '═'.repeat(70))
console.log('\n📊 SYSTEM PROOF SUMMARY\n')
// Three states, not two — the same distinction the proof document makes.
// Reading `!verified` as `FAILED` is how a layer that verifies nothing gets
// reported as a layer that failed.
const anyFailed = report.total_passed < report.total_checks
console.log(`Status:             ${
  report.system_verified ? '✅ VERIFIED' : anyFailed ? '❌ FAILED' : '⚠️  INCOMPLETE'
}`)
console.log(`Confidence:         ${Math.round(report.confidence_score * 100)}%`)
console.log(`Checks Passed:      ${report.total_passed}/${report.total_checks}`)
console.log(`Layers Verified:    ${report.layers_verified.filter((l) => l.passed).length}/${report.layers_verified.length}`)
console.log(`\nExternal Verification: ${report.external_verification}`)

// Print the full proof document
console.log('\n' + '═'.repeat(70))
console.log('\n📄 FULL PROOF DOCUMENT\n')
console.log(report.proof_document)

// Export JSON for machine verification
console.log('\n' + '═'.repeat(70))
console.log('\n🔍 MACHINE-READABLE PROOF (JSON)\n')
const json_proof = exportProofJSON(report)
console.log(json_proof)

// Final verdict
console.log('\n' + '═'.repeat(70))
if (report.system_verified && report.confidence_score > 0.9) {
  console.log('\n🚀 SYSTEM READY FOR PRODUCTION\n')
  console.log('The quantum system has been verified across all 7 layers.')
  console.log('All checks pass. Confidence is high. The system is production-grade.')
  console.log('')
} else if (report.system_verified) {
  console.log('\n⚠️  SYSTEM VERIFIED BUT WITH CAVEATS\n')
  console.log('The system passes all checks but confidence is not maximum.')
  console.log('Review the evidence above and consider additional testing.')
  console.log('')
} else if (report.total_passed < report.total_checks) {
  console.log('\n❌ SYSTEM VERIFICATION FAILED\n')
  console.log(`${report.total_checks - report.total_passed} check(s) did not hold.`)
  console.log('')
} else {
  // FAILED and INCOMPLETE are different things. Every check that ran passed;
  // what is missing is a layer that runs none. This branch printed FAILED for
  // both, contradicting the proof document it had just printed above — which
  // says INCOMPLETE and names the empty layers.
  const empty = report.layers_verified.filter((l) => l.checks_total === 0)
  console.log('\n⚠️  SYSTEM VERIFICATION INCOMPLETE\n')
  console.log(`All ${report.total_passed} checks that ran passed.`)
  console.log(`${empty.length} of ${report.layers_verified.length} layers run no checks: ${empty.map((l) => l.layer_name).join(', ')}.`)
  console.log('Their claims were prose and were removed rather than asserted.')
  console.log('')
}

console.log('═'.repeat(70) + '\n')

// Exit non-zero when a check that RAN did not hold. Not when a layer is empty:
// three of the seven verify nothing, because their claims were prose and were
// removed rather than asserted, and an absence is not a failure. This script
// exited 0 unconditionally while the layers underneath it counted sentences.
const failed = report.total_checks - report.total_passed
if (failed > 0) {
  console.error(`quantum:proof FAIL — ${failed} of ${report.total_checks} checks did not hold`)
  process.exit(1)
}
console.log(`quantum:proof ok — ${report.total_passed}/${report.total_checks} checks recomputed and held`)
process.exit(0)
