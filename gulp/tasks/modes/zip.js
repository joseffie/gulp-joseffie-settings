import gulpZip from 'gulp-zip';
import getZipFileName from '../../utils/getZipFileName.js';

const delExistingArchiveFolder = () => {
  const { archiveFolder } = $.paths;

  if ($.plugins.fs.existsSync(archiveFolder)) {
    $.plugins.del([archiveFolder]);
    return console.log($.plugins.chalk.bold.yellow('Removed old archive folder.'));
  }
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
