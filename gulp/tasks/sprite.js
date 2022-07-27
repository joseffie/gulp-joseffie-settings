export const makeMonoSprite = () => {
  return $.gulp
    .src(`${$.path.src.iconsmono}`)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'Mono-color SVG',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      $.plugins.svgSprite({
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
    .pipe($.gulp.dest(`${$.path.srcFolder}/img/sprites`));
};

export const makeMultiSprite = () => {
  return $.gulp
    .src(`${$.path.src.iconsmulti}`)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'Multi-color SVG',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      $.plugins.svgSprite({
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
    .pipe($.gulp.dest(`${$.path.srcFolder}/img/sprites`));
};
