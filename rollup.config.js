import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const isDev = process.env.NODE_ENV === 'dev';

export default {
  input: 'resources/src/initializer.js',
  output: {
    file: 'resources/bundle.js',
    format: 'iife',
    name: 'AppBundle',
    sourcemap: isDev,
    sourcemapExcludeSources: false
  },
  plugins: [
    resolve(),
    commonjs(),
    !isDev && terser({compress: {
						passes: 5,
						drop_console: true,
						drop_debugger: true,
					},
					format: {
						comments: false,
					}})
  ]
};