#!/usr/bin/env node
/**
 * Replace ambient Math.* in all src HTML with inlined algebra (same laws as src/0/algebra).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC = join(ROOT, 'src')

const BOOT = `/* a432 algebra bootstrap — no ambient Math */
const PI=355/113,TAU=PI*2,E=2.718281828459045;
function imul(a,b){a=a|0;b=b|0;const ah=(a>>>16)&0xffff,al=a&0xffff,bh=(b>>>16)&0xffff,bl=b&0xffff;return((al*bl)+(((ah*bl+al*bh)<<16)>>>0))|0}
function abs(n){return n<0?-n:n}
function floor(n){const m=n%1;if(m===0||n!==n)return n;return n-m-(n<0?1:0)}
function ceil(n){const m=n%1;if(m===0||n!==n)return n;return n-m+(n>0?1:0)}
function round(n){return floor(n+0.5)}
function min(a,b){if(arguments.length===1)return a;let m=a<b?a:b;for(let i=2;i<arguments.length;i++)if(arguments[i]<m)m=arguments[i];return m}
function max(a,b){if(arguments.length===1)return a;let m=a>b?a:b;for(let i=2;i<arguments.length;i++)if(arguments[i]>m)m=arguments[i];return m}
function sin(x){let t=x%TAU;if(t>PI)t-=TAU;if(t<-PI)t+=TAU;let term=t,sum=t,t2=t*t;for(let i=1;i<=12;i++){term*=-t2/(2*i*(2*i+1));sum+=term}return sum}
function cos(x){let t=x%TAU;if(t>PI)t-=TAU;if(t<-PI)t+=TAU;let term=1,sum=1,t2=t*t;for(let i=1;i<=12;i++){term*=-t2/((2*i-1)*(2*i));sum+=term}return sum}
function tan(x){const c=cos(x);return c===0?(x>=0?1e16:-1e16):sin(x)/c}
function sqrt(n){if(n<=0)return 0;let x=n;for(let i=0;i<24;i++)x=0.5*(x+n/x);return x}
function pow(b,e){if(e===0)return 1;if(e===(e|0)&&abs(e)<40){let r=1,n=e<0?-e:e,x=b;while(n){if(n&1)r*=x;x*=x;n>>=1}return e<0?1/r:r}return exp(e*log(b))}
function exp(x){if(x>88)return Infinity;if(x<-88)return 0;const LN2=0.6931471805599453;const n=floor(x/LN2);const r=x-n*LN2;let term=1,sum=1;for(let i=1;i<=20;i++){term*=r/i;sum+=term}let p=sum;if(n>0)for(let i=0;i<n;i++)p*=2;else for(let i=0;i<-n;i++)p*=0.5;return p}
function log(n){if(n<=0)return NaN;const LN2=0.6931471805599453;let x=n,k=0;while(x>1.5){x*=0.5;k++}while(x<0.75){x*=2;k--}const y=(x-1)/(x+1),y2=y*y;let term=y,sum=y;for(let i=1;i<=24;i++){term*=y2;sum+=term/(2*i+1)}return 2*sum+k*LN2}
function log2(n){return log(n)/0.6931471805599453}
function hypot(a,b){return sqrt(a*a+(b||0)*(b||0))}
function unitFromSeed(seed){let h=0x811c9dc5>>>0;for(let i=0;i<seed.length;i++){h^=seed.charCodeAt(i);h=imul(h,0x01000193)>>>0}h=imul(h^(h>>>16),0x85ebca6b)>>>0;h=imul(h^(h>>>13),0xc2b2ae35)>>>0;return((h^(h>>>16))>>>0)%1e6/1e6}
function indexFromSeed(seed,length){if(length<=0)return 0;let h=0x811c9dc5>>>0;for(let i=0;i<seed.length;i++){h^=seed.charCodeAt(i);h=imul(h,0x01000193)>>>0}return(h>>>0)%length}
function legacyDigitalRoot(n){if(n===0)return 0;const r=((abs(n)%9)+9)%9;return r===0?9:r}
`

const MEMBERS = [
  'imul', 'abs', 'floor', 'ceil', 'round', 'min', 'max', 'sin', 'cos', 'tan',
  'sqrt', 'pow', 'log', 'log2', 'hypot', 'exp', 'PI', 'E',
]

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walkHtml(p, out)
    else if (name.endsWith('.html')) out.push(p)
  }
  return out
}

let files = 0
let ri = 0
for (const file of walkHtml(SRC)) {
  let src = readFileSync(file, 'utf8')
  if (!/\bMath\./.test(src)) continue
  const rel = relative(ROOT, file).replace(/\\/g, '/')

  src = src.replace(
    /\bMath\.floor\s*\(\s*Math\.random\s*\(\s*\)\s*\*\s*([^)]+?)\)/g,
    (_, len) => `indexFromSeed(${JSON.stringify(rel + ':fri:' + ri++)}, (${len})|0||1)`,
  )
  src = src.replace(/\bMath\.random\s*\(\s*\)/g, () => `unitFromSeed(${JSON.stringify(rel + ':rnd:' + ri++)})`)

  for (const m of MEMBERS) {
    src = src.replace(new RegExp(`\\bMath\\.${m}\\b`, 'g'), m)
  }

  if (!src.includes('a432 algebra bootstrap')) {
    src = src.replace(/<script(\s[^>]*)?>/i, (open) => `${open}\n${BOOT}\n`)
  }

  src = src.replace(/\b([a-zA-Z_][\w]*)\s*%\s*9\s*\|\|\s*9\b/g, 'legacyDigitalRoot($1)')
  src = src.replace(
    /\b([a-zA-Z_][\w]*)\s*%\s*9\s*===\s*0\s*\?\s*9\s*:\s*\1\s*%\s*9\b/g,
    'legacyDigitalRoot($1)',
  )

  writeFileSync(file, src)
  files++
  console.log(rel)
}
console.log(`html-algebra: ${files} files`)
