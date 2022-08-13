import { browserSyncConfig } from '../config/options.js';

export const server = async () => {
  $.plugins.browsersync.init(browserSyncConfig);
};
