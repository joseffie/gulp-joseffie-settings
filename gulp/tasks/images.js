import gulp from 'gulp';
import { dist, src } from '../config/paths.js';
import { isProd } from '../../app.config.cjs';
import { gulpLoadPluginsOpts, imageminConfig } from '../config/options.js';

import gulpLoadPlugins from 'gulp-load-plugins';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

export const images = () => gulp
  .src(src.images)
  .pipe(
    $.plumber(
      $.notify.onError({
        title: 'IMAGES',
        message: 'You got an error: <%= error.message %>',
      }),
    ),
  )
  .pipe($.newer(dist.images))
  // In production mode, the images are converted to webp, and then
  // the original images are again taken and copied to dist
  .pipe($.if(isProd, $.webp()))
  .pipe($.if(isProd, gulp.dest(dist.images)))
  .pipe($.if(isProd, gulp.src(src.images)))
  .pipe($.if(isProd, $.newer(dist.images)))
  .pipe($.if(isProd, imagemin(imageminConfig)))
  .pipe(gulp.dest(dist.images))
  .pipe(gulp.src(src.svg))
  .pipe(gulp.dest(dist.images))
  .pipe(browserSync.stream());
