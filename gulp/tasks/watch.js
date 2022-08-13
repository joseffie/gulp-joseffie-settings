import { pug } from './pug.js';
import { styles } from './styles.js';
import { js } from './js.js';
import { images } from './images.js';
import { makeMonoSprite, makeMultiSprite } from './sprite.js';
import { convertFonts, fonts } from './fonts.js';

export const watch = async () => {
  global.watch = true;

  // Modules, pages
  $.gulp.watch($.paths.watch.pug, pug).on('all', (event, filepath) => {
    global.forceRebuild = false;
    global.emittyPugChangedFile = event === 'unlink' ? undefined : filepath;
  });

  // Data
  $.gulp.watch($.paths.watch.data, pug).on('all', () => {
    global.forceRebuild = true;
  });

  // Styles
  $.gulp.watch($.paths.watch.scss, styles);

  // Scripts
  $.gulp.watch($.paths.watch.js, js);

  // Images
  $.gulp.watch($.paths.watch.images, images);

  // Single-color SVG icons
  $.gulp.watch($.paths.watch.iconsmono, $.gulp.series(makeMonoSprite));

  // Multi-color SVG icons
  $.gulp.watch($.paths.watch.iconsmono, $.gulp.series(makeMultiSprite));

  // Fonts
  $.gulp.watch($.paths.watch.fonts, $.gulp.series(convertFonts, fonts));
};
