/**
 * generated-artifacts — the one list of what this repository generates, and
 * which checker guards each one.
 *
 * Lifted out of checks-falsifiable so a second reader can have it without
 * running a two-minute probe as an import side effect. Two readers now:
 * checks-falsifiable, which corrupts each artifact and requires its checker to
 * notice, and generated-current, which asks the question that pairing cannot —
 * whether the copy in git is the copy the generator produces.
 */
/** checker npm script -> the generated artifact it is supposed to be guarding. */
export const GUARDS = {
  // readme:check does NOT check README.md — it guards the two documents it
  // generates. Mapping it by its name is how this table got its first entry
  // wrong, and the probe caught that before the table was ever committed.
  'readme:check': 'docs/KERNEL.md',
  'docs:index:check': 'docs/DOCUMENTATION_INDEX.md',
  'a432:scan:check': 'docs/A432_QUANTUM_SCAN.md',
  'api:reference:check': 'docs/API_REFERENCE.md',
  'docs:pages:check': 'docs/pages/index.md',
  'vortex:svg:check': 'docs/public/vortex.svg',
  'paper:check': 'docs/public/paper.html',
  'bundle:a432:check': 'public/a432.bundle.js',
  'derivation:check': 'src/verification/derivation.json',
  'lean:bounds:check': 'lean/bounds.json',
  'seal:pinning:check': 'src/verification/seal-pinning.json',
  'constrained:check': 'src/verification/constrained.json',
  'zenodo:deposits:check': 'src/verification/deposits.json',
  'axiom:index:check': 'src/verification/axiom-index.json',
  'qpu:agrees:check': 'src/verification/qpu-agrees.json',
  // Block-scoped: these own a marked region of README.md and nothing else, so
  // the probe has to land inside the region or it proves nothing.
  'spectrum:check': ['README.md', 'SPECTRUM'],
  'readme:census:check': ['README.md', 'CENSUS'],
  'citations:check': 'CITATION.bib',
}
