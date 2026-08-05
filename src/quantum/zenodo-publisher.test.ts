/**
 * Zenodo Publisher Test Suite
 *
 * Verifies all publication workflow components:
 * - Artifact manifest creation
 * - Metadata generation
 * - Deposit formatting
 * - Reproducibility verification
 * - Citation generation
 * - Publication simulation
 */

import {
  ZENODO_CONFIG,
  createArtifactManifest,
  createMetadata,
  formatZenodoMetadata,
  prepareDeposit,
  computeDepositVerificationHash,
  simulateZenodoPublication,
  generateCitations,
  verifyReproducibility,
  publishToZenodo,
  describeZenodoPublisher,
} from './zenodo-publisher.ts'

function testArtifactManifest(): void {
  console.log('Test: Artifact manifest creation...')

  const manifest = createArtifactManifest()

  if (!manifest.source || manifest.source.length === 0) {
    throw new Error('Artifact manifest missing source files')
  }
  if (!manifest.compiled || manifest.compiled.length === 0) {
    throw new Error('Artifact manifest missing compiled files')
  }
  if (!manifest.proofs || manifest.proofs.length === 0) {
    throw new Error('Artifact manifest missing proof files')
  }
  if (!manifest.benchmarks || manifest.benchmarks.length === 0) {
    throw new Error('Artifact manifest missing benchmark files')
  }
  if (!manifest.documentation || manifest.documentation.length === 0) {
    throw new Error('Artifact manifest missing documentation files')
  }

  console.log(`  ✓ Source artifacts: ${manifest.source.length}`)
  console.log(`  ✓ Compiled artifacts: ${manifest.compiled.length}`)
  console.log(`  ✓ Proof artifacts: ${manifest.proofs.length}`)
  console.log(`  ✓ Benchmark artifacts: ${manifest.benchmarks.length}`)
  console.log(`  ✓ Documentation artifacts: ${manifest.documentation.length}`)
}

function testMetadataGeneration(): void {
  console.log('Test: Metadata generation...')

  const meta = createMetadata('1.0.0')

  if (!meta.title || meta.title.length === 0) {
    throw new Error('Metadata missing title')
  }
  if (!meta.description || meta.description.length === 0) {
    throw new Error('Metadata missing description')
  }
  if (!meta.creators || meta.creators.length === 0) {
    throw new Error('Metadata missing creators')
  }
  if (!meta.keywords || meta.keywords.length < 5) {
    throw new Error('Metadata has fewer than 5 keywords')
  }
  if (meta.license !== ZENODO_CONFIG.license) {
    throw new Error(`Metadata license ${meta.license} != ${ZENODO_CONFIG.license}`)
  }

  console.log(`  ✓ Title: ${meta.title.slice(0, 50)}...`)
  console.log(`  ✓ Creators: ${meta.creators.map((c) => c.name).join(', ')}`)
  console.log(`  ✓ Keywords: ${meta.keywords.length}`)
  console.log(`  ✓ License: ${meta.license}`)
}

function testFormatZenodoMetadata(): void {
  console.log('Test: Zenodo metadata formatting...')

  const meta = createMetadata()
  const formatted = formatZenodoMetadata(meta)

  if (!formatted.title) {
    throw new Error('Formatted metadata missing title')
  }
  if (!formatted.creators) {
    throw new Error('Formatted metadata missing creators')
  }
  if (!formatted.keywords) {
    throw new Error('Formatted metadata missing keywords')
  }
  if (!formatted.subjects) {
    throw new Error('Formatted metadata missing subjects')
  }

  console.log('  ✓ Title formatted')
  console.log('  ✓ Creators formatted')
  console.log('  ✓ Keywords formatted')
  console.log('  ✓ Subjects formatted')
}

function testPrepareDeposit(): void {
  console.log('Test: Deposit preparation...')

  const artifacts = createArtifactManifest()
  const deposit = prepareDeposit(artifacts, '1.0.0')

  if (!deposit.metadata) {
    throw new Error('Deposit missing metadata')
  }
  if (!deposit.artifacts) {
    throw new Error('Deposit missing artifacts')
  }

  console.log('  ✓ Deposit metadata prepared')
  console.log('  ✓ Deposit artifacts prepared')
}

