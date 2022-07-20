import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
  return (
    app.gulp
      .src(app.path.src.images)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'IMAGES',
            message: 'Fix da mistake, leather man: <%= error.message %>',
          }),
        ),
      )
      .pipe(app.plugins.newer(app.path.build.images))
      // In production mode, the images are converted to webp, and then
      // the original images are again taken and copied to dist
      .pipe(app.plugins.if(app.isProd, webp()))
      .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.build.images)))
      .pipe(app.plugins.if(app.isProd, app.gulp.src(app.path.src.images)))
      .pipe(app.plugins.if(app.isProd, app.plugins.newer(app.path.build.images)))
      .pipe(
        app.plugins.if(
          app.isProd,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
          }),
        ),
      )
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.images))
  );
};
