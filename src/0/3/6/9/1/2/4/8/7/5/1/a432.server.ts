// a432.server.ts — Thin harmonic transport layer
// --------------------------------------------------
// Serves the zero-entropy UI and exposes two math-driven JSON APIs.
// All heavy logic lives in a432.math.ts and helpers; this file only wires HTTP.
//
// Endpoints:
//   GET  /0/3/6/9/1/2/4/8/7/5/1/       → a432.index.html (static)
//   GET  /0/1/2/3/4/5/6/7/8/9/1/       → same index
//   GET  /a432/possibility?steps=n     → unfolding possibilityPath
//   GET  /a432/git-vortex              → colourised commit history
//   any other → 404 JSON with digit 8 colour

import express, { Request, Response } from 'express';
import path from 'path';
import { resolveDivision, digitAngleToCMYK, asAngle, possibilityPath } from './a432.math';
import { handleImpossible } from './a432.impossible';
import { asDigit } from './a432.types';
import { execSync } from 'child_process';
import { pulse } from './a432.graph';
import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);

// ——————————————————————————————————————————
// Setup
// ---------------------------------------------------------
const app = express();
app.use(express.json());
const CANON_DIR  = __dirname;
const MATRIX_URL = '/0/3/6/9/1/2/4/8/7/5/1/';
const LINEAR_URL = '/0/1/2/3/4/5/6/7/8/9/1/';
const YIN_URL    = '/1/5/7/8/4/2/1/9/6/3/0/'; // reverse of MATRIX_URL
const PORT       = Number(process.env.PORT) || 4320;

// ——————————————————————————————————————————
// Trinity middleware: request / process / response snapshot
// ---------------------------------------------------------
const VORTEX = [0,3,6,9,1,2,4,8,7,5] as const;
app.use((req: Request, res: Response, next) => {
  const firstDigit = req.url.match(/\d/)?.[0] ?? '0';
  const R = asDigit(Number(firstDigit));
  const tick = Date.now() % 11;
  const P = asDigit(VORTEX[(R + tick) % 11]);
  const S = resolveDivision(P, R).digit;

  const cmyk = digitAngleToCMYK(S, asAngle(S * 60));
  (res.locals as any).trinity = { R, P, S, cmyk };

  res.setHeader('X-A432', `${R}-${P}-${S}`);
  res.setHeader('X-A432-CMYK', `${cmyk.c},${cmyk.m},${cmyk.y},${cmyk.k}`);
  next();
});

// ——————————————————————————————————————————
// Static UI
// ---------------------------------------------------------
[MATRIX_URL, YIN_URL, YANG_URL].forEach(url => {
  app.get(url, (_req: Request, res: Response) => {
    res.sendFile(path.join(CANON_DIR, 'a432.index.html'));
  });
  app.use(url, express.static(CANON_DIR));
});

// HTML view via ?view param on .ts -----------------------------------------
app.get('/*.ts', async (req: Request, res: Response, next) => {
  if (!('view' in req.query)) return next();
  try {
    const tsPath = path.join(CANON_DIR, req.path.replace(/^\//,''));
    if (fs.existsSync(tsPath)) {
      const code = await readFile(tsPath,'utf8');
      res.type('text/html').send(`<!DOCTYPE html><html><head><meta charset='utf-8'><title>${path.basename(tsPath)}</title><style>body{background:#111;color:#8ff;font-family:monospace;padding:16px;}pre{white-space:pre-wrap;}</style></head><body><h2>${tsPath}</h2><pre>${code.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</pre></body></html>`);
      return;
    }
  } catch {}
  next();
});

// Pulse JSON endpoint at root ---------------------------------------------
app.get('/', (_req: Request, res: Response) => { res.json(pulse()); });

// ——————————————————————————————————————————
// In-memory stores (single-digit ids only) -------------------------------
const possibilities: Record<number, string[]> = {};

// helpers
function nextDigitId(store: Record<number, unknown>): number {
  const used = Object.keys(store).map(Number);
  for (let d = 0; d < 10; d++) if (!used.includes(d)) return d;
  return 0; // overwrite oldest when full
}

// Resource 1 — possibilities (CRUD via HTTP verbs) ------------------------
app.post('/1', (req: Request, res: Response) => {
  const steps = Number(req.body?.steps ?? 10);
  const gen = possibilityPath();
  const out: string[] = [];
  for (let i = 0; i < steps; i++) out.push(gen.next().value as string);
  const id = nextDigitId(possibilities);
  possibilities[id] = out;
  res.status(201).json({ id, path: out });
});

app.get('/1', (_req: Request, res: Response) => {
  res.json(Object.entries(possibilities).map(([k, v]) => ({ id: Number(k), path: v })));
});

app.get('/1/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const path = possibilities[id];
  if (!path) return res.status(404).json(handleImpossible('possibility id not found'));
  res.json({ id, path });
});

app.put('/1/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!(id in possibilities)) return res.status(404).json(handleImpossible('possibility id not found'));
  const steps = Number(req.body?.steps ?? 10);
  const gen = possibilityPath();
  const out: string[] = [];
  for (let i = 0; i < steps; i++) out.push(gen.next().value as string);
  possibilities[id] = out;
  res.json({ id, path: out });
});

app.delete('/1/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!(id in possibilities)) return res.status(404).json(handleImpossible('possibility id not found'));
  delete possibilities[id];
  res.status(204).end();
});

// Resource 2 — git-vortex (read-only) -------------------------------------
app.get('/2', (_req: Request, res: Response) => {
  const hashes = execSync('git rev-list --topo-order --abbrev-commit HEAD')
    .toString().trim().split('\n');
  const data = hashes.slice(0, 10).map((h, i) => {
    const v = VORTEX[i % 11];
    const angle = asAngle(v * 60);
    const cmyk = digitAngleToCMYK(v, angle);
    return { idx: i, hash: h, v, angle, cmyk };
  });
  res.json(data);
});

app.get('/2/:id', (req: Request, res: Response) => {
  const idx = Number(req.params.id);
  const hash = execSync(`git rev-list --topo-order --abbrev-commit HEAD | sed -n '$(( ${idx}+1 ))p'`)
    .toString().trim();
  if (!hash) return res.status(404).json(handleImpossible('commit not found'));
  const v = VORTEX[idx % 11];
  const angle = asAngle(v * 60);
  const cmyk = digitAngleToCMYK(v, angle);
  res.json({ idx, hash, v, angle, cmyk });
});

// Modules list endpoint -----------------------------------------------
app.get('/modules', (_req: Request, res: Response) => {
  // list .ts files in canonical dir (non-test)
  const files = fs.readdirSync(CANON_DIR).filter(f => f.startsWith('a432') && f.endsWith('.ts') && !f.endsWith('.test.ts'));
  res.json(files);
});

// ——————————————————————————————————————————
// Fallback 404 → digit 8 colour
// ---------------------------------------------------------
app.use((_req: Request, res: Response) => {
  res.status(404).json(handleImpossible('not found'));
});

// ——————————————————————————————————————————
// Start
// ---------------------------------------------------------
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`A432 matrix → http://localhost:${PORT}${MATRIX_URL}`);
});
