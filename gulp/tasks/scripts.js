import gulp from 'gulp';
import { src, dist } from '../config/paths.js';
import { gulpLoadPluginsOpts } from '../config/options.js';
import rollupConfig from '../../rollup.config.js';

import gulpLoadPlugins from 'gulp-load-plugins';
import rollupEach from 'gulp-rollup-each';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

const {
  input, plugins, treeshake, output,
} = rollupConfig;

export const scripts = () => gulp
  .src(src.scripts)
  .pipe(
    $.plumber(
      $.notify.onError({
        title: 'SCRIPTS',
        message: 'You got an error: <%= error.message %>',
      }),
    ),
  )
  .pipe(
    rollupEach(
      {
        input,
        plugins,
        treeshake,
        isCache: true,
      },
      output,
    ),
  )
  .pipe(gulp.dest(dist.scripts))
  .pipe(browserSync.stream());
