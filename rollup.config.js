import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import alias from '@rollup/plugin-alias';

const isDev = process.env.NODE_ENV === 'development';

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
		alias({
			entries: [{ find: 'canvas', replacement: './resources/empty-shim.js' }]
		}),
		resolve(),
		commonjs(),
		json(),
		nodePolyfills(),
		!isDev && terser({compress: {
						passes: 5, // multiple passes for better compression
						drop_console: true, // remove console statements
						drop_debugger: true,
					},
					format: {
						comments: false,
					}})
	].filter(Boolean),
	onwarn(warning, warn) {
		if (warning.code !== 'CIRCULAR_DEPENDENCY') {
			warn(warning);
		}
	},
};