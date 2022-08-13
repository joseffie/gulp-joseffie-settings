import getTimestamp from './getTimestamp.js';
import paths from '../config/paths.js';
import lodash from 'lodash';

const getZipFileName = () => {
  const directoryName = paths.rootFolder || 'dist';

  return `${lodash.kebabCase([directoryName])}-${getTimestamp()}.zip`;
};

export default getZipFileName;