function testComputeVerificationHash(): void {
  console.log('Test: Deposit verification hash computation...')

  const artifacts = createArtifactManifest()
  const hash1 = computeDepositVerificationHash(artifacts)

  if (!hash1 || hash1.length !== 64) {
    throw new Error(`Invalid verification hash: ${hash1}`)
  }

  const hash2 = computeDepositVerificationHash(artifacts)
  if (hash1 !== hash2) {
    throw new Error('Verification hash not deterministic')
  }

  console.log(`  ✓ Verification hash: ${hash1.slice(0, 16)}...`)
  console.log('  ✓ Hash deterministic')
}

function testReproducibilityVerification(): void {
  console.log('Test: Reproducibility verification...')

  const artifacts = createArtifactManifest()
  const deposit = prepareDeposit(artifacts, '1.0.0')
  const report = verifyReproducibility(deposit)

  if (report.overallScore < 0.85) {
    throw new Error(`Reproducibility score too low: ${report.overallScore}`)
  }

  const passedCount = report.checks.filter((c) => c.passed).length
  console.log(`  ✓ Reproducibility score: ${report.overallScore}`)
  console.log(`  ✓ Checks passed: ${passedCount}/${report.checks.length}`)
  console.log(`  ✓ Publishable: ${report.publishable}`)
}

function testSimulatePublication(): void {
  console.log('Test: Zenodo publication simulation...')

  const artifacts = createArtifactManifest()
  const deposit = prepareDeposit(artifacts, '1.0.0')
  const result = simulateZenodoPublication(deposit)

  if (!result.success) {
    throw new Error('Publication simulation failed')
  }
  if (!result.depositId) {
    throw new Error('Publication missing deposit ID')
  }
  if (!result.doi) {
    throw new Error('Publication missing DOI')
  }
  if (!result.doi.startsWith('10.5281/zenodo.')) {
    throw new Error(`Invalid DOI format: ${result.doi}`)
  }

  console.log(`  ✓ Deposit ID: ${result.depositId}`)
  console.log(`  ✓ DOI: ${result.doi}`)
  console.log(`  ✓ Artifacts published: ${result.artifactsPublished}`)
  console.log(`  ✓ Verification: ${result.verificationPassed}`)
}

function testGenerateCitations(): void {
  console.log('Test: Citation generation...')

  const artifacts = createArtifactManifest()
  const deposit = prepareDeposit(artifacts, '1.0.0')
  const result = simulateZenodoPublication(deposit)
  const citations = generateCitations(result, deposit.metadata)

  if (!citations.bibtex) {
    throw new Error('Missing BibTeX citation')
  }
  if (!citations.ris) {
    throw new Error('Missing RIS citation')
  }
  if (!citations.datacite) {
    throw new Error('Missing DataCite citation')
  }
  if (!citations.codemeta) {
    throw new Error('Missing CodeMeta citation')
  }

  console.log('  ✓ BibTeX generated')
  console.log('  ✓ RIS generated')
  console.log('  ✓ DataCite generated')
  console.log('  ✓ CodeMeta generated')
}

async function testPublishToZenodo(): Promise<void> {
  console.log('Test: End-to-end publication workflow...')

  const artifacts = createArtifactManifest()
  const result = await publishToZenodo(artifacts, '1.0.0', true)

  if (!result.success) {
    throw new Error('Publication workflow failed')
  }
  if (!result.doi) {
    throw new Error('Publication missing DOI')
  }
  if (result.verificationPassed === false) {
    throw new Error('Publication verification failed')
  }

  console.log(`  ✓ Publication successful`)
  console.log(`  ✓ DOI: ${result.doi}`)
  console.log(`  ✓ Artifacts: ${result.artifactsPublished}`)
}

function testDescribeZenodoPublisher(): void {
  console.log('Test: Publisher description...')

  const description = describeZenodoPublisher()

  if (!description.includes('Zenodo Publisher')) {
    throw new Error('Description missing title')
  }
  if (!description.includes('Capabilities')) {
    throw new Error('Description missing capabilities section')
  }

  console.log('  ✓ Description generated')
}

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

async function runTests(): Promise<void> {
  console.log('🚀 Zenodo Publisher Test Suite\n')

  try {
    testArtifactManifest()
    testMetadataGeneration()
    testFormatZenodoMetadata()
    testPrepareDeposit()
    testComputeVerificationHash()
    testReproducibilityVerification()
    testSimulatePublication()
    testGenerateCitations()
    await testPublishToZenodo()
    testDescribeZenodoPublisher()

    console.log('\n✅ All Zenodo publisher tests passed!')
  } catch (error) {
    console.error(`\n❌ Test failed: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}

runTests()
