import { defineConfig } from 'vitepress'

/**
 * VitePress replaces the previous Jekyll pipeline.
 *
 * Jekyll built from src/0/3/6/9/1/2/4/8/7/5/1/ and its _config.yml existed
 * only to switch Jekyll processing off — the site was static passthrough.
 * VitePress builds docs/ instead, so the generated projections (KERNEL.md,
 * AUDIT.md, SEQUENCE.md, pages/) are the site.
 *
 * base is the project-site path for ceccec/zeropoint-node.
 */
export default defineConfig({
  title: 'ZeroPoint Node',
  description:
    'Vortex sequence, its reflection through the void, and the computed kernel that proves both.',
  base: '/zeropoint-node/',
  srcDir: '.',
  outDir: '.vitepress/dist',
  cleanUrls: true,
  lastUpdated: true,

  // docs/README.md would also map to / and collide with index.md.
  srcExclude: ['README.md', '**/node_modules/**'],

  // The corpus carries 60 markdown files with cross-links that predate the
  // site build; a dead link must not fail the docs build. npm run check is
  // the gate for correctness, not the site builder.
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: 'Sequence', link: '/SEQUENCE' },
      { text: 'Kernel', link: '/KERNEL' },
      { text: 'Computed pages', link: '/pages/' },
      { text: 'Audit', link: '/AUDIT' },
    ],

    sidebar: [
      {
        text: 'The sequence',
        items: [
          { text: 'Sequence spines', link: '/SEQUENCE' },
          { text: 'Sequence dual', link: '/pages/sequence-dual' },
          { text: 'Vortex stroke', link: '/pages/vortex-stroke' },
          { text: 'Origin', link: '/pages/origin' },
        ],
      },
      {
        text: 'Computed census',
        items: [
          { text: 'Kernel census', link: '/KERNEL' },
          { text: 'A432 audit census', link: '/AUDIT' },
          { text: 'Development vortex', link: '/pages/development-vortex' },
          { text: 'Content uuid', link: '/pages/content-uuid' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'All computed pages', link: '/pages/' },
          { text: 'Quick start', link: '/QUICK_START' },
          { text: 'API reference', link: '/API_REFERENCE' },
          { text: 'Mathematical principles', link: '/MATHEMATICAL_PRINCIPLES' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/ceccec/zeropoint-node' }],

    search: { provider: 'local' },

    footer: {
      message: 'Facts on this site are computed by the kernel — drift fails npm run check.',
      copyright: 'ZeroPoint Node',
    },
  },
})
