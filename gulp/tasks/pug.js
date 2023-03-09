import gulp from 'gulp';
import { relative } from 'path';
import { dist, src } from '../config/paths.js';
import { dirs, isProd } from '../../app.config.cjs';
import { gulpLoadPluginsOpts, pugConfig, versionNumberConfig } from '../config/options.js';
import readingJson from '../utils/readingJson.js';

import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import emitty from 'emitty';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

let emittyPug = null;
global.watch = false;
global.forceRebuild = false;

export const pug = (done) => {
  if (!emittyPug) {
    emittyPug = emitty.setup(dirs.src, 'pug', {
      makeVinylFile: true,
    });
  }

  return new Promise((resolve, reject) => {
    emittyPug.scan(global.emittyPugChangedFile).then(() => {
      const imgPath = relative(dirs.dist, `${dirs.dist}/img`);

      gulp
        .src(src.pug)
        .pipe(
          $.plumber(
            $.notify.onError({
              title: 'PUG',
              message: 'You got an error: <%= error.message %>',
            }),
          ),
        )
        .pipe(
          $.if(
            global.watch && !global.forceRebuild,
            emittyPug.filter(global.emittyPugChangedFile),
          ),
        )
        .pipe($.data(readingJson()))
        .pipe($.pug(pugConfig))
        .pipe($.posthtml())
        // Required for correct operation of the `path-autocomplete` extension.
        // If you don't use it, you can delete this line.
        .pipe(
          $.replace(
            /@img\//g,
            `${imgPath.replaceAll(/\\/g, '/')}/`,
          ),
        )
        .pipe($.if(isProd, $.webpHtmlNosvg()))
        .pipe($.if(isProd, $.versionNumber(versionNumberConfig)))
        .pipe(gulp.dest(dist.html))
        .pipe(browserSync.stream())
        .on('end', resolve)
        .on('error', reject);
    }).then(() => { done(); });
  });
};
