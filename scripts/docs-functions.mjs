#!/usr/bin/env node
/**
 * Functions the documentation declares, that the source does not have.
 *
 * 100 of the 118 functions declared across 23 documents — 85% — appear nowhere
 * in src/. docs/USER_GUIDE.md declares 13 and is missing 11; QUICK_START
 * declared 4 and was missing all 4.
 *
 * Ratcheted rather than gated at zero. These are not one mistake, they are the
 * residue of a codebase that was reshaped — 147 modules were deleted in one
 * earlier pass — while the prose stayed where it was. Fixing them needs
 * judgement about what each document was for, and a gate at zero would only
 * force deletion of pages that still explain something real.
 *
 * The rule worth having now is that the number cannot grow: a new document
 * cannot describe a function that does not exist.
 *
 *   npm run docs:functions           report
 *   npm run docs:functions -- --count  the ratchet's number
 */
import {readFileSync, readdirSync, statSync} from 'node:fs'
import {join, relative} from 'node:path'
const ROOT=process.cwd()
function walk(d,pred,out=[]){for(const n of readdirSync(d)){if(['node_modules','.git','dist','coverage'].includes(n))continue
  const f=join(d,n); if(statSync(f).isDirectory())walk(f,pred,out); else if(pred(n))out.push(f)}return out}
// every identifier anywhere in the source
const names=new Set()
for(const f of walk(join(ROOT,'src'),n=>n.endsWith('.ts')&&!n.endsWith('.d.ts')))
  for(const m of readFileSync(f,'utf8').matchAll(/[A-Za-z_$][A-Za-z0-9_$]*/g)) names.add(m[0])
const rows=[]
for(const f of walk(ROOT,n=>n.endsWith('.md'))){
  const rel=relative(ROOT,f).replace(/\\/g,'/')
  if(rel==='CHANGELOG.md'||rel.startsWith('node_modules/'))continue
  const t=readFileSync(f,'utf8')
  // things declared as functions in fenced code, and headings that name one
  const decl=[...new Set([
    ...[...t.matchAll(/^(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_$]+)/gm)].map(m=>m[1]),
    ...[...t.matchAll(/^#{2,4}\s+`?([a-z][A-Za-z0-9_$]{3,})\(/gm)].map(m=>m[1]),
    ...[...t.matchAll(/^\s*[-*]\s+`([a-z][A-Za-z0-9_$]{3,})\(\)`/gm)].map(m=>m[1]),
  ])]
  if(decl.length===0)continue
  const absent=decl.filter(d=>!names.has(d))
  if(absent.length) rows.push({rel,decl:decl.length,absent})
}
rows.sort((a,b)=>b.absent.length-a.absent.length)
const td=rows.reduce((s,r)=>s+r.decl,0), ta=rows.reduce((s,r)=>s+r.absent.length,0)
if (process.argv.includes('--count')) { console.log(String(ta)); process.exit(0) }
console.log(`docs:functions — ${ta} declared function(s) across ${rows.length} doc(s) do not exist in src/`)
for (const r of rows.slice(0, 14)) {
  console.log('  ' + String(r.absent.length).padStart(3) + '/' + String(r.decl).padEnd(4) + ' ' +
    r.rel.replace('src/0/3/6/9/1/2/4/8/7/5/1/', 'a432dir/') + '   e.g. ' + r.absent.slice(0, 3).join(', '))
}
process.exit(0)
