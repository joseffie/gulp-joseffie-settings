import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'SCSS',
            message: 'Fix da mistake, leather man: <%= error.message %>',
          }),
        ),
      )
      // Required for correct operation of the `path-autocomplete` extension.
      // If you don't use it, you can delete this line.
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(
        sass({
          outputStyle: 'expanded',
        }),
      )
      .pipe(groupCssMediaQueries())
      .pipe(
        app.plugins.if(
          app.isProd,
          webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          }),
        ),
      )
      .pipe(
        app.plugins.if(
          app.isProd,
          autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          }),
        ),
      )
      // Uncomment if you need an uncompressed duplicate of the stylesheet
      // .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.isProd, cleanCss()))
      .pipe(
        app.plugins.if(
          app.isProd,
          app.plugins.rename({
            extname: '.min.css',
          }),
        ),
      )
      .pipe(app.gulp.dest(app.path.build.css))
  );
};
