import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
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

// docs/ — the srcDir. config.ts lives in docs/.vitepress, so its parent is docs.
const DOCS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * A meta description mined from a page's OWN first prose, for the many computed
 * and reference pages that carry no frontmatter `description`. Without this they
 * would all inherit the one site description and read identically to a crawler;
 * with it each page is indexed for the sentence it actually opens with.
 *
 * Deterministic and build-time only: strips frontmatter, code fences, comments,
 * markup and headings, then takes the first ~160 characters at a word boundary.
 * Fails open to '' so a missing or unreadable file never breaks the build.
 */
function excerptFor(relativePath: string): string {
  try {
    const raw = readFileSync(resolve(DOCS_ROOT, relativePath), 'utf8')
    const text = raw
      .replace(/^---\n[\s\S]*?\n---\n/, ' ') // frontmatter block
      .replace(/```[\s\S]*?```/g, ' ') // fenced code
      .replace(/<!--[\s\S]*?-->/g, ' ') // html comments
      .replace(/<[^>]+>/g, ' ') // html tags
      .replace(/^#{1,6}\s+.*$/gm, ' ') // headings
      .replace(/^\s{0,3}[-*+]\s+/gm, '') // bullet list markers (else "- item" leaks in)
      .replace(/^\s{0,3}\d+\.\s+/gm, '') // ordered list markers ("1. item")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → their text
      .replace(/[*_`>|]/g, ' ') // inline markup
      .replace(/\s+/g, ' ')
      .trim()
    if (!text) return ''
    const limit = 160
    if (text.length <= limit) return text
    const slice = text.slice(0, limit)
    const cut = slice.lastIndexOf(' ')
    return `${(cut > 80 ? slice.slice(0, cut) : slice).trim()}…`
  } catch {
    return ''
  }
}

/**
 * Sponsorship. A single outbound link, no script.
 *
 * The alternative on the table was VitePress's `carbonAds`, which injects
 * Carbon's serve script into every page. That is a third-party request and a
 * tracker on a site whose entire claim is that its facts are recomputable
 * locally — and it cannot point anywhere else, since the code identifies a
 * Carbon placement rather than a destination. A link costs the reader nothing.
 */
const SPONSOR_URL = 'https://revolut.me/ceccec'

/** Inline heart, so the icon needs no network request either. */
const SPONSOR_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
  '<path d="M12 21s-6.7-4.35-9.2-8.2C1 10 2 6.5 5.2 5.6 7.4 5 9.5 6 12 8.5 14.5 6 16.6 5 18.8 5.6 22 6.5 23 10 21.2 12.8 18.7 16.65 12 21 12 21z"/>' +
  '</svg>'

/** The hand-ordered groups that lead the sidebar; everything else follows. */
const CURATED = [
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
        text: 'Quantum computing',
        items: [
          { text: 'Technical specification', link: '/QUANTUM_SPECIFICATION' },
          { text: 'Usage guide', link: '/QUANTUM_GUIDE' },
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
    ] as const

/**
 * The sidebar is COMPUTED from the files on disk, not typed out.
 *
 * The site built 70 pages and linked 15. The other 55 were sitemapped and
 * indexed but appeared in no menu, so a reader could not find them and nothing
 * noticed — the dead-link check asks whether links point at pages, never
 * whether pages have links pointing at them. Hand-listing 55 entries would fix
 * those 55 and leave the 56th to orphan exactly the same way.
 *
 * So the groups below are derived. A new page under docs/ joins a section the
 * moment it exists, and `npm run pages:check` fails if one somehow does not.
 */
// DOCS_ROOT is already derived from import.meta.url above; __dirname does not
// exist in ESM and silently resolved to an unrelated directory.
const DOCS_DIR = DOCS_ROOT

/** First `# heading` in a file, else a readable form of the filename. */
function titleOf(file: string, route: string): string {
  try {
    const m = readFileSync(file, 'utf8').match(/^#\s+(.+)$/m)
    if (m) return m[1].replace(/[*`_]/g, '').trim().slice(0, 70)
  } catch { /* fall through to the filename */ }
  return route.split('/').pop()!.replace(/[-_]/g, ' ')
}

function pagesUnder(dir: string, out: { route: string; file: string }[] = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.vitepress' || name === 'public' || name === 'node_modules') continue
    const full = resolve(dir, name)
    if (statSync(full).isDirectory()) pagesUnder(full, out)
    else if (name.endsWith('.md') && name !== 'README.md') {
      const rel = full.slice(DOCS_DIR.length + 1).replace(/\\/g, '/')
      const noExt = rel.replace(/\.md$/, '')
      const route =
        noExt === 'index' ? '/' : noExt.endsWith('/index') ? `/${noExt.slice(0, -6)}/` : `/${noExt}`
      out.push({ route, file: full })
    }
  }
  return out
}

/** Group by the shape of the route, so families stay together. */
const SECTIONS: readonly { readonly text: string; readonly match: (r: string) => boolean }[] = [
  { text: 'Zeropoint digits', match: (r) => r.startsWith('/0/') },
  { text: 'A432 system', match: (r) => r.startsWith('/A432_') },
  { text: 'Quantum', match: (r) => r.startsWith('/QUANTUM_') },
  { text: 'Harmonics', match: (r) => /^\/(HARMONI|TRINITY_|TESLA_)/.test(r) },
  { text: 'Zeropoint reference', match: (r) => r.startsWith('/ZEROPOINT_') },
]

function computedSidebar() {
  const all = pagesUnder(DOCS_DIR)
  const curatedRoutes = new Set(CURATED.flatMap((g) => g.items.map((i) => i.link)))
  const taken = new Set(curatedRoutes)

  const sections = SECTIONS.map((s) => {
    const items = all
      .filter((p) => !taken.has(p.route) && s.match(p.route))
      .sort((a, b) => a.route.localeCompare(b.route))
      .map((p) => {
        taken.add(p.route)
        return { text: titleOf(p.file, p.route), link: p.route }
      })
    return { text: s.text, collapsed: true, items }
  }).filter((s) => s.items.length > 0)

  const rest = all
    .filter((p) => !taken.has(p.route) && p.route !== '/')
    .sort((a, b) => a.route.localeCompare(b.route))
    .map((p) => ({ text: titleOf(p.file, p.route), link: p.route }))

  return [
    ...CURATED,
    ...sections,
    ...(rest.length > 0 ? [{ text: 'Everything else', collapsed: true, items: rest }] : []),
  ]
}

export default defineConfig({
  title: 'ZeroPoint Node',
  description:
    'Vortex sequence, its reflection through the void, and the computed kernel that proves both.',
  // Sets <html lang>. A concrete signal for search engines and screen readers,
  // and the value echoed into og:locale / JSON-LD inLanguage below.
  lang: 'en-US',
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

  // Site-wide social/meta tags — only the ones that are identical on every page.
  // Everything page-specific (canonical, og:url/title/description/type,
  // article:modified_time, JSON-LD) is emitted per page in transformHead below.
  head: [
    ['meta', { property: 'og:site_name', content: 'ZeroPoint Node' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
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

  // Give every page its OWN description before the head is built. VitePress then
  // renders <meta name="description"> from this, and transformHead reuses it for
  // og/twitter — so a page with no frontmatter description is still indexed for
  // its own opening prose rather than the shared site tagline.
  transformPageData: (pageData) => {
    if (!pageData.description) {
      const excerpt = excerptFor(pageData.relativePath)
      if (excerpt) pageData.description = excerpt
    }
  },

  // Per-page SEO tags. Runs once per built page with that page's resolved data,
  // so each HTML file ships its own canonical URL, Open Graph/Twitter card, and
  // a JSON-LD record — the difference between every page reading as "ZeroPoint
  // Node" to a crawler and each page being indexed for what it actually says.
  transformHead: ({ pageData, siteData }) => {
    const url = pageUrl(pageData.relativePath)
    const title = pageData.title || siteData.title
    const description = pageData.description || siteData.description
    const isHome = pageData.relativePath === 'index.md'
    // lastUpdated is a ms timestamp when the git-backed option is on (it is).
    const modified = pageData.lastUpdated ? new Date(pageData.lastUpdated).toISOString() : undefined

    const tags: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
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
    if (!isHome && modified) {
      tags.push(['meta', { property: 'article:modified_time', content: modified }])
    }

    // Structured data: WebSite for the home page, TechArticle for every content
    // page. Gives search engines an explicit typed record (headline, dates,
    // canonical URL, publisher) instead of leaving them to infer it from markup.
    const jsonLd = isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteData.title,
          url: `${HOSTNAME}/`,
          description,
          inLanguage: 'en-US',
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: title,
          description,
          url,
          mainEntityOfPage: url,
          inLanguage: 'en-US',
          ...(modified ? { dateModified: modified } : {}),
          author: { '@type': 'Organization', name: 'ZeroPoint Node' },
          publisher: {
            '@type': 'Organization',
            name: 'ZeroPoint Node',
            url: `${HOSTNAME}/`,
          },
        }
    tags.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])

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
      { text: 'All docs', link: '/DOCUMENTATION_INDEX' },
      { text: 'Sponsor', link: SPONSOR_URL },
    ],

    sidebar: computedSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ceccec/zeropoint-node' },
      // Carbon Ads was considered and rejected: `carbonAds` loads Carbon's own
      // serve script from their CDN, so it cannot be pointed at another URL —
      // a placeholder code just fails to load, and a real one would put a
      // third-party tracker on every page of a site whose whole claim is that
      // its facts are locally recomputable. A plain link carries no script.
      { icon: { svg: SPONSOR_ICON }, link: SPONSOR_URL, ariaLabel: 'Sponsor this work' },
    ],

    search: { provider: 'local' },

    footer: {
      message:
        'Facts on this site are computed by the kernel — drift fails npm run check. ' +
        `<a href="${SPONSOR_URL}" rel="noopener">Sponsor this work</a> · ` +
        'Contact <a href="mailto:node@zeropoint.bg">node@zeropoint.bg</a>.',
      copyright: 'ZeroPoint Node · node.zeropoint.bg',
    },
  },
})
