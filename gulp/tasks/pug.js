let emittyPug;

global.watch = false;
global.forceRebuild = false;

export const pug = (done) => {
  if (!emittyPug) {
    emittyPug = $.plugins.emitty.setup('src', 'pug', {
      makeVinylFile: true,
    });
  }

  return new Promise((resolve, reject) => {
    emittyPug
      .scan(global.emittyPugChangedFile)
      .then(() => {
        resolvePromise(resolve, reject);
        done();
      })
      .catch((err) => {
        console.log(err.message);
        resolvePromise(resolve, reject);
        done();
      });
  });
};

const resolvePromise = (resolve, reject) => {
  $.gulp
    .src(`${$.path.src.pug}/**/*.pug`)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'PUG',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      $.plugins.if(
        global.watch && !global.forceRebuild,
        emittyPug.filter(global.emittyPugChangedFile),
      ),
    )
    // Parsing JSON
    .pipe(
      $.plugins.data(() => {
        return JSON.parse($.plugins.fs.readFileSync('./src/base/data/data.json', 'utf8'));
      }),
    )
    .pipe(
      $.plugins.pug({
        // eslint-disable-next-line no-unneeded-ternary
        pretty: $.isProd ? false : true,
        verbose: true,
      }),
    )
    // Required for correct operation of the `path-autocomplete` extension.
    // If you don't use it, you can delete this line.
    .pipe($.plugins.replace(/@img\//g, 'img/'))
    .pipe($.plugins.if($.isProd, $.plugins.webpHtmlNosvg()))
    .pipe(
      $.plugins.if(
        $.isProd,
        $.plugins.versionNumber({
          value: '%DT%',
          $end: {
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
    .pipe($.plugins.if($.isProd, $.plugins.replace('.css', '.min.css')))
    .pipe($.plugins.if($.isProd, $.plugins.replace('.js', '.min.js')))
    .pipe($.gulp.dest($.path.build.html))
    .pipe($.plugins.browsersync.stream())
    .on('end', resolve)
    .on('error', reject);
};
