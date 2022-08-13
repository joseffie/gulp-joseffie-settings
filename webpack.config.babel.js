import path from 'path';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import HappyPack from 'happypack';
import TerserPlugin from 'terser-webpack-plugin';

import { fileURLToPath } from 'url';
import { isProd } from './gulp/utils/environment.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* eslint-enable no-underscore-dangle */

const options = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: './index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(__dirname, '/dist/js'),
    publicPath: '/js/',
  },
  context: path.resolve(__dirname, 'src/base/js'),
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        // preventing the creation of the LICENSE.txt file
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  module: {
    noParse: /\/node_modules\/(jquery|backbone)/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'happypack/loader',
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
    new HappyPack({
      loaders: ['babel-loader'],
    }),
  ],
};

export default options;
