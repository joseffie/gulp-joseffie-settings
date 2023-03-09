import gulp from 'gulp';
import { watch as watching } from '../../config/paths.js';

import { pug } from '../pug.js';
import { styles } from '../styles.js';
import { scripts } from '../scripts.js';
import { images } from '../images.js';
import { makeMonoSprite, makeMultiSprite } from '../sprite.js';
import {
  otfToTtf, ttfToWoff, createFontStylesFile, fonts,
} from '../fonts/index.js';

export const watch = async () => {
  global.watch = true;

  // Modules, pages
  gulp.watch(watching.pug, pug).on('all', (event, filepath) => {
    global.forceRebuild = false;
    global.emittyPugChangedFile = event === 'unlink' ? undefined : filepath;
  });

  // Data
  gulp.watch(watching.data, pug).on('all', () => {
    global.forceRebuild = true;
  });

  // Styles
  gulp.watch(watching.styles, styles);

  // Scripts
  gulp.watch(watching.scripts, scripts);

  // Images
  gulp.watch(watching.images, images);

  // Single-color SVG icons
  gulp.watch(watching.icons.mono, makeMonoSprite);

  // Multi-color SVG icons
  gulp.watch(watching.icons.multi, makeMultiSprite);

  // Fonts
  gulp.watch(
    watching.fonts,
    gulp.series(otfToTtf, ttfToWoff, createFontStylesFile, fonts),
  );
};
