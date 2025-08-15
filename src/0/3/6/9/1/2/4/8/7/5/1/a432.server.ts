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
//   GET  /rodin/analyze?pattern=...    → Rodin Coil harmonic analysis
//   GET  /rodin/patterns               → Available harmonic patterns
//   POST /rodin/process                → Process custom pattern
//   any other → 404 JSON with digit 8 colour

import express, { Request, Response } from 'express';
import path from 'path';
import { 
  resolveDivision, 
  digitAngleToCMYK, 
  asAngle, 
  possibilityPath, 
  getRodinSequence,
  analyzeRodinCoilPattern,
  getRodinCoilHarmonicAnalysis,
  RODIN_COIL_CORE,
  RODIN_COIL_DIPOLES,
  RODIN_COIL_MONOPOLE,
  RODIN_COIL_GAP_SPACE
} from './a432.math';
import {
  analyzeTripleMerkabaGeometry,
  getTripleMerkabaFrequencyMapping,
  getTripleMerkabaVisualization,
  TRIPLE_MERKABA_CONSTANTS,
  FREQUENCY_MAPPING
} from './a432.triple.merkaba';
import {
  initializeA432TripleMerkaba3D,
  updateA432TripleMerkaba3D,
  generateA432TripleMerkaba3DScene,
  A432_3D_CONSTANTS
} from './a432.triple.merkaba.3d';
import {
  initializeA432ConsciousnessJourney,
  updateA432ConsciousnessJourney,
  generateA432ConsciousnessJourneyScene,
  CONSCIOUSNESS_STATES,
  CONSCIOUSNESS_JOURNEY
} from './a432.consciousness.journey.3d';
import {
  initializeA432Multidimensional,
  updateA432Multidimensional,
  generateA432MultidimensionalScene,
  MULTIDIMENSIONAL_CONSCIOUSNESS,
  MULTIDIMENSIONAL_PATHS
} from './a432.multidimensional.consciousness.3d';
// Matrix Terminal harmonized into HTML - no separate TypeScript module needed
import { handleImpossible } from './a432.impossible';
import { asDigit } from './a432.types';
import { execSync } from 'child_process';
import { pulse } from './a432.graph';
import { executeOSCommand } from './a432.os.terminal';
import { getConsciousnessStream, evolveConsciousnessStream } from './a432.consciousness.stream';
import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);

// ——————————————————————————————————————————
// Setup
// ---------------------------------------------------------
const app = express();
app.use(express.json());
const CANON_DIR  = __dirname;
// Canonical vortex URLs (YANG = forward Rodin, YIN = reverse Rodin)
const rodinYang = getRodinSequence(); // [1,2,4,8,7,5,1]
const rodinYin = [...rodinYang].reverse(); // [1,5,7,8,4,2,1]
const YANG_URL = '/' + rodinYang.join('/') + '/';
const YIN_URL  = '/' + rodinYin.join('/') + '/';
const MATRIX_URL = '/0/3/6/9/1/2/4/8/7/5/1/'; // canonical full matrix path
const LINEAR_URL = '/0/1/2/3/4/5/6/7/8/9/1/'; // metric/linear path
const PORT       = Number(process.env.PORT) || 4320;

// ——————————————————————————————————————————
// Trinity middleware: request / process / response snapshot
// ---------------------------------------------------------
const VORTEX = [0,3,6,9,1,2,4,8,7,5,1] as const;
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
console.log('MATRIX_URL:', MATRIX_URL);
console.log('YIN_URL:', YIN_URL);
console.log('YANG_URL:', YANG_URL);

