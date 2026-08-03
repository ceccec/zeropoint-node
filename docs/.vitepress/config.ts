import { defineConfig, type HeadConfig } from 'vitepress'

/**
 * VitePress replaces the previous Jekyll pipeline.
 *
 * Jekyll built from src/0/3/6/9/1/2/4/8/7/5/1/ and its _config.yml existed
 * only to switch Jekyll processing off — the site was static passthrough.
 * VitePress builds docs/ instead, so the generated projections (KERNEL.md,
 * AUDIT.md, SEQUENCE.md, pages/) are the site.
 *
 * base is '/' because Pages serves this at the ROOT of the custom domain
 * node.zeropoint.bg (see docs/public/CNAME), not at the project path. Setting
 * '/zeropoint-node/' emits asset URLs that 404 on that domain: the page still
 * returns 200 with its HTML, so the deploy looks green while every stylesheet
 * and script is missing. Verify assets, not the page status code.
 */

// The canonical origin. Everything the crawler is told about the site — the
// sitemap entries, the <link rel="canonical">, the og:url — is anchored here,
// so there is exactly one spelling of every URL and no http/apex/trailing-slash
// duplicate for a search engine to split rank across. Matches docs/public/CNAME.
const HOSTNAME = 'https://node.zeropoint.bg'

/**
 * A source file's public URL under cleanUrls, absolute against HOSTNAME.
 *
 *   index.md          -> https://node.zeropoint.bg/
 *   SEQUENCE.md       -> https://node.zeropoint.bg/SEQUENCE
 *   pages/origin.md   -> https://node.zeropoint.bg/pages/origin
 *   pages/index.md    -> https://node.zeropoint.bg/pages/
 *
 * relativePath is always POSIX-separated and .md-suffixed in VitePress, so the
 * two replaces below are exhaustive.
 */
function pageUrl(relativePath: string): string {
  const path = relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  return `${HOSTNAME}/${path}`
}

export default defineConfig({
  title: 'ZeroPoint Node',
  description:
    'Vortex sequence, its reflection through the void, and the computed kernel that proves both.',
  base: '/',
  srcDir: '.',
  outDir: '.vitepress/dist',
  cleanUrls: true,
  lastUpdated: true,

  // docs/README.md would also map to / and collide with index.md.
  srcExclude: ['README.md', '**/node_modules/**'],

  // Fails closed on dead links. Every target here resolves; a broken one stops
  // the deploy rather than shipping a 404 to readers.
  ignoreDeadLinks: false,

  // Emits sitemap.xml at the dist root, so it is served from
  // node.zeropoint.bg/sitemap.xml — the URL robots.txt (docs/public/robots.txt)
  // points crawlers at. VitePress writes one <url> per built page and fills
  // <lastmod> from git (lastUpdated is on above), so the crawl set stays in
  // step with the content without a hand-maintained list to drift.
  sitemap: { hostname: HOSTNAME },

  // Site-wide social/meta tags. Per-page canonical, og:title/description and
  // og:url are added in transformHead below, where pageData is available.
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'ZeroPoint Node' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    // Absolute URL is mandatory: crawlers fetch og:image out of page context,
    // so a relative path resolves against their own host and 404s. The file is
    // docs/public/og.png (1200x630, the size Facebook/X/LinkedIn expect).
    ['meta', { property: 'og:image', content: `${HOSTNAME}/og.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'ZeroPoint Node — the vortex enneagram: the 3-6-9 gateway triangle and the 1-2-4-8-7-5 doubling loop.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${HOSTNAME}/og.png` }],
    ['meta', { name: 'theme-color', content: '#3c3c43' }],
    ['meta', { name: 'author', content: 'ZeroPoint Node (ceccec)' }],
  ],

  // Per-page SEO tags. Runs once per built page with that page's resolved data,
  // so each HTML file ships its own canonical URL and Open Graph/Twitter title
  // and description — the difference between every page reading as "ZeroPoint
  // Node" to a crawler and each page being indexed for what it actually says.
  transformHead: ({ pageData, siteData }) => {
    const url = pageUrl(pageData.relativePath)
    const title = pageData.title || siteData.title
    const description = pageData.description || siteData.description

    const tags: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { name: 'twitter:title', content: title }],
    ]
    if (description) {
      tags.push(
        ['meta', { property: 'og:description', content: description }],
        ['meta', { name: 'twitter:description', content: description }],
      )
    }
    return tags
  },

  vite: {
    build: {
      // The only chunk over 500 kB is the local search index
      // (@localSearchIndexroot, ~859 kB). It is NOT preloaded: index.html
      // references it zero times, and VPLocalSearchBox pulls it in via a
      // dynamic import when the user opens search. A MiniSearch index is one
      // serialized blob, so it cannot be code-split, and Algolia is out
      // because the CSP forbids external hosts. Raise the threshold and say
      // why, rather than restructure something that costs nothing until used.
      chunkSizeWarningLimit: 1000,
    },
  },

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
      message:
        'Facts on this site are computed by the kernel — drift fails npm run check. ' +
        'Contact <a href="mailto:node@zeropoint.bg">node@zeropoint.bg</a>.',
      copyright: 'ZeroPoint Node · node.zeropoint.bg',
    },
  },
})
