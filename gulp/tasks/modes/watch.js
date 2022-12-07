import { pug } from '../pug.js';
import { styles } from '../styles.js';
import { scripts } from '../scripts.js';
import { images } from '../images.js';
import { makeMonoSprite, makeMultiSprite } from '../sprite.js';
import { otfToTtf } from '../fonts/otfToTtf.js';
import { ttfToWoff } from '../fonts/ttfToWoff.js';
import { createFontStylesFile } from '../fonts/createFontStylesFile.js';
import { fonts } from '../fonts/fonts.js';

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
  $.gulp.watch($.paths.watch.styles, styles);

  // Scripts
  $.gulp.watch($.paths.watch.scripts, scripts);

  // Images
  $.gulp.watch($.paths.watch.images, images);

  // Single-color SVG icons
  $.gulp.watch($.paths.watch.iconsmono, makeMonoSprite);

  // Multi-color SVG icons
  $.gulp.watch($.paths.watch.iconsmono, makeMultiSprite);

  // Fonts
  $.gulp.watch(
    $.paths.watch.fonts,
    $.gulp.series(otfToTtf, ttfToWoff, createFontStylesFile, fonts),
  );
};
