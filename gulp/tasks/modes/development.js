import gulp from 'gulp';

import { reset } from '../reset.js';
import { startMessage } from '../message.js';
import { pug } from '../pug.js';
import { styles } from '../styles.js';
import { scripts } from '../scripts.js';
import { images } from '../images.js';
import { otfToTtf } from '../fonts/otfToTtf.js';
import { ttfToWoff } from '../fonts/ttfToWoff.js';
import { createFontStylesFile } from '../fonts/createFontStylesFile.js';
import { fonts } from '../fonts/fonts.js';
import { server } from '../server.js';
import { watch } from './watch.js';

export const development = gulp.series(
  startMessage,
  reset,
  gulp.parallel(
    pug,
    styles,
    images,
    gulp.series(otfToTtf, ttfToWoff, createFontStylesFile, fonts)
  ),
  scripts,
  gulp.parallel(watch, server),
);
