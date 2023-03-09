import { dirs, isProd } from './app.config.cjs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { src } = dirs;

/**
 * @see https://github.com/rollup/plugins/tree/master/packages/alias#options
 */
const aliasOptions = {
  entries: [
    {
      find: '@',
      replacement: resolve(__dirname, src),
    },
    {
      find: '@helpers',
      replacement: resolve(__dirname, `${src}/base/scripts/helpers`),
    },
    {
      find: '@core',
      replacement: resolve(__dirname, `${src}/base/scripts/core`),
    },
  ],
};

/**
 * @see https://github.com/terser/terser#minify-options
 */
const terserOptions = {
  ecma: 2017,
  compress: {
    evaluate: false,
  },
  format: {
    comments: false,
    quote_style: 1,
  },
  keep_classnames: true,
  keep_fnames: true,
};

export default {
  input: {
    index: `${src}/base/scripts/index.js`,
  },
  output: {
    entryFileNames: '[name].js',
    format: 'es',
    generatedCode: {
      constBindigs: true,
      objectShorthand: true,
    },
    minifyInternalExports: false,
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve({
      browser: true,
      extensions: ['.mjs', '.js', '.json'],
    }),
    alias(aliasOptions),
    commonjs(),
    isProd && terser(terserOptions),
    isProd && babel({ babelHelpers: 'bundled' }),
  ],
  // Disable treeshake in development mode to improve build performance.
  treeshake: isProd,
};
