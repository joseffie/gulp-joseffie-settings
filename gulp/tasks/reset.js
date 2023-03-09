import { pathsToDelete } from '../../app.config.cjs';
import { log } from '../utils/logger.js';
import { deleteSync } from 'del';

export const reset = async () => {
  const deleted = deleteSync(pathsToDelete, {
    dot: true,
  });

  // If there are no directories to remove, the function does nothing
  if (deleted.length === 0) {
    log('The directories or files to be deleted do not exist.');
    return null;
  }

  return deleted.forEach((path) => { log(`Deleted '${path}'`); });
};
