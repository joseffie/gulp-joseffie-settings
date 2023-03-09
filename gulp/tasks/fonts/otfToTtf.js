import gulp from 'gulp';
import { dirs } from '../../../app.config.cjs';
import { gulpLoadPluginsOpts } from '../../config/options.js';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

export const otfToTtf = () => gulp
  .src(`${dirs.src}/fonts/*.otf`)
  .pipe(
    $.plumber(
      $.notify.onError({
        title: 'Convert OTF to TTF',
        message: 'You got an error: <%= error.message %>',
      }),
    ),
  )
  .pipe($.fonter({ formats: ['ttf'] }))
  .pipe(gulp.dest(`${dirs.src}/fonts`));
