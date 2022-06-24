import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path,
  gulp,
  plugins,
};

// Importing tasks to gulpfile
import { reset } from './gulp/tasks/reset.js';
import { pug } from './gulp/tasks/pug.js';
import { pugPages } from './gulp/tasks/copy-pages.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { server } from './gulp/tasks/server.js';
import { images } from './gulp/tasks/images.js';
import { makeSprite } from './gulp/tasks/sprite.js';
import { otfToTtf, ttfToWoff, fStyle } from './gulp/tasks/fonts.js';
import { deployGitPages } from './gulp/tasks/deploy-git-pages.js';
import { zip } from './gulp/tasks/zip.js';

function watcher() {
  gulp.watch(path.watch.pug, pug);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.data, pug);
}

const mainTasks = gulp.parallel(pug, pugPages, scss, js, images);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

const createFonts = gulp.series(otfToTtf, ttfToWoff, fStyle);
const deployGit = gulp.series(deployGitPages);
const deployZIP = gulp.series(reset, mainTasks, zip);

// Exporting scripts to package.json
export { dev };
export { build };
export { reset };
export { createFonts };
export { makeSprite };
export { deployGit };
export { deployZIP };

gulp.task('default', dev);
