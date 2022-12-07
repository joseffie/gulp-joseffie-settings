import gulpZip from 'gulp-zip';
import getZipFileName from '../../utils/getZipFileName.js';
import { log } from '../../utils/logger.js';

const delExistingArchiveFolder = () => {
  const { archiveFolder } = $.paths;

  if ($.plugins.fs.existsSync(archiveFolder)) {
    $.plugins.del([archiveFolder]);
    return log('Removed old archive folder.');
  }

  return null;
};

export const buildZip = () => {
  delExistingArchiveFolder();

  return $.gulp
    .src(`${$.paths.buildFolder}/**/*.*`, {})
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'ZIP',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe(gulpZip(getZipFileName()))
    .pipe($.gulp.dest($.paths.archiveFolder));
};
