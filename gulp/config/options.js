import postHtmlAttrsSorter from 'posthtml-attrs-sorter';

import paths from './paths.js';
import { isDev } from '../utils/environment.js';

export const browserSyncConfig = {
  server: {
    baseDir: paths.buildFolder,
  },
  notify: false,
  reloadOnRestart: true,
  port: 3000,
};

export const autoprefixerConfig = {
  grid: true,
  overrideBrowserslist: ['last 3 versions'],
  cascade: true,
};

export const pugConfig = {
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
