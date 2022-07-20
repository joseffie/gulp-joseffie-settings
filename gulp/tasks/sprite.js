import svgSprite from 'gulp-svg-sprite';

export const makeMonoSprite = () => {
  return app.gulp
    .src(`${app.path.src.iconsmono}`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'Mono-color SVG',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite-mono.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name', 'fill', 'stroke.*'],
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/img/sprites`));
};

export const makeMultiSprite = () => {
  return app.gulp
    .src(`${app.path.src.iconsmulti}`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'Multi-color SVG',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite-multi.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name'],
                    },
                  },
                  {
                    removeUseLessStrokeAndFill: false,
                  },
                  {
                    inlineStyles: true,
                  },
                ],
              },
            },
          ],
        },
      }),
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/img/sprites`));
};
