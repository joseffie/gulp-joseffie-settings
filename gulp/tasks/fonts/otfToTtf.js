import fonter from 'gulp-fonter';

export const otfToTtf = () =>
  $.gulp
    .src(`${$.paths.srcFolder}/fonts/*.otf`)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'Convert OTF to TTF',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ['ttf'],
      }),
    )
    .pipe($.gulp.dest(`${$.paths.srcFolder}/fonts`));
