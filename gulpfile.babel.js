import gulp from 'gulp';

import { build } from './gulp/tasks/modes/build.js';
import { development } from './gulp/tasks/modes/development.js';
import { buildZip } from './gulp/tasks/modes/zip.js';
import { publish } from './gulp/tasks/publish.js';

import { pug } from './gulp/tasks/pug.js';
import { styles } from './gulp/tasks/styles.js';
import { scripts } from './gulp/tasks/scripts.js';
import { images } from './gulp/tasks/images.js';
import { makeMonoSprite, makeMultiSprite } from './gulp/tasks/sprite.js';
import {
  otfToTtf, ttfToWoff, createFontStylesFile, fonts,
} from './gulp/tasks/fonts/index.js';
import { reset } from './gulp/tasks/reset.js';

// Main tasks
gulp.task('development', development);
gulp.task('build', build);
gulp.task('publish', publish);
gulp.task('zip', gulp.series('build', buildZip));
gulp.task('cleanup', reset);

// Build separate types of files
gulp.task('pug', pug);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('sprites', gulp.parallel(makeMonoSprite, makeMultiSprite));
gulp.task(
  'compileFonts',
  gulp.series(otfToTtf, ttfToWoff, createFontStylesFile),
);
gulp.task('fonts', fonts);

// Default task
gulp.task('default', gulp.series('development'));
