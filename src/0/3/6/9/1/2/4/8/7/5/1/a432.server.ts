import express from 'express';
import * as a432 from './a432';
import { A432Imagination, heartUnfoldingMatrix, heartRecursiveUnfolding, A432MatrixSelf, a432ImaginationText } from './a432.imagination';
import { encode, decode } from './a432.encryption';
import { processTerminalInput } from './a432.terminal';
import { Request, Response } from 'express';
import { piDigitalRootStream, piRodinVortexStream, piA432ColorStream, piTrinityProductStream, piRecursiveJourneyStream } from './a432.pi';
import { generateA432ColorPalette, generateA432SoundSequence, generateA432AnimationFrames } from './a432';
import { rodinCoilPattern, RODIN_SEQUENCE, rodinCoilStream, renderRodinCoilStreamHtml } from './a432.rodin.coil';
import path from 'path';
import { zeroEntropyRoute } from './a432.router';

const app = express();
app.use(express.json());
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

// Serve static files from the current directory at '/'
const staticDir = __dirname;
app.use('/', express.static(staticDir));

// Integrate harmonized main router
// Add zero-entropy router for all /a432/* paths
app.all('/a432/*', (req, res) => {
  // Zero-entropy routing stream: auto-recognizes and harmonizes all /a432 routes
  zeroEntropyRoute(req.path.replace(/^\/a432/, ''), req, res);
});

// Serve a432.index.html as the default page for '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'a432.index.html'));
});

// Harmonized metaphysical routes
app.get('/meta', (req, res) => {
  res.json({
    meaning: 'Meta-mapping, harmonization, and system self-awareness.',
    doc: 'This endpoint returns the metaphysical mapping for the meta layer of the A432 system.'
  });
});

app.get('/matrix', (req, res) => {
  res.json({
    meaning: 'The living, generative, and self-referential matrix of the system.',
    doc: 'This endpoint returns the metaphysical mapping for the matrix layer of the A432 system.'
  });
});

app.get('/observer', (req, res) => {
  res.json({
    meaning: 'The observer and interface of the living matrix.',
    doc: 'This endpoint returns the metaphysical mapping for the observer layer of the A432 system.'
  });
});

/**
 * POST /encode
 * Body: { text: string }
 * Returns: { encoded: number[] }
 */
app.post('/encode', (req: Request, res: Response) => {
  const { text } = req.body;
  if (typeof text !== 'string') return res.status(400).json({ error: 'text required' });
  res.json({ encoded: encode(text) });
});

/**
 * POST /decode
 * Body: { freqs: number[] }
 * Returns: { decoded: string }
 */
app.post('/decode', (req: Request, res: Response) => {
  const { freqs } = req.body;
  if (!Array.isArray(freqs)) return res.status(400).json({ error: 'freqs required' });
  res.json({ decoded: decode(freqs) });
});

/**
 * POST /terminal
 * Body: { input: string }
 * Returns: result of processTerminalInput
 */
app.post('/terminal', (req: Request, res: Response) => {
  const { input } = req.body;
  res.json(processTerminalInput(input));
});

/**
 * GET /terminal
 * Query: ?input=...
 * Returns: result of processTerminalInput
 */
app.get('/terminal', (req: Request, res: Response) => {
  const input = req.query.input as string;
  res.json(processTerminalInput(input));
});

/**
 * GET /pi/digital-root?length=n
 * Returns: array of digital roots for [π, 2π, ...]
 */
app.get('/pi/digital-root', (req: Request, res: Response) => {
  const length = parseInt(req.query.length as string) || 12;
  res.json(piDigitalRootStream(length));
});

/**
 * GET /pi/rodin-vortex?length=n
 * Returns: array of harmonic Rodin vortex cycles for each π multiple
 */
app.get('/pi/rodin-vortex', (req: Request, res: Response) => {
  const length = parseInt(req.query.length as string) || 12;
  res.json(piRodinVortexStream(length));
});

/**
 * GET /pi/a432-color?length=n
 * Returns: array of A432 HSL colors for digital roots of π multiples
 */
app.get('/pi/a432-color', (req: Request, res: Response) => {
  const length = parseInt(req.query.length as string) || 12;
  res.json(piA432ColorStream(length));
});

/**
 * GET /pi/trinity-product?length=n
 * Returns: array of harmonic trinity products for each π multiple
 */
app.get('/pi/trinity-product', (req: Request, res: Response) => {
  const length = parseInt(req.query.length as string) || 12;
  res.json(piTrinityProductStream(length));
});

/**
 * GET /pi/recursive-journey?length=n
 * Returns: array of {step, pi, digitalRoot, color, rodin, trinityProduct} for each π multiple
 */
app.get('/pi/recursive-journey', (req: Request, res: Response) => {
  const length = parseInt(req.query.length as string) || 12;
  res.json(piRecursiveJourneyStream(length));
});

