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
import ts from 'typescript'
import {join, relative} from 'node:path'
const ROOT=process.cwd()
function walk(d,pred,out=[]){for(const n of readdirSync(d)){if(['node_modules','.git','dist','coverage'].includes(n))continue
  const f=join(d,n); if(statSync(f).isDirectory())walk(f,pred,out); else if(pred(n))out.push(f)}return out}
// Every name src/ actually DECLARES as something callable.
//
// This used to collect every identifier anywhere in src/, which meant a name
// written once in a comment counted as implemented. 21 documented functions
// were "present" on that rule while existing nowhere but prose, and the number
// this script prints was 91 when the honest answer was 112. I benefited from
// the flaw myself: implementing two specified functions moved the count by one,
// because one of the names was already sitting in a comment.
//
// The names are taken from the TypeScript AST now — declarations, not text —
// so a mention cannot satisfy a claim that something exists.
const names=new Set()
const collect=(node)=>{
  if(ts.isFunctionDeclaration(node)&&node.name) names.add(node.name.text)
  if(ts.isClassDeclaration(node)&&node.name) names.add(node.name.text)
  if(ts.isInterfaceDeclaration(node)&&node.name) names.add(node.name.text)
  if(ts.isTypeAliasDeclaration(node)&&node.name) names.add(node.name.text)
  if(ts.isEnumDeclaration(node)&&node.name) names.add(node.name.text)
  if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)) names.add(node.name.text)
  if((ts.isMethodDeclaration(node)||ts.isMethodSignature(node))&&node.name&&ts.isIdentifier(node.name)) names.add(node.name.text)
  if(ts.isPropertyAssignment(node)&&ts.isIdentifier(node.name)&&node.initializer&&
     (ts.isArrowFunction(node.initializer)||ts.isFunctionExpression(node.initializer))) names.add(node.name.text)
  if(ts.isPropertyDeclaration(node)&&ts.isIdentifier(node.name)) names.add(node.name.text)
  ts.forEachChild(node,collect)
}
for(const f of walk(join(ROOT,'src'),n=>n.endsWith('.ts')&&!n.endsWith('.d.ts')))
  collect(ts.createSourceFile(f,readFileSync(f,'utf8'),ts.ScriptTarget.Latest,true))
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
