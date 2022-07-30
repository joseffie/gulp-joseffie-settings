export const scss = () => {
  return (
    $.gulp
      .src($.path.src.scss, { sourcemaps: $.isDev })
      .pipe(
        $.plugins.plumber(
          $.plugins.notify.onError({
            title: 'SCSS',
            message: 'Fix da mistake, leather man: <%= error.message %>',
          }),
        ),
      )
      // Required for correct operation of the `path-autocomplete` extension.
      // If you don't use it, you can delete this line.
      .pipe($.plugins.replace(/@img\//g, '../img/'))
      .pipe(
        $.plugins.sass({
          outputStyle: 'expanded',
        }),
      )
      .pipe($.plugins.groupMedia())
      .pipe(
        $.plugins.if(
          $.isProd,
          $.plugins.webpCss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          }),
        ),
      )
      .pipe(
        $.plugins.if(
          $.isProd,
          $.plugins.autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          }),
        ),
      )
      .pipe($.plugins.if($.isProd, $.plugins.cleanCss()))
      .pipe(
        $.plugins.if(
          $.isProd,
          $.plugins.rename({
            extname: '.min.css',
          }),
        ),
      )
      .pipe($.gulp.dest($.path.build.css))
      .pipe($.plugins.browsersync.stream())
  );
};
