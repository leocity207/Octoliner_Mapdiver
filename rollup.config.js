import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'resources/src/initializer.js',
  output: {
    file: 'resources/bundle.js',
    format: 'iife',
    name: 'AppBundle',
    sourcemap: true,
    sourcemapExcludeSources: false
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({ output: { comments: false } })
  ]
};