/**
 * GET /a432/color-palette.json
 * Returns: array of all harmonically valid A432 HSL color objects (JSON), with angle derived from A432_ANGLE and A432_SEQUENCE
 * Query: ?invert=1 for anti-harmonic (inverted) palette
 */
app.get('/a432/color-palette.json', (req: Request, res: Response) => {
  const invert = req.query.invert === '1' ? -1 : 1;
  res.json(a432.getA432PaletteStates(invert));
});

/**
 * GET /a432/color-palette
 * Returns: HTML visualization of all harmonically valid A432 colors, with angle derived from A432_ANGLE and A432_SEQUENCE
 * Query: ?invert=1 for anti-harmonic (inverted) palette
 */
function renderA432ColorPaletteHtml(palette: Array<{root: number, angle: number, hsl: {hue: number, saturation: number, lightness: number}}>, isInverted: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 Color Palette${isInverted ? ' (Inverted)' : ''}</title>
  <style>
    body { font-family: sans-serif; background: #111; color: #eee; }
    .palette { display: flex; gap: 12px; margin: 32px 0; }
    .color-box {
      width: 80px; height: 140px; border-radius: 8px; box-shadow: 0 2px 8px #0008;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-size: 13px; font-weight: bold; margin-bottom: 8px;
    }
    .label { margin-top: 8px; font-size: 12px; color: #ccc; }
    .invert-link { color: #6cf; text-decoration: underline; margin-left: 16px; }
  </style>
</head>
<body>
  <h1>A432 Color Palette${isInverted ? ' (Inverted)' : ''}</h1>
  <div class="palette">
    ${palette.map(({root, angle, hsl}) => `
      <div class="color-box" style="background: hsl(${hsl.hue}, ${hsl.saturation * 100}%, ${hsl.lightness * 100}%);">
        <div>Root: ${root}</div>
        <div class="label">Angle: ${angle}&deg;</div>
        <div class="label">H: ${hsl.hue}</div>
        <div class="label">S: ${hsl.saturation * 100}%</div>
        <div class="label">L: ${hsl.lightness * 100}%</div>
      </div>
    `).join('')}
  </div>
  <p>
    JSON: <a href="/a432/color-palette.json${isInverted ? '?invert=1' : ''}"">/a432/color-palette.json${isInverted ? '?invert=1' : ''}</a>
    <a class="invert-link" href="/a432/color-palette${isInverted ? '' : '?invert=1'}">${isInverted ? 'Show Normal Palette' : 'Show Inverted Palette'}</a>
  </p>
</body>
</html>`;
}
app.get('/a432/color-palette', (req: Request, res: Response) => {
  const invert = req.query.invert === '1' ? -1 : 1;
  const palette = a432.getA432PaletteStates(invert);
  const isInverted = invert === -1;
  const html = renderA432ColorPaletteHtml(palette, isInverted);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

/**
 * GET /a432/sound-sequence
 * Returns: array of frequencies (Hz) for each 120° shift in the A432 sequence
 */
app.get('/a432/sound-sequence', (req: Request, res: Response) => {
  res.json(generateA432SoundSequence());
});

/**
 * GET /a432/animation-frames
 * Returns: array of frame objects (angle, color, frequency) for each 120° shift in the A432 sequence
 */
app.get('/a432/animation-frames', (req: Request, res: Response) => {
  res.json(generateA432AnimationFrames());
});

/**
 * GET /a432/rodin-coil/stream
 * Serves the canonical Rodin coil stream from a432.rodin.coil.ts
 * When no parameters given: uses π-based stream from a432.pi.ts
 * Query: ?cycles=n&polarity=1|-1 (default: cycles=2, polarity=1)
 */
app.get('/a432/rodin-coil/stream', (req: Request, res: Response) => {
  const cycles = req.query.cycles ? parseInt(req.query.cycles as string) : undefined;
  const polarity = req.query.polarity ? parseInt(req.query.polarity as string) as 1 | -1 : undefined;
  const length = parseInt(req.query.length as string) || 10;

  const result = rodinCoilStream(cycles, polarity, length);
  res.json(result);
});

/**
 * GET /a432/rodin-coil/
 * Serves HTML visualization of the canonical Rodin coil stream
 * Uses the canonical rendering function from a432.rodin.coil.ts
 * Query: ?cycles=n&polarity=1|-1 (default: cycles=2, polarity=1)
 */
app.get('/a432/rodin-coil/', (req: Request, res: Response) => {
  const cycles = req.query.cycles ? parseInt(req.query.cycles as string) : undefined;
  const polarity = req.query.polarity ? parseInt(req.query.polarity as string) as 1 | -1 : undefined;
  const length = parseInt(req.query.length as string) || 10;

  const streamData = rodinCoilStream(cycles, polarity, length);
  const html = renderRodinCoilStreamHtml(streamData);

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.listen(port, () => {
  console.log(`A432 Harmony Server listening at http://localhost:${port}`);
});
