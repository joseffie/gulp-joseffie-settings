import gulpPug from 'gulp-pug';
import posthtml from 'gulp-posthtml';
import versionNumber from 'gulp-version-number';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import readingJson from '../utils/readingJson.js';

import { pugConfig, postHtmlConfig, versionNumberConfig } from '../config/options.js';

let emittyPug;
global.watch = false;
global.forceRebuild = false;

export const pug = (done) => {
  if (!emittyPug) {
    emittyPug = $.plugins.emitty.setup('src', 'pug', {
      makeVinylFile: true,
    });
  }

  return new Promise((resolve, reject) => {
    emittyPug.scan(global.emittyPugChangedFile).then(() => {
      $.gulp
        .src(`${$.paths.src.pug}/**/*.pug`)
        .pipe(
          $.plugins.plumber(
            $.plugins.notify.onError({
              title: 'PUG',
              message: 'You got an error: <%= error.message %>',
            }),
          ),
        )
        .pipe(
          $.plugins.if(
            global.watch && !global.forceRebuild,
            emittyPug.filter(global.emittyPugChangedFile),
          ),
        )
        .pipe($.plugins.data(readingJson()))
        .pipe(gulpPug(pugConfig))
        .pipe(posthtml(postHtmlConfig.plugins, postHtmlConfig.options))
        // Required for correct operation of the `path-autocomplete` extension.
        // If you don't use it, you can delete this line.
        .pipe($.plugins.replace(/@img\//g, 'img/'))
        .pipe($.plugins.if($.isProd, webpHtmlNosvg()))
        .pipe($.plugins.if($.isProd, versionNumber(versionNumberConfig)))
        .pipe($.gulp.dest($.paths.build.html))
        .pipe($.plugins.browsersync.stream())
        .on('end', resolve)
        .on('error', reject);
    });

    done();
  });
};
