export const images = () => {
  return (
    $.gulp
      .src($.path.src.images)
      .pipe(
        $.plugins.plumber(
          $.plugins.notify.onError({
            title: 'IMAGES',
            message: 'Fix da mistake, leather man: <%= error.message %>',
          }),
        ),
      )
      .pipe($.plugins.newer($.path.build.images))
      // In production mode, the images are converted to webp, and then
      // the original images are again taken and copied to dist
      .pipe($.plugins.if($.isProd, $.plugins.webp()))
      .pipe($.plugins.if($.isProd, $.gulp.dest($.path.build.images)))
      .pipe($.plugins.if($.isProd, $.gulp.src($.path.src.images)))
      .pipe($.plugins.if($.isProd, $.plugins.newer($.path.build.images)))
      .pipe(
        $.plugins.if(
          $.isProd,
          $.plugins.imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
          }),
        ),
      )
      .pipe($.gulp.dest($.path.build.images))
      .pipe($.gulp.src($.path.src.svg))
      .pipe($.gulp.dest($.path.build.images))
      .pipe($.plugins.browsersync.stream())
  );
};
