import webpCss from 'gulp-webpcss';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import postcss from 'gulp-postcss';

const sass = gulpSass(dartSass);

export const styles = () => $.gulp
  .src($.paths.src.styles, { sourcemaps: $.isDev })
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
  .pipe(
    $.plugins.if(
      $.isProd,
      webpCss({
        webpClass: '.webp',
        noWebpClass: '.no-webp',
      }),
    ),
  )
  .pipe(postcss())
  .pipe($.gulp.dest($.paths.build.styles))
  .pipe($.plugins.browsersync.stream());
