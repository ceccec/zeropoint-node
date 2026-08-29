#!/usr/bin/env node
/**
 * Every built page must be reachable, or declared unreachable on purpose.
 *
 * The site builds 71 pages and links 15 of them. The other 56 are sitemapped
 * and indexed but appear in neither nav nor sidebar, so a human browsing the
 * site cannot find them. Nothing noticed, because nothing was looking: the
 * dead-link check verifies that links point at pages, and this asks the
 * opposite question — whether pages have links pointing at them.
 *
 * That is the same shape as the entry-set bug the fold hit. A silent omission
 * in one direction: adding a page and never linking it is invisible, forever,
 * to every existing check.
 *
 * Three things are asserted:
 *
 *   1. every nav / sidebar link resolves to a page that exists. VitePress's
 *      dead-link checker reads MARKDOWN links; a broken link written in the
 *      config itself is not markdown and is not covered by it.
 *   2. every built page is either linked, or listed in `unlinked.json` with a
 *      reason. Unlinked is allowed — it has to be deliberate.
 *   3. every entry in `unlinked.json` names a page that still exists, so the
 *      list cannot rot into a set of excuses for pages that are long gone.
 *
 * The allowlist is seeded from the current state rather than hand-written,
 * exactly as the ratchet records its ceilings — the point is not to relitigate
 * 56 existing pages, it is that the 57th cannot appear unnoticed.
 *
 *   npm run pages:check   fail if a page is unlinked and undeclared
 *   npm run pages:seed    rewrite the allowlist from the current state
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import config from '../docs/.vitepress/config.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'docs')
const ALLOWLIST = join(DOCS, '.vitepress', 'unlinked.json')
const SEED = process.argv.includes('--seed')

// ---------------------------------------------------------------- the pages
const EXCLUDED = new Set(config.srcExclude ?? [])

function markdownFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.vitepress' || name === 'public' || name === 'node_modules') continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) markdownFiles(full, out)
    else if (name.endsWith('.md')) out.push(full)
  }
  return out
}

/** docs/pages/index.md -> /pages/ ; docs/SEQUENCE.md -> /SEQUENCE ; docs/index.md -> / */
function routeOf(file) {
  const rel = relative(DOCS, file).replace(/\\/g, '/')
  if (EXCLUDED.has(rel)) return null
  const noExt = rel.replace(/\.md$/, '')
  if (noExt === 'index') return '/'
  if (noExt.endsWith('/index')) return '/' + noExt.slice(0, -'/index'.length) + '/'
  return '/' + noExt
}

const pages = new Map() // route -> source file
for (const file of markdownFiles(DOCS)) {
  const route = routeOf(file)
  if (route !== null) pages.set(route, relative(ROOT, file))
}

// ---------------------------------------------------------------- the links
// Read from the CONFIG OBJECT. A regex over its text would miss a link built
// from a variable, which is the mistake that cost the fold eight modules.
const linked = new Set()
function collect(node) {
  if (!node) return
  if (Array.isArray(node)) { for (const n of node) collect(n); return }
  if (typeof node !== 'object') return
  if (typeof node.link === 'string' && !/^[a-z]+:/i.test(node.link)) {
    linked.add(node.link)
  }
  if (node.items) collect(node.items)
}
collect(config.themeConfig?.nav)
collect(config.themeConfig?.sidebar)

const allow = existsSync(ALLOWLIST) ? JSON.parse(readFileSync(ALLOWLIST, 'utf8')) : {}

// ------------------------------------------------------------------- seed
if (SEED) {
  const seeded = {}
  for (const [route, file] of [...pages].sort()) {
    if (linked.has(route)) continue
    seeded[route] = allow[route] ?? `built from ${file}; indexed and searchable, not in nav or sidebar`
  }
  writeFileSync(ALLOWLIST, JSON.stringify(seeded, null, 2) + '\n')
  console.log(`pages:seed wrote ${Object.keys(seeded).length} unlinked routes to ${relative(ROOT, ALLOWLIST)}`)
  process.exit(0)
}

// ------------------------------------------------------------------ check
const problems = []

// 1. a link in the config pointing at nothing
for (const link of linked) {
  if (!pages.has(link) && !pages.has(link.replace(/\/$/, ''))) {
    problems.push(`nav/sidebar links ${link}, which is not a built page`)
  }
}

// 2. a page nobody can reach and nobody declared
for (const [route, file] of pages) {
  if (linked.has(route)) continue
  if (route in allow) continue
  problems.push(`${file} builds to ${route} but is in neither nav, sidebar, nor unlinked.json`)
}

// 3. an allowlist entry for a page that no longer exists
for (const route of Object.keys(allow)) {
  if (!pages.has(route)) problems.push(`unlinked.json lists ${route}, which is no longer built`)
  if (linked.has(route)) problems.push(`unlinked.json lists ${route}, but it IS linked now — drop the entry`)
}

console.log(
  `pages:check — ${pages.size} pages, ${linked.size} linked, ${Object.keys(allow).length} declared unlinked`,
)
for (const p of problems) console.error(`  PROBLEM ${p}`)

if (problems.length > 0) {
  console.error(`pages:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('pages:check ok — every page is linked or declared, and every link resolves')
