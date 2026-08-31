import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

const A432 = 'src/0/3/6/9/1/2/4/8/7/5/1';

/** Library publish entries — demos are excluded (not shipped as rollup inputs). */
const entries = [
  { name: 'a432.system', input: `${A432}/a432.system.ts` },
  { name: 'a432.simple', input: `${A432}/a432.simple.ts` },
  { name: 'a432.navigation', input: `${A432}/a432.navigation.map.ts` },
  { name: 'a432.cmyk', input: `${A432}/a432.cmyk.multimedia.ts` },
  { name: 'a432.kabbalah', input: `${A432}/a432.kabbalah.ts` },
  { name: 'a432.sacred.geometry', input: `${A432}/a432.sacred.geometry.ts` },
  { name: 'a432.electric.flow', input: `${A432}/a432.electric.flow.ts` },
  { name: 'a432.math.constants', input: `${A432}/a432.math.constants.ts` },
  // a432.math.ts held primes(), simplify(), the imperial/metric conversions
  // and the fraction arithmetic, and no subpath reached any of it. A fix to an
  // infinite loop in primes() shipped in 1.2.0 inside code no consumer could
  // call.
  { name: 'a432.math', input: `${A432}/a432.math.ts` },
  { name: 'a432.wave.energy', input: `${A432}/a432.wave.energy.ts` },
  { name: 'a432.mobius.circuit', input: `${A432}/a432.mobius.circuit.ts` },
  { name: 'a432.i', input: `${A432}/a432.i.ts` },

  // The kernel and its neighbours. package.json advertised these as entry
  // points while pointing them at src/*.ts, and Node refuses to strip types
  // under node_modules — so `import { digitalRoot } from 'zeropoint-node/0'`
  // worked in a clone and failed for everyone who installed the package. They
  // are built now, and scripts/entrypoints-usable.mjs fails if a subpath ever
  // points back at source.
  { name: 'kernel', input: 'src/kernel/index.ts' },
  { name: 'kernel.import-graph', input: 'src/kernel/import-graph.ts' },
  { name: 'zero', input: 'src/0/index.ts' },
  { name: 'security', input: 'src/security/quantum-fold-cipher.ts' },
  { name: 'security.threat-analysis', input: 'src/security/quantum-threat-landscape.ts' },
  { name: 'security.tomography', input: 'src/security/quantum-state-tomography.ts' },
  { name: 'security.post-quantum', input: 'src/security/post-quantum-crypto.ts' },
  { name: 'integrity', input: 'src/integrity/content-uuid.ts' },
  { name: 'quantum', input: 'src/quantum/index.ts' },
  { name: 'mcp', input: 'src/mcp/server.ts' }
];

const external = ['express', 'three', '@hotwired/stimulus'];

const tsPlugin = () =>
  typescript({
    tsconfig: './tsconfig.build.json'
  });

/** Keep MIXED_EXPORTS quiet — every CJS/ESM output already sets exports: 'named'. */
function onwarn(warning, warn) {
  if (warning.code === 'MIXED_EXPORTS') return;
  warn(warning);
}

const input = Object.fromEntries(entries.map((e) => [e.name, e.input]));

const jsBuild = {
  input,
  output: [
    {
      // .cjs, not .js: package.json declares "type": "module", so a .js file is
      // parsed as ESM no matter what rollup wrote into it. The CJS bundle was
      // therefore unloadable — require('zeropoint-node') failed with
      // MODULE_NOT_FOUND on its own internal chunk. The extension is what tells
      // Node the format; chunks need it too or the entry reaches for .js.
      dir: 'dist',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      dir: 'dist',
      entryFileNames: '[name].esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [resolve({ extensions: ['.ts', '.js'] }), commonjs(), tsPlugin()],
  external,
  onwarn
};

const dtsBuilds = entries.map((e) => ({
  input: e.input,
  output: { file: `dist/${e.name}.d.ts`, format: 'esm', exports: 'named' },
  plugins: [dts({ tsconfig: './tsconfig.build.json' })],
  external,
  onwarn
}));

export default [jsBuild, ...dtsBuilds];
