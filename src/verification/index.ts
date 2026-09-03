/**
 * The ./verification entry point.
 *
 * This exists because the entry was lean-bridge.ts itself, and a file that is
 * both a source module and the public barrel cannot re-export anything that
 * imports it. validation-criterion needs SEALS, so re-exporting the criterion
 * from lean-bridge closed a cycle — the ratchet reported `import cycles: 1`
 * within one gate run of the attempt.
 *
 * A barrel is imported by nothing and imports everything, so it can carry the
 * whole surface without creating one. What a consumer of ./verification gets is
 * decided here, and criteria:check gates six predicates that must all be
 * reachable from it: verifying 1.4.9 against the published tarball found three
 * of the six missing, which is the same defect 1.4.4 recorded for the quantum
 * criterion and the reason this file exists rather than another re-export line.
 */
export * from './lean-bridge.ts'
export * from './realtime-criterion.ts'
export * from './validation-criterion.ts'
