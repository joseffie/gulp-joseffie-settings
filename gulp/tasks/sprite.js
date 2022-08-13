import svgSprite from 'gulp-svg-sprite';
import { monoColorSpriteConfig, multiColorSpriteConfig } from '../config/options.js';

export const makeMonoSprite = async () =>
  $.gulp
    .src(`${$.paths.src.iconsmono}`)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'Mono-color SVG',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe(svgSprite(monoColorSpriteConfig))
    .pipe($.gulp.dest(`${$.paths.srcFolder}/img/sprites`));

export const makeMultiSprite = async () =>
  $.gulp
    .src(`${$.paths.src.iconsmulti}`)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'Multi-color SVG',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe(svgSprite(multiColorSpriteConfig))
    .pipe($.gulp.dest(`${$.paths.srcFolder}/img/sprites`));
