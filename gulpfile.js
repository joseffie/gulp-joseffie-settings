import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

// Importing tasks to gulpfile
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { server } from './gulp/tasks/server.js';
import { images } from './gulp/tasks/images.js';
import { makeSprite } from './gulp/tasks/sprite.js';
import { otfToTtf, ttfToWoff, fStyle } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';

function watcher() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

const createFonts = gulp.series(otfToTtf, ttfToWoff, fStyle);
const mainTasks = gulp.parallel(html, scss, js, images);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

// Exporting scripts to package.json
export { dev };
export { build };
export { reset };
export { createFonts };
export { makeSprite };
export { deployZIP };

gulp.task('default', dev);
