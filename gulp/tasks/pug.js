export const pug = () => {
  return (
    app.gulp
      .src(app.path.src.pug)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'PUG',
            message: 'Fix da mistake, leather man: <%= error.message %>',
          }),
        ),
      )
      // Parsing JSON
      .pipe(
        app.plugins.data(() => {
          return JSON.parse(app.plugins.fs.readFileSync('./src/base/data/data.json', 'utf8'));
        }),
      )
      .pipe(
        app.plugins.pug({
          pretty: false,
          verbose: true,
        }),
      )
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(app.plugins.if(app.isBuild, app.plugins.webpHtmlNosvg()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          app.plugins.versionNumber({
            value: '%DT%',
            append: {
              key: '_v',
              cover: 0,
              to: ['css', 'js'],
            },
            output: {
              file: 'gulp/version.json',
            },
          }),
        ),
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
