import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.$ = {
  isProd: process.argv.includes('--production'),
  isDev: !process.argv.includes('--production'),
  path,
  gulp,
  plugins,
};

// Importing tasks to gulpfile
import { reset } from './gulp/tasks/reset.js';
import { server } from './gulp/tasks/server.js';
import { pug } from './gulp/tasks/pug.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { makeMonoSprite, makeMultiSprite } from './gulp/tasks/sprite.js';
import { otfToTtf, ttfToWoff, fStyle, fonts } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';

const watcher = () => {
  global.watch = true;

  gulp.watch(path.watch.pug, pug).on('all', (event, file) => {
    global.forceRebuild = false;

    if (event === 'unlink') {
      global.emittyPugChangedFile = undefined;
    } else {
      global.emittyPugChangedFile = file;
    }
  });
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.fonts, fonts);
  gulp.watch(path.watch.data, pug).on('all', () => {
    global.forceRebuild = true;
  });
};

const mainTasks = gulp.parallel(pug, scss, js, images, fonts);

// Exporting tasks to package.json
export { reset };
export { pug };
export { scss };
export { js };
export { images };
export { fonts };

export const createFonts = gulp.series(otfToTtf, ttfToWoff, fStyle);
export const makeSprites = gulp.parallel(makeMonoSprite, makeMultiSprite);
export const deployZIP = gulp.series(reset, mainTasks, zip);

// Defining build modes
export const development = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
export const prod = gulp.series(reset, mainTasks);

export default development;
