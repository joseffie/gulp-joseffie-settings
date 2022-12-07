import { log } from '../utils/logger.js';

export const reset = async () => {
  const deletedDirectoryPaths = $.plugins.del([$.paths.buildFolder]);

  // If there are no directories to remove, the function does nothing
  if (deletedDirectoryPaths.join('').length < 1) return 0;

  return (
    deletedDirectoryPaths,
    deletedDirectoryPaths.forEach((path) => {
      log(`Deleted '${path}'`);
    })
  );
};
