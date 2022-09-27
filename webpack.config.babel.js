import path from 'path';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { fileURLToPath } from 'url';
import { isProd } from './gulp/utils/environment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: './index.js',
    // vendor: '../../vendor/vendor.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(__dirname, '/dist/scripts'),
    publicPath: '/scripts',
  },
  context: path.resolve(__dirname, 'src/base/scripts'),
  resolve: {
    extensions: ['.js', '.cjs', '.mjs'],
    modules: ['node_modules', path.join(__dirname, 'src')],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    noParse: /\/node_modules\/(jquery|backbone)/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
    }),
    new DuplicatePackageCheckerPlugin(),
  ],
};

export default webpackConfig;
