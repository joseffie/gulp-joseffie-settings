import gulp from 'gulp';
import paths from './gulp/config/paths.js';
import plugins from './gulp/config/plugins.js';
import { isProd, isDev } from './gulp/utils/environment.js';

import { build } from './gulp/tasks/build.js';
import { development } from './gulp/tasks/development.js';
import { buildZip } from './gulp/tasks/zip.js';

global.$ = {
  isProd,
  isDev,
  gulp,
  paths,
  plugins,
};

import { pug } from './gulp/tasks/pug.js';
import { styles } from './gulp/tasks/styles.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { makeMonoSprite, makeMultiSprite } from './gulp/tasks/sprite.js';
import { convertFonts, fonts } from './gulp/tasks/fonts.js';

// Main tasks
gulp.task('development', development);
gulp.task('build', build);
gulp.task('zip', gulp.series(build, buildZip));

// Build separate types of files
gulp.task('pug', pug);
gulp.task('scss', styles);
gulp.task('js', js);
gulp.task('images', images);
gulp.task('sprites', gulp.parallel(makeMonoSprite, makeMultiSprite));
gulp.task('fonts', gulp.series(convertFonts, fonts));

// Default task
gulp.task('default', gulp.series('development'));
