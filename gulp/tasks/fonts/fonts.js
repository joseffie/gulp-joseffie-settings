export const fonts = () =>
  $.gulp
    .src($.paths.src.fonts)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'FONTS',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe($.gulp.dest($.paths.build.fonts));
