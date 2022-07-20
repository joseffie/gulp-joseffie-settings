export const pug = () => {
  return (
    app.gulp
      .src(`${app.path.src.pug}/**/*.pug`, { since: app.gulp.lastRun(pug) })
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
          // Set to true if you need an uncompressed file
          pretty: false,
          verbose: true,
        }),
      )
      // Required for correct operation of the `path-autocomplete` extension.
      // If you don't use it, you can delete this line.
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(app.plugins.if(app.isProd, app.plugins.webpHtmlNosvg()))
      .pipe(
        app.plugins.if(
          app.isProd,
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
      .pipe(app.plugins.if(app.isProd, app.plugins.replace('.css', '.min.css')))
      .pipe(app.plugins.if(app.isProd, app.plugins.replace('.js', '.min.js')))
      .pipe(app.gulp.dest(app.path.build.html))
  );
};
