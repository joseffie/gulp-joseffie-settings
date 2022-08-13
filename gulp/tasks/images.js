import imagemin from 'gulp-imagemin';
import gulpWebp from 'gulp-webp';

import { imageminConfig } from '../config/options.js';

export const images = async () =>
  $.gulp
    .src($.paths.src.images)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'IMAGES',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe($.plugins.newer($.paths.build.images))
    // In production mode, the images are converted to webp, and then
    // the original images are again taken and copied to dist
    .pipe($.plugins.if($.isProd, gulpWebp()))
    .pipe($.plugins.if($.isProd, $.gulp.dest($.paths.build.images)))
    .pipe($.plugins.if($.isProd, $.gulp.src($.paths.src.images)))
    .pipe($.plugins.if($.isProd, $.plugins.newer($.paths.build.images)))
    .pipe($.plugins.if($.isProd, imagemin(imageminConfig)))
    .pipe($.gulp.dest($.paths.build.images))
    .pipe($.gulp.src($.paths.src.svg))
    .pipe($.gulp.dest($.paths.build.images))
    .pipe($.plugins.browsersync.stream());
