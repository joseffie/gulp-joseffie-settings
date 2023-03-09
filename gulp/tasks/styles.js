import gulp from 'gulp';
import { relative } from 'path';
import { src, dist } from '../config/paths.js';
import { dirs, isProd } from '../../app.config.cjs';
import { gulpLoadPluginsOpts } from '../config/options.js';

import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import dartSass from 'sass';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);
const sass = $.sass(dartSass);

export const styles = () => {
  const imgPath = relative(`${dirs.dist}/styles`, `${dirs.dist}/img`);

  return gulp
    .src(src.styles, { sourcemaps: !isProd })
    .pipe(
      $.plumber(
        $.notify.onError({
          title: 'STYLES',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    // Required for correct operation of the `path-autocomplete` extension.
    // If you don't use it, you can delete this line.
    .pipe($.replace(/@img\//g, `${imgPath.replaceAll(/\\/g, '/')}/`))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(
      $.if(
        isProd,
        $.webpcss({
          webpClass: '.webp',
          noWebpClass: '.no-webp',
        }),
      ),
    )
    .pipe($.postcss())
    .pipe(gulp.dest(dist.styles))
    .pipe(browserSync.stream());
};
