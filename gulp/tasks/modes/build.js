import gulp from 'gulp';

import { reset } from '../reset.js';
import { startMessage } from '../message.js';
import { pug } from '../pug.js';
import { styles } from '../styles.js';
import { scripts } from '../scripts.js';
import { images } from '../images.js';
import { makeMonoSprite, makeMultiSprite } from '../sprite.js';
import { convertFonts, fonts } from '../fonts.js';

export const build = gulp.series(
  startMessage,
  reset,
  gulp.parallel(
    pug,
    styles,
    scripts,
    gulp.series(gulp.parallel(makeMonoSprite, makeMultiSprite), images),
    gulp.series(convertFonts, fonts),
  ),
);
