import zipPlugin from 'gulp-zip';

export const zip = () => {
  app.plugins.del(`./${app.path.rootFolder}.zip`);

  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'ZIP',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./project-archive/'));
};
