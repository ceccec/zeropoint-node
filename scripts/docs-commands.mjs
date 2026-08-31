#!/usr/bin/env node
/**
 * Every command in the documentation must name something that exists.
 *
 * docs/QUICK_START.md — the page a newcomer reads first — told them to clone
 * `github.com/your-username/zeropoint-node`, a placeholder, and then to run
 * three scripts. None of the three existed. Every command on the quick start
 * page failed, and it had been that way long enough for the scripts to be
 * deleted around it.
 *
 * This is a narrower question than "is the documentation correct", and that is
 * why it can be gated: a `node path/to/file` naming a file that is not there,
 * or an `npm run x` naming a script that is not in package.json, is wrong with
 * no interpretation required.
 *
 * It does not check that the command DOES what the page says, only that it can
 * be run at all. That is the floor, not the ceiling.
 *
 *   npm run docs:commands
 */
import {readFileSync, readdirSync, statSync, existsSync} from 'node:fs'
import {join, relative} from 'node:path'
const ROOT=process.cwd()
function walk(d,pred,out=[]){for(const n of readdirSync(d)){if(['node_modules','.git','dist','coverage'].includes(n))continue
  const f=join(d,n); if(statSync(f).isDirectory())walk(f,pred,out); else if(pred(n))out.push(f)}return out}
const pkg=JSON.parse(readFileSync('package.json','utf8'))
const scripts=new Set(Object.keys(pkg.scripts||{}))
const rows=[]
for(const f of walk(ROOT,n=>n.endsWith('.md'))){
  const rel=relative(ROOT,f).replace(/\\/g,'/')
  if(rel==='CHANGELOG.md')continue
  const t=readFileSync(f,'utf8')
  const bad=[]
  // Both patterns were anchored to ^\s*, so only a command on its own line was
  // checked. 73% of the command mentions in the docs are written inline, in
  // prose or in backticks, and every one of them was invisible: a bogus
  // `npm run nonsense` inside a sentence passed. Unanchored this covers 95
  // mentions instead of 26, and found nothing broken — the docs were accurate,
  // they were just mostly unverified.
  // node path/to/file
  for(const m of t.matchAll(/node\s+([^\s`'"]+\.(?:js|mjs|ts))/g))
    if(!existsSync(join(ROOT,m[1]))) bad.push('node '+m[1])
  // npm run <script>
  for(const m of t.matchAll(/npm run ([a-z0-9:_-]+)/g))
    if(!scripts.has(m[1])) bad.push('npm run '+m[1])
  if(bad.length) rows.push({rel, bad:[...new Set(bad)]})
}
rows.sort((a,b)=>b.bad.length-a.bad.length)
const tot=rows.reduce((s,r)=>s+r.bad.length,0)
console.log(`docs:commands — ${tot} command(s) in ${rows.length} doc(s) name something that does not exist`)
for (const r of rows) console.error(`  ✗ ${r.rel}: ${r.bad.join(', ')}`)
if (tot > 0) {
  console.error('docs:commands FAIL — a documented command that cannot run is worse than no example')
  process.exit(1)
}
console.log('docs:commands ok — every documented command names a file or script that exists')
process.exit(0)
