import environment from '../utils/environment.js';
import { log } from '../utils/logger.js';

export const startMessage = (done) => {
  log(`Starting app in [${environment.toUpperCase()}] mode.`);
  done();
};
