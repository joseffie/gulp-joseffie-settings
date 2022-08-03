export const zip = async function () {
  // Deleting an archive folder if it exists
  const deletedDirectoryPaths = $.plugins.del([$.path.archiveFolder]);

  return (
    deletedDirectoryPaths,
    console.log('> Removed old archive folder'),
    $.gulp
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
      .pipe($.gulp.dest($.path.archiveFolder))
  );
};
