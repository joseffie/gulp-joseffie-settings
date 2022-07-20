import webpack from 'webpack-stream';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      webpack({
        mode: app.isProd ? 'production' : 'development',
        output: {
          filename: '[name].js',
          chunkFilename: '[name].js',
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
      app.plugins.if(
        app.isProd,
        app.plugins.rename({
          extname: '.min.js',
        }),
      ),
    )
    .pipe(app.gulp.dest(app.path.build.js));
};
