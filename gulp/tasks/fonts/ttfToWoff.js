import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const ttfToWoff = () =>
  $.gulp
    .src(`${$.paths.srcFolder}/fonts/*.ttf`)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'Convert TTF to WOFF/WOFF2',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ['woff'],
      }),
    )
    .pipe($.gulp.dest(`${$.paths.srcFolder}/fonts`))
    .pipe($.gulp.src(`${$.paths.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe($.gulp.dest(`${$.paths.srcFolder}/fonts`));