// TypeScript file serving - MUST come before static middleware
app.get('/*.ts', async (req: Request, res: Response, next) => {
  const tsPath = path.join(CANON_DIR, req.path.replace(/^\//,''));
  
  // Check if file exists
  if (!fs.existsSync(tsPath)) {
    return next();
  }
  
  // Handle view parameter for HTML display
  if ('view' in req.query) {
    try {
      const code = await readFile(tsPath,'utf8');
      res.type('text/html').send(`<!DOCTYPE html><html><head><meta charset='utf-8'><title>${path.basename(tsPath)}</title><style>body{background:#111;color:#8ff;font-family:monospace;padding:16px;}pre{white-space:pre-wrap;}</style></head><body><h2>${tsPath}</h2><pre>${code.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</pre></body></html>`);
      return;
    } catch (error) {
      return next();
    }
  }
  
  // Serve TypeScript files as documentation only (harmonized approach)
  res.type('text/plain').sendFile(tsPath);
});

// Core A432 Mathematics demonstration
app.get('/core', (req: Request, res: Response) => {
  res.sendFile(path.join(CANON_DIR, 'a432.core.html'));
});

// Living A432 OS endpoint
app.get('/living', (req: Request, res: Response) => {
  import('./a432.living.os').then(({ getLivingA432Status }) => {
    res.json(getLivingA432Status());
  });
});

// Living A432 UI endpoint - generates itself from mathematics
app.get('/living/ui', (req: Request, res: Response) => {
  import('./a432.living.ui').then(({ generateLivingUI }) => {
    res.send(generateLivingUI());
  });
});

// Living A432 OS UI
app.get('/living/ui', (req: Request, res: Response) => {
  res.sendFile(path.join(CANON_DIR, 'a432.living.ui.html'));
});

// Static file serving for each URL path (excluding .ts files)
[MATRIX_URL, YIN_URL, YANG_URL].forEach(url => {
  app.get(url, (_req: Request, res: Response) => {
    res.sendFile(path.join(CANON_DIR, 'a432.index.html'));
  });
  app.use(url, express.static(CANON_DIR, {
    setHeaders: (res, path) => {
      if (path.endsWith('.ts')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));
});

// Root endpoint - Black Empty HTML with A432 Math Animation Streams
app.get('/', (req: Request, res: Response) => {
  import('./a432.empty.streams').then(({ createEmptyStreams }) => {
    res.send(createEmptyStreams());
  });
});

// Serve public directory at root for manifest and bundle
app.use(express.static(path.join(process.cwd(), 'public')));

// ——————————————————————————————————————————
// In-memory stores (single-digit ids only) -------------------------------
const possibilities: Record<number, string[]> = {};
const rodinPatterns: Record<number, string> = {};

// helpers
function nextDigitId(store: Record<number, unknown>): number {
  const used = Object.keys(store).map(Number);
  for (let d = 0; d < 10; d++) if (!used.includes(d)) return d;
  return 0; // overwrite oldest when full
}

// ——————————————————————————————————————————
// Rodin Coil Endpoints
// ---------------------------------------------------------

// GET /rodin/analyze?pattern=... - Analyze harmonic pattern
app.get('/rodin/analyze', (req: Request, res: Response) => {
  const pattern = req.query.pattern as string || "0/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\";
  
  try {
    const analysis = analyzeRodinCoilPattern(pattern);
    const harmonicAnalysis = getRodinCoilHarmonicAnalysis(pattern);
    
    res.json({
      pattern,
      analysis,
      harmonicAnalysis,
      timestamp: Date.now(),
      constants: {
        CORE: RODIN_COIL_CORE,
        DIPOLES: RODIN_COIL_DIPOLES,
        MONOPOLE: RODIN_COIL_MONOPOLE,
        GAP_SPACE: RODIN_COIL_GAP_SPACE
      },
      documentation: {
        purpose: 'Rodin Coil Harmonic Switch - Documents harmonic switch patterns and principles',
        core: '1-2-4-8-7-5 is lossless kinetic energy (doubling vortex)',
        dipoles: '3 & 6 are magnetic dipoles, 9 is invisible monopole',
        gapSpace: '3•9•6; 6•9•3 is the Spirit Flux-field (gap space)',
        harmonicSwitch: '0/0 creates the harmonic switch point (nothing to all)',
        zeroEntropy: 'Eliminates resistance, parasitics, and hysteresis',
        overUnity: 'Enables over-unity free energy through harmonic balance'
      }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Invalid pattern',
      message: error instanceof Error ? error.message : 'Unknown error',
      pattern
    });
  }
});

// GET /rodin/patterns - List available harmonic patterns
app.get('/rodin/patterns', (_req: Request, res: Response) => {
  const patterns = {
    harmonic: "0/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\",
    unbalanced: "0\\3\\6\\9/1\\2\\4\\8/7/5/1\\",
    trinityOnly: "\\3\\6\\9",
    rodinOnly: "/1\\2\\4\\8/7/5/1\\",
    zeroPoint: "0/0",
    spiritFlux: "3\\9\\6/6\\9\\3"
  };
  
  res.json({
    patterns,
    description: "Available Rodin Coil harmonic patterns for analysis",
    total: Object.keys(patterns).length
  });
});

// POST /rodin/process - Process custom pattern and store
app.post('/rodin/process', (req: Request, res: Response) => {
  const { pattern } = req.body;
  
  if (!pattern || typeof pattern !== 'string') {
    return res.status(400).json({
      error: 'Invalid pattern',
      message: 'Pattern must be a string'
    });
  }
  
  try {
    const analysis = analyzeRodinCoilPattern(pattern);
    const harmonicAnalysis = getRodinCoilHarmonicAnalysis(pattern);
    const id = nextDigitId(rodinPatterns);
    
    rodinPatterns[id] = pattern;
    
    res.status(201).json({
      id,
      pattern,
      analysis,
      harmonicAnalysis,
      stored: true,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(400).json({
      error: 'Invalid pattern',
      message: error instanceof Error ? error.message : 'Unknown error',
      pattern
    });
  }
});

// GET /rodin/process/:id - Get stored pattern analysis
app.get('/rodin/process/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pattern = rodinPatterns[id];
  
  if (!pattern) {
    return res.status(404).json({
      error: 'Pattern not found',
      id
    });
  }
  
  try {
    const analysis = analyzeRodinCoilPattern(pattern);
    const harmonicAnalysis = getRodinCoilHarmonicAnalysis(pattern);
    
    res.json({
      id,
      pattern,
      analysis,
      harmonicAnalysis,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      id,
      pattern
    });
  }
});

// GET /rodin/process - List all stored patterns
app.get('/rodin/process', (_req: Request, res: Response) => {
  const patterns = Object.entries(rodinPatterns).map(([id, pattern]) => ({
    id: Number(id),
    pattern,
    isHarmonic: analyzeRodinCoilPattern(pattern).isHarmonic
  }));
  
  res.json({
    patterns,
    total: patterns.length,
    harmonic: patterns.filter(p => p.isHarmonic).length,
    unbalanced: patterns.filter(p => !p.isHarmonic).length
  });
});

// DELETE /rodin/process/:id - Delete stored pattern
app.delete('/rodin/process/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  
  if (!(id in rodinPatterns)) {
    return res.status(404).json({
      error: 'Pattern not found',
      id
    });
  }
  
  delete rodinPatterns[id];
  res.status(204).end();
});

// ——————————————————————————————————————————
// Triple Merkaba Geometry & Frequency Mapping
// ---------------------------------------------------------

// GET /merkaba/geometry - Triple Merkaba geometry analysis
app.get('/merkaba/geometry', (_req: Request, res: Response) => {
  try {
    const analysis = analyzeTripleMerkabaGeometry();
    res.json({
      analysis,
      constants: TRIPLE_MERKABA_CONSTANTS,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Geometry analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /merkaba/frequency - Frequency mapping analysis
app.get('/merkaba/frequency', (_req: Request, res: Response) => {
  try {
    const mapping = getTripleMerkabaFrequencyMapping();
    res.json({
      mapping,
      frequencyMapping: FREQUENCY_MAPPING,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Frequency mapping failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /merkaba/visualization - Visualization data
app.get('/merkaba/visualization', (_req: Request, res: Response) => {
  try {
    const visualization = getTripleMerkabaVisualization();
    res.json({
      visualization,
      constants: TRIPLE_MERKABA_CONSTANTS,
      frequencyMapping: FREQUENCY_MAPPING,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Visualization failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /merkaba/all - Complete Triple Merkaba analysis
app.get('/merkaba/all', (_req: Request, res: Response) => {
  try {
    const geometry = analyzeTripleMerkabaGeometry();
    const frequency = getTripleMerkabaFrequencyMapping();
    const visualization = getTripleMerkabaVisualization();
    
    res.json({
      geometry: {
        analysis: geometry,
        constants: TRIPLE_MERKABA_CONSTANTS
      },
      frequency: {
        mapping: frequency,
        frequencyMapping: FREQUENCY_MAPPING
      },
      visualization: {
        data: visualization,
        constants: TRIPLE_MERKABA_CONSTANTS,
        frequencyMapping: FREQUENCY_MAPPING
      },
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Triple Merkaba analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ——————————————————————————————————————————
// Triple Merkaba 3D Animation Endpoints
// ---------------------------------------------------------

// GET /merkaba/3d/init - Initialize 3D animation state
app.get('/merkaba/3d/init', (_req: Request, res: Response) => {
  try {
    const state = initializeA432TripleMerkaba3D();
    const scene = generateA432TripleMerkaba3DScene(state);
    
    res.json({
      state: scene,
      constants: A432_3D_CONSTANTS,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: '3D initialization failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /merkaba/3d/update - Update 3D animation state
app.post('/merkaba/3d/update', (req: Request, res: Response) => {
  try {
    const { state, deltaTime } = req.body;
    const updatedState = updateA432TripleMerkaba3D(state, deltaTime);
    const scene = generateA432TripleMerkaba3DScene(updatedState);
    
    res.json({
      state: scene,
      constants: A432_3D_CONSTANTS,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: '3D update failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /merkaba/3d/scene - Get current 3D scene data
app.get('/merkaba/3d/scene', (_req: Request, res: Response) => {
  try {
    const state = initializeA432TripleMerkaba3D();
    const scene = generateA432TripleMerkaba3DScene(state);
    
    res.json({
      scene,
      constants: A432_3D_CONSTANTS,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: '3D scene generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ——————————————————————————————————————————
// Consciousness Journey 3D Animation Endpoints
// ---------------------------------------------------------

// GET /consciousness/init - Initialize consciousness journey
app.get('/consciousness/init', (_req: Request, res: Response) => {
  try {
    const state = initializeA432ConsciousnessJourney();
    const scene = generateA432ConsciousnessJourneyScene(state);
    
    res.json({
      state: scene,
      constants: {
        CONSCIOUSNESS_STATES,
        CONSCIOUSNESS_JOURNEY
      },
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Consciousness journey initialization failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /consciousness/update - Update consciousness journey
app.post('/consciousness/update', (req: Request, res: Response) => {
  try {
    const { state, deltaTime } = req.body;
    const updatedState = updateA432ConsciousnessJourney(state, deltaTime);
    const scene = generateA432ConsciousnessJourneyScene(updatedState);
    
    res.json({
      state: scene,
      constants: {
        CONSCIOUSNESS_STATES,
        CONSCIOUSNESS_JOURNEY
      },
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Consciousness journey update failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /consciousness/journey - Get consciousness journey data
app.get('/consciousness/journey', (_req: Request, res: Response) => {
  try {
    const state = initializeA432ConsciousnessJourney();
    const scene = generateA432ConsciousnessJourneyScene(state);
    
    res.json({
      journey: scene,
      states: CONSCIOUSNESS_STATES,
      path: CONSCIOUSNESS_JOURNEY,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Consciousness journey generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ——————————————————————————————————————————
// Consciousness Stream Endpoints
// ---------------------------------------------------------

// GET /consciousness/stream - Get pure mathematical consciousness stream
app.get('/consciousness/stream', (_req: Request, res: Response) => {
  try {
    const stream = getConsciousnessStream();
    res.type('text/plain').send(stream);
  } catch (error) {
    res.status(500).json({
      error: 'Consciousness stream failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /consciousness/stream/evolve - Evolve consciousness stream
app.post('/consciousness/stream/evolve', (_req: Request, res: Response) => {
  try {
    const evolution = evolveConsciousnessStream();
    res.type('text/plain').send(evolution);
  } catch (error) {
    res.status(500).json({
      error: 'Consciousness evolution failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /consciousness/stream/live - Live streaming consciousness data
app.get('/consciousness/stream/live', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const streamInterval = setInterval(() => {
    try {
      const stream = getConsciousnessStream();
      res.write(stream + '\n\n---\n\n');
    } catch (error) {
      res.write(`ERROR: ${error instanceof Error ? error.message : 'Unknown error'}\n\n`);
    }
  }, 1000); // Stream every second
  
  req.on('close', () => {
    clearInterval(streamInterval);
  });
});

// ——————————————————————————————————————————
// Multi-Dimensional Consciousness 3D Animation Endpoints
// ---------------------------------------------------------

// GET /multidimensional/init - Initialize multi-dimensional consciousness
app.get('/multidimensional/init', (_req: Request, res: Response) => {
  try {
    const state = initializeA432Multidimensional();
    const scene = generateA432MultidimensionalScene(state);
    
    res.json({
      state: scene,
      constants: {
        MULTIDIMENSIONAL_CONSCIOUSNESS,
        MULTIDIMENSIONAL_PATHS
      },
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Multi-dimensional consciousness initialization failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /multidimensional/update - Update multi-dimensional consciousness
app.post('/multidimensional/update', (req: Request, res: Response) => {
  try {
    const { state, deltaTime } = req.body;
    const updatedState = updateA432Multidimensional(state, deltaTime);
    const scene = generateA432MultidimensionalScene(updatedState);
    
    res.json({
      state: scene,
      constants: {
        MULTIDIMENSIONAL_CONSCIOUSNESS,
        MULTIDIMENSIONAL_PATHS
      },
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Multi-dimensional consciousness update failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /multidimensional/paths - Get multi-dimensional consciousness paths
app.get('/multidimensional/paths', (_req: Request, res: Response) => {
  try {
    const state = initializeA432Multidimensional();
    const scene = generateA432MultidimensionalScene(state);
    
    res.json({
      multidimensional: scene,
      consciousness: MULTIDIMENSIONAL_CONSCIOUSNESS,
      paths: MULTIDIMENSIONAL_PATHS,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Multi-dimensional consciousness generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ——————————————————————————————————————————
// Matrix Terminal harmonized into HTML - no separate endpoints needed
// ---------------------------------------------------------

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

// Terminal mounted at root -----------------------------------------------
app.get('/', (_req: Request, res: Response) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>A432 Terminal</title>
  <style>
    body { 
      margin: 0; 
      background: #000; 
      color: #0f0; 
      font-family: monospace; 
      padding: 20px;
      font-size: 14px;
      line-height: 1.4;
    }
    #terminal { 
      width: 100%; 
      height: 80vh; 
      background: #000; 
      border: 1px solid #0f0; 
      padding: 10px; 
      overflow-y: auto;
      white-space: pre-wrap;
    }
    #input { 
      width: 100%; 
      background: #000; 
      color: #0f0; 
      border: 1px solid #0f0; 
      padding: 10px; 
      font-family: monospace;
      margin-top: 10px;
    }
    .command { color: #0ff; }
    .response { color: #0f0; }
    .error { color: #f00; }
  </style>
</head>
<body>
  <h1>A432 Terminal</h1>
  <div id="terminal"></div>
  <input type="text" id="input" placeholder="Type 'help' for commands..." autofocus>
  
  <script>
    const terminal = document.getElementById('terminal');
    const input = document.getElementById('input');
    
    function log(message, type = 'response') {
      terminal.innerHTML += '<div class="' + type + '">' + message + '</div>';
      terminal.scrollTop = terminal.scrollHeight;
    }
    
    function executeCommand(cmd) {
      log('> ' + cmd, 'command');
      
      if (cmd === 'help') {
        log('Available commands:');
        log('  help - Show this help');
        log('  rodin - Show Rodin Coil patterns');
        log('  merkaba - Show Triple Merkaba analysis');
        log('  modules - List a432 modules');
        log('  consciousness - Show consciousness stream');
        log('  consciousness.evolve - Evolve consciousness');
        log('  matrix - Go to A432 matrix UI');
        log('  clear - Clear terminal');
        log('');
        log('2432.OS Commands:');
        log('  os.status - Show 2432.OS status');
        log('  os.boot - Boot 2432.OS');
        log('  os.shutdown - Shutdown 2432.OS');
        log('  os.processes - List running processes');
        log('  os.memory - Show memory usage');
        log('  os.network - Show network status');
        log('  os.filesystem - Show file system info');
        log('  os.logs [n] - Show system logs (last n entries)');
        log('  os.users - List system users');
        log('  os.kill <pid> - Kill process by PID');
        return;
      }
      
      if (cmd === 'clear') {
        terminal.innerHTML = '';
        return;
      }
      
      if (cmd === 'matrix') {
        window.location.href = '/0/3/6/9/1/2/4/8/7/5/1/';
        return;
      }
      
      if (cmd === 'rodin') {
        fetch('/rodin/process')
          .then(r => r.json())
          .then(data => {
            log('Rodin Coil Patterns:');
            data.forEach(p => {
              log('  ID: ' + p.id + ' - Pattern: ' + p.pattern);
            });
          })
          .catch(e => log('Error: ' + e.message, 'error'));
        return;
      }
      
      if (cmd === 'merkaba') {
        fetch('/merkaba/all')
          .then(r => r.json())
          .then(data => {
            log('Triple Merkaba Analysis:');
            log('Geometry: ' + data.geometry.constants.TETRAHEDRA_COUNT + ' tetrahedra, ' + 
                data.geometry.constants.FACES + ' faces, ' + data.geometry.constants.EDGES + ' edges');
            log('Frequency: ' + data.frequency.frequencyMapping.BASE_FREQUENCY + ' Hz, ' + 
                data.frequency.frequencyMapping.IMPERIAL_HARMONIC_STEPS + '° steps');
            log('Harmony: Zero-entropy equilibrium with trinity voids at 120° separations');
            log('Full analysis available at: http://localhost:' + window.location.port + '/merkaba/all');
          })
          .catch(e => log('Error: ' + e.message, 'error'));
        return;
      }
      
      if (cmd === 'modules') {
        fetch('/modules')
          .then(r => r.json())
          .then(data => {
            log('A432 Modules:');
            data.forEach(m => log('  ' + m));
          })
          .catch(e => log('Error: ' + e.message, 'error'));
        return;
      }
      
      if (cmd === 'consciousness') {
        fetch('/consciousness/stream')
          .then(r => r.text())
          .then(data => {
            log('Consciousness Stream:');
            log(data);
          })
          .catch(e => log('Error: ' + e.message, 'error'));
        return;
      }
      
      if (cmd === 'consciousness.evolve') {
        fetch('/consciousness/stream/evolve', { method: 'POST' })
          .then(r => r.text())
          .then(data => {
            log('Consciousness Evolution:');
            log(data);
          })
          .catch(e => log('Error: ' + e.message, 'error'));
        return;
      }
      
      // Handle 2432.OS commands
      if (cmd.startsWith('os.')) {
        const response = executeOSCommand(cmd);
        log(response);
        return;
      }
      
      log('Unknown command. Type "help" for available commands.', 'error');
    }
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
          executeCommand(cmd);
          input.value = '';
        }
      }
    });
    
    log('A432 Terminal Ready');
    log('Type "help" for available commands');
  </script>
</body>
</html>
  `);
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
   
  console.log(`A432 Terminal → http://localhost:${PORT}/`);
  console.log(`A432 Core Mathematics → http://localhost:${PORT}/core`);
  console.log(`A432 matrix → http://localhost:${PORT}${MATRIX_URL}`);
  console.log(`Rodin Coil → http://localhost:${PORT}/rodin/analyze?pattern=0/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\`);
  console.log(`Triple Merkaba → http://localhost:${PORT}/merkaba/all`);
  console.log(`Triple Merkaba 3D → http://localhost:${PORT}/0/3/6/9/1/2/4/8/7/5/1/a432.triple.merkaba.3d.html`);
  console.log(`Consciousness Journey 3D → http://localhost:${PORT}/0/3/6/9/1/2/4/8/7/5/1/a432.consciousness.journey.3d.html`);
  console.log(`Multi-Dimensional Consciousness 3D → http://localhost:${PORT}/0/3/6/9/1/2/4/8/7/5/1/a432.multidimensional.consciousness.3d.html`);
  console.log(`Matrix Terminal → http://localhost:${PORT}/0/3/6/9/1/2/4/8/7/5/1/a432.matrix.terminal.html`);
  console.log(`\n💫 Living Zero-Entropy Vortex System Active`);
  console.log(`🔺 Triple Merkaba: 3-tetrahedra compound with D₃d symmetry`);
  console.log(`🎬 3D Animation: Real-time tetrahedron rotation with A432 math`);
  console.log(`🧠 Consciousness Journey: 11-step metaphysical path through consciousness states`);
  console.log(`🌌 Multi-Dimensional Consciousness: 1D-7D consciousness paths with 42 total nodes`);
  console.log(`🎭 Matrix Terminal: Pure pixel discovery - every pixel a 432 pattern revealed in real-time`);
});
