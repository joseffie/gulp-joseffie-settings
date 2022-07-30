// Creating a custom require for use in ES
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const js = () => {
  return $.gulp
    .src($.path.src.js, { sourcemaps: $.isDev })
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'JS',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      $.plugins.webpack({
        mode: $.isProd ? 'production' : 'development',
        output: {
          filename: 'index.js',
          chunkFilename: 'index.js',
          publicPath: '/',
        },
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor',
                enforce: true,
              },
            },
          },
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: require.resolve('babel-loader'),
                options: {
                  presets: [['@babel/preset-env', { modules: false }]],
                },
              },
            },
          ],
        },
      }),
    )
    .pipe(
      $.plugins.if(
        $.isProd,
        $.plugins.rename({
          extname: '.min.js',
        }),
      ),
    )
    .pipe($.gulp.dest($.path.build.js))
    .pipe($.plugins.browsersync.stream());
};
