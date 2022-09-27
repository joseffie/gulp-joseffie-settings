import classnames from 'classnames/dedupe.js';
import omit from 'object.omit';
import postHtmlAttrsSorter from 'posthtml-attrs-sorter';

import paths from './paths.js';
import { isDev } from '../utils/environment.js';

const port = 9050;

export const browserSyncConfig = {
  server: {
    baseDir: paths.buildFolder,
  },
  notify: false,
  reloadOnRestart: true,
  port: port || 5050,
};

export const pugConfig = {
  locals: {
    _: {
      classnames,
      omit,
    },
  },
  pretty: isDev,
  verbose: true,
};

export const postHtmlConfig = {
  plugins: [
    postHtmlAttrsSorter({
      order: [
        'class',
        'id',
        'name',
        'data',
        'ng',
        'src',
        'for',
        'type',
        'href',
        'values',
        'title',
        'alt',
        'role',
        'aria',
      ],
    }),
  ],
  options: {},
};

export const versionNumberConfig = {
  value: '%DT%',
  $end: {
    key: '_v',
    cover: 0,
    to: ['css', 'js'],
  },
  output: {
    file: 'gulp/version.json',
  },
};

export const imageminConfig = {
  progressive: true,
  svgoPlugins: [{ removeViewBox: false }],
  interlaced: true,
  optimizationLevel: 3, // 0 to 7
};

export const monoColorSpriteConfig = {
  mode: {
    symbol: {
      sprite: '../sprite-mono.svg',
    },
  },
  shape: {
    transform: [
      {
        svgo: {
          plugins: [
            {
              removeAttrs: {
                attrs: ['class', 'data-name', 'fill', 'stroke.*'],
              },
            },
          ],
        },
      },
    ],
  },
};

export const multiColorSpriteConfig = {
  mode: {
    symbol: {
      sprite: '../sprite-multi.svg',
    },
  },
  shape: {
    transform: [
      {
        svgo: {
          plugins: [
            {
              removeAttrs: {
                attrs: ['class', 'data-name'],
              },
            },
            {
              removeUseLessStrokeAndFill: false,
            },
            {
              inlineStyles: true,
            },
          ],
        },
      },
    ],
  },
};
