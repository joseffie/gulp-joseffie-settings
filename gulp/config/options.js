import { resolve, join } from 'path';
import {
  dirs, isProd, reloadDebounce, serverPort,
} from '../../app.config.cjs';
import classnames from 'classnames';
import omit from 'object.omit';

const { dist } = dirs;

export const ghPagesConfig = {
  dir: dist,
  options: {
    dotfiles: true,
  },
};

export const gulpLoadPluginsOpts = {
  attern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'gulplog'],
  config: (join(resolve(), 'package.json')),
  scope: ['dependencies', 'devDependencies'],
  rename: {
    gulplog: 'logger',
  },
};

export const browserSyncConfig = {
  server: {
    baseDir: dist,
  },
  notify: false,
  reloadOnRestart: true,
  reloadDebounce,
  port: serverPort,
};

export const pugConfig = {
  locals: {
    _: {
      classnames,
      omit,
    },
    getModes: (component, mods) => {
      if (!mods) return '';

      const classes = [];

      mods.split(',').forEach((mod) => {
        classes.push(`${component}_${mod.trim()}`);
      });

      return classes.join(' ');
    },
  },
  pretty: !isProd,
  verbose: true,
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
  optimizationLevel: 3,
};

const getSvgoPluginsOptions = (...options) => ({
  transform: [{
    svgo: {
      plugins: options,
    },
  }],
});

export const spriteConfigs = {
  monoColor: {
    mode: {
      symbol: {
        sprite: '../sprite-mono.svg',
      },
    },
    shape: getSvgoPluginsOptions({
      name: 'removeAttrs',
      params: {
        attrs: ['class', 'data-name', 'fill', 'stroke.*'],
      },
    }),
  },

  multiColor: {
    mode: {
      symbol: {
        sprite: '../sprite-multi.svg',
      },
    },
    shape: getSvgoPluginsOptions(
      {
        name: 'removeAttrs',
        params: {
          attrs: ['class', 'data-name'],
        },
      },
      {
        name: 'removeUselessStrokeAndFill',
        params: false,
      },
    ),
  },
};
