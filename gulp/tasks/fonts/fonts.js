import gulp from 'gulp';
import { dist, src } from '../../config/paths.js';
import { gulpLoadPluginsOpts } from '../../config/options.js';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

export const fonts = () => gulp
  .src(src.fonts)
  .pipe(
    $.plumber(
      $.notify.onError({
        title: 'FONTS',
        message: 'You got an error: <%= error.message %>',
      }),
    ),
  )
  .pipe(gulp.dest(dist.fonts));
