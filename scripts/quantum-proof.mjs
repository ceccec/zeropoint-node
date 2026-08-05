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
console.log(`Status:             ${report.system_verified ? '✅ VERIFIED' : '❌ FAILED'}`)
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
} else {
  console.log('\n❌ SYSTEM VERIFICATION FAILED\n')
  console.log('One or more layers failed verification.')
  console.log('The system requires repair before production use.')
  console.log('')
}

console.log('═'.repeat(70) + '\n')
