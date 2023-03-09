import gulp from 'gulp';
import { src } from '../config/paths.js';
import { dirs } from '../../app.config.cjs';
import { gulpLoadPluginsOpts, spriteConfigs } from '../config/options.js';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

export const makeMonoSprite = () => gulp
  .src(src.icons.mono)
  .pipe(
    $.plumber(
      $.notify.onError({
        title: 'Mono-color SVG',
        message: 'You got an error: <%= error.message %>',
      }),
    ),
  )
  .pipe($.svgSprite(spriteConfigs.monoColor))
  .pipe(gulp.dest(`${dirs.src}/img/sprites`));

export const makeMultiSprite = () => gulp
  .src(src.icons.multi)
  .pipe(
    $.plumber(
      $.notify.onError({
        title: 'Multi-color SVG',
        message: 'You got an error: <%= error.message %>',
      }),
    ),
  )
  .pipe($.svgSprite(spriteConfigs.multiColor))
  .pipe(gulp.dest(`${dirs.src}/img/sprites`));
