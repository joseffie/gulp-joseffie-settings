import gulp from 'gulp';

import { reset } from './reset.js';
import { startMessage } from './message.js';
import { pug } from './pug.js';
import { styles } from './styles.js';
import { js } from './js.js';
import { images } from './images.js';
import { watch } from './watch.js';
import { server } from './server.js';

export const development = gulp.series(
  startMessage,
  reset,
  gulp.parallel(pug, js, images),
  styles,
  gulp.parallel(watch, server),
);
