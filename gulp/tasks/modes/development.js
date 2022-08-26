import gulp from 'gulp';

import { reset } from '../reset.js';
import { startMessage } from '../message.js';
import { pug } from '../pug.js';
import { styles } from '../styles.js';
import { scripts } from '../scripts.js';
import { images } from '../images.js';
import { fonts } from '../fonts.js';
import { server } from '../server.js';
import { watch } from './watch.js';

export const development = gulp.series(
  startMessage,
  reset,
  gulp.parallel(pug, styles, images, fonts),
  scripts,
  gulp.parallel(watch, server),
);
