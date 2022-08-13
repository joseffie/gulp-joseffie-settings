import environment from '../utils/environment.js';

export const startMessage = (done) => {
  console.log(
    $.plugins.chalk.bold.green(
      `Starting app in ${$.plugins.chalk.underline(`[${environment.toUpperCase()}]`)} mode`,
    ),
  );

  done();
};
