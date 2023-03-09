import { dirs } from '../../app.config.cjs';
import lodash from 'lodash';
import getTimestamp from './getTimestamp.js';

export default () => {
  const directoryName = lodash.kebabCase([dirs.root || 'build']);
  const timestamp = getTimestamp();

  return `${directoryName}-${timestamp}.zip`;
};
