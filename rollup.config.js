import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

const config = [
  // Main A432 system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.system.ts',
    output: [
      {
        file: 'dist/a432.system.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.system.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Simple A432 system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.simple.ts',
    output: [
      {
        file: 'dist/a432.simple.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.simple.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Navigation map
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.navigation.map.ts',
    output: [
      {
        file: 'dist/a432.navigation.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.navigation.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // CMYK multimedia
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.cmyk.multimedia.ts',
    output: [
      {
        file: 'dist/a432.cmyk.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.cmyk.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Kabbalistic system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.kabbalah.ts',
    output: [
      {
        file: 'dist/a432.kabbalah.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.kabbalah.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Sacred Geometry system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.sacred.geometry.ts',
    output: [
      {
        file: 'dist/a432.sacred.geometry.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.sacred.geometry.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Electric Flow system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.electric.flow.ts',
    output: [
      {
        file: 'dist/a432.electric.flow.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.electric.flow.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Math Constants system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.math.constants.ts',
    output: [
      {
        file: 'dist/a432.math.constants.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.math.constants.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Wave Energy system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.wave.energy.ts',
    output: [
      {
        file: 'dist/a432.wave.energy.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.wave.energy.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // Mobius Circuit system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.mobius.circuit.ts',
    output: [
      {
        file: 'dist/a432.mobius.circuit.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.mobius.circuit.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // A432 I system
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.i.ts',
    output: [
      {
        file: 'dist/a432.i.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/a432.i.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['express', 'three', '@hotwired/stimulus']
  },
  // TypeScript declaration files
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.system.ts',
    output: { file: 'dist/a432.system.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.simple.ts',
    output: { file: 'dist/a432.simple.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.navigation.map.ts',
    output: { file: 'dist/a432.navigation.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.cmyk.multimedia.ts',
    output: { file: 'dist/a432.cmyk.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.kabbalah.ts',
    output: { file: 'dist/a432.kabbalah.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.sacred.geometry.ts',
    output: { file: 'dist/a432.sacred.geometry.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.electric.flow.ts',
    output: { file: 'dist/a432.electric.flow.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.math.constants.ts',
    output: { file: 'dist/a432.math.constants.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.wave.energy.ts',
    output: { file: 'dist/a432.wave.energy.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.mobius.circuit.ts',
    output: { file: 'dist/a432.mobius.circuit.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.i.ts',
    output: { file: 'dist/a432.i.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.kabbalah.ts',
    output: { file: 'dist/a432.kabbalah.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.sacred.geometry.ts',
    output: { file: 'dist/a432.sacred.geometry.d.ts', format: 'esm' },
    plugins: [dts()]
  },
  {
    input: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.electric.flow.ts',
    output: { file: 'dist/a432.electric.flow.d.ts', format: 'esm' },
    plugins: [dts()]
  }
];

export default config;
