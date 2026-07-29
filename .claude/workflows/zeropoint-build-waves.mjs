export const meta = {
  name: 'zeropoint-build-waves',
  description:
    'Build zeropoint-node in chat waves through the double-torus development vortex (ceccec ↔ erpax).',
  whenToUse: 'Default self-build loop. Pass {scope?}. One wave per agent turn.',
  phases: [
    { title: 'Origin', detail: 'src/0/README.md' },
    { title: 'Decode', detail: 'sourced findings from ceccec.github.io + erpax' },
    { title: 'Design', detail: 'one fold, one receipt' },
    { title: 'Learn', detail: 'skills.json · AGENTS.md' },
    { title: 'Edit', detail: 'sealed src/' },
    { title: 'Rebuild', detail: 'npm run check' },
    { title: 'Verify', detail: 'developmentVortex computes' },
  ],
}

const input = typeof args === 'string' ? JSON.parse(args) : args || {}
const scope = input.scope || 'zeropoint development vortex'

phase('Origin')
const origin = await agent(
  'Read src/0/README.md and src/0/index.ts exports. Return ≤80 words: thesis, KERNEL_SEALED, developmentVortex.',
  { label: 'wave-origin', phase: 'Origin' },
)

phase('Decode')
const decode = await agent(
  `Scope: ${scope}. Document ≤5 patterns from ceccec.github.io (fold/vortex) and ≤5 from erpax (content-uuid/gates). Flag metaphysical overclaims.`,
  { label: 'wave-decode', phase: 'Decode' },
)

phase('Design')
const design = await agent(
  `Given:\n${origin}\n${JSON.stringify(decode)}\n\nDesign one fold under src/. Return {path, fn, statement, boundary}.`,
  { label: 'wave-design', phase: 'Design' },
)

phase('Verify')
const verify = await agent(
  'Confirm npm run check / kernel:smoke path. Return {sealable:boolean, nextWave:string}.',
  { label: 'wave-verify', phase: 'Verify' },
)

log(`zeropoint-build-waves "${scope}"`)
return { scope, origin, decode, design, verify, pair: 'waves/build' }
