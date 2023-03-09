import gulp from 'gulp';

import { reset } from '../reset.js';
import { startMessage } from '../message.js';
import { pug } from '../pug.js';
import { styles } from '../styles.js';
import { scripts } from '../scripts.js';
import { images } from '../images.js';
import {
  otfToTtf, ttfToWoff, createFontStylesFile, fonts,
} from '../fonts/index.js';
import { server } from '../server.js';
import { watch } from './watch.js';

export const development = gulp.series(
  startMessage,
  reset,
  gulp.parallel(
    pug,
    styles,
    images,
    scripts,
    gulp.series(otfToTtf, ttfToWoff, createFontStylesFile, fonts),
  ),
  gulp.parallel(watch, server),
);
