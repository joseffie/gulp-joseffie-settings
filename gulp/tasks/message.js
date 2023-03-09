import { environment } from '../../app.config.cjs';
import { log } from '../utils/logger.js';

export const startMessage = (done) => {
  log(`Starting app in [${environment.toUpperCase()}] mode.`);
  done();
};
