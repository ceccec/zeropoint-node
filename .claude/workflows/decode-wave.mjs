export const meta = {
  name: 'decode-wave',
  description:
    'Lean sourced research wave — documented vs flagged findings from ceccec.github.io + erpax for one tip.',
  whenToUse: 'Before designing a fold. Pass {topic, angles?}. Fold findings by hand (honesty stays manual).',
  phases: [
    { title: 'Context', detail: 'src/0/README.md + SKILL.md' },
    { title: 'Research', detail: 'one sourced angle per lobe' },
    { title: 'Synthesize', detail: 'documented + flagged' },
  ],
}

const input = typeof args === 'string' ? JSON.parse(args) : args || {}
const topic = input.topic || 'zeropoint kernel tip'

phase('Context')
const origin = await agent(
  'Read src/0/README.md and SKILL.md. Return ≤80 words: fold thesis, dual spines, refused claims.',
  { label: 'decode-origin', phase: 'Context' },
)

phase('Research')
const lobes = await parallel([
  () =>
    agent(
      `Topic: ${topic}. Lobe L (ceccec.github.io): list ≤5 documented fold/vortex patterns and ≤3 flagged overclaims. Cite paths.`,
      { label: 'decode-ceccec', phase: 'Research' },
    ),
  () =>
    agent(
      `Topic: ${topic}. Lobe R (erpax): list ≤5 documented content-uuid/gate patterns and ≤3 flagged (do not port Payload/ERP). Cite paths.`,
      { label: 'decode-erpax', phase: 'Research' },
    ),
])

phase('Synthesize')
log(`decode-wave "${topic}"`)
return { topic, origin, lobes: lobes.filter(Boolean), pair: 'decode/wave' }
