import { dirs } from '../../app.config.cjs';
import { readFileSync } from 'fs';

export default () => {
  const dataFile = `${dirs.src}/base/data/data.json`;

  return JSON.parse(readFileSync(dataFile, 'utf8'));
};
