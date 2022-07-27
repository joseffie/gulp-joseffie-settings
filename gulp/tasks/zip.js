export const zip = () => {
  // Deleting an archive folder if it exists
  $.plugins.del('.archive');

  return $.gulp
    .src(`${$.path.buildFolder}/**/*.*`, {})
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'ZIP',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe($.plugins.zip(`${$.path.rootFolder}.zip`))
    .pipe($.gulp.dest('.archive'));
};
