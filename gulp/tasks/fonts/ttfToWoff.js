import gulp from 'gulp';
import { dirs } from '../../../app.config.cjs';
import { gulpLoadPluginsOpts } from '../../config/options.js';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

export const ttfToWoff = () => gulp
  .src(`${dirs.src}/fonts/*.ttf`)
  .pipe(
    $.plumber(
      $.notify.onError({
        title: 'Convert TTF to WOFF/WOFF2',
        message: 'You got an error: <%= error.message %>',
      }),
    ),
  )
  .pipe($.fonter({ formats: ['woff'] }))
  .pipe(gulp.dest(`${dirs.src}/fonts`))
  .pipe(gulp.src(`${dirs.src}/fonts/*.ttf`))
  .pipe($.ttf2woff2())
  .pipe(gulp.dest(`${dirs.src}/fonts`));
