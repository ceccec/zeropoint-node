export const meta = {
  name: 'design-wave',
  description:
    'Design one fold for zeropoint-node — harmonise, dissolve duplicates, seal path under src/.',
  whenToUse: 'After decode-wave. Pass {scope, targets?}. Returns {path, fn, statement, boundary}.',
  phases: [
    { title: 'Context', detail: 'src/0 + AGENTS' },
    { title: 'Harmonise', detail: 'one fold' },
    { title: 'Dissolve', detail: 'dead / duplicate' },
    { title: 'Seal', detail: 'edit → npm run check' },
  ],
}

const input = typeof args === 'string' ? JSON.parse(args) : args || {}
const scope = input.scope || 'next kernel tip'

phase('Context')
const origin = await agent(
  'Read src/0/README.md. Return ≤60 words: developmentVortex throat, KERNEL_SEALED.',
  { label: 'design-origin', phase: 'Context' },
)

phase('Harmonise')
const design = await agent(
  `Scope: ${scope}\nContext:\n${origin}\n\nDesign ONE fold. Return {path, fn, statement, boundary}. Do not write files.`,
  { label: 'design-harmonise', phase: 'Harmonise' },
)

phase('Dissolve')
const dissolve = await agent(
  `Given design:\n${JSON.stringify(design)}\n\nList bulk to dissolve (duplicate digitalRoot, hand-minted uuid, dead export). Each: {what, action: 'merge|delete|bridge'}.`,
  { label: 'design-dissolve', phase: 'Dissolve' },
)

log(`design-wave "${scope}"`)
return { scope, origin, design, dissolve, seal: 'edit src → npm run check', pair: 'design/wave' }
