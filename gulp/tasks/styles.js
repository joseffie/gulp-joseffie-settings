import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import groupMedia from 'gulp-group-css-media-queries';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';

import { autoprefixerConfig } from '../config/options.js';

const sass = gulpSass(dartSass);

export const styles = () =>
  $.gulp
    .src($.paths.src.scss, { sourcemaps: $.isDev })
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'STYLES',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    // Required for correct operation of the `path-autocomplete` extension.
    // If you don't use it, you can delete this line.
    .pipe($.plugins.replace(/@img\//g, '../img/'))
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(groupMedia())
    .pipe(
      $.plugins.if(
        $.isProd,
        webpCss({
          webpClass: '.webp',
          noWebpClass: '.no-webp',
        }),
      ),
    )
    .pipe($.plugins.if($.isProd, autoprefixer(autoprefixerConfig)))
    .pipe($.plugins.if($.isProd, cleanCss()))
    .pipe($.gulp.dest($.paths.build.css))
    .pipe($.plugins.browsersync.stream());
