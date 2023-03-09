import gulp from 'gulp';
import { dirs } from '../../../app.config.cjs';
import { gulpLoadPluginsOpts } from '../../config/options.js';
import { existsSync } from 'fs';
import { getZipFileName, log } from '../../utils/index.js';

import { deleteSync } from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins(gulpLoadPluginsOpts);

const delExistingArchiveFolder = () => {
  if (!existsSync(dirs.archive)) return;
  deleteSync(dirs.archive);
  log('Removed old archive folder.');
};

export const buildZip = () => {
  delExistingArchiveFolder();

  return gulp
    .src(`${dirs.dist}/**/*.*`)
    .pipe(
      $.plumber(
        $.notify.onError({
          title: 'ZIP',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe($.zip(getZipFileName()))
    .pipe(gulp.dest(dirs.archive));
};
